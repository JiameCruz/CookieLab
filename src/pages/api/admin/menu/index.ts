import type { APIRoute } from 'astro';
import { getMenuItems, createMenuItem } from '@/lib/db';
import { parseMenuInput } from '@/lib/validation';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const GET: APIRoute = async () => {
  return json(await getMenuItems());
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = parseMenuInput(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const item = await createMenuItem(parsed.value);
  return json(item, 201);
};
