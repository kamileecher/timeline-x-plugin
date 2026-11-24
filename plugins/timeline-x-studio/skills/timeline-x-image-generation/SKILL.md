---
name: timeline-x-image-generation
description: "Plan and generate still images for Timeline X Studio, including screenplay storyboards, scene stills, concepts, first/last frames, timeline visuals, and safe regeneration with deterministic ordering and verification."
---

# Timeline X Studio Image Generation

Use this skill when the active Agent provider can generate images and the user
wants a new still, B-roll image, background, illustration, thumbnail element,
storyboard panel, scene still, character/location concept, first/last frame, or
a revision of an existing generated still.

For prompt construction, reference roles, revisions or transparency, read
[Visual intent and editing](references/visual-intent-and-editing.md) only for
the relevant operation. Use the live host recipe and the active provider's
capabilities; a model name in a reference is not evidence of supported inputs.
For a look, light direction, style references, or the generic-image check, read
[Look and light](references/look-and-light.md). When the user names a style, an era or a studio, or asks for style options, read the [style library](references/style-library.md).

## Screenplay visualization

An explicit request to turn a screenplay into visuals authorizes still images
only. It does not authorize `generate_video`, Scene Manager, voice generation,
or Timeline placement. Preserve the approved screenplay and distinguish:

- storyboards for chronological shot clarity and edit logic;
- polished scene stills for selected dramatic beats;
- concept images for recurring character, wardrobe, prop, and location design;
- first/last frames as still endpoints for a later, separately authorized video.

An approved full-film Production Brief may also authorize prerequisite stills
included in its estimate. In that production mode, first inventory the Library,
generate only the missing recurring character/location/prop/style concepts,
then generate the missing chronological shot anchors. Keep them in the Library,
verify each result and its media id, then write those ids into the current
`project://film-manifest` with `set_film_manifest`. Preserve the approved
screenplay while doing so. Present the completed visual bible and still set,
approve the visual-bible gate once it validates, and return control to the
video workflow once that gate passes and every required reference is ready. If the provider
or authorization is missing, report the exact manifest issue paths; never let
the video workflow silently replace them with text-only shots.

For Library-only visual development, use the approved screenplay order as the
source of truth. Read `project://current` for the exact canvas, but do not read
tracks or invent scene timing merely to create assets. Use media-pool placement
with null Timeline fields. For images explicitly requested in the edit, use the
Scene Plan and the timeline-first workflow below.

## Timeline-first planning

Treat a request for Timeline images as an edited scene sequence, not a
storyboard/contact sheet. Read the approved subject and existing narration;
derive slots from actual speech timing rather than invented equal intervals.
If timing is unavailable, transcribe the existing speech before assigning slots.
For a multi-scene sequence without a FilmManifest, persist those slots through
`set_scene_plan` before production so final delivery can be checked against
them. With a FilmManifest, use its approved scene-plan projection and preserve
the existing human approval gates. Speech belongs to the voiceover/narration
audio role; do not classify it as music or guess a role from its track name.
Preserve the current canvas, unrelated content and audio settings. Use separate
full-frame images without panels, timecodes or generated captions unless those
are explicitly requested. A storyboard-only request remains Library visual
development and does not imply Timeline placement.

1. Read `project://current`, `project://tracks`, `project://media`, and
   `project://scene-plan`. Select only narrative beats or real coverage gaps
   that benefit from a still.
2. Sort every intended slot by `t_start_us` before generation and assign
   chronological sequence numbers. Merge adjacent slots that communicate the
   same idea; do not cover important on-screen action.
3. Treat the project canvas as authoritative; never resize it to match generated
   media. Copy its exact pixel width, pixel height, reduced aspect ratio, and
   orientation from `project://current`.
4. For each image, write one complete prompt describing subject, action,
   setting, composition, camera/framing, light, palette, style, continuity, the
   exact target pixels, reduced aspect ratio, orientation, edge-to-edge layout,
   and safe placement of essential subjects. Keep text that must render exactly
   out of the image unless the user explicitly wants generated typography.

## Strict plan → generate pair

- Immediately before each provider image-generation call, call
  `plan_generated_image` exactly once with `sequence`, a content-specific
  `scene_title`, `timeline_context`, the identical complete `visual_prompt`,
  the current canvas_width, canvas_height, and aspect_ratio, `purpose`,
  `placement`, and exact timeline fields. Re-read `project://current` first so a
  canvas change cannot leave a stale target.
- Use the returned compiled_visual_prompt when supplied, so actor-owned scene
  context and output constraints reach image generation. Otherwise send the
  planned `visual_prompt`. Request the exact
  target pixels when supported. Otherwise choose the provider's closest output
  with the same aspect ratio; never silently use a square default.
- For `placement: "timeline"`, supply an existing visual `track_id` plus a
  complete non-overlapping `t_start_us`/`t_end_us` range.
- For a Library-only asset, use `placement: "media-pool"`; timeline fields may
  be null when no future slot is known.
- Generate one image, wait for it to complete, and verify it before planning
  the next. Never plan a batch and then generate out of chronological order.
- The host content-keys provider/model/prompt/output settings. An exact retry
  may return `cached: true` with zero new estimated request cost. Use
  force_regenerate=true only when the user explicitly wants a fresh output,
  together with a stable variant_nonce. Retain that nonce on retries so the
  same variation can be recovered safely.
- Complete the host's review before import or placement. If the result has a
  review_pending_id, use `inspect_generated_image` to inspect the candidate,
  actual references and recipe, then `complete_generated_image_review` with
  concrete observations for every criterion. Hidden or uncertain required
  features fail review. Do not generate again while review is pending. If
  native generation produced a file without a review id, preserve the file and
  recover it through `stage_generated_image` with the original plan; do not
  bypass review with `import_media`.
- Public hosted native images have a separate intake path: transfer the actual
  generated file once through `import_host_file`, refresh Project context, then
  use `stage_generated_image` with its Library media_id and the original plan.
  Inspect and complete the review before Timeline placement. Passing review
  reuses that media and places it once. Use this only when the live public
  schema advertises media_id; the local path-based recovery contract differs.
  Retain the image and report the exact gap on an older public adapter.
- After accepted review, the host names, copies, imports and, when requested,
  places the generated still. A correctly canvas-matched still covers edge to
  edge; a mismatched
  still is fitted safely instead of being destructively cropped. Do not import
  it or add another timeline layer afterward.

## Image Studio runs

Use the `image_studio_*` tools when the user wants Library images made the way
Image Studio makes them: 1-4 variants of one prompt, a preset shape, the
Project design style, a Film shot still or character sheet, or new versions of
an existing Image Studio image (`family_of`). They are Library-only; for a
Timeline slot or an in-place layer revision use the plan → generate pair below.

- Read `image_studio_status` first: it lists models with a personal credential
  and whether an automatic reviewer is configured. `image_studio_estimate` says,
  without sending anything, whether a request can be priced and stays within the
  person's cost limit. Amounts appear only to the person in the approval dialog.
- `image_studio_generate` and `image_studio_restart` open a native approval
  dialog with the price. The call waits for the person; `{started:false}` means
  they declined, so do not retry unprompted. Never describe a run as started or
  paid before the result says so.
- Follow the run with `image_studio_wait` (at most 55 seconds per call) or
  `image_studio_get_job`. Variants with `needs_person_review` wait for the person
  in Image Studio → Review; there is no tool to approve them for the person.
- A `film` target (`shot` with `shot_id` and `frame`, or `character-sheet` with
  `subject_id` and `preset`) is compiled from the FilmManifest without changing
  it. Binding the result to the Film stays in Film Studio.
- To see or operate the window itself, `capture_editor_screen` and
  `control_editor_mouse` accept `window: "image_studio"` when it is open.

## Cutouts

For a subject without its background (a product or a person over another
picture, or inside a Motion Graphic through an image prop), use
`remove_image_background` on a Library still instead of generating a new
image: it runs on this Mac (macOS 14+), costs nothing and adds a transparent
PNG beside the untouched source. Check its subject coverage and look at the
result before using it; a picture without a clear subject keeps little or
nothing.

## Regeneration

To revise an existing generated ImageOverlay while preserving timing,
transforms, effects, fades, grouping, and track, set `replace_layer_id` and
repeat that layer's exact track and range in `plan_generated_image`. Generate
the replacement immediately after the plan. Do not use a generic media swap for
this flow. A user request for a visibly new revision requires
force_regenerate=true or a new stable variant_nonce; otherwise identical
generation inputs intentionally reuse the prior provider bytes.

After every result, re-read `project://media`; re-read `project://tracks` only
for Timeline placement. Verify the meaningful scene name, intended order, and
single registration or placement. For Timeline images, also verify the exact
range and use `capture_canvas_frame` at the slot midpoint to confirm crop, safe
area, and continuity with adjacent shots. After the final image placed into an
edit, run `audit_timeline_quality` across the finished range so generated-plan
placement drift, visual gaps, caption occlusion and picture/sound timing are
checked together rather than scene by scene only.
Verify every planned visual scene has its intended layer and interval. A single
sheet spanning multiple scenes is not evidence of separate scene delivery;
resolve missing-scene errors and inspect any multi-scene still warning before
claiming the requested sequence is complete.

Respect the current turn's image route: an explicitly selected host model uses
`generate_image`; a native-capable Agent without that selection uses native
image generation with the same plan and review gates. A saved external model
does not select it for the current turn. If neither usable route exists,
explain the limitation and use existing user-authorized media instead. Never
claim a generated result or successful review that was not observed.
