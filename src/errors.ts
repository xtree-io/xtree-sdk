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
export class XTreeServiceError extends XTreeError {}
/** 旧名保留，便于已有 catch 继续接住 502。 */
export const XTreeUpstreamError = XTreeServiceError;

const ERROR_MAP: Record<string, typeof XTreeError> = {
  UNAUTHORIZED: XTreeAuthError,
  FORBIDDEN: XTreeAuthError,
  VALIDATION_ERROR: XTreeValidationError,
  INSUFFICIENT_BALANCE: XTreeInsufficientBalanceError,
  RATE_LIMITED: XTreeRateLimitError,
  UPSTREAM_ERROR: XTreeServiceError,
  EDGE_UNAVAILABLE: XTreeServiceError,
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
    observationId: optionalString(raw.observation_id),
    observedAt: optionalString(raw.observed_at),
    basis: optionalString(raw.basis),
    contractRev: optionalInt(raw.contract_rev),
    origin: optionalString(raw.origin),
    cacheHit: optionalBool(raw.cache_hit),
    cacheAgeSec: optionalInt(raw.cache_age_sec),
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

function optionalString(value: unknown): string | undefined {
  if (value === null || value === undefined || value === '') return undefined;
  return String(value);
}

function optionalBool(value: unknown): boolean | undefined {
  if (value === null || value === undefined) return undefined;
  return Boolean(value);
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
  let Cls = ERROR_MAP[code] ?? XTreeError;
  if (code === 'INTERNAL_ERROR' && statusCode === 502) {
    Cls = XTreeServiceError;
  }
  return new Cls(message, {
    code,
    statusCode,
    requestId,
    details: err.details,
  });
}
