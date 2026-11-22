import { XTreeError, errorFromEnvelope, parseMeta } from './errors.js';
import {
  DEFAULT_BASE_URL,
  DEFAULT_TIMEOUT_MS,
  MAX_RETRIES,
  RETRY_STATUS,
  type APIResponse,
  type ResponseMeta,
} from './types.js';

export const API_KEY_HEADER = 'X-XTREE-Key';
export const VERIFY_CODE_HEADER = 'X-Verify-Code';

export interface HTTPClientOptions {
  apiKey: string;
  baseUrl?: string;
  verifyCode?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export class HTTPClient {
  readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly verifyCode?: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;
  lastMeta: ResponseMeta | null = null;

  constructor(options: HTTPClientOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, '');
    this.verifyCode = options.verifyCode;
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  async request<T = unknown>(
    method: string,
    path: string,
    options: { json?: Record<string, unknown>; params?: Record<string, string> } = {},
  ): Promise<APIResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);
    if (options.params) {
      for (const [key, value] of Object.entries(options.params)) {
        url.searchParams.set(key, value);
      }
    }

    const headers: Record<string, string> = {
      [API_KEY_HEADER]: this.apiKey,
      Accept: 'application/json',
      'User-Agent': '@xtree/sdk/0.1.0',
    };
    if (this.verifyCode) {
      headers[VERIFY_CODE_HEADER] = this.verifyCode;
    }
    if (options.json) {
      headers['Content-Type'] = 'application/json';
    }

    const httpMethod = method.toUpperCase();
    let lastError: unknown;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const response = await this.fetchImpl(url, {
          method: httpMethod,
          headers,
          body: options.json ? JSON.stringify(options.json) : undefined,
          signal: controller.signal,
        });

        const payload = await parseJsonResponse(response);

        if (RETRY_STATUS.has(response.status) && attempt < MAX_RETRIES) {
          await sleep(2 ** attempt * 500);
          continue;
        }

        const result = unwrapEnvelope<T>(payload, response.status);
        this.lastMeta = result.meta;
        return result;
      } catch (error) {
        lastError = error;
        if (attempt >= MAX_RETRIES) break;
        await sleep(2 ** attempt * 500);
      } finally {
        clearTimeout(timer);
      }
    }

    throw lastError instanceof Error
      ? lastError
      : new Error('Request failed after retries');
  }
}

async function parseJsonResponse(response: Response): Promise<Record<string, unknown>> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      return data as Record<string, unknown>;
    }
  } catch {
    // fall through
  }
  throw new XTreeError(`Non-JSON response (HTTP ${response.status})`, {
    code: 'INVALID_RESPONSE',
    statusCode: response.status,
  });
}

function unwrapEnvelope<T>(
  payload: Record<string, unknown>,
  statusCode: number,
): APIResponse<T> {
  const meta = parseMeta((payload.meta as Record<string, unknown>) ?? {});
  if (payload.ok === true) {
    return { data: payload.data as T, meta };
  }
  throw errorFromEnvelope(payload, statusCode);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
