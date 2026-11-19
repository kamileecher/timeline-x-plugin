---
name: timeline-x-talking-head
description: "Edit speech-led videos in Timeline X Studio: remove retakes and verbal clutter, tighten pauses, preserve natural delivery, add purposeful B-roll and captions, and verify the finished cut."
---

# Timeline X Studio Talking-Head Editing

Use this workflow for single-speaker videos, interviews, podcasts, lessons,
product demos, and any edit whose structure is led by speech.

## Read the reference that matches the edit

- Read [speech selection](references/speech-selection.md) for retakes,
  target-script alignment, highlights, or a shorter version. It defines what
  must survive before any cut is proposed.
- Read [cut candidates](references/cut-candidates.md) before proposing pause
  trims, stutter, retake, or false-start removals, or a tighter story. It turns
  word timing into sentence-aware pause ranges and an approval list.
- Read [finishing examples](references/finishing-examples.md) only when adding
  B-roll, a Motif, music, or captions. It connects each addition to a speech beat
  and the actual frame rather than prescribing decoration, and sets graphic
  density and spacing.

Follow the transcription skill for word-timing capability and cut guards, and
the multicam skill when editing synchronized angles. Neither reference creates
a second script-editing or Project-state path.

## Order of operations

1. Read `project://current`, `project://tracks`, and `project://media`. Identify
   the A-roll and any linked dialogue audio. Create a `checkpoint` before the
   first mutation.
2. Call `transcribe_clip` on the speech layer. Treat its timeline-absolute word
   spans, `revision`, and `expected_layer` as the edit source of truth.
   Word cuts require finite, positive word spans. If word timing is absent or
   any required span is incomplete, retain the text for review but do not apply
   a word cut. Captions still require valid cue timing; follow the transcription
   skill's timing rules.
3. Build the speech cut before adding B-roll, Motion Graphics, captions, or
   music. Preview every batch with `preview_transcript_cut`; apply the accepted
   ranges once with `apply_transcript_cut`, normally using the default
   `linked_av` ripple scope.
4. Re-read `project://tracks` and transcribe again if the layer was trimmed,
   moved, split, or retimed. Never apply stale word ids or stale guards.
5. After speech timing is stable, write or update `project://scene-plan` with
   ordered narrative beats. Add only B-roll and overlays that support a named
   beat. Mark speaker footage as A-roll and cutaways as B-roll with
   `set_clip_role`; use `set_shot_treatment` for punch-ins, picture-in-picture,
   or split layouts.
6. Create captions last: use the final transcript `srt` with
   `apply_subtitles`, then `list_caption_templates` and
   `apply_caption_template`. Use `update_caption` for factual or timing fixes.
7. Verify the timeline state and call `capture_canvas_frame` at the opening, a
   typical middle beat, every layout change, and the final beat.
8. Run `audit_timeline_quality` over the finished range. Treat missing cached
   transcript/waveform evidence as incomplete QA, fix every blocking caption,
   layer, A/V or audio issue, and inspect all returned composed frames before
   calling the talking-head edit complete. Then run `review_content_draft` and
   fix its P0 and P1 findings (static stretches, uncaptioned speech, music on
   the voice) before delivery.

## Editorial rules

- Remove a retake only when another complete, better attempt remains. Keep the
  useful setup and the best complete delivery; do not splice sentence
  fragments into unnatural grammar.
- Remove fixed verbal noise such as isolated “um/uh/er” when it carries no
  meaning. Words such as “like”, “so”, or “you know” are contextual; keep them
  when they express comparison, causality, emphasis, or character.
- Preserve connective words, breaths that sell emotion, laughter, and pauses
  that separate ideas. Tighten long dead air instead of reducing every pause
  to zero. If the user gives no pacing target, retain roughly 200–350 ms at a
  normal sentence boundary.
- Do not cover an important gesture, screen demonstration, product reveal, or
  emotional reaction with B-roll.
- Keep one visual idea per narrative beat. Repeated decorative cutaways make a
  speech edit feel less deliberate, not more polished.
- Do not replace original recorded dialogue with synthetic speech unless the
  user explicitly asks for replacement or dubbing.

If transcription returns no usable speech, stop and report that condition;
do not invent a transcript or semantic cut.
