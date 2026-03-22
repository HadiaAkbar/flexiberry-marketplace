"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">My Account</h1>
          <p className="text-muted-foreground">Account page content coming soon</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
