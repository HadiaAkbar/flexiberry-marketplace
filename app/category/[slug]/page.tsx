"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Category: {slug}</h1>
          <p className="text-muted-foreground">Category page content coming soon</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
