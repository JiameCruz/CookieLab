import type { APIRoute } from 'astro';
import { updatePromotion, deletePromotion } from '@/lib/db';
import { parsePromotionInput } from '@/lib/validation';

export const prerender = false;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const PUT: APIRoute = async ({ params, request }) => {
  const id = params.id!;
  const body = await request.json().catch(() => null);
  const parsed = parsePromotionInput(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  const promo = await updatePromotion(id, parsed.value);
  if (!promo) return json({ error: 'No se encontró la promoción.' }, 404);
  return json(promo);
};

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id!;
  const ok = await deletePromotion(id);
  if (!ok) return json({ error: 'No se encontró la promoción.' }, 404);
  return json({ ok: true });
};
