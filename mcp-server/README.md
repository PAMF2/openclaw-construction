# Procore MCP Server

> Connect Claude directly to your Procore account. Manage RFIs, daily logs, change orders, safety, and budgets from within Claude.

## Tools (15)

| Tool | What It Does |
|------|-------------|
| `list_projects` | List all active projects |
| `list_rfis` | List RFIs by status, trade, or contractor |
| `get_rfi` | Full RFI detail with questions and attachments |
| `create_rfi_response` | Submit a response to an open RFI |
| `create_daily_log` | Create daily log entry with field notes |
| `list_daily_logs` | Fetch logs for a date range (weekly summaries) |
| `get_manpower_log` | Workforce headcount by trade for a date |
| `list_change_orders` | List all change order requests and status |
| `create_change_order_request` | Create a new PCO with cost/schedule impact |
| `create_observation` | Log safety observations or hazards |
| `get_budget` | Project budget summary — original, changes, revised |
| `list_submittals` | Submittals for reference when drafting RFI responses |
| `list_punch_items` | Open punch list items needing correction |
| `get_weather_log` | Weather conditions for a specific date |

## Prompts

| Prompt | Description |
|--------|------------|
| `weekly-owner-report` | Generate a professional weekly owner report from all project data |
| `draft-rfi-response` | Pull an RFI and draft a response with spec references and impact assessment |

## Installation

### Claude Desktop / Claude Code

Add to your config:

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

### Get Your Credentials

1. Go to [developers.procore.com](https://developers.procore.com)
2. Create a new App (Data Connection type)
3. Copy Client ID and Client Secret
4. Complete OAuth flow to get access + refresh tokens
5. Find your Company ID in Procore → Company Settings

The server auto-refreshes expired tokens using the refresh token.

## Example Usage

- "Show me all open RFIs on the Main Street project"
- "Draft a response to RFI #47 about the HVAC ductwork conflict"
- "Create a daily log from these field notes: poured 2nd floor, 15 workers..."
- "Generate the weekly owner report for this week"
- "Log a safety observation: missing guardrail on 3rd floor west stairwell"
- "What's our budget status? Show me change orders pending approval"

## Rate Limits

Procore allows 3,600 requests per hour. The server handles 401s with automatic token refresh.
