import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class JdAPI {
  constructor(private readonly http: HTTPClient) {}

  items_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/jd/items/detail', body);
  }

  items_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/jd/items/comments', body);
  }

  items_comments_v2(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/jd/items/comments/v2', body);
  }
}
