import type { APIRoute } from 'astro';
import { getPromotions, createPromotion } from '@/lib/db';
import { parsePromotionInput } from '@/lib/validation';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const GET: APIRoute = async () => {
  return json(await getPromotions());
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = parsePromotionInput(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const promo = await createPromotion(parsed.value);
  return json(promo, 201);
};
