"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="wordmark">
          <span className="wordmark__mark">HH</span>
          <span>Handcrafted Haven</span>
        </Link>

        <nav className="primary-nav" aria-label="Main navigation">
          <ul className="primary-nav__list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/sellers">Sellers</Link>
            </li>
            <li>
              <Link href="/design-system">Design System</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}