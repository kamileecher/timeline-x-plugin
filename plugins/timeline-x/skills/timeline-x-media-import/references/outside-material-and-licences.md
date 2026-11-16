# Outside material and licences

Read this before importing any file the user did not make or generate in
Timeline X Studio: stock stills or video, archive material, recordings, sound
effects or music. It adds no tool and grants no download authority.

## Mood versus material

- Mood references guide the look: light, colour, composition. They can be
  anything the user shares, copyrighted films and images included, but they
  are only studied and never placed in the edit.
- Material is anything that appears in the piece. It must be the user's own
  work, a file they hold a licence for, or openly licensed as CC0, public
  domain, CC BY, or CC BY-SA with attribution.

## Finding and importing

- `search_stock` searches Wikimedia Commons stills and video and returns each
  result's title, credit, licence and download URL. Keep CC0, public domain,
  CC BY and CC BY-SA; drop anything else or unknown. The file's own source page
  is the final word on its licence.
- Import a chosen direct URL once with `import_media_url`; it downloads into
  the project workspace and registers the file. Do not pass a remote URL to
  `import_media`.
- Before a found photo or clip is used, check that its subject is what the tags
  say, that it is not an AI image, cartoon or render posing as a photograph,
  and that no legible brand, logo or screen sits in frame; crop or soften one
  that does.
- For music from open archives, prefer public-domain and CC0 recordings and
  use CC BY only when nothing fits. Accept a recording only when its uploader
  is plausibly its creator; skip well-known or commercial releases that an
  archive lists as public domain.
- When a CC BY track is chosen, tell the user once that the credit must appear
  in the description, and that automated content matching on a platform may
  still claim it if the artist has registered it there. The credit and licence
  link resolve such a claim; CC0 and public-domain recordings avoid it.

## Keep a licence record

Write the record the moment a file arrives, with `update_metadata` on the media
item, in custom fields: the work's title, its creator, the page it came from,
the licence name and link, the required credit line, modifications, date, and where it is used. Read records back
with `get_metadata`. A file without a record stays out of the edit, and so does
a file whose licence cannot be established. Fill in modifications and usage when
the file enters the edit, for example "slowed to half speed, low-passed".

Also record generated voices, music and images (engine, model or voice, date,
the displayed terms) and the user's own recordings and images as own work.

## Credits

- Credits belong in the description, not the frame: no on-image source tags,
  no captions beneath pictures, no closing credit roll. Show a source on screen
  only at the user's request or when it is part of the content itself, such as
  a document shown in the shot.
- CC BY and CC BY-SA need attribution; for a video, the description is a
  reasonable place. CC0 and public-domain items carry no such duty, though
  naming the source is still courteous. Use each source's own credit wording.
- Give the user one credit line for the description, for example
  `Images: "A" by X, CC BY 4.0 · "B", The Met, CC0 · Music: …`, with longer
  lists as more lines or a linked page.

## Honest use

- Use found material only as what it actually depicts. It must not substitute
  for the client's real product, location or people, or pretend to be the
  subject the piece is about. Ask for the real item, make a plainly stylised
  version, or identify the found image as what it is.
- Follow each source's terms on top of the licence: its credit wording, no
  implied endorsement by agencies or museums, and its rate limits.

## Never

- Material marked non-commercial (NC), no-derivatives (ND) or personal use
  only, for anything that will be published.
- Any picture, score, or audio lifted from a copyrighted film appearing in the delivered piece.
- Files from sites that forbid downloading or that sit behind a login.
- Paid services or provider calls without the user's explicit approval.
