import { Pool, neon, neonConfig } from '@neondatabase/serverless';
import type { MenuCategory, MenuItem, Promotion } from '@/lib/menu-types';

// En Vercel/serverless, WebSocket (Pool+ws) falla; HTTP fetch sí funciona.
neonConfig.poolQueryViaFetch = true;

const connectionString = import.meta.env.DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está configurada. Revisa tu archivo .env.');
}

declare global {
  // eslint-disable-next-line no-var
  var __theCookieLabPool: Pool | undefined;
}

const pool = globalThis.__theCookieLabPool ?? new Pool({ connectionString });
if (import.meta.env.DEV) globalThis.__theCookieLabPool = pool;

/** Driver HTTP puro para bytea — evita WebSocket en Vercel. */
const mediaSql = neon(connectionString);

type MenuItemRow = {
  id: string;
  category: string;
  name: string;
  price: string;
  description: string;
  image_src: string;
  image_alt: string;
};

type PromotionRow = {
  id: string;
  name: string;
  description: string;
  badge: string | null;
  image_src: string;
  image_alt: string;
};

const toMenuItem = (row: MenuItemRow): MenuItem => ({
  id: row.id,
  category: row.category as MenuCategory,
  name: row.name,
  price: Number(row.price),
  description: row.description,
  image: { src: row.image_src, alt: row.image_alt },
});

const toPromotion = (row: PromotionRow): Promotion => ({
  id: row.id,
  name: row.name,
  description: row.description,
  badge: row.badge ?? undefined,
  image: { src: row.image_src, alt: row.image_alt },
});

export type MenuItemInput = {
  category: MenuCategory;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type PromotionInput = {
  name: string;
  description: string;
  badge?: string | null;
  imageSrc: string;
  imageAlt: string;
};

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 48) || 'item';

async function uniqueId(table: 'menu_items' | 'promotions', base: string): Promise<string> {
  let candidate = base;
  let suffix = 1;
  // Tablas pequeñas; el bucle converge en 1-2 intentos.
  while (true) {
    const { rows } = await pool.query(`SELECT 1 FROM public.${table} WHERE id = $1`, [candidate]);
    if (rows.length === 0) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}

// ---------- Menu ----------

export async function getMenuItems(): Promise<MenuItem[]> {
  const { rows } = await pool.query<MenuItemRow>(
    `SELECT id, category, name, price, description, image_src, image_alt
       FROM public.menu_items
       ORDER BY sort_order ASC, created_at ASC`,
  );
  return rows.map(toMenuItem);
}

export async function getMenuItem(id: string): Promise<MenuItem | null> {
  const { rows } = await pool.query<MenuItemRow>(
    `SELECT id, category, name, price, description, image_src, image_alt
       FROM public.menu_items WHERE id = $1`,
    [id],
  );
  return rows[0] ? toMenuItem(rows[0]) : null;
}

export async function createMenuItem(input: MenuItemInput): Promise<MenuItem> {
  const id = await uniqueId('menu_items', slugify(input.name));
  const { rows } = await pool.query<MenuItemRow>(
    `INSERT INTO public.menu_items
       (id, category, name, price, description, image_src, image_alt, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6, $7,
       COALESCE((SELECT max(sort_order) + 1 FROM public.menu_items), 1))
     RETURNING id, category, name, price, description, image_src, image_alt`,
    [id, input.category, input.name, input.price, input.description, input.imageSrc, input.imageAlt],
  );
  return toMenuItem(rows[0]);
}

export async function updateMenuItem(id: string, input: MenuItemInput): Promise<MenuItem | null> {
  const { rows } = await pool.query<MenuItemRow>(
    `UPDATE public.menu_items
        SET category = $2, name = $3, price = $4, description = $5,
            image_src = $6, image_alt = $7, updated_at = now()
      WHERE id = $1
      RETURNING id, category, name, price, description, image_src, image_alt`,
    [id, input.category, input.name, input.price, input.description, input.imageSrc, input.imageAlt],
  );
  return rows[0] ? toMenuItem(rows[0]) : null;
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  const { rowCount } = await pool.query(`DELETE FROM public.menu_items WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

// ---------- Promotions ----------

export async function getPromotions(): Promise<Promotion[]> {
  const { rows } = await pool.query<PromotionRow>(
    `SELECT id, name, description, badge, image_src, image_alt
       FROM public.promotions
       ORDER BY sort_order ASC, created_at ASC`,
  );
  return rows.map(toPromotion);
}

export async function getPromotion(id: string): Promise<Promotion | null> {
  const { rows } = await pool.query<PromotionRow>(
    `SELECT id, name, description, badge, image_src, image_alt
       FROM public.promotions WHERE id = $1`,
    [id],
  );
  return rows[0] ? toPromotion(rows[0]) : null;
}

export async function createPromotion(input: PromotionInput): Promise<Promotion> {
  const id = await uniqueId('promotions', slugify(input.name));
  const { rows } = await pool.query<PromotionRow>(
    `INSERT INTO public.promotions
       (id, name, description, badge, image_src, image_alt, sort_order)
     VALUES ($1, $2, $3, $4, $5, $6,
       COALESCE((SELECT max(sort_order) + 1 FROM public.promotions), 1))
     RETURNING id, name, description, badge, image_src, image_alt`,
    [id, input.name, input.description, input.badge ?? null, input.imageSrc, input.imageAlt],
  );
  return toPromotion(rows[0]);
}

export async function updatePromotion(id: string, input: PromotionInput): Promise<Promotion | null> {
  const { rows } = await pool.query<PromotionRow>(
    `UPDATE public.promotions
        SET name = $2, description = $3, badge = $4,
            image_src = $5, image_alt = $6, updated_at = now()
      WHERE id = $1
      RETURNING id, name, description, badge, image_src, image_alt`,
    [id, input.name, input.description, input.badge ?? null, input.imageSrc, input.imageAlt],
  );
  return rows[0] ? toPromotion(rows[0]) : null;
}

export async function deletePromotion(id: string): Promise<boolean> {
  const { rowCount } = await pool.query(`DELETE FROM public.promotions WHERE id = $1`, [id]);
  return (rowCount ?? 0) > 0;
}

// ---------- Media (archivos subidos) ----------

export async function saveMedia(mime: string, bytes: Buffer): Promise<string> {
  const rows = await mediaSql`
    INSERT INTO public.media (mime, bytes) VALUES (${mime}, ${bytes}) RETURNING id
  `;
  return rows[0].id as string;
}

export async function getMedia(id: string): Promise<{ mime: string; bytes: Buffer } | null> {
  const rows = await mediaSql`
    SELECT mime, bytes FROM public.media WHERE id = ${id}
  `;
  if (!rows[0]) return null;
  return { mime: rows[0].mime as string, bytes: Buffer.from(rows[0].bytes as Buffer) };
}
