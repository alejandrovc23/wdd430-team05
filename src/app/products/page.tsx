import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export const metadata = {
  title: "Products | Handcrafted Haven",
  description:
    "Browse unique handmade products created by talented artisans.",
};

export default function ProductsPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className="section" aria-labelledby="products-title">
        <div className="content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our collection</p>

              <h1 id="products-title">
                Handmade products
              </h1>
            </div>

            <p>
              Explore unique handcrafted pieces created by independent
              artisans. Each product represents creativity, skill, and
              meaningful craftsmanship.
            </p>
          </div>

          <ul className="card-grid product-grid" role="list">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}