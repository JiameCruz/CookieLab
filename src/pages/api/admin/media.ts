import type { APIRoute } from 'astro';
import { saveMedia } from '@/lib/db';

export const prerender = false;

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (límite de Vercel serverless ~4.5 MB)

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Formato de subida inválido.' }, 400);
  }

  const file = form.get('file');
  if (!(file instanceof File)) {
    return json({ error: 'No se recibió ningún archivo.' }, 400);
  }
  if (!file.type.startsWith('image/')) {
    return json({ error: 'El archivo debe ser una imagen.' }, 400);
  }
  if (file.size > MAX_BYTES) {
    return json({ error: 'La imagen supera el límite de 5 MB.' }, 400);
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const id = await saveMedia(file.type, bytes);
  return json({ url: `/api/media/${id}` }, 201);
};
