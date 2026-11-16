---
name: timeline-x-speech-inserts
description: "Turn the speech in a marked Timeline range into animated Motion Graphic inserts: read the range evidence, plan scenes that match what is said, author them as Motifs, pass each through the frame gate and stage the placement in an edit session for the user's approval."
---

# Timeline X Studio Speech Inserts

Use this workflow when the user asks for animation from speech, explainer
inserts, or "Konuşmadan Animasyon" over a marked in/out range. The range dialog
sends a request that already names the range, canvas, look, mode, scene length
and an optional note; treat those as the brief.

Read [scene techniques](references/scene-techniques.md) before planning. It maps
what is said to a picture and lists the layout rules for each mode.

## Order of operations

1. Call `speech_insert_context` once with the range. Keep its canvas format,
   safe-area margins, placement guidance, caption lanes and subject side. Treat
   its warnings as facts to work around, not errors to retry.
2. Call `transcribe_clip` on the first listed speech layer with word timestamps.
   Use only words whose spans fall inside the range. If there is no speech,
   stop and say so; never invent narration.
3. Read `get_project_design_style` when the look is the Project style.
4. Plan scenes that cover the range back to back, each between the requested
   scene lengths and never longer than 15 seconds. Each scene has one idea,
   a technique, a mode (fullscreen or overlay) and the words it reveals on.
   Share the plan as a short numbered list and continue.
5. Author every scene at the exact canvas size. Use one
   `create_motion_graphics_batch_from_code` call for two or more scenes, or
   `create_motion_graphic_from_code` for a single scene. Reveal text and shapes
   on the spoken words, relative to the scene start.
6. Run `check_speech_insert_frames` for every scene with its duration, the time
   of its last reveal as the usual still, and the scene mode. Pass
   bleeds_off_edges=true only for a look that crops at the edge on purpose.
   - passed=false: rewrite that scene with `update_motion_graphic_from_code`
     and check it again. Fix haze, format_mismatch and empty findings; at most
     two rewrites per scene, then report what remains.
   - edge_cut and safe_area are warnings: fix them unless the look bleeds on
     purpose or the content is a deliberate full-bleed band.
   - Show the user the returned review still of each scene with its number.
7. Call `begin_edit_session`, then place every scene with `add_motif` and the
   edit session id: for a batch, copy each planned instance's batch id, segment
   id, motif id, start, frame duration, props and project guard exactly. Follow
   the placement guidance from step 1 so all scenes share one track above the
   picture. Finish with `review_edit_session` and stop.

Never call `apply_edit_session` yourself. The user approves in the review card;
one undo removes the whole set.

## Redoing one scene

When the user asks to change one scene ("3. sahneyi sade yap"), rewrite only
that Motif with `update_motion_graphic_from_code`, run
`check_speech_insert_frames` on it, show the new still and leave the other
scenes untouched. If the proposal was already applied, the update rebinds the
placed instance; otherwise stage the session again.

## Boundaries

- Motifs are offline and import-free: no network, fonts from the system set,
  no WebGL or 3D libraries. A 3D metaphor is drawn as 2.5D SVG (layered
  planes, isometric faces, parallax), never a real 3D scene.
- Overlay scenes keep a fully transparent background outside their content.
  A faint full-frame tint reads as haze over the speaker.
- Keep caption lanes listed by `speech_insert_context` clear: avoid the lower
  band in overlay scenes while captions are present. Captions burned into the
  footage are not caption lanes; look at one frame with
  `inspect_timeline_frames` and keep a lower-band overlay above them.
- These inserts never change the speech, its timing or the existing edit.
