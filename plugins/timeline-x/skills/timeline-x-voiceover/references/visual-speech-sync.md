# Visual and speech synchronization

Read this for narration over a demo, scene sequence, chart, screen recording,
or an edit whose visuals have been retimed. For original spoken-footage cutting,
use the talking-head and transcription skills instead.

## Build a map from observed visual events

Read current tracks and the Scene Plan. Reuse a prior map only if it refers to
the same source, ranges and current visual state. Inspect uncertain boundaries
with `capture_canvas_frame`; divide by visible changes or story beats rather
than equal intervals. Exact boundaries may need more than a midpoint sample.

Keep a compact table per meaningful beat:

| Visual range and scene | Observed anchor | Spoken text | Placement start | Actual audio duration | Fit or action |
| --- | --- | --- | --- | --- | --- |
| Current scene range | Named screen state, action or subject | Approved meaning | Current visual time | Unknown until synthesis | Fits, revise wording, authorized hold, or unresolved |

Use estimated speaking duration only to identify likely problems before
synthesis. It is not a placement measurement. For named scenes, retain the
Scene Plan title as the take name so Library and Timeline share scene identity.
Several shots supporting one idea can use one continuous take; separate states
needing independent timing should have separate mapped segments.

## Resolve the real duration

Synthesize with the saved speech configuration and intended start. The local
speech tool places the output immediately; verify its actual end at once. If
it extends beyond the visual anchor, preserve the take as recoverable material
while correcting the mismatch. Do not leave an overrun hidden behind a success
message. Public Library-only speech can be checked before adding its layer.

Prefer concise phrasing that keeps names, facts and meaning. A short take may
leave a deliberate pause. A long take may need revised wording or an authorized
visual hold. Do not silently extend a fixed edit, move later scenes, speed the
voice or overwrite meaningful original dialogue to accommodate it.

## Retiming and final coverage

A visual timing change makes affected map rows stale. Re-read those ranges,
move whole approved beat segments through supported Timeline mutations, and
check captions and music with them. Do not move a phrase away from the event it
describes. Preserve the original speech where replacement was not requested.

Inspect each segment's entry, main anchor and exit, and listen for speech that
starts before the event or continues after it disappears. Every requested
explanatory beat should have matching narration or a deliberate reason for
silence. Run `audit_timeline_quality`; disclose missing playback/visual evidence
instead of claiming subjective sync from timestamps alone.
