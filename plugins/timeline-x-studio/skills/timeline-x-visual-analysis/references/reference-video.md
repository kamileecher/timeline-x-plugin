# Measure a reference video's form

Read this when the user shows a video and asks for "something like this, but
different". Measure the reference's form (length, rhythm, look, opening and
ending), ask what should change, and build new material on that form. Use the
reference only as something to analyse: none of its images, soundtrack, shots,
people, marks, or text may appear in the new edit. The idea always comes from
the user; when they gave none, ask for it or offer two or three new subjects
that suit the measured form.

## Bring the file in

Work from a file the user hands over, whether they exported it, already
downloaded it, or captured it from their screen. Do not fetch a reference from
a streaming page. Import it with `import_media`.

The shot tools read layers on the current Timeline, so the reference is placed
temporarily. That is a project change: make it only when the user asked to
build on the reference, and say that it will be removed. Create a `checkpoint`,
add a new top track with `add_track`, and place the reference with
`add_video_layer` after the end of the existing edit so it covers nothing. When
measuring is done, remove the reference layers and that track, or restore the
checkpoint when nothing else changed since.

## Measure

- `analyze_clip` on the reference layer returns each shot's range,
  brightness, motion, and black, freeze, or fade flags. Work out how many
  shots there are, their mean duration and how widely durations vary, how long
  the first and last shots run, and where the pace shifts. Its times are
  source-absolute.
- `auto_split_by_shot` on the same layer, then `inspect_visible_shots` over
  the reference's range, gives one labeled sheet with a frame per shot. The
  split belongs to the temporary placement and is removed with it.
- `describe_clip` with the shot-type focus adds shot sizes, camera motion, and
  setting per segment when a local vision backend is available.
- When the reference has sound, `separate_audio_to_new_track` puts it on its
  own Audio layer with the same timing. `analyze_audio_loudness` then reports
  its loudness, and `analyze_beat_grid` with `place_markers` left at none
  reports its tempo, beats, and bar starts.
- Tempo against cutting: turn `analyze_clip`'s source-absolute shot starts into
  Timeline time with the layer's start and source in-point, then count how many
  fall within about two frames of a beat and how many on a bar start.
- `get_color_scopes` at a few representative shots gives mean luma and the
  Cb/Cr colour balance, a measured stand-in for brightness and warmth.

From the sheet, write five short readings: the camera's character, the kinds
of transition, the on-screen type, how it opens, and how it ends. Report what
could not be measured, such as a reference without sound or a beat grid with
low tempo confidence.

## Ask what changes

Present the contact sheet together with the measurements in a single message,
followed by one multi-select question: what should change: the subject (always
new), the look, the tempo, the sound, or the length and format, plus room for
the user's own words. Each answer overrides the matching measurement.

## Build on the form, not the shots

Whatever the user keeps becomes a target: a matching beat count at a matching
duration, openings and endings of the same kind, a similar mean shot length,
a similar share of cuts on the beat, and a comparable palette. In a film plan,
the reference becomes one of the look directions offered, and a kept tempo
sets the mean shot length; new music is asked for at the measured tempo. Do not copy compositions, shot order, music, or
words; new music may share the energy, never the song. When cutting the user's
own footage to the reference's rhythm, `find_similar_shots` with a reference
shot as the query ranks placed shots with similar brightness, motion, and
sharpness. It does not recognise content, so confirm each pick by eye.

Before presenting a plan or a draft, ask whether any frame could be mistaken
for one of the reference's own. If it could, redo that frame.
