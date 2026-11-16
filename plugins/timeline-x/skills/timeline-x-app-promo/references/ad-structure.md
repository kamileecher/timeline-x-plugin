# Structure, identity, and the close of a promo

Read this while planning a promo storyboard, after the specificity test. It
adds no tool. Drawing and placement stay with the Motion Graphics workflow;
narration and music with their own workflows; delivery with the export
workflow.

## Inputs for the first questions

Besides the main skill's list, ask in the same widget for a one-line call to
action and its destination (URL or social handle). Take the brand colours and
fonts from what the user already has (website, logo, style guide, screenshots)
and show what you derived at the next review; ask for colour codes or font
names only when nothing they gave shows them. Ask whether the user has talking-head, selfie, or
narrated screen recordings; those are cut first through the talking-head
workflow.

Ask the sound mode as its own question instead of assuming it: narrator and
music, music and sound only, on-screen text and music, or the user's own. A
promo or explainer usually suits narrator and music. Never add narration
silently.

## Choose the structure by placement

- **Feed ad** (vertical social, short pre-roll; the default for a vertical
  promo): the product and its mark appear within the first two to three seconds,
  on the product or its interface rather than as a floating logo. A
  problem-first opening can do this by showing the problem inside the product's
  own screen. The story follows, and the brand returns at the close.
- **Launch or showcase film** (the brand's own channel or launch page): open on
  details and reveal the whole late. Choose it only when each close detail is
  already recognisable as this brand from its first frame, through its mark,
  silhouette, or signature colour. Generic fragments that only turn out to be
  the product in the last seconds give the viewer no reason to stay.

Name the chosen structure on the storyboard, with the second at which the
product first reads.

## Identity and the one unique thing

- When it matters whose product, place, or person this is, name it on screen
  with a brief label or lower third set in the brand typeface, kept within the
  safe areas and visible for at least 0.6 s plus 0.25 s per word.
- Give the one thing only this product has, taken from the specificity facts,
  a full-frame beat that holds at least 1.5 s.
- Show the result the product gives the viewer rather than its spec sheet.
  Bullet lists of features, inventory counts, or source code are not benefits.
- Let the brand colour dominate, and pick the remaining palette so the product
  stays the clearest thing in frame.
- When the subject is one object in one place, a single continuous move can
  carry the piece: circling it, widening from a close detail until the whole
  object is visible, or travelling through its surroundings until it comes into
  view. The end card may be the only cut.

## Copy in fragments

Break on-screen copy into short pieces interleaved with what the product
does, instead of showing a full sentence at once: a phrase, the action, the
next phrase, the product, then its name. Keep each phrase up for a full read
and let it move very slightly rather than locking still. Put image-only
stretches between phrases, and pair each with no more than a gentle sound.
For a high-energy brief, shorten the gaps.

## The close

Spend the final 2.5–4 s on the end card: brand mark or product name, a single
call to action of at most six words, and the destination address or handle.
Keep it calm enough to read, allowing only a gentle drift or a change of light.
Land the music's resolution on this card, and if there is a brand sound
signature, use it here and nowhere else. Check that the card sits within the
safe areas of every requested aspect.

## Sound and finish

With a narrator, duck the music under every line and place musical accents
between lines, never on top of a word. Keep texture finishes such as grain,
gate weave, film-print curves, or heavy blur off interface and type unless the
user asks for them, because they soften legibility; motion blur on fast moves
is fine.

## Platform notes

- Vertical feed: the opening reads within two seconds, and the piece works with
  the sound off.
- Landscape video platforms: longer holds are acceptable; choose a frame worth
  a thumbnail with `analyze_cover_candidates`.
- Square: compose centre-weighted.

Deliver only the outputs `list_platform_outputs` returns. Some destinations show
the video's first frame as its preview and ignore an uploaded cover, so check
the first frame with `capture_canvas_frame` and make sure it reads rather than
showing a motion blur.

## Gates

Before storyboard approval:

- the storyboard names the structure, the second the product first reads, and
  the full-frame beat for the unique thing;
- every number on screen traces to the brief or the product.

Before delivery:

- a first-time viewer watching muted can name the product or brand and the call
  to action;
- labels, price, call to action, and any legal line read at phone size, with
  contrast measured by `analyze_text_contrast` on the busiest frame (a region
  for text inside a Motion Graphic);
- in every aspect, the end card stays up for 2.5 s or longer and is legible
  on a phone screen;
- on a small phone speaker, each spoken line remains intelligible above the
  music.
  `analyze_mix_loudness` reports levels, but only listening confirms
  intelligibility.
