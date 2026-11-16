# Source refusals and their fixes

A refused Motion Graphic source lists every rule it broke, each with a rule
code, the line and column in your own source (modules excluded), and a fix.
Repair all of them before compiling again; do not fix one per round trip.

| Rule | What it refuses | Fix |
|---|---|---|
| MG_BROWSER_GLOBAL | window, document, top, self, location, console… as a free name | Read size and fps with useVideoConfig(), data from item.props. A local with that name is refused too: rename it, for example topValue. Object keys and member fields (style top, item.location) are fine. |
| MG_IMPORT / MG_EXPORT / MG_REQUIRE | import, export, require | Delete them. The helpers are already in scope; shared code goes in a Motion Graphic module. |
| MG_RAW_HTML | dangerouslySetInnerHTML | Build the markup as JSX. |
| MG_DYNAMIC_CODE / MG_PROTOTYPE / MG_REFLECTION | eval, Function, constructor, prototype, Reflect, Proxy | Plain objects, arrays and arrow functions. |
| MG_NETWORK | fetch, WebSocket, Worker… | Motion Graphics are offline: pass data through properties or Library image and audio bindings. |
| MG_DOM_API | Image, Element, Node, Event, getComputedStyle… as free names | Describe the picture as JSX: Img for pictures, Surface for drawn paths. |
| MG_ASYNC | Promise, async, await | Compute everything synchronously from the frame. |
| MG_RANDOM | Math.random() | random("seed-" + i): the same seed gives the same value on every frame. |
| MG_CLOCK | Date, performance, setTimeout, requestAnimationFrame | Derive time from useCurrentFrame() and fps. Show a date by passing it in as a text property. |
| MG_MUTABLE_BINDING | let, var | const, with ?: or a helper function for alternatives. |
| MG_MUTATION | ++, --, +=, … | A new const value, or reduce(). |
| MG_MEMBER_ASSIGNMENT / MG_INDEX_ASSIGNMENT | obj.key = v, list[i] = v | Spread a new object; map() or with() for a new array. |
| MG_COLLECTION_MUTATION | push, splice, sort, reverse, fill, set, add, delete on an existing value | toSorted(), toReversed(), toSpliced(), concat(), [...list, x], new Map(entries). Allowed because the value is new: Array(n).fill(v) and an array literal such as [...list].sort(...). |
| MG_OBJECT_MUTATION | Object.assign, defineProperty… | Merge with spread: { ...a, ...b }. |
| MG_LOOP | for, while, do | Array.from({length: n}, (_, i) => …) or list.map(…). |
| MG_MEDIA_COMPONENT | Video, Audio | Place media as Timeline layers; react to sound through an audio property and useAudio(). |
| MG_STATEFUL_HOOK | useState, useEffect, useMemo, useRef… | Derive every value from useCurrentFrame() and the props on each render. |

Easing note: graphics created from 2026-11-14 on use the Remotion curves
(Easing.ease is cubic-bezier 0.42, 0, 1, 1; Easing.elastic eases in, so wrap it
in Easing.out for an overshooting settle). Older graphics keep their original
curves when republished. Use Easing.bezier(...) for an exact curve.
