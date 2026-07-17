import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const metadata = {
  title: {
    default: "Handcrafted Haven",
    template: "%s | Handcrafted Haven",
  },
  description:
    "A Week 02 marketplace concept celebrating artisans, handmade goods, and thoughtful product discovery.",
};

export const viewport = {
  themeColor: "#254441",
};

export default function RootLayout({ children }) {
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
