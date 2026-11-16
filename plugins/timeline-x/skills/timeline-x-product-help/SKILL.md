---
name: timeline-x-product-help
description: Explain Timeline X Studio's current UI, settings, local Agent workflows, and recovery steps without importing unrelated account or billing claims.
---

# Timeline X Studio Product Help

Use this skill for "where is", "how do I configure", setup, and manual recovery
questions about Timeline X Studio itself. It is guidance, not permission to mutate a
project. For live project contents, inspect the relevant Timeline X Studio resource
instead of answering from generic product knowledge.

## Current UI map

- Settings → Agent: local Agent provider discovery, sign-in, default provider,
  workflow controls, generation defaults, and limits.
- Settings → API Keys: credentials for the named cloud services and gateways.
- Settings → Audio and Music: managed transcription, TTS, and local music
  models, engine preference, installation, and runtime testing. Use the current
  localized labels (for example Ses ve Müzik), not an older Speech tab name.
- Settings → Skills: installed local skills, global enable/disable, custom skill
  creation, folder import, editing, and deletion. Built-in skills are managed by
  the app and cannot be edited or deleted.
- Settings → MCP: outbound MCP connections, authentication, connection state,
  and the global enabled gate. A conversation still controls which enabled
  connections are active for its turns.
- Agent composer + menu: attach media/documents; optionally add an official or
  saved voice, voice model, or video model to the current request; open the
  voice library; and clone a voice. The selection updates saved generation
  settings; a request chip is attached only after selection and is consumed
  after that request. Inspect current saved audio settings rather than invent
  per-Agent or MCP voice overrides.
- Agent composer Skills button: select conversation-scoped workflow skills.
  The picker shows both the active-count and instruction-size budgets.

## Answer and recovery rules

- Use the labels visible in the running app and provide the shortest reliable
  route. If a feature or label cannot be verified from current app state or
  repository evidence, state that uncertainty instead of inventing a menu.
- Preserve the exact error text. For a missing provider key, direct the user to
  the named provider under Settings → API Keys. For unavailable local speech or
  music, direct them to Settings → Audio and Music and the failing model/runtime.
  Distinguish installed, tested, selected, and actually completed generation.
- Current app/resource evidence proves the running build. Repository source
  describes its checkout and release notes describe a dated rollout; do not
  claim a source feature is installed or a provider operation passed from those
  alone. Separate local runtime availability from cloud entitlement or quota.
- Do not reuse another product's pricing, credits, subscription, billing,
  download, or hosted-plugin instructions. Timeline X Studio has its own local surface;
  if account or commercial information is not present there, say it is not
  available in the current build.
- When a semantic Agent tool can complete the requested editor operation, use
  the relevant editing skill. Give manual clicking instructions only when the
  user asks for them or the semantic route is unavailable.
