import type { APIRoute } from 'astro';
import { getMedia } from '@/lib/db';

export const prerender = false;

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET: APIRoute = async ({ params }) => {
  const id = params.id ?? '';
  if (!UUID_RE.test(id)) {
    return new Response('No encontrado', { status: 404 });
  }

  const media = await getMedia(id);
  if (!media) {
    return new Response('No encontrado', { status: 404 });
  }

  return new Response(media.bytes, {
    status: 200,
    headers: {
      'content-type': media.mime,
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
};
