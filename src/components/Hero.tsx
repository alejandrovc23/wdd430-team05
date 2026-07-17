import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__inner content-width">
        <div className="hero__content">
          <p className="eyebrow">Made by hand. Chosen with heart.</p>
          <h1 id="hero-title">Find meaning in the things you bring home.</h1>
          <p className="hero__lede">
            Handcrafted Haven is a welcoming marketplace concept where thoughtful
            objects, skilled makers, and the stories behind each piece come
            together.
          </p>
          <div className="button-group">
            <Link className="button button--primary" href="#featured-products">
              Browse featured pieces
            </Link>
            <Link className="button button--secondary" href="/design-system">
              Explore our design system
            </Link>
          </div>
          <p className="hero__note">
            A responsive Week 03 landing page built around accessibility,
            community, and sustainable craft.
          </p>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <Image
              className="hero__image"
              src="/images/artisan-workshop.svg"
              alt="Illustration of an artisan working at a sunlit craft table"
              width={800}
              height={600}
              priority
            />
          </div>
          <div className="hero__caption">
            <span className="hero__caption-kicker">Craft with a story</span>
            <span>Designed to celebrate patient hands and enduring materials.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
