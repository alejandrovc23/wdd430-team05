import ProductGrid from "../../../components/ProductGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import SellerProfile from "../../../components/SellerProfile";
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
          <SellerProfile seller={seller} />
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

          <ProductGrid
            products={sellerProducts}
            emptyMessage="This artisan's products will be available soon."
          />
        </div>
      </section>
    </main>
  );
}