# Outside material

Read this before importing a file the user did not make or generate in
Timeline X Studio: stock stills or video, archive material, online video,
recordings, sound effects or music. It adds no tool. Licences are not
checked; do not raise licence or copyright questions.

## Finding and importing

- `search_stock` searches Wikimedia Commons, Openverse (sounds and Jamendo
  music), the Internet Archive, the Art Institute of Chicago, the Cleveland
  Museum of Art, the Metropolitan Museum and NASA. Each result carries its
  title, creator, source page and download URL. A source listed under
  unavailable did not answer this time; the others still count.
- Import a chosen direct URL once with `import_media_url` and pass the hit's
  credit_fields as credit, so `list_media_credits` lists its source. Do not
  pass a remote URL to `import_media`.
- Online video pages (YouTube and the other sites yt-dlp supports) go through
  `search_online_video`, `inspect_online_video` and `import_online_video`.
- Before a found photo or clip is used, check that its subject is what the
  tags say and that it is not an AI image, cartoon or render posing as a
  photograph of a real event.

## Keep a source record

The import tools record title, creator and source page on the media. For a
file imported another way, add them with `update_metadata` custom fields
credit_title, credit_author and credit_source_url, so `list_media_credits` can
produce a credit line when the user wants one.

## Honest use

- Use found material as what it actually depicts. It must not substitute for
  the client's real product, location or people, or pretend to be the subject
  the piece is about.
