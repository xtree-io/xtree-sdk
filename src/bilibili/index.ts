import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class BilibiliAPI {
  constructor(private readonly http: HTTPClient) {}

  search_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/search/videos', body);
  }

  videos_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/detail', body);
  }

  videos_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/comments', body);
  }

  videos_download(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/download', body);
  }

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/users/posts', body);
  }

  users_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/users/videos', body);
  }

  popular_list(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/popular/list', body);
  }

  rank_list(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/rank/list', body);
  }
}
