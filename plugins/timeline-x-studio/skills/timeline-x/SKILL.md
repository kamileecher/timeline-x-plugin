---
name: timeline-x
description: "Drive the complete Timeline X Studio workflow over MCP: projects and templates, timeline editing, captions and voiceover, Motion Graphic authoring and instance props, export, app settings, and workspace panels."
---

# Driving Timeline X Studio

Timeline X Studio is a desktop video editor; you operate it over MCP while the user
watches the same project live in the app. Every mutation you commit lands in
their undo history and on their screen. Each tool's own description carries its
full contract — this skill covers only what no single tool can: how a session
should go.

## Intent and authority

Identify the requested outcome before inspecting or changing the project:

- Writing, reviewing, or revising a logline, treatment, beat sheet, screenplay,
  dialogue, character/world bible, or shot list is a chat deliverable. It does
  not authorize a project mutation or media generation.
- Planning in the project authorizes `set_scene_plan` only when the user asks
  to save or apply the plan. Drafting a plan in chat does not.
- Editing or generating authorizes only the requested project work. Full-film
  generation needs an explicit production request or an approved Production
  Brief.

The current user request defines scope. Explicit editor targets, attached
references, and composer selections constrain that scope; an approved brief
governs its named production; active skills provide methods. A selected skill,
model, voice, or MCP connection is not an extra task. Use only the skills and
options relevant to the request, and preserve explicit structure, language,
duration, ending, target, and delivery choices over defaults.

## Names

Name what you create by its content; an id, a file stem or a bare kind word
("Motif") is refused. `check_project_health` `naming.unreadable` must be 0.

## Session etiquette

1. Read `project://current` before your first mutation — never write against a
   guessed state.
2. Keep inspection proportional. `project://current` is the full project
   snapshot, so read it directly instead of listing MCP resources merely to
   rediscover known project resource URIs, and do not immediately duplicate it with
   tracks/media/scene-plan reads. Reuse a resource result while the project
   revision is unchanged. Writing-only/story-planning work needs no project
   inspection, and an empty project is valid for a newly authorized generated
   production. Otherwise, if the snapshot has zero duration, an empty media
   pool, and no layers, stop and ask for content; do not fan out, capture frames,
   or run `audit_timeline_quality` on an empty project.
3. Call `checkpoint` before your first edit, so the user has a one-step
   restore point.
4. A small change (a handful of tool calls) needs no more ceremony than that:
   edit, verify, report.
5. A batch job (rough-cutting a video, a silence sweep, building a caption
   track) is different: ASK the user whether to switch the app into agent mode,
   and call `begin_agent_session` only after they agree. Wrap the batch in
   `lock_history` … `unlock_history`, and rehearse it with `dry_run` first
   where its op set allows.
6. Errors are instructions: Timeline X Studio errors name the cause and list concrete
   options. Pick one; never retry a rejected call verbatim.
7. A commit can also fail because the user (or another agent) edited
   concurrently — re-read the resource and reapply.
8. A requested render is an end-to-end operation: inspect the saved settings,
   choose or override a preset, call the export tool with an explicit absolute
   destination, and report the verified path returned by the editor.

## Working rhythm

Read → analyze → mutate → **verify**: after mutating, re-read the narrow resource
you changed (`project://tracks`, `project://media`, or another relevant view),
and read `project://current` again only when whole-project state is needed.
Confirm the edit landed as intended before reporting it done. `verify_edit_result` proves the exact edit
you just made. Once a complete cut has picture, captions and/or sound, run
`audit_timeline_quality` as the separate post-production gate before export or
before calling the content finished. Fix every blocking issue, rerun it, and
inspect every returned composed frame; timing/state JSON cannot prove visual
meaning or legibility by itself.

Common flows, one line each — parameters and caveats live in the tool
descriptions:

- Any cut, trim, tighten or delete: [surgical edits](references/surgical-editing.md).
- Make a short clip last longer: `loop_layer` with the Timeline time where it
  should end. It leaves one compound clip of repeats; do not duplicate the
  clip by hand. A source whose last frame does not match its first jumps at
  every repeat in the default mode. `mode: "crossfade"` dissolves each repeat
  into the next (moving subjects ghost for that moment); `mode: "ping-pong"`
  plays every second repeat backwards, which suits smoke, water or fire and
  looks wrong for walking or anything with a direction. For a loop with no
  trace, `generate_seamless_loop` on the clip: it generates a new source from
  the clip's first frame that ends on that frame (a paid generation; say so
  first), puts it in the clip's place and repeats it to the end time you give.
  Describe the motion in its prompt; the model must accept a first and a last
  frame.
- Captions: `transcribe_clip` → inspect the returned SRT → `apply_subtitles`
  (also `/auto-caption`) → `list_caption_templates` →
  `apply_caption_template`. Use `update_caption` for one cue's text, timing and
  style in one undo step, or `restyle_captions` for precise corpus/track/cue
  typography and safe 3×3 placement. Re-read `project://tracks` after styling
  and verify the caption position and wrap width against the composition.
- Motion: `list_motion_presets` → `apply_motion_preset` on a visual layer
  (VideoClip, ImageOverlay, Text, Motif). Typewriter, karaoke, and kinetic
  (per-word slam) live on the text-fx Motif, not this catalog. Transcript
  cues use `apply_caption_template` kinetic-slam: that writes `intro Kinetic`
  and the renderer pops each word on its own slam window. For a standalone
  overlay title, `add_motif` text-fx with effect kinetic.
- Text-based picture/sound cutting: `transcribe_clip` → choose word ids and
  timeline-absolute spans → `preview_transcript_cut` →
  `apply_transcript_cut`. Copy the returned revision and expected-layer guard;
  keep the default linked-A/V ripple unless the user explicitly wants every
  unlocked track and marker rippled. One apply call may carry multiple disjoint
  ranges and records one undo step. Re-read `project://tracks` after applying.
- Voiceover and newly generated music: follow the
  [voiceover](../timeline-x-voiceover/SKILL.md) and
  [music](../timeline-x-music/SKILL.md) workflows for saved Audio and Music
  Settings, the selected backend, the current transport, job completion, and
  placement. Reuse approval already given for the current production scope.
  Respect the returned receipt's import and placement state; never duplicate
  a registered or placed result with `import_media` or `add_audio_layer`.
  Imported music, SFX, or existing voice audio:
  `import_media` then `add_audio_layer` with mix role music / sfx /
  voiceover / dialogue. Mixing is by role, not a reserved Music track. Omit
  track_id to land on a free audio lane (or a new track). To lower music under
  speech, stage `auto_duck_audio`; it authors real gain keyframes and fails if a
  target already has automation, so stage `clear_keyframes` first only when the
  user intends to replace that curve. For clip peak normalization, call
  `analyze_audio_level`, then feed its normalization fields to the stageable
  `normalize_audio_peak`; do not describe its sample-peak/RMS result as true
  peak or LUFS. Read `composition://meter` for the live master level and use
  export loudness normalization for the delivery target.
- Rough cut: `analyze_clip` or `auto_split_by_shot`, then trim and delete
  segments.
- Cut/B-roll review: `inspect_visible_shots` is the bounded fast contact-sheet
  check; `inspect_timeline_frames` is the exhaustive frame-grid check.
  `find_similar_shots` ranks only visual signals (luma/motion/sharpness/event
  flags) among placed VideoClip shots, not semantic identity. Combine it with
  `describe_clip` for meaning and `search_stock` when the project has no fitting
  source. Stage B-roll placement in `begin_edit_session`, review it, ask for
  approval, then apply and run `verify_edit_result`.
- Timeline organization: use `update_track_flags` for the same enable/lock
  controls as the track header, `move_layers_to_new_track` for an atomic lane
  extraction, and `separate_audio_to_new_track` for a single audio clip. Use
  `add_text_layer` for a plain editable title; use `add_motif` when the title is
  a designed Motion Graphic.
- Color match and look review: call `get_color_grade` on the reference and
  target before writing, then stage `apply_color_grade`. Use merge for normal
  adjustments; it preserves effect identity and refuses duplicate or animated
  authored components. Use replace only when the user intends to discard that
  existing grade, and reset only when they intend to remove it. Omit the target
  list only for a deliberate project-wide grade. For per-clip partial
  acceptance, stage one grade operation per clip in the same edit session so
  the review card can accept or reject each independently. The returned
  processing space is display-gamma; never describe temperature/tint as a
  scene-linear white-balance measurement.
- Proxy diagnosis: call `get_proxy_status` before changing anything. Use
  `set_proxy_preference` only for preview intent; it never changes export
  routing and is intentionally outside undo/review. If status reports a missing
  derivative, call `generate_proxy` with quick for smooth preview, full for an
  export master/recovery, or both when both are actually needed. Generation is
  asynchronous I/O: wait for the returned job-complete event kind, re-read
  status, and never claim readiness from a queued response alone. A bypass
  route already uses its original and needs no proxy.
- Media organization and review: use `query_media` as a live smart bin for
  used/unused sources, search, tags, rating and status; use `get_metadata` when
  you need the technical evidence and editorial fields for specific media,
  layers or markers. Write only through `update_metadata`. Prefer merge for
  normal tagging, replace only when the user wants the rest cleared, and clear
  only for an explicit reset. Technical codec/path/duration/hash/proxy facts are
  intentionally read-only. For target-level review and partial acceptance,
  stage one `update_metadata` operation per target in an edit session; a single
  heterogeneous batch is atomic and therefore accepted or rejected together.
- Project search, reveal, and recovery: use `find_project_items` for exact
  Media/Track/Layer/Effect/Transition/Marker ids, then
  `reveal_project_items` to open/scroll/select them without mouse coordinates.
  For missing files, run `check_project_health`, preview `auto_relink_media`,
  show every exact match and ambiguity, and ask for approval before applying.
  Use `relink_media` for one user-selected candidate. Relink only accepts exact
  BLAKE3 content identity; never guess from a filename, and do not put this
  technical writeback in an editorial edit session.
- Timeline interchange: choose CMX only for a one-track cut list; use OTIO for
  the richest general handoff and FCPXML for FCPXML-based editors. Read every export
  warning and send `allow_lossy=true` only after the user accepts the named
  omission or rate conform. Import is always preview-first:
  `preview_edl_import`, `preview_otio_import`, or `preview_fcpxml_import`, then
  inspect tracks, source/timeline ranges, speed, markers, transitions,
  destination mapping and warnings before staging the matching import. OTIO and
  FCPXML previews can return the needs-relink state without failing: copy each
  returned reference key into the media map, choose the correct Library media
  UUID from its evidence/candidates, and preview again until ready; never guess
  a relink. Use the track map only to conform onto known unlocked lanes, otherwise
  let import create named tracks. Stage the ready import so its multi-track
  ghost diff and receipt can be reviewed; use `dry_run` for batch rehearsal.
  For CMX, keep `record_origin=first_event` for conventional 01-hour record time
  unless absolute time was explicitly requested. CMX drop-frame remains a hard
  refusal; OTIO/FCPXML rate conversion is a disclosed lossy conform.
- Professional trim and gap review: use `find_gaps` and `match_frame` to
  inspect before writing. Direct single edits use `ripple_trim_layer`,
  `roll_edit`, `slip_layer`, `slide_layer`, `close_gap`, or
  `close_all_gaps`. For an AI-designed multi-step change, call
  `begin_edit_session`, give its edit-session id to every mutation, then
  `review_edit_session` and `apply_edit_session`; the review card supplies
  per-operation selection, summary, receipt and timeline ghost diff. Prefer
  lane ripple. Use all-unlocked scope only when the user explicitly wants the
  whole sequence and its markers to move. Roll/slide refuse grouped clips by
  default; stage the linked picture and sound edits together instead of
  silently breaking sync.
- Project lifecycle: `list_recent_projects` → `open_project`, or
  `list_project_templates` → `create_project`. Use `apply_project_template`
  only when the user wants to change the current project's canvas; on an empty
  timeline it also adds a Music track. Use `save_project` when they explicitly
  request an immediate save.
- Project canvas and framing: `list_canvas_presets` → `set_project_canvas` →
  `fit_canvas_view` → `get_project_canvas`. Prefer a shared preset when it
  matches the requested platform; otherwise send the exact even dimensions.
  The canvas tool smart-fits every existing visual/keyframe path by default;
  choose fill, stretch, explicit alignment, or no reframe only when the edit calls for it.
  Verify both the authoritative composition and the live displayed-frame
  measurement. Frame an individual visual with `frame_layer_to_canvas` or, for talking-head /
  B-roll layouts, `set_shot_treatment` (full, punch-in, corner PiP, split), then
  re-read `project://tracks`. Place speaker footage with `add_video_layer` role
  a-roll and cutaways with role b-roll; retag later with `set_clip_role`.
  Audio mix roles (dialogue / voiceover / music / sfx) are `set_clip_role`
  on the audio layer, not a track. Use `set_canvas_view` only for viewer zoom/pan — it
  never changes export — and finish every project-changing workflow with
  `verify_edit_result`. Give exact layer/range/property/coverage/stacking
  expectations and inspect all fresh composed frames it returns; JSON alone is
  not visual proof. Use `capture_canvas_frame` only for intermediate diagnosis.
  To judge motion rather than one instant (easing, overshoot, a transition, a
  click ripple, word-by-word captions), use `capture_canvas_strip`: consecutive
  composed frames from `t_start_us` in one image.
  A failed or stale verification must be fixed and re-run before reporting
  completion. When the edit is a finished sequence rather than one isolated
  transform, follow it with `audit_timeline_quality` to check caption safety and
  reading speed, visual gaps/fill, layer occlusion, A/V pairing, transcript
  alignment and waveform-backed audio balance across the complete cut. Use lower-level
  `update_layer_params` or keyframe tools only for a transform the framing tool
  cannot express.
- Cut plan: for a normal edit, when the user authorized applying or building a
  cut, read `project://scene-plan`. If it is empty, call `set_scene_plan` with a thesis
  and ordered scenes (`S01`, `S02`, timeline range, beat, place) before placing
  Motifs, B-roll, captions, or music. A screenplay or plan requested only in
  chat must not be written into the project. Then use `add_motif`,
  `add_video_layer`, `add_audio_layer`, `set_clip_role`, `set_shot_treatment`, and `search_stock`
  only on the scene that named that overlay. Re-read `project://scene-plan`
  after writing it. This plan does not create markers. If a full-film
  FilmManifest exists or is being created, follow its approval workflow instead;
  only storyboard approval may derive the scene plan, so do not call
  `set_scene_plan` separately.
- Film look and platform delivery: `list_look_packs` → `apply_look_pack` to
  restyle captions and grade picture; its picture stage uses the same atomic
  grade mutation as direct Agent edits. `list_platform_outputs` →
  `apply_platform_output` to reframe the same cut for YouTube 16:9 or 4K,
  Reels/Douyin 9:16, Xiaohongshu 3:4, or square 1:1 and set the named export.
  Named cuts: `list_transition_presets` then
  `add_transition`. Stock B-roll: `search_stock`, download locally,
  `import_media`.
- Export: `get_export_settings` and `list_export_presets` → optional
  `set_export_settings` → `export_project`. Use `export_delivery_batch` for
  several named deliveries; presets retain the current project canvas/aspect,
  so reframe a separate platform output before claiming another ratio. Prefer
  automatic versioning when a destination may already exist; overwrite only
  when the user explicitly asks. Finish with `inspect_export_file` for
  codec/dimensions/FPS/audio and `audit_export_content` for decoded black,
  freeze, silence, clipping-risk, and contact-sheet evidence. Content findings
  can be intentional and require review; decode failures are blockers.
- App preferences: `get_app_settings` → `update_app_settings`. Change only the
  requested keys; omitted keys are preserved.
- Workspace panels: `get_workspace_layout` → `configure_workspace`. Use
  `activate_workspace_profile` to restore a named profile before applying
  smaller live panel changes.

## Generated media

- Enter this workflow only when the user explicitly asked to create or place
  generated media, or approved a Production Brief. A selected generation model
  or skill is a preference, not generation authorization.
- Treat an authorized full-film production as a versioned FilmManifest workflow
  and always image-first. Approve the screenplay explicitly, inventory the
  Library against its visual bible and production shots, then create and verify
  missing recurring concepts followed by chronological first/last/keyframe
  anchors. Write every real Library Image media id into the manifest, obtain
  explicit visual-bible and storyboard approvals, and require
  `ready_for_video=true` before calling Scene Manager. If any image is missing
  or generation is unavailable, stop with the exact manifest issue paths; a
  FilmManifest-backed queue has no text-only fallback and must not be replaced
  by a separate `set_scene_plan`.
- When the user explicitly asks to turn an approved screenplay into storyboard
  panels, scene stills, concepts, or first/last frames, generate only that still
  deliverable. Preserve screenplay order and continuity, use Library placement
  unless Timeline placement was requested, and do not start video generation or
  Scene Manager afterward.
- Treat the timeline as the source of truth for a generated-visual batch. Read
  `project://current` once, then only transcript/caption evidence not already in
  that snapshot. Choose non-redundant visual slots at
  narrative beats, shot changes, or genuine coverage gaps; sort the complete
  slot list by timeline start, then number it S001, S002, ... before generating.
- Slot priority is deterministic: first a new spoken idea or marked scene,
  second an uncovered interval that needs B-roll, third a deliberate visual
  reset after a long unchanged shot. Merge adjacent slots that communicate the
  same idea, avoid covering an important on-screen action, and never order by
  generation completion time. Timeline start wins; sequence breaks ties.
- Immediately before **each** built-in image-generation call, call
  `plan_generated_image` once. Supply the chronological sequence, a short
  content-specific scene title, the timeline context (what is said/happening
  there and why the visual supports it), the complete visual prompt, purpose,
  and the exact timeline range/target track. Generate that one image and wait
  for it to finish before planning the next; plan→generate is a strict pair.
- With `placement: "timeline"`, the host names the result from your scene
  title (`S01 · <title> · V01`), imports it, and places it on the planned
  track/range. Do not call `import_media` or `add_video_layer` again for it.
- With `placement: "media-pool"`, the host names and imports it but does not
  edit the timeline. Use this when the user asked only to create an asset.
  Never guess a timeline time from prose.
- After every generated image, re-read `project://media` and, for timeline
  placement, `project://tracks`. Verify the meaningful name, intended range,
  and order before proceeding to the next scene. After the final generated
  visual and any captions/voiceover have landed, call `audit_timeline_quality`
  over the finished range; generation metadata proves intended placement, and
  its returned composed frames are the check for actual crop/stacking.
- A local media file created by any other tool is not assumed to be registered:
  call `import_media` exactly once, then verify it in `project://media`.

## Motifs (animated overlays)

To author or update a Motif, follow the dedicated
`timeline-x-motion-graphics` skill when it is active. Its central rendering
law applies even without that skill: visible state must be a deterministic
function of `t`, never an accumulation. Then:

1. `list_motifs`, and read the closest existing Motif with `get_motif_source`
   — base your draft on what already renders correctly.
2. `write_motif_draft` (set `from` when your draft updates an existing Motif).
3. **The user approves, not you.** Place the draft with `add_motif`, ask the
   user to play it in the app, and call `install_motif` only after they
   confirm. If you can read images, pre-check with `preview_motif_draft` at
   three timestamps (start, middle, near the end) and once with non-default
   props before involving the user — their confirmation is still the gate.
4. After installing, remove the trial layer unless the user wants it kept.

For a placed Motion Graphic, call `list_motifs` first so the installed manifest
is current, then use `update_motif_instance`. Prefer the built-in lower-third,
KPI, steps, and comparison templates before authoring a new draft. Its instance
properties are merged and checked against that manifest before the timeline
changes; invalid property names, types, colors, enums, or ranges are rejected
atomically while the layer timing and effects remain intact.
