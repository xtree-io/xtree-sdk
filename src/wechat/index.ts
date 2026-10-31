import type { HTTPClient } from '../http.js';
import { WechatAccountsAPI } from './accounts.js';
import { WechatArticlesAPI } from './articles.js';
import { WechatChannelsAPI } from './channels.js';
import { WechatLibraryAPI } from './library.js';
import { WechatLinksAPI } from './links.js';
import { WechatSearchAPI } from './search.js';

export class WechatAPI {
  readonly search: WechatSearchAPI;
  readonly channels: WechatChannelsAPI;
  readonly accounts: WechatAccountsAPI;
  readonly articles: WechatArticlesAPI;
  readonly library: WechatLibraryAPI;
  readonly links: WechatLinksAPI;

  constructor(http: HTTPClient) {
    this.search = new WechatSearchAPI(http);
    this.channels = new WechatChannelsAPI(http);
    this.accounts = new WechatAccountsAPI(http);
    this.articles = new WechatArticlesAPI(http);
    this.library = new WechatLibraryAPI(http);
    this.links = new WechatLinksAPI(http);
  }
}

export { WechatSearchAPI } from './search.js';
