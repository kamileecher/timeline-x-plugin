# Corrective pickups

Read this only when the user requests replacing a spoken error or a short
phrase. A transcript typo alone needs a text correction, not new speech.

1. Listen to the source and verify the actual mistake. Identify the exact layer,
   corrected wording, speaker and local replacement window. Use complete,
   trustworthy transcript spans when available; incomplete word timing cannot
   authorize a word cut. Manual listening and confirmed segment boundaries may
   support a wider local repair, but never invented word timestamps.
2. Confirm that the saved Settings voice is the authorized speaker/profile and
   compatible with the language. Voice metadata does not establish an identity
   match. A different saved voice needs a user configuration decision; do not
   select or create a per-request clone behind the user's back.
3. Generate the correction while retaining the usable original. Inspect the
   real take and duration before muting, trimming or replacing original speech.
   Isolate the existing Audio path with supported non-ripple layer operations;
   if speech is embedded in Video, `separate_audio_to_new_track` may create an
   editable path within the authorized correction. Do not detach it twice.
4. Keep picture and all later timing fixed. Correct only the mistaken interval,
   avoiding double playback from embedded and separated audio. Use short fades
   and matching gain where needed. Do not replace an entire source media id
   with a phrase-length recording that cannot cover its source window.
5. Fit the replacement naturally within the original slot. Regenerate a concise
   approved phrase if needed; do not truncate a phoneme or retime surrounding
   speech. A wider timing change or wording change needs the relevant user
   decision. Do not bypass the speech path's speed limit with aggressive layer
   stretching and describe it as a natural correction.
6. Listen around both joins for clicks, doubled words, room-tone jumps,
   pronunciation and overlap. Read back the unchanged picture/later ranges and
   corrected Audio range. Show the exact local region for review.

An audio pickup does not change lips. If a visible speaker now articulates
different sounds, disclose the observed mismatch. Add B-roll or another visual
cover only within the user's editing intent; otherwise keep that decision open.
Retain original media and undo/history so the change remains recoverable.
