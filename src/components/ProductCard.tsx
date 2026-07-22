import Image from "next/image";
import Link from "next/link";
import type { Product } from "../types/catalog";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <li className="product-card">
      <article>
        <div className="product-card__image-wrap">
          <Image
            className="product-card__image"
            src={product.image}
            alt={product.imageAlt}
            width={800}
            height={600}
          />

          <span className="product-card__category">
            {product.category}
          </span>
        </div>

        <div className="product-card__content">
          <h3>{product.name}</h3>

          <p className="product-card__artisan">
            By {product.artisan}
          </p>

          <div className="product-card__details">
            <p className="product-card__price">
              {product.price}
            </p>

            <p className="product-card__rating">
              <span aria-hidden="true">★</span>

              <span className="sr-only">
                Customer rating:
              </span>{" "}

              {product.rating} out of 5

              <span className="product-card__reviews">
                ({product.reviewCount} reviews)
              </span>
            </p>
          </div>

          <Link
            className="text-link"
            href={product.href}
            aria-label={`View details for ${product.name}`}
          >
            View product details
            <span className="sr-only">
              {" "}for {product.name}
            </span>
            <span aria-hidden="true"> →</span>
          </Link>
        </div>
      </article>
    </li>
  );
}