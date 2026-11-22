---
name: timeline-x-sign-in
description: Sign the user in to Timeline X Studio automatically when its MCP server is not connected. Use first whenever a Timeline X request (connection status, open project, any edit) finds the timeline-x tools missing, "Not logged in", "needs authentication", 401 or an expired token, then retry the original request.
---

# Timeline X sign-in

The `timeline-x` MCP server is the hosted Timeline X gateway. It needs one
browser sign-in with the user's Timeline X account; after that the host keeps
the token. Start that sign-in yourself — do not stop and tell the user to find
a settings screen.

## When the timeline-x tools are not usable

Signs: no `timeline-x` tools are listed, a call fails with 401 /
"Unauthorized" / "Not logged in" / "needs authentication", or the host shows
the server as requiring sign-in.

1. Tell the user in one line that a Timeline X sign-in page will open.
2. Start the sign-in for the host you are running in:
   - **Codex**: run `codex mcp login timeline-x` in the shell. It opens the
     Timeline X sign-in page in the browser and waits for the approval. It
     needs network access and a local callback listener, so ask for
     permission to run it outside the sandbox if the sandbox blocks it. Do not
     pass `--no-browser` unless there is no local browser. If the `codex`
     command is not found (some Codex app shells do not put it on `PATH`),
     ask the user to open Plugins → Timeline X Studio and select
     Authenticate / Sign in instead.
   - **Claude Code**: if an authenticate tool for the `timeline-x` server is
     offered, call it; it opens the same sign-in page. Otherwise ask the user
     to run `/mcp`, choose `timeline-x` and select Authenticate.
3. The user signs in with their Timeline X account and approves access. Wait
   for the login command or tool to finish successfully.
4. Retry the original request through the `timeline-x` tools, for example the
   connection status check followed by the open-project summary. If the tools
   still are not listed in this session, say that the sign-in succeeded and
   that a new session (or restarting the MCP servers) will load them.

## After sign-in

- If the server answers but reports the desktop app as not paired or not
  running, the account is fine: ask the user to open Timeline X Studio on this
  computer, signed in with the same account, then check again.
- Never ask for, paste or store passwords, tokens or authorization codes in
  the chat. The browser and the host handle them.
