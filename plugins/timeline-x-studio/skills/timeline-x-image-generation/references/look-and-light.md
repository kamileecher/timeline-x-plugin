# Look, light, and the generic-image check

Read this when choosing a look for stills, generated video, or a 3D Studio
scene, when the user names a style or supplies look references, and before
showing a style frame. It is vocabulary and judgment only: it adds no tool,
preset, or provider input, and it never authorizes generation.

## Start from a family, then make it this piece's own

A family is a starting vocabulary, not a template. Name the nearest one, then
change what the story and its references ask for. For a named style inside a
family, the names people use for looks, and a varied shortlist, read the
[style library](style-library.md). The deliverable sets the
aspect ratio; no family adds a letterbox by itself.

| Family | Defined by | Goes wrong when |
| --- | --- | --- |
| Cinematic realistic | a low, warm, directional key; highlights that roll off like film; restrained bloom, grain, and vignette | surfaces are spotless and the light is even |
| Cel or anime | two or three flat tones per surface, dark outlines, saturated daylight skies | soft photoreal shading creeps in |
| Pastel storybook | soft frontal light, lifted pastel colour, low contrast, few tones | form disappears because no shadow is left |
| Clay or stop motion | rough matte surfaces, a narrow miniature focus band, characters moving on twos | surfaces turn glossy and plastic |
| Paper cut or collage | layered flat shapes, thin edges, still paper fibre, a low drawing rate | the paper texture crawls from frame to frame |
| Retro neon or VHS | glowing neon shapes, strong glow, colour fringing, scanlines | glow and fringing smear faces and type |
| Glossy commercial | a bright sweeping light, low roughness, crisp highlights, clean colour | grain or halation dirties the product |
| Hand-made ink | paper tones, near monochrome, ink lines, halftone dots | photoreal light sits under a drawn surface |

Adjust in a fixed order, light first, then palette, materials, and finally
finish, changing only one of them per pass and comparing a frame after each.
Several changes at once hide which one helped. The approved style frame sets
the bar for every later frame.

## Build a look from references

When the user supplies look references (Library Images or files they own):

1. View them small and side by side, then read three things before writing:
   - palette: four or five colours ordered dark to light, accent last;
   - light: the key's side and height, whether shadow edges are hard or soft,
     the depth of the blacks, and whether highlights bloom;
   - finish: grain or clean, outlines or none, saturation, contrast, and any
     print or video texture.
2. Write those readings as words: the visual bible's style and palette lines in
   the film workflow, and each prompt's light, palette, and texture lines. Where
   the route supports it, a reference Image with the style role guides the look;
   it never supplies identity.
3. Set the first result beside the references, scaled to the same height, and
   correct one aspect per pass.

No tool measures palette or light from Library images. Read them by eye and
never present an estimate as a measurement.

Copyrighted film stills and artworks are mood references: study and describe
them, but never import them as Library items, pass them to a provider, or place
them in the piece. A named film, studio, or director stands for its visual
grammar (light, framing, colour logic, pacing), never its shots, characters,
sets, or titles.

## Light vocabulary

Give each scene one lighting idea, motivated by something plausible in its
world, such as sunlight, a window, a lamp, a screen, or flame. State it in the
prompt with its direction and hold it across that scene's shots.

| Light | Reads as | Ask for |
| --- | --- | --- |
| Backlight | arrival, longing | light from behind, an outline that glows, a little haze |
| Rim light | separation, product shine | a narrow highlight tracing the side away from the key |
| Silhouette | mystery, an iconic shape | a bright sky or background and no fill; the shape reads in black alone |
| Split | conflict, a double nature | hard side light leaving half the face dark |
| 45-degree portrait key | classic, serious | a key high and 45 degrees to the side, low fill, a small lit triangle on the shadow cheek |
| Butterfly | glamour, beauty | a soft key above the lens, a shadow tucked beneath nose and chin |
| High-key | clean, hopeful, clinical | bright, lifted shadows, little contrast |
| Low-key | tension, noir, luxury | mostly dark, one pool of light that holds the subject's key features |
| Golden hour | warmth, nostalgia, endings | the sun 5–15 degrees above the horizon, a warm key near 3,000 K, cool shadows, long shadow shapes |
| Blue hour | calm, melancholy | no direct sun, a deep blue sky, small warm practical lights |
| Practicals | life inside a space | visible lamps, windows, screens, or fire lighting the scene |
| Overcast | quiet, documentary | a broad soft sky, low contrast, soft shadows |

Lens and finish words, each only where the shot earns it: shallow focus with
bokeh from real lights behind the subject; a miniature focus band; long-exposure
light trails; a panning shot with a streaked background; a flare only from a
light in frame; black and white that separates subject and ground by value;
duotone; a teal-and-orange split that keeps skin natural; grain; a warm light
leak across a cut; a double exposure inside a silhouette. Several of these are
Timeline treatments after generation rather than prompt words; see the
[finishing guide](../../timeline-x-effects-color/references/finishing-guide.md).

Prompt words that ask for the average, such as "cinematic", "epic",
"stunning", or "hyper-detailed", carry little direction. Name the light, lens,
palette, and texture instead.

## Style serves the subject

Stylise the surroundings harder than the subject. Halftone, glitch, brushwork,
heavy grain, posterisation, and colour shifts belong in the background and on
secondary layers. The subject holds a clean outline, the features that identify
it (the outline of a landmark, the logo face of a product, the ears and head of
an animal), and the contrast that separates it from its surroundings. Shrink the frame
to about 96 px wide: a viewer should still name the subject. If the treatment
and the subject fight, reduce the treatment on the subject's layer first, and
only then rethink the look.

## The generic-image check

Generated and code-made pieces drift toward the same few choices, and viewers
now recognise them at once. In one survey of code-made films, more than half
barely used saturated colour: a near-white or charcoal background carrying one
small accent, most often orange-red or amber. Commit to a colour choice the
viewer actually notices: at the key moments, let a palette colour hold a real
share of the frame. A deliberately monochrome piece is the exception when the
plan records it. Habitual defaults to question: an unedited preset palette,
cream paired with terracotta, gradients in indigo or violet, slate navy, and
saturated interface blue. Build the palette from the piece's own world: its
place, material, era, and references.

Check the frame against this list when the style frame is made and again in
each review. Any item can be right when the idea asks for it; record the reason
in the visual bible's global rules or the plan and use it on purpose.

| Tell | Do instead |
| --- | --- |
| Purple-to-cyan gradient grounds | one dominant hue from the world and one accent with a job |
| Clouds of glowing particles | sparse particles that something causes: dust caught in a beam, rain, embers, pollen |
| Symmetry in every shot | one deliberate symmetric shot; elsewhere off-centre subjects and uneven spacing |
| Glow, bloom, or flares everywhere | glow only from a visible source; one flare, at the hero moment |
| RGB split or glitch on cuts | one glitch, at the moment the story itself breaks |
| Elastic, bouncy easing | easing chosen per subject; bounce only in playful work |
| Everything in slow motion | real time by default; slow only the moment that earns it |
| Bokeh discs with no lights behind | bokeh from real practicals behind the subject |
| A centred title on black as the opening | open on motion; place type inside the scene or bring it in once the opening has moved |
| Neighbouring shots that match | at every cut, vary two or more of shot size, angle, direction, and speed |
| A heavy teal-and-orange grade | a grade from the piece's own palette, saturation set per hue |
| Soft, formless noise nebulae and clouds | atmosphere with a light direction, layers in depth, and scale cues |
| Floating interface cards and glass panels | when the interface is the story, put it on a real screen in a hand or on a desk; otherwise show the real thing |
| Default fonts | a typeface chosen for era and tone |
| A camera drifting for no reason | a motivated move, and some shots that hold |
| Spotless, uniform surfaces | use the references for wear, uneven roughness, dust, and edge detail |
