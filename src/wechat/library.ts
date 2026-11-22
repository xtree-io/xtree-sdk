import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from './_helpers.js';

export class WechatLibraryAPI {
  constructor(private readonly http: HTTPClient) {}

  searchArticles(params: {
    keyword: string;
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<APIResponse<unknown>> {
    const { keyword, page = 1, page_size = 20, ...extra } = params;
    return post(this.http, '/wechat/library/articles/search', {
      keyword,
      page,
      page_size,
      ...extra,
    });
  }

  searchArticlesTokenized(params: {
    keyword: string;
    page?: number;
    [key: string]: unknown;
  }): Promise<APIResponse<unknown>> {
    const { keyword, page = 1, ...extra } = params;
    return post(this.http, '/wechat/library/articles/search/tokenized', {
      keyword,
      page,
      ...extra,
    });
  }

  searchAccounts(params: {
    keyword: string;
    page?: number;
    page_size?: number;
    [key: string]: unknown;
  }): Promise<APIResponse<unknown>> {
    const { keyword, page = 1, page_size = 20, ...extra } = params;
    return post(this.http, '/wechat/library/accounts/search', {
      keyword,
      page,
      page_size,
      ...extra,
    });
  }

  accountsMetrics(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/library/accounts/metrics', body);
  }
}
