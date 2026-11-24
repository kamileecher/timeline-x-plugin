# Technique recipes: numbers that make common devices land

Use this reference once a device is chosen (a chart, a mark, a camera move, a
sting, code or a product UI on screen, hand-drawn steps, word captions) and
you need starting numbers for its timing and framing. The general principles,
the motion review and the reading-time rule stay in
[motion craft](motion-craft.md), [type craft](type-craft.md) and
[story and review](story-and-review.md); where a number here and a rule there
seem to differ, those files win. Times are seconds at any frame rate; sizes
are for a 1080-px short edge, so scale them with the canvas.

Contents: pacing; transitions; camera; focus pulls; marks; numbers and charts;
text reveals; impacts; logo stings; hand-drawn steps; code on screen; product
UI; word captions; vertical layout; recaps; light and depth; start states;
what the frame checks report.

## Natural motion and carrying between scenes

The built-in module hareket-kiti gives every move a role instead of one curve
for everything: enterStyle (rise, pop, slide-left, slide-right or fade, on a
spring), exitStyle (sink, lift, shrink or fade, accelerating away over about
0.3 s) and travel (a point gliding from one place to another on a gentle arc,
so it never reads as a dead-straight diagonal). Carry flies one element from a
rectangle in one scene to a rectangle in the next and resizes its box on the
way: render it outside the Series so it lives across the cut, and let the
scenes leave that element out. rideOn places a rider on a moving host (the
followPath state of a truck, a robot, a hand) with an offset in the host's
frame. The scene "Sahne geçişi" shows a title flying up to become the next
scene's header and a parcel riding a truck.

## Pacing

- Something new should happen every 0.5–1.5 s: an entrance, a move, a cut or
  an emphasis. In vertical social pieces aim for 0.4–0.8 s. "Something new" is
  not the same as "everything moving": a landed title still stops.
- One idea per scene, usually 2.5–5 s. If a scene needs longer, give it a
  second beat (a mark, a value change, a camera step) halfway.
- An end card holds 1.5–2 s with one late touch (the tagline or URL arriving
  last, or a single sheen). It is the one place a slow push of 1.03–1.05 on the
  whole card is welcome.
- Ambient life belongs to backgrounds only: drift periods that never line up
  (for example 7, 9 and 11 s) so the frame never pulses in sync. Copy that has
  landed stays still (motion craft's tells still apply).

## Transitions

The default is still a plain cut. When a designed transition is earned:

- Never crossfade text over text. The outgoing copy leaves (about 0.3 s,
  ease-in) before the middle of the transition, or the transition moves or
  covers the old scene instead of dissolving it.
- Let the transition grow from the old scene: an iris opening from the thing
  just pressed, a shape that carries into the next frame, a card that becomes
  the next background.
- While it is being covered, the old scene keeps drifting 150–200 px in the
  direction of travel, so the hand-off has momentum.
- Incoming copy starts 0.35–0.55 s into its clip so it lands as the transition
  finishes, not underneath it.
- "Next" always travels the same way across a piece.
- Check the middle frame of every transition with `review_motion_graphic` or
  `preview_motif_draft`: it should be neither nearly empty nor a muddy mix.

## Camera

The built-in module kamera-akis-kiti moves a camera over a world bigger than
the frame. Lay the world out in world pixels and give CameraWorld the world
size and a list of shots in time order: {at, fit: {x, y, w, h} or a list of
rects, padding, duration, zoom, offset, minZoom, maxZoom}, {at, follow:
(seconds) => rect or point, lag} for something that moves, or {at, center,
zoom}. The sandbox cannot measure elements, so a shot frames the rectangle
you laid the thing out at. A shot starting within 0.25 s of the previous
arrival blends with it into one move; leave 0.5 s or more for a rest.
Background layers outside the world drift with parallax(cam, depth); children
may be a function of the camera state; cameraAt gives the same state for any
time; shakes add an impact jolt. overshoot: true lets a fast zoom go a touch
past its framing and settle within 0.3 s (an energetic beat, not a calm tour); held shots breathe
by a pixel or two (breathe: false or a number); safe {top, right, bottom,
left} keeps a band free for a caption bar or a step card; overview: true marks
an intentional wide shot, where small labels are not reported. The scene "Kamera turu" shows it (with motion
blur on, which a camera rush needs). review_motion_graphic reads the camera
and reports camera_stop, camera_late, camera_zoom_high and camera_no_target
(a shot that frames nothing).

- One deliberate move per shot, then a hold. Do not push in and straight back
  out within about 2 s, and do not chain zooms of 1.5× or more.
- A slow push is 1.04–1.10 over 2–4 s with a sine in-out ease. Pieces longer
  than about 45 s and product demos use calmer cameras than teasers.
- Lead room: a subject moving right sits on the left third with roughly a
  quarter of the frame free ahead of it. A camera that follows trails the
  subject by 0.2–0.3 s.
- Every label is fully in or fully out of a held shot; a label cut by the edge
  while the camera rests reads as a mistake.
- Never travel across empty space: the next set is already visible at the
  edge before the camera reaches it.

## Focus pull (push in on one detail)

Push in over 0.8–1 s, hold at least 0.5 s. Everything that is not the subject
dims to 30–40% (optionally blurred 8–12 px), and the subject fills 40–70% of
the frame. Release by reversing the dim before the next beat moves.

## Marks: highlight, ring, underline, arrow

- A mark arrives 0.3–0.5 s after its target has landed and holds at least 1 s.
- It belongs to its target: inside the same card, clipped by the same box, one
  mark per thing. The next mark appears on its own target rather than sliding
  across from the last one.
- Pick one mark look (marker swipe, ring, underline) for the whole piece and
  ration the accent colour for it.

## Numbers and charts

The built-in module eskiz-grafik-kiti (installed with the starters; list it in
an asset's modules) has a live line chart: LiveLineChart draws the line to a
progress value, carries the current value at its head, grows its axis with the
highest value drawn so far, and pins callouts to point indexes, which appear as
the head reaches them. chartFollow returns a transform that keeps the head in
view for a camera ride; ease its zoom back to 1 for the final read. The scene
"Canlı çizgi grafik" shows it.

- A counter never shows a value past the real one: count with ease-out and no
  back curve. Only the shape (a bar, a ring) may overshoot and settle.
- All bars share one scale and grow from the baseline, staggered 70–100 ms.
- Frame 0 already shows the axis and short stubs, never an empty plot.
- Labels the next camera push would crop fade out before the push starts.
- When the brief fixes the exact figure, reveal the final number instead of
  counting through invented values in between.
- A value swap: strike the old number, dim it to about 45%, then bring in the
  new one beside it.

## Text reveals

- Masked words rise and also fade in over the first fifth of the rise, so no
  letter sliver shows at the mask edge.
- A second line starts about 0.25 s after the first.
- Exits run at 60–70% of the entrance length with an ease-in, starting from
  the last word.

## Impacts

- Every layer of a hit lands within about one frame of the others: the squash,
  a 10–16 px shake for 0.3–0.4 s, a flash of 0.15 s or less, a ring that grows
  while it fades. Scale them with the size of the hit.
- Impacts are the exception to "arrivals decelerate": the object accelerates
  into the hit (ease-in), then squashes (see the stamp slam recipe).
- One or two big hits per piece, on the beat. Particles stay behind the hero
  copy and are gone within about 0.6 s.

## Logo sting (3–6 s)

Already moving at frame 0; the pieces build from about 0.3 to 2.5 s and the
mark locks on the strongest beat. The wordmark follows about 0.6 s later,
tracking tightening as it lands; the tagline about 0.7 s after that, at 48 px
or more. The lockup fills 40–60% of the frame height, and the last second
still has one small motion.

## Hand-drawn steps (whiteboard, sketchnote)

The same module has style-neutral hand-drawn shapes that redraw their wobble a
few times a second (boil, default 8 per second; 0 holds it still): SketchLine,
SketchRect, SketchEllipse and SketchArrow, each with a draw progress, a seed,
ink colour and width. The arrow draws its shaft, then its head. The style packs
keep their own looks; use the kit when no pack is chosen or a pack lacks a
boiling line. The scene "Eskiz açıklama sahnesi" shows it.

- Order per step: outline first (about 1 s), its fill starting about 0.8 s
  into the outline, the label last, then the connecting arrow (shaft, then
  head, slightly curved).
- Pen strokes ease in-out, never linear. Ink is 5–7 px and labels are 48 px or
  more at the scale of the final wide shot, so the closing pull-back still
  reads.
- The camera starts each move as the next step starts drawing and pulls back
  to the whole board only at the end.

For a pen line whose width follows pressure and tapers at both ends, use
SketchInk from kamera-akis-kiti (points or d, width, draw 0..1, seed); it
draws on from its start like a real stroke. PathStream (or streamItems for
your own shapes) sends dots or rings along an SVG path: rate per second, trip
seconds end to end, jitter, spread to the side, from at until until. Use it
for money, data, traffic or parcels moving along a route.

## Code on screen

- About 34 px type, 8–12 lines in view.
- Typing at about 90 characters per second with seeded jitter of roughly ±45%,
  plus about 50 ms after brackets and about 100 ms at line ends.
- To single out a line: a bar sweeps in, the other lines dim to about 28%, then
  the key token takes the accent.
- End close on the code; a wide shot shrinks it below readable size.

## Product UI

- The window can arrive with a 3D tilt that resolves (about 28° and −16° to
  flat over 1.3 s, ease-out).
- The pointer travels on a slight arc with 0.7–1.5 s between targets.
- Typing in a UI comes in word bursts (15–18 characters per second with
  0.15–0.2 s pauses).
- New list rows push the old rows down (about 0.55 s) instead of popping in.
- A completed check is three beats in about 0.4 s: pop, draw, strike.

## Word captions

Phrases of 1–3 words, broken at pauses longer than 0.3 s. Each word appears
about 60 ms before it is spoken, one highlight slides from word to word, and
two phrases never share the screen.

## Vertical layout

Hero lines span 70–90% of the width and the layout uses the whole height, not
only the top half. Keep copy out of the top 8% and bottom 20%, where social
apps draw their own title, caption and buttons (`review_motion_graphic` and
`preview_motif_draft` report it as unsafe_zone).

## Recaps and year-in-review

Change the layout for every stat so the piece does not read as one slide
repeated. Count from the earlier real value (96 to 214) rather than holding a
number and then counting from zero.

## Light and depth

- A bloom flashes as its subject lands, then settles to 40–50%; a constant glow
  reads as a filter. On footage or a whole layer, build it as an authored
  shader effect with chained passes (bright extract, horizontal blur, vertical
  blur added over the effect input) and keyframe its strength.
- A contact shadow grows and sharpens as an object comes down to its surface.

## Start states

- Start fully hidden (opacity 0, or a fully closed clip), never a sliver that
  shows before the entrance begins.
- Stepped timing ("on twos") is for small elements and drawn styles; on the
  camera or a panel larger than about 15% of the frame it reads as dropped
  frames.

## What the frame checks report

`preview_motif_draft` and `review_motion_graphic` name these alongside the
older layout codes, each by `motionId`:

- text_covered: an opaque box, picture or shape is drawn over settled copy.
- upside_down_text, mirrored_text: copy turned past about 100°, or seen
  from behind; hide back faces of flipping cards.
- orphan_word: a wrapped display headline leaves one short word alone on its
  last line; balance it (textWrap "balance") or set a max width.
- unsafe_zone: copy in a portrait frame's top 8% or bottom 20%.
- text_over_line: a visible stroke (an arrow, a sketch line, a box edge)
  runs through the letters. Move the label or the line, or give the label an
  opaque card painted above the line.
- stray_mark: a small solid dot or tick inside big text or just under its
  baseline reads as a typo or a decimal point. Move it out or hide it while
  the text is up.
- font_unavailable: the first family of a font stack is neither loaded nor
  installed, so the text falls back and looks different on every computer.
  Use a bundled or Library font.
- image_broken: a picture that did not load; check the binding or data URI.
- missing_glyph: a loaded web font has no glyph for some characters (Cyrillic
  in Kalam, an arrow in Inter's Latin set), so a fallback face draws them.
- data_missing: copy prints undefined, NaN, null or [object Object]. A prop
  key is misspelt, a data row is missing or a number did not parse; give the
  value a default or guard it.
- chart_no_values: a chart from the sketch and chart kit got no values, or
  some values that are not numbers (a decimal comma, a unit or stray text in
  the data). Charts of your own can declare their data the same way with
  data-chart-values and data-chart-invalid on the chart's root element.
- morph_no_pairs (review only): morph got a shape with no outline, or two
  shapes whose parts do not match up (3 parts to 2), so only the longest
  outlines morph and the rest vanish. Give both shapes the same number of
  parts, or morph the parts one by one.
- empty_start (review only): nothing readable in the first 0.5 s. The first
  frame is the thumbnail and the hook; show the title or subject from frame 0
  unless a slow reveal is the point.

## Timing promises (data-expect)

Write the brief's times on the elements they are about, in the graphic's own
seconds, and every review holds the graphic to them: data-expect="in-by 2.5;
hold 1.5; gone-by 9; in-frame". in-by: visible by then; gone-by: gone by then
and for half a second after; hold: once in, stays in that long; in-frame:
never cut by the frame while visible. Visible means half opacity or more and
at least half the box inside the frame. A broken promise is expect_failed; an
item that does not parse is expect_bad. A later edit that pushes a label into
the next beat then cannot slip through.

## Camera plan

Every review of a camera world returns camera_plan: per camera, its holds and
moves with the centre, zoom and world rectangle on screen at each end and the
peak screen speed. review_motion_graphic with camera_only returns just the
plan and the camera and timing-promise checks without rendering a picture, so
a shot that aims at the wrong place or lands late shows before a full review.
The camera kit eases joined shots with monotone slopes, so a long hold next
to a quick move no longer swings past either framing.

## Onion skin of a move

review_motion_graphic with trail {from_sec, to_sec, frames} adds one picture:
the last frame with the earlier ones drawn faintly where the moving thing was,
so the path, the spacing (easing) and any jump show at a glance.

## What the motion-quality track reports

`review_motion_graphic` also follows every element over a dense,
geometry-only track of the whole graphic and reports motion faults no single
frame shows:

- cut_exit: fully on screen, then gone in one frame while its scene goes on.
  Give it an exit (fade or move out over 0.2-0.4 s) or hold it to the end of
  its scene. A swap in place and a scene change are not reported.
- sliver_start: a clip-path start state (inset(47% 0)) shows a thin strip
  before the reveal opens it. Start fully closed (inset(50%)) or at opacity 0.
- layout_shift: copy jumps up and down by the same few pixels with nothing
  animating it: a part next to it is mounted and unmounted. Toggle with
  opacity and give the changing part a fixed height.
- camera_stop (style note): the camera brakes to a halt between two moves and
  sets off again; blend the shots or hold 0.5 s or more. camera_late: a shot
  lands in the last 0.3 s of its scene. camera_zoom_high: a fit zooms past 4x.
- moving_overlap: two readable lines on top of each other while one moves (an
  exit and the next entrance at once). Let the old line leave or fade below
  half first.
- empty_frame: the frame is all but empty in the middle of the graphic for
  0.4 s or more (checked on frames either side); keep the next thing on
  screen before the last one leaves.
- ghost_overlap: two half-faded lines crossfade in one place and read as a
  smudge. Let the old line leave first, move one, or use a push or wipe.
- text_carried_over: a big line stays put while a new beat replaces most of
  the frame, and is still there half a second later: it reads as left
  behind. Let it leave with its beat, or carry it on purpose with a move.

Style notes (severity "style"): look at the frames and keep the move when it
is what you meant.

- fast_no_blur: 40+ px a frame at 1080p with motion blur off: it strobes.
  Shorten or ease the move, or give the asset motionBlur.
- straight_move: a long dead-straight diagonal. Offset x and y with
  different easings, or follow a curve with followPath.
- stepped_move: an element larger than about 15% of the frame advances in
  jumps (Math.floor on the progress). Keep stepped timing for small things.
- same_ease: 8+ eased animations and over 90% use one curve. Use springs for
  arrivals, Easing.in for exits and a gentle in-out for long moves.
