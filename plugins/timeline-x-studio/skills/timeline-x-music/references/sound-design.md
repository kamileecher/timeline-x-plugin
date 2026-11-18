# Sound design around picture, speech and music

Read this when a narrated piece, ad or short film needs more than a music bed:
ambience, picture-locked effects, transitions and deliberate silence. It adds no
tool; it decides how existing roles, Timeline edits and native audio effects
are used. Levels and loudness follow [Mix and master](mix-and-master.md).

## Choose a sound identity

For a film or any piece with a story, offer three one-line sound concepts
before building and let the user pick or edit one. Each names a core idea, a
palette and one signature sound. Across the three, vary at least two of: where
the sounds come from (recordings, generation, instruments, voice), whether
music plays, whose point of hearing we share, and what silence does. Draw each
concept from this story's objects, setting and physics; a concept that would
suit any piece is too generic. For a quick piece, state one identity line in
the plan instead of asking.

Before delivery, test the mix against that identity: if it could be dropped
into a different piece unchanged, it has become a template, so go back to the
identity.

Under long narration, let the score carry a short repeating figure that grows
slowly (more voices, a higher register, a firmer rhythm) rather than a bed that
never changes. One sound from the film's own world can serve as the spine of
the score and answer a spoken line.

## Keep the sound believable

- Every sound has a source in the frame or just outside it. Cues with no
  source, such as a heartbeat under tension or a stinger on a reveal, stay out
  unless the story gives them one; designed risers and hits are spent within
  the limits below.
- Big things sound big: weight and long tails for scale, while a quiet moment
  gets one precise detail rather than a wash. To make a real recording larger,
  lower it with `set_audio_pitch`; an octave down reads as a much bigger
  object.
- Keep designed layers such as drones, beds and swells without a clear pitch
  unless the identity includes music; a pitched drone quietly turns a scene
  into a score.

## Layers and roles

Timeline X mixes by role: dialogue, voiceover, music and sfx. Ambience, room
tone, textures, foley and designed hits all use the sfx role; separate them by
layer and lane, not by inventing roles. Starting levels against the voice:

| Layer | Job | Starting level |
| --- | --- | --- |
| Room tone or space bed | Places the scene; changes when the space changes | 20–30 dB under the voice |
| Low body | Weight and scale; shaped with `set_audio_eq` so its energy sits around 70–250 Hz, where a phone speaker still plays it, not only below 60 Hz | Pulls back before the big moments |
| Textures | Sparse events that keep a space alive | 30–40 dB under the voice |
| Foley | Contacts locked to the picture | Set by distance |
| Hero events | The story's few big moments | The loudest moments of the piece |
| Designed hits | Accents on meaning | 6–8 dB over the section's loudest bed, not 15 |
| Small UI ticks and taps | Picture units such as tiles or labels | roughly 10–15 dB below the loudest music moments |

Each location gets a bed of its own, assigned per scene rather than at fixed
seconds, so the listener always knows where they are. Narration over nothing,
or music with nothing else, is still a draft.

## Every on-screen event gets its sound

- Before the first draft, walk the scene plan and the frames and list every
  on-screen event: time, event, its sound, its layers. Leave none silent unless
  the silence is a written choice, and report coverage in numbers, for example
  "42 events, 41 sounded, 1 silent by choice". Use `capture_canvas_frame` to
  find exact contact frames.
- Build an impact from separate layers whose peaks meet on the contact frame:
  the initial crack, the object's own body, the room it happens in, the decay,
  and a low thump only for the heaviest. A slammed iron gate takes all of them;
  a glass set down needs only the crack, the body and a little room.
- Align peaks, not onsets. A sound with a soft attack must start early by that
  attack time; let a whoosh crest 2–3 frames ahead of the motion it carries,
  finish a riser exactly on its cue, and put a click on the frame of the press.
- Physical events (water, steps, wind, cloth, glass, engines) take real
  recordings the user supplies or licenses, imported through the media import
  workflow. Generated or designed sound suits what follows motion or the score:
  risers, swells, tonal hits, abstract sounds with no real source.
- Before generating or asking the user for a recording, try the library that
  ships with the app: `search_sound_effects` finds about 520 recorded CC0
  effects (footsteps on five surfaces; glass, metal, wood and punch impacts;
  UI clicks, confirmations and errors; doors, books, cloth, coins, cards,
  dice; sci-fi lasers, engines and explosions) by English or Turkish words,
  offline and free. `add_sound_effect` copies one into Media/Audio and places
  it as an sfx layer at `t_start_us`. Sounds already in the project rank last,
  so search again for a fresh take instead of reusing one take for every step.
- When `generate_sound_effect` is advertised and the user has approved the
  provider spend, describe the sound physically: material, how it is struck or
  played, what rattles, and the recording distance (close, dry, outdoor field).
  Generated files often arrive quiet; measure them with `analyze_audio_level`
  or `analyze_audio_loudness` before judging them.
- Authentic first: find out how an instrument, ritual or place actually
  sounds. Exaggeration such as a sub boom or very long tails is the user's
  call. Swap out any recording that belongs to the wrong culture or location.

## Spend designed sounds on meaning

- Whooshes: no more than two in any 30 seconds, built as a low swell; keep
  airy noise sweeps for moments when air really rushes past the camera.
- The big moment: a riser into a stop-down of 0.1–0.5 s, then an impact on the
  frame of the reveal, used once or twice in a piece and at most one riser per 30 seconds.
- Cuts: give no more than roughly 70 % of cuts a designed sound, and nothing on roughly
  half of them, where the downbeat or the next shot's own sound carries the cut.
  Avoid repeating one transition sound back to back, and reserve full impacts
  for about five structural turns; lighter hits cover the rest.
- Score a cut with music rather than noise where the cut has a shape: a
  reversed pad that swells in the music's key and stops on a chapter cut, a
  gentle chime that opens up as the next shot expands from a small point, a short upward glide
  for a push through, a quick plucked run for a rhythmic reveal.
- Only when the story is about the voice itself, build a layer from it: a
  reversed whisper of a line for a secret (a `duplicate_layer` copy with the
  reverse field of `update_layer_params`), or a second take of the voice
  trailing a beat behind for a mind at odds with itself.
- Priority goes to the reveal, the name or logo, the key action and section
  changes; minor motion can ride on the music. Pan small sounds toward where
  they happen with the pan field of `update_layer_params`.
- Match small sounds to countable picture elements: one tick for each tile that
  lands, a short blip as a label settles, a soft roll while a number counts up.
- A repeated sound rotates two or three different takes; the same whoosh or
  click on every cut is the quickest tell of a template. Over strong music, a
  typing-heavy piece may drop its key ticks altogether.
- Light arrives before sound, so a contact sound one frame late reads as
  natural while one frame early reads as wrong. When a peak cannot sit exactly
  on its frame, put it a frame after, never before. Most generated or library
  files peak some milliseconds after their start; measure where the peak is
  before placing it.

## Cuts, tails and silence

- Beds cross cuts with an overlap of about 0.8 s, built from overlapping fades
  on two lanes. Dry sounds cut with the picture, with 10–20 ms fades.
- Start a new space early as a J-cut, 0.3–1.5 s before the picture cut, and let
  tails spill after it as an L-cut. Start long layers at least 0.3 s away from
  a cut.
- Reverb and delay from `set_audio_tx_fx_chain` stop at the clip
  boundary, so leave room for the tail by extending the clip end. There is no
  shared send: to place effects in one space, give the relevant layers the same
  reverb stage settings.
- Treat silence as a designed event. Close it with something (a last hit, a
  tail), then keep a faint room tone under it; accidental digital silence reads
  as a fault. About 0.3–1.5 s before the biggest moment, pull the room away so
  that moment lands as the loudest. Mark every intended silence in the plan,
  since `audit_export_content` reports silent passages as findings.
- Give a key moment its own small sound event: clear the bed, play a single low
  hit or one sustained note, and let it decay.
- Keep spectacle away from victims, grief or suffering: no explosions, risers
  or whooshes there; let room tone or silence hold those images.
- Keep melodic leads easy on the ear. Bright raw synth leads, harsh winds and
  brass tire the ear within seconds; ask generators for plucked or percussive
  leads, or soften a lead with a low-pass around 2–3 kHz, then ask the user to
  listen.

## Adapt to the format

- Vertical short: audio begins on the first frame, the quiet before the peak
  is only 0.3–0.5 s, and picture plus on-screen text must carry the story with
  the sound off.
- Music-led: the song sets the clock; follow
  [Music-led edits](music-led-edits.md) and fit design into its gaps.
- Product or brand: interface sounds follow on-screen events exactly, and a
  single hero moment gets a short drop in front of it.
