import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth-server';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, locals } = context;
  const path = url.pathname;

  const token = cookies.get(SESSION_COOKIE)?.value;
  locals.user = token ? await verifySessionToken(token) : null;

  const isLogin = path === '/admin/login';
  const isAdminPage = path === '/admin' || path.startsWith('/admin/');
  const isAdminApi = path.startsWith('/api/admin');

  if (!locals.user && ((isAdminPage && !isLogin) || isAdminApi)) {
    if (isAdminApi) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }
    const redirectTo = encodeURIComponent(path + url.search);
    return context.redirect(`/admin/login?redirect=${redirectTo}`);
  }

  if (locals.user && isLogin) {
    return context.redirect('/admin');
  }

  return next();
});
