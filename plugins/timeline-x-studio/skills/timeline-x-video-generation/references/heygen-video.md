# Direct HeyGen (Video 1 and Avatar 6)

Select `heygen-video-1`, `heygen-avatar-6` or `heygen-avatar-6-turbo`
explicitly. They use the user's HeyGen API key from Settings → API Keys, held in
Vault and leased only to main. HeyGen bills each output second; jobs cannot be
cancelled once submitted (ADR 0260).

## HeyGen Video 1 (`heygen-video-1`)

- 5–30 seconds; 480p or 768p (default), and 1080p/2k only in 16:9 or 9:16.
  `heygen_options.promptEnhancement` `ultraquality` or `disabled` allows at most
  15 seconds.
- It always generates its own sound (dialogue, room tone, effects) from the
  prompt. Say `no music` when no music bed is wanted. Written dialogue fits at
  about 2.5 words per second.
- Inputs: text; a first frame (the clip opens exactly on it and follows its
  shape) with an optional last frame; or references — up to nine images, three
  Library videos (15 seconds of footage in total) and three audio files. Do not
  mix boundary frames with references.
- Refer to references as `@Image 1`, `@Video 1`, `@Audio 1` in authored order;
  the host sends them to HeyGen as `<Picture 1>`, `<Video 1>`, `<Audio 1>`.
- Long, specific prompts work best: name the camera and lens, ask for texture
  and forbid retouching, rule out logos and stray lettering, keep on-screen text
  to one short phrase spelled exactly, prefer a still camera and still hands.
- `promptEnhancement`: `turbo` fastest, `quality` default, `ultraquality`
  slowest; `disabled` sends a long, fully written prompt word for word.
- A fixed `seed` repeats the same output for the same request.

## Avatar 6 (`heygen-avatar-6`, `heygen-avatar-6-turbo`)

- Animates exactly one photo of the speaker (first frame or one reference
  image, PNG/JPEG) with exactly one Library speech audio (1–300 seconds,
  WAV/MP3/M4A). Generate the narration first (`synthesize_speech`), then pass
  it in `reference_audio_media_ids`.
- The video runs to the audio length and keeps the photo's shape; any canvas
  ratio is recorded as `adaptive`. Crop the photo to the wanted shape first.
- 1080p (default) or 2k. The prompt is the motion direction (gestures,
  expression, posture, camera; at most 1,200 characters).
  `heygen_options.motionExpressiveness: "less"` calms gestures.
- Turbo costs half and is faster; use the full model for final delivery.

## Consent

Use a real person's photo only with that person's permission to create and
publish the talking video. A voice clone is a separate consent decision.
Realistic-person reference videos are not available through Timeline X.
