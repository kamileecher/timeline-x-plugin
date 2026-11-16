# Direct Pruna P-Video

Select `pruna-p-video-2` or `pruna-p-video-2-pro` explicitly. Both use the
user's Pruna API key from Settings → API Keys, held in Vault and leased only to
main. Pruna bills each returned second; always send an explicit duration.

- `pruna-p-video-2`: 1–20 seconds, 720p or 1080p, 24 fps. Generated audio is
  kept only when generate_audio is true.
- `pruna-p-video-2-pro`: 5–15 seconds, 480p or 768p; 1080p, 2k and 4k are the
  768p video upscaled. It always returns provider-managed audio, as does the
  reference model below.

- `pruna-p-video-2-pro-reference`: 5–15 seconds, same resolutions as Pro. Up to
  nine images (first/last frames included), three reference videos (2–15 s,
  at most 1080p and 60 fps, 15 s total) and three audio files (15 s total).
  It needs at least one reference image or video. Refer to them in the prompt
  in authored order (Image 1, Video 1, Audio 1).

Inputs come from hashed Library media. `pruna-p-video-2` and
`pruna-p-video-2-pro` take text, a first frame, or a first+last frame pair.
`pruna-p-video-2` also takes one audio file (1–20 s); the output then follows
the audio length, so set duration_seconds to it. With an input image, use the
adaptive aspect ratio: Pruna follows the image.

For a talking clip from one portrait, use a first frame, put the spoken line in
the prompt in quotes with its language, and ask to keep the face, clothes and
background unchanged; both P-Video 2 and Pro generate the speech. For an exact
recorded line, give `pruna-p-video-2` the portrait as first frame and the voice
file as its one audio reference: it lip-syncs that audio, and the video runs to
the audio length rounded up to whole seconds. The reference model treats audio
as a voice/sound reference, not a script; put the words in the prompt.
Output frame sizes are rounded to the model grid (720p 16:9 is 1280x704).

Recover a known prediction instead of starting another paid request. A blocked
moderation result is terminal; change the prompt or inputs before trying again.
