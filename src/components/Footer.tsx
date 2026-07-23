import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner content-width">
        <div>
          <Link className="wordmark wordmark--footer" href="/">
            <span className="wordmark__mark" aria-hidden="true">
              HH
            </span>
            <span>Handcrafted Haven</span>
          </Link>
          <p className="site-footer__summary">
            An accessible marketplace concept that celebrates handmade work,
            artisan stories, and creative communities.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="site-footer__links">
            <li>
              <Link href="/#categories">Categories</Link>
            </li>
            <li>
              <Link href="/#featured-products">Featured pieces</Link>
            </li>
            <li>
              <Link href="/design-system">Design system</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="site-footer__bottom content-width">
        <p>Handcrafted Haven · WDD 430 Team 05</p>
      </div>
    </footer>
  );
}
