# Craft gates for short-form writing

Read this for ads, promos, explainers, reels, short films, and narrated pieces
before presenting a script, beat sheet, or storyboard. It complements the
screenplay reference; it adds no tool and authorizes no project edit. For beat
types, pacing, structure by length, or an animatic, read
[rhythm and structure](rhythm-and-structure.md).

## Scale with length

Counts follow the runtime, never a fixed 30-second template.

| Length | Shots or beats | Internal sections |
| --- | --- | --- |
| 15–30 s | 4–8 | none |
| about 60 s | 5–15 | 2–3 |
| 1–3 min | 5–45 | 4–8, each 15–30 s |
| 3–8 min | 15–120 | 8–20, grouped into 3–5 acts |

Pick an average shot length from the tempo and divide the runtime by it:
about 4 s for energetic work, about 6 s for standard, 8–12 s for
contemplative. State the chosen average with the beat list. Longer work can
afford a slower average as long as it speeds up where the plot accelerates.
The visual direction is chosen once whatever the length; only the coverage
multiplies.

## Shots

- Each shot asks the viewer to take in one thing. Budget no less than 0.5 s
  when that thing is a plain shape, and 1.5–3 s when it is unfamiliar.
- Change shot size, angle, or lens at every cut. Repeat a framing only on
  purpose, and mark it as a motif.
- Keep a small lens set per piece, two or three: wide for space and scale,
  normal for everyday scenes, long for isolation and compression.
- Give each shot one camera line: the move, its seconds, its easing, and its
  target, for example "slow push in over 3 s toward the hands".
- Begin each move before the shot's first frame and let it continue through
  the cut, unless the shot is about stillness. Moving the camera itself creates
  parallax; zooming the lens flattens the space.
- Put the brightest, sharpest, most saturated area where the viewer must look.

## The opening

In short-form work the first two seconds move from the first frame and open on
an action: the subject does something and the camera or graphic moves with it.
Titles, logos, and fades come after that action, or not at all. Sound starts
with the picture. A deliberately quiet opening for long-form work is the user's
choice, recorded as such.

## Beats

- Give each beat exactly one action, and make sure it alters what the
  audience sees or hears. Moving the camera does not make a beat by itself;
  assign an idle beat a purpose or remove it.
- Write the ending first. The last image or line decides what must be set up,
  and everything it needs appears in the first third.
- Vary shot lengths. When most shots share one duration, the piece reads as a
  slideshow; plan holds where the image keeps revealing and quicker cuts where
  the action asks for them.

## Words

Ask whether the piece is narrated, text-led, or wordless as its own question;
never add narration silently. A promo or explainer usually suits a narrator
with music, a mood piece music and sound alone.

Narration adds what the picture cannot: contrast, the past, a count, a rule,
an inner voice. Test each narration line against its shot: when it merely
labels what is visible, delete it or turn it toward something the image does
not say. Never spell out the moral; strengthen the image instead.

Budget narration at about four words for every three seconds up to roughly
three minutes: 15 s takes at most about 20 words, 30 s about 40, 60 s about 80.
A narrator-led piece longer than three minutes can run about 110–140 words a
minute, pauses included. Keep one idea per line and lines of nine words or
fewer. On-screen cards hold six words or fewer and stay up for at least
0.6 s, adding a quarter second for each word. Write pauses as numbers, for example 0.6 s between lines
and 1.5 s after the key line.

Run two passes before the user sees the script:

1. Read it aloud at the chosen voice's pace (calm about 2.0–2.5 words a second,
   energetic about 2.6–3.2, storytelling about 1.5–2.0) and rewrite lines that
   trip the tongue or overrun their beat.
2. Cut about 30 percent, three words in ten, and keep the shorter version unless
   meaning breaks. Report the word count before and after.

Then run `check_script_text` on the narration with its `duration_s`, and again
on the on-screen cards with kind on_screen. It catches the mechanical problems
below (dashes, denial frames, run-ups, stock phrases, sales commands, line and
card length, the word budget); address or justify every finding. Judging
whether a line adds what the picture cannot remains your job.

## Phrases to replace

These lines usually say nothing. Replace each with the concrete thing it
stands in for. A character's own line, a quotation, or a brand name may keep
one, with the reason stated.

| English | Türkçe |
| --- | --- |
| the possibilities are endless | olasılıklar sonsuz |
| a journey (as a metaphor) | bir yolculuk (mecaz olarak) |
| imagine… | hayal edin… |
| designed with you in mind | senin için tasarlandı |
| like never before | daha önce hiç olmadığı kadar |
| the future is here | gelecek burada |
| take it to the next level | bir üst seviyeye taşı |
| a game changer | oyunun kurallarını değiştiren |
| unlock your potential | potansiyelini ortaya çıkar |
| seamless, cutting-edge | kusursuz, son teknoloji |
| breathtaking, magical | nefes kesici, büyülü |
| at the heart of… | …in kalbinde |
| redefining the way you… | …şeklini yeniden tanımlıyor |
| let's dive in | hadi başlayalım, derinlere dalalım |

Also rewrite these patterns, which read as generated text:

- Dashes in the piece's own words: no em dash or en dash used as a pause in
  narration or on-screen text. A comma, full stop, colon, or line break says
  how the parts relate. A numeric range such as 1–3 is fine.
- A denial nobody made: "it's not X, it's Y" / "X değil, Y". Say the second
  half on its own.
- Staged run-ups and questions to the viewer: "here's the thing", "peki ya…?",
  "işte tam bu noktada", "gelin birlikte".
- Inflated description: "adeta", "eşsiz", "dans ediyor", "fısıldıyor".
- Strings of three abstract nouns, and a piece with more than a couple of
  exclamation marks.
- Sales commands without content, such as "Hemen keşfet!". A useful call to
  action says what to do, where, and by when.

## First-time viewer check

Then reread the script and plan the way a stranger to the project would:

- every "I", "you", "we", "it", and "this" has exactly one referent;
- each consequence follows from something the audience was shown or told;
- everything the ending needs is already in the piece;
- with the sound off, a viewer can still say what happened in one sentence;
- each line makes sense by itself, and no cut lands before its key word.

Repair a break where it starts and with the smallest change: reorder or
retime first, then add one short line, and rewrite only when neither works.

After the first visual pass, run the one-sentence test: show only the
storyboard page or a contact sheet of the first cut, without the logline, and
ask for one sentence describing what the piece is about. Use an independent
reviewer when one is available, otherwise the user. If that sentence misses the
subject or the turn, fix the missing key image or the excess motion before any
other note.

## Key moments and the ending

- Open on a debt, not a briefing. Motion from the first frame is only the
  floor; viewers stay because the piece now owes them something, such as a
  contradiction, the question stated outright, two to four glimpses of what
  comes later, a puzzling image that pays off later, the central claim, or
  the title.
- Choose two to four anchors and mark them on the beat list, typically the
  central claim, the toughest fact or quotation, the turn, and the final line
  or image. Hold each for its reading time plus 1.5 s, give it a distinct audio
  treatment (music thins out, a single low hit or sustained note, a decay), and
  quiet everything near it: nothing new starts moving and no other text
  competes.
- Put the central claim and the final line to the user as separate
  questions, each with two or three versions that change the verb or the
  attitude; the chosen wording is where the piece stands.
- Ask how the piece should end instead of falling back on a default. Whatever
  the choice, it must connect to the opening's question by resolving it,
  twisting it, or pointedly leaving it unresolved. Credits and sources belong
  in the post description rather than running over the final image.
- After the last spoken line, leave room for the ending to land: at least
  2 s for a piece of a minute or less, about 4 s for one of up to three
  minutes, and 6–10 s beyond that. If the runtime is tight, trim earlier lines; do not compress the ending.

## World test for story pieces

Product and brand pieces take the full specificity and competitor swap test
in the app-promo or UGC-ad workflow. A narrative or cinematic piece takes a
lighter version: draw images and sounds from the particular setting of this
story, its materials, props, surfaces, tools, and noises, and reject a look or
sound idea that could belong to any other story.

## Present the script

Show the user, in this order: the logline; one line on why this angle; the
turn as "Before: … / After: …", or the lasting impression it aims for; the
ending; and the beat list with times and beat types. Then the lines as a table with
start time, line, word count, estimated seconds (words divided by the voice's
pace, replaced by a measured temp read when one exists), the shot under it,
and what it adds that the picture cannot. Add the on-screen text with its time
on screen, the key moments, and scripted silences with length and reason.
Close with the total words against the budget, the word count before and after
the 30 percent cut, and the first-time viewer notes. A wordless piece says so
and names the one sound that returns, changed.
