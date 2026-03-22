import type { Metadata, Viewport } from "next";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flexiberry Marketplace",
  description: "A modern marketplace platform with products, vendors, and installment options",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CartProvider>
            {children}
          </CartProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
