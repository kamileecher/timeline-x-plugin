# Recover transcription without duplicate work

Use this reference only when a transcript cannot be read, appears empty, or a
call failed. The live tool schema and returned error take priority over a
generic retry recipe.

## Reuse and coordinate checks

- Match the media hash/source window, requested language, backend, word-timing
  settings, and transcript revision before reusing text. A transcript for a
  different window or engine is evidence, not proof that this request finished.
- The media transcript resource holds cached source-absolute times; a
  `transcribe_clip` response projects them to the selected layer's current
  timeline. Do not pass raw cached source times to a timeline cut. A repeated
  identical request can reuse the exact cache while returning fresh layer
  geometry and guards.
- On a transport disconnection, inspect the advertised media transcript resource
  before retrying. Existing cached text does not prove the timed-out call
  produced a new result. A supported repeated `transcribe_clip` request can
  report an exact cache hit while returning current timeline geometry.
- After a trim, move, relink, speed change, or transcript revision change,
  discard the old cut plan and obtain current timeline coordinates/guards.

## Choose a recovery from actual evidence

| Observed result | Next step |
| --- | --- |
| Successful analysis with no speech segments | Keep the media usable and report that no speech was detected. Do not fabricate captions or treat this as engine failure. If speech is expected, confirm the audible source range, selected channel, and language before retrying. |
| Text exists with `word_timing: "none"` | Preserve the text and valid segment cues. Block word/filler/pause-cut requests until every required word has finite positive timing. Re-run a configured alignment-capable engine only within the user's authorized provider scope. |
| Missing binary, model, or runtime | Preserve the exact error; direct the user to Settings → Audio and Music. Skill loading and model download are separate from a successful inference test. |
| Missing/invalid provider key | Direct the user to Settings → API Keys for the named provider. Do not move local media to a cloud engine automatically. |
| Explicit timeout, engine exit, extraction, or parse failure | Inspect the named failing stage and cached result. Make at most one retry after a concrete remedy, such as a smaller supported source window or corrected setting; report the repeated failure rather than loop. |
| Payload/window limit | Narrow the requested window within the live schema bounds, record every covered interval, and preserve overlap/context for sentence boundaries. Public clients may advertise tighter limits than the embedded Agent. |
| Pending work without terminal failure | Do not infer failure from one slow response or a fixed duration multiplier. Record observed elapsed time and source duration, inspect the actual status surface when advertised, and avoid duplicate starts. No universal transcription job/wait/reset tool is implied. |

When captions are unexpectedly absent, compare the transcript's source coverage
with the clip's visible source window. Valid speech outside that window should
not be captioned at the clip's start. Do not extend or trim picture simply to
hide this discrepancy.

Finish with the actual backend, cache evidence, covered interval, timing quality,
and unresolved limitation. A cached transcript, installed engine, successful
call, authored captions, and inspected composed cue are distinct milestones.
