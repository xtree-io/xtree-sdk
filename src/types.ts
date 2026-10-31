export const DEFAULT_BASE_URL = 'https://api.xtree.io/api';
export const DEFAULT_TIMEOUT_MS = 60_000;
export const MAX_RETRIES = 3;
export const RETRY_STATUS = new Set([429, 502, 503]);

export interface ResponseMeta {
  requestId: string;
  costCny?: number;
  balanceCny?: number;
  rateLimitRemaining?: number;
}

export interface APIResponse<T = unknown> {
  data: T;
  meta: ResponseMeta;
}

export interface XTreeClientOptions {
  apiKey?: string;
  baseUrl?: string;
  verifyCode?: string;
  timeoutMs?: number;
  fetch?: typeof fetch;
}

export interface SearchVideosParams {
  keyword: string;
  page?: number;
  session?: string;
  [key: string]: unknown;
}
