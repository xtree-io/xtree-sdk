import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class FacebookAPI {
  constructor(private readonly http: HTTPClient) {}

  search_general(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/facebook/search/general', body);
  }

  search_users(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/facebook/search/users', body);
  }
}
