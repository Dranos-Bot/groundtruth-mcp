// Minimal example: connect to the hosted GroundTruth MCP server and list its tools.
//   npm install && node connect.mjs
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const client = new Client({ name: "example", version: "1.0.0" }, { capabilities: {} });
await client.connect(new StreamableHTTPClientTransport(new URL("https://gtfi.ai/mcp")));

const { tools } = await client.listTools();
console.log("tools:", tools.map((t) => t.name).join(", "));

// get_pricing is free and has no side effects — a safe first call.
const pricing = await client.callTool({ name: "get_pricing", arguments: {} });
console.log(JSON.parse(pricing.content[0].text).groundtruth.plans.map((p) => `${p.name}: $${p.price}`));

// read_scan is ADVISORY. A certified technician reviews and signs off before any coring.
// const scan = await client.callTool({ name: "read_scan",
//   arguments: { image_url: "https://example.com/your-scan.jpg", discipline: "gpr" } });

await client.close();
