---
name: timeline-x-media-import
description: Import local video, audio, and still files into Timeline X Studio and place them in the Library or Timeline without duplicate registration.
---

# Timeline X Studio Media Import

Use this skill when the user wants to bring existing local media into the
project. Do not use it for Timeline X Studio image, video, or speech generation:
those tools register their successful results automatically. Composer files
added with the + menu are also already registered.

## Resolve before importing

1. Establish the exact absolute file path and whether the user wants a Library
   asset only or a Timeline placement. Treat attached documents as documents,
   not media.
2. Read `project://media` before importing. Match an already registered item by
   its absolute path or other returned identity evidence; never create a second
   Library item merely because the label differs.
3. Call `import_media` exactly once for each missing local file, then re-read
   `project://media` and use the returned media id. A remote URL is not a local
   import path; for an authorized direct media URL, `import_media_url`
   downloads it into the project workspace and imports it once.
4. For material the user did not make (stock, archive, recordings, effects or
   music), check its licence and keep a record as
   [Outside material and licences](references/outside-material-and-licences.md)
   describes before placing it.

## Place only when requested

- For video or still media, read `project://tracks` and use `add_video_layer`.
  Use role "a-roll" or "b-roll" when that editorial intent is known; otherwise
  use a specific unlocked track already identified from project state. Preserve
  the source duration unless the user requested a retime. Let the project
  setting decide whether video audio is paired unless the user explicitly asks
  for picture-only or paired placement.
- For audio media, use `add_audio_layer` and choose the truthful mix role:
  dialogue, voiceover, music, or sfx. Omit the track when any free audio lane is
  acceptable; audio routing is role-based, so do not invent a permanent Music
  or SFX track.
- If the user wants to replace the source of an existing compatible layer while
  preserving timing, transforms, and effects, use `replace_layer_media` instead
  of deleting and rebuilding the layer.
- If the request is Library-only, stop after confirming the item in
  `project://media`; do not edit the Timeline.

After placement, re-read `project://tracks`, confirm the media id, range, role,
and number of created layers, then call `verify_edit_result` for the exact
user-visible placement. Do not report success from the import id alone.
