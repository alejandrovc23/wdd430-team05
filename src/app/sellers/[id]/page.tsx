import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sellers } from "../../../data/sellers";
import { products } from "../../../data/products";

interface SellerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return sellers.map((seller) => ({
    id: seller.id,
  }));
}

export default async function SellerPage({
  params,
}: SellerPageProps) {
  const { id } = await params;

  const seller = sellers.find(
    (item) => item.id === id
  );

  if (!seller) {
    notFound();
  }

  const sellerProducts = products.filter(
    (product) => product.artisanId === seller.id
  );

  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section"
        aria-labelledby="seller-title"
      >
        <div className="content-width">
          <div className="product-detail">
            <div className="product-detail__image">
              <Image
                src={seller.image}
                alt={seller.imageAlt}
                width={800}
                height={600}
                priority
              />
            </div>

            <div className="product-detail__content">
              <p className="eyebrow">
                Artisan Profile
              </p>

              <h1 id="seller-title">
                {seller.businessName}
              </h1>

              {seller.specialty && (
                <p>
                  <strong>Specialty:</strong>{" "}
                  {seller.specialty}
                </p>
              )}

              <h2>About the Artisan</h2>

              <p>{seller.story}</p>

              {seller.contact && (
                <p>
                  <strong>Contact:</strong>{" "}
                  <a href={seller.contact}>
                    {seller.contact}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--cream"
        aria-labelledby="collection-title"
      >
        <div className="content-width">
          <h2 id="collection-title">
            Handmade Collection
          </h2>

          {sellerProducts.length > 0 ? (
            <ul className="card-grid product-grid">
              {sellerProducts.map((product) => (
                <li key={product.id}>
                  <article className="product-card">
                    <h3>
                      <Link href={product.href}>
                        {product.name}
                      </Link>
                    </h3>

                    {product.description && (
                      <p>{product.description}</p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              This artisan&apos;s products will be
              available soon.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}