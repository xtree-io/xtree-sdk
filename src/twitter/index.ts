import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class TwitterAPI {
  constructor(private readonly http: HTTPClient) {}

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/twitter/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/twitter/users/posts', body);
  }

  posts_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/twitter/posts/detail', body);
  }

  posts_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/twitter/posts/comments', body);
  }

  search_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/twitter/search/posts', body);
  }
}
