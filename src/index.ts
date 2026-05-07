import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

type Language = "zh" | "en";

const API_BASE = "https://api.iping.cc/v1/query";
const REQUEST_TIMEOUT_MS = 10_000;

const server = new McpServer({
  name: "iping-geo-mcp",
  version: "0.1.0"
});

const toolInputSchema = {
  ip: z
    .string()
    .min(1, "ip is required")
    .describe("IPv4 or IPv6 address to query, e.g. 8.8.8.8"),
  language: z
    .enum(["zh", "en"])
    .default("zh")
    .describe("Response language: zh or en")
};

server.registerTool(
  "query_ip_geo",
  {
    title: "Query IP Geolocation",
    description:
      "Query latitude/longitude and geo information from api.iping.cc using an IP address.",
    inputSchema: toolInputSchema
  },
  async ({ ip, language }) => {
    const lang: Language = language ?? "zh";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const url = new URL(API_BASE);
      url.searchParams.set("ip", ip);
      url.searchParams.set("language", lang);

      const response = await fetch(url, {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json"
        }
      });

      const raw = await response.text();

      if (!response.ok) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                {
                  ok: false,
                  status: response.status,
                  error: "Upstream API returned non-2xx",
                  body: safeJsonParse(raw)
                },
                null,
                2
              )
            }
          ],
          isError: true
        };
      }

      const data = safeJsonParse(raw);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: true,
                source: "api.iping.cc",
                query: {
                  ip,
                  language: lang
                },
                data
              },
              null,
              2
            )
          }
        ]
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown request error";

      const normalizedError =
        message.includes("aborted") || message.includes("AbortError")
          ? `Request timed out after ${REQUEST_TIMEOUT_MS}ms`
          : message;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                ok: false,
                error: normalizedError,
                hint: "Please verify network access and the IP format."
              },
              null,
              2
            )
          }
        ],
        isError: true
      };
    } finally {
      clearTimeout(timer);
    }
  }
);

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`[iping-geo-mcp] fatal: ${message}\n`);
  process.exit(1);
});
