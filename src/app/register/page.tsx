export const metadata = {
  title: "Register | Handcrafted Haven",
  description:
    "Create your Handcrafted Haven account.",
};

export default function RegisterPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section
        className="section auth-section"
        aria-labelledby="register-title"
      >
        <div className="content-width auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <p className="eyebrow">
                Join our community
              </p>

              <h1 id="register-title">
                Create your account
              </h1>

              <p>
                Become part of Handcrafted Haven to
                discover unique handmade products,
                support talented artisans, and manage
                your own collection.
              </p>
            </div>

            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
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
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <button
                className="button button--primary auth-button"
                type="submit"
              >
                Create Account
              </button>
            </form>

            <p className="auth-footer">
              Already have an account?{" "}
              <a href="/login">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}