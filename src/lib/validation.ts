import { menuCategories, type MenuCategory } from '@/lib/menu-types';
import type { MenuItemInput, PromotionInput } from '@/lib/db';

export type Parsed<T> = { ok: true; value: T } | { ok: false; error: string };

const str = (v: unknown) => (v == null ? '' : String(v)).trim();

export function parseMenuInput(body: any): Parsed<MenuItemInput> {
  const name = str(body?.name);
  const category = str(body?.category);
  const price = Number(body?.price);
  const description = str(body?.description);
  const imageSrc = str(body?.imageSrc);
  const imageAlt = str(body?.imageAlt);

  if (!name) return { ok: false, error: 'El nombre es obligatorio.' };
  if (!menuCategories.includes(category as MenuCategory)) {
    return { ok: false, error: 'Selecciona una categoría válida.' };
  }
  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, error: 'El precio debe ser un número mayor o igual a 0.' };
  }
  if (!imageSrc) return { ok: false, error: 'Agrega una imagen (URL o archivo).' };

  return {
    ok: true,
    value: {
      name,
      category: category as MenuCategory,
      price,
      description,
      imageSrc,
      imageAlt: imageAlt || name,
    },
  };
}

export function parsePromotionInput(body: any): Parsed<PromotionInput> {
  const name = str(body?.name);
  const description = str(body?.description);
  const badge = str(body?.badge);
  const imageSrc = str(body?.imageSrc);
  const imageAlt = str(body?.imageAlt);

  if (!name) return { ok: false, error: 'El nombre es obligatorio.' };
  if (!imageSrc) return { ok: false, error: 'Agrega una imagen (URL o archivo).' };

  return {
    ok: true,
    value: {
      name,
      description,
      badge: badge || null,
      imageSrc,
      imageAlt: imageAlt || name,
    },
  };
}
