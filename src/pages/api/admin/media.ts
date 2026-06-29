import type { APIRoute } from 'astro';
import { saveMedia } from '@/lib/db';

export const prerender = false;

/** Vercel serverless: límite de body ~4.5 MB */
const MAX_BYTES = 4 * 1024 * 1024;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DATABASE_URL) {
    return json({ error: 'Servidor mal configurado: falta DATABASE_URL.' }, 500);
  }

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
    return json({ error: 'La imagen supera el límite de 4 MB (límite de Vercel).' }, 400);
  }

  try {
    const bytes = Buffer.from(await file.arrayBuffer());
    const id = await saveMedia(file.type, bytes);
    // #region agent log
    fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'media-upload',location:'media.ts:POST:ok',message:'media saved',data:{bytes:bytes.length,mime:file.type},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return json({ url: `/api/media/${id}` }, 201);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    // #region agent log
    fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'media-upload',location:'media.ts:POST:error',message:'saveMedia failed',data:{detail,fileSize:file.size,mime:file.type},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    console.error('[media upload]', detail);
    return json({ error: 'No se pudo guardar la imagen. Inténtalo de nuevo.' }, 500);
  }
};
