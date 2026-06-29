import type { APIRoute } from 'astro';
import { saveMedia } from '@/lib/db';

export const prerender = false;

/** JSON base64 en Vercel: ~33% overhead → 3 MB archivo ≈ 4 MB body */
const MAX_BYTES = 3 * 1024 * 1024;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json' },
  });

type ParsedUpload = { mime: string; bytes: Buffer };

async function parseUpload(request: Request): Promise<ParsedUpload | Response> {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = (await request.json().catch(() => null)) as
      | { mime?: string; data?: string }
      | null;
    if (!body?.mime?.startsWith('image/') || !body.data) {
      return json({ error: 'Datos de imagen inválidos.' }, 400);
    }
    const bytes = Buffer.from(body.data, 'base64');
    if (bytes.length === 0) {
      return json({ error: 'La imagen está vacía.' }, 400);
    }
    if (bytes.length > MAX_BYTES) {
      return json({ error: 'La imagen supera el límite de 3 MB.' }, 400);
    }
    return { mime: body.mime, bytes };
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
    return json({ error: 'La imagen supera el límite de 3 MB.' }, 400);
  }

  return { mime: file.type, bytes: Buffer.from(await file.arrayBuffer()) };
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DATABASE_URL) {
    return json({ error: 'Servidor mal configurado: falta DATABASE_URL.' }, 500);
  }

  const parsed = await parseUpload(request);
  if (parsed instanceof Response) return parsed;

  try {
    const id = await saveMedia(parsed.mime, parsed.bytes);
    // #region agent log
    fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'media-upload-v2',location:'media.ts:POST:ok',message:'media saved',data:{bytes:parsed.bytes.length,mime:parsed.mime},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    return json({ url: `/api/media/${id}` }, 201);
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    // #region agent log
    fetch('http://127.0.0.1:7873/ingest/7a56214f-3513-4cc5-8395-f173e93a5f8f',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'96bc5d'},body:JSON.stringify({sessionId:'96bc5d',runId:'media-upload-v2',location:'media.ts:POST:error',message:'saveMedia failed',data:{detail},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    console.error('[media upload]', detail);
    return json({ error: 'No se pudo guardar la imagen. Inténtalo de nuevo.' }, 500);
  }
};
