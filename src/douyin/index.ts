import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class DouyinAPI {
  constructor(private readonly http: HTTPClient) {}

  videos_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/videos/detail', body);
  }

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/users/posts', body);
  }

  videos_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/videos/comments', body);
  }

  videos_sub_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/videos/sub-comments', body);
  }

  search_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/search/videos', body);
  }

  search_suggestions(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/search/suggestions', body);
  }

  users_creator_metrics(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/users/creator-metrics', body);
  }

  ids_resolve(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/douyin/ids/resolve', body);
  }
}
