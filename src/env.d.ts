/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GOOGLE_MAPS_API_KEY?: string;
  readonly PUBLIC_NEON_AUTH_URL: string;
  readonly DATABASE_URL: string;
  readonly NEON_AUTH_JWKS_URL: string;
  readonly SESSION_COOKIE_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user: {
      id: string;
      email: string;
      name?: string;
    } | null;
  }
}
