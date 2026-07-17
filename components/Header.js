"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/#categories", label: "Categories" },
  { href: "/#featured-products", label: "Featured pieces" },
  { href: "/#artisan-story", label: "Our makers" },
  { href: "/design-system", label: "Design system" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="site-header__inner content-width">
        <Link
          className="wordmark"
          href="/"
          aria-label="Handcrafted Haven home"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          <span className="wordmark__mark" aria-hidden="true">
            HH
          </span>
          <span>Handcrafted Haven</span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          <ul className="primary-nav__list">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="primary-nav__link"
                  href={item.href}
                  aria-current={
                    item.href === "/design-system" &&
                    pathname === "/design-system"
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
