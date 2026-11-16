---
name: timeline-x-transcription
description: "Transcribe Timeline X Studio audio or video, make guarded word-level cuts, detect silence, and create or restyle accurate editable captions."
---

# Timeline X Studio Transcription and Captions

Use this skill for transcription, transcript search, subtitle creation,
word-level editing, filler removal, and pause tightening.

## Establish a trustworthy transcript

1. Read `project://tracks` and choose the exact VideoClip or Audio layer.
2. Inspect the advertised `transcribe_clip` schema for this connection. Omit
   `backend` to use the Desktop preference; an explicit backend is strict and
   must not silently fall back. The embedded Agent may advertise local and
   cloud engines. The public MCP path is local-only: use only its advertised
   local backend values, keep each timeline window at most 5 minutes, and do
   not install a model or fall back to cloud transcription.
   When the speech names people, places or brands (for example "Pera Palas
   Oteli"), pass them in `vocabulary` so they are spelled correctly.
   A result with state=processing is pending. Follow its returned retry tool
   and arguments for the same job; do not start another transcription or
   treat it as completed text.
3. Check the returned `coordinate_space`, `timeline_range_us`, `revision`,
   `expected_layer`, and `word_timing`. All returned segment and word times are
   timeline-absolute. `exact` word timing supports precise cuts;
   `interpolated_from_cue` is approximate, so use wider, linguistically safe
   boundaries. `none` preserves readable text but does not support word cuts;
   do not invent word spans or run filler/pause cuts from incomplete timing.
4. Forward constant-speed audio/video is supported and returned times already
   account for speed. Reverse and frozen playback are unsupported; do not
   retime the user's clip merely to make transcription succeed.

For an empty result, disconnection, timeout, unavailable engine, or cache reuse,
read [transcription recovery](references/recovery.md) before retrying.
When advertised, use `get_clip_transcript` to inspect cached text after a
disconnection; otherwise use the advertised media transcript resource. Both
contain source-absolute times, not a fresh timeline cut plan.

## Text-based editing

- Word-cut mutations require normal forward playback at speed 1. Transcribing
  another constant speed does not make it eligible for word cuts. Preserve the
  user's retiming; do not change it temporarily to bypass that boundary.
- Select complete word spans from `segments[].words[]`; preserve word ids and
  their absolute start/end times.
- Call `preview_transcript_cut` with the transcript `revision` and
  `expected_layer`. Inspect removed duration, affected layers, segment counts,
  and resulting composition duration.
- Apply the same normalized request with `apply_transcript_cut`. Prefer
  `ripple_scope: "linked_av"`; use `all_unlocked` only when the user intends a
  whole-timeline ripple.
- Combine disjoint removals into one preview/apply batch when they belong to
  one editorial decision. Re-read tracks afterward.
- The Transcript panel marks deletions as pending (strikethrough) until Cut;
  Cut always runs `preview_transcript_cut` then `apply_transcript_cut`. Use
  Review fillers there for a conservative um/uh/you-know/yani/那个 scan — do
  not auto-apply filler hits.
- If the target changed after transcription, discard the stale plan and
  transcribe again.

## Silence handling

Use `detect_silences` for acoustic silence, not for semantic filler words. Its
ranges are timeline-absolute. If it reports `NotReady`, wait for the waveform
job to finish and retry once. Preserve short conversational pauses; split and
delete only the excess portion of a long silence, then verify linked A/V stays
in sync.

## Captions

Read [caption craft](references/caption-craft.md) when choosing caption size,
line length, reading speed, safe placement, two languages, or a word-by-word
style.

1. Finish picture and dialogue timing first.
2. Prefer the returned caption draft: pass caption_draft.body to
   `apply_subtitles` with `format: "srt"`, preserving
   caption_draft.expected_source and caption_draft.cue_timings in the matching
   request fields. These guard the transcribed source and retain real word
   onset evidence. If no caption draft is returned, use the returned `srt`
   body and the source guards supported by the advertised schema.
   The public MCP schema has no top-level `t_end_us`; do not send that legacy
   envelope field. If the embedded schema requires it, supply the observed
   source window end. Cue timing still comes from the subtitle body.
3. Call `list_caption_templates`, apply the chosen design with
   `apply_caption_template`, and use `restyle_captions` only for requested
   typography or safe-area adjustments.
4. Use `update_caption` for one cue's text, frame-grid timing, or style. Never
   rewrite a proper noun or factual term without transcript or user evidence.
5. Re-read `project://tracks` and inspect representative cues with
   `capture_canvas_frame`, including the longest line and a vertical-video safe
   area.

Never claim exact word timing when `word_timing` is approximate or absent.
