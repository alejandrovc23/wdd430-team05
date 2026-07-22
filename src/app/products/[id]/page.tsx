import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "../../../data/products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (item) => item.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section"
        aria-labelledby="product-title"
      >
        <div className="content-width product-detail">
          <div className="product-detail__image">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={800}
              height={600}
            />
          </div>

          <div className="product-detail__content">
            <p className="eyebrow">
              {product.category}
            </p>

            <h1 id="product-title">
              {product.name}
            </h1>

            <p>
              {product.description}
            </p>

            <p>
              Created by{" "}
              <strong>{product.artisan}</strong>
            </p>

            <p className="product-detail__price">
              ${product.price.toFixed(2)}
            </p>

            <div
              aria-label={`Rated ${product.rating} out of 5 stars`}
            >
              <span aria-hidden="true">
                ★★★★★
              </span>

              <span>
                {" "}
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            <button className="button button--primary">
              Add to cart
            </button>
          </div>
        </div>
      </section>

      <section
        className="section section--cream"
        aria-labelledby="reviews-title"
      >
        <div className="content-width">
          <h2 id="reviews-title">
            Customer reviews
          </h2>

          <p>
            Reviews and ratings from customers will
            appear here.
          </p>
        </div>
      </section>
    </main>
  );
}