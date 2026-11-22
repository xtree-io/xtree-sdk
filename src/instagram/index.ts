import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class InstagramAPI {
  constructor(private readonly http: HTTPClient) {}

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/instagram/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/instagram/users/posts', body);
  }

  posts_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/instagram/posts/detail', body);
  }

  posts_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/instagram/posts/comments', body);
  }

  search_users(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/instagram/search/users', body);
  }
}
