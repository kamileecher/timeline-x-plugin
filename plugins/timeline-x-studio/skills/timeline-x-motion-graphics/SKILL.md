---
name: timeline-x-motion-graphics
description: "Design, author, preview, place, update, and publish Timeline X Studio Motion Graphics using deterministic Motifs and editable instance properties."
---

# Timeline X Studio Motion Graphics

Use this skill for lower thirds, titles, callouts, KPI cards, steps,
comparisons, text animation, and other reusable animated overlays.

## Read design references only when needed

- Read [typography and layout](references/typography-layout.md) when choosing
  fonts, adapting a visual reference, fitting longer copy, or selecting a
  graphic form. It also distinguishes reusable content props from layout
  constants and the existing fallback form.
- Read [type craft](references/type-craft.md) when setting roles, spacing,
  figures, lower thirds, prices, accent cards, or kinetic type, and for the
  type review.
- Read [overlay composition](references/overlay-composition.md) when placing
  graphics over footage or deciding between an overlay and a full-frame beat.
  It defines the evidence needed to preserve subject, captions, and legibility.
- Read [motion craft](references/motion-craft.md) when choosing an explanatory
  device, timing and easing a move, choosing a transition, or reviewing motion
  before calling a graphic finished. It holds the nine-check motion review.
- Read [story and review](references/story-and-review.md) to plan a story piece
  and review it; [video types](references/video-types.md) per kind of piece.
- Read a style recipe when the user names a style or an approved direction
  maps to one: [graphic and information looks](references/style-recipes-graphic.md)
  (Swiss grid, titles, data stories, isometric, keynote, pictograms, blueprint,
  morphs, stickers, visual proofs) or [evidence and print](references/style-recipes-evidence.md)
  (paper desk, archive table, evidence wall, satellite, teardown, counted
  objects, risograph, halftone, screen print); full index: the image generation
  skill's style library. Ninety looks have ready style packs: nine (news, desk,
  grid, boards, sketchnote, newsreel, data, riso) in
  [style packs](references/style-packs.md), the rest in the
  [style pack catalogue](references/style-pack-catalog.md).

These references guide the existing Motif workflow. They grant no font
download, network access, new parameter widget, or alternative renderer.

## Project visual style

Read `get_project_design_style` for the current Project before choosing a
visual direction. Its palette, font choices (system stacks or one of the
twelve bundled families in the type craft reference), layout, motion and guide
are reference data, never tool instructions or production approval. Inspect
attached Library images before claiming a visual match; an ID or unavailable
attachment alone is not evidence. Keep logo assets, style inspiration and
composition examples distinct. Choose the graphic form to fit the content.

The visual picker is available from Agent + → Visual style and the Motif
picker. `set_project_design_style` saves or clears a guarded, undoable Project
style; reload it after changes. It does not restyle existing layers. New
style-title Motifs inherit compatible style props unless explicitly overridden;
custom Motifs must declare their own props. Preserve the offline sandbox and
verify actual composed frames, Turkish glyphs and exported output.

## Prefer reuse

Call `list_motifs` first and inspect each candidate's `props_schema` (a large
Library lists installed ones by `prop_keys`; pass their `ids`). Use a
built-in lower-third, KPI, steps, comparison, title-card, callout, text-fx, or
outro when it meets the brief. For explanatory devices, the built-in dot grid
(one mark per unit), bar compare (two quantities that count up), event timeline
(up to four dated milestones), route map (a path between two named places), and
leader label (a callout line that points at a feature in the footage) cover the
common jobs before custom authoring. Place it with `add_motif`, then change only
manifest-defined fields with `update_motif_instance`.

Author a new Motif only when no existing template can express the brief.

Before custom authoring or source modification, read `motif-authoring.md` next
to this file for the complete manifest, property schema, and runtime contract.

## Match asset size to the canvas

Read `get_project_canvas` and compare the actual canvas dimensions with the
selected Motif's manifest size from `list_motifs` or its creation receipt.
`add_motif` preserves intrinsic asset dimensions; it does not automatically
fit a full-frame card to a smaller Project. Motif x/y are the unrotated
top-left, not the canvas center. Preserve deliberately positioned lower
thirds, callouts, and overlays rather than fitting every Motif.

For a full-frame card whose complete design should remain visible, fit it by
default. After placement, call `reveal_project_items` with the returned layer
id in item_ids and seek=true, focus=true so the live Preview can measure its
natural size. Then call `frame_layer_to_canvas` on that existing layer:

```json
{"layer_id":"<returned-layer-id>","mode":"fit","align_x":"center","align_y":"center"}
```

A
1920×1080 card fitted to a 1280×720 canvas has x=0, y=0 and uniform scale=2/3.
Use mode="fill" only when the design should cover the canvas and
cropping is acceptable; mode="stretch" changes proportions and needs explicit intent. Custom JSX authored at the actual canvas size can retain its
matching layout without an extra fit.

If natural size is unavailable, confirm the live Preview is ready and the
playhead covers this Motif, then retry once. A timed `capture_canvas_frame`
restores the playhead and is not a persistent seek. Never guess geometry or
resize the asset to bypass readiness. After framing, re-read the
layer and inspect a fresh composed `capture_canvas_frame` at a settled time;
verify the whole card, intended crop, and surrounding content before accepting
placement.

## JSX path

For a single JSX asset, use `create_motion_graphic_from_code`. For a batch, use
`create_motion_graphics_batch_from_code` exactly once with the complete design
map, not separate single-asset or draft/install calls. Both compile inline,
import-free JSX and install editable Motion Graphics into the Library; place
the returned plan separately with `add_motif`. When a source is too
large to send inline, a local MCP client may save it as a UTF-8 file and pass
that absolute path as `codePath` in place of `code`; the size limit and the
sandbox are unchanged. Do not embed photos or logos as `data:image` URIs to
get them into a graphic: bind Library images instead (below).

- Define `const Component = ({item}) => ...` and return a styled root `<div>`.
- Drive every visible value from `useCurrentFrame()` and the provided helpers:
  `useVideoConfig`, `useImage`, spring, interpolate, `interpolateColors`,
  `Easing`, `AbsoluteFill`, `Img`, `Surface`, `Canvas`, `Sequence`, `Series`, `Loop`,
  `Freeze`, `editable`, and seeded random. `AbsoluteFill` and default time-window
  wrappers are full-size flex columns, so center with `justifyContent` and
  `alignItems`. Never name a binding after a browser global (for example
  `const top` or `const self`); use names such as `topValue`.
- Follow the `sandboxed-surface-v1` subset: const bindings and pure expressions
  only, deterministic at any frame seek. A refusal lists every broken rule with
  line, column and fix; [source refusals](references/source-refusals.md) maps
  each rule to its fix.
- Time scenes inside one asset with `Sequence` and `Series` instead of
  hand-computed absolute frames. `<Sequence from={n} durationInFrames={d}>`
  shows its children only in `[n, n + d)`; `<Series>` places each
  `<Series.Sequence durationInFrames={d} offset={o}>` after the previous one
  (a negative offset overlaps, a positive one leaves a gap). Inside a window,
  `useCurrentFrame()` starts at 0 and `useVideoConfig().durationInFrames` is
  the window's own length. Put each scene in its own component and read the
  frame inside it; a frame read by the parent and passed down stays global.
  `track` keys follow the same clock.
  Frames are integers only; `playbackRate` and `trimBefore` are not
  supported. These windows exist only inside the asset; they are not
  Project sequences. Keep the `Series` total equal to the asset duration:
  scenes past the asset end are never shown, and frames after a shorter
  `Series` render without its scenes.
- Repeat a beat with `<Loop durationInFrames={d} times={n}>` instead of modulo
  math: its children restart at 0 every d frames, the loop stops after n
  iterations or at the end of its enclosing window, and `Loop.useLoop()` gives
  the current iteration. Hold a pose with `<Freeze frame={n}>`, which pins the
  enclosing local frame for its children; `active` is a boolean or a pure
  function of that frame, for example to hold the last frame of an entrance.
  Keep the scene `Series` outside any `Loop` or `Freeze`, or it is not mapped.
- Write one scene `Series` directly in `Component`'s returned JSX with integer
  `durationInFrames` and offset literals, and give each scene a `motionId` plus
  `durationInFrames={editable("scene-id", "durationInFrames", n)}` when it may
  be retimed. The receipt's `scene_map` (and `get_motif_source`
  `motion_graphic.scenes`) then lists every scene's start and duration,
  relative to that `Series`; `scene_map_note` explains a source it cannot map.
  A mapped `Series` that ends after the asset is refused. Pick each scene's
  entrance, middle, and exit frames from the map for verification.
- Use presentation HTML and SVG only. Do not create custom/active/embedded
  elements, handlers, refs, or raw HTML. `Img` accepts only a `#` fragment,
  self-contained `data:image`, or `motif:` URL; ordinary web/file/blob URLs are
  not media bindings. A Library image enters only through an image property
  binding. Keep output comfortably below 4,096 nodes and depth 64.
- For procedural geometry, use `<Surface commands={...} />`: groups,
  rect/circle/ellipse/line, polyline/polygon, path and text commands computed
  from `useCurrentFrame()` and props. For particles and glows, `<Canvas>` draws
  the same list as pixels ([canvas](references/canvas.md)). No canvas context,
  refs, draw callbacks or shaders exist.
- Put user-editable values in `item.props` and declare the matching
  properties entries. Keep layout constants inside the component.
- Give any rendered element that may need source-level repair a unique literal
  `motionId="element-id"`. Opt only deliberate scalar constants into safe
  write-back with `editable("element-id", "parameter", literal)`, where the
  third argument is a double-quoted string, finite number, or boolean literal.
  Name an element's position pair x and y so the canvas can drag it.
  The first two arguments and `motionId` must also be double-quoted literals;
  do not use expressions, templates, objects, arrays, or computed ids. Creation
  receipts and `get_motif_source.motion_graphic.elements` report the stable ids
  and editable values. At render time the identity becomes `data-motion-id`.
- Pass exactly one duration form. Prefer `durationInSeconds` for a user-stated
  wall-clock duration; use `durationInFrames` only for an explicitly
  frame-counted design. Pass the captured `projectId` as the stale-write guard.
- The receipt must say `status: "installed"`; retain its concrete asset_id
  for placement and verification.
- Place that asset with `add_motif`. Pass the receipt asset_id as motif_id,
  the captured playheadTimeUs as t_start_us, the receipt duration_in_frames as
  duration_in_frames, and the captured projectId as expected_project_id. Omit
  track_id for an isolated overlay track. The result reports `layer_id`,
  `track_id`, and the frame-resolved `t_start_us`/`t_end_us`; re-read that
  layer and verify its Motif id, start, and exact frame span before previewing.
- For graphics that react to sound, declare a property with `type: 'audio'`
  and read `useAudio()` (or `useAudio("key")`): `{active, level, onset, beat,
  bands}`, each 0..1, with 16 `bands` from 40 Hz to 16 kHz. Use `beat` for
  hits, `level` for breathing, and `bands` for spectrum bars. Bind each placed
  instance by passing `"audio-layer:<layerId>"` for that prop to `add_motif`
  or `update_motif_instance`; the host stores the media and offset playing
  under the instance at that moment, so bind again after moving the audio.
  Only normal-speed, forward layers bind. Unbound, `active` is false and every
  value is 0, so also verify one bound frame on a loud passage and one on a
  quiet passage.
- Product photos and logos: an image property, bound per placed instance
  with `"image:<mediaId>"` (see Pictures in motion-craft.md).
- Ready-made vector animations: a `lottie` property and `<Lottie>` (motion-craft.md).
- Split text, draw-on, path motion, morph: `SplitText`, `drawPath`, `followPath`, `morph`.
- When several assets of one piece share components (browser frame, cursor,
  easing helpers, brand colours), do not paste them into every source. On a
  local MCP connection keep them in a module (`create_motion_graphic_module`;
  first reuse one from `list_motion_graphic_modules`), pass its id in
  `modules` to the `*_from_code` tools, and use its declarations directly.
  Fix shared code once with `update_motion_graphic_module`: it republishes
  every asset that lists the module, so re-verify one frame of each.
- To land a graphic on a bar of the music rather than react to it, measure
  the song with `analyze_beat_grid` and place bar markers, then start each
  layer on its bar marker and time inner hits from the returned beat times.
  Confirm the first bar by ear when its confidence is low.

For a batch, pass required `projectId`, `batchId`, `targetStartFrame`,
`targetEndFrameExclusive`, `continuous`, `assets`, and `instances`. Every asset
must be at most 15 seconds on the project frame grid. At least two primary
instances are required; a continuous plan must cover the target range exactly.
The call prevalidates all sources and rolls the entire new Library batch back
if publication fails. For each returned `planned_instances` row, call
`add_motif` with the exact motif_id, t_start_us, duration_in_frames, props, and
project_id guard, plus the receipt `batch_id` and row `segment_id`. The batch
is complete only when every planned segment has a matching Timeline receipt.

Scene-to-scene transitions (fade, slide, wipe, and the rest of
`list_transition_presets`) are Timeline transitions between batch Motifs, never
CSS cross-fades inside one asset. Plan them in the batch `transitions` list
between consecutive primary segments with a `preset` or `kind`/`direction`
(the motion direction), an integer `durationInFrames`, and optional `timing`.
Instance frames are the final layout: the incoming segment starts exactly the
transition length before the previous one ends, so coverage is the scene total
minus the transition total, and each segment must outlast its incoming plus
outgoing transitions. Execute the receipt `placement_order` step by step: an
incoming segment's `t_start_us` is its outgoing neighbour's end, and the
`add_transition` call right after it (both layer ids plus that
`planned_transitions` row's `transition_args`, default overlap placement)
moves it left onto its planned start. Every planned transition needs a
matching receipt before the batch is complete. Keep logos, frames, or backgrounds
that must stay still across a transition in a separate overlay instance on its
own lane: the transition moves or blends the whole scene layer.

## Single or multi-Motif routing

Before deciding between one Motif and a batch (several beats, scenes, or more than 15 seconds of continuous animation), read [single or multi-Motif routing](references/motif-routing.md).

## Authoring workflow

1. Inspect the target composition, scene-plan beat, safe area, and target
   frames with `capture_canvas_frame`. Define purpose, placement, duration,
   settled layout, animation beats, editable properties, and the single/batch
   route. For a batch, finish the design map above before the first write.
2. For the JSX path above, use `create_motion_graphic_from_code` for a single
   asset or `create_motion_graphics_batch_from_code` once for the complete
   batch. Otherwise use `get_motif_source` on the closest working Motif. Preserve its document
   structure and adapt it instead of inventing an incompatible runtime.
3. HTML Motif path only: call `write_motif_draft` with a manifest object and
   HTML. Omit `from` for a new Motif; pass the existing id for an update.
4. Call `review_motion_graphic` on every returned JSX asset or HTML draft,
   again with non-default props for a reusable asset. Fix every finding and
   error, then timing and what the sheet shows (motion-craft.md, Review).
5. Follow the current connection's placement contract:
   - Public MCP HTML drafts: show the draft in the app preview and obtain the
     user's confirmation before `install_motif`. A preview PNG alone is not
     approval. After installation, use the returned installed Motif id with
     `add_motif`; an uninstalled public draft cannot be placed on the Timeline.
   - Embedded Agent HTML drafts may be placed with `add_motif` before
     publication for live Timeline review. Publish after the review in step 9.
   - JSX creation already installs its assets; place the returned installed id
     with `add_motif`.
6. After all placements, re-read the complete Timeline and call
   `verify_edit_result` with every exact layer/track/Motif-id/range check. For a
   single Motif, supply four distinct project-grid times for entrance, first
   settled state, middle, and last visible exit. For a batch, use the paged
   verification contract above. Inspect every returned composed PNG; require a
   machine pass and unchanged state hashes. An isolated
   `preview_motif_draft` image or success JSON does not prove placement.
   For each key move, also run the motion review in
   [motion craft](references/motion-craft.md) on consecutive composed frames.
7. If verification fails, diagnose one primary cause and repair the existing
   asset/layer in place:
   - Opted-in scalar source value: read `get_motif_source`, choose an exact
     element/parameter from `motion_graphic.elements`, then call
     `update_motion_graphic_literals` with the same assetId, captured projectId,
     current manifest version, and only the intended scalar edits. The host
     changes only the authored third literal, recompiles the complete source,
     bumps the version, rebinds placements, and keeps the last successful
     installed bytes if any check fails.
   - Scene timing fault in a mapped `Series`: edit that scene's
     `durationInFrames` literal with `update_motion_graphic_literals` and
     `resizeToScenes: true`, so the asset grows or shrinks by the same amount
     and later scenes keep their length. Placed layers that showed the whole
     asset, including those inside reusable sequences and Motion Clips,
     follow the new duration on their own timeline's frame grid in the same
     undoable edit (`fitted_layers`). Re-read the layers, and repair only
     those listed in `unfitted_layers` with `update_layer` in the timeline
     named by the entry's `sequence_id` (null is the root Timeline), when
     their range should change. A placed sequence instance keeps its own range.
     Scene markers placed with the layer move to the new scene starts in that
     edit (`synced_scene_markers`); fix any `unsynced_scene_markers` with
     `update_marker` or `remove_marker`.
   - Source, runtime, or internal-layout fault: read the current source with
     `get_motif_source`, then call `update_motion_graphic_from_code` with the
     same assetId, the captured projectId, the current manifest version as
     expectedVersion, and complete replacement JSX plus metadata. Preserve the
     requested dimensions, duration, and property schema unless the diagnosed
     fault requires a deliberate change. This path bumps the asset version,
     rebinds current placements, and rolls the publish back if rebinding fails.
   - Content/property fault: call `update_motif_instance` on the existing layer.
   - Position or scale fault: call `update_motif_instance` with only the needed
     transform fields on the existing layer.
   - Proven timeline-range fault: call `update_layer` and restore the captured
     start plus exact frame span.
   - Preview-readiness fault: probe the suspect local time with
     `preview_motif_draft`, then retry the composed capture before mutating.
   Never create a replacement Library asset, track, or layer as a repair
   shortcut, and never disturb verified sibling instances in a batch.
8. After each mutation, re-read the same asset/layer and repeat every stale
   `verify_edit_result` page with fresh frames. Older images are stale. Stop
   after three failed repair passes for the affected asset/instance and report
   the exact remaining evidence instead of claiming the batch complete.
9. Embedded HTML draft path only: ask the user to play and approve it, then
   call `install_motif`. Remove the trial layer unless the user wants it
   retained. Public HTML drafts were already approved and installed before
   placement in step 5; do not install them again.

## Runtime contract

- The HTML must call `motif.define({ setup, frame })`. `setup(props, ctx)` may
  build the DOM and apply property values. `frame(t, ctx)` must render the
  requested content time.
- Visible state must be a deterministic function of `t`; never accumulate
  transforms, particles, counters, or DOM nodes from the previous frame.
- Do not depend on wall-clock timers, random global state, remote scripts, or
  network assets. Use `ctx.random(stableKey)` when seeded variation is needed.
- Keep the page background transparent and size the design to the manifest's
  `[width, height]`. Use project-safe fonts and explicit overflow behavior.
- Expose meaningful controls through `props_schema` and keep decorative
  constants internal. Inspect a built-in source for the exact supported prop
  specification shape; unknown keys and invalid types are rejected.
- Design the settled frame first. Animation should reinforce hierarchy and
  comprehension, not hide weak layout.

## Visual language

Match the project typography, spacing, accent color, line weight, and corner
language. Avoid defaulting every graphic to a floating card, glass blur, or
gradient. Keep text readable at delivery size, use strong alignment, and keep
essential content inside safe areas. Verify both light and busy footage when
the overlay may appear over either.
