---
name: timeline-x-multicam-sync
description: "Synchronize two to nine camera angles and separate recorders, create a durable Timeline X Studio multicam sequence, and optionally build a verified speaker-follow edit."
---

# Timeline X Studio Multicam Sync

Use this skill when several cameras or recorders captured the same event and
must be aligned, turned into a multicam sequence, or cut to the active speaker.
Preserve the loose source clips and build reusable synchronized state before
making editorial cuts.

## Discover the session

1. Read `project://media` and `project://tracks`, then use existing transcript
   results or call `transcribe_clip` for the candidate recordings. Distinguish
   simultaneous angles from sequential camera restarts using transcript
   overlap, source time, duration, filenames, and metadata. Do not ask for a
   camera count that the project already proves.
2. Identify one representative VideoClip or linked Audio member per camera
   unit. Treat audio-only recorders as program-audio candidates, not camera
   angles.
3. Report the inferred cameras, spans, recorders, coverage, and uncertainty
   before mutating an ambiguous session.

For camera/microphone identity and motivated shot choices, read
[session evidence and angle decisions](references/session-evidence.md).

## Analyze, then apply atomically

- For sequence creation, choose a clean reference from one of the selected
  camera units. Each unit contains exactly one VideoClip and at most its linked
  Audio member; multiple restarts are separate coverage spans, not an inferred
  multi-clip angle.
- Call `analyze_audio_sync` once with that reference and the other candidate
  camera units only. Read every confidence, independent peak ratio, overlap, drift,
  warning, and eligibility result. Low-confidence or ambiguous rows are
  evidence to review, not permission to guess.
- To create a multicam sequence without moving source clips, pass the complete
  returned apply recipe directly to `create_multicam_sequence` with two to nine
  camera units in the intended angle order. The tool applies synchronization
  only to an isolated copy and commits sequence creation as one undoable edit.
- If the user explicitly wants the loose Timeline clips aligned in place, pass
  the unchanged recipe to `apply_audio_sync` instead. Never retype or alter its
  hashes, source windows, offsets, membership guards, or drift correction.
- A separate recorder is not a camera unit. Synchronize it with the same
  evidence in a separate analysis; do not include it in the camera-only recipe.
  Before `add_audio_layer` places chosen program audio in the created sequence,
  prove its source mapping against the copied reference's actual position and
  any synchronization headroom/drift. Keep camera scratch audio muted when it
  is not the program source. If exact mapping is unavailable, report that
  limitation instead of applying a recorder offset by guesswork.

## Identify and cut

- Label angles and audio tracks only from timestamped visual, transcript, and
  level evidence. Use neutral camera/recorder numbering when identity is not
  proven.
- Preserve the synchronized multicam sequence as the master. Place it with
  `place_sequence` only when requested.
- For a speaker-follow draft, build the dialogue plan first, then use
  `switch_multicam_angle` at motivated boundaries. Keep program audio
  continuous; do not chase sub-two-second interjections or borrow reactions
  from another wall-clock moment.
- When the user also wants filler removal or restructuring, let the
  talking-head workflow decide retained speech before final angle switches.

## Verification

Re-read the created sequence and report its id, angle order, master audio,
duration, and every accepted or rejected alignment with actual values. Inspect
several synchronized moments—including the longest shot and speaker changes—
with composed frames. Confirm that picture and program audio retain the same
wall-clock offset, no source span was trimmed to hide a bad match, and the
source clips remain unchanged. Finish a derived cut with
`verify_edit_result` and `audit_timeline_quality`.
