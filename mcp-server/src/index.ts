#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const CLIENT_ID = process.env.PROCORE_CLIENT_ID;
const CLIENT_SECRET = process.env.PROCORE_CLIENT_SECRET;
const COMPANY_ID = process.env.PROCORE_COMPANY_ID;
let accessToken = process.env.PROCORE_ACCESS_TOKEN ?? "";
let refreshToken = process.env.PROCORE_REFRESH_TOKEN ?? "";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error(
    "ERROR: PROCORE_CLIENT_ID and PROCORE_CLIENT_SECRET are required.\n" +
      "Create an app at https://developers.procore.com to get credentials.\n" +
      "Also set PROCORE_COMPANY_ID, PROCORE_ACCESS_TOKEN, and PROCORE_REFRESH_TOKEN.",
  );
  process.exit(1);
}

const BASE_URL = "https://api.procore.com/rest/v1.0";
const AUTH_URL = "https://login.procore.com/oauth/token";

async function refreshAccessToken(): Promise<void> {
  if (!refreshToken) {
    throw new Error(
      "No refresh token available. Re-authenticate with Procore.",
    );
  }
  const res = await fetch(AUTH_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
    }),
  });
  if (!res.ok) {
    throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as {
    access_token: string;
    refresh_token: string;
  };
  accessToken = data.access_token;
  refreshToken = data.refresh_token;
  console.error("Procore access token refreshed successfully");
}

interface ProcoreRequestOptions {
  method?: string;
  path: string;
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

async function procoreRequest<T = unknown>(
  opts: ProcoreRequestOptions,
): Promise<T> {
  const url = new URL(`${BASE_URL}${opts.path}`);
  if (opts.params) {
    for (const [k, v] of Object.entries(opts.params)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const serializedBody = opts.body ? JSON.stringify(opts.body) : undefined;
  const method = opts.method ?? "GET";
  const makeFetchOpts = () => ({
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Procore-Company-Id": COMPANY_ID ?? "",
    },
    body: serializedBody,
  });

  let res = await fetch(url.toString(), makeFetchOpts());
  if (res.status === 401) {
    await refreshAccessToken();
    res = await fetch(url.toString(), makeFetchOpts());
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Procore API ${res.status}: ${text}`);
  }

  return res.json() as Promise<T>;
}

function mcpSuccess(data: unknown) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
  };
}

function mcpError(error: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: `Error: ${error instanceof Error ? error.message : String(error)}`,
      },
    ],
    isError: true as const,
  };
}

const server = new McpServer(
  { name: "procore-mcp", version: "1.0.0" },
  {
    instructions:
      "This server connects to Procore Construction Management. " +
      "Use list_projects to find projects, then use project_id for all other tools. " +
      "Tools cover RFIs, daily logs, change orders, safety observations, and budgets.",
  },
);

server.registerTool(
  "list_projects",
  {
    title: "List Projects",
    description: "List all active projects in the Procore company account.",
    inputSchema: {
      status: z
        .enum(["active", "inactive", "all"])
        .optional()
        .default("active"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ status }) => {
    try {
      const params: Record<string, string> = {};
      if (status && status !== "all") params["filters[status]"] = status;
      return mcpSuccess(await procoreRequest({ path: "/projects", params }));
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "list_rfis",
  {
    title: "List RFIs",
    description:
      "List RFIs for a project. Filter by status (open, closed, draft) or responsible party.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      status: z
        .enum(["open", "closed", "draft", "all"])
        .optional()
        .default("open"),
      responsibleContractor: z
        .string()
        .optional()
        .describe("Filter by responsible contractor name"),
      limit: z.number().optional().default(25),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, status, responsibleContractor, limit }) => {
    try {
      const params: Record<string, string | number> = { per_page: limit };
      if (status && status !== "all") params["filters[status]"] = status;
      if (responsibleContractor)
        params["filters[responsible_contractor]"] = responsibleContractor;
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/rfis`,
          params,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "get_rfi",
  {
    title: "Get RFI Detail",
    description:
      "Get full details for a specific RFI including questions, responses, attachments, and history.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      rfiId: z.number().describe("RFI ID"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, rfiId }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/rfis/${rfiId}`,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "create_rfi_response",
  {
    title: "Create RFI Response",
    description: "Submit a response to an open RFI in Procore.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      rfiId: z.number().describe("RFI ID to respond to"),
      body: z
        .string()
        .describe("Response text — the actual answer to the RFI question"),
    },
    annotations: { destructiveHint: false, idempotentHint: false },
  },
  async ({ projectId, rfiId, body }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          method: "POST",
          path: `/projects/${projectId}/rfis/${rfiId}/replies`,
          body: { reply: { body } },
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "create_daily_log",
  {
    title: "Create Daily Log",
    description:
      "Create or update a daily log entry in Procore with notes about the day's work.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      date: z.string().describe("Date in YYYY-MM-DD format"),
      notes: z
        .string()
        .describe("Daily log notes — work completed, issues, observations"),
    },
    annotations: { destructiveHint: false, idempotentHint: false },
  },
  async ({ projectId, date, notes }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          method: "POST",
          path: `/projects/${projectId}/daily_logs/notes_logs`,
          body: { notes_log: { date, notes } },
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "list_daily_logs",
  {
    title: "List Daily Logs",
    description:
      "List daily log entries for a project within a date range. Useful for generating weekly summaries.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      startDate: z.string().describe("Start date YYYY-MM-DD"),
      endDate: z.string().describe("End date YYYY-MM-DD"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, startDate, endDate }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/daily_logs/notes_logs`,
          params: {
            "filters[date_min]": startDate,
            "filters[date_max]": endDate,
          },
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "get_manpower_log",
  {
    title: "Get Manpower Log",
    description:
      "Get workforce/headcount data for a specific date — trade breakdown and hours.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      date: z.string().describe("Date YYYY-MM-DD"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, date }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/daily_logs/manpower_logs`,
          params: { "filters[date]": date },
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "list_change_orders",
  {
    title: "List Change Orders",
    description:
      "List all change order requests for a project. Includes status, amount, and reason.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      status: z
        .enum(["pending", "approved", "rejected", "all"])
        .optional()
        .default("all"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, status }) => {
    try {
      const params: Record<string, string> = {};
      if (status && status !== "all") params["filters[status]"] = status;
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/change_order_requests`,
          params,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "create_change_order_request",
  {
    title: "Create Change Order Request",
    description:
      "Create a new change order request (PCO) in Procore with cost and schedule impact.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      title: z.string().describe("Change order title"),
      description: z
        .string()
        .describe("Detailed description of the scope change and justification"),
      estimatedAmount: z
        .number()
        .optional()
        .describe("Estimated cost impact in dollars"),
      changeReason: z
        .enum([
          "owner_change",
          "design_error",
          "field_condition",
          "code_change",
          "value_engineering",
        ])
        .optional()
        .describe("Reason for the change order"),
      scheduleDaysImpact: z
        .number()
        .optional()
        .describe("Schedule impact in calendar days"),
    },
    annotations: { destructiveHint: false, idempotentHint: false },
  },
  async ({
    projectId,
    title,
    description,
    estimatedAmount,
    changeReason,
    scheduleDaysImpact,
  }) => {
    try {
      const body: Record<string, unknown> = {
        change_order_request: {
          title,
          description,
          ...(estimatedAmount && { estimated_amount: estimatedAmount }),
          ...(changeReason && { change_reason: changeReason }),
          ...(scheduleDaysImpact && { schedule_impact: scheduleDaysImpact }),
        },
      };
      return mcpSuccess(
        await procoreRequest({
          method: "POST",
          path: `/projects/${projectId}/change_order_requests`,
          body,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "create_observation",
  {
    title: "Create Safety Observation",
    description:
      "Log a safety observation or hazard in Procore. Use for toolbox talk follow-ups or field findings.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      title: z.string().describe("Observation title"),
      description: z
        .string()
        .describe("Detailed description of the safety observation or hazard"),
      priority: z
        .enum(["low", "medium", "high", "critical"])
        .optional()
        .default("medium"),
      type: z
        .enum(["positive", "negative", "neutral"])
        .optional()
        .default("negative"),
      tradeId: z.number().optional().describe("Trade/vendor ID responsible"),
    },
    annotations: { destructiveHint: false, idempotentHint: false },
  },
  async ({ projectId, title, description, priority, type, tradeId }) => {
    try {
      const body: Record<string, unknown> = {
        observation: {
          title,
          description,
          priority,
          type_name: type,
          ...(tradeId && { trade_id: tradeId }),
        },
      };
      return mcpSuccess(
        await procoreRequest({
          method: "POST",
          path: `/projects/${projectId}/observations/items`,
          body,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "get_budget",
  {
    title: "Get Project Budget",
    description:
      "Get the current budget summary for a project — original budget, changes, revised budget, costs to date.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/budget/views`,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "list_submittals",
  {
    title: "List Submittals",
    description:
      "List submittals for a project. Useful for referencing when drafting RFI responses.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      status: z.enum(["open", "closed", "all"]).optional().default("all"),
      limit: z.number().optional().default(25),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, status, limit }) => {
    try {
      const params: Record<string, string | number> = { per_page: limit };
      if (status && status !== "all") params["filters[status]"] = status;
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/submittals`,
          params,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "list_punch_items",
  {
    title: "List Punch List Items",
    description:
      "List punch list items for a project — open items that need correction before closeout.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      status: z.enum(["open", "closed", "all"]).optional().default("open"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, status }) => {
    try {
      const params: Record<string, string> = {};
      if (status && status !== "all") params["filters[status]"] = status;
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/punch_items`,
          params,
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerTool(
  "get_weather_log",
  {
    title: "Get Weather Log",
    description:
      "Get weather conditions recorded in Procore for a specific date.",
    inputSchema: {
      projectId: z.number().describe("Procore project ID"),
      date: z.string().describe("Date YYYY-MM-DD"),
    },
    annotations: { destructiveHint: false, idempotentHint: true },
  },
  async ({ projectId, date }) => {
    try {
      return mcpSuccess(
        await procoreRequest({
          path: `/projects/${projectId}/daily_logs/weather_logs`,
          params: { "filters[date]": date },
        }),
      );
    } catch (error) {
      return mcpError(error);
    }
  },
);

server.registerPrompt(
  "weekly-owner-report",
  {
    title: "Weekly Owner Report",
    description:
      "Generate a professional weekly owner report from daily logs, RFIs, and change orders",
    argsSchema: {
      projectId: z.string().describe("Procore project ID"),
      weekEnding: z.string().describe("Week ending date YYYY-MM-DD"),
    },
  },
  ({ projectId, weekEnding }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text:
            `Generate a weekly owner report for project ${projectId}, week ending ${weekEnding}.\n\n` +
            "1. Fetch daily logs for the past 7 days\n" +
            "2. Fetch manpower logs for headcount summary\n" +
            "3. Check open RFIs and any new responses\n" +
            "4. Check pending change orders\n" +
            "5. Check weather logs for impact days\n\n" +
            "Produce a professional report with:\n" +
            "- Executive summary (2-3 sentences)\n" +
            "- Work completed this week by trade\n" +
            "- Workforce summary (total headcount, trades)\n" +
            "- Weather impacts\n" +
            "- Open RFIs requiring attention\n" +
            "- Pending change orders with cost impact\n" +
            "- Issues and risks\n" +
            "- 2-week look-ahead\n" +
            "- Items requiring owner decision",
        },
      },
    ],
  }),
);

server.registerPrompt(
  "draft-rfi-response",
  {
    title: "Draft RFI Response",
    description: "Pull an RFI from Procore and draft a professional response",
    argsSchema: {
      projectId: z.string().describe("Procore project ID"),
      rfiId: z.string().describe("RFI ID to respond to"),
    },
  },
  ({ projectId, rfiId }) => ({
    messages: [
      {
        role: "user" as const,
        content: {
          type: "text" as const,
          text:
            `Fetch RFI #${rfiId} from project ${projectId}.\n\n` +
            "Then draft a professional response that includes:\n" +
            "1. Restate the question clearly\n" +
            "2. Reference relevant spec sections or drawings mentioned\n" +
            "3. Provide a clear, actionable answer\n" +
            "4. Assess cost impact (none / potential)\n" +
            "5. Assess schedule impact (none / X days)\n" +
            "6. Flag if a change order is needed\n" +
            "7. List any follow-up actions",
        },
      },
    ],
  }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Procore MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
