import type { APIRoute } from 'astro';
import {
  SESSION_COOKIE,
  isSecureRequest,
  sessionCookieDeleteOptions,
} from '@/lib/auth-server';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, request, redirect }) => {
  const secure = isSecureRequest(request);
  const hadSessionCookie = Boolean(
    request.headers.get('cookie')?.split(';').some((part) => part.trim().startsWith(`${SESSION_COOKIE}=`)),
  );

  cookies.delete(SESSION_COOKIE, sessionCookieDeleteOptions(secure));

  // #region agent log
  fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'post-fix',hypothesisId:'H3-server-redirect',location:'logout.ts:GET',message:'server logout redirect',data:{secure,hadSessionCookie,host:request.headers.get('host'),proto:request.headers.get('x-forwarded-proto')},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  return redirect('/admin/login');
};
