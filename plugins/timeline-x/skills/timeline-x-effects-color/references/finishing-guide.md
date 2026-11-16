# Finishing: where each treatment helps and where it hurts

Read this before adding a finishing treatment such as grain, halation, glow,
vignette, lens blur, or a film look. Every treatment named here is an existing
native effect; read `list_effects` for its exact kind, parameters, and ranges
before adding it. This guide chooses among them; it adds no effect.

Decide finishing shot by shot instead of as a global layer: a treatment that
flatters a candlelit close-up can ruin the next interface shot. Note in the
plan which shots get which treatment and the reason, and leave a treatment off
the shots it would damage even when neighbouring shots use it.

| Treatment | Use it for | Keep it off |
| --- | --- | --- |
| Film grain | an organic, shot-on-film surface; breaking up smooth gradients that would band | interface captures, product macro shots and frames built around words; grain also costs export bitrate |
| Halation | a faint red-orange fringe where bright practicals meet dark areas | sharp-edged graphics, product cut-outs, small text |
| Glow | sources that emit light in the story: a candle, a screen at night, a street lamp | flat daylight scenes, bright white surfaces, anything typographic |
| Chromatic aberration | a hint of an imperfect lens toward the corners | the centre of interest, logos, UI and any edge that must look precise |
| Vignette | gently steering attention toward the centre of a photographic frame | flat colour fields, pastel illustration, brand cards |
| Lens blur, depth of field | separating one close subject from its surroundings | wide scene-setting shots and any layer that carries text |
| Lens flare | a single motivated moment of looking into a light | repeated decoration, interface and product shots |
| Motion blur | fast action that stutters frame to frame | slow drifts, held frames, and text in motion |
| Film look, VHS, CRT | a period or medium the piece is actually about | contemporary product and brand work as a default |
| Letterbox | a deliberately widescreen framing in a horizontal delivery | vertical social delivery, where it throws away screen area |

Keep text and graphics out of texture treatments. When a whole sequence needs
grain or a film look, place it on an adjustment layer with
`add_adjustment_layer` below the caption and Motion Graphics tracks, so type
stays clean, or apply it per clip. Compare the same timeline times before and
after, at delivery size, on both a bright and a dark moment.

Keep exact brand and product colors when a look grades the picture. After the
change, verify with `verify_edit_result` as the main skill describes, and
inspect the exported file through the export delivery workflow, since grain and
fine texture are where compression shows first.

## Survive the encoder

Delivery codecs decide what a look keeps, so grade and design for the file,
not the preview:

- A full-frame linear gradient on a dark ground bands visibly in H.264. Use a
  radial gradient, a solid fill, or a solid with a local glow, or break the
  ramp with grain as the table says.
- A tint or accent at about 5 percent opacity vanishes after compression. Use
  15–25 percent for atmosphere and full saturation for the focal element.
- A suggested correction from scopes or a colour-match analysis is a starting
  point for review, not a reason to neutralise a cast the shot was meant to
  have; read `get_color_scopes` and judge the frame before applying it.
- Parametric curves and grades cannot reproduce a real film stock; when the
  user wants a named stock, use a LUT made from it or say the result is an
  approximation.
- Check gradients and faint tints on the exported file through the export
  delivery workflow, on a dark moment.

## The cinematic pass

Use this when a rendered, generated, or graphic picture should read as filmed
rather than rendered. Four layers do it together, each too subtle to notice on
its own, and none may cost the subject its clarity. Check every kind and range
in `list_effects` before adding one.

Three layers are the user's choice and stay off by default: motion blur, print
tone, and gate weave. Offer them once, at the style frame, in one question with
their cost: motion blur on fast shots (slower preview and export), print tone
(soft blacks and a film roll-off), gate weave (the faint wander of a projected
print), or none. Lens character and grain are part of the look itself.

**Motion blur.** Match a 180-degree shutter, reserved for fast action such as
whip pans, hits, quick pans, objects rushing past, rain, and sparks. On the
Timeline, the
pixel motion blur effect takes a shutter angle; apply it per clip and range,
never across a hard cut, so each side keeps its own smear. Generated video
usually carries its own blur; add more only where fast motion strobes. For 3D
Studio renders, see the render setting in
[look, light, and camera in 3D Studio](../../timeline-x-3d-studio/references/look-light-camera.md).
Test the fastest second first, then read consecutive frames with
`inspect_timeline_frames`: a continuous smear, without stutter or ghosting.

**Print tone.** Lift the darkest values about 3–4 percent above black, let
highlights ease off from roughly 72 percent instead of clipping, add a little
S-contrast, and split slightly toward warm highlights and cool shadows. Build it
from the levels, curves, and colour balance effects, not a borrowed LUT. Read
`get_color_scopes` on a bright and a dark moment: minimum luma sits above zero,
the brightest highlight keeps its shape below clipping, and no area is pure
black or pure white. Keep exact brand colours, interface captures, and pixel art
out of it.

**Lens character.** Choose shallow focus per shot from what it must show. The
depth of field effect needs a real depth plane; lens blur is uniform, so use it
only on a separated background layer. Keep chromatic aberration faint, about
1 px or less at 1080p, and never on text. A barrel bend from optics
compensation stays under about half a percent at the corners. Halation sits only
around the brightest edges, with a high threshold and warm tint.

**Imperfection.** Film grain moves with the picture and stays off type. Gate
weave is a drift of the whole frame up to about 1 px, new on every frame; no
native effect makes it exactly, and a very low camera shake (no rotation, zoom,
or blur) is only an approximation, so leave it off if consecutive frames read
as shake. A camera move should begin as if it has weight and come to rest with
a slight overshoot; handheld presence is slow, low-frequency drift, never
frame-to-frame jitter. Fog or haze appears only when the story has it, denser
low and far, never one flat even layer.

Before export, run a cold review: list every frame that still looks
computer-clean, such as crushed black, clipped white, uniform haze, or
mechanical camera motion, and correct each one.
This pass is picture only; the sound identity (an ambience bed per space, close
foley, one signature sound that returns) belongs to the audio workflow.
