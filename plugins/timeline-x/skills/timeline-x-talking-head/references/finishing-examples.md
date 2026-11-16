# Finish around the final speech cut

Read this only when the requested edit includes B-roll, graphics, captions, or
music. Stabilize speech timing first. Each addition must support a named
scene-plan beat; the speech transcript supplies meaning and time, while the
composed frame supplies space and legibility.

| Spoken moment | Useful addition | Evidence to preserve |
| --- | --- | --- |
| An object or operation is introduced | The actual object or a relevant process cutaway | The object, action, and audible explanation agree |
| A diagram would clarify a relationship | A compact Motif or a deliberate full-frame diagram | Relationships are accurate and readable |
| A speaker is introduced | One short identity Motif | Correct name/role, clear face and caption band |
| A meaningful gesture or reaction lands | Hold A-roll | The action or emotion remains visible |
| A practical instruction contains a key term | Accurate caption or one selective emphasis | The exact term and complete instruction survive |

## B-roll and graphics in the actual shot

Reuse suitable Library assets before seeking new footage. Inspect the candidate
source and the destination frame. A full-frame cutaway needs enough context and
a crop that preserves the action, readable UI, logos, and product edges. A small
window must remain understandable without covering face, hands, captions, or
other essential information. Choose its area from the shot, not a fixed corner.
If no readable small placement exists, choose a deliberate full-frame beat or
another asset.

Example: while the speaker describes fastening a strap, show the actual hands
and fastening in a cutaway. If the speaker is demonstrating it in A-roll,
retain that shot rather than substituting an unrelated product image. A map
named in speech might work beside the speaker, but a dense interface usually
needs its own larger view.

Use the Motion Graphics skill for authoring and verification. A list, quote,
chapter marker, and diagram need different information structures even when
they share fonts and colors. Place graphics when the idea is introduced, leave
enough settled reading time, and remove them when they no longer help. Keep
captions clear of the graphic; do not repeat every spoken sentence in both.

## Density and spacing

Agree the density with the user before placing graphics, then hold it: light
is about two to four graphics a minute, medium four to seven, dense nearly
every sentence. Short vertical pieces usually sit between medium and dense.

- Time graphics from the transcript of the final cut. Times estimated from a
  caption line are often about 0.2 s off.
- Start a graphic's entrance about 0.2–0.6 s before the word that opens its
  topic so it has settled when the word lands, and never later than about
  0.2 s after that word. Clear it about 0.1–0.5 s before the next graphic
  arrives. Speech inserts keep that skill's own reveal timing.
- Time the key visual change to a sentence's opening or closing word.
- Make one change per spoken beat, about 0.4–1.2 s apart. For a long topic,
  keep one card up and add its points as they are spoken rather than swapping
  cards every few seconds.
- Keep each full-frame cutaway to roughly 3–10 s, and return to the speaker
  for 2 s or more before the next one. Keep cutaways out of the first second
  and off personal or opinion lines, where the face carries the meaning.
- A static card goes dead after about 8 s on screen; past about 15 s it needs
  a staged reveal, its points arriving as they are spoken.
- Reframe the speaker (a punch-in or a move to a side) only in a gap between
  cards, over about 0.5–0.7 s, never while a card is entering or being read.
- A panel over bright footage turns white on white. Put a dark scrim behind
  it, about 55 percent black at the top deepening to about 72 percent at the
  bottom, and give a glass panel a dark base of about 78 percent opacity.
- A transcript's last word can end after the media does: clamp every card end
  to the clip's real end so the piece never closes on black.
- A sound accent on a graphic peaks on the frame the graphic lands; a whoosh
  may lead by two or three frames.
- Every number or claim on screen comes from the speech, the brief, or the
  product. Never invent one to fill a graphic.

## Screen recordings

A punch-in magnifies the capture: a 2× crop needs about twice the delivered
resolution to keep interface text sharp. Check the tightest punch-in with
`capture_canvas_frame` before committing to it. If text softens, widen the
framing or ask for a higher-resolution recording. In a software promo, the
app-promo workflow decides how the interface is staged.

## Audio and captions

Preserve recorded dialogue and useful room tone. Smooth edit boundaries without
flattening emotional pauses or replacing the speaker. If music is requested,
reuse or generate it through the music skill, assign the appropriate audio
roles, and use `auto_duck_audio` for speech clarity. Listen to a spoken passage,
a pause, and the closing after processing; a waveform or successful receipt
does not prove the mix. Match music extent to the actual content end.

Build captions from the final valid timed transcript. Check names, technical
words, punctuation, the longest cue, and cue transitions. Use selective emphasis
for a meaningful phrase, not animation on every word. Caption design must work
with the actual crop and platform safe areas.

Inspect the opening, every new composition, the densest caption/graphic frame,
and the closing. Check that joins remain natural, picture supports speech,
important content survives cropping, and music does not extend delivery. Any
new timing change invalidates earlier captions and visual checks for that range.
