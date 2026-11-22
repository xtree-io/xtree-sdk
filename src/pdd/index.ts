import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class PddAPI {
  constructor(private readonly http: HTTPClient) {}

  items_comments_submit(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/pdd/items/comments/submit', body);
  }

  items_comments_status(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/pdd/items/comments/status', body);
  }

  items_comments_fetch(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/pdd/items/comments/fetch', body);
  }
}
