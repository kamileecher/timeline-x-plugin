---
name: timeline-x-visual-analysis
description: "Inspect Timeline X Studio source footage and composed timeline frames, compare before and after states, locate visual changes, verify edits with fresh timestamped evidence, and break down a finished film or short drama (characters, shots, speakers, beats, why it works)."
---

# Timeline X Studio Visual Analysis

Use this skill for visual QA, source-versus-timeline comparison, locating a
shot or visual change, checking crops and overlays, and verifying an edit. An
analysis request is read-only unless the user also asks for changes.

## Choose the right evidence

- Read `project://current`, `project://tracks`, and `project://media` for exact
  layer ranges, source offsets, transforms, roles, and composition geometry.
- Use `capture_canvas_frame` for the composed video frame the viewer and export
  should show at a timeline-absolute `t_us`.
- Use `capture_canvas_strip` to review motion: one image of consecutive
  composed frames from `t_start_us`, sampled every frame_step frames. Easing,
  overshoot, a transition, or words that overlap mid-animation can pass in a
  single frame; a strip shows the frames between. Raise frame_step to span a
  longer move, and keep a single frame for detail at one instant.
- After a requested edit, use `verify_edit_result` as the final gate instead of
  assembling unrelated reads and captures by hand. Supply the exact edited
  range and the layer, track, coverage, stacking, and property expectations the
  request implies; inspect every returned composed-frame image. A failed
  machine check, stale state hash, failed capture, or visual mismatch means the
  edit is not complete and must be fixed and verified again.
- Use `describe_clip` for timestamped semantic descriptions of one source clip
  and `analyze_clip` for shot boundaries, representative source keyframes,
  brightness, motion, sharpness, and visual-event flags. Those analysis times
  are source-absolute; do not compare them directly to timeline time without
  applying the layer's source offset and speed mapping.
- Use `capture_editor_screen` only when the editor chrome itself must be
  checked and the user-enabled app-local Mouse surface is available. It is not
  a substitute for compositor evidence.
- Read [review rounds](references/review-rounds.md) when a draft is ready for
  an independent look, when the user sends notes on a cut, or before fixing a
  reported defect. Read [reference video](references/reference-video.md) when
  the user wants a new edit shaped like a video they supply.
- For a Motion Graphics piece, the P0/P1/P2 review pass is in the Motion Graphics
  [story and review](../timeline-x-motion-graphics/references/story-and-review.md) reference.

## Coarse-to-fine inspection

1. Define the interval and the exact question: first change, crop safety,
   overlay timing, continuity, black frame, caption collision, and so on.
2. Sample broadly across the interval to bracket the event.
3. Halve the bracket repeatedly until the first changed frame or smallest
   useful interval is found. Respect the project frame grid; false precision
   below one frame is not evidence.
4. For a before/after claim, capture the same timeline timestamp and canvas
   geometry on both states whenever possible. Label evidence with exact times.
5. After any edit, discard stale captures and take fresh frames from the live
   compositor through `verify_edit_result`.
6. When verification fails, classify the failure before changing state. Repair
   the existing source, instance properties, transform, or proven time range;
   treat preview readiness as a retry/probe problem first. Then discard every
   pre-repair image and rerun the same timestamped checks. For an automated
   Motion Graphics repair loop, stop after three failed repair passes and report the exact
   unresolved check rather than inferring success.


## Break down a reference video

For context the frames cannot give (who made it, when, the claims it makes),
read the source page with `web_scrape` or look it up with `web_search`.

When the user wants to learn from a finished film or short drama (why it works,
how it is written and shot), break it down before planning anything (Film planning can use it afterwards). Run
`start_video_breakdown` on the Library video, in the user's language. The
breakdown never starts a transcription: transcribe the clip first with
`transcribe_clip` when it has speech, or it will have no lines.

With the default agent lane the result returns open questions with labeled
contact sheets as images. Look at every image, answer each question with the JSON
its answer_shape describes, and send them with `answer_breakdown_questions`;
repeat until status is complete. Answer only from what the pictures show, name
only shots and characters the question offers, and mark a speaker you cannot
decide as unsure instead of guessing. If you cannot see images, do not answer:
use lane=model only when the user has configured a video-understanding engine,
because that lane sends the frames to it.

Read the result with `get_video_breakdown` section=document: characters, every
shot's reading, attributed lines, scenes, beats, the ledger counted by code
(pacing, emotion events, build-to-payoff waits, screen time) and the report.
Quote the ledger's numbers rather than estimating your own. Record the user's
corrections with `update_video_breakdown`; they survive reruns, and a corrected
emotion or speaker recounts the ledger. A breakdown is study material, not a
plan or an approval. When the user wants to make a film from it, `breakdown_to_film_script`
returns a Film script document (save it only when asked), and
`plan_film_from_video` with breakdown_id builds the plan with each shot's
references from the same video; the approval gates still apply.

For a series (one Library video per episode), use `start_video_series` with the
videos in episode order; ask the user when the order is unclear. Each episode is
read with what came before, so keep names consistent with the people it lists.
Only the first episodes are read (episode_limit, default 5): show the user the
results and cost before raising it with `continue_video_series`. Answer each
episode's questions with `answer_breakdown_questions`, then call
`continue_video_series` again; it ends with one series question. Read the result
with `get_video_series`; correct who is who with `update_video_series`.

## Verification checklist

- Inspect the opening and final visible frames of the changed region.
- For a placed animated Motif, inspect four fresh composed phases: entrance,
  first fully settled state, middle, and last visible exit state. Use explicit
  frame_times_us in `verify_edit_result`, keep them on the project frame grid,
  and inspect every returned PNG rather than inferring motion from one still.
- Check every cut, transition, layout change, and longest caption cue.
- Confirm no unintended gap, duplicate layer, black frame, aspect-ratio bar,
  unsafe crop, overlay collision, or stale draft graphic appears.
- Separate state evidence from visual evidence: project JSON can prove timing
  and parameters; only a fresh frame proves the composed appearance.
- Do not report an edit as complete until `verify_edit_result` machine checks
  pass and you have inspected its fresh image blocks.
- Report uncertainty when compression, motion blur, missing analysis backend,
  or interpolated timing prevents a definitive conclusion.
- For a completed multi-layer cut, finish with `audit_timeline_quality` after
  the edit-specific `verify_edit_result`. It combines caption, authored visual
  coverage, A/V sync, cached transcript and waveform evidence, then returns the
  exact composed frames that still need human/vision review.
