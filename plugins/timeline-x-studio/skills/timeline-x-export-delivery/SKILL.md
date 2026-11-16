---
name: timeline-x-export-delivery
description: Prepare, export, and inspect Timeline X Studio deliveries with platform-aware settings, safe filename conflicts, and final timeline quality checks.
---

# Timeline X Studio Export and Delivery

Use this skill when the user asks for a finished file, delivery preset,
platform version, or export diagnosis. Do not export merely because an editing
task is complete. Read [Delivery loudness and final checks](references/loudness-and-final-checks.md)
when sound matters, a loudness target is named, or the picture carries grain.
Read [Delivery package](references/delivery-package.md) when a finished piece
goes to a platform, client, or post, or a cover or thumbnail is wanted.

## Prepare the delivery

1. Read `project://current` and `project://tracks`. If the sequence was just
   edited, make sure its specific edit verification has passed.
2. Run `audit_timeline_quality` over the requested range, with frames included.
   Inspect the returned frames and resolve blocking picture, caption, sync, or
   audio issues before export. Report missing evidence rather than presenting a
   partial audit as a clean result. When text or captions sit over footage,
   also run `analyze_text_contrast` over the range and resolve its findings;
   skipped targets mean the frame budget ran out, so measure them in a second
   call.
3. For a named social/platform delivery, call `list_platform_outputs` and then
   `apply_platform_output`. This reframes the current project and changes its
   export preset, so verify the reframed result with `verify_edit_result` before
   continuing.
4. Call `list_export_presets` and `get_export_settings`. Preserve current
   settings unless the request or target requires a change; apply only the
   intended patch with `set_export_settings`.

## Export safely

- Obtain an absolute output file path. Use automatic versioning when the
  destination may already exist. Overwrite only when the user explicitly asks
  to replace that exact file.
- Pass a range to `export_project` only for an intentional partial delivery;
  otherwise export the complete composition.
- Wait for the export tool's verified terminal result. A queued or started
  state is not a finished delivery.
- Run `inspect_export_file` on the resulting local file. Compare it to the
  project or explicit expected width, height, frame rate, duration, codecs, and
  audio presence as appropriate.

- Run `audit_export_content` on the file, with `loudness_target_lufs` when a
  target applies, and review its findings and contact sheet; name any intended
  black, frozen or silent passage, quiet opening or flash. Report the measured
  integrated loudness and true peak from the file, as the
  [loudness reference](references/loudness-and-final-checks.md) describes.

Report the final absolute path, applied preset, inspected technical result, and
any warnings. Never claim a platform-compatible delivery solely from the file
extension or preset name. State loudness as a measured mix value or an applied
export target, never as a measurement of the file, and name the seconds the
user should listen to.
