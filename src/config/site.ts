export const site = {
  name: 'The cookie lab',
  tagline: 'Galletas, sandwiches y matcha — hechos con intención.',
  description:
    'Coffee shop contemporáneo especializado en galletas artesanales, sandwiches y matcha. Producto real, sabor cuidado.',
  url: 'https://cookinglab.mx',
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: 'Menú', href: '#menu' },
  { label: 'Promociones', href: '#promociones' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
  { label: 'Pedidos', href: '#domicilio' },
];

export const hero = {
  headline: 'Hecho al momento',
  subheadline:
    'Galletas, sandwiches y matcha — sin atajos, sin prisa. Lo que ves en el mostrador es lo que comes.',
  cta: {
    label: 'Ver menú',
    href: '#menu',
  },
  image: {
    src: '/images/hero-cookies.png',
    alt: 'Rejilla de galletas artesanales sobre fondo rosa y crema — chocolate, red velvet, matcha y más',
  },
} as const;

export const about = {
  id: 'nosotros',
  headline: 'Galletas de laboratorio, corazón de barrio',
  paragraphs: [
    'The cookie lab nació como un espacio para experimentar con sabor: probar combinaciones, hornear al momento y servir matcha de origen con la misma exigencia que nuestras galletas.',
    'No somos una cadena ni un menú congelado. Cada lote sale del horno con ingredientes reales — chocolate que se derrite, masa que se parte, matcha que se ve y se siente.',
    'Ven por una galleta, quédate por el ritual. Aquí el producto manda y el resto es aire.',
  ],
  image: {
    src: '/images/logo-cookie-lab.png',
    alt: 'Logotipo The Cookie Lab — tipografía script sobre fondo rosa pastel',
  },
} as const;

export const contact = {
  id: 'contacto',
  headline: 'Visítanos en Torreón',
  subheadline:
    'Estamos en Los Ángeles, a un paso del boulevard. Pasa por galletas recién horneadas, matcha o lo que se te antoje.',
  address: {
    line: 'Blvd. Independencia 295, Los Ángeles, 27140 Torreón, Coah.',
  },
  phone: {
    display: '+52 871 972 7662',
    href: 'tel:+528719727662',
  },
  instagram: {
    label: '@thecookielabmxx',
    href: 'https://instagram.com/thecookielabmxx',
  },
  hours: [
    { days: 'Lunes a Sábado', time: '8:00 AM – 8:00 PM' },
    { days: 'Domingo', time: '8:00 AM – 3:00 PM' },
  ],
} as const;

export type DeliveryPlatform = {
  id: 'ubereats' | 'rappi';
  name: string;
  href: string;
  action: string;
};

export const delivery = {
  id: 'domicilio',
  headline: 'Pedidos a domicilio',
  subheadline:
    'Galletas, sandwiches y matcha — directo a tu puerta. Elige tu app favorita y ordena The Cookie Lab sin salir de casa.',
  platforms: [
    {
      id: 'ubereats',
      name: 'Uber Eats',
      href: 'https://www.ubereats.com/mx/store/the-cookie-lab/TmqSo4LsS5m86TetG7xsXw',
      action: 'Ordenar en Uber Eats',
    },
    {
      id: 'rappi',
      name: 'Rappi',
      href: 'https://www.rappi.com.mx/restaurantes/1930016238-the-cookie-lab',
      action: 'Ordenar en Rappi',
    },
  ] satisfies DeliveryPlatform[],
} as const;

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const footer = {
  groups: [
    {
      title: 'Sitio',
      links: navLinks.map((link) => ({ label: link.label, href: link.href })),
    },
    {
      title: 'Pedidos',
      links: delivery.platforms.map((platform) => ({
        label: platform.name,
        href: platform.href,
        external: true,
      })),
    },
    {
      title: 'Contacto',
      links: [
        { label: contact.instagram.label, href: contact.instagram.href, external: true },
        { label: contact.phone.display, href: contact.phone.href },
        {
          label: 'WhatsApp',
          href: 'https://wa.me/528719727662',
          external: true,
        },
        {
          label: 'Google Maps',
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address.line)}`,
          external: true,
        },
      ],
    },
  ] satisfies { title: string; links: FooterLink[] }[],
  social: [
    {
      id: 'instagram',
      label: 'Instagram',
      href: contact.instagram.href,
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/528719727662',
    },
    {
      id: 'phone',
      label: 'Teléfono',
      href: contact.phone.href,
    },
  ] as const,
} as const;
