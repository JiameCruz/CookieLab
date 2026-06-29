import type { MenuCategory, MenuItem, Promotion } from '@/lib/menu-types';

export { formatPrice } from '@/lib/menu-types';
export type { MenuCategory, MenuItem, Promotion } from '@/lib/menu-types';

/**
 * Datos de respaldo / seed. La fuente de verdad en runtime es Postgres
 * (ver src/lib/db.ts). Estos arrays se usaron para el seed inicial y como
 * fallback si la base de datos no está disponible.
 */
export const menuItems: MenuItem[] = [
  {
    id: 'galleta-original',
    category: 'Galletas',
    name: 'Galleta Original',
    price: 42.9,
    description: 'Chispas de chocolate, masa dorada y crujiente.',
    image: {
      src: '/images/hero-cookies.png',
      alt: 'Galleta de chispas de chocolate recién horneada',
    },
  },
  {
    id: 'galleta-smores',
    category: 'Galletas',
    name: "Galleta S'mores",
    price: 46.0,
    description: 'Bombón, galleta María y Hershey por fuera.',
    image: {
      src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      alt: "Galleta S'mores con bombón, galleta María y Hershey",
    },
  },
  {
    id: 'galleta-cookies-cream',
    category: 'Galletas',
    name: 'Galleta Cookies & Cream',
    price: 46.0,
    description: 'Oreo en trozos y chocolate blanco por dentro.',
    image: {
      src: '/images/hero-cookies.png',
      alt: 'Galleta rellena de galleta Oreo y chocolate blanco',
    },
  },
  {
    id: 'galleta-kinder',
    category: 'Galletas',
    name: 'Galleta Kinder',
    price: 59.0,
    description: 'Rellena de Kinder Bueno — chocolate y avellana.',
    image: {
      src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      alt: 'Galleta rellena de chocolate Kinder Bueno',
    },
  },
  {
    id: 'galleta-carrot-cake',
    category: 'Galletas',
    name: 'Galleta Carrot Cake',
    price: 65.0,
    description: 'Zanahoria, especias y betún tipo pastel.',
    image: {
      src: '/images/hero-cookies.png',
      alt: 'Galleta tipo pastel de zanahoria con betún',
    },
  },
  {
    id: 'galleta-reeses',
    category: 'Galletas',
    name: 'Galleta Reeses',
    price: 46.0,
    description: 'Chocolate Reese’s por dentro y por fuera.',
    image: {
      src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      alt: 'Galleta rellena de chocolate Reese’s por dentro y por fuera',
    },
  },
  {
    id: 'matcha-latte',
    category: 'Matcha',
    name: 'Matcha Latte',
    price: 123.0,
    description: 'Matcha de origen con leche texturizada.',
    image: {
      src: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80',
      alt: 'Matcha latte en vaso alto con espuma verde',
    },
  },
  {
    id: 'chocolate-abuelita',
    category: 'Bebidas',
    name: 'Chocolate Abuelita',
    price: 89.0,
    description: 'Chocolate de mesa, caliente y espeso.',
    image: {
      src: '/images/hero-coffee.jpg',
      alt: 'Chocolate caliente de mesa servido en taza de cerámica',
    },
  },
  {
    id: 'sandwich-club',
    category: 'Sandwiches',
    name: 'Sandwich Club',
    price: 95.0,
    description: 'Pollo, tocino, lechuga y tomate en pan artesanal.',
    image: {
      src: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80',
      alt: 'Sandwich club con pollo, tocino y vegetales frescos',
    },
  },
  {
    id: 'sandwich-pavo',
    category: 'Sandwiches',
    name: 'Sandwich de Pavo',
    price: 85.0,
    description: 'Pavo ahumado, queso y vegetales frescos.',
    image: {
      src: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80',
      alt: 'Sandwich de pavo con lechuga y tomate en pan artesanal',
    },
  },
];

export const menuSection = {
  id: 'menu',
  headline: 'Lo de hoy en el mostrador',
  subheadline:
    'Precios en pesos mexicanos. Toca la fila — o pide en barra.',
} as const;

export const promotionsSection = {
  id: 'promociones',
  headline: 'Promos del mostrador',
  subheadline: 'Happy hour y combos — solo en local.',
} as const;

export const promotions: Promotion[] = [
  {
    id: 'happy-hour-matcha',
    name: 'Happy Hour',
    description:
      'Lunes a viernes de 4:00 a 7:00 pm — 15% de descuento en toda la línea matcha: latte, frío y especialidades.',
    badge: 'Happy Hour',
    image: {
      src: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=80',
      alt: 'Vaso de matcha latte en barra de café durante happy hour',
    },
  },
  {
    id: 'combo-lab',
    name: 'Combo Lab',
    description:
      'Elige cualquier galleta del menú y acompaña con matcha o café de la casa. Precio especial de combo todos los días.',
    badge: 'Combo',
    image: {
      src: '/images/hero-cookies.png',
      alt: 'Galleta artesanal junto a bebida caliente en mostrador',
    },
  },
  {
    id: 'martes-galletas',
    name: 'Martes de Galleta',
    description:
      'Cada martes después de las 6:00 pm — la segunda galleta al 50% en compras de dos o más unidades.',
    badge: 'Semanal',
    image: {
      src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=800&q=80',
      alt: 'Bandeja con galletas recién horneadas en vitrina',
    },
  },
];
