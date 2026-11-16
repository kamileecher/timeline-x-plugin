---
name: timeline-x-widget-forms
description: "Collect unresolved user decisions in Timeline X Studio with one native in-chat form containing single-select, multi-select, text, or textarea fields."
---

# Timeline X Studio Widget Forms

Use this skill when several related inputs are required, a stable structured
answer prevents ambiguity, or the next costly/destructive step needs an
explicit choice. Infer answers from the request, project, attachments, and
earlier turns first; never ask for known information.

## Choose the host interaction

The widget protocol below renders inside Timeline X Studio's embedded Agent
panel. An external MCP client must use its own supported structured-input UI;
loading this skill does not add native widget rendering to that host. If the
host has no form UI, collect only the missing decision in a concise plain-text
question. Do not print raw widget tags into an unsupported client.

For grouped production decisions and field encoding, read
[decision recipes](references/decision-recipes.md).

## Native protocol

Emit exactly one complete `<widget>...</widget>` block in the assistant
response. It is response text, not a tool call. Then stop and wait for the
Widget response JSON message. Continue from its stable field ids without
asking the same questions again.

Timeline X Studio currently supports these self-closing fields:

- `<form-single id="format" label="Video formatı" options="short|Kısa,long|Uzun"/>`
- `<form-multi id="elements" label="Neler olsun? (çoklu seçim)" options="captions|Altyazı,music|Müzik"/>`
- `<form-text id="audience" label="Hedef kitle" placeholder="Örn. yeni kullanıcılar"/>`
- `<form-textarea id="notes" label="Ek notlar" rows="3"/>`

Only `id` is structurally required, but every user-facing form should include a
clear localized label. Fields are optional by default. Add `required="true"`
only when execution cannot safely continue without that answer.

For single choice, the host adds a localized Other option unless
`allow_other="false"` is present. For multiple choice, include an explicit
`__other__|Diğer` option only when an off-list answer is useful. Keep option ids
short and stable; keep labels in the conversation language.

## Boundaries

- Ask one coherent questionnaire, not a trial form followed by a corrected
  form. Group related questions and omit decorative fields.
- Do not place ordinary Markdown choices beside the widget or emit a second
  interaction mechanism in the same response.
- The current native parser does not support file upload, image, visual-card, video,
  or voice-audition fields. Ask the user to attach missing media through the
  composer, and use plain localized choices when previews cannot be represented
  honestly.
- Never show the widget protocol as a fenced example to the end user. Emit the
  live block only when requesting an answer.
- A widget answer authorizes only the decision represented by its fields. It
  does not grant unrelated project, provider, network, or destructive actions.
