import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class KuaishouAPI {
  constructor(private readonly http: HTTPClient) {}

  videos_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/videos/detail', body);
  }

  videos_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/videos/comments', body);
  }

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/users/profile', body);
  }

  users_posts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/users/posts', body);
  }

  search_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/search/videos', body);
  }

  videos_short_link(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/videos/short-link', body);
  }

  hot_board(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/hot/board', body);
  }

  ids_resolve(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/kuaishou/ids/resolve', body);
  }
}
