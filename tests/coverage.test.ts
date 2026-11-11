import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const HERE = dirname(fileURLToPath(import.meta.url));
const CANDIDATES = [join(HERE, '..'), join(HERE, '..', '..')];
const ROOT = CANDIDATES.find((p) => {
  try {
    readFileSync(join(p, 'openapi', 'spec', 'openapi.json'));
    return true;
  } catch {
    return false;
  }
});
if (!ROOT) {
  throw new Error('openapi/spec/openapi.json not found near tests/');
}
const SPEC = join(ROOT, 'openapi', 'spec', 'openapi.json');

/** Keep in sync with sdk/python/xtree/registry.py */
const COVERED_ENDPOINTS: Array<[string, string]> = [
  ['GET', '/account/balance'],
  ['POST', '/bilibili/popular/list'],
  ['POST', '/bilibili/rank/list'],
  ['POST', '/bilibili/search/users'],
  ['POST', '/bilibili/search/videos'],
  ['POST', '/bilibili/users/posts'],
  ['POST', '/bilibili/users/profile'],
  ['POST', '/bilibili/users/videos'],
  ['POST', '/bilibili/videos/comments'],
  ['POST', '/bilibili/videos/detail'],
  ['POST', '/bilibili/videos/download'],
  ['POST', '/douyin/ids/resolve'],
  ['POST', '/douyin/search/suggestions'],
  ['POST', '/douyin/search/users'],
  ['POST', '/douyin/search/videos'],
  ['POST', '/douyin/users/creator-metrics'],
  ['POST', '/douyin/users/posts'],
  ['POST', '/douyin/users/profile'],
  ['POST', '/douyin/videos/comments'],
  ['POST', '/douyin/videos/detail'],
  ['POST', '/douyin/videos/download'],
  ['POST', '/douyin/videos/sub-comments'],
  ['POST', '/facebook/search/general'],
  ['POST', '/facebook/search/users'],
  ['POST', '/jd/items/comments'],
  ['POST', '/jd/items/comments/v2'],
  ['POST', '/jd/items/detail'],
  ['POST', '/kuaishou/hot/board'],
  ['POST', '/kuaishou/ids/resolve'],
  ['POST', '/kuaishou/search/users'],
  ['POST', '/kuaishou/search/videos'],
  ['POST', '/kuaishou/users/posts'],
  ['POST', '/kuaishou/users/profile'],
  ['POST', '/kuaishou/videos/comments'],
  ['POST', '/kuaishou/videos/detail'],
  ['POST', '/kuaishou/videos/short-link'],
  ['POST', '/media/transcribe'],
  ['POST', '/pdd/items/comments/fetch'],
  ['POST', '/pdd/items/comments/status'],
  ['POST', '/pdd/items/comments/submit'],
  ['POST', '/taobao/items/detail'],
  ['POST', '/taobao/items/search'],
  ['POST', '/taobao/shops/comments'],
  ['POST', '/tiktok/search/users'],
  ['POST', '/tiktok/search/videos'],
  ['POST', '/tiktok/users/posts'],
  ['POST', '/tiktok/users/profile'],
  ['POST', '/tiktok/videos/comments'],
  ['POST', '/tiktok/videos/detail'],
  ['POST', '/tiktok/videos/download'],
  ['POST', '/tiktok/videos/sub-comments'],
  ['POST', '/wechat/accounts/ghid/channels'],
  ['POST', '/wechat/accounts/ghid/posts'],
  ['POST', '/wechat/accounts/ghid/posts/metrics'],
  ['POST', '/wechat/accounts/posts/list'],
  ['POST', '/wechat/accounts/posts/metrics'],
  ['POST', '/wechat/accounts/posts/today'],
  ['POST', '/wechat/accounts/posts/today/metrics'],
  ['POST', '/wechat/accounts/principal'],
  ['POST', '/wechat/accounts/profile'],
  ['POST', '/wechat/accounts/search'],
  ['POST', '/wechat/accounts/search-by-owner'],
  ['POST', '/wechat/accounts/search-by-owner/live'],
  ['POST', '/wechat/accounts/search/gh'],
  ['POST', '/wechat/articles/comments'],
  ['POST', '/wechat/articles/detail'],
  ['POST', '/wechat/articles/detail-with-video'],
  ['POST', '/wechat/articles/html'],
  ['POST', '/wechat/articles/metrics'],
  ['POST', '/wechat/articles/metrics/pro'],
  ['POST', '/wechat/articles/sub-comments'],
  ['POST', '/wechat/articles/summary'],
  ['POST', '/wechat/channels/feeds/comments'],
  ['POST', '/wechat/channels/feeds/convert-id'],
  ['POST', '/wechat/channels/feeds/download-url'],
  ['POST', '/wechat/channels/feeds/list'],
  ['POST', '/wechat/channels/feeds/metrics'],
  ['POST', '/wechat/channels/feeds/resolve-url'],
  ['POST', '/wechat/channels/feeds/short-url'],
  ['POST', '/wechat/channels/feeds/sub-comments'],
  ['POST', '/wechat/channels/feeds/title'],
  ['POST', '/wechat/channels/live-replays'],
  ['POST', '/wechat/channels/resolve'],
  ['POST', '/wechat/channels/search'],
  ['POST', '/wechat/library/accounts/metrics'],
  ['POST', '/wechat/library/accounts/search'],
  ['POST', '/wechat/library/articles/search'],
  ['POST', '/wechat/library/articles/search/tokenized'],
  ['POST', '/wechat/links/convert'],
  ['POST', '/wechat/search/accounts'],
  ['POST', '/wechat/search/articles'],
  ['POST', '/wechat/search/articles/categories'],
  ['POST', '/wechat/search/channels/accounts/categories'],
  ['POST', '/wechat/search/index/categories'],
  ['POST', '/wechat/search/miniprograms/categories'],
  ['POST', '/wechat/search/mixed'],
  ['POST', '/wechat/search/suggestions'],
  ['POST', '/wechat/search/videos'],
  ['POST', '/wechat/search/videos/categories'],
  ['POST', '/wechat/search/videos/tab'],
  ['POST', '/weibo/hot/search'],
  ['POST', '/weibo/posts/comments'],
  ['POST', '/weibo/posts/detail'],
  ['POST', '/weibo/posts/sub-comments'],
  ['POST', '/weibo/search/posts'],
  ['POST', '/weibo/search/users'],
  ['POST', '/weibo/topics/detail'],
  ['POST', '/weibo/topics/stats'],
  ['POST', '/weibo/users/posts'],
  ['POST', '/weibo/users/profile'],
  ['POST', '/weibo/users/videos'],
  ['POST', '/xhs/ids/resolve'],
  ['POST', '/xhs/notes/comments'],
  ['POST', '/xhs/notes/detail'],
  ['POST', '/xhs/notes/search'],
  ['POST', '/xhs/notes/sub-comments'],
  ['POST', '/xhs/search/users'],
  ['POST', '/xhs/topics/list'],
  ['POST', '/xhs/users/notes'],
  ['POST', '/xhs/users/profile'],
  ['POST', '/youtube/channels/shorts'],
  ['POST', '/youtube/channels/streams'],
  ['POST', '/youtube/channels/videos'],
  ['POST', '/youtube/search/channels'],
  ['POST', '/youtube/search/videos'],
  ['POST', '/youtube/videos/download'],
  ['POST', '/youtube/videos/transcript'],
]

function openapiOperations(spec: Record<string, unknown>): Array<[string, string]> {
  const paths = spec.paths as Record<string, Record<string, unknown>>;
  const ops: Array<[string, string]> = [];
  for (const [path, item] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(item)) {
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(method)) {
        continue;
      }
      if (typeof op === 'object' && op !== null && (op as { deprecated?: boolean }).deprecated) {
        continue;
      }
      ops.push([method.toUpperCase(), path]);
    }
  }
  return ops.sort();
}

describe('SDK registry vs OpenAPI', () => {
  it('covers all openapi operations', () => {
    const spec = JSON.parse(readFileSync(SPEC, 'utf8')) as Record<string, unknown>;
    const openapiOps = new Set(openapiOperations(spec).map((x) => JSON.stringify(x)));
    const covered = new Set(COVERED_ENDPOINTS.map((x) => JSON.stringify(x)));
    expect(openapiOps.size).toBe(127);
    expect(covered.size).toBe(127);
    expect(openapiOps).toEqual(covered);
  });
});
