import ProductCard from "./ProductCard";
import type { Product } from "../types/catalog";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export default function ProductGrid({
  products,
  emptyMessage = "No products available.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p>
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul
      className="card-grid product-grid"
      role="list"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </ul>
  );
}