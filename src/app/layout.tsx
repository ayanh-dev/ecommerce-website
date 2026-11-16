import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { SiteFooter } from "@/components/site-footer";
import { TopNavbar } from "@/components/top-navbar";

export const metadata: Metadata = {
  title: "Flipkart-inspired Marketplace",
  description: "Responsive e-commerce storefront with category browsing, product detail pages, and cart checkout flow.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F1F3F6] text-slate-900">
        <CartProvider>
          <TopNavbar />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
