import ArtisanSection from "../components/ArtisanSection";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";
import { products } from "../data/products";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero />

      <section
        className="section section--cream"
        id="categories"
        aria-labelledby="categories-title"
      >
        <div className="content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Explore by craft</p>
              <h2 id="categories-title">Featured categories</h2>
            </div>
            <p>
              Discover the textures, forms, and traditions that make handmade
              objects feel personal.
            </p>
          </div>
          <ul className="card-grid category-grid" role="list">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </ul>
        </div>
      </section>

      <section
        className="section"
        id="featured-products"
        aria-labelledby="products-title"
      >
        <div className="content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A glimpse of the collection</p>
              <h2 id="products-title">Featured handmade pieces</h2>
            </div>
            <p>
              Static sample content demonstrates the product-card direction for
              future catalog development.
            </p>
          </div>
          <ul className="card-grid product-grid" role="list">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </section>

      <ArtisanSection />
    </main>
  );
}
