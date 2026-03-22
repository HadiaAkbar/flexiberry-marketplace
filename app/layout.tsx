import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flexiberry Marketplace",
  description:
    "Shop premium products with flexible installment options. Flexiberry Marketplace connects buyers and vendors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
