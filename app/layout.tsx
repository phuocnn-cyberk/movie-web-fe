import type { Metadata } from "next";
import { Syne, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HELIX - The Stablecoin For a Stable Future",
  description: "The Composability of DeFi, The Confidence of TradFi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} ${syne.className} dark`}
    >
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
