export const metadata = {
  title: "Seller Dashboard | Handcrafted Haven",
  description:
    "Manage your artisan profile and handcrafted product listings.",
};

export default function DashboardPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section"
        aria-labelledby="dashboard-title"
      >
        <div className="content-width">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                Seller area
              </p>

              <h1 id="dashboard-title">
                Artisan Dashboard
              </h1>
            </div>

            <p>
              Manage your artisan profile and showcase
              your handcrafted creations with the
              Handcrafted Haven community.
            </p>
          </div>

          <div className="card-grid">
            <article className="product-card">
              <div className="product-card__content">
                <h2>
                  Your Profile
                </h2>

                <p>
                  Update your artisan story,
                  specialties, profile image, and
                  contact information.
                </p>

                <button className="button button--primary">
                  Edit Profile
                </button>
              </div>
            </article>

            <article className="product-card">
              <div className="product-card__content">
                <h2>
                  Your Products
                </h2>

                <p>
                  Add and manage handcrafted items,
                  descriptions, pricing, and images.
                </p>

                <button className="button button--primary">
                  Add Product
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}