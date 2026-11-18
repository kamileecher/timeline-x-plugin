# Style recipes: evidence films and print looks

Read this when the user names one of these styles, or an approved look
direction maps to one: films that prove something with real photographs,
documents, maps or products, and looks taken from printmaking. A recipe is a
grammar to make this piece's own, not a template. Every named style and the
medium each suits are in the
[style library](../../timeline-x-image-generation/references/style-library.md);
graphic and information looks are in [their own recipes](style-recipes-graphic.md).
Films about real events also follow the real-material rules in the film
planning skill's visual development reference.

## Build rules for every recipe

- Real media sits on its own Timeline layer; the Motif above it keeps a transparent page and draws only marks, type, paper and ink. Camera presets (push in, pull out, drift, Ken Burns) move photo and clip layers, not Motifs, so a mark that must stay on a moving picture is drawn while the picture holds, follows it with motion tracking or corner pin, or both layers are parented to one controller layer that carries the move.
- One Motif lasts at most 15 s (450 f at 30 fps). Longer takes become batches joined by Timeline transitions; a graphic that must stay steady across a transition goes in its own overlay instance on a separate lane.
- Useful SVG: pattern (dot screens), mask, `clipPath` (wipes and pulls), gradients, and the filters `feTurbulence`, `feColorMatrix`, `feComposite`, `feBlend`, `feMorphology`, `feGaussianBlur`, `feOffset`, `feDropShadow`. `feDisplacementMap` is not available, so rough, torn or boiling edges are seeded polygons. Stay well below ~4,000 nodes: one pattern is cheaper than thousands of circles.
- Evidence styles show only real media and sourced figures. A generated image never poses as the archive item, specimen, ground or product. Credit each source and keep a list of every on-screen claim next to where it came from.
- Fonts come from the bundled set; JetBrains Mono stands in wherever a typewriter would be expected. Timings are frames (f) at 30 fps; 54 f (1.8 s) is the shortest hold for any caption, longer when the spoken line runs longer.

## Recipes

### vox-explainer — Paper-Desk Why Explainer

Ready scenes: the Kâğıt masa pack in [style packs](style-packs.md).

- **What it is / is not:** a calm investigation that answers one "why" question, sentence by sentence; each shot proves the line just spoken and the piece ends on a takeaway of a few words. Everything looks printed and laid on a warm desk. Not the comic case file (no gags or stamps), not a backlit archive (no loupe or glow), not a tidy Swiss grid. Grammar reference only: Vox-era desk explainers.
- **Material:** archive photos, document scans, maps and short clips each sit as Timeline layers, cropped with a mask; a card Motif placed under each one draws its white border and soft paper shadow (`feDropShadow`), and the annotation Motif sits on top.
  - Source from the user or `search_stock` (Wikimedia Commons) or online video. If nothing fits, draw a flat silhouette in the Motif instead of faking an archive picture. No figure appears without an approved source.
- **Palette:** a warm desk ground, a lighter card stock, a single dark ink carrying all lettering and linework, a signal red reserved for marker strokes plus the most important word, and a highlighter yellow; photos get a light warm grade toward the paper through colour grading. Example: desk `#EDE1C8`, card `#FAF4E8`, ink `#1A2B47`, marker `#C43D2F`, highlight `#F3C93F`. No glow, neon or gradient type.
- **Type:** statements in Big Shoulders, heavy and upper case, at most three lines per strip; body and captions in Newsreader; small tags in Archivo; handwritten asides beside the marker in Kalam 700; quoted document text in JetBrains Mono.
- **Motion:**
  - Drawn poses step on twos (sample values at `Math.floor(frame / 2) * 2`). Cards drop from just above with a single small overshoot (spring, damping about 14, settled within ~12 f); nothing bounces twice.
  - Marker strokes draw in 12–20 f through `strokeDashoffset`; highlighter bars sweep left to right in 8–12 f; while ink moves, everything else holds. A statement strip arrives whole, then its words gain weight one after another, never typed letter by letter.
- **Camera and cuts:**
  - Think rostrum camera over a table: Ken Burns or a slow push in (5–10 % per shot) on the photo layers, a sideways drift from card to card, a quick punch-in of ~8 f on the circled detail. No free rotation.
  - Between shots: a push transition (a fresh card travels across and covers the previous one), a torn-paper wipe built inside the Motif as a seeded jagged polygon crossing the frame, or a match from the circled detail to the next subject. Skip glitch, light leak and VHS.
- **Sound:** a soft piano or pulse bed ducked under every line, a paper sound on each new card (drop, flip, tape), a marker squeak under circles, a small lift under the takeaway.
- **Signature devices:**
  - Marker circle on evidence: over a held photo or document layer, an SVG path of a slightly uneven ellipse (8–12 seeded points, 6–10 px, round caps) draws by dash offset, then a tag lands; start from callout or `leader-label`.
  - Statement strip: a torn band (seeded jagged polygon, teeth of 2–5 px) with a drop shadow and up to three Big Shoulders lines; restyle `title-card` or `text-fx`.
  - Document zoom: corner pin the document if it lies at an angle in footage, push in on it, then a yellow bar with `mixBlendMode: 'multiply'` sweeps behind the quoted line (check the blend in preview). For "where", restyle `route-map` onto cream paper with a red route.
- **Pitfalls:**
  - A lone line crawling across an empty card reads as a frozen frame; keep cards, cut-outs or objects layered in depth.
  - Uneven grids read as errors; give every card the same size and spacing, and use logos from real files that fill their cards.
  - A quiet, small opening loses people; state the question large and land the first surprise inside 150 f.
- **Vary it:** a navy "night desk" with cream type; sparse (more type) or dense (clippings three deep); roughly one shot every four seconds with a statement breather every few shots; strips stacked vertically for 9:16.

### archive-lighttable — Backlit Archive Table

- **What it is / is not:** genuine collection items (glass plates, lantern slides, letters, ledgers, press cuttings) resting on a cool glowing table; a loupe settles on one and, inside its glass, the object changes state: a line brightens, a figure lifts off, a photo opens up. Quiet, modern and exact, with catalogue numbers pinned to each item. Not a sepia or halftone "old" look, not a desk collage, not a chart film, not slides.
- **Material:** the scans themselves, as Timeline photo layers over a full-frame table Motif (near-white cool field, soft falloff, a thin aluminium frame edge, dark desk beyond); keep each item at true proportion with its real damage visible.
  - Use open collections whose rights are clear (CC0, public domain, credited CC BY); `search_stock` reaches Commons. For a company's own past, request scans, catalogue numbers and permission from the user. Bring CC BY-SA or "no known restrictions" terms to the user before use.
- **Palette:** a neutral backlit ground plus the archive's own silvers and paper tans, never regraded into a colour scheme; near-black ink on light areas, paper-white on dark caption plates; exactly one signal hue, used for marks, figures and the final verdict and never as a fill. Example: table `#F3F6F8`, ink `#17191C`, plate `#0F1113` at ~75 %, signal `#EB6A2E`, hairline grey `#8E959C`.
- **Type:** JetBrains Mono for identifiers, dates and readings (large readings may switch to Big Shoulders figures); Instrument Sans for labels; Newsreader only for the title and for the single name a photograph is about.
- **Motion:**
  - On ones, with smooth monotone curves and no overshoot: `Easing.inOut(Easing.cubic)` for glides, `Easing.out(Easing.cubic)` for the loupe landing in ~12 f and lifting the same way.
  - Hairlines draw in 9–18 f, labels wipe out from their leader side, counters roll and land on the spoken figure. The table, and the content of each object, never move by themselves.
- **Camera and cuts:**
  - Glide by keyframing one controller layer that the table Motif, the scans and their labels all follow (a Ken Burns or drift preset on a single composite scan is enough when nothing is pinned); ease off before the loupe lands, then push in.
  - Enter an object with a circular iris transition centred on the loupe into a tight crop of the same scan; rise out with pull out. Objects never meet through hard cuts, black fades or page flips.
- **Sound:** the table's ballast hum and room tone, a glassy clack as the loupe lands, paper sweeps under glides, soft ticks for counters; felt piano or a few strings, with real silence before each reveal.
- **Signature devices:**
  - The loupe: duplicate the scan layer, scale the copy ~2.5× around the landing point and give it a circular mask; a Motif above draws the black ring, a bevel highlight (gradient stroke) and a soft shadow, shrinking from ~1.35× to 1× as it lands.
  - The line lights up: over the magnified crop, a translucent table-tone rect dims the page while a mask cut-out keeps one line bright; an underline draws, then one word or figure lifts into a dark reading card (label, value, catalogue number); `leader-label` is a fair base, comparison for two records held side by side.
  - Closing index: widen until every item is visible, then fly each tag into a single list; restyle `event-timeline` when the items are dated.
- **Pitfalls:**
  - Over-enlarging a small scan: keep the magnified crop under ~1.5 screen pixels per scan pixel and choose items by resolution.
  - A loupe sliding over bare table, or labels leaving frame before they are read: drop the loupe straight on, and hold the move (or pin the caption to the screen) while reading.
  - Vintage creep: no sepia, scratches or dot screens; the age belongs to the objects.
- **Vary it:** open on the table flickering on in the dark or on a handwritten date filling the frame; close on the index, on one photograph held with a single line, or on the table switching off around one glowing item.

### briefing-board — Whiteboard Evidence Wall

- **What it is / is not:** a real enamel whiteboard in a real room (window light, faint ghosts of old marker, frame and tray) with photographs of real things pinned by magnets and tags, and marker ink that writes itself in three colours whose meanings never change. The view travels along lines from fact to fact; the full wall appears once, at the end, as a finished poster. Not a flat hand-drawn whiteboard explainer, not a chart, not keynote bullets.
- **Material:** a photo or locked-off clip of an actual whiteboard is the base layer; each evidence photo is its own layer, cut out with a mask and given one shared grade (slightly desaturated, a touch warm, lifted blacks); a Motif under each cut-out casts its shadow from one window direction, and the ink Motif rides on top.
  - Photos come from the user or `search_stock`; with no suitable photo, sketch the object in marker. Never enlarge a photo past its own pixels in a close-up; mask out lettering inside photos or pick another.
- **Palette:** enamel and its window falloff as ground; graphite carries names and rules, blue anything measured, red only the decision (never more than three red marks in one frame); grey is for drafting lines. Full colour belongs to the photos. Example: enamel `#F1F2EE`, graphite `#363A40`, measure blue `#2E62B5`, decision red `#C9372C`, wall `#B8B0A5`.
- **Type:** marker lettering in Kalam 700, large, with verdicts about twice that size; printed tags in Archivo, one to three words; credit lines in JetBrains Mono; stamp text in Big Shoulders, heavy caps.
- **Motion:**
  - Ink moves at hand speed, 15–30 f per stroke by length; lettering appears glyph by glyph with a seeded tilt and baseline jitter; dimension lines finish with an arrowhead tap.
  - Prints are lowered in from the lens side, land, bounce once and settle as their shadow tightens (spring, damping about 11); magnets clack on; tags swing on a damped rotation. Something lands, draws or swings every beat or two; no dissolves, and text never pops or fades in by itself.
- **Camera and cuts:**
  - Parent the board, cut-outs and ink Motifs to one controller layer and keyframe it as the camera: ride the pen tip along a dimension, tilt along projection lines, creep in as a problem approaches, then hold a judgement frame (item, limit, verdict) for at least 75 f.
  - Split long rides into ≤ 15 s batches joined by push transitions in the direction of travel, or a whip for a result that overshoots; finish by widening until the entire wall fills the frame, keeping the reveal zone unseen until then.
- **Sound:** room air and distant traffic under everything, marker squeaks whose length matches each stroke, magnet clacks, print slaps and a stamp thud over a brisk small ensemble (bass, light kit, wood percussion, a low brass stab on verdicts).
- **Signature devices:**
  - Ink with meaning: SVG paths drawn by `strokeDashoffset`, multiplied over the enamel; a rejected idea is wiped to a blurred ghost (~7 % opacity through `feGaussianBlur`) that stays visible under the next plan.
  - Following the dimension: each quantity is laid down as a real length at one shared scale, with ticks along it, the blue value written at the tip as the view follows; for several items, frame each new one beside the previous result.
  - Stamp and magnets: a verdict stamp (heavy caps in a rough double frame, an `feTurbulence` mask) slams in with a spring and a small jolt of the controller; magnets as countable units clack on in rhythm; restyle steps for a checklist stamped item by item.
- **Pitfalls:**
  - Words glimpsed while the view is moving fail their reading time; put text where the camera comes to rest.
  - Close-ups alone never show the item beside its limit; always pass through a judgement frame.
  - Photos that do not belong together: one grade, one light direction, similar viewpoints; thin parts lost in the mask (cables, masts) are redrawn as clean ink lines.
- **Vary it:** one measurement growing until it breaks a limit; last year's plan wiped to a ghost under this year's; open on a stamp and back up to explain it; end by flipping a tag from question to answer before the pull back.

### satellite-briefing — Orbital Analyst Briefing

- **What it is / is not:** real satellite or aerial pictures of a real place, turned down to a cool analyst grey, with sparse white hairlines that measure: a targeting bracket, traced outlines, a distance line and a single figure. Change of scale is the main move (from high above down to the site and back), and a fixed frame can also play years forward. Not a glowing sci-fi HUD, not a paper chart, not a diorama, not slides.
- **Material:** registered stills of the same place at several scales and dates, each a Timeline photo layer; the overlay Motif carries only marks, instruments and type.
  - Usable: public-domain or credit-only imagery such as USGS Landsat, NAIP or NASA products (Commons hosts some; try `search_stock`), or the user's own surveys. Commercial basemaps, news photos and generated "imagery" are out. Burn a readable credit into the frame, and measure on the date you show.
- **Palette:** the grey ground runs from near-black to mid-grey and stays below white, because white means "measured"; one warm accent for the single reading; an optional flat map hue for a claim the imagery tests; true colour only at the widest view and where the story turns. Example: ground dark `#0A0F12`, ground light `#9AA2A6`, marks `#EEF2F3`, reading `#F5B248`, claim `#3B6FC4`. Make the grey with colour grading or a LUT on the image layers.
- **Type:** the reading in Big Shoulders at a light weight, large, in the right third; instruments, dates and the credit in JetBrains Mono; labels in Instrument Sans; Newsreader only for the claim map and the title. Nothing under ~20 px at 1080p.
- **Motion:**
  - The picture never freezes: holds keep a 2–5 % creep (push in or drift), and no frame sits dead for more than ~30 f.
  - Marks are made, not faded: a line grows over 12–24 f, an outline prints on, the reticle snaps in with a little overshoot (spring, damping about 10), a counter ticks upward and settles with a slight scale pop.
- **Camera and cuts:**
  - Dive by chaining push in across nested stills and swapping plates at matched scale with a short crossfade or a zoom transition; climb back with pull out. A whip transition brings in a counter-example at the same altitude.
  - Time in a locked frame: stack exactly registered dated stills and change them with a straight wipe running north to south (the reverse for a rewind), never a dissolve. No crossfades between unrelated places.
- **Sound:** dry telemetry pings and ticks, a servo whine under a range line, pulse bass and low drums, the place's own wind or water used sparingly, and a short drop-out of everything before the heaviest landing.
- **Signature devices:**
  - Lock-on reticle: four corner brackets (SVG polylines, a dark halo stroke under a 1.5–2.5 px white stroke) close on a coordinate with a spring and a small coordinate readout; later they can open out into a title frame.
  - Range line: a ticked line grows from A to B while a counter rolls in step with its tip and lands on the measured distance; restyle `leader-label` or callout to white hairlines for the reading.
  - Colour returns: duplicate the ungraded image layer above the grey one and reveal it through a mask shaped like the subject (the field, the reservoir), so only the turning point regains colour.
- **Pitfalls:**
  - Scenes from different days disagree in tone and edge: one date per area, exposure matched with grading, seams framed out.
  - Marks that slide when the picture moves: draw them while the frame holds, or parent overlay and image to one controller.
  - Clouds and haze read as features once grey: choose dry-season scenes, or swap the date rather than painting over.
- **Vary it:** a locked series of one place ending on a push; a river followed with one reading per stop; a pair of places set side by side at the same scale, linked by whips; open on black painted in by a scan, end on a climb out or one reading held in near silence.

### teardown — Product Taken Apart

- **What it is / is not:** a real product, modelled from its own engineering files, lit like a studio packshot and separated along one axis while the camera moves between the layers; every part is named with figures its files supply, then it closes back into one object. Not a single-object beauty render, not a blueprint line drawing, not an assembly manual with hands and step arrows.
- **Material:** the 3D scene lives in 3D Studio (the product as a GLB; CAD exports converted outside Timeline X); render the separation and close-up passes into the Timeline, then add transparent label and dimension Motifs over the renders.
  - Ask the user for CAD, bill of materials and spec sheet first; for public products, use published open-hardware files. With no files, model only from dimensions the maker publishes, call it a model, and show no unsourced figure.
- **Palette:** the product keeps its own colours and stays the brightest, most saturated thing; the ground is a dark graphite sweep; labels use a single warm white, full strength for names and about 60 % for specs, and one accent is kept for anything measured. Example: sweep top `#303236`, sweep floor `#0E0F11`, ink `#F3F0EA`, accent `#F27A3A`.
- **Type:** part names in Space Grotesk; specs and figures in JetBrains Mono so digits align; running text in Instrument Sans. Each label stacks an accent-coloured two-digit number, the part name and a single spec line with units.
- **Motion:**
  - Separation runs slow, fast, slow (`Easing.inOut(Easing.cubic)`), top layer first and the rest 5–6 f apart; repeated parts (keys, screws, cells) lift in a ripple that starts at one corner and spreads outward. Closing goes bottom first at ~30 f per layer and ends with one true mechanical response.
  - Labels build in order: dot, leader growing over 8–10 f, text sliding ~10 px; they clear before the parts move again. During macro holds nothing drifts.
- **Camera and cuts:**
  - In 3D Studio: orbit while layers part, a grazing macro dolly over a surface, a dive into the gap between two lifted layers, a fast pull back for the close; keep paths free of overshoot so macro stops truly hold.
  - Between renders: a zoom transition or one continuous move; no cuts to black, slide wipes or split screens. Keep labels stacked on the empty side of the frame and subtitles in the bottom ~12 %.
- **Sound:** tuned mallets, a round bass and small dry percussion; foley that matches each material (plastic clack, switch thock, metal ring, housing thud), airy swooshes under lifts, a tick per label, near silence before the big separation.
- **Signature devices:**
  - Pointer onto the part: a Motif label (dot, hairline, index, name, spec) whose anchor follows the part through motion tracking on the rendered clip; start from `leader-label`.
  - Dimensions on the closed object: SVG dimension lines with end ticks and the value on a small dark plate, fitted to the product's perspective with corner pin; values never read upside down.
  - The wave lift: in 3D Studio, delay each repeated part's lift by its distance rank so the parts ripple across the object.
- **Pitfalls:**
  - Invented sizes: if no file gives a dimension, leave it out or label it as measured on the model.
  - Labels too brief for a ~3 s macro stop: one fact each, opened before the camera settles.
  - Black plastic lost on a black ground, and trademarks on chip tops: lift darks to deep grey with a rim light, and leave chip and package tops blank when the product belongs to someone else.
- **Vary it:** one orbit with two inside stops; a "how it works" route following a signal through the stack; two revisions apart side by side; open on a part doing its real motion in macro, close on the object with its dimensions drawn on.

### data-physical — Counted-Object Statistics

- **What it is / is not:** real statistics built as countable pieces (plates, blocks, coins, discs) stacked at exact scale on a carefully made plinth and shot like a studio product: low warm key, long soft shadows, shallow focus. Data grows by pieces being placed, never by bars stretching or morphing. Not flat icons, not a paper chart, not a neon stage, not toy bricks.
- **Material:** the stacks are a 3D Studio scene (repeated pieces, a wood or stone base, a seamless sweep) rendered into the Timeline; readings, the unit rule, the source line and verdicts are overlay Motifs. Without 3D, a flat fallback draws stacks as `Surface` polygons, kept to a few hundred pieces so the node limit holds.
  - Figures come from published datasets or the user's own documents; credit each dataset in frame, and record how every derived value (unit per piece, ratio, difference) was worked out.
- **Palette:** a warm neutral set; series separate by material (say, satin aluminium beside coloured acrylic, or light oak beside slate), not by paint; one ruler material marks every tenth piece; near-black ink at two strengths; one accent only for the reading that matters now. Example: sweep `#CDC6BA`, ink `#202124`, accent `#C9561F`, series A `#BFC5CB`, series B `#93C6C2`.
- **Type:** big figures in Big Shoulders (or Archivo at a light weight); labels and verdicts in Space Grotesk; units, years and the source line in JetBrains Mono; Fraunces only for the title.
- **Motion:**
  - Each stack builds upward over 15–30 f, each piece dropping a short way with `Easing.out(Easing.quad)`; an increase feeds in one piece every 2–4 f with a twist that settles; a single heavy final object lands with one small damped bounce.
  - Readings rise ~16 px as they fade in while their leader line grows; on exit they fade out in place. A verdict appears only after its readings have been still for 75 f. Counters advance with pieces landed, never with clock time.
- **Camera and cuts:**
  - In 3D Studio: a close dolly that skims the side of one stack while focus shifts, a low lateral track down the series, a crane rising with the top, a pull back to near top view; holds keep a gentle creep.
  - Prefer one continuous move per batch; between batches use a zoom transition or a move inside the same set, never a cut to a chart or a page turn.
- **Sound:** each material's own landing tick or knock in bursts, a pitched mallet note on every tenth piece so the stack climbs a scale, marimba and pad underneath, and a short drop-out before the final object hits.
- **Signature devices:**
  - Unit close-up: push in until one piece fills the frame, then a Motif bracket reading "1 plate = X" and a second bracket on a ruler piece; start from callout.
  - Twin stacks: a pair of series share a single base; at the crossover, both readings stack in one column (larger on top) and hold before the verdict; a restyled `bar-compare` can check the same values in 2D.
  - Live counter: kpi or countdown restyled and driven by the same landing schedule as the render, passed in as props, so the number always matches the pieces on screen.
- **Pitfalls:**
  - Two materials that look alike at thumbnail size merge into one series; change tint or finish and check it small.
  - Rounding to whole pieces can flip two close values; flag it in the frame or switch to a smaller unit.
  - Labels pinned to moving stacks drift off-screen; clamp them to a safe box or track them.
- **Vary it:** a lone series climbing to its peak, a pair that cross, regions on a map-shaped base; end on the last object landing, a slow orbit of the whole piece, or one piece lifted away to show what a unit is.

### risograph — Spot-Ink Duplicator Print

Ready scenes: the Risograf pack in [style packs](style-packs.md).

- **What it is / is not:** animation that looks printed sheet by sheet with two or three translucent spot inks on warm paper: inks multiply where they cross into extra colours, plates sit a few pixels out of register, mid-tones are dot screens, solids show pinholes and streaks. Shapes are flat fields and silhouettes with no outlines. Not vector art with a noise layer, not CMYK pop art, not opaque screen print, and no duplicator brand or machine look.
- **Material:** mostly drawn in Motion Graphics. A real photo can join the print as its own Timeline layer finished with posterize, the halftone effect and a two-colour grade, under a Motif that adds paper grain and misregistered ink shapes.
  - Use the user's photos or Commons stills; generated images suit illustrative scenes here, since nothing in this style is evidence.
- **Palette:** two or three inks plus off-white paper, never more; every other colour is an overlap or a tint; at least one ink must hold a silhouette alone; paper white serves knockouts and subtitles; hold back the all-inks overlap until the story's biggest beat. Example: paper `#F2EBDD`, blue `#2A6FB0`, pink `#F2569B`, yellow `#F9D84A` (blue over yellow gives the green, pink over yellow the orange).
- **Type:** titles in Bricolage Grotesque at a heavy weight, sometimes struck on two plates slightly apart as a deliberate double hit; captions in Space Grotesk or Instrument Sans; text belongs to one plate and shares its offset and grain.
- **Motion:**
  - Characters and drawn shapes act on twos (sample at `Math.floor(frame / 2) * 2`); pans and pushes run on ones, because a stepped camera judders.
  - Registration is fixed per shot (each plate offset 1–3 px by a seeded value). An accent gets a kick of 8–14 px that decays in ~8 f with slight ringing; a held moment gets a slow drift that snaps back on the downbeat. Prints never fade: titles arrive with a roller sweep and leave on a cut.
- **Camera and cuts:**
  - Inside a Motif: wide lateral tracks past a small figure, locked horizon-disc-figure frames, a push into a dot field until the dots become shapes; the dot screen stays fixed to the frame while the image slides beneath it.
  - Between shots: hard cuts on beats, match cuts on a flat shape, or an overprint growth built across the batch boundary (one ink's disc swells to cover the frame, then shrinks into the next key shape); never a crossfade or soft digital wipe.
- **Sound:** warm, dry, slightly lo-fi players (upright bass, vibraphone, nylon guitar, brushed kit), the duplicator's paper feed and drum thunk on each plate arrival, and a bar of near silence paired with a registration drift.
- **Signature devices:**
  - Plates that multiply: draw each ink as its own SVG group with `mixBlendMode: 'multiply'` and its own fixed offset so overlaps produce the third colour; confirm in preview, and if the blend fails, draw the overlap as a separate pre-mixed shape.
  - Dot tints and grain: an SVG pattern of dots rotated per plate with `patternTransform` (angles at least 15° apart), clipped to a shape for 20/40/60 % bands; grain and pinholes from `feTurbulence` into `feColorMatrix`, used as a mask on solids.
  - Plates as story: at each turning point a `clipPath` rectangle sweeps the frame like a roller and adds a new ink to the world.
- **Pitfalls:**
  - Three dotted inks in one area turn to mud; use two plates per area at most, only one of them as a tint.
  - Re-randomising registration every frame flickers; keep one set per shot and kick only on accents.
  - Dot periods below about 6 px alias after encoding; inspect at 100 % and 50 % before delivery.
- **Vary it:** two inks in dialogue that only overlap at the end; a subtraction where each loss removes a plate; a zine with a new ink pair per page; open on a blank knockout that its plate fills seconds later.

### halftone-dossier — Dotted Case File

- **What it is / is not:** a loud but readable retro case file: cream stock, layered dot screens in a handful of flat colours, enormous bold headlines with shifted shadows, slamming rubber stamps, case numbers and numbered exhibits; the piece reads one exhibit at a time, grave or silly. Not a riso zine texture, not Swiss kinetic type, not a candy game show; dots, paper and file apparatus appear in every frame.
- **Material:** the file furniture (paper, folders, height chart, stamps, case header) is drawn in the Motif. Real exhibits (the pet, the gadget, the memo) sit as Timeline layers finished with the halftone effect and posterize so they print in the same inks, masked into an exhibit frame the Motif draws around them.
  - Real photos come from the user or checked Commons stills; mascots can be drawn or generated, but any document shown as proof must be real.
- **Palette:** a paper ground, one dark ink for outlines, body text and the caption bar, a shadow ink for offsets, a highlight ink for keywords and numerals, and a warm red saved for stamps and warnings. Inks stay flat; tone comes from dot size. Night or secret scenes flip to a dark ground with a lighter dot layer. Example: paper `#F0E5CC`, dark ink `#1F2542`, shadow `#3A5BC0`, highlight `#F5CF3A`, stamp `#CF3B2C`.
- **Type:** headlines in Fraunces at its heaviest with a +8/+8 px offset copy in the shadow ink; big names and numbers in Unbounded; interjections in Kalam 700 with a thick ink stroke; case numbers, dates and file names in JetBrains Mono; stamps and the caption bar in Archivo at a black weight. Latin runs long, so stamps stay at one or two words (CLOSED, VERIFIED).
- **Motion:**
  - Everything enters with overshoot in 9–14 f (`Easing.out(Easing.back(1.7))`) or grows from zero scale; headlines pop glyph by glyph, each dropping and squashing in on a 2 f stagger; nothing fades in.
  - Stamp slam: from ~2.6× to 1× in 3 f, a small damped bounce, then shake, a flash capped at half strength and the thud on the same frame. Blinks, a blinking record dot and breathing keep holds alive.
- **Camera and cuts:**
  - Inside a Motif: a locked frontal page with a tiny beat pulse (~0.6 % scale), a slow push to ~1.06 before a verdict, a shake with quadratic decay on impacts, a snap zoom into a dot field.
  - Between exhibits: a dot wipe built across the batch boundary (dots grow to full cover over the last ~13 f of one Motif and shrink away over the first ~13 f of the next, with a diagonal delay; `dot-grid` is a starting point), or a hard cut on a big hit; no dissolves.
- **Sound:** a synth pop kit with square bass and a marimba-like pluck, camera shutters, folder flaps, a pop on every glyph, and a stamp boom that lands alone after the music empties for a beat.
- **Signature devices:**
  - The stamp: a double rounded rectangle with heavy text, tilted within ±10°, roughened through an `feTurbulence` + `feColorMatrix` + `feComposite` mask at ~93 % opacity; scaled in with a stiff spring.
  - Numbered exhibit: a giant numeral filled flat, with a darker dot pattern clipped to the glyph by `clipPath`; every clip gets its own id.
  - Caption bar and mugshot: a dark rounded pill with an offset shadow, paper-coloured text and the keyword in the highlight ink (restyle `lower-third`); for a photo exhibit, height-chart lines, a name plate and a flash framed around the masked layer.
- **Pitfalls:**
  - Dot steps under ~14 px at 1080p moiré once encoded; keep the screen coarse.
  - A dot wipe that never quite covers shows the cut; make the largest dot exceed half the cell's diagonal.
  - Wobble on text, dots or captions turns them to mush; boil only characters and props, by re-seeding their polygon vertices on twos.
- **Vary it:** a declassified report unredacted page by page; a missing-person file told backwards; an insurance claim that each exhibit contradicts; end with the file dropped into a drawer of identical ones, or a stamp that misses.

### silkscreen-poster — Pulled-Ink Destination Poster

- **What it is / is not:** a poster printed on camera with opaque flat inks, one pull per colour: four to six inks, each later ink hiding what lies under it, skies built as stepped bands rather than gradients, and thin paper slivers where registration slips. Information appears in print order, one layer per beat. Not translucent riso grain, not line-led woodblock work, not low-poly facets; never a real poster's layout, lettering or issuing agency.
- **Material:** drawn in Motion Graphics from the user's facts. A real photo of the place may open or close the piece as its own layer (a posterize finish nudges it toward the ink world), and its main shapes can be traced by hand as polygons. Distances, hours, dates and prices in the info band come from the user or an official source.
- **Palette:** one palette per poster, at most six inks by role: pale sky, deeper sky bands, distant, middle and foreground planes (the foreground ink is darkest and also fills the info band), plus one scarce bright accent for the sun, route or key number; values step from pale far to dark near; unprinted paper outshines every ink. Pick text ink by contrast with what lies beneath. Example (lake at dusk): sky `#F1D7A6`, far `#8E9DB8`, mid `#3F6B6A`, near `#1C2E33`, accent `#F06A3B`.
- **Type:** names and values in Big Shoulders, fitted to their column; tracked-out labels in Instrument Sans or Space Grotesk; the header prints into the sky and the info band prints last. Poster text doubles as the subtitle; with a voice, captions print as a band rather than floating.
- **Motion:**
  - A pull is steady and linear (`Easing.linear`, ~10–16 f across the sheet): a squeegee does not ease. An accent ink starts half a beat after its layer; facts in the band appear from left to right on subdivided beats; nothing fades, anywhere.
  - The screen lifts in ~12 f (squash plus a growing shadow); a palette re-ink is a diagonal blade crossing in ~10 f with identical geometry on both sides; loose layers parallax with paper gaps, then lock into alignment on a single hit. Each text stays up at least one second plus one second per twelve characters after its last item lands.
- **Camera and cuts:**
  - Inside a Motif: truck alongside the squeegee, a locked top-down sheet while layers stack, a push and tilt to the info band for reading, a slow dolly along a row of finished prints.
  - Between posters: a near silhouette such as a pine, a street lamp or a mast sweeping across as a wipe built across the batch boundary, or a Timeline linear wipe timed like a pull; no dissolves and no bare cuts. Hold the final wall for at least 90 f.
- **Sound:** hand-played acoustic instruments chosen for the place (guitar, harmonica, upright bass, accordion, brushes), one ink landing per musical event, squeegee rasp on mesh, screen clack and hinge creak, and the scene's own ambience waking once a print is done.
- **Signature devices:**
  - The pull: each ink is one SVG path (holes for knock-outs) revealed through a `clipPath` whose leading edge is a ragged polyline moving at constant speed, with a small blade-and-bead shape riding that edge.
  - Stepped sky: horizontal `Surface` rects of one ink thinning into stripes before the next ink begins, the only allowed stand-in for a gradient; a dashed accent route stamped segment by segment (restyle `route-map` when a real path is needed).
  - Ink body and register: offset each layer 1–3 px by a seeded value, put a faint multiplied ghost under each ink edge, a light rim top-left and a dark rim bottom-right, and paper texture from `feTurbulence` shown only on inked areas.
- **Pitfalls:**
  - Stroked edges draw seams inside merged shapes; build everything from fills.
  - Parallax alone looks like the mountains are walking; show paper gaps while loose and close them with a sound.
  - Honest reading times overrun short pieces; print several items in one pull, or leave minor ones for the final wall.
- **Vary it:** one template re-inked per season, time of day or colourway; a street walk printing each shop sign as it passes; a misprint story that only lands true on the date; end on a drying rack or the poster pasted up in the place it shows.

## Limits in Timeline X

- **lidar-survey:** flying through a real point cloud needs GPU point rendering; Motifs have no canvas or WebGL, and point-cloud import into 3D Studio is not confirmed. Fallback: relief or hillshade stills as layers, with a scan-line and section overlay Motif. The core flythrough is lost.
- **microscope:** one unbroken zoom through a whole-slide image pyramid, with focus breaths, needs tiled streaming and blur. Timeline X can only chain push ins across a few stills of the same specimen, and scale readings must be computed from file metadata outside the app.
- **satellite-briefing:** the globe-to-ground descent through georeferenced plates is shader work, so dives become stepped push ins between stills. `search_stock` covers Commons only, so most Landsat or aerial scenes must come from the user.
- **archive-lighttable:** the negative turning positive inside the loupe and the photo opening into depth both rely on per-pixel shaders and depth maps. Needs a positive copy as a second layer revealed by a growing circular mask; depth only by masking subjects onto separate layers and moving them slightly.
- **white-model:** light that follows each facade's normal, and a sun placed from real latitude and date, need 3D Studio lighting plus a solar calculation done outside. Importing building footprints and heights into 3D Studio is unconfirmed.
- **data-physical, teardown:** both depend on 3D Studio holding many repeated pieces or converted CAD (STEP to GLB happens outside Timeline X); painting circuit boards from layout files has no tool. The Motif fallback is flat and limited by the ~4,096-node cap.
- **woodcut:** turning a photo or sculpted relief into cuts that follow the form is filter work Timeline X lacks, and posterize gives exactly the threshold look the style rejects; only hand-authored cut paths work.
- **engraving:** dense swelling hatching on complex figures means thousands of variable-width filled paths, which the node cap blocks; keep figures simple and reuse hatch families through pattern or use.
- **risograph, halftone-dossier:** separating a real photo into spot-ink plates with a screen-fixed dot pattern is not available; halftone, posterize and a two-colour grade on the photo layer only approximate it. Dossier line boil cannot use displacement filters (`feDisplacementMap` is absent), so it is done by re-seeding vertices.
- **briefing-board:** one continuous wall take longer than 15 s must be cut into batches; cut-outs need hand-drawn masks; scaling Motif layers up through a controller may soften ink lines, so check the closest frames.
