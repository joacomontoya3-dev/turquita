import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

/**
 * Inter se carga con next/font, que la auto-hospeda y evita el salto de fuente.
 * La variable alimenta a --font-sans en globals.css.
 */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mate Coast",
  description:
    "Argentine mate gear, stocked in Broadbeach and shipped Australia-wide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* itemCount sale del carrito de Shopify — ver README */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
