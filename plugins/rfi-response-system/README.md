# RFI Response System

> Draft professional RFI responses in 30 seconds instead of 30 minutes.

## What It Does

- Analyzes the RFI question and identifies the core issue
- Drafts clear, thorough responses with spec references
- Flags cost and schedule impacts
- Identifies change order triggers
- Categorizes by type (design, material sub, field condition, coordination, scope)

## Setup (5 min) — Claude: Create Project → paste `claude/system-prompt.md` | ChatGPT: Create GPT → paste `codex/instructions.md`

**Pro tip**: Upload your project specs to Claude Project knowledge for context-aware responses.

## Platforms

### Claude Code
Copy `claude/system-prompt.md` into your Claude project instructions.
Add the MCP server to `.mcp.json` for live CRM/software integration.

### ChatGPT / Codex
Create a Custom GPT using `codex/instructions.md` as the system prompt.
Upload knowledge files from the `knowledge/` folder.

### Perplexity
Use `perplexity/system-prompt.md` as your Perplexity Space instructions.

### Manus
Use `manus/instructions.md` as your Manus agent instructions.

## Price: $199
