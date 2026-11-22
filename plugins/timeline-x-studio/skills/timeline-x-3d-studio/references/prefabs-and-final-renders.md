# Prefabs and final renders

## Prefab snapshot instances

Use the instantiate_prefab operation in `studio_apply_operations` with observed
destination/template document revisions, the collection hash, a root-level
group/model/primitive root, a fresh instance_id and placement transform. Both
scenes must have the same FPS. The actor clones the bounded subtree, remaps its
object/material/animation/rig/camera references and records stable prefab lineage.
External terrain or retarget bindings are rejected. Instances are independent
snapshots; later template edits do not propagate automatically. Repeating a
committed instance ID is rejected. Reread after save, verify independent poses and
undo/reopen. Transform, timing and hierarchy edits retain unchanged GPU resources;
GLB templates share immutable geometry/images with independent skeletons/materials.
Caches are bounded session data and are never persisted as Project authority.

## Path-traced final renders

When the engine contract reports path_traced_final_lane, `studio_render` and
`studio_video_start` accept render_mode "final_path_traced" with samples
(16-512 for a still, 16-128 per video frame, default 64). Use it only when the
user asks for a final, physically lit or path-traced output: it costs seconds
per frame and a video multiplies that by its frame count. Everything else,
including checks while authoring, stays on the default raster lane; never
switch lanes inside one deliverable and never present one lane's image as the
other's.
The lane refuses instead of approximating. On `studio_final: unsupported_scene
(...)` remove the listed features (fluids with the droplet look — set
fluid look "surface" to trace them) or render raster; do not retry unchanged.
Bloom, saturation and motion blur apply to traced frames as in the raster lane;
motion blur splits the samples across its subframes, so raise samples with it.
webgpu_unavailable and lane_disabled are device conditions: report them and
offer raster, do not change the setting yourself. time_budget_exceeded: lower
samples or the output size. Frames are denoised by default (Open Image Denoise):
about 32 samples denoised look as clean as 128 raw, so prefer 32-64 samples for
video; pass denoise false only when the user wants the raw trace. denoise_failed
is reported, never replaced by a noisy image. Shadows are always traced and ambient occlusion
comes from the tracer, so the image differs from raster by design; a solid
background keeps its authored colour. Depth of field is traced through a physical
lens (focus_distance in metres, f_stop), so its blur is physical and differs from
the raster preview; fog fogs surfaces by view depth like the raster lane but does
not scatter light. Particle emitters (smoke, fire, dust, sparks) are drawn over the
trace as in the raster lane: they do not light the scene. Repeated renders match
only on the same device.
