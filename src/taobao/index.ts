import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class TaobaoAPI {
  constructor(private readonly http: HTTPClient) {}

  items_search(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/taobao/items/search', body);
  }

  items_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/taobao/items/detail', body);
  }

  shops_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/taobao/shops/comments', body);
  }
}
