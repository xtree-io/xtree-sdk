import { describe, expect, it } from 'vitest';

import { errorFromEnvelope, parseMeta } from '../src/errors.js';

describe('envelope', () => {
  it('parses meta fields', () => {
    const meta = parseMeta({
      request_id: '01JTEST',
      cost_cny: 0.5,
      balance_cny: 100,
      rate_limit_remaining: 9,
    });
    expect(meta.requestId).toBe('01JTEST');
    expect(meta.costCny).toBe(0.5);
    expect(meta.balanceCny).toBe(100);
    expect(meta.rateLimitRemaining).toBe(9);
  });

  it('maps insufficient balance error', () => {
    const err = errorFromEnvelope(
      {
        ok: false,
        meta: { request_id: '01JFAIL' },
        error: { code: 'INSUFFICIENT_BALANCE', message: '余额不足' },
      },
      402,
    );
    expect(err.code).toBe('INSUFFICIENT_BALANCE');
    expect(err.requestId).toBe('01JFAIL');
    expect(err.name).toBe('XTreeError');
    expect(err.constructor.name).toBe('XTreeInsufficientBalanceError');
  });
});
