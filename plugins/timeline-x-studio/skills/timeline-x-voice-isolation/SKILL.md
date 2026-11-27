---
name: timeline-x-voice-isolation
description: "Choose bounded native DeNoise/DeReverb treatment or a selected external learned speech-isolation capability for dialogue, preserve picture and source media, and verify the actual audible result in Timeline X Studio."
---

# Timeline X Studio Voice Isolation

Use this skill when spoken human voice needs background-noise suppression,
speech isolation, or dereverberation. Do not use it for music, ambience, sound
effects, or a clip with no confirmed speech: a speech enhancer may damage or
silence those sources.

Read [Native restoration and learned isolation](references/restoration-and-isolation.md)
when choosing a treatment or undoing one. Timeline X Studio advertises
`set_audio_restoration` for static DeNoise, DeReverb and DeEsser settings on
Audio layers. These are bounded source treatments, not learned voice isolation.
DeNoise uses an authored stationary noise floor; DeReverb suppresses late
energy and does not reconstruct dry speech. Choose this route for a compatible
noise/tail problem, not merely because it is local.

For actual learned speech isolation on this computer, use `isolate_speech` on
the dialogue's Audio layer (DeepFilterNet3, offline after a one-time model
download): it imports a speech and a background stem and gives the clip the
speech stem, keeping its timing and edits; undo restores the original. Where
that tool is not advertised, use a compatible external MCP connection
selected for the current conversation. Never substitute EQ, normalization,
gating or volume reduction and claim AI voice isolation was performed. If the
requested treatment is unavailable, explain that exact capability gap.

## Native treatment

Read the target Audio layer, existing restoration settings and
`list_audio_effects`. Preserve sibling stages. Measure and listen to a real
noise-only source passage before choosing a DeNoise floor; do not set it from
the speaker's overall level. Apply `set_audio_restoration` with the complete
intended container and expected current settings when supported. This is an
undoable actor edit; original media and picture remain intact, and preview and
export use the same prepared treatment. Transcription still reads original
speech. Read back parameters and audition processed playback before claiming
an audible improvement; an accepted parameter write proves only configuration.

## External learned isolation

1. Read `project://tracks`, `project://media`, and available transcript evidence
   to identify the exact source and its Audio layer. If speech is uncertain,
   ask before processing.
2. Call `list_external_mcp_tools` and select only a returned tool whose schema
   explicitly supports speech denoise, voice isolation, or dereverberation for
   the available local file or URL form. Invoke it through
   `call_external_mcp_tool`. Never guess a remote tool name, upload to an
   unselected service, or expose the connection token.
   On the hosted Timeline X connection (the public Claude Code or Codex
   plugin) `list_external_mcp_tools` and `call_external_mcp_tool` are
   unavailable; use an equivalent tool the host itself exposes in this
   conversation, under the same rules, or explain the missing connection.
3. Preserve the source. Use the remote tool's live status mechanism for a long
   job and retain the exact returned output identity. If no suitable tool is
   present, report the missing connection instead of altering the clip.
4. Import a completed direct audio URL with `import_media_url`, or a readable
   local result with `import_media`. Confirm the result is an online Audio item
   in `project://media`.

## Replace audio without touching picture

- Prefer `replace_layer_media` on the existing Audio layer so timing, fades,
  grouping, and picture remain intact. If the source video has no editable
  audio layer, use `separate_audio_to_new_track` before replacement only when
  the user authorized this edit.
- Require the processed asset to cover the original source window. Do not
  stretch, offset, trim, or move picture to conceal a duration mismatch.
- Keep the original media registered so the operation remains recoverable.

After replacement, re-read the layer and verify its media id, complete range,
source offset, speed, and linked picture timing. Compare dialogue level before
and after with `analyze_audio_level`, inspect lip sync, and run
`audit_timeline_quality`. Report structural and measured evidence separately
from subjective cleanliness; never claim dereverb or noise removal from a job
status alone.
