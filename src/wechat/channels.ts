import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { pageBody, post, searchBody } from './_helpers.js';

export class WechatChannelsAPI {
  constructor(private readonly http: HTTPClient) {}

  search(params: {
    keyword: string;
    page?: number;
    session?: string;
    [key: string]: unknown;
  }): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/search', searchBody(params));
  }

  resolve(body: Record<string, unknown>): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/resolve', body);
  }

  feeds(
    channelId: string,
    params: { page?: number; session?: string; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/list', pageBody({ ...params, channel_id: channelId }));
  }

  feedDownloadUrl(feedId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/download-url', { feed_id: feedId, ...body });
  }

  liveReplays(
    channelId: string,
    params: { page?: number; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/live-replays', pageBody({ ...params, channel_id: channelId }));
  }

  comments(
    feedId: string,
    params: { page?: number; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/comments', pageBody({ ...params, feed_id: feedId }));
  }

  commentReplies(
    feedId: string,
    commentId: string,
    params: { page?: number; [key: string]: unknown } = {},
  ): Promise<APIResponse<unknown>> {
    return post(
      this.http,
      '/wechat/channels/feeds/sub-comments',
      pageBody({ ...params, feed_id: feedId, comment_id: commentId }),
    );
  }

  resolveUrl(params: { url: string; [key: string]: unknown }): Promise<APIResponse<unknown>> {
    const { url, ...extra } = params;
    return post(this.http, '/wechat/channels/feeds/resolve-url', { url, ...extra });
  }

  feedTitle(feedId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/title', { feed_id: feedId, ...body });
  }

  feedMetrics(feedId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/metrics', { feed_id: feedId, ...body });
  }

  feedConvertId(body: Record<string, unknown>): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/convert-id', body);
  }

  feedShortUrl(feedId: string, body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/channels/feeds/short-url', { feed_id: feedId, ...body });
  }
}
