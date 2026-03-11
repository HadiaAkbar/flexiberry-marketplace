import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Shield, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-[420px] md:h-[480px]">
        <img src={heroBanner} alt="FlexiBerry Shopping" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg"
            >
              <span className="inline-block gradient-coral text-primary-foreground text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                🔥 BIGGEST INSTALLMENT SALE
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-card mb-3 leading-tight">
                Buy Now, Pay in <span className="text-coral-light">Easy Installments</span>
              </h1>
              <p className="text-card/80 text-sm md:text-base mb-6 max-w-md">
                Pakistan's #1 Multi-Vendor Installment Marketplace. Get smartphones, laptops, appliances & more on 6-12 month easy payment plans.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg" className="gradient-coral border-none text-primary-foreground shadow-coral hover:opacity-90 font-semibold">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/vendor/register">
                  <Button size="lg" variant="outline" className="border-card/30 text-card bg-card/10 backdrop-blur hover:bg-card/20">
                    Sell on FlexiBerry
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* USP Bar */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { icon: CreditCard, title: "Easy Installments", desc: "6 & 12 month plans on every product" },
              { icon: Shield, title: "Secure & Verified", desc: "KYC-verified buyers & trusted vendors" },
              { icon: Truck, title: "Nationwide Delivery", desc: "Free delivery across Pakistan" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-4 px-6">
                <div className="h-10 w-10 rounded-lg gradient-coral flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
