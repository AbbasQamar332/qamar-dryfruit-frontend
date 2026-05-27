export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  featured?: boolean;
};

export const categories = [
  "All",
  "Dry Fruits",
  "Natural Honey",
  "Organic Jams",
  "Thyme Tea",
  "Herbal Teas",
  "Natural Herbs",
];

