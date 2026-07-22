import type { Category } from "../types/catalog";

export const categories: Category[] = [
  {
    id: "ceramics",
    name: "Ceramics",
    description:
      "Handcrafted pottery and ceramic pieces created by artisans for everyday living and meaningful spaces.",
    image: "/images/category-ceramics.svg",
    imageAlt:
      "Handcrafted ceramic vessels displayed with natural decorative elements",
  },
  {
    id: "woven-goods",
    name: "Woven Goods",
    description:
      "Beautiful handmade baskets, textiles, and fiber creations crafted using traditional techniques.",
    image: "/images/category-textiles.svg",
    imageAlt:
      "Handwoven textile with natural fibers and geometric patterns",
  },
  {
    id: "jewelry",
    name: "Jewelry",
    description:
      "Unique artisan jewelry pieces made with carefully selected materials and personal creative expression.",
    image: "/images/category-jewelry.svg",
    imageAlt:
      "Handcrafted pendant necklace displayed on a warm surface",
  },
];