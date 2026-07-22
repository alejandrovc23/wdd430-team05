import Link from "next/link";
import { sellers } from "../../data/sellers";

export const metadata = {
  title: "Artisans | Handcrafted Haven",
  description:
    "Meet the talented artisans behind the handmade products available on Handcrafted Haven.",
};

export default function SellersPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section"
        aria-labelledby="sellers-title"
      >
        <div className="content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                Meet the makers
              </p>

              <h1 id="sellers-title">
                Our artisans
              </h1>
            </div>

            <p>
              Learn about the creators behind each
              handcrafted product and discover their
              stories, skills, and traditions.
            </p>
          </div>

          <ul className="card-grid" role="list">
            {sellers.map((seller) => (
              <li key={seller.id}>
                <article className="artisan-card">
                  <h2>
                    {seller.businessName}
                  </h2>

                  <p>
                    {seller.story}
                  </p>

                  <Link
                    className="text-link"
                    href={`/sellers/${seller.id}`}
                  >
                    View artisan profile
                    <span className="sr-only">
                      {" "}for {seller.businessName}
                    </span>
                    <span aria-hidden="true">
                      {" "}→
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}