---
name: timeline-x-effects-color
description: Apply and verify Timeline X Studio's canvas painting and retouch, native looks, color grades, motion presets, and transitions.
---

# Timeline X Studio Effects and Color

Use this skill for canvas painting/retouch, color correction, stylized looks, clip motion, and
transitions. Prefer Timeline X Studio's native, editable catalog. When no
catalog effect fits, a bounded authored effect is possible: validate the
shader document with `compile_shader`, add it with `add_authored_shader_effect`,
and verify it on a rendered frame. Never call a foreign or imagined shader tool.

For an underspecified look, effect reference, or transition request, read
[native treatment design](references/native-treatment-design.md) to translate
the intended appearance into supported, editable operations. Before adding a
finishing treatment such as grain, halation, glow, vignette, or a film look,
read the [finishing guide](references/finishing-guide.md) for where each one
helps and where it hurts, and for the cinematic pass that makes a rendered or
generated picture read as filmed.

## Paint and retouch

For brush, erase, clone, heal, smudge or liquify, read `get_retouch_state` for
exact target identity, current effects and its receipt. Use
`apply_retouch_strokes` with that receipt for one atomic create/append and undo.
Discover closed geometry and budgets through `list_effects`; coordinates are
normalized layer-local and source offsets are source minus destination. Ask for
an unresolved clone/heal source instead of guessing it. New paint can opt into
1024-pixel processing; describe this limit for fine detail on larger sources.
Heal matches destination color while transferring source texture; smudge drags
actual pixels. These are bounded native operations with no paid provider.
Never blindly repeat an append after an uncertain outcome: re-read the state.
Verify composed frames after each accepted change using the ordinary visual
verification path below.

## Choose the narrowest native treatment

- Read `project://current` and `project://tracks`, identify the exact target
  layers and range, and preserve existing authored effects unless the user asks
  to replace them.
- For a cohesive project style, call `list_look_packs`, choose from the returned
  evidence, and use `apply_look_pack`. A look pack can restyle captions and
  apply its structured picture grade; do not manually duplicate the same pass.
- For correction or matching, call `get_color_grade` on reference and target
  layers before `apply_color_grade`. Merge normal adjustments. Replace or reset
  only when the user intends to discard or remove the current grade.
- For pan, zoom, or entrance motion on a visual layer, call
  `list_motion_presets` and then `apply_motion_preset`. Use the Motion Graphics
  skill for a designed animated overlay rather than forcing it into a clip
  motion preset.
- The camera presets (push in, pull out, drift, Ken Burns) move position and
  scale over the whole layer with a gentle ease in and out, so each starts and
  ends at rest. That suits a self-contained shot. An opening shot that must
  move from its first frame needs its first key's ease changed with
  `set_keyframe_easing`. Camera presets need a layer with a known natural size
  (video, image, or text) and refuse Motif and nested layers. Pieces cut from
  one continuous shot must not each get the preset, or the move restarts at
  every cut, and splitting a moved clip leaves each half frozen at one end of
  the move. Key such pieces with `set_keyframe` instead, starting each piece's
  x, y, and scale at the values where the previous piece ended. The amount is fixed, so the layer's
  length sets the speed: the same push reads as slow over 8 s and fast over
  2 s. These are zooms on a flat picture with no parallax; real depth comes
  from 3D Studio or a generated camera move.
- For a cut treatment, call `list_transition_presets` and use `add_transition`
  on adjacent layers on the same track. Respect the tool's handle and placement
  constraints; do not move unrelated clips to manufacture a transition.

## Existing AI background mattes

New AI background removal is not available. A VideoClip may still carry a
`segmentationMatte` effect from an earlier project: it keeps rendering its
stored matte, and its feather, edge shift, contrast, invert, outside-coverage
and blend parameters stay editable with `update_effect`. If
`check_project_health` reports its matte missing or stale, export is blocked
until the effect is disabled or removed; do not promise to regenerate it.

When several targets need independently reviewable creative changes, stage one
operation per target with `begin_edit_session`, inspect `review_edit_session`,
and apply only the accepted operations with `apply_edit_session`.

After every accepted visual change, re-read `project://tracks` and call
`verify_edit_result` with exact target layers, range, and intended appearance.
Inspect every returned frame. For a completed sequence, follow with
`audit_timeline_quality` before calling the look finished or exporting it.
