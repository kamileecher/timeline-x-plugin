# User-owned Timeline X API

Use the common video generation and Film production flow with these exact
editor model identities, separate from commercial MiniMax/Wan routes:

| Model | Input shape |
| --- | --- |
| timeline-x-wan22-5b | Prompt or one opening Image; silent |
| timeline-x-h3-fl2va | Prompt, opening Image or opening/closing Images; optional one Audio guide |
| timeline-x-h3-ref2va | At least one reference: up to three Images, one Video and two Audios; no closing Image |
| timeline-x-ltx-2-5 | Prompt, opening Image or opening/closing Images; optional one Audio guide |

Choose the model in the Agent composer or Film Studio model selector. A model
change updates pending Film recipes through the existing actor and invalidates
affected approvals; completed takes and explicitly pinned edit/extend tasks
retain their route. It does not approve or generate a film.

Use `generate_video` for one clip, or the normal approved FilmManifest and
`start_scene_queue` for shot production. References are verified Library media,
not server UUIDs or arbitrary paths. The personal Timeline X API credential
comes from API Keys through a main-only Vault lease. Inspect live availability
with `manage_timeline_x_media` before production when readiness is uncertain.

Delivery tiers are 480p, 720p, 768p and 1080p. Native inference respects model
stride, area and pixel-frame limits; output can be resized to the delivery
canvas. Never call a resized delivery native 1080p. H3 uses cfg=1, an empty
negative prompt, 32px native strides, 24 fps and 17*n+5 frames. LTX uses 64px
strides and 8*n+1 frames at 24 fps. Film preflight reports the actual native
duration; opening/closing-frame shots must match that duration to retain their
authored ending. Other modes can use the ordinary padded-shot trim.

H3/LTX generate their own audio. The common adapter records this as
provider-managed audio. Wan is silent. No commercial per-request price is
invented for the user's server: estimates remain unknown; this does not waive
budget checks for commercial models in the same queue.

The adapter retains the provider job identity and resumes it after interruption.
An uncertain creation cannot authorize another POST. Completed MP4 bytes are
probed before cache publication, then imported and recorded through the shared
Project actor, with provider-bound request and input-byte evidence.

The common image flow also offers timeline-x-flux2-klein-4b: 2000 prompt
characters, three reference Images, and 256–1024px dimensions in multiples of
16. Editorial canvas framing remains separate from its bounded native size.
For speech, voice cloning, lip synchronization, upscaling and transcription,
use the task schemas exposed by `manage_timeline_x_media`; those operations do
not silently become Film video generation or approve a shot.
