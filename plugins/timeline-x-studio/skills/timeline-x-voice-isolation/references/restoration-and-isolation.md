# Native restoration and learned isolation

Read this to choose or undo a speech cleanup method. Confirm speech and inspect
the source first; maximum suppression is not a quality target.

| Observed problem | Available route | Practical limit |
| --- | --- | --- |
| Stable broadband hiss with a noise-only passage | Native DeNoise via `set_audio_restoration` | Authored spectral noise floor; quiet speech may also be reduced |
| Long room tails after speech | Native DeReverb via `set_audio_restoration` | Conservative late-energy suppression; no reconstruction or early-reflection cancellation |
| Harsh sibilants | Native DeEsser via `set_audio_restoration` | High-band attenuation; not phoneme recognition |
| Competing/nonstationary noise requiring a learned speech model | Selected external MCP capability | Must advertise the needed input/output and preservation contract |

Read `list_audio_effects` for current controls and limitations. Capture the
current complete restoration container before editing; stage values are static,
not keyframed. Change only the requested stage while preserving its siblings.
Use the expected-current guard where available so a stale request cannot erase
another edit. Never widen a validated range or invoke an unadvertised runner.

Keep a before/after listening range with voiced speech, quieter syllables,
breaths and pauses. Check intelligibility, pumping, metallic artifacts, tail
changes and loss of meaningful ambience. Do not call a quiet waveform successful
isolation. Levels measured from original source cannot prove processed quality;
listen to treated playback or an actual exported/inspected derivative.

Native treatment keeps the source registration and layer geometry. To bypass
only one stage, retain the others and disable that stage in the complete
container; an empty container bypasses all three. To restore a prior state,
use history/undo or its captured validated settings. Do not re-import media to
remove a parameter effect.

External learned isolation creates a derivative. Retain original media, output
identity and job state; verify source-window coverage before replacing the
Audio layer's media. If the clip is retimed, ensure both duration and source
offset coverage still hold. Do not shift picture or stretch a truncated output
to hide missing speech. Restoring its captured original media and parameters
or undoing that specific edit is distinct from clearing native restoration.

After either route, inspect picture/sound sync and listen in the final mix.
Report parameter application, derivative delivery and audible acceptance as
separate evidence. If playback inspection is unavailable, leave the audible
quality gate open and identify what was structurally verified.
