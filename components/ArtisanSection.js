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
            alt="Illustration of a maker shaping a ceramic piece in a warm workshop"
            width={800}
            height={600}
          />
        </div>

        <div className="artisan-section__content">
          <p className="eyebrow">The person behind the piece</p>
          <h2 id="artisan-title">Every object begins with a maker.</h2>
          <p>
            Our semester vision puts artisan biographies and creative processes
            beside the products they shape, helping customers understand the
            materials, traditions, and care behind each item.
          </p>
          <ul className="artisan-values" role="list">
            <li>Human stories presented with clarity and respect</li>
            <li>Thoughtful details about materials and process</li>
            <li>Accessible discovery across devices and abilities</li>
          </ul>
          <Link className="button button--light" href="/design-system#brand-direction">
            See the brand direction
          </Link>
        </div>
      </div>
    </section>
  );
}
