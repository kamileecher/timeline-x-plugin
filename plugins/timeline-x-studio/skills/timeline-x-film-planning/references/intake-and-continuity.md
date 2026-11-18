# Intake, pace, and continuity across sessions

Read this when a film, ad, or explainer request starts, when the user approves
a step, and when the work continues in a new conversation. It adds no tool and
authorizes no project edit or paid generation; the approvals of the main skill
and of the production skills still apply.

## Recommend a route by the size of the work

Before the first question, recommend one route and say in a line what each
asks of the user, so the number of approvals is known up front:

| Work | Route | What the user approves |
|---|---|---|
| One clip or one shot | the video-generation skill directly | the prompt and its cost |
| Under about 60 s with a few scenes, Motion Graphics, or an edit of existing footage | a scene plan, a Motion Graphics batch, or the edit itself | usually the draft, then notes |
| About 60 s or more with many scenes, archive or research work, narration across chapters, or a user who asks for the full process | the FilmManifest route | screenplay, visual bible, and storyboard, before any Scene Manager run |

Size picks the route, not purpose: a brand piece of 20 seconds takes the light
route. When the goal is unclear, recommend the lighter route; its beats carry
over if the work grows into a FilmManifest later.

## When the brief already answers everything

When the first message already fixes the events, the copy, the running time,
the aspect, and the deliverable, ask nothing it answers. Restate it as a
short card in one message, keeping the user's own images in their own words,
and start building; the first thing the user reviews is the draft. Ask once,
before building, only about a gap that would change the film, such as a look
the brief never names or a missing logo. If the user says to deliver and stop, do
exactly that.

## Ask in a fixed order

Ask one decision per question. Put the recommended option first with its
reason in a few words, and always leave room for the user's own answer. Skip
every question the brief or an earlier answer already settled; never ask it
again later.

1. **The idea.** Ask for the user's idea as free text first. Once there is
   one, offer two or three readings of that idea, never a different story.
   Invent ideas only when the user asks you to suggest. "You decide" settles a
   look or sound question, never the idea.
2. **Length, format, and medium.** Medium means what the pictures are made
   of: generated video, 3D Studio, Motion Graphics, stills with camera moves,
   or the user's own footage. Settle it before showing look directions,
   because it changes what each direction can promise. Recommend the length
   the story needs and no more; the user's own length always wins.
3. **Look and tone.** Show the directions from
   [visual development](visual-development.md) for the chosen reading and
   medium, then settle tone.
4. **Sound, music, and references.** Ask the sound mode from the
   [craft gates](craft-gates.md). Ask where the music comes from as its own
   question, never folded into another: the user's own track, generated music
   through the music skill, or none. Generated music and narration voices are
   picked by ear: send two or three candidates as separate files and ask once.
   Then ask for references.

For an ad or product piece, take colours, facts, and claims from what the user
already has (website, logo, screenshots, product page) and show what you
derived at the next review instead of asking for colour codes or fact lists;
ask only for what cannot be found.

After the questions, show one defaults block (aspect ratio, frame rate,
length, caption language and style, loudness target, delivery formats) that a
single "ok" accepts and where any line can be changed. Record every decision
with its source: the user, an accepted recommendation, or a default.

## Agree the pace of production

On the FilmManifest route the screenplay, visual-bible, and storyboard
approvals are enforced by the app, and every paid generation keeps its cost
approval; no pace setting skips them. The optional stops in between (the style
frame, key stills, type choice, and a pacing check) are the user's call. Ask
once, together with the screenplay approval: stop at each, or run through to
the draft with the recommended choices and list every choice made beside the
draft so any of them can become a note. Recommend stopping at each when the
renders are long or costly, and running through for short pieces. "Show me
first" brings the stops back; "just finish it" switches to running through.

## Keep the work moving

- An approval is the signal to begin the following step right away, within
  that same turn. Stop a turn only at a question, a delivery, or a background
  job you name with its expected duration.
- Before anything that runs longer than half a minute with nothing yet to
  show, say in one line what is running and roughly how long it takes.
- For a long job, report progress from the job's own state, not a guess:
  `get_scene_queue` for a production queue and `get_media_job` for a media job,
  with done and total and the time left when the job reports it, again around
  halfway. Answer "is it done?" from that state.
- Each option performs only what its label promises; two separate choices get
  two separate questions.

## Keep a resume note at every approval

The project context note carries the work between conversations. At every
approval, after each notes round, and when a film conversation grows long
(around fifteen user messages), read `get_film_context` for target
`project:main` to get the note hash, then save with `set_film_context_note` a
short note with:

- the route and the agreed pace;
- the approvals as the FilmManifest reports them, never as remembered;
- open notes, numbered as in the notes round;
- the next action and what to read for it;
- a decisions table: decision, reason, and who decided (user, accepted
  recommendation, or default).

The note is reference data; approvals live only in the FilmManifest. A new
conversation reads `get_film_context` for `project:main` and `get_film_manifest`
before anything else, then only what the note names, and continues from the
next action. It never relies on remembered chat and never re-asks a settled
question.

## Research a real subject within a limit

Before researching a real person, place, or event, count what the user has and
what `search_stock` finds. When the material is thin, say so at once and offer
the routes: the user's own material, online video found with `search_online_video`, a design-led film (Motion
Graphics, 3D Studio, maps and documents), or a mix. Keep a search round to
about fifteen minutes; a deeper search is the user's decision.

## After the final

Ask about cleanup as its own question once the user accepts the final: find
the Library items no layer uses with `query_media`, list them, and remove them
with `remove_unused_media` only after the user agrees. It removes Library
entries, never files on disk, and the delivered export stays where it was
written.
