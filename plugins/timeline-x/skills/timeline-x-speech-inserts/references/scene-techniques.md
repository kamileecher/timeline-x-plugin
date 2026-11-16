# Scene techniques for speech inserts

Pick the technique from what the words carry, not from what looks impressive.
One idea per scene; a scene that tries to show two ideas shows neither.

| What is said | Technique | Mode it usually wants |
| --- | --- | --- |
| A number, percentage, price or growth | Stat or bar/line chart that counts up on the number word | Fullscreen; a single big number can be an overlay |
| A process, steps or a sequence | Step diagram or flow that draws node by node | Fullscreen |
| A comparison, before/after, pros/cons | Two-column comparison that fills side by side | Fullscreen |
| A list of three to five items | Callout list revealing one item per spoken item | Overlay on the free side, or fullscreen |
| An abstract idea or feeling | Visual metaphor drawn as 2.5D SVG (stacked planes, a path, a growing shape) | Fullscreen |
| A strong sentence or quote | Kinetic type of the key phrase, word by word | Fullscreen or a short overlay |
| A name, product or term | Label or lower-third style tag | Overlay |
| A place or a map-like relation | Simplified diagram of the places with a moving marker | Fullscreen |

## Timing

- Each scene starts where the previous one ends; together they cover the range.
- A reveal lands on its word's start time (from the transcript) minus about
  0.15 s, so the picture arrives with the word, not after it.
- Leave the last 0.3 s of a scene for a calm hold or a quick exit; the frame
  gate never samples the final 0.2 s.
- Use the requested scene length; split a scene longer than 15 seconds.

## Mode rules

- **Automatic**: choose per scene. Anything the viewer must read (charts,
  steps, comparisons, lists longer than three items) is fullscreen. A short
  accent (one number, a tag, a two-word phrase) is an overlay.
- **Fullscreen**: an opaque background in the chosen look covers the speaker.
  Keep text inside the safe area from `speech_insert_context`.
- **Overlay**: a transparent background. Put the content on the overlay side
  the context tool returned: left or right of the speaker, or for a centred
  speaker the upper or lower horizontal band away from the face. Keep it
  inside the safe area and clear of the face box it reports.
- When face detection was unavailable, look at one frame with
  `inspect_timeline_frames` before choosing an overlay side.

## Craft

- Muted palettes sit better next to graded footage than saturated ones.
- Text: at most about eight words on screen at once; Turkish glyphs must render
  (ı, İ, ş, ğ, ü, ö, ç) with the system fonts.
- Keep one look across every scene of the range: same palette, type and motion.
- Motion is frame driven and deterministic; ease in and out, avoid jitter.
