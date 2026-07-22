import "./globals.css";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "Handcrafted Haven is an online marketplace where customers discover unique handmade products from talented artisans and independent creators.",
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

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}