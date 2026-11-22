import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';

export function post(
  http: HTTPClient,
  path: string,
  body: Record<string, unknown> = {},
): Promise<APIResponse<unknown>> {
  return http.request('POST', path, { json: body });
}

export function get(http: HTTPClient, path: string): Promise<APIResponse<unknown>> {
  return http.request('GET', path);
}

export function searchBody(params: {
  keyword: string;
  page?: number;
  session?: string;
  [key: string]: unknown;
}): Record<string, unknown> {
  const { keyword, page = 1, session, ...extra } = params;
  const body: Record<string, unknown> = { keyword, page, ...extra };
  if (session !== undefined) body.session = session;
  return body;
}

export function pageBody(params: {
  page?: number;
  session?: string;
  [key: string]: unknown;
}): Record<string, unknown> {
  const { page = 1, session, ...extra } = params;
  const body: Record<string, unknown> = { page, ...extra };
  if (session !== undefined) body.session = session;
  return body;
}
