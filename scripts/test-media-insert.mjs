import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
const buf = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

const rows = await sql`
  INSERT INTO public.media (mime, bytes) VALUES (${'image/png'}, ${buf}) RETURNING id
`;
console.log('neon() INSERT OK', rows[0].id);
await sql`DELETE FROM public.media WHERE id = ${rows[0].id}`;
