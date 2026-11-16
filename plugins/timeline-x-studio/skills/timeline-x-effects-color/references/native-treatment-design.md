# Translate visual intent into native treatments

Use this reference when the user supplies an effect example or asks for a look
without specifying a supported treatment. Describe the observable goal first:
neutral skin, warmer light, separated subject, restrained camera motion, or a
readable transition between two shots. Choose the returned native capability
that serves that goal; another product's effect name is only a visual clue.

## Choose an operation by its purpose

| Purpose | Starting point | Preserve |
| --- | --- | --- |
| Correct exposure or white balance | Inspect the current grade and a representative composed frame | Skin tone, highlight detail, authored masks and existing adjustments |
| Match adjoining shots | Compare corresponding subjects and lighting before grading | Intentional differences in time of day or location |
| Establish a coherent style | Inspect the available look packs and their actual scope | Product/brand colors and readable captions |
| Direct attention with movement | Inspect native motion presets and the requested target range | Subject framing, overlay clearance and comfortable motion |
| Connect two adjacent shots | Inspect transition presets and usable source handles | The intended cut point, dialogue continuity and shot meaning |

Do not stack several treatments merely because the reference appears elaborate.
A project-wide look pack may also restyle captions; inspect that scope before
adding an independent caption or color pass. For a localized effect, retain its
editable native parameters and existing layer identity rather than flattening
the picture into a new video.

## Use a small visual experiment

Capture a representative baseline, including skin/product colors, fine detail,
and text if present. Apply the narrowest authorized change and compare the same
timeline timestamps. For a transition or animated effect, also inspect its
beginning, middle and end with surrounding cut context. A pleasing midpoint
does not prove clean boundaries or readable motion.

If the treatment hides text, changes a factual product appearance, creates a
flash, clips a face, or exposes an unintended empty edge, repair that specific
problem. Keep the user's requested style unless the evidence shows it cannot
meet a stated constraint. Preserve previously authored effects unless their
replacement was requested.

Use `verify_edit_result` for the exact affected layers and range. State/property
checks and fresh composed-frame inspection must both pass. Preview and export
use the same compositor; do not propose a preview-only shader or separate
rendering path to make the example look correct.

When a reference requires custom shader code outside the catalog, describe the
remaining visual gap and the closest supported treatment. A new shader engine,
compiler or network-enabled Motif is a separate implementation request, not an
operation this skill can enable.
