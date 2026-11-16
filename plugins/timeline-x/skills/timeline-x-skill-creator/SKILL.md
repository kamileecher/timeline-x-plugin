---
name: timeline-x-skill-creator
description: "Turn a completed or clearly validated Timeline X Studio editing workflow into a reusable user-owned skill package when the user explicitly asks to save or update that workflow."
---

# Timeline X Studio Workflow Skill Creator

Use this skill only when the user explicitly asks to save, remember, codify,
create, update, or reuse an editing process as a skill. Do not activate it just
because an ordinary edit uses a repeatable technique.

## Save only proven guidance

- Start from a completed, user-approved, or clearly validated workflow. If the
  result is unfinished or experimental, finish or clarify it before saving.
- Capture durable intent: trigger, required inputs, decision rules, workflow
  order, user preferences, safety boundaries, and observable final checks.
- Omit transcript dumps, credentials, private context, transient media/layer
  ids, project-only timestamps, generated output, and low-level parameters
  likely to change with the application.
- Keep the description discriminating so automatic selection does not attract
  unrelated tasks. Use lowercase letters, digits, and hyphens for the folder
  id, with one required SKILL.md file and optional focused references or
  scripts only when they materially improve reuse.
- Use only Timeline X Studio terminology and capabilities present in the live
  MCP catalog. A custom skill cannot widen filesystem, network, provider,
  project, or renderer authority.

Prepare the proposed name, trigger, workflow, important rules, and verification
gates as a concrete review. If that package has not already been authorized,
collect the decision through the current host's supported input surface and
wait. Honor prior approval without asking again. If the user is correcting an
installed custom skill, update that skill rather than creating a duplicate.

Before packaging, read [the authoring checklist](references/authoring-checklist.md).

## Installation boundary

Timeline X Studio currently exposes custom-skill creation and folder import in
Settings → Skills, not as an Agent MCP mutation. Prepare a complete package in
an authorized workspace when the current provider can write files; otherwise
provide ready-to-paste SKILL.md content. Then direct the user to Settings →
Skills to create or import it. Never claim installation merely because a draft
was written.

After installation, confirm the skill appears in Settings → Skills with the
intended id, name, description, enabled state, and instruction size. Explain
that it can be selected from the Agent composer Skills button or matched
automatically from its description.
