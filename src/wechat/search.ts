import type { HTTPClient } from '../http.js';
import type { APIResponse, SearchVideosParams } from '../types.js';
import { post, searchBody } from './_helpers.js';

export class WechatSearchAPI {
  constructor(private readonly http: HTTPClient) {}

  articles(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/articles', searchBody(params));
  }

  articlesCategories(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/articles/categories', searchBody(params));
  }

  videos(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/videos', searchBody(params));
  }

  videosTab(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/videos/tab', searchBody(params));
  }

  videosCategories(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/videos/categories', searchBody(params));
  }

  mixed(params: {
    keyword?: string;
    mode?: number;
    page?: number;
    session?: string;
    [key: string]: unknown;
  } = {}): Promise<APIResponse<unknown>> {
    const { keyword, mode, page = 1, session, ...extra } = params;
    const body: Record<string, unknown> = { page, ...extra };
    if (keyword !== undefined) body.keyword = keyword;
    if (mode !== undefined) body.mode = mode;
    if (session !== undefined) body.session = session;
    return post(this.http, '/wechat/search/mixed', body);
  }

  accounts(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/accounts', searchBody(params));
  }

  suggestions(params: { keyword: string; [key: string]: unknown }): Promise<APIResponse<unknown>> {
    const { keyword, ...extra } = params;
    return post(this.http, '/wechat/search/suggestions', { keyword, ...extra });
  }

  miniprogramsCategories(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/miniprograms/categories', searchBody(params));
  }

  indexCategories(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/index/categories', searchBody(params));
  }

  channelsAccountsCategories(params: SearchVideosParams): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/search/channels/accounts/categories', searchBody(params));
  }
}
