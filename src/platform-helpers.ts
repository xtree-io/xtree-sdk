import type { HTTPClient } from './http.js';
import type { APIResponse } from './types.js';

/** Shared POST helper for non-wechat platform clients. */
export function post(
  http: HTTPClient,
  path: string,
  body: Record<string, unknown> = {},
): Promise<APIResponse<unknown>> {
  return http.request('POST', path, { json: body });
}
