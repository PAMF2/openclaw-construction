# OpenClaw Construction AI Plugins

> AI-powered workflows for construction professionals. Draft RFI responses, daily reports, estimates, change orders, and safety docs in seconds instead of hours.

Works with **Claude** (Anthropic) and **ChatGPT/Codex** (OpenAI). Optional **Procore MCP Server** connects Claude directly to your Procore account for live project data.

---

## What You Get

Every plugin ships with a system prompt (for Claude Projects or ChatGPT GPTs), knowledge files with real industry reference data, and a complete input/output example showing exactly what the AI produces.

**Setup time: under 10 minutes per plugin. No coding required.**

### The ROI case

| Manual Task | Time Today | Time With Plugin |
|-------------|-----------|-----------------|
| Draft an RFI response | 30-60 min | 30 seconds |
| Write a daily construction report | 45-60 min | 60 seconds |
| Review an estimate for completeness | 2-4 hours | 2 minutes |
| Draft a change order with cost backup | 1-3 hours | 2 minutes |
| Write a toolbox talk | 30-45 min | 60 seconds |
| Complete an incident report | 1-2 hours | 2 minutes |

One RFI per day at 30 minutes = 10+ hours/month recovered. A PM handling 5 RFIs/week saves 100+ hours/month.

---

## Plugins

### 1. RFI Response System (`plugins/rfi-response-system/`) -- $199

Paste a raw RFI from any subcontractor and get a professional, contract-ready response with spec references.

- **Analyzes the RFI** -- parses the core technical issue, validates dimensional data and contractor claims, identifies whether the question is design clarification, material substitution, field condition, or coordination conflict
- **Drafts a complete response** -- formal contract language with numbered sections, ball-in-court assignments, and follow-up deadlines ready to paste into Procore or send as a letter
- **References specifications and codes** -- cites exact spec sections (CSI MasterFormat), drawing numbers, NFPA and code references from the knowledge base
- **Flags cost and schedule impact** -- identifies change order triggers, directs COR submission timelines, and assesses critical path risk

**Knowledge files included:**
- `knowledge/csi-masterformat-divisions.md` -- All 49 CSI divisions with descriptions, common spec sections, and cross-references
- `knowledge/rfi-response-templates.md` -- Response templates by RFI category (design, field condition, coordination, substitution, scope)

**Example:** `examples/complete-example-rfi-response.md` -- Electrical sub reports conduit routing conflict in a ceiling cavity. Plugin validates the dimensional analysis, applies MEP routing priority, generates a layered resolution with elevation assignments, and produces a 6-section RFI response document with spec citations.

---

### 2. Daily Log Reporter (`plugins/daily-log-reporter/`) -- $149

Paste rough field notes -- abbreviations, incomplete sentences, whatever you scribbled on your phone -- and get a professional daily construction report.

- **Structures raw notes into 10 sections** -- weather, workforce summary (headcount by trade with hours), work completed (by area), materials, equipment, inspections, safety, issues/delays, tomorrow's plan, and look-ahead
- **Catches safety events** -- identifies near-misses and incidents buried in casual notes ("Jim slipped but caught himself") and formats them with proper follow-up actions
- **Generates weekly owner summaries** -- feed in 5 daily logs and get an executive summary with progress vs. schedule, milestones, decisions requiring owner attention, and a 2-week look-ahead
- **Ready for any PM software** -- output format pastes directly into Procore, Buildertrend, PlanGrid, or any daily log module

**Knowledge files included:**
- `knowledge/weather-impact-reference.md` -- Weather thresholds for concrete, masonry, roofing, and coating work; wind speed limits; OSHA cold/heat stress triggers

**Example:** `examples/complete-example-daily-log.md` -- Superintendent's rough notes about a 42 CY slab pour with a late concrete truck, near-miss slip incident, and plumber schedule update. Plugin produces a formatted report with weather table, workforce breakdown, delay documentation, near-miss write-up, and next-day plan.

---

### 3. Estimating Assistant (`plugins/estimating-assistant/`) -- $199

Submit an estimate at any stage and get a completeness check, missing item identification, full CSI breakdown, and value engineering options.

- **Completeness scoring** -- compares submitted line items against expected items for the project type and scope, reports X of Y items present and a completeness percentage
- **Missing item identification** -- flags every missing line item with estimated cost ranges, CSI division, and a plain-English explanation of why it matters (e.g., "No general conditions -- you have no superintendent, dumpsters, or project management costs in this estimate")
- **Market benchmarking** -- compares your $/SF against market data for the project type, location, and complexity level to validate overall pricing
- **Value engineering** -- proposes 3+ cost reduction options with specific dollar savings, trade-offs, and recommendations for which to accept or reject

**Knowledge files included:**
- `knowledge/general-conditions-checklist.md` -- Comprehensive Division 01 checklist with 100+ line items, monthly cost ranges, and percentage benchmarks by project type and size

**Example:** `examples/complete-example-estimate-review.md` -- User submits a 15-line estimate for a 10,000 SF Class A law office build-out at $47/SF. Plugin identifies 12 missing items ($168K-$260K gap), reviews each existing line item, generates a full CSI-organized breakdown totaling $699K, and proposes 3 value engineering options saving $38K-$62K.

---

### 4. Change Order Manager (`plugins/change-order-manager/`) -- $149

Describe the scope change and get a complete, approval-ready change order document with itemized costs and schedule impact.

- **Full CO document generation** -- description, reason classification (owner-directed, design error, field condition, code/regulatory, VE), itemized cost breakdown, schedule impact, and signature blocks formatted for owner review
- **Itemized cost backup** -- breaks down labor, material, equipment, subcontractor quotes, restocking charges, and applies OH&P markups per the contract terms (separate rates for self-performed vs. subcontractor work)
- **Schedule impact analysis** -- compares original activity duration to revised duration, identifies critical path impacts, calculates calendar day additions, and proposes a new substantial completion date
- **Running contract total** -- tracks original contract sum, all prior approved COs, and the net change to produce an updated contract sum

**Knowledge files included:**
- `knowledge/markup-rates-reference.md` -- OH&P markup rates by contract type (lump sum, GMP, cost-plus, design-build, unit price), project sector, and FAR rates for federal work; tiered markup structures; credit change order handling; bond premium schedules

**Example:** `examples/complete-example-change-order.md` -- Owner directs a flooring upgrade from VCT to polished concrete in a 3,200 SF lobby mid-construction. Plugin generates CO-007 with VCT credit calculation, restocking charge, polished concrete addition with 7 line items, GC coordination costs, bond premium, net change of $20,489, 7 calendar days added, and updated contract sum of $8,597,989.

---

### 5. Safety Compliance (`plugins/safety-compliance/`) -- $149

Generate toolbox talks, JSAs, safety plans, and incident reports that meet OSHA standards and are ready for the field.

- **Toolbox talks** -- 5-10 minute topic briefings with OSHA standard citations, hazard identification, PPE requirements, emergency procedures, discussion questions, and a print-ready sign-off sheet
- **Job Safety Analyses (JSAs)** -- step-by-step task breakdown with hazards per step, control measures ranked by hierarchy of controls, PPE matrix, and emergency response procedures
- **Incident reports** -- complete investigation documents with description, timeline, root cause analysis (5 Whys), OSHA recordability determination (knows the difference between first aid and medical treatment), corrective actions by timeline, and preventive measures
- **OSHA recordability guidance** -- determines whether an injury is recordable per 29 CFR 1904.7, identifies the correct 300 Log classification, and flags state-specific reporting requirements

**Knowledge files included:**
- `knowledge/osha-1926-quick-reference.md` -- OSHA 29 CFR 1926 construction standards organized by subpart; Top 10 most-cited standards; current penalty amounts; key requirements for fall protection, scaffolding, excavation, electrical, and more
- `knowledge/toolbox-talk-library.md` -- 10 complete, ready-to-deliver toolbox talks covering fall protection, electrical safety, excavation, heat illness, PPE, ladder safety, scaffolding, silica, crane/rigging, and confined space

**Example:** `examples/complete-example-safety-docs.md` -- Two examples in one file. (1) Heat illness prevention toolbox talk for concrete work in August in Texas -- includes OSHA heat index action levels, Texas-specific requirements, water/rest/shade protocols, warning signs, buddy system, and sign-off sheet. (2) Incident report for a rebar laceration requiring 4 stitches -- includes 5 Whys root cause analysis, OSHA recordability determination (recordable: sutures are medical treatment beyond first aid), corrective actions, and preventive measures.

---

## Procore MCP Server (`mcp-server/`)

Connect Claude directly to your Procore account. Manage RFIs, daily logs, change orders, safety observations, and budgets from within Claude without switching to the Procore UI.

### Tools (14)

| Tool | What It Does |
|------|-------------|
| `list_projects` | List all active (or inactive) projects in your Procore company |
| `list_rfis` | List RFIs filtered by status (open/closed/draft), trade, or contractor |
| `get_rfi` | Full RFI detail -- questions, responses, attachments, history |
| `create_rfi_response` | Submit a response to an open RFI directly in Procore |
| `create_daily_log` | Create a daily log entry from field notes or structured data |
| `list_daily_logs` | Fetch daily logs for a date range (for weekly summaries) |
| `get_manpower_log` | Workforce headcount by trade for a specific date |
| `list_change_orders` | List all change order requests and their approval status |
| `create_change_order_request` | Create a new PCO with cost breakdown and schedule impact |
| `create_observation` | Log safety observations, hazards, or near-misses |
| `get_budget` | Project budget summary -- original, approved changes, revised total |
| `list_submittals` | Submittals for reference when drafting RFI responses |
| `list_punch_items` | Open punch list items needing correction |
| `get_weather_log` | Weather conditions for a specific date |

### Prompts (2)

| Prompt | What It Does |
|--------|-------------|
| `weekly-owner-report` | Pulls daily logs, manpower, RFIs, COs, weather, and budget data to generate a professional weekly owner report |
| `draft-rfi-response` | Pulls a specific RFI from Procore and drafts a response with spec references and impact assessment |

### Setup

Add to your Claude Desktop or Claude Code MCP config:

```json
{
  "mcpServers": {
    "procore": {
      "command": "npx",
      "args": ["-y", "@openclaw/procore-mcp"],
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

## How It Works

### For Claude Users

1. Open [claude.ai](https://claude.ai) and create a new **Project**
2. Copy the system prompt from the plugin's `claude/system-prompt.md`
3. Upload knowledge files from `claude/knowledge/` (or the plugin's `knowledge/` folder)
4. Start chatting -- the AI is now your construction assistant with domain expertise

### For ChatGPT/Codex Users

1. Go to [chat.openai.com](https://chat.openai.com) and create a new **GPT**
2. Paste instructions from `codex/instructions.md`
3. Upload knowledge files from `codex/knowledge/` (or the plugin's `knowledge/` folder)
4. Save and start using

### For Claude Code / MCP Users

1. Install the Procore MCP server (see above)
2. Use any plugin's system prompt as project instructions
3. Claude can now read and write Procore data while using plugin knowledge

---

## Target Software Integrations

| Software | Users | Compatible Plugins |
|----------|-------|-------------------|
| **Procore** | 2M+ users | RFI Response, Daily Log, Change Order, Safety (via MCP server) |
| **Buildertrend** | 1M+ users | Daily Log, Estimating, Change Order |
| **Bluebeam** | 300K+ users | Estimating, RFI Response |
| **PlanSwift** | 100K+ users | Estimating Assistant |

---

## Who This Is For

- **Project managers** drowning in RFIs and change orders -- draft responses and COs in minutes
- **Superintendents** spending 1+ hours on daily logs -- paste field notes and get a professional report
- **Estimators** reviewing takeoffs and checking for gaps -- catch missing items before they become cost overruns
- **Safety managers** creating weekly toolbox talks and filing incident reports -- OSHA-compliant docs on demand
- **General contractors** who want consistent, professional documentation across every project

---

## Pricing

| Tier | What You Get | Price |
|------|-------------|-------|
| Single Plugin | One plugin with Claude + ChatGPT versions, knowledge files, and example | $149-$199 |
| PM Bundle | All 5 plugins + Procore MCP server | $599 |
| Pro Access | All plugins + MCP server + updates + new plugin drops | $59/month |

---

## Repository Structure

```
openclaw-construction/
  README.md                          This file
  mcp-server/                        Procore MCP Server (TypeScript, 14 tools, 2 prompts)
  plugins/
    rfi-response-system/
      claude/system-prompt.md        Claude Project instructions
      codex/instructions.md          ChatGPT/Codex GPT instructions
      knowledge/                     CSI MasterFormat divisions, RFI response templates
      examples/                      Complete RFI response example (conduit conflict)
    daily-log-reporter/
      claude/system-prompt.md
      codex/instructions.md
      knowledge/                     Weather impact reference
      examples/                      Complete daily log example (slab pour)
    estimating-assistant/
      claude/system-prompt.md
      codex/instructions.md
      knowledge/                     General conditions checklist (100+ items)
      examples/                      Complete estimate review example (10K SF office)
    change-order-manager/
      claude/system-prompt.md
      codex/instructions.md
      knowledge/                     OH&P markup rates by contract type
      examples/                      Complete change order example (VCT to polished concrete)
    safety-compliance/
      claude/system-prompt.md
      codex/instructions.md
      knowledge/                     OSHA 1926 quick reference, 10 toolbox talks
      examples/                      Toolbox talk + incident report examples
```

---

Built by [OpenClaw](https://openclaw.ai) -- AI automation for professionals.
