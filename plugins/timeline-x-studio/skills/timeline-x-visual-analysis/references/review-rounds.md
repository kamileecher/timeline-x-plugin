# Review rounds: an independent look, notes, and diagnosis

Read this when a draft is ready for review, when the user sends notes on a
cut, or when a failed check or reported defect needs a fix. It extends the
coarse-to-fine inspection in the main skill. It adds no tool and authorizes no
edit beyond the user's request; every approval gate of the workflow that owns
the edit still applies.

## A quick independent look

Run this on every draft before you present it, and show its findings beside
the draft; the fixes still wait for the user's pick. Use
evidence that is quick to take: one `inspect_visible_shots` sheet over the
draft, at most three `capture_canvas_frame` stills where the questions need
them, and the latest `audit_timeline_quality` result. You cannot hear the mix:
judge sound only from measurements such as `analyze_mix_loudness`, and say so.

Work through six checks, giving each a timecode and a one-sentence finding:

1. Opening: is the subject already doing something before the two-second mark? If not, what action would fix it?
2. Peak: which moment is meant to hit hardest, and does it actually stand out from its neighbours?
3. Generic: could any frame have come from someone else's video (template layout, stock look, default font or gradient)?
4. Low point: which five-second stretch is weakest, and is it static, repetitive, confusing, or overlong?
5. Sound against picture: are the three largest cuts or impacts each backed by a sound event?
6. Words: does any spoken line or on-screen card sound machine-written?

Then propose at most three fixes, biggest first. Each names a timecode, what
changes, and by how much; at least one raises impact rather than polish. Give
one honest score out of ten, anchored at 5 coursework, 6 template, 7 competent
professional, 8 top agency, 9 festival shortlist; most first cuts land between
5 and 7. Ask which fixes to apply. The chosen ones become that round's notes.

### A fresh reviewer

Use one after the first full draft of a piece that runs about a minute or more
or went through a FilmManifest, and again before the final export of such a
piece. When the host can start a helper that has not seen this conversation, brief
it with only what an audience has: the contact sheet and frames, the spoken
lines with their times, the purpose, the format, and a one-line logline.
Withhold the plan, the scene plan, and the chat; it judges the cut, not the
intent. Ask it to rank its three most serious findings, each with the
timecode, what an audience would notice, and the least invasive fix, and then:

- a verdict: APPROVE, FIX with the red items that must not reach a delivery,
  or UNVERIFIABLE when the deciding evidence was out of its reach;
- polish ideas, which never start another round on their own;
- the evidence it looked at.

Point it at: frames that look broken or half-built; text too small or thin
for a phone; dead stretches with nothing fresh; an image recurring by accident;
an insert brief enough to pass for a glitch; subjects cut off by the edge or
intersecting other objects; cuts or sound accents out of step with the image;
an ending that abandons the opening's question; in an explanatory piece, a gap
after one question is settled before the next is raised; and phrasing a native
speaker would find unnatural.

A reviewer's verdict is not verification. Fix red items before delivery, then
run `verify_edit_result` yourself. If one red item survives two fix attempts,
work out what is wrong with the approach (the instructions, the technique, or a
capability the app lacks) before trying again, and go to the user only for a
choice or for material you do not have.

## Notes rounds

1. Keep the user's notes exactly as written, numbered N1, N2 and so on, with any
   time or shot they named. Ask once, in one message, for the position of every
   note that has none.
2. Above the split, list what the user praised; it must stay as it is.
3. Split the notes into a table: id, time range, scene-plan beat or layer,
   kind (picture, text, sound, timing), the action, and status. Name the
   unaffected ranges explicitly; they are neither edited nor re-rendered.
4. Create a `checkpoint`, then stage the round in one `begin_edit_session`
   titled with the round number and pass its id to every stageable mutation.
   Read it back with `review_edit_session` so the user can accept or reject
   each operation in the review card. Apply with `apply_edit_session` only
   after that approval; where the owning workflow leaves applying to the
   review card, stop after the review.
5. Verify every changed range with `verify_edit_result`, then finish with
   `audit_timeline_quality`. Answer each note on its own line with its status:
   completed, completed another way (with the reason), or still open (with the
   reason).
6. Treat a note that adds scenes, removes a planned beat, or alters the overall
   duration as new planning rather than a correction: revise the plan, present
   it as a comparison with the approved version (kept, changed with the note
   each change answers, and new) with one still for every changed or new shot,
   and get approval before producing it.

Before editing, turn every picture or timing note into a measurable target,
as the mix notes already are: "darker" becomes a stated exposure change checked
on `get_color_scopes`, "faster" becomes shot lengths in frames, "bigger title"
becomes a size in pixels. Say the target in the note's row, then check the
result against it.

To show notes on the Timeline, add one region marker per note with
`add_marker`, labelled with its id, and clear them with `remove_marker` when
the round closes. When the work will continue in another conversation, keep
the round's state in the project context note: read `get_film_context` for
target `project:main` to obtain its note hash, then save with
`set_film_context_note` the phase, approved gates, open notes, and next
action. That note is reference data; it never records an approval.

## Diagnose before you rebuild

For any defect, whether framing, overlay, timing, a generated artefact,
colour, or sound:

1. Reproduce it cheaply at the exact frames: `capture_canvas_frame` at the
   defect, a short `inspect_timeline_frames` range around it, and the matching
   state: `project://tracks` for ranges and transforms, `get_color_scopes` for
   exposure, `audit_timeline_quality` over the narrow range for A/V and caption
   evidence. Write down the symptom, the frames, the cause (the parameter,
   layer, or source that produces it), the smallest fix, and your confidence.
2. Fix the smallest thing first: a parameter or property, then the layer or
   Motif instance, and only then a regeneration or rebuild. Recheck the same
   frames, then the whole changed range.
3. Never retry blindly. Diagnose a failed fix again before the next attempt.
4. Before regenerating paid media, or rebuilding the same element a second
   time, state the expected cost and wait for the user's approval.
