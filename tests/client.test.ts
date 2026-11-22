import { describe, expect, it } from 'vitest';

import { XTreeClient } from '../src/client.js';

function envelope(data: unknown, meta: Record<string, unknown> = {}) {
  return {
    ok: true,
    data,
    meta: { request_id: '01JMOCK', ...meta },
    error: null,
  };
}

describe('XTreeClient', () => {
  it('fetches balance', async () => {
    const fetchImpl = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      expect(url).toContain('/account/balance');
      expect(init?.headers).toMatchObject({
        'X-XTREE-Key': 'xt_test_key',
      });
      return new Response(JSON.stringify(envelope({ balance_cny: 42.5 })), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new XTreeClient({ apiKey: 'xt_test_key', fetch: fetchImpl });
    const resp = await client.account.balance();
    expect(resp.data.balance_cny).toBe(42.5);
    expect(client.lastMeta?.requestId).toBe('01JMOCK');
  });

  it('searches videos with keyword and page', async () => {
    let body = '';
    const fetchImpl = async (_input: RequestInfo | URL, init?: RequestInit) => {
      body = String(init?.body ?? '');
      return new Response(JSON.stringify(envelope({ items: [], session: 'next' }, { cost_cny: 0.5 })), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const client = new XTreeClient({ apiKey: 'xt_test_key', fetch: fetchImpl });
    const resp = await client.wechat.search.videos({ keyword: 'test', page: 2, session: 's1' });
    expect(JSON.parse(body)).toEqual({ keyword: 'test', page: 2, session: 's1' });
    expect(resp.data).toEqual({ items: [], session: 'next' });
    expect(client.lastMeta?.costCny).toBe(0.5);
  });

  it('requires api key', () => {
    const prev = process.env.XTREE_API_KEY;
    delete process.env.XTREE_API_KEY;
    expect(() => new XTreeClient()).toThrow(/XTREE_API_KEY/);
    if (prev) process.env.XTREE_API_KEY = prev;
  });
});
