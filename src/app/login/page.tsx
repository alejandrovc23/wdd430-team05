export const metadata = {
  title: "Login | Handcrafted Haven",
  description:
    "Sign in to your Handcrafted Haven account.",
};

export default function LoginPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section auth-section"
        aria-labelledby="login-title"
      >
        <div className="content-width auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <p className="eyebrow">
                Welcome back
              </p>

              <h1 id="login-title">
                Sign in to Handcrafted Haven
              </h1>

              <p>
                Access your account to manage your
                handcrafted collection and discover
                unique artisan creations.
              </p>
            </div>

            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
              </div>

              <button
                className="button button--primary auth-button"
                type="submit"
              >
                Sign in
              </button>
            </form>

            <p className="auth-footer">
              New to Handcrafted Haven?{" "}
              <a href="/register">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}