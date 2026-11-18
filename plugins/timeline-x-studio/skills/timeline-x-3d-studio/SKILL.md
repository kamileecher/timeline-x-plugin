---
name: timeline-x-3d-studio
description: Create and edit native executable 3D workflows, scenes, GLB assets, materials, lights, animation curves, live character collision, distance-driven gait and planted foot IK, character FK/IK, retargeting, facial/viseme animation, camera paths and frame cuts through the shared Project actor and render video into Library/Timeline and verify rendered frames. Use for independent 3D Builder requests.
---

# Native 3D Studio

Use the independent native Three.js Studio. Read the actual connected catalog; no Film Studio prerequisite. Read the current Project and create a checkpoint before editing existing user content. Build any scene, world or cast with two or more independent parts with parallel agents through `studio_build_start` by default (see the parallel build paragraph below), not as one large direct batch.

Before lighting, texturing, framing, or finishing a scene for render, read [look, light, and camera](references/look-light-camera.md). For a named look that 3D Studio carries (a glass product, a low-poly island, a tilt-shift town, a teardown, counted-object statistics, a white model), the image generation skill's style library gives its light, material and motion vocabulary.

1. Call `studio_read` on the saved Project. Carry its workspace binding and sources hash into every mutation. Resolve the requested document and its revision; never guess IDs. Call `studio_open` to focus the Studio window when useful.
   Call `studio_engine_capabilities` for the shared engine contract/hash, supported features and scene/runtime/cache limits. The viewport, Agent context and native/public MCP consume this same registry; tool visibility alone does not prove installed execution.
   Read capability_details for UI-only helpers, explicit MCP authoring routes, unsupported generators and prerequisites. Verify current assets and runtime separately; manual scene data support does not imply an automatic compiler.
2. For large scenes, use `studio_scene_inspect` to read summary/counts/capability gaps and bounded objects, appearance, transform-key, camera-key/cut pages. Follow next_offset; carry current workspace, collection hash and document revision. Large public Project reads explicitly omit studio_sources and return its hashes/document summaries in metadata; this is a read projection, never a scene deletion. For adding or patching objects/materials/lights/environment, prefer `studio_scene_validate` then `studio_scene_edit` with the same small delta request. Unmentioned animation, character and camera programs remain unchanged; object pages explicitly omit imported rig/clip programs. Validation is read-only and does not prove approval, render or persistence. Keyed transform channels still follow their animation. Never switch tools, transport, UI or files to evade denied/pending host approval; a host safety rejection is separate from native invalid_request, stale_revision, output_too_large or unsupported capability. Report the actual returned category and evidence.

   Use `studio_apply_operations` for scene creation, objects, keyframe animation, rename/layout, hierarchy, object visibility/locks, assets and surfaces. To edit an existing Scene, use set_scene with the full scene from `studio_read` (pass document_ids with that scene's id in large projects; a reply with sources_omitted carries no scene) and its document revision. Preserve existing objects, tracks, camera paths, cuts, materials and render settings. Add supported primitives/groups to `scene.objects`; animate their position/rotation/scale with ordered integer-frame `scene.tracks` keys containing the full transform. For a jumping primitive character, group the body parts and keyframe the group's vertical position. This is supported through set_scene even when no separately named object-create or keyframe tool appears. Imported GLB model animations use `model.clip`, speed and loop; Use the character tools below for imported skin joints. Import bounded offline GLB or self-contained glTF packages with `studio_asset_import`; inspect them with `studio_asset_list`. Use `studio_surface_import` and `studio_surface_list` for textures and HDRI. For ready-made props, vehicles, plants, HDRI skies and PBR ground/wall materials, search the CC0 Asset Library with `asset_library_search` (short English keywords, kind model/hdri/material) before modelling by hand, then `studio_library_asset_import`: a model returns asset_key for add_asset (check its real size in metres), an HDRI returns surface_key for render.environment, a material returns a ready material value with maps (set uv.repeat on large surfaces). Preserve existing content and declared origin/license. To swap the GLB of a placed model, send `studio_scene_edit` update_object with a `model` patch instead of resending the whole scene; it replaces that object's clip/character program and keeps its tracks and hierarchy. Once no scene or workflow references a superseded asset or surface, remove its catalog entry with unregister_asset or unregister_surface (the immutable file stays for backups); an in-use entry is rejected. Read the catalog's schemas rather than inventing fields or external URLs.
   For an authorized two-runner oval scene, use `studio_race_compile` after asset resolution and a fresh read. Supply observed generated locomotion bindings or explicitly inspected imported run/walk/foot bindings and strides, two speeds/start distances, bounded stadium dimensions/duration and overview/follow camera. It validates actual managed GLBs and emits a new-scene apply_request without mutation. Stage its operations with `studio_ai_plan` or use authorized `studio_apply_operations`, then reread and render. Existing documents stay untouched. Missing assets require authorized generation/import first; plan-only requests must not generate. Unequal lane lengths imply unequal lap times; no automatic winner/finish/stagger. Follow camera does not guarantee both runners stay visible.
   For a complete bounded race task, use `studio_run_start` with fresh workspace/source guards, a stable request key and strict recipe/existing-asset request. execute=false prepares an existing-asset review; missing recipes return assets_require_execute without generation. execute=true uses current edit authorization for generation, plan/apply/save, three actual renderer PNGs and optional full video into Library. `studio_run_get`/`studio_run_list` report compact stage checkpoints. Waiting/review is not completion; require completed, persisted and library_present and inspect actual frames/video. After restart use `studio_run_resume` with a fresh read and current authority; completion checkpoints and request-key delivery reconcile without duplicate scenes/media. Changed source hashes stop stale, never implicitly rebase. `studio_run_cancel` stops future stages without removing committed assets/scenes/media; started Library import cannot be cancelled. Timeline placement remains a separate authorized action. A saved execute intent never substitutes for fresh authority after restart.
   To combine or cut closed editable meshes (a window hole, a merged shape), call `studio_mesh_boolean` with dry_run true, then apply; the target keeps its object and the tool object is hidden.
   To sculpt an editable mesh, call `studio_sculpt_stroke` with one stroke (brush grab|smooth|inflate|push, object-local center, radius > 0, strength in (0, 1], direction for grab/push). Each stroke is one undo step. It is refused on objects owned by a geometry graph, terrain, roads and native skins.
   For procedural geometry, call `studio_geometry_graph_set` with the object id and a graph of nodes, links and an output node (kinds primitive, transform, merge, subdivide, set_material). Boolean nodes are not available in scene edits yet. While a graph owns an object, mesh edits and sculpt strokes are refused: send `graph: null` to release it.
   For editable organic meshes, inspect the connected mesh_edit schema before using transform_vertices, relax_vertices or unwrap_uv. Transform uses an explicit object-local pivot, positive scaling, then XYZ Euler rotation in degrees. Relaxation can shrink the surface; preserve open boundaries and hard edges when shaping anatomy. UV unwrap needs disk-shaped face patches or explicit seam edge pairs cutting a closed surface into disks. It packs only selected charts with circular boundaries; it is not minimum-stretch unwrapping. Keep a cage checkpoint before applying subdivision. These mesh operations do not create skin weights, a skeleton or a live modifier stack. If the connected catalog advertises native_mesh_skinning, use studio_scene_edit skin_edit to bind parent-first object-local bones and explicit or distance-based starter weights, or update selected vertex influences. Native FK/joint keys/poses use studio_character_edit with indices from the authored bones array. Unbind before geometry edits; UV/material/shading edits retain weights. When advertised, skin_edit set_deformation selects linear (default) or dual_quaternion. Dual quaternion reduces rotational collapse but can bulge; it is not an exact volume constraint. Use the same weights and pose when comparing. UI bone-weight colors are editor-only; smooth_weights averages selected cage-edge neighbors and can worsen bends. Native binding does not provide IK, morphs, locomotion or heat weighting. Verify topology, checker distortion, save/reopen and rendered results separately.

3. Use `studio_animation_edit` for atomic transform key upsert/removal/retiming and imported clip strips. Keys have optional outgoing linear/smooth/hold/Bezier time curves. Clip placement and fades use scene frames with an exclusive end; source trim uses seconds. Set clips explicitly replaces legacy clip selection. Loop repeats only the trimmed range; overlapping weights above one normalize, below one blend with the rest pose. Verify source clip names/durations in the loaded model; sample trim/loop/fade boundaries and arbitrary backward seeks. Character controls compose after clip sampling.
4. For an authorized stylized humanoid request with no suitable asset, call `studio_character_generate` with the observed sources hash/workspace and bounded recipe v1. It registers original fixed-rig GLB with Idle/Walk/Run; it does not create a scene/path or photorealistic human. Reread sources/hash, inspect joints/clips and place the observed asset. Generated models carry face morph targets MouthOpen, MouthWide, MouthRound, MouthClosed, BlinkLeft and BlinkRight, so `studio_dialogue_sync` lip-syncs them from Library audio and face keys can blink; older generated assets have none (regenerate to get them). Recipe is immutable GLB provenance. For a catalog model that has no skeleton (skins=0, no clips; typical of image-to-3D exports), use `studio_asset_rig` when the catalog advertises it: it registers a rigged copy and leaves the source alone. Send dry_run true first and read the fitted joints and warnings. Pick the skeleton kind from the body: humanoid for an upright two-legged figure in a T or A pose, quadruped for an animal standing on four feet, multiped for two to twelve feet on the ground (insects, spiders), winged for the same with wings spread clear of the body (birds, bats, dragons; adds Fly), chain for a limbless body (fish, snake; wave vertical for a whale or caterpillar). All add Idle/Walk/Run and locomotion hints sized to the model; a humanoid also gets Wave, Cheer, Point, Sit, Crouch and Jump as clips (use these instead of pose presets on a rigged model), a quadruped also Gallop. A warning names every joint that was a proportional guess, which you correct with skeleton.joints using the names the dry run returns. For anything else, including birds with folded wings, send your own parent-first bones in model space; those get no clips, so animate them with joint keys. Fingers, ears and wings are extra_bones under a named bone; a blink or brow is a region morph (center, radius, offset) that face and viseme channels then drive by the returned node/target; a region that follows the wrong bone is a weight_edit. detect mouth estimates a Jaw bone and a MouthOpen morph, and detect eyes estimates BlinkLeft and BlinkRight on a humanoid; each reports where it put them: render the morph at full weight and override by name if it is off. Nothing else is detected, so read coordinates from the dry run and a render. If nearby parts move together, raise resolution. To change a rig later, call the tool on the rigged asset with only the corrections: it derives again from the stored source and request (reset true starts over). Pass replace_in_scenes true to repoint every placed object and drop the superseded copy in the same step; otherwise patch the object with update_object. Verify a posed frame afterwards. There is no interactive weight painting. Call `studio_character_inspect` for the managed GLB's active-scene joint node indices, parents/rest transforms and face node/target indices; names are labels. Use `studio_character_edit` for atomic character batches or the character operation in `studio_apply_operations`. Joint position and XYZ rotation are sampled-clip offsets; joint limits constrain rest-relative XYZ rotation. Author ordered joint/face keys, save explicit FK/face pose snapshots, or apply poses statically (clears those channels' keys) or at a frame. IK requires three directly connected bones, positive uniform ancestor scales, model-local target/pole and weight, with optional keys. Retarget uses explicit one-to-one maps from a second scene model's frozen imported clip pose and model-space rest rotations; optional root motion has an explicit scale. It does not copy the source's character overrides or infer humanoid maps. Face channels require actual imported morph targets. Timed viseme envelopes have an exclusive end, bounded attack/release, add overlapping cue weights up to one and combine with the face layer by maximum. Use supplied verified cue timings; never infer phoneme alignment from words. Preview and render missing references/invalid chains explicitly fail. Rig controls do not edit skeleton topology or skin weights; pose snapshots do not bake IK. Preserve every other character channel when setting the complete program. When a model is too dense for the scene triangle budget or plays slowly, call `studio_asset_simplify` with dry_run true first, check the reported triangles, error and warnings, then apply it (optionally with replace_in_scenes); simplify before `studio_asset_rig` so the rig stays editable, and verify rendered frames afterwards. Add max_texture_size (for example 1024) when large textures make the file heavy; ratio 1 shrinks textures only.
5. Use `studio_camera_edit` for camera creation/framing, motion presets, components, path/key and cut batches. add_camera and apply_preset expose 15 framing presets; inspect target IDs, authoring frame and aspect first. current_view requires an observed view, shoulder shots two observed targets. Imported-model framing uses an authored unit proxy; verify and refine the rendered composition. motion exposes 24 editable camera paths with start/end frame, amount, turns and seed. Explicit replace is required for existing animation. Dolly changes position; zoom changes FOV. Push through translates camera and look-at for the full distance. Whip pan/crash zoom transition during the middle 20% of the frame interval and hold on either side. Moves do not promise collision avoidance, motion blur or automatic scene behavior. set_camera or a scene camera component patch updates FOV/target, optional roll degrees and optional tracking (object_id, local offset, follow). Bindings sample after final character/physics transforms; pan/tilt requires tracking cleared. Lens UI uses a documented 24 mm vertical gate; FOV remains canonical. Position is camera-local, target is world-space, FOV is in degrees. Keys are ordered integer frames within scene duration, with linear/smooth/hold outgoing interpolation. Camera transform tracks and camera paths cannot coexist: an explicit full scene edit can convert existing position keys while retaining them. Cuts begin at frame zero; the first is instant. Incoming blend interpolates camera world position, target, FOV and roll; it is camera movement, not an image dissolve. Transition windows cannot overlap the next cut or exceed duration. Read again after each successful batch; stale hashes/revisions require a fresh read, never blind retries.
6. Verify persisted=true, reread the actor-owned source and inspect boundary and midpoint frames via `studio_render`. Supply that document’s hash from the read response’s source hashes map and a unique request key for each source/options combination. Monitor and PNG capture share one renderer. Inspect the imported Library PNG; a receipt alone is not visual proof. Check undo/redo for reversible experiments and restore test edits when requested.
   Plan, scene validation, apply and render startup check managed GLB bytes/hash, active-scene bone and morph bindings, rest IK chains and actual clip timestamps. `studio_character_inspect` also returns observed clip durations. This preflight does not prove GPU readiness or animated-pose validity; inspect rendered frames. Interleaved animation timestamp accessors are explicitly unsupported.
   When an error includes studio_failure, follow its stage/state/recovery. A save failure with committed_memory means the edit already happened: reread and reconcile before retrying. A parse/preflight rejection with not_committed requires correcting the request. A render failure requires checking the current source and actual capture result. Never blindly replay a failed save.

7. For video, call `studio_video_start` with the saved document hash and workspace binding, an idempotent request key, the output size (omit width and height to use the open Project canvas size, which keeps renders matching the Timeline; pass both only for a deliberate custom size, even, 16 to 4096), scene-frame start and exclusive end (at least two frames). Scene FPS and source/surfaces are frozen. Choose H.264 MP4 or lossless PNG-in-MOV. A job stages every frame as a lossless PNG on disk, budgeted from free disk space minus a 4 GiB reserve (halved for lossless MOV); a detailed 1920x1080 frame stages near 3 MiB. A range that cannot fit fails as frame_budget, early when sampled frames project past the budget; its error_detail names a split size that fits, so free disk space or split the range into consecutive jobs. Poll `studio_video_get` or `studio_video_list` until completed and library_present=true; inspect actual video boundary/midpoint frames and duration. Jobs are serialized and durable for this owner/workspace. Use `studio_video_cancel` before Library import starts, and `studio_video_retry` for failures/interruption. Retrying uses the original snapshot and reconciles existing media. A completed job is a Library asset, not a Timeline layer. For authorized Timeline placement, read the Project again and use `studio_video_deliver` with sequence_id (null=root), track_id (null selects an available lane) and at_frame in composition FPS. Inspect composed playback/frame and persistence; placement shares actor undo/redo and identical placement reuses the layer. Rendering is silent; Timeline audio is handled by the existing timeline/export path.

8. For text-to-scene planning, call `studio_ai_context` to obtain the current sources, actual asset declarations and strict native capability/schema contract. Translate the user's request with the configured Agent model into ordered typed operations; preserve unmentioned existing content and resolve every model hash from the catalog. If no appropriate character exists, use the authorized stylized generator path first and reread before planning, or explain a primitive/group fallback. A plan-only request must not generate/register assets. Stage the original request, summary, operations and explicit unsupported requirements with `studio_ai_plan`. This replays production validation without changing Project. Use `studio_ai_list` and `studio_ai_get` to inspect or reopen the exact durable plan. For an authorized direct edit, call `studio_ai_apply` with its id/hash; a plan-only request must remain staged. Unsupported requirements block apply; stale sources require a fresh plan. Applying makes one actor history entry, saves and creates a verified local recovery backup. Reread, inspect actual frames and verify undo/redo; a provider response or plan receipt alone is not a created scene.

9. Use `studio_backup_create` and `studio_backup_list` for local Studio source/model/surface backups. `studio_backup_restore` requires a current source hash, verifies copies, repairs missing immutable assets and restores through one undoable actor operation; inspect frames after restore. These backups travel with the workspace folder and exclude Timeline/Library videos. Full-project archive remains a separate capability. There is no cloud-backup claim. Native rendering refuses bounded model/geometry/draw-call/joint budgets, releases closed or superseded loads, and rebuilds after WebGL context recovery. Installed release and public authenticated client acceptance require actual runtime evidence.

10. For executable workflow requests, call `studio_workflow_capabilities` for the
exact closed operators, typed ports, schema and limits. Create a workflow or
replace its saved graph through `studio_apply_operations`; disconnected drafts
are allowed, incompatible ports/cycles/references are not. Use a single terminal
render operator. Call `studio_workflow_start` with current collection hash,
workspace binding and unique request key; poll `studio_workflow_get` or
`studio_workflow_list`. This evaluates only dependencies, reports per-node cache
hits/progress and does not edit Project. `studio_workflow_cancel` stops pending
or ready work. Ready results require explicit authorized `studio_workflow_apply`
with the original sources hash; stale jobs require reevaluation. Check persisted,
reread the materialized scene and verify `studio_render` PNG or `studio_video_start`
video delivery using the existing scene tools. Apply is one undoable actor edit;
failed persistence may be retried without another edit. Graph intent and applied
scene survive restart; jobs/cache are session-only. This subset does not include
boolean/subdivision/sculpt, physics/cloth or arbitrary code.

Do not claim automatic speech-to-phoneme recognition, skeleton topology editing, unsupported operators or future phases from source edits. Timeline placement is a separate explicit action. The plugin exposes supported typed operations, never arbitrary code, unrestricted files, credentials or network access.

## Pauses, walking and looking (ADR 0165)

When the engine contract reports scene_retiming and acting_commands, stage blocking and
timing with `studio_scene_edit` instead of computing keys yourself:
- insert_time {at_frame, frames} opens a pause: every keyed channel (transforms, layers,
  camera paths, joint, face and IK keys) holds its value at at_frame, later keys, cuts,
  clip strips, visemes, attachments, grasps, dialogue lines and component start/stop
  frames move later, and the scene grows. Use it to make room for a spoken line. Strips
  spanning the pause keep looping, so place pauses while characters stand; spline motions
  and physics replays do not freeze.
- walk_to {object_id, to [x, z], start_frame, speed m/s, turn_frames} turns the actor in
  place and walks it there in a straight line, replacing keys inside that window. A
  locomotion character takes its gait from the distance; set its controller face_motion
  false so authored turns hold while it stands.
- face_to {object_id, target {object_id} or {point}, frame, turn_frames} turns in place.
- look_at {object_id, head_node, target, start_frame, end_frame, blend_frames, eye_height}
  turns the head joint (node from `studio_character_inspect`) toward the target and back.
These compile to ordinary keys in the actor, so preview, PNG and video match; there is
no path finding or obstacle avoidance (use `studio_interactions_compile` approach for that).

## Repeating motion (ADR 0177)

When the engine contract reports track_cycles, author one cycle of a walk, idle, bob,
swing or spin and let the engine repeat it; never write the same keys for every repeat:
- `studio_scene_edit` set_track takes cycle {start_frame, length_frames}. The keys from
  start_frame to start_frame + length_frames repeat every length_frames until the scene
  ends; keys before start_frame play once as a lead-in. The window needs at least two
  keys and no key may lie after it.
- Seam: without a key at start_frame + length_frames the last key eases into the next
  repeat's first key using the last key's curve, so keys 0, 10, 20, 30 with length 40
  loop smoothly. A key exactly at start_frame + length_frames ends each repeat on its
  own value and the next repeat starts from the first key: use it for full spins on an
  Euler track (0 to 360) or for a deliberate snap back.
- Each additive layer in set_track_layers may carry its own cycle, so a 20-frame body
  bob can ride on a 40-frame leg cycle, or on a base track that does not repeat.
- An omitted cycle keeps the stored one when keys are replaced; cycle null stops it.
  `studio_scene_inspect` section tracks reports the cycle of the track and its layers.
- A cycle only repeats, it does not travel: put the limbs on cycles and move the parent
  group with ordinary keys or walk_to. walk_to and face_to refuse a cycled track.
- insert_time before start_frame moves the cycle later with its keys; at or after
  start_frame the cycle keeps running through the pause, like a looping clip strip.

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

## Terrain, physical appearance, physics and interactions

Use a plane with terrain for seeded heightfield geometry and a group with
vegetation for procedural pine/broadleaf/grass instances. Imported GLB models
accept scatter with clip=null and no character/strip program. A rigged or morphed
model (a generated figure for a crowd) is baked into its bind pose, or into up to
four clip poses with scatter.poses [{clip, time}] that instances take in turn, and
scatter.face [x, z] turns every copy toward a point such as an arena centre
(ADR 0170). For a crowd, first reduce the figure with `studio_asset_simplify`
distant true and max_error 0.1-0.25 (a few hundred triangles each) and keep the
scene under the triangle budget. Referenced terrain and scatter
must share their coordinate space; linked scatter uses an identity transform and
no transform tracks. Seeded geometry and renderer budgets are enforced. Procedural
shapes alone do not establish photorealism: select observed detailed
plant GLBs, PBR texture maps and HDRI for that requirement. Material physical
supports transmission, thickness, IOR, clearcoat and attenuation; render settings
support sky and fog in the same preview/capture/video renderer.
For light shafts (ADR 0160) set render volumetric with density about 0.03-0.08 per
metre, anisotropy about 0.6 and intensity 1, and give the key directional or spot
light cast_shadow plus objects that cast shadows; shafts appear in rendered PNG and
video output and in the path-traced lane (ADR 0163), not in the editor view.
A plain box or sphere takes a volume component (ADR 0161) to become smoke or mist
(at most four per scene): density per metre (2-4 for thick smoke), noise and its
scale in metres, softness for the edges (a sphere with softness 0.6+ reads as a
puff), drift in m/s to make it roll or rise, and a color. Render output draws the
medium lit and shadowed by directional and spot lights, also over path-traced
frames; the editor shows a wireframe. Patch volume null to remove it.

For a cartoon or storyboard look (ADR 0168) set render toon: bands 2-6 flat
shade tones (3 is classic cel), outline_width ink lines in pixels at 1080 lines
(0 for none, 1.5-3 typical) and outline_color. All standard materials then shade
in flat bands in the editor and in output, and render output draws ink on
silhouettes and creases. Toon surfaces are lit only by direct lights and the
hemisphere ambient, not by an HDRI or the studio light, so give the scene a key
light and raise ambient_intensity for the shadow band; saturated base colors and
neutral tone mapping read best. The path-traced final lane refuses toon scenes.

For hand-drawn 2D in a 3D scene (storyboards, 2D characters on cards, effects
lines; ADR 0169) give a group a drawing component: layers with keyframes of
strokes, each stroke a list of [x, y, pressure] points in metres on the group's
local XY plane with a color, a width in metres and an optional fill. A keyframe
holds until the layer's next keyframe, so frame-by-frame animation is one
keyframe per drawing. Place, turn or parent the group to put the canvas in 3D.
A stroke may also carry an opacity. For in-between motion, author the key
poses as keyframes whose strokes are in the same order, so the editor can blend
them. Strokes are unlit and exact in colour, and combine with render toon for a
2D-in-3D look. To change strokes, send a drawing_edit entry to the scene edit tool with ops
(add_stroke with a spacing to thin dense points, erase, transform, style,
smooth, keyframe, inbetween, add_layer, update_layer) instead of resending the
whole drawing. A point may carry a fourth value, its local z, for strokes that
leave the canvas plane. A layer can follow an object or a model bone through its
parent (then its strokes are in that object's or bone's space), and can be lit
and cast shadows. Users draw them with the mouse or a pen in the viewport. Visible
drawings are refused by the path-traced final lane.

For a city, skyline or street grid, add one group with a city component
(ADR 0155) instead of hundreds of objects: seed, blocks_x/blocks_z, block_size,
street_width, sidewalk_width, lots_per_side, density, min/max_floors,
floor_height, style (massing, glass, concrete, mixed), traffic, street_lights,
an optional hero tower and excluded_blocks. It expands deterministically into
box-massing buildings with floor slabs, fins, setbacks and rooftop units,
sidewalks, lane markings, cars and street lights, centred on the group origin
with the street surface just above y=0. A city may expand to 120000 parts (240000 per scene); a
larger request is rejected with "studio_city: part budget exceeded", so lower
blocks, lots, density, floors or traffic. Parts are not individually editable:
change parameters with update_object, or leave excluded_blocks empty and place
hand-built objects there (block index is z*blocks_x+x). Split a large skyline
into several city groups (a dense core and a low-rise fringe) when one group is
too small. A city is not a collider, actor or interaction target.
For real-looking streets and buildings, import CC0 PBR maps with
studio_surface_import, upsert_material them into the scene library and set the
city's optional surfaces {facades: up to 4 material ids, roof, street, sidewalk}
(ADR 0162). Maps are laid in world metres: uv.repeat is tiles per metre (a facade
image showing 8 floors of 3.4 m wants repeat ≈ 1/27). Buildings pick facades by
hash. Raster lane only.

Parallel agent build is the default way to build a scene, world or cast with
two or more independent parts (arena, stands, crowd, city, props, characters,
lighting, cameras), even when the user does not ask for it (ADR 0157). Direct
`studio_scene_edit` / `studio_apply_operations` writes each carry
expected_revision, so concurrent direct writes reject each other as stale; do not
work around that by packing the whole build into one large batch. Keep direct
edits for a single small fix, and for planner touch-ups made while workers run,
re-read the revision first. When the client can start sub-agents, start one
worker per partition at once; otherwise use `studio_build_dispatch`, and only
if neither is available work the partitions yourself through
`studio_build_submit`. Give every worker the same written brief: exact world
coordinates and heights shared between partitions, id and material prefixes,
the object budget, and which tools to use for checking.
Read the document, plan up to 12 partitions with separate
areas, and call `studio_build_start` with the brief and partitions (id, label,
root_id, optional position, max_objects, depends_on, environment). Hand each
worker the build_id, its partition_id, the brief and its area. A worker
inspects the scene, then calls `studio_build_submit` with edits in the
studio_scene_edit grammar and state working, done or failed. It needs no hash
or revision, but every edit must stay under its root: new objects parented to
the root or a descendant group, updates and animation of its own objects,
material ids starting with partition_id plus an underscore, and
set_environment only for an environment partition. Edits wait until the
partitions named in depends_on report done. Follow progress with
`studio_build_get`. When workers report done, call `studio_build_review`: it
returns the camera frame, a flat colour partition map from the same camera, a
top-down partition map and per-partition findings (empty, not_in_camera,
barely_in_camera, below_ground, collides with sample world positions). Look at
the images against the brief, then send partitions that need changes back with
`studio_build_feedback` and a concrete note (what, where, how much). The
worker sees state revise and the note in `studio_build_get`, fixes it and
reports done; review again until it holds, then `studio_build_finish`.
Workers may also send camera_edits, character_edits and animation_edits for
their own objects in the same submission (camera cuts only for an environment
partition). Give partitions a ground area when they share space and an
assignee when one worker owns them. Workers take partitions with
`studio_build_claim`, coordinate with `studio_build_message` and wait for
changes or dependencies with `studio_build_wait` instead of polling. Hand a
stalled or failed partition to another worker with `studio_build_assign`. To
use the app's own Agents as workers, call `studio_build_dispatch` with a
provider per partition (one provider works one partition at a time; the rest
queue); it needs Agent orchestration on in Settings.
Builds are not saved and do not survive a restart; committed edits are.

Optional vegetation/scatter distribution owns max_slope_degrees, min_elevation,
max_elevation and a bounded density mask (resolution 2–32, row-major values 0–1).
Candidate count is an upper bound; slope, mask, terrain bounds and excluded_instances
can reduce actual placement. Never renumber survivors. Use `studio_scene_inspect`
sections instances and colliders with object_id and bounded pagination for actual
candidate indices/stable identities and optional cylinder proxies. Collider pages
are passive spatial evidence, not proof of active physics. Section ground requires
terrain object_id and x/z in terrain-local coordinates; null means outside its
domain. Mesh, placement and physics inputs share one Float32 triangle grid.
Streaming owns chunk_size, lod_distance and visible_distance, at most 128 chunks
per object. Resident instance buffers are released on eviction; saved camera poses
drive monitor/PNG/video consistently. Procedural plants have reduced far geometry;
imported static GLBs retain full geometry and only use chunk residency.

For roads, add a plane with the optional road component: observed terrain_id,
width 0.5–20, offset 0.01–1, samples_per_span 4–32 and 2–32 terrain-local x/z
control points. Road identity transform and same-parent static unit terrain are
required; out-of-bounds spline edges reject the edit. Edit with the existing
scene delta tools; the shared renderer samples both edges on the terrain mesh.
For a static route, use `studio_scene_inspect` section route, object_id=terrain
and the advertised route schema (terrain-local endpoints, cell_size, radius,
max_slope_degrees, height_offset and explicit blocked_ids). This read-only grid
planner returns world-space waypoints, physics_active=false, visited/grid counts;
it supports only static root box/sphere/cylinder blockers and rejects unsupported
or animated geometry. Budgets: 16384 cells, 64 blockers, 256 waypoints. Validate
and apply a set_track delta with full transforms and explicit replace flag to
bake root movement; retain rotation/scale and every unrelated channel. Ground
heights are waypoint samples, not foot IK or a collision controller. Use observed
walk clips separately for gait. Navmesh and world-origin rebasing remain unavailable; reduce dense models with `studio_asset_simplify`.
The bounded live character controller is a separate optional character program below.
Road strips have no separate physics collider; use the underlying heightfield or
separately authored fixed proxies. Do not submit road geometry as a unit plane
rigid-body collider or bind character actions to it.

Call `studio_physics_preview` for read-only native Rapier simulation. It accepts
root rigid bodies, gravity, mass, friction, restitution, damping, linear/angular
velocity, fixed colliders and fixed unrotated heightfield terrain. Groups/models
need explicit box/sphere/cylinder/capsule proxies. Use `studio_physics_bake` only
within authorized edit scope; it rechecks guards after compute and stores dynamic
transform tracks through the actor. Existing tracks require an explicit replacement
flag. Playback and export then use the same baked keys, including backward seek.
Bounds: 16 dynamic bodies, 64 colliders, 480 frames, 1-8 fixed substeps. Cloth,
soft bodies and articulated joints are absent from this offline baker; liquids use
the separate fluid component below.
Plain planes take a separate cloth component (Verlet, replayed from its start
frame, ADR 0156). Its pin field picks the points that follow the plane: top edge
(default cape or flag), top corners (banner), left edge (curtain) or none (a
sheet released from its rest pose). For a tablecloth, hold a scaled plane flat
above the table with pin none, a grid of about 24 by 24, a floor at the ground
height, friction around 0.5, bend about 0.05 and the table box as a collider;
turn on self-collision when the sheet folds onto itself. Check the drape in a
rendered frame after the settle time.
For cloth on a character (a cape, a skirt, a sheet over someone), set the cloth's
body_id to the rigged model or skinned mesh (ADR 0174): its skeleton becomes up to
24 capsules fitted to its skin at the cloth's start frame that follow its animation,
locomotion and ragdoll. Raise body_scale (0.5-2, such as 1.1) when skin shows
through; parent or attach the cloth to the character so its pins move with it.
Cloth never collides with an unrigged imported model; use primitive colliders.
For realistic fabric set mass in kg/m² (ADR 0179; silk about 0.05, cotton 0.15,
denim 0.4, canvas 0.6): the air then pushes on every triangle, a dropped sheet
floats down instead of falling like a stone, and wind becomes the air speed in
m/s (a breeze 3-6, a gale 15) instead of an acceleration. Raise iterations (20-30)
when cloth stretches like rubber, substeps (8-16) when fast motion explodes or
passes through colliders, and thickness (such as 0.02-0.03) when it clips into a
body. Planes take grids up to 96 by 96 and meshes up to 16384 vertices; large
cloth costs tens of milliseconds per frame on its first pass.
To dress a character, use the add_garment scene edit (ADR 0180) instead of
modelling cloth: object_id, body_id of the rigged model, garment {type skirt,
tunic or cape, height in metres, optional length and ease}, optional color. It
places curved panels around a figure standing at its origin facing +Z, sews them
shut, collides them with the body and pins the waistband or cape top to the
nearest bone. Render about one second in to check the settled fit; raise
body_scale on the new cloth when skin shows through, or ease when seams gape.
Hand-made patterns can use cloth seams ([[a, b], ...] vertex pairs) and
pin_follow body directly.
Any editable mesh up to 4096 vertices also takes cloth (ADR 0164): its vertices
are the particles, the pin band is measured on the mesh, pin_vertices pins exact
vertex indices, grid does not apply, and tear (a stretch ratio such as 1.15 with
a soft stiffness) rips faces off where edges overstretch.
A rigged model object takes a ragdoll component (ADR 0158): from its start
frame the skeleton goes limp and falls from the pose it has there, as capsules
per bone with joint limits, replayed with physics. Give it a push velocity in
m/s for a hit, a tone between 0 (limp) and about 0.3 (stiff) and up to eight
sphere, cylinder or box colliders to land on besides the ground and terrain.
Remove it by patching the object with ragdoll null. Check a rendered frame about
two seconds after the start; limbs do not collide with each other and the body
does not push dynamic props.
Live character capsules use the optional locomotion program below.
Never switch tools to evade a host denial or pending review.

For enter/talk/drink requests, call `studio_actions_compile` using observed actor,
head, mouth and root primitive or grouped cup bindings. Group a multipart cup
before compiling so its body, rim and handle move together. Keep the cup outside
the actor hierarchy. The compiler resolves walk/head motion before mouth sampling,
tilts toward the mouth and restores the authored end pose. It returns edits and dialogue
cues without applying or producing speech. Validate then apply through the ordinary
scene/AI-plan actor path when authorized. Walk needs explicit waypoints; use
observed imported walk clips and existing character tools for skeletal locomotion.
Talk generates head gestures; for spoken audio and lip sync use `studio_dialogue_sync`
(below), and drinking hand grasp/liquid simulation require separate capabilities. Report these limitations
with the plan; inspect entry, interaction and final frames after applying.
Check the live engine contract before planning. When timed_prop_attachment and
object_target_ik are present, use the explicit bindings below. Autonomous activity remains
unsupported; liquids use the fluid component.

Spoken dialogue: put the voice line in the Library first (`synthesize_speech`,
`produce_dialogue` or an imported recording). The speaker needs a mouth target; for a
rigged import run `studio_asset_rig` with detect mouth first. Call `studio_dialogue_sync`
with dry_run true, check method, words, visemes and warnings, then apply. auto uses
recognised words when WhisperX is installed, otherwise loudness. One line id owns its
visemes; send the same id to replace it and remove true to delete it. Rendering stays
silent and the viewport plays no audio: render the video, then `studio_video_deliver`
places each overlapping line as dialogue-role audio aligned to the delivered frames.
Inspect mid-word frames for open mouths; spelling-based shapes are an approximation. A registered tool alone does not prove these capabilities.

## Liquids

When the engine contract reports physics_fluids, pour, fill, spill or splash a
small amount of liquid with `studio_scene_edit` update_object fluid on an
unlocked root group (add an empty group first). The group transform places the
emitter: a volume box filled at start_frame, or an inlet disc pouring along the
group's local -Y (rotate the group to aim it). Colliders are root boxes,
spheres or cylinders: mode container keeps liquid inside an open-top box or
cylinder's walls (wall in metres; a cup or basin), solid keeps it out (a table,
a step). Build visible containers so they match: thin box walls in solid mode,
or a mesh-edited cup on the container primitive.
Size it before applying: a volume emits floor(size / (2 x particle_radius)) per
axis; an inlet emits rate x seconds. That count must not exceed max_particles,
and a scene holds at most 4 fluids, 40000 particles and 96 MiB of frames. Keep
particle_radius between 0.01 and 0.03 m for cups and sinks. Dynamic bodies or
live characters cannot be colliders, and colliders are one-way. To float, sink
or bob an object, list it in fluid bodies [{id, density}] (an unkeyed,
non-physical root box, sphere or cylinder; density kg/m3, water 1000: a wooden
toy 500, a stone 2500); the bake drives its pose, so never key it. For spray
and foam set fluid whitewater {amount 0-1, color}; it never re-bakes. Finished
bakes persist across reopenings. After applying, seek and read viewport metrics fluids: done,
baked_frames and bounds; a frame that is not yet baked shows no liquid in the
viewport, while PNG and video wait for the bake. By default liquid renders as
droplet spheres; set fluid look "surface" for one smooth liquid surface per frame
(slower to draw, never re-bakes), which the path-traced final lane also accepts.
Bodies of one fluid collide with each other; bodies of different fluids do not.
Do not promise oceans, rivers, rain or smoke.

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

## Automatic hand grasp and physical release

When the engine contract reports automatic_hand_grasp, a character can hold a
prop without authored attachments. Inspect the rig first; fingers must be real
joints below the hand. With `studio_character_edit`: upsert_hand binds an arm IK
chain (no object_target) whose end joint is the hand, a hand-local palm
direction and fingers {joints proximal to distal, joint-local curl axis,
max_curl, tip in the last joint}. Then upsert_grasp {hand_id, object_id,
start_frame, end_frame, reach_frames, release}. The prop must be an unlocked
root object not attached during that interval; give radius when it is not a
box, sphere or cylinder. The engine reaches during reach_frames, turns the palm
to the prop, curls each finger until its tip touches, carries the prop with the
pose at the end of the reach, and releases at end_frame.
release "authored" returns the prop to its authored transform. release
"physics" needs physics mode dynamic on the prop: it stays where authored until
grabbed, and at end_frame flies with the hand's velocity in the live rigid-body
replay, so animate the arm through the release for a throw and keep it still
for a drop. A physics release must be the prop's only grasp.
Verify with viewport metrics: grasp_contacts[actor] gives phase, reach error and
per-finger curl and contact. A large reach error means the prop is out of the
arm's reach; contact false on every finger means the curl axis or tip is wrong
for this rig. Wrong palm or curl directions look like a hand bending backwards:
flip the axis rather than raising max_curl. Do not describe this as a physical
grip simulation: contact is geometric fingertip contact only.

## Interaction sequences

When the engine contract reports typed_interaction_sequences, prefer
`studio_interactions_compile` for approach, open, sit, pick up, drink and put
down. First author explicit affordances with `studio_scene_edit` update_object
affordances: handle {grip, stand, open.rotation} on the hinge object, seat
{seat, stand, facing}, pickup {grip} on the root prop, rest {position, rotation}
on the surface. Vectors are object-local and include the object's scale; an
empty list clears them. Never guess them: read the scene and place them from
observed sizes. Hand steps need one existing direct two-bone IK chain without
object_target and observed shoulder, carry and reach from
`studio_character_inspect`.
The compiler is read-only. Read steps[]: only "compiled" steps produced edits.
"failed" carries a fixed reason (out_of_reach: move the stand point or raise
reach only if the rig really reaches; no_path / stand_blocked: move the stand
point or the obstacle; insufficient_time: give the walk more frames;
track_exists: pass replace_tracks only when replacing is intended). With
on_failure "stop" later steps are "skipped". interrupt_frame cancels
unfinished steps, stops a walk where it is and leaves a held prop in the hand.
Apply the returned edits unchanged through `studio_scene_validate` then
`studio_scene_edit`, reread, and inspect arrival, contact, carry and release
frames; check hand_contacts and attached_props in viewport metrics.
dialogue_cues are text with audio "none". Never describe them as spoken or
audible; voice them with speech tools and `studio_dialogue_sync`. The planner follows the authored
root track and static primitives only, so verify a locomotion character against
its live capsule. Sitting needs a keyed (non-locomotion) actor.

## Timed prop attachment and hand reach

Read the current engine contract and observed scene/rig metadata. Use
`studio_scene_edit` update_object attachments for an unlocked root prop: explicit
id, target_id, optional observed target_node, start_frame, exclusive end_frame and
target-local offset position/XYZ rotation. Empty attachments clears bindings.
Preserve unmentioned fields; validate with `studio_scene_validate` before apply.
The prop keeps authored scale; outside the interval normal authored tracks resume.
It cannot also be a physics collider/body, terrain/scatter or a character model.
Bone targets require a registered skinned asset and actual loaded bone indices.

For imported direct two-bone hand chains, `studio_character_edit` set_character
accepts optional IK object_target {object_id,start_frame,end_frame}. Target/key
vectors become object-local grip points; pole stays character-local. Preserve all
other character channels. Arm reach respects weights, lengths and joint limits;
it does not infer wrist orientation, fingers or a grasp. Read hand_contacts.error
in viewport metrics when checking reach. Object-target IK is inactive outside its
interval. A root-carried prop can drive the arm; a prop following that same arm
would create a dependency cycle and is rejected. Choose one direction explicitly.

Verify entry, pickup, mid-action and release frames in forward/backward seek,
undo/redo, save/reopen, PNG and video. Detachment resumes authored motion; it does
not release a dynamic body or generate an impulse. Do not present these bindings
as autonomous approach/pickup/drink/place activity planning.

## Jumps, pushes, knockback and crushing

When the engine contract reports character_jump and character_reactions, extend
the same locomotion value through `studio_character_edit` set_character. jumps is
a list of {frame,height} with increasing frames; a jump launches only a grounded
character and authored X/Z travel continues in the air, so place the jump a few
frames before the obstacle and check the apex against its height. jump_clip is an
observed one-shot clip. reactions {push,knockback,recovery,crush} is opt-in:
without it moving platforms do not clear the capsule and dynamic bodies never
displace it. Bodies must already be in controller.collider_ids. crush "flatten"
permanently stops and flattens the character; "event" only reports.
Read viewport metrics after seeking: locomotion_events lists jump, jump_missed,
fall, land, pushed, crushed and knockback up to the displayed frame, and
character_poses carries state, air_time and air_weight. A jump_missed event means
the character was not grounded at that frame; move the jump rather than raising
its height. Events are derived by replay and are not stored in the scene. There
is no ragdoll, vertical knockback, character-to-character knockback or automatic
platform avoidance.

## Live character gait and planted feet

Use the existing `studio_character_edit` set_character operation with optional
locomotion after inspecting the actual registered skinned asset and clip names.
Preserve other channels. Required root_node is the observed skeleton root;
walk owns an imported clip and metres per full cycle. Optional idle/run select
observed clips; run adds stride and speed threshold. Do not invent a rig or gait
clip for a primitive character. Clear legacy model.clip/strips and retarget first;
locomotion is exclusive with them. The model must be an upright, unit-scale scene
root. Root X/Z track deltas request travel; after frame zero gravity controls Y.
Start the capsule clear of obstacles. Its height/radius/offset, step height/width,
maximum slope, snap distance and gravity are explicit metre/second settings.
controller.collider_ids accepts fixed or constant-scale keyed root primitives,
explicit dynamic primitives, and fixed unrotated unit-scale terrain. Imported
mesh colliders and active vegetation proxies are unavailable here. collide_characters enables conservative
capsule contacts with other enabled characters; face_motion turns +Z forward.

Optional feet maps observed left/right root/mid/end direct bone chains (plus
feet.extra for further legs, each with the stride phase 0-1 at which it plants) and
model-local bend poles, plus world-metre sole_height/max_correction and weight.
They must lie below root_node and may not overlap manual IK. Grounded stance
anchors, limited pelvis lowering and swing-foot clearance use the same collision
surfaces; unreachable targets retain rig/limit constraints. Verify both feet and
stair/slope transitions, actual bone motion, stop/turn and backward seeks.
The disposable shared renderer solves at fixed 60 Hz, reads bounded immutable
pose replay on backward seek and samples gait by collision-adjusted travel.
Limits are 32 characters, 15 distinct collider-selection/character-collision
profiles (shared across characters), 32 dynamic bodies, 64 collision body IDs, 18,000 steps
and a combined 64 MiB pose cache. These ceilings are not a frame-rate guarantee.
Use `studio_scene_edit` update_object physics to select fixed, kinematic or
dynamic body mode; physics:null clears the explicit configuration. A primitive
selected in collider_ids still participates as a fixed/keyed controller proxy. Kinematic bodies use constant-scale
transform keys and carry standing characters, including platform-relative foot
anchors. Dynamic solid primitives use mass, friction, restitution, gravity,
damping and initial linear/angular velocities; they cannot also have transform
tracks. Add a body to the character collision list to enable pushing. Physics
also runs without characters. Check platform ascent/rotation, prop contacts and
arbitrary backward seeks. Cloth pinned to bones, sewn garments, soft bodies, mesh colliders and
crushing/knockback character responses are not implemented. Require engine contract agreement, persisted actor reread and real
PNG/video frame comparisons; tool visibility alone does not prove installation.
