export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  artisan: string;
  price: string;
  rating: string;
  reviewCount: number;
  image: string;
  imageAlt: string;
  href: string;
}
