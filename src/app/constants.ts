import {environment} from '../environments/environment';

/**
 * General app constants
 */

// Base URL for all API requests
let baseUrl = `https://www.celiaetmika.com/wp-json/wp`;
if (! environment.production) {
  baseUrl = `https://www.celiaetmika.com/wp-json/wp`;
}

export const API_BASE_URL: string = baseUrl;
