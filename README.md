# Construction AI Plugins — Claude + Codex + Perplexity + Manus

> The first downloadable AI plugins built for construction professionals. Draft RFIs, daily logs, change orders, estimates, and safety docs in under two minutes.

A PM handling 5 RFIs/week spends 2-3 hours on responses alone. A superintendent writing daily logs burns 45 minutes every day. These plugins cut that to seconds — and if you use Claude, the Procore MCP server connects directly to your live project data.

---

## What's Inside

| Plugin | What It Does | Best For |
|--------|-------------|----------|
| RFI Response System | Parses any RFI, validates technical claims, references CSI spec sections and drawing numbers, drafts a contract-ready formal response with cost/schedule impact flags. | Project managers and superintendents handling 5+ RFIs/week |
| Daily Log Reporter | Turns rough field notes into a 10-section professional daily report. Catches near-misses buried in casual language and generates weekly owner summaries from 5 daily logs. | Superintendents on active job sites |
| Estimating Assistant | Completeness-scores any estimate, identifies missing line items with cost ranges, benchmarks $/SF against market data, and proposes value engineering options with specific savings. | Estimators reviewing takeoffs before submission |
| Change Order Manager | Generates a complete CO document with itemized labor/material/equipment breakdown, OH&P markups, schedule impact analysis, and running contract total. | PMs and GCs managing scope changes |
| Safety Compliance | Produces OSHA-compliant toolbox talks, JSAs, incident reports with 5 Whys root cause analysis, and recordability determinations per 29 CFR 1904.7. | Safety managers and superintendents |

---

## Platforms

Works as a downloadable plugin for:

- **Claude Code** — Full MCP server integration + Claude Code skills (auto-invoked commands)
- **ChatGPT / Codex** — Custom GPT with knowledge files and conversation starters
- **Perplexity** — Space instructions with search-optimized prompts
- **Manus** — Autonomous agent instructions

---

## Quick Start

### Claude Code (recommended)

```bash
# Clone the repo
git clone https://github.com/PAMF2/construction-ai-plugins.git

# Install as a Claude Code plugin
claude plugin install ./construction-ai-plugins
```

Skills auto-register. Type `/rfi-response`, `/daily-log`, `/estimate-review`, `/change-order`, or `/safety-doc` in any Claude Code session.

### Claude (claude.ai)

1. Open [claude.ai](https://claude.ai) and create a new **Project**
2. Copy the system prompt from `plugins/<plugin-name>/claude/system-prompt.md` into Project instructions
3. Upload knowledge files from `plugins/<plugin-name>/claude/knowledge/`
4. Start the conversation — the AI is now a trained construction specialist

### ChatGPT / Codex

1. Go to [chat.openai.com](https://chat.openai.com) > **Explore GPTs** > **Create**
2. Paste the contents of `plugins/<plugin-name>/codex/instructions.md` into the instructions field
3. Upload knowledge files from `plugins/<plugin-name>/codex/knowledge/`
4. Save and use

### Perplexity

1. Open Perplexity and go to **Spaces**
2. Create a new Space for the plugin
3. Paste the system prompt from `plugins/<plugin-name>/claude/system-prompt.md` as the Space instructions
4. Start a conversation — Perplexity will apply the prompt across all searches in that Space

### Manus

1. Open Manus and create a new agent
2. Paste the system prompt from `plugins/<plugin-name>/claude/system-prompt.md` as agent instructions
3. Upload knowledge files as agent context
4. Deploy for autonomous construction document generation

---

## MCP Server — Procore

Connect Claude directly to your Procore account. Pull live RFIs, submit responses, create daily logs, manage change orders, and log safety observations without leaving the conversation.

**15 tools, 2 prompts.**

| Tool | What It Does |
|------|-------------|
| `list_projects` | All active or inactive projects in your company |
| `list_rfis` | RFIs filtered by status, trade, or contractor |
| `get_rfi` | Full RFI detail — questions, responses, attachments, history |
| `create_rfi_response` | Submit a response to an open RFI directly in Procore |
| `create_daily_log` | Create a daily log entry from notes or structured data |
| `list_daily_logs` | Daily logs for a date range (for weekly summaries) |
| `get_manpower_log` | Workforce headcount by trade for a specific date |
| `list_change_orders` | All PCOs and their approval status |
| `create_change_order_request` | New PCO with cost breakdown and schedule impact |
| `create_observation` | Safety observation, hazard, or near-miss log |
| `get_budget` | Project budget — original, approved changes, revised total |
| `list_submittals` | Submittals for reference when drafting RFI responses |
| `list_punch_items` | Open punch list items needing correction |
| `get_weather_log` | Weather conditions for a specific date |
| `get_manpower_log` | Manpower by trade for a date |

| Prompt | What It Does |
|--------|-------------|
| `weekly-owner-report` | Pulls daily logs, manpower, RFIs, COs, weather, and budget — generates a professional weekly owner report |
| `draft-rfi-response` | Pulls a specific RFI and drafts a spec-referenced response with impact assessment |

**Setup:**

```json
{
  "mcpServers": {
    "procore": {
      "command": "npx",
      "args": ["-y", "procore-mcp"],
      "env": {
        "PROCORE_CLIENT_ID": "your-client-id",
        "PROCORE_CLIENT_SECRET": "your-client-secret",
        "PROCORE_COMPANY_ID": "your-company-id",
        "PROCORE_ACCESS_TOKEN": "your-access-token",
        "PROCORE_REFRESH_TOKEN": "your-refresh-token"
      }
    }
  }
}
```

Get credentials at [developers.procore.com](https://developers.procore.com). The server auto-refreshes expired tokens.

---

## Plugin Structure

```
construction-ai-plugins/
├── README.md
├── .claude-plugin/
│   └── plugin.json                       # Plugin manifest (skills registration)
├── mcp-server/                           # Procore MCP server
│   ├── src/index.ts                      #   15 tools, 2 prompts
│   └── package.json
└── plugins/
    ├── rfi-response-system/
    │   ├── claude/system-prompt.md       # Claude Project instructions
    │   ├── codex/instructions.md         # ChatGPT/Codex GPT instructions
    │   ├── knowledge/                    # CSI MasterFormat divisions, RFI templates
    │   ├── examples/                     # Conduit routing conflict → 6-section response
    │   └── SKILL.md                      # Claude Code skill
    ├── daily-log-reporter/
    │   ├── claude/ + codex/
    │   ├── knowledge/                    # Weather impact thresholds by trade
    │   └── examples/                     # Slab pour notes → full formatted daily log
    ├── estimating-assistant/
    │   ├── claude/ + codex/
    │   ├── knowledge/                    # General conditions checklist (100+ items)
    │   └── examples/                     # 10K SF office at $47/SF → 12 missing items found
    ├── change-order-manager/
    │   ├── claude/ + codex/
    │   ├── knowledge/                    # OH&P markup rates by contract type
    │   └── examples/                     # VCT → polished concrete upgrade → full CO document
    └── safety-compliance/
        ├── claude/ + codex/
        ├── knowledge/                    # OSHA 1926 quick reference, 10 toolbox talks
        └── examples/                     # Heat illness talk + rebar laceration incident report
```

---

## Pricing

| Product | Price |
|---------|-------|
| Single Plugin | $149 – $199 |
| PM Bundle (all 5 plugins + Procore MCP server) | $599 |
| Pro Access (all plugins + MCP server + updates) | $59/month |
| Custom Build | Contact us for custom builds |

One recovered RFI per day at 30 minutes is 10+ hours/month back. A PM handling 5 RFIs/week saves 100+ hours/month.

---

## License

MIT

---

AI automation for construction professionals.
