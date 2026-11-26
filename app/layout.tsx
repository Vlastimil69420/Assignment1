// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Laptop Manager",
  description: "Product management system built with Next.js and PocketBase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="content">{children}</main>
        <nav className="bottomNav" aria-label="Main navigation">
          <Link href="/">
            <span aria-hidden="true">⌂</span>
            Home
          </Link>
          <Link href="/products">
            <span aria-hidden="true">☰</span>
            Products
          </Link>
          <Link href="/products/add">
            <span aria-hidden="true">＋</span>
            Add
          </Link>
          <Link href="/admin">
            <span aria-hidden="true">▦</span>
            Admin
          </Link>
        </nav>
      </body>
    </html>
  );
}
