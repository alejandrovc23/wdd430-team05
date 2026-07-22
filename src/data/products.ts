import type { Product } from "../types/catalog";

export const products: Product[] = [
  {
    id: "ember-mug",
    name: "Ember Glaze Mug",
    description:
      "A handcrafted ceramic mug featuring a warm terracotta glaze. Each piece is shaped and finished by hand, making every mug unique.",
    category: "Ceramics",
    artisan: "Riverbend Clay Studio",
    artisanId: "riverbend-clay-studio",
    price: 38,
    rating: 4.9,
    reviewCount: 28,
    image: "/images/product-mug.svg",
    imageAlt:
      "Handcrafted cream ceramic mug with a deep terracotta glaze",
    href: "/products/ember-mug",
  },
  {
    id: "harvest-basket",
    name: "Harvest Table Basket",
    description:
      "A naturally woven basket created from sustainable fibers. Designed for everyday storage while bringing handmade beauty into the home.",
    category: "Woven Goods",
    artisan: "Sundrop Weaving Collective",
    artisanId: "sundrop-weaving-collective",
    price: 64,
    rating: 4.8,
    reviewCount: 19,
    image: "/images/product-basket.svg",
    imageAlt:
      "Handwoven natural fiber basket with curved handles",
    href: "/products/harvest-basket",
  },
  {
    id: "meadow-necklace",
    name: "Meadow Pendant Necklace",
    description:
      "A handcrafted pendant necklace combining natural stone and artisan metalwork to create a timeless accessory.",
    category: "Jewelry",
    artisan: "Cedar & Stone Studio",
    artisanId: "cedar-and-stone-studio",
    price: 52,
    rating: 4.9,
    reviewCount: 34,
    image: "/images/product-necklace.svg",
    imageAlt:
      "Handcrafted brass pendant necklace with a sage-colored stone",
    href: "/products/meadow-necklace",
  },
];