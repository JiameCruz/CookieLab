export type MenuCategory = 'Galletas' | 'Sandwiches' | 'Matcha' | 'Bebidas';

export const menuCategories: MenuCategory[] = ['Galletas', 'Sandwiches', 'Matcha', 'Bebidas'];

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  price: number;
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export type Promotion = {
  id: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  badge?: string;
};

export const formatPrice = (amount: number) =>
  `$${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
