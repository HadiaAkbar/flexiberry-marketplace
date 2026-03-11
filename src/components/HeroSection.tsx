import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Shield, Truck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative h-[460px] md:h-[520px]">
        <img src={heroBanner} alt="FlexiBerry Shopping" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/20" />
        
        {/* Decorative orbs */}
        <div className="absolute top-20 right-[20%] w-72 h-72 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-[30%] w-48 h-48 rounded-full bg-accent/15 blur-[80px] pointer-events-none" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-xl"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-1.5 gradient-coral text-primary-foreground text-xs font-bold px-4 py-2 rounded-full mb-5 shadow-coral"
              >
                <Sparkles className="h-3.5 w-3.5" />
                BIGGEST INSTALLMENT SALE — UP TO 40% OFF
              </motion.span>
              <h1 className="font-display text-4xl md:text-[3.5rem] font-bold text-card mb-4 leading-[1.1] tracking-tight">
                Buy Now, Pay in{" "}
                <span className="text-gradient-coral">Easy Installments</span>
              </h1>
              <p className="text-card/80 text-base md:text-lg mb-8 max-w-md leading-relaxed">
                Pakistan's #1 Multi-Vendor Installment Marketplace. Smartphones, laptops, appliances & more on 6-12 month plans.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg" className="gradient-coral border-none text-primary-foreground shadow-coral hover:opacity-90 font-semibold h-12 px-8 text-base rounded-xl">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/vendor/register">
                  <Button size="lg" variant="outline" className="border-card/30 text-card bg-card/10 backdrop-blur-md hover:bg-card/20 h-12 px-8 text-base rounded-xl">
                    Sell on FlexiBerry
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* USP Bar */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { icon: CreditCard, title: "Easy Installments", desc: "6 & 12 month plans on every product" },
              { icon: Shield, title: "Secure & Verified", desc: "KYC-verified buyers & trusted vendors" },
              { icon: Truck, title: "Nationwide Delivery", desc: "Free delivery across Pakistan" },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-3 py-4 px-6"
              >
                <div className="h-11 w-11 rounded-xl gradient-coral flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
