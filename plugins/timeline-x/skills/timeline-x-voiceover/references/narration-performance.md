# Narration performance, checks and timing

Read this for narrated films, ads and stories where the reading itself
matters. It complements the treatment section of the skill and adds no tool.
Levels under music and ducking depth follow the
[music mix reference](../../timeline-x-music/references/mix-and-master.md).

## Size the script before synthesis

- Synthetic English narration reads about 2.2 words a second; Turkish words are
  longer, so plan with fewer of them and measure the real take. Keep a scene to
  about 19 English words (roughly 9 s), let at most two scenes reach about 26
  (12 s), and keep a 30–90 s piece near 155 words; a whole piece rarely needs
  more than about 400.
- Narration longer than its visuals forces the picture to pad with idle drift.
  Trim the script; never stretch the motion to fill it.
- Write narration as separate phrases so it gives the picture cue points.
  Reveal each element when the voice names it, spread across the back half of
  the scene; everything on screen in the first quarter and then frozen reads
  as a slideshow.

## Choose the voice by ear

The user chooses the voice by listening. When they want to compare voices, use
only candidates they name or approve: two or three voices that are native in
the script's language, or a purpose-built synthetic voice. Generate the same single line for each as its own
short take, present the takes numbered and one at a time, and ask which. Never
join candidates into one file. After the pick, remove only the audition layers
you created. A whisper or other special delivery belongs on chosen lines only.

## Vary the reading

- Give each line its own intent and vary how lines finish: rising as if asking,
  trailing off unresolved, or ending on an audible inhale. Line after line closing on one identical downward cadence
  wears the listener out quickly. The key lines (the thesis, the hardest fact,
  the last line) are statements: they never rise at the end like a question.
- Let lines run across cuts: start a line just before the picture cut or let it
  finish after it.
- Keep the ending elastic. A slower reading pushes everything after it, so
  place end titles and the last music hit from the measured narration, not
  from planned seconds.

## Check generated speech

- Transcribe each placed take with `transcribe_clip` and compare it with the
  approved script for dropped, doubled or misread words, names and numbers.
  Transcription reads the source before audio effects, so treatment does not
  hide a misreading, and the user still listens for pronunciation.
- Measure pauses on the untreated take, from transcript word times; reverb
  tails make gaps look shorter than they are.

## Voice EQ starting points

Translate a listening note into one `set_audio_eq` move on the voice layer,
then ask the user to listen again:

| The voice sounds | Starting move |
| --- | --- |
| Hum, rumble, handling noise | high-pass at about 80 Hz |
| Boomy or too close | cut about 4 dB around 200 Hz |
| Muffled | cut about 3 dB around 250 Hz |
| Hard to make out under music | lift about 2.5 dB around 3 kHz, or duck the music further |
| Harsh | cut about 3 dB around 3.2 kHz |
| Peaks clipping | limiting after the EQ with `set_audio_dynamics` |

## Time sound from the lines

Place the narration first, then derive the timing of hits, accents and music
changes from its measured word times. Anchor each one to a line (leading into
it, following it, or landing on the word that carries the meaning) rather than
to seconds fixed in advance. Whenever narration is speaking, it
remains clearly the loudest element; measure that with the mix reference rather than assuming
it.
