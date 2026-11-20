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
   When the edit has captions, run `check_caption_fit`: it lays them out with
   the real fonts and flags a caption that wraps past two lines or spills out
   of its box; split or shorten those cues and check again.
   When the edit has narration or dialogue, run `verify_narration` on its
   lines after the music and effects are in: a line marked `masked` in the
   mix is lost under the bed, so duck or lower it and check again.
   Run `review_content_draft` and `check_face_occlusion` on the final cut; never
   export over an open P0 or with a card, caption or CTA sitting on a face.
   When the edit uses stock, archive, web or AI-generated media, run
   `list_media_credits` and, when the user wants credits, put `credits_text`
   on the end card or in the video description.
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

## Publish to social media

Only when the user asks to share or post the piece (for example "post it to
TikTok", "share as an Instagram Reel", "put it in my story"):

- Export and verify first, as above. Then call `list_social_targets` and use
  only a connected platform; for Instagram or Facebook with several accounts
  or Pages, pass the matching `account_id`.
- Call `publish_to_social` with the absolute exported path and the format the
  user named: Instagram `video` is a Reel, `story` a Story (photo or video up to
  60 s), `carousel` 2–10 items; YouTube needs the user's own `title` (a vertical
  video up to 3 minutes is a Short); TikTok `mode` `draft` sends it to the TikTok
  inbox, `direct` posts now with a creator `privacy` option. Write the caption
  from the user's words; never invent claims. Use `scheduled_at` for a time.
- Instagram's automatic captions cannot be switched on through its API. When
  the user wants subtitles on a Reel, Story or Short, burn them in before the
  export: follow the transcription skill's Captions steps on the timeline being
  exported (`transcribe_clip` → `apply_subtitles` → `apply_caption_template`,
  inside the vertical safe area), check representative cues with
  `capture_canvas_frame`, then export and publish. The written caption
  (`description`) is separate: the post text and hashtags shown under the video.
- Instagram and Facebook files go through Cloudflare R2 automatically; nothing
  else is needed. Follow with `get_social_publications` until the state is
  `published` (or `inbox`, `scheduled`) and report the URL, or the error.
