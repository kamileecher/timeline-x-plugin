# Find cut candidates and tighten pauses

Read this before proposing pause trims, stutter or retake removals, or a
tighter story from recorded speech. It works on the word spans returned by
`transcribe_clip` and on the guarded cut path in the main skill; it adds no
tool. Detection only proposes. The user decides every removal that changes
what is said.

## Pauses

Measure each gap from the end of one valid word span to the start of the
next. Count an isolated hesitation sound shorter than about 0.1 s, or any
span under 0.05 s, as part of the gap rather than as speech.

- Leave gaps under about 0.55 s alone; they are the speaker's own breathing.
- Shrink a longer gap to a breath, never to zero: the main skill's 200–350 ms
  at a sentence end, toward the upper end after a pause that ran over 2 s, and
  about 150 ms inside a sentence.
- Keep slightly more of that breath after the previous word than before the
  next, roughly 55 to 45, so one thought finishes before the next begins.
- Keep about 0.2 s before the first word and about 0.35 s after the last.
  When this footage opens the piece, remove the lead-in silence entirely so
  the first frame already speaks or moves.

`apply_silence_cut` uses one gap threshold and one padding for every gap and
commits at once, with no preview. Use it only when the user accepts a uniform
tighten. For sentence-aware breaths, compute the gap ranges from the word
spans, send them to `preview_transcript_cut`, check the removed duration and
resulting length, then apply the same request with `apply_transcript_cut`.
A raw single take often loses 15–20 percent at this step; report the actual
figure from the preview. Because the ranges are derived from word timing, not
from audio level, background noise or a music bed leaves them unchanged.

## Candidates for the user's approval

Find the candidates below in the transcript and add the hits from
`detect_fillers` to the same list. Present one numbered list: the time, the
text of both passages, a confidence, and the exact range you would remove.
Nothing on it is cut until the user picks it, and a clean take with no
candidates is a normal result.

| Candidate | Signal | Proposed range |
| --- | --- | --- |
| Stutter | The same word starts twice within about 0.5 s | From the first occurrence's start to the second's start |
| Retake | Two passages say largely the same thing close together | The abandoned attempt with its lead-in, keeping the chosen delivery |
| False start | An attempt shorter than about 6 s restarts within about 12 s | The abandoned attempt only |

To find retakes, break the transcript into passages at pauses longer than
about 0.85 s, or at a sentence end once a passage has run 7–8 s, and cap each
passage near 16 s. Compare only content words: lower case, punctuation
removed, conjunctions and words of one or two letters dropped. Compare
passages that start within about a minute of each other. Mark a pair when
roughly a third of their combined distinct content words are shared, or a
quarter when two of their first four words match. Call it high confidence
from about half shared, medium from a third, and below that "check by ear".

In Turkish and other suffixing languages, compare words by their first five
letters so that "dosyayı" and "dosyanın" count as the same word. An emphatic
repeat such as "çok, çok önemli" looks exactly like a stutter, which is why no
candidate is removed automatically.

Propose the range that keeps the best complete attempt, as speech selection
defines it. When two attempts are equally good, the later one is usually the
speaker's correction.

## Tighten the story

After the pauses and approved candidates, shape the speech around the purpose
fixed in speech selection:

- Tie each scene-plan beat to one transcript sentence: note its first word and
  its timeline time, and give it one visual idea.
- If a point is made twice, retain the more concise and clearer version unless
  the repetition is intentional emphasis.
- Present every meaning-changing removal as its own approval item, never
  folded into a batch of pause trims.
- Keep a decision list for removed sentences: what was removed, why, and who
  approved it. Show it with the preview and include it in the final report.

## Check the joins

After applying, re-transcribe and listen across every join. A clipped breath,
a click, or half a syllable means moving that boundary to the neighbouring
word span and previewing again. `inspect_visible_shots` gives a quick sheet of
the new segment boundaries; look for a jarring jump in head position or
expression. When a jump cut distracts, alternate the framing with
`set_shot_treatment` or cover it with a B-roll beat that supports the words.
Never use a cutaway to hide a change of meaning.
