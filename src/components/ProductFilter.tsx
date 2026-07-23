"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../types/catalog";

interface ProductFilterProps {
  products: Product[];
}

export default function ProductFilter({
  products,
}: ProductFilterProps) {
  const [category, setCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = [
    "All",
    ...Array.from(
      new Set(products.map((product) => product.category))
    ),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" ||
      product.category === category;

    const matchesMinPrice =
      minPrice === "" ||
      product.price >= Number(minPrice);

    const matchesMaxPrice =
      maxPrice === "" ||
      product.price <= Number(maxPrice);

    return (
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  function resetFilters() {
    setCategory("All");
    setMinPrice("");
    setMaxPrice("");
  }

  return (
    <section aria-labelledby="filter-title">
      <h2 id="filter-title">
        Filter products
      </h2>

      <div className="filter-controls">
        <div>
          <label htmlFor="category-filter">
            Category
          </label>

          <select
            id="category-filter"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="min-price">
            Minimum price
          </label>

          <input
            id="min-price"
            type="number"
            min="0"
            value={minPrice}
            onChange={(event) =>
              setMinPrice(event.target.value)
            }
            placeholder="No minimum"
          />
        </div>

        <div>
          <label htmlFor="max-price">
            Maximum price
          </label>

          <input
            id="max-price"
            type="number"
            min="0"
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(event.target.value)
            }
            placeholder="No maximum"
          />
        </div>

        <button
          type="button"
          className="button button--secondary"
          onClick={resetFilters}
        >
          Reset filters
        </button>
      </div>

      <p aria-live="polite">
        Showing {filteredProducts.length} product
        {filteredProducts.length !== 1 && "s"}
      </p>

      {filteredProducts.length > 0 ? (
        <ul
          className="card-grid product-grid"
          role="list"
        >
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <p>
          No products match your filters.
        </p>
      )}
    </section>
  );
}