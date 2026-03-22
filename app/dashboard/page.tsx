"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>
          <p className="text-muted-foreground">Dashboard content coming soon</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
