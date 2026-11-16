# Mix and master

Read this before setting levels, ducking music under speech, or preparing the
mix for export. Every number is a starting point; the tools measure, and the
user listens. Delivery targets and file checks live in the
[export delivery loudness reference](../../timeline-x-export-delivery/references/loudness-and-final-checks.md).

## Speech stays on top

- Narration and dialogue stay clear and close; beds, choirs and textures
  surround the voice instead of covering it. The voice treatment itself
  belongs to the voiceover workflow.
- While a line plays, keep the voice about 8–10 dB above everything else, and
  roughly 15 dB above the bed inside the speech band. Measure it rather than
  guessing: solo one role at a time with `set_role_flags`, run
  `analyze_mix_loudness` over the line's range, then compare. Role solo is not
  undoable and also affects preview and export, so clear every solo as soon as
  the measurement is done.
- Set levels with clip gain through `update_layer_params`, a lane fader through
  `set_track_gain`, and `set_role_gain` only for an authorized project-wide
  change. `analyze_audio_loudness` reads one layer's source before Timeline
  gain and effects; it does not describe the placed result.

## Duck depth follows speech density

- A short line over music takes a deep duck; the `auto_duck_audio` default of
  -12 dB suits it. A stretch that is mostly talk takes a shallow duck of about
  6 dB, or a cut of the music's speech band (roughly 1–4 kHz) with
  `set_audio_eq` or `set_track_eq`, so the music is not buried for minutes.
- Prefer `analyze_speech_ducking` and `apply_speech_ducking` when cached
  transcripts exist: they reduce music only during measured spoken words. Use
  `auto_duck_audio` otherwise. Both protect existing gain automation.
- Leave out of the duck any layer that must keep sounding under the words, such
  as production sound or a product demonstration: `auto_duck_audio` targets one
  role, and `analyze_speech_ducking` can name the exact target layers.
- The attack ramp of both tools begins before the speech starts. When narration
  starts within about 0.6 s after a cut, lengthen the attack so the duck is
  already under way at the cut.

## Music across the piece

- Within a section, let one piece of music play through; avoid hard stops.
  Join with short overlapping fades, time fades to the picture's transitions,
  and finish on a resolved chord or a sustained note, not on a fade-out that
  just runs dry.
- To reach an exact length without changing speed, `analyze_music_remix` plans
  one rhythm-aligned skip or repeat and `apply_music_remix` commits it; listen
  to the seam before delivery.
- A deliberately calm or sombre section may run about 5 dB under the main
  section. Note that intent so the loudness map does not report it as an error.
- A Music Studio take mastered to loud -9 LUFS needs a large reduction under
  narration; for beds under speech, the streaming setting or no mastering
  leaves more room.

## Map the loudness

1. Measure `analyze_mix_loudness` per section of the scene plan, and in short
   windows of a few seconds on both sides of each transition. Measure the music
   alone (music role soloed) and the full mix. Check the last 15 seconds on
   their own; endings often jump.
2. Flag any section more than 3 LU from the median section, and any bed that
   jumps more than 4 LU across a cut unless the jump is scripted. Correct each
   one or record it as deliberate. After export, `audit_export_content` with
   the scene starts in `section_starts_s` measures the same map on the
   delivered file, adds each section's 2–5 kHz harshness against the median,
   and flags level steps of 12 LU or more at section starts.
3. Before export, set the master stage: `set_master_limiter` with
   `mode: "true_peak"` and a ceiling at or below -1 dBTP, and the master fader
   with `set_master_bus_db` when the delivery target is reached in the mix
   rather than by export normalization. Measure again with
   `analyze_mix_loudness`; it includes the limiter and every gain stage but not
   export normalization or encoding.

`audit_timeline_quality` and `analyze_audio_level` report sample peak and RMS,
not LUFS or true peak; never present them as loudness.

## Turn notes into numbers and ask the user to listen

Translate each listening note into a time range, a target layer and a change
you can measure. "The rain feels weak in the market scene" becomes "+3 dB on
the rain layer from 0:21 to 0:27, measured against the bed".

The agent measures sound; it does not hear it. Each mix or delivery report
states this in one line and asks the user for two listens, one on headphones
and one through a phone speaker, at named seconds: every transition, the
loudest section, the narrated lines, each flagged section and the ending.
