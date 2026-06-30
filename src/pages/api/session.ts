import type { APIRoute } from 'astro';
import {
  authenticate,
  createSessionToken,
  SESSION_COOKIE,
  isSecureRequest,
  sessionCookieDeleteOptions,
  sessionCookieOptions,
} from '@/lib/auth-server';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/** Origin del sitio para Neon Auth (requiere https en producción/Vercel). */
function resolveRequestOrigin(request: Request): string | null {
  const origin = request.headers.get('origin');
  if (origin) return origin;
  const host = request.headers.get('host');
  if (!host) return null;
  const proto = (request.headers.get('x-forwarded-proto') ?? 'http').split(',')[0].trim();
  return `${proto}://${host}`;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;
  const email = body?.email?.trim();
  const password = body?.password;
  const origin = resolveRequestOrigin(request);

  // #region agent log
  fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'vercel-debug',location:'session.ts:POST',message:'login attempt',data:{origin,host:request.headers.get('host'),hasAuthUrl:!!import.meta.env.PUBLIC_NEON_AUTH_URL,hasDbUrl:!!import.meta.env.DATABASE_URL,hasSecret:!!import.meta.env.SESSION_COOKIE_SECRET,isProd:import.meta.env.PROD},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (!import.meta.env.PUBLIC_NEON_AUTH_URL || !import.meta.env.SESSION_COOKIE_SECRET) {
    return json({ error: 'Servidor mal configurado: faltan variables de entorno de auth.' }, 500);
  }

  if (!email || !password) {
    return json({ error: 'Ingresa tu correo y contraseña.' }, 400);
  }

  const result = await authenticate(email, password, origin);
  // #region agent log
  fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'vercel-debug',location:'session.ts:result',message:'authenticate result',data:{ok:result.ok,error:result.ok?undefined:result.error,code:result.ok?undefined:result.code},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  if (!result.ok) {
    return json({ error: result.error }, 401);
  }

  const token = await createSessionToken(result.user);
  cookies.set(SESSION_COOKIE, token, sessionCookieOptions(isSecureRequest(request)));
  return json({ ok: true });
};

export const DELETE: APIRoute = async ({ cookies, request }) => {
  const secure = isSecureRequest(request);
  const hadSessionCookie = Boolean(
    request.headers.get('cookie')?.split(';').some((part) => part.trim().startsWith(`${SESSION_COOKIE}=`)),
  );

  cookies.delete(SESSION_COOKIE, sessionCookieDeleteOptions(secure));

  // #region agent log
  fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'post-fix',hypothesisId:'H1-cookie-opts',location:'session.ts:DELETE',message:'logout delete cookie',data:{secure,hadSessionCookie,host:request.headers.get('host'),proto:request.headers.get('x-forwarded-proto')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  return json({ ok: true });
};
