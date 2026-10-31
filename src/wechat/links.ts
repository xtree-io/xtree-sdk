import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from './_helpers.js';

export class WechatLinksAPI {
  constructor(private readonly http: HTTPClient) {}

  convert(body: Record<string, unknown>): Promise<APIResponse<unknown>> {
    return post(this.http, '/wechat/links/convert', body);
  }
}
