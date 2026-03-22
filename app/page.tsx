"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import InstallmentBanner from "@/components/InstallmentBanner";
import HowItWorks from "@/components/HowItWorks";
import VendorShowcase from "@/components/VendorShowcase";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <InstallmentBanner />
        <HowItWorks />
        <VendorShowcase />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
