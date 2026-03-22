import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Flexiberry Marketplace",
  description: "A modern marketplace platform with products, vendors, and installment options",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
