import {environment} from '../environments/environment';

/**
 * General app constants
 */

// Base URL for all API requests
let baseUrl = `https://api.qa.grandluxury.io`;
if (! environment.production) {
  baseUrl = `https://backend.local`;
}

export const API_BASE_URL: string = baseUrl;
