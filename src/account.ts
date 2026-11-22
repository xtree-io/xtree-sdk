import type { HTTPClient } from './http.js';
import type { APIResponse } from './types.js';

export class AccountAPI {
  constructor(private readonly http: HTTPClient) {}

  async balance(): Promise<APIResponse<{ balance_cny: number }>> {
    return this.http.request('GET', '/account/balance');
  }
}
