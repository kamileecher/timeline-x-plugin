---
name: timeline-x-music
description: "Generate songs or background music in Timeline X Studio through managed Music Studio engines, local MusicGen or configured Suno, then place, trim and mix it without masking speech."
---

# Timeline X Studio Music Generation

Use this skill when the user wants newly generated music. Do not use it to
clean, remix or separate an existing track.

Read only what the task needs:
[Musical intent and lyrics](references/musical-intent-and-lyrics.md) for vocal
songs, sectioned cues and the musical brief;
[Sound design](references/sound-design.md) for ambience, effects, transitions
and deliberate silence around the music;
[Mix and master](references/mix-and-master.md) before setting levels, ducking
or loudness; [Music-led edits](references/music-led-edits.md) when the user
supplies the song and the picture should follow it.

## Managed Music Studio engines

When the user requests YuE2, ACE-Step or Stable Audio, read
`music_studio_status` and the current tool schema first. Preparation is an explicit
Audio and Music Settings action; status is not proof of successful inference.
Use only an engine whose audio readiness is advertised. Never pass runtime paths,
worker URLs, download URLs, executable names or credentials in music requests.

- ACE-Step 1.5 Turbo accepts lyrics or instrumental prompts, 10–300 seconds,
  fixed 8 steps and CFG 1. Use `cot=off`; choose an advertised vocal language such
  as tr for Turkish. Instrumental requests have empty lyrics.
- Stable Audio 3 Small Music and Medium accept instrumental prompts, at most 120
  and 380 seconds respectively. Use `cot=off`, empty lyrics, and no vocal-language
  input. They do not support controlled singing.
- YuE2 retains editable ABC planning and optional separately configured music
  transcription. The other two model families expose prompt-only drafts, not
  score editing, MIDI, covers, inpainting, continuation or stems.

- YuE2 (yue2.cpp), engine `yue2-cpp`, is the full studio engine: songs of 8–600
  seconds with an editable score, covers through `music_studio_transcribe`, LoRA
  and replay. Prefer it for YuE2 work when its audio readiness is advertised.

### YuE2 (yue2.cpp) studio workflow

- LoRA: read `music_studio_lora_list` and pass chosen names with a scale in the
  plan's adapters. For a catalogue LoRA (catalogId set) scale 1 is its trained
  strength and its trigger word is added to the style for you. Downloading,
  importing or removing LoRA is the user's action in the Music Studio window;
  never invent a name. Instrumentals take the instrumental LoRA on their own.
- Advanced: the plan's advanced sets compositions (different songs) and
  variations (different takes); each extra track becomes its own run and Library
  song, listed in the generate job's variations. Keep compositions × variations
  small, as every track costs a full render. `solver: ab2` is about twice as fast;
  harmony breaks looping chords; leave sampling unset unless asked.
- Score: after planning, read the score from the job. Use
  `music_studio_score_transform` for key or voice-octave changes,
  `music_studio_update_score` for written edits (with abc_continue when the
  score is only an opening the model should continue), `music_studio_score_midi`
  to hand the score out as MIDI and `music_studio_score_from_midi` to take a MIDI
  melody in. Generate again after any score change.
- Replay: `music_studio_replay` makes a new run from a finished song that keeps
  its composition and only changes the sound seed, steps or LoRA; queue
  `music_studio_generate` on the returned run. With `extend_seconds` (5-300,
  whole song up to 600 s) the same tool makes the song longer instead: it goes
  on from its last frame, so ask for it when the user wants more of a song they
  like rather than a new one.
- Mastering is a Music Studio setting the user chooses (off, streaming -14 LUFS,
  loud -9 LUFS); every new take follows it. A job's audio is already mastered
  when the setting is on, so do not add loudness normalisation on top.

For a new song with no score review, call `music_studio_song` once: it plans,
checks the score against the lyrics and length, generates, delivers and scores
the takes in one job. Follow any job with `music_studio_wait` (it returns when
the job ends or after at most 55 seconds; call again while `done` is false)
instead of polling `music_studio_get_job`. Job replies are summaries; ask for
`detail: "full"` only when the score or lyrics text is needed. Take count
follows the Music Studio setting unless `advanced.variations` is given; when
`result.takes` is present, offer the `best` take first.

To review the score before audio, call `music_studio_plan`, wait for it, then
pass the returned main-issued run id to `music_studio_generate` with the
requested placement and wait for that job. Keep the same caller/session for public job ownership. Use
`music_studio_cancel` for an active job; use `music_studio_restart` only after
checking a failed/interrupted outcome and existing Library delivery. An exact
delivery retry reuses verified audio. Do not regenerate or import audio again
merely because the first result was interrupted during placement.

Successful generation already enters Library and optional Timeline through the
shared actor path. Confirm the returned media/layer identities and audible
output before claiming completion. Full-song performance and Turkish lyric
accuracy require separate listening tests. Retain the displayed model license
conditions; Stable Audio Community/Gemma terms are distinct from ACE-Step MIT.

## Generate

1. Read `project://scene-plan` and the intended edit range. Resolve style,
   mood, energy, instrumentation, tempo feel, vocal/no-vocal preference, and
   the music's editorial job.
2. For local generation, call `generate_local_music` with a concise prompt, an
   explicit duration from 2 to 30 seconds, and placement set to media-pool or
   timeline according to the request. The first on-device MusicGen download is
   large; later calls use the local cache. Do not promise completion before the
   tool returns.
3. When the user explicitly requests Suno or a longer/studio-style cloud
   result, call `generate_suno_music` using the current transport's live schema.
   For named vocal songs or supplied lyrics, set custom_mode=true,
   instrumental=false, style and title. Simple mode accepts a description up to
   500 characters with no style/title. Choose a supported model and candidate_index
   0 or 1. Duration is optional and supported only for V5_5 custom mode; omit it
   for V4_5ALL. This can spend external credits and requires a configured Suno
   credential. Preserve the requested lyrics and vocal choice.
4. Distinguish the two execution contracts before calling:
   - **Public MCP:** supply a stable request_key and explicit placement; Timeline
     placement also requires an existing unlocked track_id and exact t_start_us.
     Never send native force_regenerate/variant_nonce fields. The first call
     starts a durable job, not a delivered audio file. Poll the advertised audio
     production job tool, then repeat the identical original request and key to
     import/place the completed candidate once. If the host's imported signature
     lacks request_key, read the live schema and use its advertised canonical-call
     bridge; do not keep submitting the incompatible cached signature. A known
     Suno task can resume after reconnect; an unknown paid outcome must not be
     resubmitted under a new key.
   - **Local MCP:** use only fields advertised by the local tool. Its successful
     call already downloads, imports and optionally places the selected audio
     with role music. Exact retries use its cache; native variation options are
     only for a newly requested generation, never failure recovery.
   Do not duplicate either route's delivery with another import or add-layer call.

Generated music cannot guarantee an exact beat, drop, cadence, or seamless
loop at a requested timestamp. Generate the musical material first, then use
Timeline edits for exact placement, trimming, duplication, fades, and level
automation. Measure the delivered take with `analyze_beat_grid` before cutting
picture to it rather than trusting the BPM in the prompt. Do not describe a duplicated clip as seamless until the join is
audibly verified.

## Mix and verify

Generated music cannot guarantee exact drops, lyric times, cadences or seamless
loops. Use actual audio duration for trimming, fades and placement; listen to
every repeated join before calling it seamless. Preserve critical production
sound and sound-based demonstrations. A silent passage may be intentional.

Use `update_layer_params` for clip gain/fades and `auto_duck_audio` when speech
overlaps. Re-read `project://media` and `project://tracks`, confirm the requested
single asset/placement, and use `analyze_audio_level` and
`audit_timeline_quality` over the audible range. Listen to the generated song
for missing/truncated lyrics and artifacts. Report source capability, job
completion, Library/Timeline evidence and audible acceptance separately.
Sound is measured, not heard: name the seconds the user should listen to.
