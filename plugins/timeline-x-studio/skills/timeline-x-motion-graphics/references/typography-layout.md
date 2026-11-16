# Typography, form, and editable variation

Read this for a new visual direction, a reference adaptation, or copy that no
longer fits. Use the main skill's existing Project visual style and Motif path.
Do not repeat font selection for each instance of an established component.

## Choose a font from evidence

Start with the Project visual style's font choices, then the bundled families
in [type craft](type-craft.md), which render identically on every machine and
cover Turkish. For a new piece, render two or three pairings from that table as
specimen cards in the piece's own palette and words, let the user pick, and
keep the pick for the whole piece. Compare candidate
families using the actual words, target size, and intended weight in a rendered
specimen. A font name, screenshot, or installed file alone does not prove a
visual match. Record the chosen family, role, weight, and any mismatch rather
than claiming an exact match to an unidentified reference.

For Turkish text, check both uppercase and lowercase glyphs, including
"İ, I, ı, i, Ş, ş, Ğ, ğ, Ç, ç, Ö, ö, Ü, ü". Check numerals, punctuation, and
the real product names too. For mixed languages, check each required script.
Reflow content when glyph widths differ; do not silently replace letters or
compress the whole treatment. Network font loading is outside the offline
Motif contract. Adding a font beyond the bundled families is a separate
licensing and distribution change, not something this reference authorizes.

Uppercase Turkish copy with Turkish rules, for example
`toLocaleUpperCase('tr-TR')`, or write it in capitals: a plain uppercase
conversion turns "istanbul" into "ISTANBUL" instead of "İSTANBUL". Size text
boxes, masks, and line height for the marks above the cap height (İ, Ğ, Ü) and
below the baseline (Ş, Ç); a box sized from the cap height alone clips them.
Derive a box or plate from the rendered extent of the actual string with
padding around it, not from the nominal font size. Check each text box with the
line "İĞÜŞÖÇ ığüşöç", and with "ÉÅÑ" as well when other Latin-script
languages appear. Keep a number and its unit together with a
no-break space, and avoid a one-word last line.

Use one primary text family and an optional complementary role when it has a
purpose. Contrast can come from weight, size, spacing, and alignment; another
font is not always needed. Check the finished render at delivery size. Read
[type craft](type-craft.md) for role assignments with the three available
families, tracking and leading, figures, and moving type.

## Size for the phone screen

Most viewers watch on a phone. Start from the delivery's short side (1080 px
for 1080×1920, 1080×1080, and 1920×1080) and pick sizes as a share of it:

| Step | Use | Font size, 9:16 and 1:1 | Font size, 16:9 |
| --- | --- | --- | --- |
| T1 | title card or a single impact word | 0.11–0.16 | 0.09–0.13 |
| T2 | headline, price, call to action | 0.065–0.09 | 0.065–0.09 |
| T3 | subtitle, lower-third name | 0.04–0.055 | 0.04–0.055 |
| T4 | label, role line | 0.034–0.04 | 0.034–0.04 |

Keep one ratio between neighbouring steps, between 1.25 and 1.6. Check the
minimum as cap height in delivered pixels: at least 28 px for running text in
9:16 and 1:1 at 1080 wide (22 px for a static legal line shown for 3 s or
more), and at least 40 px in 16:9 at 1920×1080 (32 px for a legal line),
because a horizontal video watched inline on a phone appears about half as
tall. Cap height is roughly 0.65–0.72 of the font size, so 28 px of cap height
needs about a 40 px font. Measure on a composed frame at delivery size, not in
an isolated preview.

## Choose the form by what the viewer must understand

| Information | Starting form | Layout question |
| --- | --- | --- |
| Identity or location | Short label | What can stay visible without distracting from the subject? |
| One conclusion or quote | Typographic emphasis | Which phrase establishes the hierarchy? |
| Ordered actions | Steps or a short list | Can the viewer follow the order before the next reveal? |
| Two choices | Comparison | Are the measures and units genuinely comparable? |
| A relationship | Diagram | Which direction or grouping carries the meaning? |
| A section change | Title beat | Does this need its own surface or only a light cue? |

Design a settled frame with the longest approved content before animating.
Decide alignment, line breaks, text measure, spacing, and occupied area. For
longer copy, reduce secondary detail, allow another line, or choose a larger
form before shrinking all text. A quote must retain exact wording; shorten only
with the user's editorial authorization.

If adapting a reference, note which hierarchy, proportions, spacing, and motion
matter, then render this content within the Project's palette and typography.
Do not inherit example brands, people, numbers, or unrelated decorative effects.

## Keep meaningful variation editable

Reuse a Motif when its viewer job, information structure, and motion contract
remain the same. Declare the changing text, colors, and supported scalar choices
as props. Keep fixed grid geometry and ornamental constants internal unless
there is a useful reason to expose them. Check a reusable design with at least
one longer content case and a non-default prop set.

The props schema has the existing string, color, number, and enum variants.
The host fallback form exposes those declared values; no extra widget hint or
fifth variant is implied here. A params page, if already part of an HTML Motif,
is a separate offline UI plane and must follow its existing host contract.
Changing the shape or narrative job may need another asset, not an expanding
universal component with unrelated controls.
