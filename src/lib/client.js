import { createClient } from "microcms-js-sdk"; //ES6

// Initialize Client SDK.
export const client = createClient({
  serviceDomain: process.env.MICROCMS_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const MICROCMS_TOKEN = process.env.MICROCMS_API_KEY;
