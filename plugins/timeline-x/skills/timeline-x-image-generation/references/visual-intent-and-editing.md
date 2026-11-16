# Visual intent, revisions and transparency

Read this reference when a still has demanding layout, multiple references,
an existing image to revise, or a transparent background requirement.

## Convert the brief into a visual recipe

Start with the image's job: a story anchor, an explanatory insert, a product
view, a background, or an isolated overlay. Keep essential subjects visible in
the actual project crop. Place editable titles and precise facts in Text layers
unless the user specifically asks for typography inside the generated image.

Use the host's visual specification sections for known identity, outfit, pose,
camera, light, background, composition, materials and continuity details. Omit
unknown details. Do not infer ethnicity, precise age, hidden clothing or an
unseen product feature from a reference. A complete prompt should resolve
conflicts: a locked waist-up portrait and a full-body pose cannot both dominate
the same composition.

Resolve references to actual Library Images and inspect them before promising
a match. The current host recipe supports up to eight ordered reference images,
each with one advertised role and an instruction: identity, outfit, pose,
location, style, prop or continuity. A style image does not automatically
authorize copying a face; a pose image does not replace the character design.
The selected provider may support fewer inputs. Follow the host's returned
native reference order or supported model contract; never silently drop an
essential reference.

Example original direction: "Use the selected coat reference for material and
color; retain the approved character's face and hair; show the character holding
the already established brass key in the left hand, with the door behind them.
Leave clear space above the shoulder for the editable caption."

## Revise one result

Describe the intended change and the features that must survive it. "Warmer
light" should not replace the location, wardrobe, camera position or props.
Inspect the existing image rather than relying on its generation prompt. Reuse
its actual Image media id as the appropriate reference when the route supports
editing. A model that cannot accept the required input is a capability gap;
do not silently recreate the image from text and claim a faithful edit.

For an existing Timeline image, preserve its range, track and authored
properties through the image skill's replacement plan. A distinct creative
revision uses a stable new variation identity; reconnecting to a pending
candidate uses the original job and retained bytes. Review the result before
the host replaces the layer, then compare its composed frame with the baseline.

## Transparent overlays

State whether the background must be opaque, retained from the source, or
transparent. For edits, preserve source transparency unless the user requests
a change. A checkerboard drawn into RGB pixels is not transparency.

The shared host visual recipe carries intent; it does not advertise a universal
alpha-output switch. Request genuine transparent output only through a native
image tool or selected host model whose live contract supports it. Do not send
an invented background parameter. If the route lacks that support, report the
limitation before generation rather than promising a cutout.

Review edges, hair, glass and shadows against both light and dark backgrounds
when inspection supports that comparison. Confirm actual alpha with available
image metadata and inspect the placed overlay with `capture_canvas_frame`.
Visible edges alone do not prove an alpha channel. A later video delivery may
flatten transparency; route an export request to the export delivery skill and
verify the chosen format's actual output.
