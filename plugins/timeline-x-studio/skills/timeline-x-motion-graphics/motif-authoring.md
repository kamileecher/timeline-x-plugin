# Motif authoring contract

The rules a Motif document must satisfy to render correctly in Timeline X Studio. This is
the authoritative authoring spec: the in-app source panel, external editors, and
MCP agents all write against it. It is self-contained on purpose — a copy ships
with the app to agent clients, where no other Timeline X Studio document is reachable.

A Motif is a parameterized, time-varying overlay (a lower-third, a countdown, a
title card) authored as **a real web page**: one HTML document plus a JSON
manifest. Placed on the timeline, it is captured frame by frame by a harness
that owns the clock. Any HTML/CSS/SVG/canvas/WebGL and any animation idiom
(CSS, WAAPI, GSAP-style tweens, rAF loops) work, subject to the one law below.

## The one law

> Any visible state MUST be computable **from `t` alone** — via declared
> animations or `frame(t)` — never via mutation that accumulates over time.

The harness drives the page to arbitrary times in arbitrary order (scrubbing,
re-export, cache fills). A document that accumulates state renders wrong the
first time it is seeked backwards.

```js
setInterval(() => { n++; label.textContent = n; }, 1000);   // ✗ stubbed, not seekable
frame(t) { label.textContent = Math.floor(t); }             // ✓ closed-form in t
```

| Forbidden pattern | Why | Write instead |
|---|---|---|
| `setInterval` / self-advancing rAF accumulating state | stubbed, not seekable | closed-form in `frame(t)` |
| `fetch()` for data, fonts, images | the document is fully offline | embed as `data:` URI |
| reading `Date.now()` for motion | returns virtual time | use `t` |
| unseeded physics / particle integration | depends on the prior frame | closed-form `f(t)` or seeded `ctx.random()` |
| global state accreted across instances | leaks after a prop-change rebuild | keep `setup` self-contained |

## Lifecycle: `motif.define`

The harness injects a global `motif` (and the clock takeover) before any author
code runs. The document MUST declare its lifecycle with exactly one call:

```js
motif.define({
  // Runs once per distinct props value. Build the scene, declare animations,
  // load and await assets.
  async setup(props, ctx) { /* ... */ },
  // OPTIONAL: only when content must read the clock (e.g. a countdown number).
  frame(t, ctx) { /* ... */ },
});
```

- **`setup(props, ctx)`** — async; runs once per distinct props value, and
  re-runs whenever a prop changes. It MUST be self-contained: rebuild the DOM
  it owns, declare animations fresh, and `await` every asset (fonts included —
  see below) before resolving. No state may survive from a previous run.
- **`frame(t, ctx)`** — optional; called at every seeked time. `t` is content
  time in **seconds**. Pure-declarative Motifs omit it.
- **`ctx`** = `{ duration, width, height, fps, frame, random() }` — `duration`
  in seconds, `ctx.frame` the integer frame index, `ctx.random()` a seeded
  deterministic generator.

Declared animations are seeked by pausing and setting `currentTime`; they are
never cancelled or committed. So animations MUST stay alive and well-defined at
every `t`: use `fill: "both"` (or equivalent), and never remove a finished
animation — deleting it breaks seeking back to earlier times.

## The manifest

```json
{
  "name": "Lower Third",
  "size": [1280, 320],
  "default_duration_s": 5.0,
  "content_duration_s": 0.8,
  "settle_rafs": 1,
  "props_schema": {
    "title":  { "type": "string", "default": "Jane Doe", "max_length": 40 },
    "accent": { "type": "color",  "default": "#ff4d4d" }
  }
}
```

- **`id` / `version`** — app-assigned; anything the document claims is ignored,
  and a minted id can never shadow a built-in.
- **`name`** — the display name.
- **`size`** `[w, h]` — the natural authoring size in CSS px, top-left origin.
  Lay out within it and write no resolution/DPR code: capture resolution,
  placement transform, and layer opacity are all applied by the host.
- **`default_duration_s`** — the initial placed-layer length. MUST be finite
  and positive (as must every duration field).
- **`settle_rafs`** — real browser frames the harness waits after a seek before
  capturing; clamped to `{0, 1, 2}`, default `2`. CSS/DOM-only Motifs MAY set
  `1`; canvas/WebGL Motifs SHOULD keep `2`.
- **`fonts`** — declares bundled font files; meaningful only for Motifs
  installed as a directory with an `assets/` folder (built-ins). A single-file
  Motif embeds fonts as `data:` URIs instead.

### Duration: three shapes

A layer is a *window* into the Motif's content, the way a video clip windows
its media. The manifest picks one of three content-duration shapes:

| Manifest declares | Content duration | The placed layer | For |
|---|---|---|---|
| `max_duration_prop` (names a `number` prop) and/or `max_duration_s` | the prop's live value, else the static cap | **capped** to that length; windowable | bounded clips — a countdown |
| `content_duration_s` | that fixed value | **freely extendable**; frames past the end hold the last content frame | animate-in-then-hold overlays — a lower-third |
| none of the above | the layer's own width | extendable; animates over the placed duration | unbounded overlays |

The load-bearing distinction: `max_duration_s` also caps the layer;
`content_duration_s` does not. A holdable overlay SHOULD declare
`content_duration_s` (the length of its in-animation): the held tail costs one
capture, and trimming the layer never invalidates cached frames.

### `props_schema`

Exactly four variants exist — this vocabulary is frozen. Each prop MUST carry a
`default` that satisfies its own constraints.

| Variant | Constraints |
|---|---|
| `string` | optional `max_length` (counted in Unicode scalar values); optional `multiline` (renders a textarea) |
| `color` | hex string: `#rgb`, `#rgba`, `#rrggbb`, or `#rrggbbaa` |
| `number` | optional `min` / `max`, both **inclusive**; values must be finite |
| `enum` | `options`: the exhaustive string list; `default` must be one of them |

Validation is strict on keys and lenient on recovery: unknown prop keys reject,
missing keys fall back to defaults, and values are canonicalized into a stable
key order so identical inputs produce identical bytes and identical cache keys.
The schema carries **data only** — no labels, order hints, grouping, or widget
hints. The host generates the editing form from it: one row per prop in the
manifest's authored key order, keys title-cased (`bg_color` → "Bg Color"),
widget switched on the variant. Design prop keys to read well through that
transform.

## Runtime environment

The document renders in an offline, isolated capture host. Hard limits:

- **One self-contained file.** The render document allows inline `<script>` and
  `<style>` only — no external `.js`/`.css` files. Images and fonts load from
  `data:` URIs (or from the Motif's own directory, for directory-installed
  Motifs).
- **No network.** No fetch, XHR, WebSocket, or any external URL. Everything the
  document needs is embedded in it.
- **The clock is virtual.** `Date.now`, `performance.now`, `setTimeout`,
  `setInterval`, and `requestAnimationFrame` are all owned by the harness. Do
  not capture references to time sources before `motif.define` runs.
- **Transparency is real.** The capture preserves alpha: keep
  `html, body { background: transparent }` unless the Motif is deliberately
  opaque.
- **Frames time out.** Each capture has a wall-clock cap; an infinite loop or a
  never-resolving `setup` fails the frame instead of hanging the app.

### Fonts

`await document.fonts.ready` is NOT sufficient — it can resolve before a lazy
`@font-face` fetch even starts, letting the first capture paint a fallback
font. A font-using Motif MUST force each face it renders, per weight and size,
before `setup` resolves:

```js
await document.fonts.load('700 56px "Inter"');
```

Embedded `data:` fonts are deterministic; `system-ui` stacks render
differently across machines. The app also serves twelve open-licence families
with full Turkish coverage to every Motif on its own origin, at
`_shared/fonts/` relative to the document:

| Family | Weights | Files |
| --- | --- | --- |
| Inter | 100–900 | inter-latin-wght-normal.woff2, inter-latin-ext-wght-normal.woff2 |
| Stack Sans Notch | 200–700 | stack-sans-notch-latin-wght-normal.woff2, stack-sans-notch-latin-ext-wght-normal.woff2 |
| JetBrains Mono | 100–800 | jetbrains-mono-latin-wght-normal.woff2, jetbrains-mono-latin-ext-wght-normal.woff2 |
| Fraunces | 100–900 | fraunces-latin-wght-normal.woff2, fraunces-latin-ext-wght-normal.woff2 |
| Newsreader | 200–800 | newsreader-latin-wght-normal.woff2, newsreader-latin-ext-wght-normal.woff2 |
| Instrument Sans | 400–700 | instrument-sans-latin-wght-normal.woff2, instrument-sans-latin-ext-wght-normal.woff2 |
| Bricolage Grotesque | 200–800 | bricolage-grotesque-latin-wght-normal.woff2, bricolage-grotesque-latin-ext-wght-normal.woff2 |
| Space Grotesk | 300–700 | space-grotesk-latin-wght-normal.woff2, space-grotesk-latin-ext-wght-normal.woff2 |
| Archivo | 100–900 | archivo-latin-wght-normal.woff2, archivo-latin-ext-wght-normal.woff2 |
| Big Shoulders | 100–900 | big-shoulders-latin-wght-normal.woff2, big-shoulders-latin-ext-wght-normal.woff2 |
| Unbounded | 200–900 | unbounded-latin-wght-normal.woff2, unbounded-latin-ext-wght-normal.woff2 |
| Kalam | 400 and 700 (static) | kalam-latin-400-normal.woff2, kalam-latin-ext-400-normal.woff2, kalam-latin-700-normal.woff2, kalam-latin-ext-700-normal.woff2 |

An HTML Motif declares one `@font-face` rule per file, for example
`src: url("_shared/fonts/inter-latin-ext-wght-normal.woff2") format("woff2")`
with `font-weight: 100 900`, and loads it as shown above. JSX Motion Graphics
get these rules and the loading for free and simply name the family in
`fontFamily`: runtime v9 declares the first three families, runtime v10 all
twelve, and v10 preloads only the families its source or props name. Any other
file name under `_shared/fonts/` is refused.

## Parameter UI

The host-generated form described above is the normal path — a Motif is fully
editable with zero UI effort. A Motif MAY instead ship a `params.html` beside
its `index.html` to own its whole parameter panel; presence of the file is the
only switch. That page is a separate, sandboxed document with its own protocol,
and it cannot be supplied through the MCP draft surface — drafts always get the
generated form.

## Authoring over MCP

The MCP tools (`list_motifs`, `get_motif_source`,
`create_motion_graphic_from_code`, `create_motion_graphics_batch_from_code`,
`update_motion_graphic_from_code`, `update_motion_graphic_literals`, `write_motif_draft`,
`preview_motif_draft`, `install_motif`, `delete_motif`) carry their own
per-tool contracts; the document-level facts that matter when writing:

- `create_motion_graphic_from_code` is the frame-driven JSX authoring
  path. It compiles inline JSX, embeds the original source plus property/FPS/
  duration metadata, and installs the result in the Library in one call. It
  does not place a timeline instance. The asset keeps the FPS rational of the
  open project so `useCurrentFrame()` remains stable in Library preview,
  timeline preview, and export. New source islands also persist
  `runtimeVersion` and `securityProfile` (`sandboxed-surface-v1`) so repairs can
  distinguish this bounded runtime from older generated assets. On the local
  MCP endpoint this tool, each batch asset, and `update_motion_graphic_from_code`
  accept `codePath` (absolute path to a UTF-8 file, same 200000-byte limit) in
  place of inline `code`; the file is read once and only its text is stored.
- Shared source lives in **Motion Graphic modules** (ADR 0185). A module is
  top-level `const` declarations in the same JSX subset: components
  (`const Cursor = ({x, y}) => ...`), helpers, constants. It has no
  `Component` and no `motionId` / `editable(...)` marker. An asset lists
  modules in its `modules` argument (at most 8, in order); the host compiles
  their source in front of the asset's own `code` as one program, so the asset
  uses the declarations directly and stays one self-contained document. The
  stored source is the asset's own `code` plus `modules: [{ id, revision }]`.
  A name declared twice is refused with both owners named.
  `update_motion_graphic_module` replaces a module and republishes every
  installed asset that lists it, after compiling all of them first; one that
  would stop compiling refuses the update. `list_motion_graphic_modules`
  shows each module's declarations and users, `get_motion_graphic_module_source`
  its source, `create_motion_graphic_module` and
  `delete_motion_graphic_module` (refused while in use) complete the set.
  Modules are user-level, stored in `<data root>/motifs/_modules/`, and are
  offered on the local MCP endpoint only.
- `create_motion_graphics_batch_from_code` is the strict long-form path. It
  compiles every unique source before publishing, enforces the 15-second local
  Motif limit and exact primary coverage, and returns both Library receipts and
  immutable placement rows. Any publish failure removes every fresh asset from
  that call. Each placement copies its row's batch/segment audit ids into
  `add_motif`.
- Transitions between Motion Graphic scenes are Timeline transitions (one
  catalog, one two-input compositor node, ADR 0035/0048/0063), not a second
  in-asset catalog. The batch `transitions` list joins consecutive primary
  segments on one lane with a shared-catalog preset or kind/direction, an
  integer frame duration, and an optional linear/ease timing. Instance frames
  describe the final layout, so a planned transition overlaps its two segments
  by exactly its duration and continuous coverage becomes the scene total minus
  the transition total; a segment must be at least as long as its incoming plus
  outgoing transitions. The receipt adds `planned_transitions` (with
  `transition_args` ready for `add_transition`) and a `placement_order`: each
  incoming segment is placed at its outgoing neighbour's end, then the
  overlap-placement `add_transition` moves it left onto its planned start
  before the next segment lands. Transition-bound layers
  are not refitted when their asset duration later changes (see below).
- Place the returned asset separately with `add_motif`. For a queued editor
  request, carry the captured project id as expected_project_id, use the
  receipt's duration_in_frames, and re-read the exact placed layer before
  visual review. Finish with `verify_edit_result`: check the layer id, track,
  Motif id, and exact interval, then request fresh composed PNGs at entrance,
  settled, middle, and the last visible exit frame. Standalone draft preview
  frames do not prove the timeline composition.
- JSX source receives `React`, `useCurrentFrame`, `useVideoConfig`, `useAudio`,
  `useImage`, spring, interpolate, `interpolateColors`, `Easing`, `AbsoluteFill`, `Img`,
  `Surface`, `Sequence`, `Series`, `Loop`, `Freeze`, `editable`, and
  deterministic random as globals.
  `Surface` converts a bounded declarative
  geometry/path/text command list to safe SVG; it does not expose canvas, refs,
  or imperative drawing. Imports, exports, mutable bindings or
  collections, imperative loops, asynchronous work, browser/DOM globals,
  stateful hooks, network access, and `Video`/`Audio` are rejected.
- `spring` treats damping ratios at or above 1 as critically damped
  (runtime v6), so `config: {damping: 200}` settles in well under a second.
- `AbsoluteFill`, and the default wrapper of a `Sequence`, `Series.Sequence`
  or `Loop` window, is a full-size flex column (runtime v8): center content
  with `justifyContent`/`alignItems`, and wrap inline siblings in their own
  element to keep them on one row. An authored `display: 'block'` or
  `flexDirection` wins.
- Browser global names (window, document, top, parent, self, location,
  navigator, console and the rest) are refused even as local names; the
  refusal names the identifier, so rename a binding such as `const top` to
  `const topValue`.
- Runtime-v4 time windows are integer frame windows inside one asset.
  `<Sequence from durationInFrames>` renders its children only in the
  half-open window `[from, from + durationInFrames)` (omitted duration runs to
  the enclosing window's end, and nested windows clip to their parent).
  `<Series>` accepts only `<Series.Sequence durationInFrames offset>` children
  and starts each one where the previous ended plus its offset; only the last
  may use `Infinity`. Inside a window, `useCurrentFrame()` counts from 0 and
  `useVideoConfig().durationInFrames` is the window length. The renderer owns
  this offset stack while it walks the tree and never calls components of a
  hidden window, so they cost no node budget. `layout="absolute-fill"` (the
  default) wraps children in an absolutely filling `<div>` that may carry
  a style object, `className`, and a literal `motionId`; `layout="none"` adds no
  element and is required inside SVG. Frames, offsets, and durations must be
  integers; `playbackRate`, `trimBefore`, and premount props are refused.
  These windows are not Project sequences and are invisible to
  the Timeline. The asset duration still bounds them: scenes after it are
  never shown, and frames after a shorter `Series` render without its scenes.
- Runtime v5 adds `Loop` and `Freeze` on the same integer clock.
  `<Loop durationInFrames times layout name>` is a `Sequence` placed at the
  iteration that owns the enclosing local frame, so its children restart at 0
  every `durationInFrames`; `times` (a non-negative integer, default
  `Infinity`) caps the iterations, and the loop never outlasts its enclosing
  window, whose last iteration it clips. Only the active iteration renders, so
  `times` does not multiply the node budget. `Loop.useLoop()` returns the
  nearest loop's `{iteration, durationInFrames}` and null outside a loop. A
  `Loop` takes the same layout, style, `className`, and `motionId` props as
  `Sequence`. `<Freeze frame active>` pins the enclosing window's local frame
  to the non-negative integer `frame` for its children, nested windows, and
  loops, and adds no element. `active` (default true) is a boolean or a
  function called with the enclosing local frame that must return one; the
  const-only source profile keeps it pure. Fractional `durationInFrames`,
  `times`, or `frame` are refused. A `Loop` or `Freeze` around the scene
  `Series` counts as an enclosing window for the scene map below; one inside a
  scene leaves the map intact.
- Runtime v7 makes graphics react to sound (ADR 0130). Declare a property with
  `type: 'audio'`; it is stored as a string prop that is `''` (silent) or
  `audio:<mediaId>@<offsetUs>`, where Motif-local time `t` hears source time
  `offsetUs + t`. `useAudio(key?)` (default: the first `audio` property)
  returns frozen `{active, level, onset, beat, bands}` for the rendered frame,
  every value 0..1: `level` is loudness relative to the track's loud passages,
  `onset` the strongest attack in the frame, `beat` an onset pulse decaying over
  about 0.12 s, and `bands` 16 log-spaced energies from 40 Hz to 16 kHz. Bind a
  placed instance to the audio playing under it by passing
  `"audio-layer:<layerId>"` for that prop to `add_motif` or
  `update_motif_instance`; the host stores the media and offset at that moment,
  so pass it again after moving the audio. Only normal-speed, forward Audio or
  VideoClip layers can be bound. Without a binding every value is 0 and
  `active` is false, so the graphic still previews. Audio follows the rendered
  frame, not a `Sequence` or `Freeze` local clock.
- Runtime v12 shows Library images without embedding them (ADR 0184). Declare
  a property with `type: 'image'`; it is stored as a string prop that is `''`
  (no image), an inline `data:image` URI, or `image:<mediaId>`, a still Image
  in the Project Library. Set the binding per placed instance by passing
  `"image:<mediaId>"` for that prop to `add_motif` or `update_motif_instance`,
  or pick the image in the property panel; Video, Audio and unknown ids are
  rejected. Before each frame the host reads the media and delivers a bounded
  copy (longest edge 2048 px, at most 6 MiB, at most 8 bound images per
  instance), so `item.props.<key>` reads as a `data:image` URI and
  `<Img src={item.props.logo} />` works the same for an inline default and a
  binding. `useImage(key?)` (default: the first image property) returns
  frozen `{src, width, height, active}`; its width and height are the
  delivered pixel size, or 0 for an inline URI. Without an image the source is
  `''`, `active` is false, an `Img` renders nothing and a style whose `url()` is
  empty is left out, so the graphic still previews. Delivered bytes do not
  count against the 1,000,000-character property budget. Replacing or
  relinking the image in the Library re-renders every instance bound to it.
- The compiler also maps a scene `Series` statically when the source renders
  exactly one `Series`, it is not inside another time window, and every child
  is a literal `<Series.Sequence>` whose `durationInFrames` and offset are
  integer literals or `editable(...)` literals (and whose name and `motionId`
  are string literals). The map reads esbuild's compiled output, so it never
  executes authored code. It is persisted as `motion_graphic.scenes` and
  returned as the receipt's `scene_map`: each scene's start frame (relative to
  the `Series` start, which is the asset start when the `Series` sits in
  `Component`'s returned JSX), duration, offset, and whether its duration is
  an editable literal on its own `motionId`. Computed children, spreads,
  expressions, fragments, a second `Series`, or an enclosing window yield no
  map and a `scene_map_note`. A mapped `Series` ending after the asset
  duration fails compilation instead of silently cutting scenes.
- `update_motion_graphic_literals` with `resizeToScenes: true` retimes a
  mapped scene safely: the asset duration changes by exactly the change in the
  `Series` end, so frames outside the `Series` keep their length. It requires
  a scene map before and after the edit.
- Source updates, `install_motif` updates, and the staleness report and
  acknowledgement reach every placed layer once: on the root Timeline, inside
  reusable sequences and Motion Clips, and inside inline compounds from older
  projects. A placed instance's inline mirror is never counted separately.
- Whenever a source edit (`update_motion_graphic_literals` or
  `update_motion_graphic_from_code`) changes the asset duration, every placed
  layer that showed the whole asset — no window offset and a span equal to the
  old duration on the frame grid of the timeline holding it — gets the new
  out-point on that same grid inside the same Motif rebind commit, so one Undo
  restores both the version and the range. The holding timeline's duration
  follows its content as any edit there would (a pinned root only grows), and
  a reusable sequence's placed instances refresh their mirrors but keep their
  own range. Windowed, trimmed or held, transition-bound, and layers that would
  run into the next layer on their track keep their range; receipts list
  `fitted_layers` and `unfitted_layers` with the reason and the layer's
  `sequence_id` (null for the root Timeline), ready for `update_layer`.
- `add_motif` with `scene_markers: true` places the layer and, in the same
  commit, one point marker at each scene start the layer shows, so voiceover,
  music, and captions can align to the scenes. The marker time is the layer
  start plus the scene's start frame (converted from the asset's frame grid and
  snapped to the project grid), minus any window offset; scenes that start
  before the layer's window or at/after its out-point are returned in
  `skipped_scenes`. Labels use the scene name, else its `motionId`, else
  "Sahne N". Each marker carries `metadata.motion_graphic_scene`
  (`layer_id`, `scene_index`, `scene_id`). The same scene map is exposed on
  the catalog entry as `scene_map` (in the asset's own `fps`). The call rejects
  a Motif without a scene map, and the result is then
  `{ layer_id, scene_markers, skipped_scenes }` instead of a bare id.
- A source edit that rebinds placed layers carries the new scene map in the
  same Motif rebind commit. Markers linked to a rebound layer move to their
  scene's new start, matched by `motionId` and otherwise by index; a region
  keeps its span and labels are left alone. Markers whose scene vanished or is
  no longer inside the layer stay put; a nested layer's markers move within
  its own timeline. Receipts list `synced_scene_markers` and
  `unsynced_scene_markers` whenever a rebound layer has linked markers.
  Moving, trimming, or deleting the layer does not move or remove them.
- `get_motif_source` returns a motion_graphic object for these assets. Its
  code field is the original editable JSX; the HTML also retains that source
  in the `motion-graphic-source` JSON island. Runtime-v3+ assets also expose an
  `elements` array built from unique literal `motionId="..."` attributes. Each
  entry lists scalar values explicitly authored as
  `editable("element-id", "parameter", literal)`.
- `update_motion_graphic_literals` is the narrow write-back path. It accepts an
  exact element id/parameter/value tuple plus project and version guards. Only
  the third double-quoted string, finite number, or boolean literal of the
  matching `editable(...)` call can change, and the replacement type must
  match. Dynamic ids, templates, expressions, arrays, objects, duplicate
  markers, unknown targets, and surrounding-source rewrites are refused. The
  complete patched source is compiled before atomic publish/rebind; failure
  leaves the installed last-successful bytes active.
- `update_motion_graphic_from_code` replaces one installed JSX asset in place.
  Pass the stable asset id, open project id, current manifest version, and the
  complete replacement source/metadata. It rejects stale project or version
  guards, preserves the Library identity, bumps the asset version, migrates
  compatible instance properties, and rebinds every current-project placement.
  If validation, compilation, publish, or rebind fails, the previous installed
  bytes and version remain active. `get_motif_source.compile_state` identifies
  the installed last-successful version.
- A composed-preview repair must target the diagnosed surface: update source
  constants with the literal write-back tool, structural source with the full
  in-place JSX tool, instance content/transform with
  `update_motif_instance`, or a proven range error with `update_layer`. Re-read
  state and repeat the same four-frame `verify_edit_result` gate after every
  mutation; never duplicate the asset or layer to hide a failed repair.
- `write_motif_draft` takes `{ manifest, html }` with the html **not**
  containing a manifest island — the app strips any present and injects the
  canonical one (`<script type="application/json" id="motif-manifest">`).
- The manifest is validated at write time (sane `size`, finite positive
  durations, well-formed `props_schema`) — a bad manifest rejects the write
  rather than failing at render.
- A draft renders through the exact same capture path as an installed Motif,
  and every source rewrite re-captures automatically.
- Base a new Motif on the closest existing one: read its source with
  `get_motif_source` and keep what already satisfies this contract.

### `sandboxed-surface-v1` JSX capability profile

The JSX compatibility path is a visual-program subset, not an arbitrary web
application or npm runtime:

- Source is import-free and const-only. Each frame must be a pure function of
  `useCurrentFrame()`, declared `item.props`, and the provided deterministic
  helpers. The generated factory runs in strict mode with ambient browser,
  timing, network, messaging, reflection, and dynamic-code bindings shadowed.
- Output is created by the app's own VDOM writer. It accepts presentation-only
  HTML (text/layout/table/image primitives) and SVG drawing/filter primitives.
  Custom elements, scripts/stylesheets, forms, interactive events/refs,
  iframes, objects, embeds, `foreignObject`, and raw HTML injection are refused.
- `Surface` accepts at most 2,048 commands per frame and supports bounded groups,
  rectangles, circles, ellipses, lines, polylines, polygons, SVG paths, and text.
  Commands may depend on `useCurrentFrame()` and props, but receive no context,
  ref, callback, DOM node, canvas, WebGL, WebGPU, or shader access.
- Image URLs are limited to local `#` fragments, self-contained `data:image`
  values, and the already confined `motif:` scheme. Remote, `file:`, and
  `blob:` URLs are refused in attributes and CSS. A Library still arrives only
  as a host-prepared `data:image` payload for an `image:<mediaId>` binding
  (ADR 0184). Project video/audio is not a string path: it remains unavailable
  until the editor grants it through an opaque, instance-scoped media
  capability.
- One frame is capped at 4,096 DOM nodes, depth 64, 8,192 flattened children,
  1,000,000 rendered text/property characters, and 128 attributes or style
  properties per element. Host-delivered Library image bytes are bounded
  separately at 96,000,000 characters per frame. A capture that still wedges is bounded by the Motif
  host timeout; that host is destroyed before the next request.
- Props and the video-config view are frozen and rebuilt from the original
  instance values on every frame, so a component cannot accumulate state
  across arbitrary seeks.
- A literal `motionId` on a supported rendered element becomes
  `data-motion-id`; duplicate source or rendered ids fail closed. The
  `editable` helper returns its scalar unchanged at runtime. Its purpose is to
  let the compiler record exact source spans, not to expose a mutable runtime
  channel or general AST rewrite surface.

These are defense-in-depth rules for generated JSX. Existing hand-authored HTML
Motifs keep their documented API and remain backward-compatible; their security
boundary is still the separate sandboxed BrowserWindow, offline Motif CSP,
navigation lockdown, and capture timeout.
Previously compiled runtime-v1 `sandboxed-dom-v1` and runtime-v2
`sandboxed-surface-v1` assets also remain compatible; their stored HTML is not
rewritten until a successful source update.
