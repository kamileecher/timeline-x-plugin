# Camera, lens, and cut language for generated shots

Read this when writing the camera of a generated shot, planning adjacent shots
that must cut together, or choosing slow motion, ramps, or freezes. It names
moves and their reasons; the live catalog and the selected model still decide
what a route accepts, and nothing here authorizes generation.

## The camera line

Write each shot's camera as one line: move, seconds, speed, easing, target, for
example "dolly in, 4 s, slow, inertia, toward the open door". Use the same line
in the FilmManifest shot's camera movement and in the prompt. Speed words follow
the table in [motion craft](../../timeline-x-motion-graphics/references/motion-craft.md).
Give a shot one primary move plus at most one small secondary move, such as a
slight tilt or handheld drift. Give each move a motive: following, revealing,
tightening tension by moving closer, or releasing it by moving away. A locked
frame lets the subject or the light do the moving.

Easing words: linear for machines and tracking at walking pace; ease in for
gathering force and endings; ease out for an opening that must move from its
first frame; ease in-out for a deliberate, self-contained move; inertia, already
moving at the first frame and still moving at the cut, inside a sequence. The
opening shot never eases in.

## Moves

| Move | What happens | The viewer feels | Typical | Framing change |
| --- | --- | --- | --- | --- |
| Pan | rotates horizontally on a fixed point; nothing shifts in depth | searching, connecting two subjects | 3–6 s, slow or medium | from A to B |
| Tilt | rotates vertically on a fixed point | upward: scale and awe; downward: weight, finding something | 2–4 s, slow | base to top, or the reverse |
| Dolly in | moves the camera body closer, so depth shifts | closeness, pressure, significance | 3–6 s, slow | about one shot size tighter |
| Dolly out | moves the camera body back | loneliness, relief, the bigger picture | 3–6 s, slow | about one shot size looser |
| Zoom in or out | the lens narrows or widens while the camera stays put | watching, surveillance, a 1970s documentary eye; outward: detached context | 1–3 s, medium | tighter or wider, flat |
| Truck or tracking | slides sideways, often keeping pace with a walker | journey, companionship | 3–8 s at walking pace, linear | subject held, background streaming |
| Orbit or arc | circles while keeping the subject centred | examination, stature; quick orbits feel heroic | 4–8 s across 5–30 degrees | profile to three-quarter |
| Crane up | lifts while holding the subject | optimism, scale, revealing what lies beyond | 3–6 s, slow | eye level to high |
| Crane down | lowers toward the subject | landing, calm, heaviness | 3–6 s, slow | high to eye level |
| Dolly zoom | the camera travels one way while the lens zooms the other; the subject holds its size as the background stretches or shrinks | sudden realisation, unease | 2–4 s, slow; at most once | same subject size |
| Push to a detail | moves in on something off-centre and stops there | points the viewer at a clue or a feeling | 2–4 s, slow | medium shot to extreme close-up |
| Pull-back reveal | begins tight on a detail and widens to the whole | a twist, irony, sudden scale | 3–6 s | extreme close-up to wide |
| Fly-through | rushes forward through openings, leaning into turns | velocity, immersion | 2–6 s, fast | through openings |
| Handheld | slow, low-frequency sway, never per-frame jitter | being there, urgency, documentary honesty | the whole shot, subtle | carried by the main move |

Rare moves lose force when repeated: use a dolly zoom, freeze frame, smash cut,
or speed ramp at most once each. Neighbouring shots should vary their move,
size, or direction inside one consistent visual language.

In a generated clip, one short shot holds one move. State the opening framing,
the move, the closing framing, and what stays still. Never ask for a locked
camera and an orbit in the same shot. A model may not honour a whip, crash zoom,
or dolly zoom inside a clip; inspect opening, middle, and closing frames before
relying on it.

## Lens and focus

Choose shallow or deep focus per shot from what it must show: shallow for a
close single subject, deep where geography, a crowd, or readable text matters.
Lens character works when no single part is noticed: a soft focus fall-off,
oval bokeh for an anamorphic feel, faint colour fringing toward the edges, a
very slight barrel bend, and warm halation only around the brightest edges.

A FilmManifest shot also carries structured cinematic setup choices (camera
profile, lens profile, aperture, colour palette, and lighting presets) that the
compiled shot prompt includes. Read the live manifest write contract for the
exact fields. Leave them on auto unless the chosen direction needs one, and keep
them consistent within a scene.

- **Rack focus:** sharpness shifts from one depth to another over 0.5–1.5 s,
  ease in-out, carrying attention between two things.
- **Focus pull:** sharpness tracks a subject as it moves toward or away from
  the lens, for the whole move.

Both are directions in the prompt. A generated clip has no depth data, so focus
cannot be moved afterwards on the Timeline.

## Time

- Slow motion at 0.25–0.5 times, or a ramp that changes speed over 0.3–0.6 s,
  can be applied to the placed clip with `set_speed_ramp`. A clip slowed far
  below its frame rate judders; for smooth slow motion, generate or shoot the
  shot at a higher frame rate instead.
- A freeze frame of 0.5–2 s uses `insert_freeze_segment`.
- Time-lapse, 8–100 times faster, belongs in the prompt or the source material.

## Cuts between generated shots

Most joints should be plain cuts; designed transitions follow the rules in
[motion craft](../../timeline-x-motion-graphics/references/motion-craft.md).
Generated shots cut well only when both prompts plan the joint:

- **Cut inside motion:** both sides move in the same direction at about the
  same speed, the cut falls at the fastest moment rather than as the move
  settles, a zoom keeps its direction across the cut, and the subject and the
  eye's resting point land within about a tenth of the frame of each other.
- **Match cut:** a form, movement, or colour continues from one shot into the
  next; let the incoming shot settle over 0.3–0.6 s.
- **Whip pan:** 0.2–0.35 s; shot A ends and shot B begins with a fast pan in the
  same direction.
- **Smash cut:** the energy flips, and picture and sound switch together on one
  frame.
- **J-cut and L-cut:** the next shot's sound leads its picture by 0.3–1.5 s, or
  the previous shot's sound runs 0.5–2 s over the new picture.
- **Dissolve:** 0.4–1.5 s, for time passing or memory. Iris and wipes only when
  the style owns them; graphic transitions last 0.45–0.6 s.
- Keep each motion-blurred frame wholly within its own shot; no cut lands
  mid-smear.

Let the picture choose the joint: cut through something the eye is already on,
or have the incoming shot emerge from something that has just lit up. Timeline
transitions come from `list_transition_presets` and `add_transition`.

## One continuous shot

Use a single unbroken move when the piece stays in one place with one subject
and its tension comes from a shift in scale, a chase, or a reveal. Plan the move
as three or four beats (an opening wide, a follow, a close pass or push onto a
detail, then a pull away or reveal), with the camera passing through each
without halting. It convinces through genuine scale change, parallax where close
objects rush by and distant ones hardly move, something in the foreground
sweeping across the lens as the camera passes nearest, a speed ramp into that
pass, a focus shift as the subject meets the focal plane, and a little drift.
While its size changes, the subject stays anchored to a strong position in the
frame; any horizon tilt is a choice.

A generated clip is short, so a long continuous shot is several clips joined
invisibly: end and begin each clip on the same motion and hide the join behind a
whip, a foreground object, a push into darkness, or a pass through a surface.
A true single move through one built world is a 3D Studio camera path; see
[look, light, and camera in 3D Studio](../../timeline-x-3d-studio/references/look-light-camera.md).
