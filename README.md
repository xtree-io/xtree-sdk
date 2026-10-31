# @xtree/sdk — XTREE TypeScript SDK

Official TypeScript client for the [XTREE](https://www.xtree.io) social media **real-time raw data** API. Accounts, content, media, comments — for monitoring and integration. **Not** a BI or analytics platform.

## Install

npm package `@xtree/sdk` is not on the public registry yet. Install from GitHub:

```bash
npm install git+https://github.com/xtree-io/xtree-sdk.git
```

Or clone and build:

```bash
git clone https://github.com/xtree-io/xtree-sdk.git
cd xtree-sdk
npm install
npm run build
```

Requires Node.js 18+.

## Get an API Key

1. Sign up at [www.xtree.io](https://www.xtree.io/login?tab=signup).
2. Copy a key (`xt_live_...`).
3. Set `XTREE_API_KEY`.

## Quickstart

```typescript
import { XTreeClient } from '@xtree/sdk';

const client = new XTreeClient({ apiKey: process.env.XTREE_API_KEY });

const balance = await client.account.balance();
console.log(balance.data.balance_cny);

const articles = await client.wechat.search.articles({ keyword: '人民日报', page: 1 });
console.log(articles.data, client.lastMeta?.costCny);
```

## Billing

Pay per call from your wallet (CNY). Incomplete delivery is not billed. Unit prices: [API Catalog](https://www.xtree.io/catalog). No volume tiers and no `/pricing` plans page. Bulk / bank transfer: [business@xtree.io](mailto:business@xtree.io).

## Docs

- Quick start: https://www.xtree.io/docs
- API reference: https://www.xtree.io/docs/apis
- OpenAPI: https://api.xtree.io/api/openapi.json
- Python SDK: https://github.com/xtree-io/xtree-python
- MCP: https://github.com/xtree-io/xtree-mcp

## Environment

| Variable | Required | Default |
|----------|----------|---------|
| `XTREE_API_KEY` | yes | — |
| `XTREE_BASE_URL` | no | `https://api.xtree.io/api` |
| `XTREE_VERIFY_CODE` | no | — |

## Mirror notice

**Do not develop in this repository.** It is a public mirror. Open issues here for feedback. Contact: [business@xtree.io](mailto:business@xtree.io).

## License

MIT.
