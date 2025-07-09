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
  title: "StreamVibe - The First Decentralized Video Streaming Platform",
  description:
    "StreamVibe is the first decentralized video streaming platform that allows you to stream your videos to the world without the need for a central authority.",
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
