# Musical intent and lyrics

Read this for a vocal song or a cue whose sections must support specific story
beats. All model/mode arguments and lyric limits come from the live tool schema.

## Resolve the vocal fork

Use an explicit no-vocals instruction for speech-heavy beds when the route
supports instrumental generation. A request for a soundtrack or intro alone
does not identify a singer or authorize lyrics. When vocals are central but
the user has not chosen them, resolve that creative decision before generation.
The saved narration voice is a speech identity, not a singing control.

Preserve supplied lyrics and meaningful repetitions. If lyrics are missing,
draft original text in the requested language and obtain the missing text
decision before spending on a song. Existing authorization for an end-to-end
original song can cover drafting; do not create a second mandatory approval
when the user already authorized that scope. Do not silently rewrite names,
numbers or factual claims to improve meter.

## Separate text from music direction

Plan a small section sequence: opening, verse or exposition, lift, chorus or
payoff, optional bridge, ending. State the emotional change and instruments per
section. Use clear language about rhythm, texture and vocal delivery rather
than promising an exact named artist's recording.

Example original brief: "A restrained acoustic opening supports the dialogue;
gentle percussion arrives after the reveal; the chorus is warmer and broader;
finish with a clean resolving chord and room for the final title."

Keep lyrics and arrangement instructions distinct in the planning notes.
Map them into the chosen tool's actual contract: Suno custom vocal prompts carry
lyrics with separate style/title, ElevenLabs may accept lyrics inside its prompt
or supported composition-plan chunks, and Music Studio has separate style and
lyrics fields. Do not invent a common lyrics parameter for all tools.

## Name the music with numbers

Derive the music from what the story is, what the piece is for, and how fast
it moves, then write the brief in concrete terms: genre, BPM, key or mode,
chord movement, groove, lead instrument and how energy develops. Do not reach
for the same slow drone, arpeggio and glockenspiel bed by habit. Rough
starting points:

| Direction | Tempo (BPM) | Core sound | Often suits |
| --- | --- | --- | --- |
| Ambient tension | 60–90, little or no pulse | Sustained synth beds, low bowed strings, swelling piano | Suspense, after-dark scenes, an unfolding inquiry |
| Orchestral lift | 84–100 | Low strings on roots, horns carry the tune, timpani | Tribute, sport, victory |
| Neoclassical piano | 60–80, no drums | Open piano voicings, a cello line | Memory, quiet tributes |
| Baroque or whimsical chamber | 100–132 | Harpsichord, pizzicato, recorder | Craft, period, ritual |
| Jazz and swing | 120–180, swung | Walking bass, sax, piano, vibes | Comedy, retro, city nights |
| Lo-fi hip-hop | 70–92, lightly swung | Soft keys, dusty pad, sub on roots | Study, everyday warmth |
| House or disco | 118–126, four on the floor | Chord stabs, piano, strings | Launches, fashion, upbeat ads |
| Synthwave | 84–110 | Saw bass, big gated snare | Retro tech, night drives |
| Garage or drum and bass | 130–134 or 170–174 | Shuffled hats, gliding sub | Apps, fast highlights |
| Minimal techno | 124–130 | One-note pulse, clicks | Precision, engineering |
| Afrobeat or Latin | 100–115 (reggaeton 90–100) | Congas, shaker, marimba, brass stabs | Food, travel, summer |
| Folk or acoustic | 80–110 | Stomps, claps, plucked strings, harmonica | Makers, nature, home |
| Anatolian | 2/4, 4/4 or 9/8 aksak | Darbuka, frame drum, plucked lead over a drone, makam colour such as Hicaz | Istanbul, Turkish stories |
| Playful | 110–140 | Pizzicato, xylophone, woodblock | Kids, toys, comedy |
| Trap | 130–150 felt in half time | Rolling hats, gliding 808, bells | Streetwear, gaming |

Two directions may be mixed on purpose; say so in the brief.

## Shape the arc

- Vary the harmony instead of defaulting to one four-chord loop. Bright pieces
  can rest on two chords; serious ones suit a minor or stepwise descending
  progression; Dorian or Phrygian colour adds unease. A melody moving over a
  single held chord often beats a busy progression. Mark the story's turn with
  a key or mode change.
- Introduce a three-to-five-note figure early, reply to it, and alter it on
  each return (register, tempo, instrument). It can double as the signature
  sound.
- Keep the melody out of the way of speech: under narration it drops out or
  stays low, and it comes forward in the gaps between lines.
- Grow the arrangement gradually, adding a part every 4–8 bars; strip the
  drums out just before the payoff, bring the full arrangement in at the peak,
  and finish on the tonic or a sustained note.
- Before generating a sectioned cue, sketch a grid of sections against parts
  (which instrument plays where) and check it once against the edit. A held
  part should continue through adjacent sections rather than re-entering at
  each one, and no two parts should fill the same job in the same register at
  once.

## Edit after real audio exists

Treat planned duration and section times as intent. Listen and inspect the
actual result before aligning the edit. For sung captions, transcribe the
generated Audio through `transcribe_clip`; do not divide lyric lines equally
or assign estimated word timing. Missing word timing supports text review,
not precise word cuts.

Match meaningful musical changes to picture through supported Timeline edits.
Do not cut a word or resolving chord solely to satisfy a requested duration.
Keep the original generated media and make local editorial trims recoverable.
Inspect the export when delivery is requested; a plan, receipt or waveform
alone cannot establish lyric intelligibility or artistic acceptance.
