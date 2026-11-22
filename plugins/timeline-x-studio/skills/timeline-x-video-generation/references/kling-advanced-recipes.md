# Direct Kling advanced recipes

## Direct Kling advanced recipes

Read the live generation and resource-management schemas before choosing a route.
Use `manage_kling_resources` to list/create/poll Elements and voices or analyze a
Library video's faces. Creation, deletion and face analysis require native human
confirmation; a pending or unknown task must be inspected rather than resubmitted.
Never invent provider IDs, face IDs, expiry, or source hashes.

Freeze the complete Kling recipe in each Film shot: operation, Element/voice aliases,
optional 3.0 directed shot durations/prompts, orientation, original audio, or reviewed
lip-sync timing. Editing, motion control and lip-sync use motion-reference strategy;
source video/audio remain Library IDs. Storyboard boundary stills stay editorial
for these operations. 2.6 voices need a first image and native 1080p audio; the end
image stays editorial. 3.0 voices bind through Elements. Direct 4.0 and 4.0 Flash audio
is managed by the provider; only a recipe with a source video may keep its original
audio, and never together with voices. 4.0 Flash is the 720p, 3–20 second route: it
accepts a first frame, reference images, Elements and one source video, but no last
frame and no voices, so use text, single-frame or motion-reference shots. Both 4.0
routes also bill the source video's seconds. Respect preflight limits and unknown-price blocks.

Use `generate_video` with explicit Kling options and media-pool placement for an
independent candidate. Motion control can return less usable duration than the source;
inspect before placing or accepting a Film result. Changing any approved recipe field
requires renewed production approval. Provider POST success alone is not Film delivery.
