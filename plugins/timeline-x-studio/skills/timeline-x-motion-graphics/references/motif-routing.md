# Single or multi-Motif routing

## Single or multi-Motif routing

Route Motion Graphics work by semantic jobs, not by final output frames. A single
short title, callout, logo beat, countdown, lower third, intro, or outro may be
one Motif. Use a batch when the user asks for multiple Motifs/scenes, the brief
contains multiple content beats, or the requested continuous animation is more
than 15 seconds. An explicit user request for exactly one Motif or for a batch
wins over this default.

One exception keeps several beats in one Motif: tightly coupled beats that
share persistent elements (background, logo, frame) in one visual system and
together stay within 15 seconds. Time them with `Series`. Still use a batch
whenever beats must be moved or trimmed separately on the Timeline: scene
windows inside a Motif are not Timeline ranges. Scenes that need a transition
between them are separate batch Motifs joined by a planned Timeline transition;
a `Series` inside one asset has no transition primitive.

When voiceover, music, or captions only need to line up with the scenes of one
mapped `Series` Motif, place it with `add_motif` and `scene_markers: true`. In
the same undoable placement, one Timeline marker lands on each scene start the
layer shows (label: scene name, else its `motionId`, else "Sahne N"); the result
lists them with their `t_us` and any `skipped_scenes`. Align the other clips to
those marker times. The markers are linked to the layer: a later scene retime
or source edit moves them in its own rebind (`synced_scene_markers`), and
reports any it could not place (`unsynced_scene_markers`). Moving or trimming
the layer itself does not move them; re-place or `update_marker` after such an
edit. A Motif without a scene map rejects `scene_markers`.

Before any batch write, build a frame-accurate design map. For each planned
Timeline instance record its viewer job, exact half-open frame range, visible
content, overlay/full-frame role, settled/entrance/exit frames, asset-family
key, editable props, and target lane. Continuous full-frame animation must cover
the requested interval without gaps or overlaps. Sparse overlays may contain
deliberate gaps; never stretch a Motif across time where it has no editorial job.

Do not create one Motif per output frame: preview/export asks each
deterministic JSX Motif for its exact local frame. Split batches at meaningful scene or beat boundaries. Keep one local
motion contract at or below 15 seconds unless the same layout intentionally
holds or loops longer.

Reuse an asset only when viewer job, information structure, layout, and local
duration/motion contract all match. Put changing text, colors, values, images,
or videos in declared props and place multiple instances with different props.
Create another asset when the visual mechanism changes; shared typography and
color alone do not justify a mega-component.

For a batch lane, let the first `add_motif` call create a track, copy the
`track_id` from its result, and reuse it for later non-overlapping instances.
Add another track only for overlapping visual layers. Never create one track
per sequential beat.

Verify batches without mutating between pages: `verify_edit_result` takes at
most eight frame times, so page evidence across calls (entrance, settled,
middle and exit per motion contract, a settled frame per instance/background,
both sides of each continuous boundary), every page keeping the same state
hash. Use exhaustive `inspect_timeline_frames` only when the user asks for
frame-by-frame QA, until `progress.complete=true`.

Settled frames do not prove motion. Before accepting an entrance, exit,
overshoot, click ripple, or transition, inspect it with `capture_canvas_strip`
from the beat's first frame; stills miss overlap, popping and uneven easing.
