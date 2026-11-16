---
name: timeline-x-video-translation
description: "Localize an existing Timeline X Studio video into another language by routing caption translation, approved audio dubbing or true external lip synchronization to actual supported tools while preserving source media and verifying delivery."
---

# Timeline X Studio Video Translation

Use this skill when an existing video must become a localized version with
translated captions, changed spoken language or synchronized visible lips.
Do not use it for standalone text translation, ordinary new narration, a new
avatar, or new footage unrelated to an existing source.

## Resolve the treatment and source

Read `project://current`, `project://tracks` and `project://media`. Resolve the
exact source/layers, selected range, original language, target language/variant,
and requested Library or Timeline result. Reuse source evidence and approvals
already supplied; do not invent a selected clip or full-video scope.

Follow an explicit treatment. An ambiguous "make an English version" needs the
missing treatment decision before changing speech: captions only, audio dub
with picture retained, or true lip synchronization. A visible speaker does not
automatically authorize facial processing or voice cloning.

Use [Localization review](references/localization-review.md) when preparing
source text, target-language timing or final checks.

## Route to supported capabilities

- **Captions only:** use the transcription skill to obtain and review source
  cues where needed. Translate their text, preserve cue count/order/timing and
  protected terms, then use `apply_subtitle_translations` with the actual source
  caption tracks and one timed document per target language. This applies
  supplied translations through the actor; it is not a native translation
  model. `apply_subtitles` can import a source document or a single supported
  translation. Keep alternate language tracks disabled unless requested,
  inherit source style where supported, and atomically refresh existing
  translations rather than stacking duplicates. Read back language tracks and
  inspect long lines with `capture_canvas_frame`.
- **Audio dubbing:** review source meaning and the translated script, then use
  the voiceover skill with the saved Audio and Music Settings configuration.
  Preserve authorized names, facts, speakers and picture timing. Do not promise
  original voice preservation from an ordinary TTS default. Consent to cloning
  is separate. Generate/verify replacement takes before muting original speech,
  and preserve music, ambience and meaningful effects where the existing tracks
  allow it. If those sounds are inseparable, disclose the needed separation
  capability rather than claiming a clean dialogue-only swap.
- **True lip synchronization or source-voice-preserving translation:** Timeline
  X has no native tool for this operation. Use `list_external_mcp_tools` and
  select only a returned capability whose schema explicitly supports the
  requested languages, input form, treatment and consent contract. Invoke it
  through `call_external_mcp_tool`. Obtain any missing reviewed source/target
  text and required likeness/voice permission before submitting. Do not invent
  tool names, call provider endpoints directly, use `generate_video` as lip
  sync, or present an audio dub as changed mouth movement. If no compatible
  selected connection exists, report the exact gap and supported alternatives.

## Keep production recoverable

Preserve the original media, caption language and usable takes. An external
job must retain its exact identity and use only advertised status/recovery
operations; an unknown paid outcome is not a reason for another submission.
Import a completed direct result through `import_media_url` or `import_media`
only if that external service has not already delivered Library media. Verify
the actual item before requested placement, and do not duplicate delivery.

Require a replacement to cover the intended source window. Do not stretch,
offset or silently change picture to hide a duration mismatch. A provider's
"keep duration" claim is not proof of exact duration, retained alpha, HDR,
codec or frame rate. Changes outside the authorized timing contract need the
missing user decision.

## Verify the localized edit and requested delivery

Read back `project://media` and `project://tracks`: correct language, complete
ordered segments, actual durations, one intended placement and preserved
source. Listen for exact translated meaning, pronunciation, clipped speech,
double original speech and missing ambience. Inspect visible speaker motion
when lip sync was requested. Caption timing for dubbed speech must follow the
actual new take, not the original-language word estimates.

Run `audit_timeline_quality`. For an export request, use the export delivery
skill and inspect the actual exported video/audio and selected caption
language. A job state, caption write or Library receipt alone cannot establish
audible quality, lip sync or final delivery. Report any uninspected gate clearly.
