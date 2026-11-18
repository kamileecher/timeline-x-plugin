# Delivery package

Read this when a finished piece goes to a platform, a client, or a post, or
when the user asks for a cover or thumbnail. It adds no tool and authorizes no
edit beyond the request; a cover that changes the Timeline still needs the
user's agreement.

## Cover and thumbnail

- Choose the strongest image of this piece, not the first frame by habit.
  Run `analyze_cover_candidates`, look at its contact sheet, and pick the
  moment that shows the subject or the story's key object most clearly. Its
  scores are technical; the choice is yours to justify in one line.
- Use at most three words of title, written for this piece. Keep faces and the
  key object clear of the words: `create_smart_cover` takes protected regions
  for them.
- Check that the cover still reads when it is shown about 160 px wide, the
  size of a thumbnail in a feed or a list. If the words or subject turn to
  mush, shorten the words or pick a closer frame.
- `export_cover` writes the file at the canvas size; a landscape video
  platform expects 1280 × 720 or larger.

## When the platform shows the first frame

Some destinations ignore an uploaded cover and show the video's first frame.
Check that frame with `capture_canvas_frame`. When it does not read as a
poster, and the user agrees, make a second copy that opens on the poster:
after the main export, prepend a short cover with `create_cover` (one undo
step), export that copy under its own file name, then `undo` the cover so the
edit returns to its delivered state.

## Looping pieces

For a piece meant to loop, the last frame should flow into the first. Capture
both with `capture_canvas_frame` and look at them side by side. When one layer
carries the whole picture, `compare_frames` on that layer at both times gives a
similarity reading. Fix a visible jump before delivery.

## What goes with the file

Lead the delivery message with the file path, then:

- duration, size, frame rate, and the measured loudness and true peak;
- the three weakest moments with their timecodes and why, from the latest
  independent look, so the user knows where a note would pay off most;
- the listening note from the final checklist;
- for a post: two opening lines for the description that make someone press
  play, chapter times from the scene starts when the piece is long enough to
  need them, and the credit lines from the source records when outside
  material was used.
