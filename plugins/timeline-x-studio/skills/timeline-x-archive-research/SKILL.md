---
name: timeline-x-archive-research
description: Research a documentary, history or explainer topic across online video and open archives, pick footage by its transcript and chapters, import only the needed sections with credits, and build a sourced story in Timeline X Studio.
---

# Timeline X Studio Archive Research

Use this skill when the user wants a documentary, history piece, news
explainer or any story told with real footage found online: "find archive
footage about…", "make a documentary from real videos", "belgesel hazırla",
"arşiv görüntüleriyle anlat". Do not use it for footage the user already has
on disk (media import) or for generated video.

## Ground rules

- Licences are not checked: any video the user's topic needs can be searched,
  inspected and imported. Do not raise licence or copyright questions.
- Prefer the original source (museum, broadcaster, agency, the person or band
  itself) over compilation channels for picture quality.
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

Check every claim a beat makes (dates, numbers, names) with `web_search` and
read the best source with `web_scrape` before it reaches the narration; keep
each source URL for the credits. A claim no source confirms is cut or marked
as uncertain.

## 2. Search wide, per beat

- `search_online_video` for each beat (YouTube by default; `source` dailymotion
  or bilibili widens the pool, Bilibili with Chinese terms; their videos rarely
  have captions, so pick sections with `scan_online_video`). `source`
  instagram finds short reels by the words people write in captions (health,
  how-to and local topics in Turkish work well); expect up to 15 hits and
  import a reel whole or with `sections`. English and specific terms (place, year, event, "archive footage",
  "newsreel", "1950s") usually find more than a general phrase. Try two or
  three phrasings before giving up on a beat.
- `search_stock` with type video or image covers Wikimedia Commons, the
  Internet Archive and museum collections. Use it alongside, especially for
  anything before 1960.
- For stills, `search_images` searches the same collections plus the Wellcome
  Collection (medicine, anatomy, science history) and general web images, and
  ranks the pictures by
  how well they match an English description, on this computer. When the user
  gives a picture, look at it, describe it in a few English phrases and call
  `find_similar_images` with those queries to find related pictures online and
  in the Library.
- For plates, maps and drawings from old books (anatomy atlases, travel
  accounts, histories), `search_book_pages` finds digitised books by keywords
  and year range and ranks their pages against the picture description; the
  best pages are usually the illustrations. It takes about a minute for three
  books, so name the books from an earlier result when searching again.

## 3. Inspect before choosing

For each promising hit call `inspect_online_video` (transcript true when the
video talks about the topic). Use:

- the notes, to drop live or unsuitable videos;
- chapters and the timed transcript to find the exact seconds where the beat's
  subject is shown or discussed;
- duration, resolution and upload date to judge quality (prefer 720p or more
  for full-frame use).

Then look before importing: `scan_online_video` with two or three English
picture descriptions of what the beat needs downloads a throwaway 480p copy,
ranks its frames with CLIP and reads burned-in text, and returns text-free
sections plus `import_args`. Prefer sections that both the transcript and the
scan support; small text can still slip through at 480p.

Keep a short sourcing table for the user: beat, video title, channel, the
section (start–end seconds) and why it fits.

## 4. Import only the sections

`import_online_video` with sections around each chosen moment, a little
wider than needed (2–3 s each side) so the cut has handles. One call can take
up to twelve sections of one video; each becomes its own Library item with the
credit recorded. A video over an hour always needs sections.

After import, `analyze_clip` (semantic) or `index_media_semantics` with
`search_media_semantically` find the precise shot inside a longer section;
look at frames with `inspect_timeline_frames` before relying on a picture.

Downloaded footage often carries burned-in text: channel watermarks, site
names, English labels and subtitles. `find_onscreen_text` with media_id scans a
section before you choose the seconds (use its text_free_ranges); after
placing, run it with the layer_ids and fix every text_visible layer by moving
the source in-point into a clean range or applying its framing_hint with
`frame_layer_to_canvas` (mode fill). Check again before export.

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

`list_media_credits` lists every imported item's title, channel and source
page. Put them in an end-credits card when the user wants credits. Hand back the sourcing table, the credits, any beat left
without footage, and anything the user should double-check.

## When something fails

- A bot check or HTTP 429 from the site: wait, reduce the number of calls, or
  continue with `search_stock` sources; never ask for browser cookies or an
  Instagram login. When Instagram search says it stopped early, do not repeat
  it in a loop; try again later or use another source.
- No captions: import the section and use `transcribe_clip`.
- No footage for a beat: say so and offer a still from `search_stock`, a map
  or a simple Motion Graphic.
