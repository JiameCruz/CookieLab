// Crea el usuario administrador en Neon Auth (idempotente).
// Uso: node --env-file=.env scripts/create-admin.mjs
const base = process.env.PUBLIC_NEON_AUTH_URL;
if (!base) {
  console.error('Falta PUBLIC_NEON_AUTH_URL en el entorno (.env).');
  process.exit(1);
}

const email = 'admin@gmail.com';
const password = 'admin123';

const res = await fetch(`${base}/sign-up/email`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ email, password, name: 'Admin' }),
});

const data = await res.json().catch(() => ({}));

if (res.ok) {
  console.log(`✓ Usuario admin listo: ${email}`);
} else if (res.status === 422 || /exist/i.test(data?.message ?? '')) {
  console.log(`• El usuario ${email} ya existía. Nada que hacer.`);
} else {
  console.error(`✗ Error (${res.status}):`, JSON.stringify(data));
  process.exit(1);
}
