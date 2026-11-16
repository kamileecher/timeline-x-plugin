---
name: timeline-x-digital-human
description: "Create or use a consented AI avatar, talking photo, digital human, or virtual presenter through a selected external MCP capability, then import and verify the result in Timeline X Studio."
---

# Timeline X Studio Digital Human

Use this skill for AI avatars, talking photos, digital humans, virtual
presenters, or a reusable likeness that speaks a script. Do not use it for a
static profile image, ordinary talking-head editing, generic image-to-video,
voiceover alone, or a 3D character.

For a user-authorized portrait or existing project audio, read
[Presenter source preparation](references/presenter-source-preparation.md)
when source readiness, framing, segmentation or transparency needs attention.

Timeline X Studio does not advertise a native avatar-generation tool. This
workflow therefore requires a compatible external MCP connection selected for
the current conversation. Call `list_external_mcp_tools` first and use only an
avatar identity/catalog/generation capability actually returned there. Invoke
it through `call_external_mcp_tool` with its exact schema. If no compatible
tool is present, explain the missing connection; do not silently substitute
`generate_video` or call a provider endpoint directly.

## Resolve the generation contract

- Use an official or saved identity returned by the live external catalog, or
  a user-authorized portrait. Never invent an identity, preview, readiness
  state, voice, saved binding, or usage count.
- For a real person's likeness, obtain explicit permission to create and use
  the avatar. Voice cloning is a separate consent decision; likeness consent
  does not authorize it.
- Preserve the user's final script and punctuation. Show an Agent-written or
  revised script in full and obtain approval before a charged or irreversible
  generation call.
- Resolve the requested aspect ratio, resolution, background behavior, and
  speech source only to the degree required by the live external schema.
  Prefer provider defaults when the user has no preference; never fabricate a
  capability or price.
- Timeline narration voice/model/clone defaults remain owned by Audio and Music
  Settings. An external avatar service may advertise its own identity or voice
  binding; keep that contract separate and do not silently override the saved
  Timeline speech configuration or imply that a speech clone is compatible.
- When choosing among identities or external-service voices, present only
  candidates returned by the live tool. Use one native Timeline X widget for a text-based choice;
  if the current widget protocol cannot display the returned preview media,
  describe that limitation instead of presenting a misleading visual card.

## Generate safely

1. Recheck that the selected identity/revision is ready and that every required
   consent and approval is present.
2. If the external tool reports a cost, quota, or destructive consequence,
   present that live value before submission. Do not reuse an old amount.
3. Submit exactly once, retain the returned job or batch identity, and use only
   the external connection's advertised status/retry operations. Retry a failed
   segment rather than duplicating a successful batch.
4. Never expose the short-lived connection token, provider-private payloads,
   or private URLs in chat, files, logs, or downstream remote arguments.

## Bring the result into Timeline X Studio

Import a completed direct media URL with `import_media_url`, or a readable
local result with `import_media`. Confirm the resulting id in
`project://media`. Keep it in the Library unless the user requested Timeline
placement; then use `add_video_layer` once on the intended track and range.

Before reporting success, verify the external job reached a completed state,
the expected segments exist once and in order, the imported media is online,
and any requested placement is present. Inspect the avatar video or composed
Timeline frames; status JSON alone cannot prove face consistency, lip sync,
framing, or background quality.

Refuse non-consensual impersonation, fraud, deceptive identity use,
harassment, sexual exploitation, or attempts to evade provider safeguards.
