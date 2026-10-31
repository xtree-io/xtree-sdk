import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { pageBody, post } from './_helpers.js';

export class WechatArticlesAPI {
  constructor(private readonly http: HTTPClient) {}

  metrics(params: { url: string; [key: string]: unknown }): Promise<APIResponse<unknown>> {
    const { url, ...extra } = params;
    return post(this.http, '/wechat/articles/metrics', { url, ...extra });
  }

  metricsPro(params: { url: string; [key: string]: unknown }): Promise<APIResponse<unknown>> {
    const { url, ...extra } = params;
    return post(this.http, '/wechat/articles/metrics/pro', { url, ...extra });
  }

  summary(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/articles/summary', body);
  }

  detail(articleId: string): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/articles/detail', { article_id: articleId });
  }

  detailWithVideo(articleId: string): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/articles/detail-with-video', { article_id: articleId });
  }

  html(params: { url: string; [key: string]: unknown }): Promise<APIResponse<unknown>> {
    const { url, ...extra } = params;
    return post(this.http, '/wechat/articles/html', { url, ...extra });
  }

  comments(
    articleId: string,
    params: { page?: number; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/articles/comments', pageBody({ ...params, article_id: articleId }));
  }

  commentReplies(
    articleId: string,
    commentId: string,
    params: { page?: number; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(
      this.http,
      '/wechat/articles/sub-comments',
      pageBody({ ...params, article_id: articleId, comment_id: commentId }),
    );
  }
}
