import Image from "next/image";
import Link from "next/link";

export default function ArtisanSection() {
  return (
    <section
      className="artisan-section section"
      id="artisan-story"
      aria-labelledby="artisan-title"
    >
      <div className="artisan-section__panel content-width">
        <div className="artisan-section__image-wrap">
          <Image
            className="artisan-section__image"
            src="/images/artisan-workshop.svg"
            alt="Artisan creating handmade products in a workshop"
            width={800}
            height={600}
          />
        </div>

        <div className="artisan-section__content">
          <p className="eyebrow">Meet the creators</p>

          <h2 id="artisan-title">
            Every handcrafted piece has a story behind it.
          </h2>

          <p>
            Handcrafted Haven gives artisans a place to share their creative
            journey, showcase their skills, and connect with customers who
            appreciate unique handmade products.
          </p>

          <ul className="artisan-values" role="list">
            <li>
              Artisan profiles that highlight each maker&apos;s story and
              craftsmanship
            </li>
            <li>
              Product details that explain materials, techniques, and creative
              processes
            </li>
            <li>
              A welcoming marketplace designed for customers and creators
            </li>
          </ul>

          <Link className="button button--light" href="/sellers">
            Explore our artisans
          </Link>
        </div>
      </div>
    </section>
  );
}