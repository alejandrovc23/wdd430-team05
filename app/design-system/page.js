import Link from "next/link";
import ProductCard from "../../components/ProductCard";
import { products } from "../../data/products";

export const metadata = {
  title: "Design System",
  description:
    "The Week 02 color, typography, component, layout, and accessibility direction for Handcrafted Haven.",
};

const colors = [
  { name: "Forest", value: "#254441", use: "Primary brand and actions" },
  { name: "Forest Dark", value: "#17312F", use: "Hover states and footer" },
  { name: "Terracotta", value: "#A34A2A", use: "Warm accent and highlights" },
  { name: "Cream", value: "#FFF8EE", use: "Page and section background" },
  { name: "White", value: "#FFFFFF", use: "Cards and contrast surfaces" },
  { name: "Charcoal", value: "#2D2A26", use: "Body text" },
  { name: "Sage", value: "#8BAA91", use: "Supporting detail" },
];

const spacingTokens = [
  { name: "2XS", value: "0.25rem" },
  { name: "XS", value: "0.5rem" },
  { name: "S", value: "0.75rem" },
  { name: "M", value: "1rem" },
  { name: "L", value: "1.5rem" },
  { name: "XL", value: "2rem" },
  { name: "2XL", value: "3rem" },
];

const radiusTokens = [
  { name: "Small", value: "0.5rem" },
  { name: "Medium", value: "0.875rem" },
  { name: "Large", value: "1.5rem" },
  { name: "Pill", value: "999px" },
];

export default function DesignSystemPage() {
  return (
    <main className="design-system" id="main-content" tabIndex={-1}>
      <section
        className="design-system__hero"
        id="brand-direction"
        aria-labelledby="design-system-title"
      >
        <div className="content-width design-system__hero-inner">
          <p className="eyebrow">Week 02 visual foundation</p>
          <div className="wordmark wordmark--display">
            <span className="wordmark__mark" aria-hidden="true">
              HH
            </span>
            <span>Handcrafted Haven</span>
          </div>
          <h1 id="design-system-title">A warm home for meaningful craft.</h1>
          <p className="design-system__intro">
            The Handcrafted Haven identity balances the warmth of an artisan
            studio with the clarity of a trustworthy marketplace. Natural color,
            generous space, tactile imagery, and readable type help every maker&apos;s
            work feel considered and approachable.
          </p>
          <ul
            className="design-system__keywords"
            aria-label="Brand qualities"
            role="list"
          >
            <li>Warm</li>
            <li>Authentic</li>
            <li>Creative</li>
            <li>Trustworthy</li>
            <li>Sustainable</li>
            <li>Community-oriented</li>
          </ul>
        </div>
      </section>

      <section className="ds-section" id="colors" aria-labelledby="colors-title">
        <div className="content-width">
          <div className="ds-section__heading">
            <p className="eyebrow">Foundation</p>
            <h2 id="colors-title">Color palette</h2>
            <p>
              Earth-derived colors create warmth while Forest, Forest Dark,
              Terracotta, White, and Charcoal provide strong text contrast.
            </p>
          </div>
          <ul className="swatch-grid" role="list">
            {colors.map((color) => (
              <li className="color-swatch" key={color.name}>
                <div
                  className="color-swatch__preview"
                  style={{ "--swatch-color": color.value }}
                  aria-hidden="true"
                />
                <div className="color-swatch__details">
                  <strong>{color.name}</strong>
                  <code>{color.value}</code>
                  <span>{color.use}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="ds-section ds-section--cream"
        aria-labelledby="typography-title"
      >
        <div className="content-width">
          <div className="ds-section__heading">
            <p className="eyebrow">Voice and hierarchy</p>
            <h2 id="typography-title">Typography</h2>
            <p>
              Familiar system fonts keep pages fast and readable. Editorial
              serif headings add craft character; clear sans-serif text supports
              effortless scanning.
            </p>
          </div>
          <div className="type-grid">
            <div className="type-sample type-sample--heading">
              <p className="type-sample__label">Heading family</p>
              <p className="type-sample__spec">
                Georgia, Cambria, &quot;Times New Roman&quot;, serif
              </p>
              <p className="type-sample__display">
                Objects worth keeping, stories worth sharing.
              </p>
              <p>Use a concise, human heading hierarchy from h1 through h3.</p>
            </div>
            <div className="type-sample type-sample--body">
              <p className="type-sample__label">Body and interface family</p>
              <p className="type-sample__spec">Arial, Helvetica, sans-serif</p>
              <p className="type-sample__body-copy">
                Handcrafted Haven connects customers with unique goods and the
                people who make them. A comfortable base size and open line
                height support longer descriptions and interface labels alike.
              </p>
              <p className="type-sample__small">
                Supporting text remains large enough to read comfortably.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ds-section" aria-labelledby="actions-title">
        <div className="content-width component-showcase-grid">
          <div>
            <div className="ds-section__heading">
              <p className="eyebrow">Reusable patterns</p>
              <h2 id="actions-title">Actions and links</h2>
              <p>
                Labels explain the destination, and focus states remain visible
                for keyboard navigation.
              </p>
            </div>
            <div className="button-showcase">
              <Link className="button button--primary" href="/">
                Primary button
              </Link>
              <Link className="button button--secondary" href="#colors">
                Secondary button
              </Link>
              <Link className="text-link" href="#accessibility">
                Read accessibility notes
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </div>

          <div className="control-card">
            <h3>Form controls</h3>
            <p id="control-example-note">
              Editable visual examples; no form is submitted on this page.
            </p>
            <fieldset aria-describedby="control-example-note">
              <legend className="sr-only">Example form controls</legend>
              <div className="form-field">
                <label htmlFor="search-example">Search term</label>
                <input
                  aria-describedby="search-example-hint"
                  id="search-example"
                  name="search-example"
                  type="text"
                  defaultValue="Hand-thrown ceramics"
                />
                <span className="field-hint" id="search-example-hint">
                  Example supporting text
                </span>
              </div>
              <div className="form-field">
                <label htmlFor="category-example">Category</label>
                <select
                  id="category-example"
                  name="category-example"
                  defaultValue="ceramics"
                >
                  <option value="all">All handmade goods</option>
                  <option value="ceramics">Ceramics</option>
                  <option value="textiles">Woven textiles</option>
                  <option value="jewelry">Artisan jewelry</option>
                </select>
              </div>
            </fieldset>
          </div>
        </div>
      </section>

      <section
        className="ds-section ds-section--forest"
        aria-labelledby="card-example-title"
      >
        <div className="content-width product-example-layout">
          <div className="ds-section__heading ds-section__heading--light">
            <p className="eyebrow">Content pattern</p>
            <h2 id="card-example-title">Product-card example</h2>
            <p>
              Product imagery, classification, maker credit, price, sample
              rating, and a descriptive link follow a predictable reading order.
            </p>
          </div>
          <ul className="product-example" role="list">
            <ProductCard product={products[0]} />
          </ul>
        </div>
      </section>

      <section className="ds-section" aria-labelledby="tokens-title">
        <div className="content-width">
          <div className="ds-section__heading">
            <p className="eyebrow">Rhythm and shape</p>
            <h2 id="tokens-title">Spacing and border radius</h2>
            <p>
              A compact token scale builds consistent relationships from inline
              details through full section layouts.
            </p>
          </div>
          <div className="token-grid">
            <article className="token-card">
              <h3>Spacing scale</h3>
              <ul className="spacing-list" role="list">
                {spacingTokens.map((token) => (
                  <li key={token.name}>
                    <span className="token-name">{token.name}</span>
                    <span
                      className="spacing-bar"
                      style={{ "--token-size": token.value }}
                      aria-hidden="true"
                    />
                    <code>{token.value}</code>
                  </li>
                ))}
              </ul>
            </article>
            <article className="token-card">
              <h3>Radius scale</h3>
              <ul className="radius-list" role="list">
                {radiusTokens.map((token) => (
                  <li key={token.name}>
                    <span
                      className="radius-preview"
                      style={{ "--token-radius": token.value }}
                      aria-hidden="true"
                    />
                    <span>
                      <strong>{token.name}</strong>
                      <code>{token.value}</code>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section
        className="ds-section ds-section--cream"
        id="accessibility"
        aria-labelledby="accessibility-title"
      >
        <div className="content-width guidance-grid">
          <article>
            <p className="eyebrow">Inclusive by default</p>
            <h2 id="accessibility-title">Accessibility notes</h2>
            <ul className="check-list">
              <li>WCAG 2.1 Level AA is the semester accessibility goal.</li>
              <li>Semantic landmarks and a logical heading order aid navigation.</li>
              <li>Text alternatives describe meaningful local illustrations.</li>
              <li>Keyboard focus is visible on links and editable controls.</li>
              <li>Color is never the only way important meaning is conveyed.</li>
              <li>Reduced-motion preferences remove nonessential transitions.</li>
            </ul>
          </article>
          <article>
            <p className="eyebrow">Mobile first</p>
            <h2>Responsive behavior</h2>
            <ul className="check-list">
              <li>Layouts begin in one column for small screens.</li>
              <li>Card grids expand to two columns on tablets.</li>
              <li>Three-column grids use the 1200-pixel content width on desktop.</li>
              <li>Navigation wraps cleanly instead of hiding essential links.</li>
              <li>Images scale within their cards without horizontal overflow.</li>
              <li>Touch targets retain comfortable height and spacing.</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
