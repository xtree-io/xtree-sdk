import type { HTTPClient } from '../http.js';
import type { APIResponse } from '../types.js';
import { post } from '../platform-helpers.js';

export class XhsAPI {
  constructor(private readonly http: HTTPClient) {}

  notes_detail(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/notes/detail', body);
  }

  notes_search(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/notes/search', body);
  }

  users_profile(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/users/profile', body);
  }

  users_notes(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/users/notes', body);
  }

  notes_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/notes/comments', body);
  }

  notes_sub_comments(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/notes/sub-comments', body);
  }

  topics_list(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/topics/list', body);
  }

  ids_resolve(body: Record<string, unknown> = {}): Promise<APIResponse<unknown>> {
    return post(this.http, '/xhs/ids/resolve', body);
  }
}
