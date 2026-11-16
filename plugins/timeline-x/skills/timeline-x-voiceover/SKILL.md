---
name: timeline-x-voiceover
description: "Write, generate, place, replace, and synchronize narration or approved dubbing in Timeline X Studio using saved speech settings, measured audio timing and scene-aware mixing."
---

# Timeline X Studio Voiceover

Use this skill for narration, text-to-speech, approved dubbing, voice
replacement and spoken audio aligned with an existing visual sequence.
Use [Visual and speech synchronization](references/visual-speech-sync.md) for
existing visuals or retiming; use [Corrective pickups](references/corrective-pickups.md)
only for a wrong spoken word or a short authorized replacement; use
[Narration performance](references/narration-performance.md) to choose a voice
by ear, vary the reading, check generated speech and time sound from the lines.

## Plan and resolve saved speech configuration

1. Read `project://current`, `project://tracks`, and `project://scene-plan`.
   For provider-backed narration, use only voice or voice-model fields
   explicitly present in the current turn's Agent generation context. When a
   field is absent, do not read app settings to infer a composer selection;
   omit that synthesis argument unless the user explicitly chooses another
   value in the request. An explicitly chosen local model follows the local
   workflow below.
2. When visuals already exist, map each spoken idea to the scene it describes.
   Write for what the viewer can see, avoid narrating obvious details twice,
   and preserve enough time for comprehension. Before synthesis, run
   `check_script_text` on the script with the planned `duration_s` and fix or
   justify its findings; it costs nothing and catches dashes, stock phrases and
   an overfull word budget before a paid or slow generation.
3. Keep one continuous synthesis for a standalone narration by default. Split
   only when separate scenes need independent placement, replacement, or
   timing. Keep each request below 4,000 characters for portable backend
   compatibility.

## Generate, recover and deliver once

- For provider-backed narration, call `synthesize_speech` with the script and
  only the explicitly attached `voice` and/or model fields. Set
  `t_start_us` and `target_track_id` when placement matters; otherwise it
  appends at the composition end and uses or creates a Voiceover-capable audio
  track.
- Omit the speed argument for the natural, quality-first 1.0 pace. Never infer a faster
  pace merely to force narration into a visual window. If the user explicitly
  asks for faster delivery, keep it at or below 1.05; the host caps higher
  requests at 1.05 to reduce metallic or crackling artefacts.
- The tool imports the result and places an Audio layer with role `voiceover`.
  Do not import or add that result again.
- Use the returned `layer_id`, `t_start_us`, and `t_end_us` as measured timing.
  Adjust scene timing around the real duration rather than promising an exact
  duration before synthesis.
- For a redo, synthesize the approved replacement first, then replace or remove
  the old narration only after the new layer is verified. Do not destroy the
  user's usable take preemptively.

## Explicit local models and saved voices

- When the user explicitly chooses a local model, read `list_speech_models` or
  `get_local_tts_status`. If setup is needed and authorized, call
  `prepare_speech_model`, poll model readiness, then call `use_speech_model`.
  Use an installed, selected fixed model; an unavailable local model must not
  silently fall back to a paid provider.
- Only when the user explicitly chooses a saved local voice, read
  `list_local_voice_profiles` and pass its matching `voice_profile_id`.
  Profiles are added in Settings → Transcription → My voices with a reference
  recording from a file or Library. XTTS-v2 uses the recording without a
  transcript; OmniVoice requires the exact reference transcript. Antalia Mini
  has one fixed Turkish voice and cannot clone. MCP lists and uses saved
  profiles; it does not create them.
- Call `synthesize_local_speech` with the script, fixed `model_id`, optional
  explicitly chosen `voice_profile_id`, a stable `request_key`, and explicit
  placement. Library-only uses `placement="media-pool"`; Timeline uses
  `placement="timeline"`, an existing unlocked `track_id`, and `t_start_us`.
  Omit the profile for the model's default voice. Never pass local profile IDs
  or raw reference paths to the provider-backed synthesis tool.
- Poll `get_audio_production_job` with the returned `job_id`; `wait_ms` is
  bounded to 5,000. When completed, repeat the identical original request to
  import/place the result once. Keep the key and all parameters unchanged;
  changed profile metadata or reference audio needs a new key. Do not import
  or add the result again. Use the returned media/layer identity to verify the
  requested destination; Library-only production creates no Timeline layer.

## Official and cloned voices

- Respect a provider voice explicitly added from the Agent composer + menu
  for the current turn. To create a provider-backed cloned voice, the user opens + → Voices → + Clone Voice, records or uploads at least
  ten seconds of clean speech, confirms the consent statement, previews it,
  names it, and saves it. Voice cloning is a consent-gated UI workflow; there is
  no Timeline X Studio MCP cloning tool, so never claim to have cloned a voice by
  calling an unrelated tool.
- Provider-backed cloning uses ElevenLabs when its key is configured under
  Settings → API Keys. If the dialog or synthesis returns a provider/key error,
  preserve that exact error and let the user correct the named configuration;
  do not silently substitute another person's voice.
- Once saved and explicitly added to the current request, the cloned voice id
  is included in that turn's Agent generation context. Pass that selected id to
  provider-backed `synthesize_speech` like any other voice and verify the
  returned placement normally.
- Do not clone or imitate a third party without the user's explicit authority
  and the consent represented by the cloning dialog.

Speech identity does not imply singing identity. Voiceover over music is
narration. Music tools must not receive a speech clone as a singer.

## Give the narration its own treatment

A synthetic voice placed straight from the engine belongs to no particular
piece. For narrated films, ads, and stories, decide the treatment deliberately;
a clean, close, dry read is a valid choice when it is made on purpose, for
example in a tutorial.

1. Work out from the story whose voice this is, where it comes from, and who
   it addresses: a remembered voice, a transmission,
   an inner voice, a machine, a presenter. That answer picks the medium (close
   and dry, a phone or radio band, an old recording) and the space (dry, a
   room, a hall, outdoors).
2. Build it from editable native audio effects. Read `list_audio_effects` for
   the target layers and use the setter payloads it returns: a gentle clean
   stage first (high-pass, de-esser, light compression, a little presence),
   then the medium (for a radio or phone band, high-pass and low-pass, with
   light distortion only if the story asks), then the space (reverb). Apply
   the same treatment to every line so all lines sit at one speech level.
3. Let the treatment change at most once, on purpose, at the story's turn, for
   example a radio voice that clears when the truth arrives.
4. When the selected voice backend accepts a style instruction, carry pace,
   distance, and breath in it; the effects only finish what the reading began.
5. State the treatment in one line with its reason, and tell the user which
   seconds to listen to. Loudness can be measured with `analyze_mix_loudness`;
   how the voice sounds is judged by listening.

## Mix and verify

Use the result's actual duration and read back its media/layer ids. Keep one
intended placement. Avoid competing dialogue; use `update_layer_params` for
clip gain/fades and `set_role_gain` only for an authorized project-wide change.
Tighten wording without changing meaning, or make an authorized visual hold,
when real speech exceeds its window. Synthetic speech does not correct visible
mouth movement; true lip synchronization needs the video translation workflow.

After generation or timing changes, re-read `project://tracks`, inspect matching
frames with `capture_canvas_frame` and listen to the speech in context. Run
`audit_timeline_quality` over the completed range. Report timing, headroom and
structural evidence separately from pronunciation, voice fidelity and audible
quality. Route a requested delivery to the export delivery skill and inspect
the actual file before claiming completion.
