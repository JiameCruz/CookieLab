/**
 * Verifica que DELETE /api/session emita Set-Cookie con los mismos atributos que el login.
 * Uso: node scripts/test-logout-headers.mjs [baseUrl]
 */
const base = process.argv[2] ?? 'http://127.0.0.1:4321';

function parseSetCookies(headers) {
  if (typeof headers.getSetCookie === 'function') {
    return headers.getSetCookie();
  }
  const raw = headers.get('set-cookie');
  return raw ? [raw] : [];
}

async function main() {
  const loginRes = await fetch(`${base}/api/session`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: base },
    body: JSON.stringify({ email: 'admin@gmail.com', password: 'admin123' }),
  });
  const loginBody = await loginRes.json().catch(() => ({}));
  const loginCookies = parseSetCookies(loginRes.headers);
  const sessionLine = loginCookies.find((c) => c.startsWith('cl_session='));

  console.log(JSON.stringify({
    step: 'login',
    status: loginRes.status,
    ok: loginBody.ok,
    setCookie: sessionLine ?? null,
  }, null, 2));

  if (!sessionLine) {
    console.error('No cl_session Set-Cookie on login — aborting');
    process.exit(1);
  }

  const cookieHeader = sessionLine.split(';')[0];

  const deleteRes = await fetch(`${base}/api/session`, {
    method: 'DELETE',
    headers: { cookie: cookieHeader },
  });
  const deleteBody = await deleteRes.json().catch(() => ({}));
  const deleteCookies = parseSetCookies(deleteRes.headers);
  const deleteLine = deleteCookies.find((c) => c.startsWith('cl_session='));

  console.log(JSON.stringify({
    step: 'delete',
    status: deleteRes.status,
    body: deleteBody,
    setCookie: deleteLine ?? null,
    hasSecure: deleteLine?.includes('Secure') ?? false,
    hasHttpOnly: deleteLine?.includes('HttpOnly') ?? false,
    hasMaxAgeZero: /Max-Age=0|Expires=Thu, 01 Jan 1970/i.test(deleteLine ?? ''),
  }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
