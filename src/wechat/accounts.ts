import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { pageBody, post } from './_helpers.js';

/** WeChat account + historical posts APIs. */
export class WechatAccountsAPI {
  constructor(private readonly http: HTTPClient) {}

  postsToday(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/posts/today', body);
  }

  /** Historical posts. Pass `cursor` from the previous `data.next_cursor` to page. */
  posts(
    accountId: string,
    params: { page?: number; cursor?: string; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/posts/list', pageBody({ ...params, account_id: accountId }));
  }

  ghIdPosts(
    ghId: string,
    params: { page?: number; cursor?: string; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/ghid/posts', pageBody({ ...params, gh_id: ghId }));
  }

  /** @deprecated Use ghIdPosts */
  ghidPosts(
    ghId: string,
    params: { page?: number; cursor?: string; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return this.ghIdPosts(ghId, params);
  }

  ghIdChannels(ghId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/ghid/channels', { gh_id: ghId, ...body });
  }

  /** @deprecated Use ghIdChannels */
  ghidChannels(ghId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return this.ghIdChannels(ghId, body);
  }

  principal(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/principal', body);
  }

  profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/profile', body);
  }

  search(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/search', body);
  }

  searchGh(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/search/gh', body);
  }

  searchByOwner(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/search-by-owner', body);
  }

  searchByOwnerLive(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/accounts/search-by-owner/live', body);
  }
}
