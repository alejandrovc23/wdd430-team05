import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "An accessible marketplace concept celebrating artisans, handmade goods, and thoughtful product discovery.",
};

export const viewport: Viewport = {
  themeColor: "#254441",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
