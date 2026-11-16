# Look, light, materials, and camera in 3D Studio

Read this before lighting, texturing, framing, or finishing a 3D Studio scene
for render, and before showing its first still. Field names and ranges come
from the live schemas (`studio_engine_capabilities`, `studio_ai_context`, and
the edit tools); this guide chooses among them and adds no capability. Edits
still follow the main skill's read, validate, apply, and verify order.

## Avoid the dated-render look

Whole, mid-distance, evenly lit realism (a person, a building, a vehicle, a
room, a product) looks like a dated render no matter how much it is polished.
Show the same subject as a fragment or in macro, moving, with a convincing
surface and directional light, partly in shadow, or through an intentionally
stylised treatment. Faceted, untextured low-poly is that dated look itself, not
a style. Every visible surface needs material, every light a direction and
falloff, and every frame a separation between near and far.

Realistic faces and hands at close range are where native 3D fails, and
`studio_character_generate` makes stylised fixed-rig sculpted figures (face, hair, clothes, hands) only. Show people
as a stylised cast, silhouettes, figures at a distance, backs, or hands and
objects, or combine the render with filmed or generated footage on the
Timeline. Keep the user's subject: state the cost of a realistic route once and
help fully if they choose it. Keyframed root travel must match the observed
walk or run clip's stride, or the feet slide; as a sanity check, a walk covers
about 0.65 times the character's height per second and a run about 1.8 times.

The native material model is physically based. Toon banding, ink outlines, and
halftone are not native 3D shading, so a cel, paper, or ink look belongs to
another medium (Motion Graphics or generated stills) or to a Timeline treatment
after render. A stylised look is judged by its own craft, never by the realistic
standard below.

## The realistic-render standard

When the piece must read as real, hold every scene to this bar before showing
it, not only the opening one:

- **Material where it is seen.** No lit surface is flat: base colour, varied
  roughness, and a normal map; physical transmission, IOR, and clearcoat for
  glass, liquid, lacquer, and wet surfaces. Prefer scanned textures and HDRI the
  user supplies or may use, imported with `studio_surface_import` with their
  true origin and licence; there is no in-app texture search. Where darkness,
  fog, or silhouette hides surfaces, texture adds nothing; work on the light
  and the air instead.
- **Depth in every frame.** Near, middle, and far layers, the far one separated
  by value or colour. An outdoor view that reaches far carries thin aerial
  perspective even at a clear noon: low fog density in the sky's colour, so
  distance pales and cools. Thicker haze only when the story has weather.
- **Light with a cause.** One motivated key, sky or HDRI fill, soft shadows,
  ambient occlusion for contact, and warm bounce or coloured fill where the
  ground or walls would give it.
- **Film finish.** Keep tone mapping on: agx or aces for highlights that roll
  off, neutral when exact colours matter (brand, product, flat looks), none only
  for pixel-exact work. Bloom with a high threshold so only real light sources
  glow. Grain is not a render setting; add it on the Timeline after delivery,
  following the [finishing guide](../../timeline-x-effects-color/references/finishing-guide.md).
- **One material language** across the piece, with each scene built for itself.

Material and light are cheap. Render time grows with motion blur samples,
ambient occlusion, extra shadow-casting lights (keep one or two), and larger
shadow maps. Render the heaviest scene first; if a full video would be
impractical, name the costly setting and lower that one rather than the look.

## Light: from the word to the scene

Lights are light objects (directional, point, spot, or area) with colour,
intensity, target, and shadows; render settings hold exposure, ambient, sky,
environment, fog, shadows, and finishing. Use one light idea per scene with a
believable source. The words are in [look and light](../../timeline-x-image-generation/references/look-and-light.md).

| Light idea | Build |
| --- | --- |
| Sun key | a directional light matched to the sky's sun elevation and azimuth, shadows on |
| Backlight | the key behind the subject, low ambient, a little fog for a halo |
| Rim | a second light behind the subject, roughly opposite the key |
| Silhouette | ambient near zero, a bright sky or emissive background, nothing lighting the camera side |
| Split | the key at 90 degrees to the camera |
| 45-degree portrait key | the key 45 degrees to the side and 35–45 degrees up, low fill |
| Butterfly | a soft key from the camera side, 55–65 degrees up |
| High-key | high ambient or the built-in studio light, a bright ground, low contrast |
| Low-key | ambient near zero and one narrow spot holding the subject's key features |
| Golden hour | the sky's sun 5–15 degrees up, a warm orange key, cool ambient, long shadows |
| Blue hour | no direct sun, blue ambient, small warm point or area lights at windows and lamps |
| Practicals | point or area lights at the fixture, with the fixture's material emissive |
| Soft studio | the built-in studio light or an HDRI environment, with soft variance shadows |

Fog is one even density. Light shafts, volumetric beams, and height or ground
mist are not native; do not promise them, and keep fog low, because a thick even
haze reads as CG.

## Devices: where each helps and hurts

Each scene takes the devices that serve its light, subject, and distance; name
them per scene with the reason, and the ones left off.

| Device | Helps | Hurts |
| --- | --- | --- |
| One motivated key | shape, mood, and a sense of place | never skip it; a scene lit only by ambient looks like a maquette |
| Sky or HDRI fill | fill that agrees with the sky; believable reflections | interiors that could not see that sky |
| Soft shadows | objects sit on the ground; size reads | never skip them; crisp default shadows look synthetic |
| Ambient occlusion | weight in corners and beneath objects | wide aerial views and soft overcast, which turn grey |
| Rim or back light | shapes lift off the background | scenes meant to stay mysterious in darkness |
| Practicals | warmth and life inside the world | daylight, where they cannot read as lit |
| Fog for distance | far layers pale into air | small spaces and close objects |
| Particles (dust, snow, spray), where the schema offers them | visible air, life in a still shot | clean product or graphic shots |
| Varied roughness, normal detail | worn, real surfaces up close | normal detail far away, where it shimmers |
| Transmission, clearcoat | glass, liquid, lacquer, wet surfaces | opaque things |
| Wear and colour variation | worlds that feel used | toy-like, clay, or showroom-clean looks chosen on purpose |
| Seeded variation in instances | no two trees or rocks alike | nothing |
| Secondary motion, where the schema offers it | keeps held shots alive | moments that need stillness |
| Subtle handheld | a sense of being there | locked product or graphic shots |

## Finishing settings

- **Depth of field** applies to PNG and video output only, with one focus
  distance per scene. Focus on the subject; use a low f-stop for a close single
  subject and a high one for wides and anything with text. There is no animated
  rack focus; do not promise one.
- **Motion blur** averages subframes across a fraction of the frame (0.5 is a
  180-degree shutter), in PNG and video only. It covers the whole scene and
  multiplies render time by about the sample count, so it stays off by default
  and is the user's choice. When chosen, test the fastest range first; about six
  samples give a soft smear, eight suit whips and impacts. Inspect consecutive
  frames of the result: the smear should be continuous, without stutter or
  ghosted copies.
- **Bloom** threshold is display luminance; near 0.97 keeps glow on the sun and
  lamps only.
- **Saturation** applies after tone mapping; shape the palette rather than
  raising saturation globally.

## Camera

`studio_camera_edit` motion names follow the meanings and reasons in
[camera language](../../timeline-x-video-generation/references/camera-and-lens-language.md):

- Dolly moves the camera and zoom changes the field of view; choose by whether
  parallax should show.
- Whip pan and crash zoom move in the middle fifth of their interval and hold on
  either side; spend them where the story jumps.
- Handheld at a low amount gives presence; stronger shake is for an impact.
- A dolly zoom has no named move: author camera path keys whose position and
  field of view change in opposite directions, then check in rendered frames
  that the subject's size holds.
- A push to an off-centre detail is a path whose last key targets the detail.
- A cut blend moves the camera between cut cameras; it is not an image
  dissolve. Dissolves and speed ramps happen on the Timeline after delivery.
- Keep the horizon level unless roll is intended.

One continuous shot is one scene and one camera path whose three or four keys
are the beats, eased so the camera never stops on a key. Track a moving subject,
and place foreground objects to pass the lens at the closest moment. Over about
a minute, hide joins inside the move: a whip, a pass behind a foreground object,
or a push into darkness.

## A still before the video

Before `studio_video_start` for anything longer than a test, render the piece's
most important moment at final settings with `studio_render` and inspect the PNG:

- Surface test: describe in words the texture covering the biggest surface; if
  the honest answer is nothing, plain colour, or bare low-poly, add material
  before anything else.
- The scene has a light key, tone mapping, and the devices named for it; never
  show a scene that still looks like a maquette under flat ambient light.
- The one-second read, the squint test, the generic-image list, and the
  "another piece" test from [visual development](../../timeline-x-film-planning/references/visual-development.md).

Once approved, this still is the standard later scenes must match.
