import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedProducts from "@/components/FeaturedProducts";
import InstallmentBanner from "@/components/InstallmentBanner";
import VendorShowcase from "@/components/VendorShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <InstallmentBanner />
        <VendorShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
