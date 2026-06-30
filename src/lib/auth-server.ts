import { SignJWT, jwtVerify } from 'jose';

const AUTH_BASE = import.meta.env.PUBLIC_NEON_AUTH_URL;
const SECRET = new TextEncoder().encode(import.meta.env.SESSION_COOKIE_SECRET);

export const SESSION_COOKIE = 'cl_session';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 días

/** Email del único administrador. Usado para el bootstrap inicial. */
export const ADMIN_EMAIL = 'admin@gmail.com';

export type SessionUser = { id: string; email: string; name?: string };

type NeonAuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; error: string; code?: number };

function authHeaders(origin: string | null | undefined): HeadersInit {
  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (origin) headers.origin = origin;
  return headers;
}

async function neonSignIn(
  email: string,
  password: string,
  origin?: string | null,
): Promise<NeonAuthResult> {
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}/sign-in/email`, {
      method: 'POST',
      headers: authHeaders(origin),
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servicio de autenticación.' };
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, any>;
  if (!res.ok) {
    return { ok: false, error: data?.message || 'Correo o contraseña incorrectos.', code: res.status };
  }
  const user = (data.user ?? data) as Record<string, any>;
  return { ok: true, user: { id: String(user.id), email: user.email, name: user.name } };
}

async function neonSignUp(
  email: string,
  password: string,
  name: string,
  origin?: string | null,
): Promise<NeonAuthResult> {
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}/sign-up/email`, {
      method: 'POST',
      headers: authHeaders(origin),
      body: JSON.stringify({
        email,
        password,
        name,
        ...(origin ? { callbackURL: `${origin}/admin` } : {}),
      }),
    });
  } catch {
    return { ok: false, error: 'No se pudo conectar con el servicio de autenticación.' };
  }
  const data = (await res.json().catch(() => ({}))) as Record<string, any>;
  if (!res.ok) {
    return { ok: false, error: data?.message || 'No se pudo crear la cuenta.', code: res.status };
  }
  const user = (data.user ?? data) as Record<string, any>;
  return { ok: true, user: { id: String(user.id), email: user.email, name: user.name } };
}

/**
 * Valida credenciales contra Neon Auth. La primera vez que el administrador
 * configurado inicia sesión, crea su cuenta (bootstrap idempotente) ya que el
 * proyecto tiene el registro por email habilitado.
 */
export async function authenticate(
  email: string,
  password: string,
  origin?: string | null,
): Promise<NeonAuthResult> {
  const result = await neonSignIn(email, password, origin);
  if (result.ok) return result;

  // Bootstrap: si es el admin configurado y aún no existe, créalo y reintenta.
  if (email.toLowerCase() === ADMIN_EMAIL) {
    const created = await neonSignUp(email, password, 'Admin', origin);
    if (created.ok) return created;
    // Si ya existía, el fallo original era de contraseña: devuelve ese error.
  }
  return result;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ email: user.email, name: user.name ?? '' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    if (!payload.sub) return null;
    return {
      id: payload.sub,
      email: typeof payload.email === 'string' ? payload.email : '',
      name: typeof payload.name === 'string' ? payload.name : undefined,
    };
  } catch {
    return null;
  }
}

export function sessionCookieOptions(secure: boolean) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure,
    path: '/',
    maxAge: MAX_AGE,
  };
}

/** Opciones para borrar la cookie; deben coincidir con las de sessionCookieOptions. */
export function sessionCookieDeleteOptions(secure: boolean) {
  const { maxAge: _maxAge, ...rest } = sessionCookieOptions(secure);
  return rest;
}
