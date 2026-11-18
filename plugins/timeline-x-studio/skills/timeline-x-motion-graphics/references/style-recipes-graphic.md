# Style recipes: graphic, type, and information looks

Read this when the user names one of these styles, or an approved look
direction maps to one, and the piece is built as Motion Graphics. A recipe is a
grammar to make this piece's own, not a template: keep the subject's own facts
and words, and pass the generic-image check in
[look and light](../../timeline-x-image-generation/references/look-and-light.md).
Every named style, the names people use for them, and the medium each suits are
in the [style library](../../timeline-x-image-generation/references/style-library.md).
Evidence films and print looks are in [their own recipes](style-recipes-evidence.md).

Timings assume 30 fps. Tempos with a whole number of frames per beat at 30 fps
are 60, 72, 75, 90, 100, 120, 150 and 180 BPM (frames per beat = 1800 / BPM).
A Motif makes no sound, so each Sound line describes separate audio layers
lined up with the Motif.

### swiss-motion: Grid Poster in Motion

Ready scenes: the Izgara poster pack in [style packs](style-packs.md).

- **What it is / is not:**
  - It is: flat typographic posters animated on a strict column grid, every arrival landing on a musical beat, nothing wobbling. Grammar of mid-century Zurich poster design.
  - The protagonist is the one element in the signal colour; it alone may disobey the grid.
  - It is not: a glossy keynote (no glow, gradient or device), bouncy lyric typography, or a chart, unless the grid itself encodes a quantity.
- **Palette:** a warm off-white page, a slightly lighter panel, near-black ink, one or two pale construction greys, and exactly one saturated signal hue chosen for the topic. Black type may overprint the signal block.
  - Example: page `#ECEAE4`, panel `#F8F7F3`, ink `#161616`, guide grey `#C9C6BE`, signal `#E8471C`.
- **Type:** a single family for the whole piece: Archivo (variable 100–900) or Instrument Sans (400–700); skip Inter.
  - Display 800 (700 in Instrument Sans) at 160–320 px, letterSpacing `-0.03em`, lowercase allowed, flush left with a ragged right edge.
  - Notes and labels at 500, 18–22 px, `+0.01em`, each sitting under a 1 px rule; figures `tabular-nums`.
  - Shift huge numerals left by their side bearing so they look optically aligned to the column.
- **Motion:** two curves only, and no spring or back ease.
  - Snaps: `Easing.bezier(0.75, 0, 0.25, 1)` over 8–12 frames, timed so the move ends exactly on a beat frame. Drawn rules, playheads and the rebel use `Easing.linear`.
  - Enter: words rise out of an overflow-hidden line box (translateY 100% to 0); blocks arrive by a hard-edged wipe; big numbers climb in stepped jumps.
  - Hold a statement at least 45 frames; exit upward through the same mask, or by the knife cut below. Ripples travel outward from their cause, one or two modules per subdivision.
- **Camera and cuts:**
  - Inside: one wrapper div takes translate, scale and rotate from interpolate and moves only on beats: a one-column pan, a 90° turn and stop, a push into a single module.
  - Between Motifs: hard-edged wipes or push transitions of 6–10 frames, or a straight cut on a downbeat. Never a crossfade, drift or Ken Burns.
- **Sound:** a dry, steady pulse (drum machine, marimba ostinato, mechanical piano) with print-shop clicks and snips; drop the drums for the rebel's moment.
- **Signature devices:**
  - Column grid: compute column x positions from constants (12 columns, 96 px margins, 24 px gutters at 1920 wide); draw the guides as `Surface` line commands whose length grows linearly, then settle them to the pale grey.
  - Knife cut: a 2 px ink line crosses the element over 6 frames (`Surface` line), then the element collapses with `scaleY` to 0 about its midline over another 6.
  - The rebel: one signal-coloured shape moving linearly off the grid, with a small JetBrains Mono status readout beside it that changes state once it leaves the grid.
- **Pitfalls:**
  - Many skinny columns read as a bar chart; use fewer, wider modules.
  - Turning the frame while labels appear is noise: rotate, hold, then label.
  - Any fade or dissolve breaks the style at once.
- **Vary it:** a month calendar filling cell by cell; a type-scale ladder from 12 px to full frame; a floor plan of modules where one room refuses its slot.

### spy-titles: Cut-Paper Title Caper

- **What it is / is not:**
  - It is: an opening title sequence in flat cut paper and four inks. Profile silhouettes move through sets built from the credits, each brass hit is an edit, and the final piece assembled is the title. Grammar of 1960s Saul Bass titles.
  - It is not: clean vector motion design (edges are cut by hand), halftone print, a Swiss grid, or a gadget and gun-barrel parody.
- **Palette:** four inks. A dark ink, a paper ground, one hot accent spent on the hero's single detail and on danger, and one warm secondary that marks the object everyone chases.
  - Each location owns one ground colour; background props use a deeper tone of that ground, never the black.
  - Example: ink `#201A1C`, paper `#EADFC6`, hot `#C2412D`, secondary `#E0B33C`, deeper ground `#A8916A`.
- **Type:**
  - Credits in Big Shoulders 800–900, uppercase, `+0.02em`; each letter gets a small fixed tilt (±1°) and baseline nudge (±2 px) from seeded random so the type feels hand-cut.
  - Subtitles in Space Grotesk 600, about 40 px, on a narrow tilted paper strip at the lower left: a pale strip over dark scenes, a dark one over pale scenes.
  - The title itself is hand-authored SVG paths (straight cuts plus arcs), never a real film's lettering; credits name fictional roles only.
- **Motion:**
  - Figures and landing letters animate on twos: `const held = Math.floor(frame / 2) * 2` drives their poses, while camera slides and credit moves stay on every frame.
  - Credits travel along a diagonal and stop dead on the hit with `Easing.out(Easing.exp)` over 6–8 frames. A run cycle is 6–8 poses inside a `Loop`, one stride per beat.
  - A stop-time gag wraps the scene in `Freeze` for 20–30 frames while the audio drops to true silence.
- **Camera and cuts:**
  - Inside: a lateral track slides a wide set under a fixed frame, always in one screen direction; a truck-in scales the wrapper about a letter until it becomes a doorway.
  - Between Motifs: cut straight on the brass stab, or use a diagonal wipe. For a graphic match cut keep the circle's centre and radius identical on both sides. Finish with light film grain and a soft vignette; no crossfades.
- **Sound:** a staccato big-band brass stab on every cut, surf guitar, walking bass and bongos, all original motifs; paper slaps for letters landing.
- **Signature devices:**
  - Scissor edges: resample each polygon every 8–10 px and push each point along its normal by a seeded 1–2 px offset, computed once from the seed and never from the frame, so a moving piece keeps its edge. Render as SVG polygon, with a copy offset 3 px at 25% opacity as the paper shadow.
  - Credits as architecture: set a credit line wide enough to span the frame, tuck a silhouette behind the letters with hat and accent showing, and let the figure use letters as pillars, steps or cover.
  - Diagonal shatter: split the frame with `clipPath` polygons along a 30° line and slide alternate strips off in opposite directions over 10–12 frames.
- **Pitfalls:**
  - Recomputing edge noise every frame makes outlines crawl.
  - Black props read as stray letters; use the deeper ground tone.
  - A figure fully hidden by a letter reads as an empty set, so let parts poke out. Real logos and the most famous spy theme are off-limits.
- **Vary it:** a ten-credit countdown with a clock in every set; two agents in a diagonally split frame that slowly merge; a title left incomplete because the hero walks off with its last piece.

### dataviz: Pencil-Drawn Data Story

Ready scenes: the Veri hikâyesi pack in [style packs](style-packs.md).

- **What it is / is not:**
  - It is: a single chart that tells a story with real, sourced numbers. Each visual event is a genuine chart operation (a point lands, an axis appears, the scale changes, the encoding morphs, a note is pinned), drawn as though by a pencil on cream paper. Grammar of newsroom scrollytelling.
  - It is not: a dashboard, a slideshow of charts, or decoration. Reframe freely, but never alter a number.
- **Palette:** colour encodes the value and nothing else.
  - Diverging data gets a two-sided ramp centred on a meaningful reference; data without a centre gets a single-direction ramp. Axes, labels and grid stay in ink tones on the cream sheet.
  - Two annotation inks keep fixed jobs: a cool one for context and memories, a warm one for records and warnings.
  - Example: paper `#F4EEDF`, ink `#2B2622`, grid `#D6CDBB`, cool note `#3567A8`, warm note `#C4472F`.
- **Type:**
  - Headline and figure caption in Newsreader 500 (headline 56–72 px; caption 30–34 px, at most two lines, a hairline rule above).
  - Axis ticks and the small range kicker in JetBrains Mono 400 at 18–20 px, `tabular-nums`.
  - Pinned notes in Kalam 400, with 700 for one emphasised word; never animate its weight.
- **Motion:**
  - Map points to a beat grid; to speed up, subdivide the beat while the tempo stays fixed.
  - A point lands with a small pop (`spring`, stiffness 160, damping 18) plus a thin ring that grows and fades over 8 frames; skip rings when points arrive less than 3 frames apart.
  - Rescales step in clicks, each eased with `Easing.inOut(Easing.cubic)` over 4 frames; morphs sweep left to right with a 2-frame stagger per point. No fades to blank.
- **Camera and cuts:**
  - Inside: treat the Motif as one sheet and move a wrapper over it in data space: dive to one point, widen as axes grow, or track the newest point at about 60% of the width.
  - Between Motifs: a long story is a batch of ≤15 s Motifs. End each on exactly the framing the next opens with and join by a straight cut, or a short zoom transition when the scale jumps. Avoid wipes that read as slides.
- **Sound:** a pitched pluck per point whose pitch follows the value, over a soft pad; pencil taps and paper scratches as foley.
- **Signature devices:**
  - Point-by-point build: keep the rows as a const array in props; each index gets a start frame `i * gap`; draw points as `Surface` circles outlined with a fine dark ring so even the faintest values remain readable. For simple cases start from `bar-compare` (two values), `dot-grid` (unit counts) or `event-timeline` (up to four dated events).
  - Pinned note: Kalam text plus an SVG path leader with a seeded wobble, ending in an open ring (an arc that does not close) around the point; anchor it in data coordinates so rescales carry it along.
  - Growing axis: draw the axis line with `strokeDasharray` and an interpolated `strokeDashoffset`; tick labels come from an interpolated domain, rounded so they change in clean steps.
- **Pitfalls:**
  - Exaggerating a colour ramp to dramatise a shift misleads; faint values must stay faint.
  - Notes collide with later data unless they live in a reserved margin.
  - Thousands of points blow the node budget (keep well below 4,096); draw a dense series as one `Surface` polyline.
- **Vary it:** a ranking race where one bar is the hero; a map of events that collapses into a unit chart; a two-year slope chart with one line left unfinished.

### iso-infographic: Isometric System Diorama

- **What it is / is not:**
  - It is: a working system shown as a floating isometric diorama: flat blocks shaded by three tones per face, thin ink leaders and labels living in the world, and quantities built from repeated identical icons. Grammar of Isotype counting and cutaway game dioramas.
  - It is not: perspective low-poly 3D, a flat 2D explainer, or a blueprint line drawing.
- **Palette:** a pale neutral ground, five to seven flat hues each with a top, left and right tone, and one ink.
  - Each hue has one meaning for the whole piece (water keeps one blue throughout). To single out the subject, desaturate everything else toward warm grey.
  - Derive face tones with `interpolateColors`: the top mixes 20% toward warm white, the right side 20% toward a cool dark.
  - Example: ground `#EEF1EA`, ink `#2C3440`, subject `#E0704A`, water `#4E93C8`, earth `#B89968`.
- **Type:**
  - Titles in Space Grotesk 600, uppercase, `+0.1em`; values in Space Grotesk 500 at 44–56 px with units at half size; labels in Instrument Sans 500 at 20 px.
  - Every label gets a halo in the ground colour (SVG text with a 6 px stroke in that colour and `style={{paintOrder: 'stroke'}}`) so it reads over blocks.
  - Label pins: ring dot, vertical leader, short horizontal rule, text; flip the direction per station so no label covers the subject.
- **Motion:** a line always goes first. A route draws ahead of its vehicle, a callout opens only after its leader has reached it, and a dashed cut line appears before any skin moves.
  - Cutaway: dashed line over 9 frames, then the near face slides out along its normal for 10 frames with `Easing.out(Easing.cubic)` while hatched section rims appear.
  - Icon counts pop one per 3–4 frames with `Easing.out(Easing.back(1.7))`; a count-up number runs over the same span.
  - Solid blocks arrive by moving, never by opacity; a landing may squash 10–15% for 3 frames.
- **Camera and cuts:**
  - Inside: the projection stays fixed, with no rotation or tilt; the wrapper only pans and scales. Interpolate the logarithm of the scale so zooms feel even.
  - Between Motifs: a zoom transition for a dive into the next scale, a circular iris for an inset, and a push for switching to a second board.
- **Sound:** a light acoustic bed (kalimba, marimba, pizzicato), a tiny click per icon, and a crossfaded ambience for each station.
- **Signature devices:**
  - Iso helper: `const iso = (x, y, z) => [(x - y) * 0.866 * k, ((x + y) * 0.5 - z) * k]`; a box becomes three polygons (top, left, right). The sandbox rejects `.sort()`, so generate faces already in back-to-front order (rows of rising `x + y`, then z), or use the non-mutating `toSorted` and confirm it in preview.
  - Isotype number: `Array.from({length: n})` mapped to identical icons arranged as a bar, a calendar or a silhouette; for a plain unit count start from `dot-grid`.
  - Inset: a leader grows from the subject, then a circular `clipPath` opens on a scaled close-up. To annotate a real photo instead, place the photo below and `leader-label` above it.
- **Pitfalls:**
  - Semi-transparent moving blocks look like ghosts.
  - Generic depth sorting breaks on composites (a crane over a ship), so draw them as one ordered group.
  - Hundreds of icons as DOM nodes exceed the budget; draw big counts with one `Surface`.
- **Vary it:** a tower explored floor by floor in a downward tilt; the same system on two boards from two eras; a loop route where one number changes each lap.

### dark-keynote: Midnight Software Launch

- **What it is / is not:**
  - It is: a launch film for software in which the interface is the hero: a near-black stage, a faint hairline grid, soft cool light, and a lone brand colour spent only on what matters most. Precision is the whole mood.
  - It is not: a rendered physical device, a real screen recording, a scanline HUD, or a chart film; one big number is its only statistic.
- **Palette:** a cool neutral ladder (stage, three raised surfaces, three text greys) plus one luminous accent whose soft glow is a blurred copy behind it (SVG `feGaussianBlur`).
  - An optional problem red exists only until the turn and never comes back afterwards.
  - Example: stage `#0B0D12`, surface `#171B24`, hairline `#2A303B`, text `#E6E9EF`, accent `#5CE1C6`.
- **Type:**
  - Headlines and UI text in Instrument Sans 500–600, one line per screen.
  - The giant number in Space Grotesk 700 at 280–400 px, `-0.04em`, `tabular-nums`, alone on its screen with no caption over it.
  - Labels, filenames and status lines in JetBrains Mono 500 at 16–18 px, uppercase, `+0.08em`.
- **Motion:**
  - Every element snaps to a 48 px module and finishes on a beat; start the move about 8 frames early.
  - Arrivals use `spring` with stiffness 355 and damping 26 (one small overshoot, quick settle), or `Easing.out(Easing.back(1.2))` over 7–9 frames. Each element type owns a single spawn move (drop, slide or pop).
  - Exits are designed: retract part by part on beats, or squash to a line (`scaleY` 0.02) and then to a point; nothing simply fades. The stage and grid move only with the camera.
- **Camera and cuts:**
  - Inside: a 2.5D feel comes from scaling and translating layers at different rates; keep any card tilt under about 20°.
  - Between Motifs: an interface element expands. End Motif A by scaling a card until it fills the frame, open Motif B already full-frame on that colour, and cut on the beat; a zoom or rounded iris transition of 6–8 frames also fits. No crossfades, light leaks or blank frames.
- **Sound:** tuned mallets and a felt piano over a low pulse; scattered detuned blips for the problem, one in-key family of soft ticks for the product.
- **Signature devices:**
  - Light reveal: an SVG mask holding a wide `linearGradient` rect whose x is interpolated across the frame over 30–40 frames; only what the band has passed becomes visible, with the brightest glint near 20% white.
  - Scrambled number: digits cycle through glyphs picked by `random(seed + frame)` and lock right to left, one every 2 frames, with a tiny bounce; for a plain stat start from kpi and restyle it.
  - Snap grid: generated tiles (`Array.from`) fly along curved paths (a sine bend perpendicular to the path) into exact slots on a single beat; pad or trim the item list to the slot count so no hole looks like a bug.
- **Pitfalls:**
  - Two accent-coloured things means one of them is wrong.
  - A sharp pure-white highlight looks like glare on a decal; keep the band soft.
  - Hundreds of generated cards can exceed the node budget, so draw the distant ones as `Surface` rects.
- **Vary it:** a release checklist ticking to "shipped"; old and new workflows racing in a split screen; a zoom ladder from one pixel to a component, a screen and a fleet.

### pictogram-motion: Pictogram Flash Cards

- **What it is / is not:**
  - It is: a catalogue film shown one card per beat-locked bar. Every card holds a faceless geometric figure performing a single verb, an oversized title, a translated line beneath it and a mono index such as `07 / 12`. Each chapter owns a hue and opens on a full-bleed pattern card. Grammar of 1970s games pictogram systems.
  - It is not: isometric, a Swiss poster, a cartoon (no faces, no emotion) or a data film.
- **Palette:** five hues plus one dark neutral; each hue gets five tones from darkest to lightest, made with `interpolateColors` toward ink and cream.
  - A shared cream and a shared ink work across all chapters. On pale hues, type and figures go dark; on deep hues they go cream.
  - Example set: neutral `#1D2740`, tomato `#E2553F`, teal `#2E9C8F`, saffron `#F2B544`, cream `#F6EFE2`.
- **Type:**
  - Titles in Archivo 900 at 150–300 px, tight tracking (`-0.02em`), auto-fitted; Unbounded 800 for very short words.
  - The translated line in Archivo 700 at about 40% of the title size; Turkish with English pairs well, since every bundled face covers Turkish.
  - Corner meta and tags in JetBrains Mono 500 at 20–22 px, `+0.12em`, plus a tick bar of N marks (the active tick taller, finished ticks dimmed, upcoming ones faint).
- **Motion:**
  - At 120 BPM a beat is 15 frames and a card lasts one bar (60 frames); related sub-items run at half length (30 frames).
  - Entrances use `Easing.out(Easing.exp)`, wipes `Easing.inOut(Easing.exp)`; allow one back ease per film at most. Type slides up out of an overflow-hidden box: title first, translated line 2–3 frames later, tag after.
  - The figure assembles from horizontal bands sliding in from alternating sides; pattern rows drift in alternating directions and hop by a quarter of a cell on each beat.
- **Camera and cuts:**
  - Inside: the frame mostly stays locked; rows and the figure supply the energy. Time a chapter's cards with `Series` inside one Motif.
  - Between Motifs: chapters join with Timeline push, wipe or circular iris transitions of 6–8 frames, rotating the kind; never crossfade or drift.
- **Sound:** a percussion spine chosen for the topic (frame drums, snares, steel pans) with one accent hit on every card start; plucks or mallets on top.
- **Signature devices:**
  - Pattern grid: square cells about one sixth of the frame height; seeded random places discs, half-discs and small motifs (checkers, arcs, crescents) in the hue's tones. Draw it one cell wider than the frame so a row can shift, and render it as one `Surface` to save nodes.
  - Figure: SVG lines with `strokeLinecap="round"` and a disc head; poses are const arrays of joint angles, interpolated between key poses on beats; far limbs are mixed 40% toward the background.
  - Count-up slam: a number rolls to its value over one bar in tabular figures; the built-in countdown covers a ranked N-to-1 run.
- **Pitfalls:**
  - Cream type on a pale hue fails contrast.
  - Lying or swimming poses cross the title column; move the stage outward.
  - Never echo a real event's pictograms, emblem, slogan or colour names.
- **Vary it:** a day told in hourly cards with colours shifting from morning to night; one machine gaining a part per card in a corner; a top-ten scrolled downward as the pace rises.

### blueprint: Living Cyanotype Drawing

- **What it is / is not:**
  - It is: a piece that takes place on a single cyanotype sheet. Pale technical line work (centre lines, outlines, hatching, dimensions, numbered balloons, a title block) draws itself in drafting order, and the annotations move with the parts. The designed object is the character; people appear at most as a hand shadow or a signature.
  - Projection is orthographic or oblique, never rendered 3D. It is not a glowing HUD, a marker whiteboard or an engraving.
- **Palette:** blue and pale line only. Only the blue's lightness shifts (uneven coating, folds, stains); the line changes weight, never hue. One stamp ink, used exactly once, delivers the verdict.
  - Example: sheet `#1B3C78` to `#2B5596` (two stacked radial gradients), line `#DCE8F4`, drafting table `#10151C`, stamp `#C8392E`.
- **Type:**
  - Labels, title block and fig numbers in Space Grotesk 500, uppercase, `+0.08em`, 18–28 px.
  - Dimensions and part numbers in JetBrains Mono 400.
  - Margin notes and the signature in Kalam 400. Text writes on left to right, like the lines.
- **Motion:**
  - Drafting order, one layer per beat: centre lines, outlines, details, hatching, dimensions, balloons, labels.
  - Each stroke draws with `strokeDasharray` and `strokeDashoffset` on paths that set `pathLength={1}`, linear within the stroke, 2–3 frames of stagger between strokes.
  - Exploded parts slide out on subdivisions with `Easing.inOut(Easing.cubic)` and return one per beat with a small click; gears click forward a tooth on every subdivision, each step easing out over 4 frames.
  - Failure reads as slow sagging over about 45 frames; success as a gauge needle overshooting (`Easing.out(Easing.back(1.7))`).
- **Camera and cuts:**
  - Inside: a wrapper moves over a sheet larger than the frame (medium on the figure, 2× close-up on the mechanism, a track along a pipe or chain). Scale line width with zoom, `strokeWidth = base / Math.pow(zoom, 0.35)`, so close-ups do not swell and wides do not vanish.
  - Between Motifs: cut on a downbeat or use a short straight wipe; crossing out the figure label and lettering the next one ("FIG. 2") is the in-world transition. Add a little Timeline film grain and vignette.
- **Sound:** contrapuntal harpsichord, bassoon and pizzicato strings; pen scratches as long as the stroke, compass squeaks, and one heavy stamp thump.
- **Signature devices:**
  - Draw-on with a nib: a small glowing dot rides the head of each stroke; compute its position from your own point list (piecewise linear), because DOM path measuring is not available.
  - Live dimension: a dimension line with arrowheads spans a moving part, and its JetBrains Mono number is recomputed each frame from the part's position (`Math.round`). Over real footage of the hardware, use `leader-label` instead.
  - Verdict stamp: a rotated rectangle and word in the stamp colour scale from 1.3 to 1 over 4 frames with a 2-frame camera bump, filling the title block's status field.
- **Pitfalls:**
  - Motifs run no shaders, so build the cyanotype coating from stacked radial gradients plus a full-frame SVG filter (`feTurbulence` into `feColorMatrix`) at low strength, add a few faint crease lines, and preview it before trusting the look.
  - Subtitles at the bottom collide with the title block; put notes in empty sky.
  - A main figure close to the sheet edge reveals the table in wide shots.
- **Vary it:** one site plan through six dated revisions; two drawings drafted side by side that interlock at the end; a sheet that starts complete and is erased part by part down to its core line.

### shape-morph: One-Outline Morph Chain

- **What it is / is not:**
  - It is: a single hero outline that keeps turning into the next meaningful thing, one change per beat, ending on the brand mark. The outline never breaks or pops; unlike shapes pass through a simple bridge form.
  - It is not: a type-led grid layout or a sequence of separate icon cards.
- **Palette:** one colour per meaning from a set of five or six; the hero is always the brightest element.
  - Each new meaning brings its own background colour, swapped by a hard-edged block wipe.
  - Example: night `#2D2A4A`, sun `#F0A23B`, sea `#3FA7C9`, coral `#E86A5C`, cream `#F7F1E6`.
- **Type:** almost wordless.
  - One short label per meaning in Bricolage Grotesque 600 at 48–64 px, entering 6–8 frames after the outline comes to rest.
  - The final lockup name in Bricolage Grotesque 800, or Unbounded 700 when it is one short word.
- **Motion:**
  - Each morph takes 16–24 frames, split into A to bridge and bridge to B (8–12 frames each), with `Easing.inOut(Easing.cubic)`.
  - Before the change, a 3-frame anticipation (scale to 0.96); during it, a few degrees of turn plus about 12% squash and stretch to hide the blend; on arrival, a settle with `Easing.out(Easing.back(1))`.
  - Vary lengths with the music, since equal durations feel mechanical. Small parts travel together (steam becomes rays becomes waves).
- **Camera and cuts:**
  - Inside: locked and centred on the hero, with a slow push across the chain (wrapper scale 1.0 to 1.08) and a final widening that presents the logo.
  - Between Motifs: a chain longer than 15 s becomes a batch, split exactly at a bridge circle so the next Motif opens on the same circle at the same size and place; join with a straight cut. A circular iris transition can carry a colour change.
- **Sound:** a mallet or plucked arpeggio, one chord note per morph, and a tuned swish that peaks as each change lands; the closing morph earns the loudest hit.
- **Signature devices:**
  - Point-list morph: author every shape as a const array with the same number of points (64–128), the same winding and the same start point; blend with interpolate per coordinate and render as SVG polygon or a `Surface` path.
  - Bridge form: a circle or capsule sampled at that point count, so any two unlike shapes meet in a clean middle.
  - Colour-block wipe: a full-frame circle in the next meaning's colour grows from the hero's centre behind it, radius interpolated over 10–12 frames.
- **Pitfalls:**
  - Knots and self-crossing outlines appear when winding or start points differ; check the middle frame of every morph.
  - Morphs that say nothing about the subject are mere decoration.
  - The hero must never disappear behind its own wipe.
- **Vary it:** a cycle ending where it began; a line-only finish instead of fills; a process told in five morphs with one number label each.

### sticker-explainer: Sticker Canvas Explainer

- **What it is / is not:**
  - It is: a knowledge piece laid out across a single, very large, quiet canvas. Cut-out objects with thick white borders, flat icons and charts drawn exactly to scale sit side by side, and an unbroken camera glides from fact to fact, so consecutive facts sit beside each other in space. Something new appears on most beats.
  - It is not: a torn-paper desk collage or a dark product launch.
- **Palette:** a ground and slate-coloured ink, up to two helper colours, and one accent kept for the key number or part.
  - Example: ground `#E9EEF2`, ink `#26323D`, helper `#7FA7C6`, helper `#F3C969`, accent `#E4572E`.
- **Type:**
  - Instrument Sans in up to three weights (400 labels, 600 headings, 700 key figures), aligned strictly to the canvas grid.
  - `tabular-nums` for every count.
  - JetBrains Mono 400 at 14–16 px for source and licence lines.
- **Motion:**
  - Camera moves of 30–60 frames with `Easing.inOut(Easing.cubic)`.
  - Elements pop in as the camera arrives with `spring` (stiffness 160, damping 13 to 18), staggered by 2–3 frames; counters tick up in whole steps over 20–30 frames and land on the real value.
  - Let each settled fact rest 2–3 s in short social edits, around five seconds in a slower explainer.
- **Camera and cuts:**
  - Inside: build the canvas as one oversized div (for example 5760×3240) and move it with translate and scale; one continuous move per section, with no cuts within a section.
  - Between Motifs: across the 15 s limit, end each Motif on the framing the next starts with and join by a straight cut, or a push transition in the direction of travel. No crossfades.
- **Sound:** an airy, uncluttered music bed; a woodblock click per pop, ticks under counters, a gentle whoosh for each long glide.
- **Signature devices:**
  - Sticker: a drawn SVG object outlined by a thick white stroke (`strokeWidth` 18–24, `strokeLinejoin="round"`, painted under the fill) plus a soft `feDropShadow` filter, or an offset copy at 15% opacity. A real photo can only appear inside the Motif as a small embedded `data:` image; otherwise put it on its own Timeline image layer with a mask and let the Motif above draw the border and shadow.
  - Exact charts: `bar-compare` for two values, `dot-grid` for "which ones light up", `route-map` for where something comes from; custom bars scale from the prop values, never by eye.
  - Exploded view: parts slide apart along straight lines, each with an SVG leader and label in the manner of `leader-label`.
- **Pitfalls:**
  - A bar that is not to scale destroys trust instantly.
  - Jump cuts in place of camera travel break the look.
  - More than five colours make the quiet ground feel noisy.
- **Vary it:** a night version on dark slate; a vertical 9:16 canvas read top to bottom; one canvas revisited at the end in a single long pull-back.

### visual-proof: Shapes Become Equations

- **What it is / is not:**
  - It is: maths or science explained by building one idea at a time from shapes. Every quantity owns a colour shared by its shape, symbol and label, and the equation assembles from the shapes it measures. A single element is in motion at any moment while the others rest at reduced brightness.
  - It is not: a chart of real data, a collage, or a hand-drawn whiteboard.
- **Palette:** a deep ground that is not pure black, a neutral line colour, and four to six quantity colours whose meanings never change between scenes. Emphasis means brightening the owner's colour, never adding a new accent.
  - Example: ground `#141B26`, line `#C9D2DC`, quantity a `#4FC1B0`, quantity b `#F2A541`, result `#F4F1EA`.
- **Type:** a Motif has no TeX engine, so set formulas by hand.
  - Variables in Georgia italic; digits and operators in Georgia regular.
  - Exponents as smaller spans raised with `translateY`, fractions as a flex column with a 2 px rule, roots as an SVG path.
  - Labels in Instrument Sans 500 at 22–26 px, placed beside what they name and entering after it.
- **Motion:**
  - Unhurried: 24–45 frames per change with `Easing.inOut(Easing.cubic)`; when several parts move, stagger their starts by 3–6 frames.
  - A term keeps its identity: when the equation rearranges, the term physically glides to its new position. Dim waiting elements to about 40% over 8 frames.
  - Leave silence and a 15-frame hold before the key step.
- **Camera and cuts:**
  - Inside: a gentle camera drift tracking the argument; it slides to whichever region the reasoning reaches, leans toward the term under discussion, and widens at the close so the complete derivation is visible.
  - Between Motifs: each idea can be its own Motif, joined by a matched-framing straight cut or a calm crossfade of 10–15 frames. No fast moves, no shake.
- **Sound:** a sustained pad or single piano, a soft mallet note when a term lands, and one warm chord on the result; a narrator usually leads.
- **Signature devices:**
  - Build in argument order: each piece in its own `Sequence`; shapes are 2–3 px strokes with 20–35% translucent fills of their quantity colour (for example squares rising on each side of a right triangle).
  - Shape to symbol: the measured length or area shrinks and moves from its centroid into its slot in the formula (interpolate on position and scale); no recolouring is needed because the colours already match.
  - Trace: sample the curve from its own function into a const point list, draw the polyline up to the current progress, and leave a short trail of the dot's last few positions at falling opacity, all computed from the frame.
- **Pitfalls:**
  - Too much on screen at once; retire or dim old ideas.
  - A colour that changes meaning between scenes breaks the method.
  - One wrong step on screen is worse than no proof, so check every equation and number.
- **Vary it:** a pale paper background for a printed-textbook mood; an algorithm stepped through on a small array; an endless zoom into a self-similar figure.

## Limits in Timeline X

- **stained-glass:** the look depends on light passing through glass, bloom, light shafts and a coloured patch cast on the floor, all shader work. A Motif can build leaded panes and a moving light band from SVG polygons, gradients and an `feGaussianBlur` glow, finished with Timeline halation and vignette, but a realistic glowing window is better made as generated images or video.
- **ascii-crt:** turning a picture into glyphs by ink density needs pixel sampling, and a Motif has neither canvas nor project media. Precompute glyph grids as const strings or build silhouettes procedurally, render one text node per row (a 200-column grid of single-glyph spans breaks the node budget), use JetBrains Mono, and add glow, scanlines and curvature with the Timeline CRT finish.
- **hologram-hud:** depth-fogged wireframes of real CAD objects, the Fresnel "solid hologram" and true motion blur are beyond a Motif. Simple objects can be hand-projected into `Surface` lines; complex ones belong in 3D Studio with the HUD furniture as a transparent overlay Motif, and the one glitch moment as a Timeline glitch transition.
- **living-screencast:** the source positions its mascot by measuring live interface elements each frame; Motifs have no DOM access, so mascot positions must be authored constants. A real screen recording can sit on a media layer below the mascot Motif, with motion tracking to follow moving UI.
- **variety-captions:** works only as an overlay above the user's footage, and each caption's sound effect is a separate audio layer placed on the same frame.
- **spy-titles, blueprint, dataviz, sticker-explainer:** each source pictures one long take of 30–60 s, but a Motif is capped at 15 s, so continuity must come from matched framing at batch boundaries. Spy-titles also cannot pull real font outlines to re-cut them; per-letter tilt on text and hand-drawn title paths stand in.
- **visual-proof:** with no TeX typesetting, complex notation (matrices, large sums, nested roots) is slow and error-prone to build by hand; keep formulas short.
- **All styles:** music, foley and sonification cannot come from a Motif; they are separate audio layers, and a Motif can only react to bound audio through `useAudio`.
