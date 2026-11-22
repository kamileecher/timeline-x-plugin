# Character motion and interactions

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
