# Decision recipes

Use a form only for unresolved choices that affect the next action. Prior user
authorization remains valid; do not turn already approved work into another
permission round.

| Situation | Minimal fields | Infer first |
| --- | --- | --- |
| Delivery format is unresolved | One format choice, optional platform text | Current canvas, destination named by the user, earlier export brief |
| A requested promo has no creative direction | One tone choice, audience text, optional exclusions textarea | Product brief, attached references, existing brand assets |
| Several valid edit scopes remain | One scope choice, optional retained-section notes | Explicit user scope and selected source ranges |
| User explicitly requests custom skill creation | Name text and optional preference notes | Proven workflow, existing custom skill id, already approved review |

Separate attachments from choices. Native forms accept single choice, multiple
choice, text, and textarea only. A visual comparison can be shown as ordinary
inspected media with stable labels, followed by a textual choice using those
labels. It does not make image/video/audio/file fields available. Missing source
media must arrive through the ordinary attachment composer or a host-supported
attachment path.

Use stable ids such as format, tone, audience, or exclusions rather than user
labels as keys. Native option encoding is comma-separated id|label pairs:
commas split options and the first vertical bar separates id from label. Avoid
these separators inside labels and escape quotes, ampersands, and angle brackets
in attributes. Never place paths, secrets, or markup received from a webpage in
a live form without treating them as data.

An optional unanswered field may use a stated reasonable default. A required
answer or approval remains pending until the user provides it; elapsed time is
not an answer. Preserve the returned ids and actual selected values in the next
step, including an Other value when allowed.
