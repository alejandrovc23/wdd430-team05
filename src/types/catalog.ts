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
  description: string;
  category: string;
  artisan: string;
  artisanId: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageAlt: string;
  href: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Seller {
  id: string;
  name: string;
  businessName: string;
  story: string;
  image: string;
  imageAlt: string;
}