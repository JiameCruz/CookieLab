import type { APIRoute } from 'astro';
import { updateMenuItem, deleteMenuItem } from '@/lib/db';
import { parseMenuInput } from '@/lib/validation';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const PUT: APIRoute = async ({ params, request }) => {
  const id = params.id!;
  const body = await request.json().catch(() => null);
  const parsed = parseMenuInput(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const item = await updateMenuItem(id, parsed.value);
  if (!item) return json({ error: 'No se encontró el producto.' }, 404);
  return json(item);
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id!;
  const ok = await deleteMenuItem(id);
  if (!ok) return json({ error: 'No se encontró el producto.' }, 404);
  return json({ ok: true });
};
