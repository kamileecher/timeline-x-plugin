# Delivery loudness and final checks

Read this before a finished delivery whose sound matters, and whenever the user
or a platform names a loudness target. It says which measurement covers which
question and what the delivery report must disclose.
Mix decisions (levels, ducking, per-section balance) follow the
[music mix reference](../../timeline-x-music/references/mix-and-master.md).

## Pick the loudness path

Read `get_export_settings` after applying any preset; the export's loudness
step is `settings.audio.normalization`, applied before encoding:

- speech: normalization to the speech and web target the app labels -16 LUFS.
  The YouTube, Reels, Douyin, Xiaohongshu and podcast presets currently set it.
- broadcast: normalization the app labels -23 LUFS, for broadcast-style
  delivery.
- off: no loudness change, only a safety limiter. The master ProRes preset
  uses it.

When the user or platform names another target, such as -14 LUFS integrated
with true peak at or below -1 dBTP for web and social, set normalization off
and reach it in the mix: a true-peak master limiter through
`set_master_limiter` with a ceiling a little below the target ceiling (lossy
encoding can raise true peak), the master fader through `set_master_bus_db`,
then `analyze_mix_loudness` over the full range, aiming within 1 LU of the
target. Do not stack export normalization on a mix already brought to target.

A Music Studio take mastered to streaming -14 or loud -9 LUFS is one source,
not the delivered mix; the export path above still decides the final level.

## Know what each measurement covers

| Tool | Measures | Does not measure |
| --- | --- | --- |
| `analyze_audio_loudness` | One layer's source: LUFS, true peak, range | Timeline gain, effects, the mix |
| `analyze_mix_loudness` | The processed Timeline mix with gains and master limiter: integrated LUFS, true peak, range | Export normalization and encoding |
| `audit_timeline_quality` | Waveform sample peak and RMS | LUFS or true peak |
| `audit_export_content` | The decoded file: integrated LUFS, loudness range and true peak (with an optional target), silence, sample-peak clipping risk, black and frozen picture, a still opening, one-frame flashes, and per section: gated loudness, 2–5 kHz harshness and the level step at each section start against the median section; contact sheet | Whether a flagged section is intended |
| `inspect_export_file` | Container, codecs, size, frame rate, pixel format, frame count, audio sample rate and channels | Loudness, colour tags |

Measure the delivered file, not only the mix: run `audit_export_content` with
`loudness_target_lufs` set to the chosen target (for example -14, -16 or -23)
and `true_peak_max_dbtp` to the ceiling (default -1). Its
`measurements.integrated_lufs` and `measurements.true_peak_dbtp` are the
delivered values to report; a `loudness_off_target` or `true_peak_above_ceiling`
finding means the export does not meet the target yet. Before export,
`analyze_mix_loudness` remains the way to steer the mix toward it.

Also measure per section. Without arguments the audit splits the file at the
picture cuts it detects; it finds hard cuts only, so an edit joined by
dissolves or other transitions reports the section check as skipped. Pass
`section_starts_s` with the scene plan's scene starts in seconds in that case
and when scenes hold several shots. Each section should sit
within 3 LU of the median section, with no 2–5 kHz share more than 3 dB above
the median and no level step of 12 LU or more at a section start; a
section_loudness_outlier, section_harshness_outlier or section_level_jump
finding is fixed in the mix or named as intended. Harshness is measured on
exports up to about 9 minutes. Check the last 15 seconds as well.

## Bitrate for textured pictures

Grain and fine texture raise bitrate sharply, and platforms re-encode anyway.
For a web delivery with grain, a peak ceiling keeps the file reasonable; about
8–10 Mbit/s is plenty for 1080p web delivery. A ceiling applies only with
`rate_mode: "vbr"`, not on the WebCodecs encoder engine, and never below the
target bitrate. Drop that ceiling only when the user explicitly wants an archival master.

## Final checklist

- `inspect_export_file` matches the expected size, frame rate, duration and
  frame count, the preset's video and audio codecs, and audio presence. Do not
  infer any of these from the extension or preset name.
- `audit_export_content` findings are reviewed on the contact sheet: no black,
  frozen or silent passage, no clipping risk, no off-target loudness or true
  peak, no `static_opening` in short-form work, and no `one_frame_flash`, unless
  the finding is intended and named.
- Key text and shapes still read on the contact sheet viewed at phone size,
  and captions passed the timeline audit.
- Loudness follows the chosen path above, with per-section exceptions named.
- Every outside file has a source record, so a credit line is ready when the
  user wants one, as the
  [outside material reference](../../timeline-x-media-import/references/outside-material.md)
  describes.
- The delivery message states that audio was checked by measurement only and
  lists the timestamps the user should audition on headphones and on a phone
  speaker: transitions, the loudest section, narration, flagged sections and
  the ending.
