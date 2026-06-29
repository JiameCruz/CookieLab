import type { APIRoute } from 'astro';
import {
  authenticate,
  createSessionToken,
  SESSION_COOKIE,
  sessionCookieOptions,
} from '@/lib/auth-server';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = body?.email?.trim();
  const password = body?.password;
  const origin =
    request.headers.get('origin') ??
    (request.headers.get('host') ? `http://${request.headers.get('host')}` : null);

  if (!email || !password) {
    return json({ error: 'Ingresa tu correo y contraseña.' }, 400);
  }

  const result = await authenticate(email, password, origin);
  if (!result.ok) {
    return json({ error: result.error }, 401);
  }

  const token = await createSessionToken(result.user);
  cookies.set(SESSION_COOKIE, token, sessionCookieOptions(import.meta.env.PROD));
  return json({ ok: true });
};

export const DELETE: APIRoute = async ({ cookies }) => {
  cookies.delete(SESSION_COOKIE, { path: '/' });
  return json({ ok: true });
};
