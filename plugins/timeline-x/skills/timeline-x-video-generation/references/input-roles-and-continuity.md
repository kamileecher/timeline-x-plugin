# Input roles and shot continuity

Read this when choosing guidance inputs, preparing several related shots, or
transferring movement from a Library Video. The current catalog, model
capabilities and approved FilmManifest remain authoritative.

## Choose the smallest supported input contract

| Need | Input role | Verify before generation |
| --- | --- | --- |
| A new independent scene | Self-contained text direction | No identity or exact endpoint guarantee |
| Animate an established opening | First-frame Image | Image matches the required opening state and crop |
| Connect two approved states | First and last Image | Route supports both; endpoint change is physically coherent |
| Keep appearance or setting | Reference Images | Each actual image has a clear purpose; model supports the set |
| Preserve movement or camera | Motion Video plus appearance Images | Verified playable render; compatible route; no mixed first/last provider inputs |

Read `project://media` and use existing Library media ids. A still preview of
a legacy 3D source card is not a playable motion Video. Do not
invent paths, transport URLs, model support, or provider input limits. Verify
the selected route in the active catalog before adapting a prompt from another
model. Text references to an image cannot substitute for transmitting it.

## Direct one action per shot

Describe the initial state, the principal action, the camera's behavior and the
ending state. Keep events in their intended order and reduce simultaneous
actions that compete for a short clip's attention. Specify what stays still
when movement matters. Avoid a prompt that asks for a locked camera and a
moving orbit at the same time.

For an anchored shot, spend most direction on movement and temporal change:
"The actor turns toward the established doorway, lifts the key, and pauses;
the camera stays at the same height with a slow forward move. Keep the coat,
key hand and afternoon light from the supplied anchors." This describes
desired behavior; it does not guarantee exact intermediate timing.

For motion transfer, separate movement from appearance: which actor/camera
motion should survive, which wardrobe or environment should change, and which
appearance Image supplies each feature. Never call a generated finishing
candidate an approved film-shot replacement until the approved workflow binds
it. Prepare incompatible or overlong source Video as a separate authorized
derivative; preserve the original.

## Maintain continuity with observable state

### Speaking portraits

When the user prioritizes facial fidelity, select one approved original portrait
as the primary identity reference and identify its actual submitted image slot.
Use additional images of that same person for pose, wardrobe and framing; do not
average conflicting faces or use a visibly drifted generated frame as the identity
master. Describe motion videos as body/camera guidance only, excluding their
face, head proportions and mouth performance. Follow the provider's authorized
portrait-asset route when required; upload authorization is not an identity lock.

Ask for stable resting proportions: jaw width, chin, cheekbones, eye spacing,
nose, hairline and beard pattern. Preserve natural lip articulation and small
anatomical jaw rotation during speech instead of freezing the face or mouth.
Avoid exaggerated smiles, jaw widening, stretched cheeks and changing teeth.
Let the face settle back to its reference proportions during pauses. Do not
invent speech when the recipe is silent, or change authored action and camera
without the user's requested scope. A shorter motion guide must not truncate,
loop or rush a longer approved speech recording.

Review the reference alongside opening, speech peaks, pauses and closing frames.
Technical decoding and a contact sheet cannot certify voice similarity, exact
dialogue or frame-accurate lip sync. Mark those checks as pending unless actually
reviewed. These are generation instructions, not model training, fine-tuning or
a guaranteed face lock. Do not invent provider identity-strength parameters.

Record a compact per-shot ledger: reference identities, wardrobe, carried props,
handedness, pose, location geography, eyelines, screen direction, time, weather,
lighting and palette. Distinguish creative constants from the state that
changes through the action. The previous closing frame should support the next
opening state; using the same seed or repeated character text is not proof of
continuity.

If continuity depends on a previous result, generate and inspect that result
before its dependent shot. Reuse actual approved output references through the
FilmManifest contract. Changing an anchor or the shot's recipe invalidates the
relevant approval; do not edit generic queue controls around that gate.

Inspect opening, action peak and closing frames, plus the adjacent cut. Check
face/wardrobe/prop identity, camera geography, direction of movement, unwanted
text, crop and audio assumptions. A midpoint alone can miss endpoint drift.
Read actual media and layer delivery, not only provider completion. Keep known
jobs and original request identities for recovery; a creative new attempt is a
separate explicit decision.
