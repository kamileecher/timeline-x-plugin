# Caption craft: size, measure, reading speed, and placement

Read this when choosing caption size, line length, reading speed, placement,
a two-language layout, or a word-by-word style. It applies after cue text and
timing come from the transcript as the main skill describes, and it adds no
tool or caption capability.

## Time cues from the speech

- Take cue times from transcribed audio, including generated narration: run
  `transcribe_clip` on the placed narration layer rather than estimating times
  from the script.
- Caption speech, not designed sound such as reversed whispers or distant
  echoes, unless the user asks for sound descriptions.
- `audit_timeline_quality` compares cue timing with cached transcript words
  within caption_timing_tolerance_us, 350 ms by default.
- Read the transcript before captioning it. Speech models invent short
  phrases ("Thank you.", "Teşekkürler.") over silence and repeat the last line
  over a silent tail: drop any cue that starts inside a trailing silence found
  by `detect_silences`. When more than about a fifth of the tokens are music
  symbols, replacement characters or nonsense, the pass failed; recover as the
  recovery reference describes, or take sung words from the user.
- Chinese, Japanese and other unspaced scripts may come back as one long
  "word" per segment. Split such a segment into short phrases and spread its
  time by character count, then check the characters against what is said.
- Do not start the first cue on frame 0, where it looks like it was already
  there; start it 0.1–0.3 s in.
- Before placing captions on footage, scan an `inspect_visible_shots` sheet
  for subtitles already burned into the picture, sometimes only mid-clip.

## Size for the phone

font_size_ratio is a share of the composition height. In 16:9 and 1:1 the
height is the short side, so short-side sizes apply directly; in 9:16 multiply
a short-side share by 0.5625 (1080 ÷ 1920). Keep cap height at or above the
phone minimum: 2.6 percent of the short side in 9:16 and 1:1 (28 px at 1080
wide), 3.7 percent in 16:9 (40 px at 1920×1080). With cap height at 0.65–0.72
of the font size, that is a font_size_ratio of at least about 0.023 in 9:16,
0.04 in 1:1, and 0.057 in 16:9. `list_caption_templates` gives each
template's exact ratio; in 16:9 the smaller ones can fall below the minimum, so
raise font_size_ratio through the overrides of `apply_caption_template` and
check a composed frame.

letter_spacing and line_height are composition pixels. Convert em values by
multiplying by the font size in pixels; open all-caps captions by about
0.05 em. On a busy picture, add outline or shadow and judge the busiest frame;
the caption style has no background plate.

## Measure and reading speed

Use `analyze_caption_quality`, inspect its cue previews and remaining issues,
then apply the same plan with `apply_caption_quality_plan`:

- max_chars_per_line: 42 for 16:9; pass 32 for 9:16 and other narrow wrap
  boxes. Keep max_lines at 2.
- max_caption_cps counts non-whitespace characters per second and defaults to
  20. Pass a lower value, such as 17, for dense text or viewers reading in a
  second language, and use the same value later in `audit_timeline_quality`.
- Splitting creates no reading time. Resolve a reported reading-speed issue by
  extending the cue into a following pause with `update_caption`, without
  overlapping the next cue, or by shortening the wording only with the user's
  approval. Never cut a quote or a factual term silently.

## Placement and safe zones

- Placement is a 3×3 grid plus safe margins. safe_margin_ratio is one inset for
  both axes and limits the wrap box to 1 − 2 × margin of the width.
  safe_margin_y_ratio sets only the inset from the top or bottom and leaves the
  wrap width alone; safe_margin_x_ratio sets only the side inset.
- In 9:16, keep the caption block out of the bottom 20 percent, the top
  12 percent, and the right 10 percent, where platform controls sit. Lift the
  block with safe_margin_y_ratio, such as 0.2, and keep the box wide with
  box_width_ratio. In 16:9, use the lower band.
- x_px and y_px place the anchor point exactly: for a bottom placement y_px is
  the block's bottom edge, for a top placement its top edge, for middle its
  centre; x_px is the left edge, centre or right edge of the wrap box.
- Short word groups in 9:16 may sit in the centre band above the controls.
- title_safe_fraction in `audit_timeline_quality` is a centred rectangle; it does
  not know platform controls, so check the 9:16 zones on a composed frame from
  `capture_canvas_frame`.

## Two languages

- Show at most two languages at once. Arrange them with
  `layout_caption_languages`: stacked places the secondary above the primary at
  bottom centre; split and top-bottom are the alternatives.
- Keep the primary larger and at full contrast. Set the secondary a little
  smaller, optionally italic and slightly dimmer, with `restyle_captions` on its
  track.
- Mark the source language with `update_caption_group`, and show one language
  alone with `update_caption_visibility`.
- Translated text changes length. After `apply_subtitle_translations`, run
  `analyze_caption_quality` on each language's tracks separately, and
  `check_text_glyphs` on them: the default caption chain (Liberation Sans,
  then Noto Sans SC for Chinese and Japanese) has no Arabic, Thai,
  Devanagari or Korean, so those languages need an installed family that
  covers them.
- A caption or Text layer can use the bundled two or the twelve shared Motif
  fonts (Inter, Fraunces, Kalam and the others the Project design style
  offers); both render the same on every machine. Their files hold Latin and
  Latin Extended only, so other scripts fall to the next family in the chain.
  Any other family must be installed on this machine, and
  `check_text_glyphs` reports a family no tier provides as font_unresolved.

## Word-by-word styles

Line captions are the default. Use a word-locked style only when the user asks
for it or the format calls for it.

- The Kinetic and Karaoke intros, including the kinetic-slam template, need
  real word onsets. If the analysis reports missing onsets, keep line captions.
- For short groups, run `analyze_caption_quality` with max_words_per_cue 3,
  max_chars_per_line 18, and max_lines 1; it splits only at real word onsets.
  Then check that no group runs across a sentence end or a pause longer than
  about 0.25 s, and fix those with `split_caption_cue` or `merge_caption_cues`
  (pass a space as the separator to keep one line). Groups change with the
  speech, never on a timer.
- Match the group size to the register: two or three words for high energy,
  three to five for conversation, four to six for a calm reading. Only one
  group is on screen at a time.
- Text behind the speaker (the caption between the footage and a cut-out copy
  of the person, such as a keyed or previously matted copy) reads best
  when a large word is 30–55 percent covered: under about 15 percent it
  floats, over about 65 percent it is lost. Re-place the group when a content
  word is 80 percent covered or two neighbouring words 50 percent each, and
  judge each group over its own time window, because heads move. Move or push
  the footage and its cut-out together.
- A push on an emphasised word is a keyframed scale on the picture layer, not a
  caption effect: key both scale_x and scale_y with `set_keyframe`, about
  5–8 percent larger two or three frames after the word's onset, settling back
  over about 0.5 s with an ease-out from `set_keyframe_easing`. Check the layer
  anchor so the push centres on the subject. Use at most one per sentence and
  never two within 1.5 s.
- An accent word in a caption gets a contrasting colour, weight, or face
  through the ranges field of `update_layer_params` on that caption's Text
  layer. Give at most one word per caption group an accent, and pick the word
  that carries the meaning, usually a verb or a number. Range styling survives
  `restyle_captions`, so recheck the accent's contrast after a restyle.

## Review

Before styling authored caption copy (not a verbatim transcript), run
`check_script_text` with kind captions to catch dashes, stock phrases and lines
over nine words. Never rewrite a speaker's actual words to satisfy it.

Inspect composed frames with `capture_canvas_frame` at the longest cue, the
busiest background, a Turkish line with İ, ı, ğ, and ş, a 9:16 frame for the
control zones, and each visible language. Then run `audit_timeline_quality`
with the reading-speed limit used above and inspect its returned frames.
For an animated caption effect (word-by-word reveal, pop, or highlight), also
run `capture_canvas_strip` from the start of a busy cue: the consecutive frames
show words that overlap or jump mid-animation, which one still can miss.
Over footage, run `analyze_text_contrast` on the caption tracks' layers: it
samples each cue on the composed picture and reports the worst tenth of the
ground around the glyphs against 4.5:1 (3:1 for large type). A low_contrast or
ground_matches_text finding calls for the template's outline or plate, a
scrim, or another position, not a lighter colour guess. Size a scrim to the
text block at about 30–40 percent opacity; a full-width bar reads as a
broadcast strap. Keep captions off the speaker's face in every cue.
Whether captions are burned in or delivered as separate files is an export
setting; follow the export delivery skill and the advertised schema.
