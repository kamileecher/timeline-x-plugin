# Music-led edits and music videos

Read this when the user brings the music (their own song, a licensed track or
a finished generated take) and the picture should follow it. Nothing is
generated here; a supplied song settles what the soundtrack is and, when it is used whole,
the length. Idea, look and format are still decided with the user.

## Source record

Record where the music came from as the [outside material reference](../../timeline-x-media-import/references/outside-material.md)
describes.

## Lock the timing grid

1. For a song with words, request timed lyrics, either as an LRC file or as the start time
   of each sung line. Estimating line starts by ear is not enough, since a pop
   line can last as little as 2–3 s.
2. Without timings, request the lyrics as plain text with each sung phrase on its own line. Then
   take times from the audio with `transcribe_clip` on the placed song; check
   whether its word timing is exact or interpolated. Sung words under music
   are often misheard: the user's text is the truth, and where the heard words
   differ, flag the line and ask the user to confirm its start by ear before
   cutting on it. With no usable timing, cut on sections only and put no words
   on screen.
3. Measure the beat grid with `analyze_beat_grid` on the placed song (normal
   speed, forward). It returns the tempo, a 0–1 confidence, every beat and
   each bar start in Timeline microseconds, assuming four beats to a bar
   unless you pass `beats_per_bar`. Two readings need a human check: a
   tempo that is half or double the felt one (run again with `bpm_hint` set
   to the felt tempo) and a confidence below 0.3, which means rubato,
   ambient or speech-led material where the grid is a guess. Either way, have
   the user listen to where the first bar starts before you cut on it. When
   the user already knows the tempo and first downbeat, their numbers win; in
   4/4 a bar lasts 240 / BPM seconds.
4. Place the grid as markers. `analyze_beat_grid` with `place_markers` set to
   bars drops a labelled marker on each bar start in one undoable step (beats
   marks every beat, bar starts in the stronger colour); add region markers
   with `add_marker` for sections (intro, verse, chorus, bridge, outro). Snap
   each cut to the project frame grid and read the markers back from
   `project://markers`.
5. Trim the song so it begins on a bar line a bar or two ahead of the first
   sung line you keep, and fade its end with `update_layer_params`. The music's
   first frame on the Timeline is then a downbeat.

When you choose the tempo yourself, as in a generation prompt, pick one whose
beat is a whole number of frames (frames per beat = fps × 60 / BPM): at 24 fps,
80, 90, 96, 120 or 144 BPM; at 30 fps, 90, 100, 112.5 or 120 BPM. Generated
music may still drift, so verify against the real audio.

## Cut picture on the grid

- Put scene boundaries on bar lines and hits on beats the song already
  accents; never layer added drums over the song's own.
- To write music to the picture instead of cutting to a song, mark each
  picture accent (label one marker drop and one end) and call
  `plan_music_to_cues`. Hear its score at once with `render_score_audio`
  (recorded CC0 instruments fetched on demand, or synthesised voices), or
  generate from it (`music_studio_score_from_midi`) or its prompt; place the
  music at `place_at_us`, then check it. A render that returns
  `needs_confirmation` waits for the user's yes to a large first download.
- Before export, put a marker on each picture accent (title hit, cut, Motion
  Graphic beat) and run `check_music_cue_sync` on the music layer. It reports
  each cue as hit, near or miss with its offset in milliseconds. A shared
  offset comes back as `suggested_music_shift_us` (slide the music layer);
  for a single near or miss, move the cut or accent, or put a sound effect on
  the cue instead.
- Use few effects, because a finished song already occupies most of the
  frequency range. Keep foley tied to the picture and a handful of accents beneath the
  music, as [Sound design](sound-design.md) describes. The song keeps the music
  role, so it ducks under narration like any bed.
- For graphics that pulse with the song, bind a Motion Graphic to the audio
  layer and drive it with `useAudio` (level, onset, beat pulse, frequency
  bands) through the motion graphics workflow; that reacts per frame. For a
  graphic that must land on one exact bar, such as a title on the chorus,
  start its layer on that bar's marker instead.
- To end at a set length, plan a rhythm-aligned skip or repeat with
  `analyze_music_remix`, apply it with `apply_music_remix` only after the user
  agrees, and ask them to listen to the seam.

## Land picture on the hit

- A move that must arrive on a hit starts 40–190 ms before it; a reaction to
  the hit (a shake, a flash, a bounce) starts 0–45 ms after it. The change on
  the hit frame itself is instant: an eased transition into a hit blurs it.
- A word meant to be read stays up for at least one beat.
- Any single treatment goes stale after about 6 s. Lengthen a section with a
  hold or a new treatment, never by slowing the moves.
- On rhythmic stretches give footage one clip per strong beat; on calm ones a
  single slow push, about 1.0 to 1.08 scale over the shot, is enough. On calm
  material cut on phrase and energy changes rather than a grid you do not
  trust.
- A library or stock bed that opens on a quiet build drains a short piece:
  start it at a stronger later bar and fade it in over about 0.4 s.

## Shape a music video

- Before planning any shot, settle the concept in a single paragraph: the
  world we are in, what shifts across the song, and where it lands.
- Map chapters to the song's structure. Give every section its own location
  and a narrow palette that still sits within the video's look.
- Hold the whole together with one connecting device, such as a returning
  location, an evolving motif, a colour progression, or a single transition
  rule.
- Plan roughly one image per sung line, typically 1.5–4 s each. Add a lyric
  column to the shot table plus a column for each shot's exit. If an image
  needs longer than its line, let it continue under the following line instead
  of stretching the song.
- Show each line through action rather than on-screen words: no signs or
  captions that echo the lyric. Lyrics on screen, when requested, live on their
  own typographic layer.
- Reserve big sound events for a few moments in the whole video; the song
  carries everything else.
- For a long video, keep each chapter's bar times in its region marker labels
  so hits land exactly, and check the seams between chapters together at the
  end.
