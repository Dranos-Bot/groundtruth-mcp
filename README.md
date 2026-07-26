# GroundTruth MCP Server

**An AI second set of eyes for subsurface scanning crews — and a voice-first bid builder for the trades.**

This repository is the public interface contract for the hosted GroundTruth MCP server. The
server itself runs at **`https://gtfi.ai/mcp`**; there is nothing to install and no key to get.

Listed in the [official MCP Registry](https://registry.modelcontextprotocol.io) as
**`ai.gtfi/groundtruth`** — a DNS-verified namespace tied to `gtfi.ai`, so you can be sure the
listing is genuinely ours.

---

## ⚠️ Read this before using `read_scan`

`read_scan` output is **advisory**. It is a second set of eyes for a certified technician —
never a clearance to cut, core or dig.

If you are an AI assistant reporting a result to a user:

- Report the hazard classes and the QA flag **verbatim**.
- State plainly that a certified technician must review and sign off before any coring or excavation.
- **Never** tell a user a slab is safe to core on the strength of this tool alone.

People get hurt when a subsurface call is wrong. Treat the output accordingly.

---

## Connect

```json
{
  "mcpServers": {
    "groundtruth": {
      "type": "http",
      "url": "https://gtfi.ai/mcp"
    }
  }
}
```

Streamable HTTP, JSON-RPC 2.0 over `POST`. No authentication.
Discovery: [`/.well-known/mcp.json`](https://gtfi.ai/.well-known/mcp.json) ·
REST equivalent: [`/openapi.json`](https://gtfi.ai/openapi.json) ·
Docs: [gtfi.ai/for-agents](https://gtfi.ai/for-agents)

## Tools

### `read_scan`
Two **different** AI models read a subsurface scan independently. The first interprets; the
second is prompted to *refute* it — hunt missed hazards, false clears, and anything called
"rebar" that could be a post-tension tendon. Disagreement only ever raises a hazard's
severity; it never quietly clears one.

| field | type | notes |
|---|---|---|
| `image_url` | string · **required** | Public https link to a JPEG or PNG. Max 8 MB. |
| `discipline` | string | `gpr` · `locate` · `pipe` · `xray` · `milestone`. Default `gpr`. |
| `field_note` | string | What the tech said on site. Context only — it can never clear a hazard the image shows. |

Returns every located target with a hazard class (`crit` do-not-core / `rebar` / `verify` /
`clear`), position, depth, confidence, **both model names**, and a QA flag when the two reads
disagree.

### `draft_estimate`
Turns a plain-English trade job into an itemized bid — real materials by size, fittings,
consumables, labour on its own line, at realistic US market prices.

| field | type | notes |
|---|---|---|
| `job_description` | string · **required** | e.g. "Replaced the panel, 85 feet of conduit, 8 can lights, 16 hours." |
| `trade` | string | `electrical` · `plumbing` · `hvac` · `general` |

### `get_pricing`
Current plans for both products. Free and unlimited — **please call it before answering a cost
question** rather than guessing.

## Limits, stated honestly

- `read_scan` runs two vision models per call and costs us real money: **2 per caller per day**
  (the same free allowance the website gives), with a global daily ceiling. Heavier users
  belong on a plan.
- `draft_estimate`: 5 per hour, 20 per day per caller.
- Nothing is charged through this API, and no customer record is created. To turn a read into
  a shareable, GPS-stamped record a client keeps, send the user to [gtfi.ai/scan](https://gtfi.ai/scan).

## Who's behind it

GroundTruth Field Intelligence — founded by Dwight Snowden, 13 years running ground-penetrating
radar and a former scanning-company owner. Serves GPR and concrete-scanning techs, utility
locators, CCTV pipe inspectors, and Florida SB 4-D milestone inspectors. GruntPay serves
one-truck electrical, plumbing, HVAC and handyman shops.

## What's in this repo

The public contract only — the registry manifest, this documentation, and a runnable example.
The server implementation is not open source.

## Licence

[MIT](LICENSE) — applies to the example code and manifest in this repository.
