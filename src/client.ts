import { AccountAPI } from './account.js';
import { HTTPClient } from './http.js';
import { DouyinAPI } from './douyin/index.js';
import { XhsAPI } from './xhs/index.js';
import { KuaishouAPI } from './kuaishou/index.js';
import { WeiboAPI } from './weibo/index.js';
import { BilibiliAPI } from './bilibili/index.js';
import { TiktokAPI } from './tiktok/index.js';
import { YoutubeAPI } from './youtube/index.js';
import { FacebookAPI } from './facebook/index.js';
import { TaobaoAPI } from './taobao/index.js';
import { JdAPI } from './jd/index.js';
import { PddAPI } from './pdd/index.js';
import { WechatAPI } from './wechat/index.js';
import type { APIResponse, XTreeClientOptions } from './types.js';
import { DEFAULT_BASE_URL } from './types.js';

export class XTreeClient {
  readonly account: AccountAPI;
  readonly wechat: WechatAPI;
  readonly douyin: DouyinAPI;
  readonly xhs: XhsAPI;
  readonly kuaishou: KuaishouAPI;
  readonly weibo: WeiboAPI;
  readonly bilibili: BilibiliAPI;
  readonly tiktok: TiktokAPI;
  readonly youtube: YoutubeAPI;
  readonly facebook: FacebookAPI;
  readonly taobao: TaobaoAPI;
  readonly jd: JdAPI;
  readonly pdd: PddAPI;
  private readonly http: HTTPClient;

  constructor(options: XTreeClientOptions = {}) {
    const apiKey = options.apiKey ?? process.env.XTREE_API_KEY;
    if (!apiKey) {
      throw new Error('apiKey is required (pass apiKey or set XTREE_API_KEY)');
    }

    this.http = new HTTPClient({
      apiKey,
      baseUrl: options.baseUrl ?? process.env.XTREE_BASE_URL ?? DEFAULT_BASE_URL,
      verifyCode: options.verifyCode ?? process.env.XTREE_VERIFY_CODE,
      timeoutMs: options.timeoutMs,
      fetchImpl: options.fetch,
    });
    this.account = new AccountAPI(this.http);
    this.wechat = new WechatAPI(this.http);
    this.douyin = new DouyinAPI(this.http);
    this.xhs = new XhsAPI(this.http);
    this.kuaishou = new KuaishouAPI(this.http);
    this.weibo = new WeiboAPI(this.http);
    this.bilibili = new BilibiliAPI(this.http);
    this.tiktok = new TiktokAPI(this.http);
    this.youtube = new YoutubeAPI(this.http);
    this.facebook = new FacebookAPI(this.http);
    this.taobao = new TaobaoAPI(this.http);
    this.jd = new JdAPI(this.http);
    this.pdd = new PddAPI(this.http);
  }

  get lastMeta() {
    return this.http.lastMeta;
  }

  request<T = unknown>(
    method: string,
    path: string,
    options: { json?: Record<string, unknown>; params?: Record<string, string> } = {},
  ): Promise<APIResponse<T>> {
    return this.http.request<T>(method, path, options);
  }
}

export { XTreeError } from './errors.js';
export type {
  APIResponse,
  ResponseMeta,
  SearchVideosParams,
  XTreeClientOptions,
} from './types.js';
