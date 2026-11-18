---
name: timeline-x-archive-research
description: Research a documentary, history or explainer topic across online video and open archives, pick licensed footage by its transcript and chapters, import only the needed sections with credits, and build a sourced story in Timeline X Studio.
---

# Timeline X Studio Archive Research

Use this skill when the user wants a documentary, history piece, news
explainer or any story told with real footage found online: "find archive
footage about…", "make a documentary from real videos", "belgesel hazırla",
"arşiv görüntüleriyle anlat". Do not use it for footage the user already has
on disk (media import) or for generated video.

## Ground rules

- Material that appears in the edit must be openly licensed (CC0, public
  domain, CC BY, CC BY-SA) or the user's own. `import_online_video` refuses
  anything else; set rights_confirmed only after the user has said in this
  conversation that they own or licensed that specific video. Never pass it to
  get past a refusal.
- Copyrighted videos may still be watched for research: read their
  description, chapters and transcript with `inspect_online_video` to learn
  facts, dates and names. Do not import them.
- A Creative Commons mark is the uploader's claim. Read every caution
  `inspect_online_video` returns. Prefer the original author's channel
  (museum, broadcaster, agency, the band itself) over compilation channels;
  skip a hit whose title or description suggests a re-upload ("full movie",
  "all credits to", "no copyright intended").
- Facts in the narration come from sources you can name: the transcripts you
  read, the source pages, or the user. Do not invent dates, numbers or quotes;
  say when something is uncertain.
- Searching and inspecting are free; each import downloads data. Import only
  the sections the story uses.

## 1. Plan the story first

Agree on the topic, length, aspect ratio, language and tone with the user
(or take them from the request). Write a beat list: for each beat, the claim
it makes and the picture it needs ("1453: cannons at the land walls",
"today: the walls from the air"). Persist the beats with `set_scene_plan`
when the piece has more than three of them.

## 2. Search wide, per beat

- `search_online_video` with license open (the default) for each beat.
  English and specific terms (place, year, event, "archive footage",
  "newsreel", "1950s") usually find more than a general phrase. Try two or
  three phrasings before giving up on a beat.
- `search_stock` with type video or image covers Wikimedia Commons, the
  Internet Archive and public-domain museum collections, whose licences are
  machine readable. Use it alongside, especially for anything before 1960.
- Use license any only to discover facts, never to source footage.

## 3. Inspect before choosing

For each promising hit call `inspect_online_video` (transcript true when the
video talks about the topic). Use:

- licence class and cautions to accept or drop it;
- chapters and the timed transcript to find the exact seconds where the beat's
  subject is shown or discussed;
- duration, resolution and upload date to judge quality (prefer 720p or more
  for full-frame use).

Keep a short sourcing table for the user: beat, video title, channel, licence,
the section (start–end seconds) and why it fits.

## 4. Import only the sections

`import_online_video` with sections around each chosen moment, a little
wider than needed (2–3 s each side) so the cut has handles. One call can take
up to twelve sections of one video; each becomes its own Library item with the
credit recorded. A video over an hour always needs sections.

After import, `analyze_clip` (semantic) or `index_media_semantics` with
`search_media_semantically` find the precise shot inside a longer section;
look at frames with `inspect_timeline_frames` before relying on a picture.

## 5. Build the piece

- Narration: write short sentences, generate it with `synthesize_speech` in
  the chosen voice, check it with `verify_narration`.
- Picture: full-frame real footage most of the time. Cut on narration pauses,
  keep each shot only as long as it carries its sentence, and add gentle
  movement to stills. Text stays sparse: a place/date line, a name, a short
  quote. Mark archive pictures when the viewer could mistake them for current
  footage.
- Sound: keep useful original sound low under the narration and duck music
  with `apply_speech_ducking`.

## 6. Credits and handoff

`list_media_credits` lists every imported item's title, author, licence and
source page. Put them in an end-credits card or tell the user to paste them in
the description; CC BY-SA material means the finished piece carries CC BY-SA
too, so say so. Hand back the sourcing table, the credits, any beat left
without footage, and anything the user should double-check.

## When something fails

- A bot check or HTTP 429 from the site: wait, reduce the number of calls, or
  continue with `search_stock` sources; never ask for browser cookies.
- No captions: import the section and use `transcribe_clip`.
- No open footage for a beat: say so and offer a still from `search_stock`, a
  map or a simple Motion Graphic instead of a copyrighted clip.
