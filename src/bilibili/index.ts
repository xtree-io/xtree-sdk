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

  videos_sub_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/sub-comments', body);
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

  /** @deprecated Same as users_posts (the separate endpoint was merged into it). */
  users_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return this.users_posts(body);
  }

  popular_list(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/popular/list', body);
  }

  rank_list(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/rank/list', body);
  }

  hot_search(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/hot/search', body);
  }

  videos_danmaku(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/danmaku', body);
  }

  videos_transcript(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/bilibili/videos/transcript', body);
  }
}
