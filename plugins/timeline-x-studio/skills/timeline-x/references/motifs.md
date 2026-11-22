# Motifs (animated overlays)

## Motifs (animated overlays)

To author or update a Motif, follow the dedicated
`timeline-x-motion-graphics` skill when it is active. Its central rendering
law applies even without that skill: visible state must be a deterministic
function of `t`, never an accumulation. Then:

1. `list_motifs`, and read the closest existing Motif with `get_motif_source`
   — base your draft on what already renders correctly.
2. `write_motif_draft` (set `from` when your draft updates an existing Motif).
3. **The user approves, not you.** Place the draft with `add_motif`, ask the
   user to play it in the app, and call `install_motif` only after they
   confirm. If you can read images, pre-check with `preview_motif_draft` at
   three timestamps (start, middle, near the end) and once with non-default
   props before involving the user — their confirmation is still the gate.
4. After installing, remove the trial layer unless the user wants it kept.

For a placed Motion Graphic, call `list_motifs` first so the installed manifest
is current, then use `update_motif_instance`. Prefer the built-in lower-third,
KPI, steps, and comparison templates before authoring a new draft. Its instance
properties are merged and checked against that manifest before the timeline
changes; invalid property names, types, colors, enums, or ranges are rejected
atomically while the layer timing and effects remain intact.
