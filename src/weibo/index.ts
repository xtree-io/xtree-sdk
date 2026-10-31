import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class WeiboAPI {
  constructor(private readonly http: HTTPClient) {}

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/users/posts', body);
  }

  users_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/users/videos', body);
  }

  posts_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/posts/detail', body);
  }

  posts_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/posts/comments', body);
  }

  posts_sub_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/posts/sub-comments', body);
  }

  topics_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/topics/detail', body);
  }

  topics_stats(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/topics/stats', body);
  }

  hot_search(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/hot/search', body);
  }

  search_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/weibo/search/posts', body);
  }
}
