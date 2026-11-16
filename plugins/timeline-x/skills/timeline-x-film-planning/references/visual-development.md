# Screenplay-to-Visual Development

## Storyboard-first review

For new film visualization, read `project://film-manifest` and its derived
storyboard_page. Establish stable character and location descriptions first,
then create clean opening/closing panel images as separate Library items and
bind them with `set_film_manifest`. Present Film Studio's Storyboard page for
human visual review before expanding detailed wardrobe, location and prop
references from those panels. Reuse established identity references; incidental
panel details do not overwrite them. The combined review sheet is never a
provider image input. Each panel retains its own Library id and shot identity.
This review does not replace or automatically grant the existing visual-bible
and storyboard approvals; those still require complete validated references.

Read this reference when the user explicitly asks to turn a screenplay,
treatment, or story plan into still images, or when an approved full-film
Production Brief includes missing visual-reference generation as a prerequisite.

## Choose the requested output

- **Storyboard:** chronological shot panels that make staging, framing, action,
  eyelines, screen direction, and edit logic easy to evaluate. Prefer clear,
  consistent panels over standalone poster-like art.
- **Scene stills / key art frames:** a small set of polished images for major
  dramatic beats, tone, pitch, or look approval. Do not create one for every
  line or minor beat.
- **Concept images:** character, wardrobe, prop, creature, vehicle, or location
  exploration used to approve recurring design before shot images.
- **First/last frames:** precise visual endpoints for later image-to-video
  generation. They remain still assets until video production is separately
  requested.

If the request says only “make it visual” and the distinction materially
changes the number or style of images, ask one concise single-choice question.
Otherwise follow the named output literally. Confirm or infer only the missing
image count, aspect ratio, visual finish, and Library-versus-Timeline placement.

## Build the visual list

Use the approved screenplay as the source of truth. Preserve scene order,
causality, character identity, dialogue responsibility, ending, and selected
narrative structure.

1. Break dramatic scenes into only the visual units required by the selected
   output. Storyboards normally need coverage; scene stills normally need one
   defining image per selected beat; concept images are organized by recurring
   subject rather than chronology.
2. Give chronological storyboard/scene images stable S01, S02… identities.
   Keep character/location concepts clearly named but outside story timing.
3. Carry a compact continuity ledger: face/body traits, hair, wardrobe, props,
   physical/emotional state, location geography, eyelines, screen direction,
   time/weather/light, palette, and recurring motifs.
4. State the story purpose of every image. Remove decorative duplicates that
   do not clarify action, continuity, tone, or a decision.
5. In a documentary, explainer, or other narrated piece, give every narrated
   fact a picture of its place: a law its hall, a decision its building, a
   treaty its page, a number its object or the people it counts. For each
   abstract line, find the place where it happens and show that place.
6. Use each image once. A repeated photo, map, or reference signals that the
   sources ran dry; repeat one only as a named callback, such as the opening
   image returning at the end. Black screen is punctuation, under 1 s.

## Set the look before shot images

Read this for full-film visual development, a scene-still set, or any request
whose look is still open. Skip it for a single utility still or when the
approved brief already fixes the look. The user decides; every image below
still follows the generation gates in this reference.

**Offer three directions.** Write three different visual answers to this story,
varied in kind (light, colour, medium, era) rather than three variants of one
idea. Spread them across tone: they should not all be dark or all colourless,
and at least one should be daylit or colourful unless the whole story takes
place at night. A piece that informs gets one direction led by motion design. Each direction has:

- a short name and one sentence on what the viewer sees and why it serves this
  story;
- its light and that light's source;
- a palette of four or five colours, dark to light, accent last;
- texture and grain, lens and camera character, and type if words appear;
- two to four mood references chosen for their light and framing, not their
  topic.

Mark one as recommended with its reason and leave room for the user's own
answer. When the user names a look (a director, studio, film, or era), name the
traits that make it and offer a few readings of it for this idea. A direction
may start from a named style in the
[style library](../../timeline-x-image-generation/references/style-library.md),
which says which medium carries each style and maps the names people use to
styles; keep the three directions in different families. If none of the
three lands, write three new ones from different sources: one from cinema, one
from a craft or material, one from art history or photography.

Mood references come from the user's own Library images, or from openly
licensed stills and artworks found with `search_stock`, kept with their credit
and licence. Copyrighted film stills, FilmGrab frames included, may be linked
for study only; they are never imported, used as provider inputs, or placed in
the piece. No tool composes a direction board or measures a palette from
references: present the directions as text with their references and read
colours by eye. The vocabulary and the generic-image check are in
[look and light](../../timeline-x-image-generation/references/look-and-light.md).

Proof frames, one frame of this story's key moment in each direction, are paid
images: state the count and wait for confirmation as for any batch. A proof
frame that could belong to another piece is not a proof.

**Record the pick** in the visual bible: style as one paragraph, palette as
named colours dark to light with the accent last, and the output style. Rules
that hold everywhere go into global rules, such as the light-source logic, which
finishing treatments are allowed and why, and that stylisation never covers the
subject. Write it through `set_film_manifest` with the current expected
revision; a recorded look grants no approval.

**Make one style frame.** Before shot anchors, long renders, or video, generate
one still of the piece's most important moment at final quality in the chosen
look, through the usual plan and review pair. It becomes the bar for every later
frame. Review it before the user sees it, judging only what is on screen:

- one-second read: within a second, a viewer gets the subject and the one idea
  of the shot;
- squint test: at about 96 px wide the value structure and composition hold;
- phone check: for vertical, square, and 4:5 delivery, a single subject still
  reads on a phone screen;
- surface test: name the texture on the largest surface; "none" or "flat
  colour" means the frame is not finished;
- the generic-image list, then one question: could this frame belong to another
  piece? If so, rebuild it from what only this story has: its subject, its
  place, its light.

Fix up to two rounds yourself, then show it with one line on the look. Offer the
cinematic finishing choices once, here, from the
[finishing guide](../../timeline-x-effects-color/references/finishing-guide.md).

**Stills before anything moves.** Before any paid video or long render, make
stills at the key moments the plan names, each with what it must prove ("the
face reads at 9:16", "the title fits by 3.2 s"). Begin with the opening plus
whichever scene differs most from it, so one approval covers the piece's range. Write findings as
numbers ("the figure fills 6 percent of the frame; it needs about 20"), fix
them, then show. In a piece longer than a minute, take stills from several
chapters and check that they read as one piece; a chapter may shift light and
warmth within the look, never the look itself.

## Show people and creatures in a way that works

This decides how people appear, never what the piece is about. Before offering
interpretations, ask what the viewer must see up close. Realistic faces and
bodies in complex motion (walking, dancing, sport, hands at work) drift most
between generated clips, and native 3D draws them poorly. When the idea leans on
them, recommend a version that preserves the idea and its subject and alters
only the way people are depicted: a stylised cast, silhouettes, figures at a
distance, backs, or hands and objects. Keep the realistic option with its cost in one
line; and if the user still chooses it, support that choice completely.

Design the cast once, before any scene uses it, as a character sheet from
`generate_image`. Check it like a hero still: proportions agree across views,
expressions read at phone size, and colours stand apart from the backgrounds.
Fix a design on the sheet, never inside scenes.

- Two characters side by side should be distinguishable by outline (height,
  build, hairstyle) even in grey, and each main character owns one colour
  nobody else wears.
- Relative heights never change between shots; a child stands about 0.7 the
  height of an adult.
- Below roughly 120 px of figure height a face stops reading; at that size use
  a silhouette or show the back.
- A crowd is a few varied designs in front and silhouettes behind, never one
  design repeated in a row. A creature gets its own shapes, not a person's.

Direct the acting in each prompt: give each beat a single emotion that changes
on its cue; let the gaze move to the next target a few frames ahead of the head
and body; let a big action gather before it happens and settle after it lands;
hold each reaction for half a second to a second.

## Tell a real event with its own material

For a film about a real event, place, or person, decide the picture sources
before any shot image:

- **Real material leads.** Archive photographs, documents, maps, the real
  places, and footage whose licence allows it come first; pictures from
  generation or stock cover only the gaps no real material can fill.
- **Every stock shot belongs to this story.** It shows these people, this era,
  this place, or this object. A shot that would fit just as well into an
  unrelated film gets swapped out or dropped.
- **No uncanny middle.** Pictures made in the app that sit next to real
  footage are either convincingly photographic or plainly designed (maps,
  documents, diagrams, Motion Graphics), never a half-real rendering between
  the two.
- **Imply violence.** Show one telling aftermath image, never bodies, and
  never images of the real victims' deaths.
- **Name the stand-ins.** When a reconstruction stands in for something no
  record shows, keep it visibly designed, and when the user wants it said,
  say it in a caption.

## Prompt each image

Each image prompt should contain:

- stable subject and continuity details;
- the one visible action or state that defines this panel;
- location, time, weather, and prop state;
- shot size, angle, lens feel, composition, eyelines, and screen direction;
- lighting, palette, texture, and the requested storyboard/polished/concept
  finish;
- exact canvas dimensions, aspect ratio, orientation, edge behavior, and safe
  subject placement;
- constraints against unwanted text, logos, identity drift, extra characters,
  or contradictory props.

Do not paste screenplay prose into the prompt. Translate its visible action and
dramatic purpose without inventing a different event. Name the light, lens, and
camera concretely, using the words in
[look and light](../../timeline-x-image-generation/references/look-and-light.md)
and [camera language](../../timeline-x-video-generation/references/camera-and-lens-language.md),
rather than generic quality words.

## Generate without crossing scope

Before a multi-image batch not already covered by an approved estimate, state
the image count and wait for confirmation. Generate and verify images one at a
time in approved order.

For full-film visual preproduction, inventory the Library first. Generate only
the missing recurring concepts, then the missing first/last/reference frames in
production-shot order. A scene frame must preserve the approved concept designs;
it is not a fresh redesign. Keep these prerequisites in the Library and record
their real media ids in `project://film-manifest` for the later video queue.
Preserve the approved screenplay revision, present the completed visual bible
and still set, and stop for explicit visual-bible approval. Scene Manager must
remain blocked until storyboard approval makes the manifest
`ready_for_video=true`.

Use `plan_generated_image` immediately before each image. For a storyboard,
scene-still set, concept set, or first/last frames requested only as assets, use
Library placement and do not invent Timeline ranges. Use Timeline placement
only when the user explicitly asks to add the images to the edit; then use the
approved Scene Plan and exact non-overlapping ranges.

After each result, verify identity, action, framing, continuity, aspect ratio,
and sequence before spending on the next. If one panel fails, revise that panel
instead of regenerating the accepted set. Never call video generation or start
Scene Manager unless the user separately requested video production or approved
the full-film brief that invoked this prerequisite pass; even then, return to
the video workflow only after every required reference has been verified and
the FilmManifest approval gates have passed.
