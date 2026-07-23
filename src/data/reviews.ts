import type { Review } from "../types/catalog";

export const reviews: Review[] = [
  {
    id: "review-1",
    productId: "ember-mug",
    customerName: "Sarah M.",
    rating: 5,
    comment:
      "This mug is beautiful and feels wonderful to use every morning. The handmade details make it special.",
    createdAt: "2026-07-10",
  },
  {
    id: "review-2",
    productId: "ember-mug",
    customerName: "David R.",
    rating: 4,
    comment:
      "Great craftsmanship and a unique design. It arrived safely and looks exactly like the description.",
    createdAt: "2026-07-12",
  },
  {
    id: "review-3",
    productId: "harvest-basket",
    customerName: "Emily T.",
    rating: 5,
    comment:
      "The basket is sturdy, beautiful, and made with excellent attention to detail.",
    createdAt: "2026-07-15",
  },
  {
    id: "review-4",
    productId: "meadow-necklace",
    customerName: "Michael K.",
    rating: 5,
    comment:
      "A wonderful handcrafted piece with a timeless look.",
    createdAt: "2026-07-18",
  },
];