import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class YoutubeAPI {
  constructor(private readonly http: HTTPClient) {}

  channels_videos(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/youtube/channels/videos', body);
  }

  channels_shorts(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/youtube/channels/shorts', body);
  }

  channels_streams(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/youtube/channels/streams', body);
  }

  search_channels(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/youtube/search/channels', body);
  }
}
