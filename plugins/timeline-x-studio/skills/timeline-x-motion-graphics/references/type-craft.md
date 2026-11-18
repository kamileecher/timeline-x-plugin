# Type craft: roles, spacing, text patterns, and moving type

Read this when setting titles, labels, lower thirds, prices, counters, or
kinetic text inside a Motif, or when reviewing type before calling a graphic
finished. Phone sizes, Turkish casing, and diacritic headroom are in
[typography and layout](typography-layout.md); timing and easing are in
[motion craft](motion-craft.md). This reference adds no tool or runtime
capability.

## Families and fixed roles

A Motif is offline, so its type comes from two sources:

- **Bundled families (preferred):** twelve open-licence families ship with
  the app with full Turkish coverage, so they render identically on every
  machine (the table below gives each one's role). A JSX Motion Graphic names
  them directly, for example `fontFamily: 'Fraunces'`; runtime v9 knows Inter,
  Stack Sans Notch and JetBrains Mono, runtime v10 all twelve, and the runtime
  loads the families the source or props name before the first capture. An HTML Motif
  declares its own @font-face rules pointing at `_shared/fonts/<file>` and
  forces the faces with document.fonts.load before setup resolves (see
  `motif-authoring.md` beside the main skill). Their files hold Latin and
  Latin Extended only: Cyrillic, Greek, Arabic or CJK copy falls to a system
  face. Before authoring such copy, run `check_text_glyphs` with the text and
  the family the code will name.
- **System stacks:** `system-ui, -apple-system, sans-serif`, `Georgia, serif`,
  and `Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`.
  The Project visual style can name either kind; prefer its bundled choices. They resolve to the operating system's own
  faces, so widths and cap heights differ between machines; measure on composed
  frames from the machine that exports and leave spare width.

Give every family a role and keep it for the whole piece: a display role for
titles and single large words, a text role for labels, lower thirds, and fine
print, and a numbers role for counters, data, code, and timestamps.

| Family | Kind | Weights | Best role |
| --- | --- | --- | --- |
| Inter | neutral grotesque | 100–900 | text and labels; the safe default, and the one every generated design reaches for |
| Instrument Sans | quiet grotesque | 400–700 | text and labels with a little more character than Inter |
| Archivo | sturdy grotesque | 100–900 | heavy headlines down to labels; news, sport, campaigns |
| Bricolage Grotesque | expressive grotesque | 200–800 | display for ads, social, playful explainers |
| Space Grotesk | technical grotesque | 300–700 | display and labels for tech, interfaces, retro future |
| Stack Sans Notch | notched display sans | 200–700 | bold contemporary titles |
| Unbounded | wide display | 200–900 | short wide titles and single words; never long lines |
| Big Shoulders | condensed display | 100–900 | tall headlines, chapter numbers, big figures, posters |
| Fraunces | soft old-style serif | 100–900 | literary, period and storybook titles |
| Newsreader | reading serif | 200–800 | documentary text, quotes, editorial titles |
| JetBrains Mono | monospace | 100–800 | data, code, timecodes, labels in technical pieces |
| Kalam | handwriting | 400, 700 | one accent word, a margin note, a marker circle's label |

| Voice | Display | Text | Numbers | Suits |
| --- | --- | --- | --- | --- |
| Quiet, minimal | Instrument Sans or Inter, heavy | the same, regular | tabular figures of the text face | product, explainer, interface |
| Bold, contemporary | Bricolage Grotesque or Stack Sans Notch | Instrument Sans | JetBrains Mono | promo, social, launch |
| Editorial, literary, period | Fraunces | Newsreader or Instrument Sans | Instrument Sans tabular | essay, documentary, culture |
| Documentary, evidence | Big Shoulders or Archivo | Newsreader | JetBrains Mono | history, investigations, maps and documents |
| Technical, data | Space Grotesk | Instrument Sans or JetBrains Mono | JetBrains Mono | tools, data, code |
| Wide, futurist | Unbounded | Space Grotesk | JetBrains Mono | tech launches, games, short title cards |
| Handmade | Fraunces | Instrument Sans | Instrument Sans | storybook, crafts, children's pieces, with Kalam for one note |

Inter is the default every generated design reaches for, so a piece that
should look made for this story picks another text face unless the Project
style names Inter.

- Use two families at most, plus a monospace family for data. Contrast comes
  from structure (serif against sans), weight, size, case, and spacing, never
  from two faces that are almost alike.
- When two families share a line, size them so their cap heights match within
  about 10 percent, and check the render.
- Georgia has regular, bold, and their italics only, so an intermediate or
  animated weight snaps. Its default numerals are old-style and rise and fall;
  set prices, counters, and tables in a Georgia design with Inter or JetBrains
  Mono. Every bundled family except Kalam is variable, so any weight in its
  range renders and can be animated smoothly; Kalam has only 400 and 700, and a
  weight between them snaps.
- When no bundled family carries the film's tone, `search_fonts` ranks about
  1,500 open-licence families with Turkish letters by tone words ("komik çizgi
  film", "belgesel sakin", "luxury fashion"); `add_font` installs one id once,
  after which its family name works in Text layers, captions and Motion
  Graphics like a bundled one. A Motion Graphic compiled before the install
  needs its code updated once to load it. A static family keeps only its
  400/700/900 weights, so other weights snap.

## Spacing and measure

In a Motif, set tracking as letterSpacing in em so it scales with size:

- Small text, under about 2.5 percent of the short side: open by +0.015 em.
- Display text, above about 6 percent of the short side: tighten by 0.01–0.02 em.
- All caps always open: about +0.08 em small, +0.05 em medium, +0.03 em large.
- Lowercase display stays within +0.01 em unless open tracking is the piece's
  named signature.

Set line height to 1.25–1.4 for text, 0.95–1.05 for display, and 1.0–1.1 for
all-caps display, then add the diacritic headroom from the typography and layout
reference. Keep lines to about 32 characters in 9:16 and 42 in 16:9. Balance a
multi-line title with `textWrap: 'balance'` and confirm the breaks on the
render. Never end a line on a one-letter word.

## Figures and features

- Counters, prices, and timecodes use `fontVariantNumeric: 'tabular-nums'` in
  Inter or the system stack, or a monospace face, so digits keep their width while
  they change. Check consecutive frames of a counter for a jiggling width.
- For all-caps lines with dashes or brackets, request case-sensitive forms with
  `fontFeatureSettings: '"case"'`. System faces differ in what they carry, so
  treat any requested feature as absent until a render shows it. Keep kerning on.

## Grid and colour roles

- Use one outer margin per piece, at least 7 percent of the short side. In
  vertical delivery also keep text out of the top 12 percent, the bottom
  20 percent, and the right 10 percent; 1:1 and 4:5 keep about 6 percent and
  16:9 about 5 percent. While captions or a progress bar occupy the lowest
  12 percent, place no graphics there.
- One alignment per card: left for information, centred for ceremony such as
  title and end cards. Put baselines on a shared rhythm equal to the text
  leading.
- Two statistics never sit side by side at the same size and height; give one
  the lead or stack them.
- Colour text by role from the Project palette: the main ink for body copy,
  one accent reserved for the figure or name that matters most, a muted tone for
  supporting lines and dates, and optionally a tint per section so a long piece
  does not feel like the same card repeated.
  The accent marks the single chosen thing.

## Common text patterns

- **Title card:** one card, centred or held on a strong left edge, with generous
  space; a slow 1–2 s reveal that lands on a musical phrase; ink on the darkest
  or lightest value of the palette. Credits sit in the text role at T4, set in
  capitals with widened tracking.
- **Lower third:** the name in the text role at T3, weight 600, on a solid
  panel or scrim; the role line at T4 below; the left edge on the margin; above
  the bottom 20 percent in 9:16.
- **Price and call to action:** the price in the display or numbers role with
  tabular figures at T2; the call to action starts with a capitalised verb on a
  rounded panel that contrasts with the background, keeps one position across
  variants, and appears once per piece.
- **Legal line:** text role, static, at or above the legal cap-height minimum,
  on screen at least 3 s, with contrast of at least 4.5:1.
- **Identity label:** when the piece depends on who or what is shown (a place,
  product, or maker), name it with a short label held long enough to read.
- **Title inside the shot:** instead of floating over the picture, a title can
  sit on a surface in the scene (a wall, a sign, the ground), pinned with
  `set_corner_pin` and carried with the camera through `apply_motion_track`, or
  pass behind a foreground object through an `add_mask` matte. Keep it for the
  title or a place name, once or twice in a piece, and check legibility on the
  frame where the surface turns most.
- Never fill a screen with invented names, addresses, or figures. Stand in
  neutral rounded blocks or soft lines for content the brief does not supply.

## Moving type

- Animate characters for titles of one or two words and words for longer
  lines, in reading order, with the stagger spread over 35–60 percent of the
  entrance.
- For text rising out of a mask, travel each unit 0.6–1.0 line heights within
  an overflow-hidden wrapper that is tall enough for accents above the caps, so
  the dot of İ and the breve of Ğ stay whole on every frame of the move.
- After a line lands, hold it still for at least 0.4 s plus 0.06 s per word
  before anything else on it moves. Move one text layer at a time and stop
  moving before the viewer must read.
- Animate weight only in a variable bundled face, never in Georgia or Kalam,
  and tie it to the music through
  `useAudio().beat` or level rather than a timer. Change one type property at a
  time and bring it to rest before the viewer needs to read the line. Reserve
  animated tracking (from wide to normal) for titles.
- Use one or two kinetic devices per piece, each with a job: letters dropping
  in a stagger with one recoloured as the accent, a headline closed by a full
  stop in the accent colour, a single word that lands hard with outlined copies
  above and below, a figure rolling digit by digit with tabular figures, tags
  that wipe in and settle into a row, a slanted band of words crossing a recap,
  or small corner type framing the shot.

## Accent cards

A title, chapter, call-to-action, cover, or end card may pair a dominant voice
with a short accent. With the available families, that means a heavy system
display with a Georgia italic accent: a contrast of structure and slope.

- One dominant and one accent per card, contrasting on at most two axes.
- The accent is one to three words that carry the feeling, never facts,
  prices, captions, fine print, or a whole sentence.
- Size the accent's cap height at 40–60 percent of the dominant's. Only the
  accent may rotate, at most 6 degrees.
- Outline, shadow, or texture goes on one of the two, never both. The dominant
  stays neutral or brand-coloured; only the accent takes the highlight colour.
- The dominant lands first and the accent follows 150–300 ms later.
- Keep accent cards to about four per piece; the rest use the plain roles.
  Fix a card with more than two families, an accent of more than about four
  words, effects on both voices, equal size or colour, an accent rotated past
  10 degrees or broken over lines, or a face that changes word by word.
- Render the italic accent with the "İĞÜŞÖÇ ığüşöç" test line and the real
  words before choosing it.

## Hard rules and deliberate breaks

Never break the phone cap-height minimums, contrast of 4.5:1 for text and fine
print (3:1 for large display), the reading hold, intact diacritics and glyphs,
or the offline font set.

The remaining defaults can be departed from deliberately: the two-family
limit, effects on a single layer, a single alignment per card, size-based
tracking, animating one property at once, and the left-for-information,
centred-for-ceremony split. A break is valid
only when it is named with a reason from this piece in the plan shown to the
user, applied the same way everywhere as the piece's signature, and confirmed
in review as intentional without violating a hard rule. Any departure nobody
named is treated as an error and fixed.

## Type review

Review type on composed frames from `capture_canvas_frame` or
`verify_edit_result`, and moving type on consecutive frames from
`inspect_timeline_frames`:

1. Every line reads at phone size within its hold.
2. Contrast holds on the busiest frame behind each text moment. For colours the
   Motif owns, compute the ratio from the declared values. Over footage,
   measure it: `analyze_text_contrast` with a region around the placed text
   at its busiest frame, in canvas pixels with the text colour, returns the
   worst-tenth WCAG ratio against the picture around the glyphs. Below the
   limit, add a panel, scrim, outline or shadow, or move the text.
3. Line length, widows, and number-unit pairs are correct.
4. No accent mark is clipped by a mask, a box, or tight leading, including on
   frames in the middle of a reveal.
5. Roles keep their faces across the piece; accent cards stay within limits.
6. Turkish casing is correct and caps are tracked open. `check_text_glyphs`
   with the final copy and family reports no missing_glyphs or mixed_fonts;
   lower-case Turkish with the tr locale, since a plain lower-case İ adds a
   combining dot (U+0307) many faces lack.
7. Arrivals decelerate, text layers move one at a time, each line rests while
   it is being read, and counters do not change width.
8. Every rule break is named and consistent.

## Fitting copy to a box

Copy that comes from a property (a name, a headline, a number) changes length.
Size it with fitText(text, {maxWidth, maxFontSize, minFontSize, fontFamily,
fontWeight, letterSpacingEm}) instead of a fixed size: it returns the largest
size, within the bounds, at which one line fits maxWidth in the real font.
Name the same fontFamily, fontWeight and letter spacing you render with.

For copy that may wrap, add maxLines (an integer, default 1) and optionally
maxHeight with lineHeight (a multiplier, default 1.2): fitText then returns the
largest size at which the text, word-wrapped at maxWidth, takes at most
maxLines lines and lines × size × lineHeight stays within maxHeight. It breaks
only at spaces and explicit "\n" (a no-break space keeps a Turkish name or
"10 km" together), and a single word wider than maxWidth must still fit, so a
long word shrinks the whole block. Render the result with the same width,
lineHeight and wrapping (for example maxWidth and lineHeight styles on the text
element) so the browser breaks where fitText measured. When nothing fits, it
returns minFontSize.
