# Independent video-reference finishing candidate

## Independent video-reference finishing candidate

The Library/Film Studio finishing dialog supports the catalog's LAS and
ModelArk Seedance models. The URL/storage instructions below apply to those
routes, not MiniMax's canonical FilmManifest adapter.

1. Use a finished Library MP4/MOV as the motion reference: a 3D Studio render
   delivered with `studio_video_deliver`, a clip cut with
   `plan_film_from_video`, or any imported video. A still preview is not a
   motion reference. Use a clip within the selected model's duration and FPS
   limits, preferably 1280×720 or 720×1280.
2. Call `generate_video` with reference_video containing media_id and omit URLs.
   Main automatically uploads through the signed-in Timeline X account, creates
   a temporary read link and verifies the exact bytes before provider submission.
   No manual upload, TOS account or storage credentials are required. Explicitly
   configured S3/R2 remains supported. Public durable jobs require automatic transfer.
   Local synchronous calls may instead supply an HTTPS GET url and an optional
   signed PUT upload_url for S3/TOS/R2. Never invent transport URLs.
   Use normalize=true with start_seconds/end_seconds for a 2–15 second section
   of a longer source; Rust creates a separate 30fps MP4 derivative. The original
   is preserved. Video Base64 is not supported by BytePlus.
   Terminal tasks remove temporary inputs; uncertain tasks retain them for
   recovery. Real-person portrait authorization remains a separate BytePlus
   requirement; automatic storage does not authorize a face or create an asset ID.
3. Select the requested LAS or ModelArk Seedance model. Pass character/style images through
   reference_image_media_ids; do not combine video with first/last frame inputs.
   Describe which motion, poses, camera and timing to preserve and which look to
   change. Do not silently replace a video reference with still frames.
4. This is an explicit second pass, not a 3D Studio queue fallback. Review the
   new Library video and its motion/identity before Timeline placement. Existing
   film approval gates remain in force. Signed links are not saved in Project
   metadata; source hashes are retained and exact retries reuse the output cache.

5. Exact retries recover a known paid provider job after interruption. An unknown
   submission outcome blocks a new POST, including force_regenerate, until the
   task is reconciled. Closing the dialog keeps UI generation running; stopping
   local waiting does not cancel the remote paid job. Review synchronized source
   and output playback. Film Studio exposes this action for a registered shot
   output and lists linked finishing candidates; approved outcomes are unchanged.
   To produce an approved film-shot result instead, bind the original reference
   Video and appearance Images in the canonical motion-reference recipe above
   before approval and use Scene Manager, not this independent finishing action.
