# Terrain, appearance, physics and liquids

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
