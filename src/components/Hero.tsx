import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner content-width">
        <div className="hero__content">
          <p className="eyebrow">Made by hand. Chosen with heart.</p>

          <h1 id="hero-title">
            Discover unique handcrafted treasures from talented artisans.
          </h1>

          <p className="hero__lede">
            Handcrafted Haven connects customers with creative makers who
            transform passion, skill, and sustainable materials into meaningful
            handmade products.
          </p>

          <div className="button-group">
            <Link className="button button--primary" href="/products">
              Browse products
            </Link>

            <Link className="button button--secondary" href="/sellers">
              Meet our artisans
            </Link>
          </div>

          <p className="hero__note">
            Support independent creators while discovering carefully crafted
            items made with purpose and creativity.
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <Image
              className="hero__image"
              src="/images/artisan-workshop.svg"
              alt="Artisan creating handmade products at a craft table"
              width={800}
              height={600}
              priority
            />
          </div>

          <div className="hero__caption">
            <span className="hero__caption-kicker">
              Every piece tells a story
            </span>
            <span>
              Celebrating skilled makers, sustainable practices, and meaningful
              craftsmanship.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}