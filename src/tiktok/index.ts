import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class TiktokAPI {
  constructor(private readonly http: HTTPClient) {}

  videos_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/videos/detail', body);
  }

  videos_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/videos/comments', body);
  }

  videos_sub_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/videos/sub-comments', body);
  }

  search_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/search/videos', body);
  }

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/tiktok/users/posts', body);
  }
}
