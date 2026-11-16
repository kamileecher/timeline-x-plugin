# Motion craft: explanatory devices, movement, and the motion review

Use this reference while deciding what a Motion Graphic should show, how its
parts should move, and how to check that motion before accepting the graphic.
It describes craft only. Timing comes from the runtime's frame helpers, and
authoring, placement, and verification remain on the main skill.

## Choose a device for what the viewer must grasp

An explanatory graphic is worth adding only when the footage alone cannot carry
the idea: a distance, a quantity, a hidden mechanism, a sequence, or a
relationship. Start from that need, render the device in the Project's palette
and type, and time it to arrive when the narration or action asks the question
it answers.

| What the viewer must grasp | Suitable devices | Worth it when | Turns into filler when |
| --- | --- | --- | --- |
| Location or distance | a path traced over a simplified map, a growing scale bar, a sectional slice | the gap between places matters to the story | a rotating planet opens the video by habit |
| Amount or count | a counter that runs to the value, one mark per unit in a grid, two bars compared | a single comparison changes the conclusion | many figures appear and none is explained |
| Mechanism | a diagram assembled stroke by stroke, callout labels with connector lines, parts pulled apart | understanding the mechanism is the point | a technical texture fills the frame without explaining anything |
| Sequence or deadline | an advancing timeline, a countdown, a before and after split | order or time pressure drives the piece | dates scroll by as ornament |
| Relationship | names connected by lines, a hierarchy that builds level by level | one connection is the news | everyone on screen gets a label |
| The key sentence | animated type for the one line the piece hinges on | the line is the turning point | every caption animates |
| A face or place in an archive photograph | a circle and a name on one face, the same place then and now, a line traced over the photograph | the photograph is evidence the story relies on | every photograph gets a circle |
| A line in a document | a highlight drawn along the key line of the real document, redaction bars, a magnified inset | the document is the proof | the whole page lights up |

Built-in Motifs already cover several rows: dot-grid for counts, bar-compare
for two amounts, event-timeline for a sequence, route-map for a distance, and
leader-label for pointing at a part of the footage. Reuse them before authoring
a new asset.

In a minute of explanatory content, two to five devices are usually enough; a
mood piece may need none. State the job of each one. If you cannot say in a
sentence what a device adds beyond the picture, drop it.

When a device annotates real footage, photographs, or documents, keep that
media as its own Timeline layer and put a transparent overlay above it. Motifs
cannot read project media, so the source must not be redrawn or imitated inside
the graphic.

Skip elements that inform no one: drifting particles, glows and flares without
a motivated light, sci-fi interface frames, decorative blur, a device reused so
often it becomes background, and on-screen text that repeats the narration.

## Movement

- **A single focal mover.** At any moment, one element makes the largest or
  earliest move; everything else moves a shorter distance, more slowly, or
  after it, so the eye knows where to look.
- **Lead or payoff.** Either the focal element moves first and the rest
  responds, or the surroundings settle and the focal element arrives roughly
  0.1–0.2 s afterwards as the payoff.
- **Causes precede results.** Whatever triggers a change moves first, and the
  response follows a few frames (about two to four) later instead of on the
  same frame.
- **Shared triggers start together.** Elements answering one event begin within
  a frame of each other and move outward from where the event happened, even if
  they arrive at different times.
- **One entry direction per group.** A group arrives from a single side or a
  single point, not from several at once.
- **Limit simultaneous motion.** When three or more elements animate, let
  roughly a third of them perform their main move at any one time.
- **Rest after arriving.** After a main move lands, hold four to six frames
  before the next main move. A held graphic can keep one small, slow motion.

**Durations to start from.** Small accents 0.12–0.2 s; a label or card arriving
0.25–0.4 s; travel across part of the frame 0.5–1 s; large or weighty elements
0.8–1.5 s; slow ambient loops anywhere from 2 to 20 s. Doubling the distance
adds about 30 percent to the time, and a full-frame traverse takes roughly 1.8–2
times the base. Exits usually run at 65–75 percent of their entrance. Because a
move should arrive on its cue, begin it one move-length before the cue, and any
wind-up earlier than that.

**Weight through timing.** Heavy objects accelerate slowly and stop decisively;
light ones start fast and settle gently. As a guide for duration multiplier and
overshoot: metal about 1.2× with none, glass about 0.9× with none, paper or a
card 1.0× with 3–5 percent, rubber about 0.8× with 15–25 percent, liquid about
1.5× with around 5 percent, smoke about 2× with none.

**Easing.** Arrivals decelerate (ease out), departures accelerate (ease in),
repositioning inside the frame does both, and cycles follow a sine. Constant
speed suits mechanical things only: progress bars, clock hands, steady
rotation, a slow drift. Organic, thrown, or falling motion is never constant
speed. Avoid abrupt starts and stops: begin with an ease or a slight wind-up,
and finish with a settle.

**Staggering a group.** Give every member the same curve and offset only the
start times: typically two or three frames apart, a single frame for a fast
letter cascade, three to five for a slow build. Small items should finish
appearing within about half a second. Order the offsets by reading order for
text and lists, outward from the focal element for a burst, reversed for exits,
and by a seeded order for organic material. The final item may overshoot a
little more than the others.

**Overshoot by tone.** Realistic and premium work: none. Calm: 2–5 percent. An
accent: 5–10 percent. Playful: 15–25 percent. Reserve the bounciest landing for
a single moment in the piece. Choose `spring` settings from the spring table
below.

## Techniques that loosen stiff motion

| Technique | How to apply it | Typical values |
| --- | --- | --- |
| Wind-up | move briefly against the main direction before the main move | 10–20 percent of the travel over 0.1–0.2 s; omit for accents under 0.15 s |
| Trailing parts | attached pieces (rows inside a card, a cable, a shadow) begin and end later than the body and overshoot slightly | begin 1–4 frames later, end 2–5 frames later; never end on the body's frame |
| Supporting reaction | a smaller response to the main move, such as a shadow widening as a card rises or a ripple under a tap | 30–50 percent of the main move's size, 1–2 frames later, own easing |
| Curved paths | organic motion bends; interface parts and machines may travel straight deliberately | bow the path by 5–20 percent of its length at its midpoint |
| Squash and stretch | cartoon or playful styles only; preserve area, so widening means flattening | 2–4 frames on impact, 4–8 to recover; never in realistic or premium work |
| Parallax and counter-motion | the background drifts against the focal move; depth layers move at different rates | 20–30 percent of the focal distance; foreground 1×, midground 0.5×, background 0.2× |
| Ambient motion | one slow, seeded movement near the frame edge while the graphic holds | must never pull attention from what the viewer is reading |

## Spring settings

`spring` accepts a config of mass (default 1), damping (default 10), and
stiffness (default 100). The damping ratio is damping ÷ (2 × √(stiffness ×
mass)). With no config the ratio is 0.5 and the spring overshoots by about
16 percent, so always choose damping deliberately. The natural frequency is
√(stiffness ÷ mass) ÷ 2π, about 1.6 Hz with the defaults.

| Character | Ratio | Overshoot | Damping at stiffness 100 | Damping at stiffness 160 | Typical use |
| --- | --- | --- | --- | --- | --- |
| Settled | 1.0 | none | 20 or more | 25 or more | weight, realism, premium |
| Gentle | 0.8 | about 1.5% | 16 | 20 | quiet arrivals |
| Standard | 0.7 | about 5% | 14 | 18 | labels and cards by default |
| Springy | 0.5 | about 16% | 10 | 13 | playful accents |
| Elastic | 0.4 | about 25% | 8 | 10 | a single punchline |
| Cartoon | 0.3 | about 37% | 6 | 8 | cartoon styles, once |

- Speed: with mass 1, stiffness ≈ 40 × f² for a frequency f in Hz. Heavy or
  large elements suit 1–1.5 Hz (stiffness 40–90), most elements 2–3 Hz
  (160–355), and small snappy ones 4 Hz or more (630 and up). Recalculate
  damping as 2 × ratio × √stiffness. Settling takes roughly
  0.64 ÷ (ratio × f) seconds.
- Ratios of 1 or more use the critically damped curve, so a very large damping
  such as 200 behaves like the settled row at the spring's natural frequency.
- Passing durationInFrames stretches or compresses the settle to a planned
  length without changing its shape; delay postpones the start and is the
  simplest way to stagger.
- overshootClamping does not remove bounce: it cuts off the part above the
  target but leaves the dip that follows. Increase damping instead.

## Building these with the runtime helpers

The runtime offers no motion library beyond its globals; compose everything
above from them using const bindings and bounded array mapping:

- **Move progress:** interpolate across `[start, start + length]` to `[0, 1]`
  with `{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}`; without clamping,
  interpolate continues past both ends.
- **Curves:** `Easing.out(Easing.cubic)` for arrivals, `Easing.in(Easing.cubic)`
  for departures, `Easing.inOut(Easing.cubic)` for in-frame repositioning,
  `Easing.inOut(Easing.sin)` for cycles, `Easing.bezier(x1, y1, x2, y2)` for a
  custom curve, and Easing.linear only for mechanical motion.
- **Overshoot on arrival:** `Easing.out(Easing.back(s))` passes the target by
  about 2 percent at s 0.8, 4 percent at 1, 10 percent at 1.7, 15 percent at
  2.2, and 25 percent at 3.
- **Wind-up:** a three-point interpolate over `[start, start + windUp, end]` to
  `[0, -amount, 1]` with an in-out curve.
- **Trailing parts and stagger:** reuse one curve with a later start, either
  through spring delay or by offsetting the range by index × gap. For an
  outward order use `Math.abs(2 * i / (n - 1) - 1)`; for an organic order use
  random(seed) with a stable seed per item, never an unseeded value.
- **Curved path:** displace the point perpendicular to its path by
  bend × length × `Math.sin(Math.PI * progress)`.
- **Text reveal through a mask:** put each word or line in an overflow-hidden
  wrapper and slide it on translateY; [type craft](type-craft.md) covers
  headroom and reading holds.
- **Sheen across a card:** a single soft gradient band passing once through an
  overflow-hidden wrapper at the reveal, not repeating.
- **Shape change:** a `Surface` polygon whose vertices interpolate between two
  outlines with equal vertex counts, ending on an overshoot curve.
- **Camera and parallax inside one asset:** compute one eased progress p for
  the move, then give every depth plane its own wrapper. Translate each wrapper
  by travel × p × depth (foreground 1, midground 0.5, background 0.2) and, for
  a push, scale each by 1 + push × p × depth with `transformOrigin: 'center'`.
  For true perspective, put `perspective: '1200px'` on the container and move
  planes along translateZ instead. The runtime accepts these style values, so
  no extra helper is needed; for whole-clip moves on the Timeline use the
  camera presets from `list_motion_presets` instead.
- **Opening into a shape:** that is an Iris-family Timeline transition kind,
  added through the batch transitions list or `add_transition`, not something
  drawn inside one asset.

## Camera and layer moves

Describe each move in one line with its name, length, speed word, easing, and
target, for example "drift left, 4 s, medium, ease out, across the dashboard". Use
one main move per shot and at most one subtle secondary move.

| Speed word | Push, pull, or zoom | Pan or slide |
| --- | --- | --- |
| slow | up to about 10 percent size change per second | crossing the frame takes 6 s or longer |
| medium | about 10–25 percent per second | 3–6 s to cross |
| fast | above 25 percent per second | 1.5–3 s to cross; quicker than that reads as a whip |

Give every move a motive: pushing in raises tension or importance, pulling out
releases or reveals, sliding follows travel, and a locked frame leaves the
movement to the subject or the light. Use dramatic moves sparingly.

## Transitions

Default to a plain cut; consecutive plain cuts are fine. A designed transition
must mean something: a dissolve marks passing time, a whip adds energy, a match
links two ideas. Do not repeat a designed transition on adjacent cuts and do not
dress up every cut. To hide a cut inside motion, place it at the fastest point
of the move and keep direction and speed consistent on both sides. Transitions
between Motif scenes are Timeline transitions from `list_transition_presets`,
as the main skill explains.

## Motion review

Judge motion from consecutive frames, not isolated stills. For every key move,
call `inspect_timeline_frames` with the move's half-open frame range, look at
each returned frame, and then look at the resting frame just after it lands.
Confirm all of the following:

1. The focal element is obvious within about half a second.
2. Triggers move before their results.
3. Organic, thrown, or falling elements never advance by equal steps per frame.
4. No abrupt starts or stops; each start eases or winds up and each stop settles.
5. Attached parts lag their body; none stops on the body's frame.
6. Overshoot matches the tone's allowance.
7. Only a minority of elements, roughly one in three, travel at the same moment.
8. Each landing is followed by a pause.
9. Each landing coincides with its cue: the spoken word, the beat, or the cut.

Record every problem as one line naming the scene, the time, and the fix.
Repair the existing asset in place through the main skill and repeat the review
on new frames. The four `verify_edit_result` times remain mandatory; this review
adds to them and does not replace them.

## Motion blur and footage inside a graphic

- Fast moves strobe at 24–30 fps. Give the asset motion blur when a title
  whips in, a card slides across or a number spins: pass motionBlur with
  samples 4–6 (shutter 0.5, a 180° shutter) to the source tool. Each moving
  frame costs that many captures; held frames cost one. Leave it off for slow
  fades and static layouts.
- To show moving footage inside the design (a phone screen, a picture in
  picture, a looping texture), declare an image property and bind it to
  "video:<mediaId>" per instance with add_motif. The clip plays from its own
  start at the graphic's clock and loops; trim or retime footage on the
  Timeline instead. Show it with the same Img element as a still.

## Keyframes users can edit

When a value should follow a shaped path the user may want to retime — a card
that slides in, pauses, then exits — write it as a keyframe track instead of
nested interpolate calls: track(editable("card", "x", "0:-400, 18:120:out,
90:120:hold, 108:2000:in")). Each key is frame:value[:curve] with curve linear,
in, out, inOut or hold (the curve into that key). Key frames count on the
same clock as useCurrentFrame(): at the top level from the graphic's frame 0,
and inside a component rendered within a Sequence, Series.Sequence or Loop
iteration from that window's own start. Call track inside the
scene's component; a track evaluated by the parent and passed down keeps the
parent's clock. track(spec, frame) samples an explicit frame instead.
The Properties panel then lists every key with its frame, value and curve,
adds a key at the playhead and removes keys, for all uses or for one layer
only. Its playhead frame is the graphic's own frame, so for a scene-local
track subtract the scene's start before adding a key there.

## Review

review_motion_graphic renders evenly spaced times over the whole graphic
(samples, default 12) and returns one contact sheet plus findings, so one
call replaces a row of preview_motif_draft frames:

- motion_findings: motion_static (nothing ever changes: drive motion from
  useCurrentFrame, never CSS animations, timers or Date), motion_frozen (a
  still stretch over max_static_sec before the end hold), never_visible,
  text_too_brief (copy gone before it can be read, about 4 words per second),
  content_overlap (two lines of copy on top of each other) and no_stagger
  (every element enters on one frame).
- frame_findings: the layout codes of preview_motif_draft merged over all
  samples. low_contrast is also measured on the rendered pixels behind the
  text, so copy over gradients, photos and video is checked; when no colour
  can pass over a busy area it asks for a scrim, shadow or outline instead.
- compare_version: renders an archived version at the same times and returns
  before/after pairs with a per-time pixel difference. list_motion_graphic_versions
  lists the archive; restore_motion_graphic_version publishes one again as the
  next version (Undo brings the current one back).

Use preview_motif_draft for a single exact frame or a custom size.

## Lottie animations

Ready-made vector animations (icons, characters, loaders, stickers)
come in as Lottie files instead of being redrawn in JSX:

1. import_motion_graphic_lottie with the file (local endpoint) or its JSON
   returns binding "lottie:<id>"; list_motion_graphic_lotties lists the store.
   Only import files the user may use: LottieFiles and other marketplaces
   license each animation.
2. Declare a property { key: "anim", type: "lottie" } and draw it with
   <Lottie src={item.props.anim} style={{ position: "absolute", width: 400, height: 400 }} />.
   Options: loop (wrap instead of holding the last frame), speed (0 to 16),
   startFrame (an offset in the animation's own frames), fit contain, cover
   or fill.
3. Bind the instance with add_motif or update_motif_instance props
   { anim: "lottie:<id>" }, or give the property that default.

The animation follows the graphic's clock: inside a Sequence, Series scene or
Loop it starts at that window's start, and Freeze holds it. useLottie(key)
returns width, height, fps, durationInSeconds and durationInFrames (in this
graphic's frames), handy for sizing a Sequence or Loop to one play. The
player has no expression engine (receipts say uses_expressions) and draws
text layers with the fonts the page has; images must be embedded in the
file. Review the result with review_motion_graphic like any other graphic.

## Text and drawing helpers

Use these instead of hand-built spans, dash arrays and path math, so every
graphic times its parts the same way:

- <SplitText text="..." by="word" preset="rise" start={12} /> reveals parts
  one after another. by: char (letters a frame apart), word (0.067 s apart),
  line (0.12 s apart; pass maxWidth and fontSize). preset: rise (fade and
  lift), blur (blur 6 px to 0 with a fade, the per-word title entrance), fade,
  ink (dim to full), pop (scale in), none. Override with each, duration (in
  frames), from (start, end, center, edges or an index) and partStyle
  ((progress, part) => style) for your own look. Use char for a short name or
  hero word, word for titles, line for a paragraph.
- splitText(text, by) returns the parts ({text, space, index, count}) and
  stagger(index, {each, count, from}) the frame offset, for layouts
  SplitText does not cover.
- drawPath(progress) returns the stroke props that draw an SVG path, circle,
  line or rect from 0 (hidden) to 1 (whole): <path d={d} {...drawPath(p)} />.
- followPath(d, progress, {rotate: true}) places something along a path:
  apply its transform to an absolutely positioned element whose box is
  centred on its origin, in the path's own coordinates.
- morph(fromD, toD, progress) returns path data between two shapes (same
  subpath count morphs subpath by subpath). Keep both shapes simple outlines.

Drive each progress from interpolate or spring of the current frame, and give
a landed title a still hold before the next move.

## Matching a reference video's motion

When the user shares a video to copy the feel of, measure it instead of
guessing: import it, then call analyze_reference_motion with a tight region
around one element and a window of a few seconds. Each move comes back with
its start, length in frames, start and end values, overshoot and the closest
curve as runtime code (for example Easing.out(Easing.back(1.7)) or a spring
with its damping); paste that into interpolate or spring, scaled from video
pixels to your canvas. The events list (cut, flash, hold, appear, disappear)
gives the reference's rhythm: put your own entrances and cuts on the same
beats. Measure again on your render with the same region to compare.

