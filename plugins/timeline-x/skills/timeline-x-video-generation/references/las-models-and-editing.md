# LAS Seedance models and editing

Use the live catalog for exact IDs and argument schema. Direct LAS presets are
seedance-2-5, las-seedance-2-0, las-seedance-2-0-fast and las-seedance-2-0-mini.
The similarly named seedance-2-0 is the separate OpenRouter route. All LAS
models use the LAS credential in ap-southeast-1. Never substitute a route for a
missing key or a ModelArk recipe.

2.5 supports 4–30 seconds, 480p/720p and up to 30 images. The 2.0 variants
support 4–15 seconds and nine images. Only full 2.0 supports 1080p/4K;
generation with reference images cannot use 1080p. First/last frames require
the opening frame and cannot be mixed with video/audio references.

One-off generation accepts up to three Library video references totaling
15 seconds, each 2–15 seconds. Main uploads through configured storage and
verifies the content. FilmManifest keeps its existing one-motion-video recipe.
Use ordered reference_video_media_ids for multiple videos or reference_video
for an explicitly prepared source range; do not duplicate the same media in
both fields. State each video's intended role in the prompt.

WAV/MP3 reference_audio_media_ids guide voice, sound and rhythm. Each file is at
most 15 MB. LAS 2.5 allows ten references totaling 30 seconds, each 2–30 seconds;
2.0 variants allow three totaling 15 seconds and also require an image/video
reference. Reference audio does not guarantee exact spoken words or lip sync.
Film uses motion-reference mode, preserving storyboard stills for editorial
review. Changing the model or references requires the normal approval gates.

For existing authorized LAS Asset Library media, las_options.assets accepts
asset:// identities with explicit kind/role and verified media duration.
Never invent an ID, infer an account allowlist, or upload a person's media to
create an asset as a workaround. Asset IDs are provider inputs, not Library
media IDs. The host does not create asset groups or enable account permissions.

The optional las_options.edit selects the separate Video Edit Enhanced 2.0
operator. It requires exactly one source video and an explicit template:
basic, general, replace/person_replace, replace/subject_replace, or
style_transfer/general. General and replacement templates require a target
image. Image/audio references for this operator must use existing asset IDs;
local inline files are not documented. The documented 2d_japanese style
parameter is available for style transfer; other styles can be described in
the prompt without inventing template parameters. No template fallback or
automatic asset conversion is performed.

Editing 2.5 chooses output length automatically. Explicitly request 30 seconds
as the maximum duration and cost budget; the wire request uses duration=-1 and
delivery records the actual length. Do not use this adaptive operation as an
approved fixed-duration Film recipe. Other editing models use fixed duration.
Set seed to null for editing; this operator does not document seed. Editing
4K remains unavailable because its overview and request table disagree.

Optional executionExpiresAfter is 3600–259200 seconds. Supply callbackUrl only
when the user has chosen a public HTTPS receiver; it is not required for normal
polling. Exact cache hits do not create a new provider job or callback. Follow
the existing job recovery flow; do not create another paid task to recover a
download. Generation task retention is seven days, editing three days; download
successful outputs promptly because provider result URLs last about 24 hours.

Sources verified 2026-10-24:
- https://docs.byteplus.com/en/docs/byteplus_las/video_gen_enhanced
- https://docs.byteplus.com/en/docs/byteplus_las/Enhanced_video_editing_2
