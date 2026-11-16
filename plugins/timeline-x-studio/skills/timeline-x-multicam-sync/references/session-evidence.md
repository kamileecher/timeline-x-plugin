# Session evidence and angle decisions

Use this reference for uncertain capture structure, speaker identity, program
audio, or a requested speaker-follow draft. Synchronization alone does not
authorize a new editorial cut.

## Establish what each source proves

Build a small evidence table with source id, camera/recorder role, covered
interval, suspected subject, timestamped evidence, and remaining uncertainty.
Keep filenames as clues: repeated clip names, matching phrases, or transcript
speaker ids cannot identify a physical device or person alone. Transcript
speaker ids are local to the transcript, not shared identity across files.

- Compare unique spoken passages, scene content, metadata, and duration to
  distinguish concurrent recordings from camera restarts. A repeated sentence
  can be another take. A gap between restarts can be real; do not force adjacent
  placement or trim source to manufacture continuity.
- Inspect synchronized views at several separated solo-speech moments and
  introductions. Record the observed face, clothing/seat continuity, shot size,
  and framing changes. Prefer neutral angle numbers until identity is supported.
- For a microphone, compare its own levels/intelligibility during different
  speakers' solo speech at corresponding moments. Repeat across the session;
  gain differences between recorders and word counts do not prove ownership.
  If the host cannot measure or audition the relevant audio, leave ownership
  uncertain rather than assert a fixed dB rule.
- Honor the user's program-audio choice. Otherwise compare continuous coverage,
  intelligibility, noise, clipping, room sound, and handoff quality. A recorder
  label alone does not guarantee better audio than a camera.

## Use measured synchronization

Shared transcript passages can locate candidate overlap windows for acoustic
analysis. They do not establish frame/sample alignment: approximate word timing
or a roughly 100 ms agreement still spans several frames in ordinary projects.
Do not install or use a transcript-offset helper as a production synchronization
algorithm, or convert its vote into a guarded apply recipe.

Use the complete `analyze_audio_sync` recipe and eligibility evidence. For
`create_multicam_sequence`, the reference belongs to a selected camera unit and
every non-reference camera unit appears exactly once. Additional recorder rows
make that recipe invalid. The durable sequence stores angle order/master camera
audio and leaves the source Timeline unchanged. It is supported Timeline X
state; do not replace it with a foreign prohibition on reusable sequences.

For clock drift, inspect the offered correction's bounds and early/middle/late
checks. Never improvise a stretch or change the returned guarded recipe. A
constant-offset result does not prove an entire long session remains aligned.

## Plan a requested cut before switching

Write interval, retained speech, angle, and reason before `switch_multicam_angle`.
Use a common synchronized moment for every alternative; reactions from another
moment alter the event's meaning.

| Purpose of the moment | Useful view | Check before the cut |
| --- | --- | --- |
| Explain a point | Speaker medium or close view | Mouth/picture sync and sustained readable framing |
| Show a response | Listener at the same moment | The response occurred there and adds relevant information |
| Establish participants or change topic | Wide/two-shot | Geography, gaze, and who is involved remain clear |
| Crosstalk, shared laughter, movement | Wider group view | Every relevant action is visible and the shot settles |
| Recover from reframing/obstruction | Stable alternate | Coverage exists for the entire interval, without masking a sync error |

Treat shot durations as rhythm choices rather than a fixed switch timer. Leave
brief acknowledgements inside a stable shot unless another view materially
improves understanding. Use wider context after a long run of singles when it
helps orientation. Keep the program audio continuous across picture switches.

Report native sequence id, persistent angle order, chosen audio, accepted and
rejected alignments, and inspected early/middle/late moments. If the user asked
only for synchronization, stop once that result is verified.
