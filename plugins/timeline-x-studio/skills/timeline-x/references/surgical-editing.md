# Surgical edits

Measure, cut on the frame, touch nothing else, prove the cut. Use this for
every cut, trim, tighten, move or delete on the Timeline.

## Units and the grid

Every time is an integer count of microseconds on the Timeline. Picture sits
on the composition frame grid and sound on the 48 kHz sample grid. One frame
is 1 000 000 × fps.den ÷ fps.num µs (fps from `project://current`). Send
frame-aligned integers: a fraction is refused, and an off-grid time is snapped
or clamped, which the result reports in its layers rows. Read the applied
start and end from the result instead of assuming the request landed.

## Protocol

1. Scope. With sequences in the project, call `list_sequences`: the row
   marked open_in_editor is the timeline the user is looking at, and
   `project://tracks` shows the root only. While a reusable timeline is on
   screen an edit that names no sequence_id is refused: pass that
   timeline's id, or sequence_id null to edit the root on purpose.
   `set_active_sequence` shows a timeline to the user.
2. Measure. Read the target's start, end, track, group and lock state, and
   note user_revision from `project://current`. Pass it as if_user_revision
   on your edits: an edit planned before the user changed the timeline is
   then refused instead of written over their change.
   `match_frame` gives the source position under a Timeline time, and
   `find_gaps` records the lane's gaps before you start. Take one
   `checkpoint` before the first change. `query_media` tells you where the
   picture of a source really ends (picture_end_us, which can be earlier
   than its duration), whether its frame rate is variable (cut by time, not
   by counting source frames) and whether its sound leads or lags its
   picture inside the file (audio_lead_us).
3. Never edit a locked clip or a locked track: the call is refused. Ask the
   user before unlocking anything.
4. Prefer the tool that cannot leave debris. `ripple_trim_layer` and
   `roll_edit` move a cut without opening a hole. `split_layer` followed by
   `delete_layer` leaves the deleted span empty: use `delete_layers` with
   ripple enabled, or follow with `close_gap`. Keep the default ripple scope
   and never escape a group unless the user asked for picture and sound to
   separate. The default scope moves only the deleted clips' own lanes and
   linked partners: when unlinked narration, music or captions on other
   tracks must stay in step, pass `ripple_scope: 'all_unlocked'`, and treat a
   non-empty unshifted_track_ids list in the result as tracks now out of sync.
5. Speech. Cut only on word spans from `transcribe_clip` with exact word
   timing. A removal expands outward to the grid, so leave one frame of
   margin from the neighbouring word and keep the breath: about 150 ms
   inside a sentence, 200–350 ms at its end. Run `preview_transcript_cut`
   with the revision and expected layer, then the identical
   `apply_transcript_cut`. `apply_silence_cut` tightens every long pause
   uniformly with no preview; use it only when the user accepts that.
   `detect_silences` finds silent ranges by level when there is no
   transcript; remove them with a rippling delete, never a plain one.
6. Listen to every cut. You cannot hear, so `inspect_cut_audio` does it for
   you: it renders the real mix around each join and measures the step at
   the cut against the audio around it, the level before and after, and
   checks the transcript for a word the cut lands inside. A join is verified
   only by a clean or silent verdict with no words cut. click or risky means
   fix it and measure again; unsealed means sound on both sides and no fade:
   add 10 ms fades and measure again; unmeasured means the sound was not
   ready, never that it is fine. With listen true the recogniser's text for
   the cut comes back too: a hint to read, never proof of a broken word. `apply_transcript_cut`, `apply_silence_cut` and
   `detect_fillers` attach this as cut_audio in their own result: read it.
   After any other edit to sound (split and delete, trim, ripple, move) call
   `inspect_cut_audio` yourself on the layers you touched.
   Seal the sound. A cut in the middle of a waveform clicks.
   `apply_transcript_cut` fades each audio join it creates by 10 ms on both
   sides and reports the count. Any other cut does not: add the fade with
   `set_layer_fades` (10 000–20 000 µs on the outgoing end and the incoming
   start), or `add_transition` between the two Audio clips for a crossfade.
7. Read the result. Every edit answers with what changed: created, removed
   and changed ids, moved layers, applied timing, and any transition the edit
   removed. An answer of applied=false means nothing changed. Entities under
   also_changed are side effects the tool's own receipt did not name; check
   each one is intended. A misspelled argument is refused, never ignored.
8. Verify the cut itself. `capture_canvas_strip` starting two frames before
   the cut with four frames at step one shows both sides: the intended
   pictures, no black frame, no one-frame flash. `find_gaps` again: no new
   gap. After a speech cut, `transcribe_clip` again and confirm the last word
   before and the first word after are whole. `diff_checkpoint` against your
   checkpoint: only the intended clips changed.
9. Gate. `verify_edit_result` with the intent, the edited range and exact
   layer and track expectations at zero tolerance, with frame times one frame
   before the cut and on it. For a finished cut, `audit_timeline_quality`
   reports single-frame holes, flash frames, sub-frame audio slivers, linked
   picture and sound that drifted by half a frame or more, a sound cut with
   no fade, a clip that plays past its picture's last frame, and a source
   whose sound and picture start apart.
10. Report. Give each cut as microseconds and frame number, the duration
    removed, and the layers created, removed and moved, with the measured
    verdict of each audio join. Say plainly which joins are unmeasured or
    were checked without a transcript.

## What the editor guarantees

- A split keeps animation continuous across the cut, leaves the fade-in on
  the left half and the fade-out on the right, and splits a linked partner
  with it.
- A split Motion Graphic keeps playing on the right piece from the cut; it
  does not replay its entrance.
- `rate_stretch_layer` with ripple and `close_all_gaps` move only their own
  lane unless you pass ripple_scope all_unlocked; pass it whenever captions,
  music or markers after the edit must stay in step with the picture, and
  read skipped_gaps for the gaps another track still fills.
- Linked picture and sound trim, ripple and move together, and replacing a
  clip's media switches its linked sound with it.
- `undo` will not revert an edit the user made unless you pass
  include_user_edits with their go-ahead. To take back your own work, use
  `restore_checkpoint` on the checkpoint you made first.
- A result that would overlap two clips on one lane, leave an off-grid edge
  or read past the end of the media is refused whole; nothing is changed.
