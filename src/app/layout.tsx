import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import { CartProvider } from "@/lib/contexts/CartContext";
import CookieConsent from "@/components/ui/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3D Print Store - High-Quality 3D Printed Products",
  description: "Shop our collection of premium 3D printed products made in the EU.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">{children}</main>
            <Footer />
            <CookieConsent />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
