import type { ResponseMeta } from './types.js';

export class XTreeError extends Error {
  readonly code: string;
  readonly statusCode?: number;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: {
      code?: string;
      statusCode?: number;
      requestId?: string;
      details?: unknown;
    } = {},
  ) {
    super(message);
    this.name = 'XTreeError';
    this.code = options.code ?? 'UNKNOWN';
    this.statusCode = options.statusCode;
    this.requestId = options.requestId;
    this.details = options.details;
  }

  override toString(): string {
    const parts = [this.code, this.message];
    if (this.requestId) parts.push(`request_id=${this.requestId}`);
    return parts.join(': ');
  }
}

export class XTreeAuthError extends XTreeError {}
export class XTreeValidationError extends XTreeError {}
export class XTreeInsufficientBalanceError extends XTreeError {}
export class XTreeRateLimitError extends XTreeError {}
export class XTreeUpstreamError extends XTreeError {}

const ERROR_MAP: Record<string, typeof XTreeError> = {
  UNAUTHORIZED: XTreeAuthError,
  FORBIDDEN: XTreeAuthError,
  VALIDATION_ERROR: XTreeValidationError,
  INSUFFICIENT_BALANCE: XTreeInsufficientBalanceError,
  RATE_LIMITED: XTreeRateLimitError,
  UPSTREAM_ERROR: XTreeUpstreamError,
  EDGE_UNAVAILABLE: XTreeUpstreamError,
  INTERNAL_ERROR: XTreeError,
  NOT_FOUND: XTreeError,
};

interface EnvelopePayload {
  ok?: boolean;
  data?: unknown;
  meta?: Record<string, unknown>;
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
}

export function parseMeta(raw: Record<string, unknown> = {}): ResponseMeta {
  return {
    requestId: String(raw.request_id ?? ''),
    costCny: optionalNumber(raw.cost_cny),
    balanceCny: optionalNumber(raw.balance_cny),
    rateLimitRemaining: optionalInt(raw.rate_limit_remaining),
  };
}

function optionalNumber(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  return Number(value);
}

function optionalInt(value: unknown): number | undefined {
  if (value === null || value === undefined) return undefined;
  return parseInt(String(value), 10);
}

export function errorFromEnvelope(
  payload: EnvelopePayload,
  statusCode?: number,
): XTreeError {
  const err = payload.error ?? {};
  const code = String(err.code ?? 'UNKNOWN');
  const message = String(err.message ?? 'API request failed');
  const meta = payload.meta ?? {};
  const requestId = meta.request_id ? String(meta.request_id) : undefined;
  const Cls = ERROR_MAP[code] ?? XTreeError;
  return new Cls(message, {
    code,
    statusCode,
    requestId,
    details: err.details,
  });
}
