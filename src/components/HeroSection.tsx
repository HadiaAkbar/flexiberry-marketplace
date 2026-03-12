import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";
import carousel9 from "@/assets/carousel-9.jpg";

const slides = [
  {
    image: carousel1,
    badge: "BIGGEST SALE — UP TO 40% OFF",
    titleLine1: "Buy Smart,",
    titleLine2: "Pay Easy",
    description: "Latest iPhones & Samsung Galaxy | 6-12 month installment plans available",
    cta: "Shop Smartphones",
    link: "/category/smartphones",
    gradient: "from-[hsl(217,91%,30%)] via-[hsl(217,91%,20%)] to-transparent",
  },
  {
    image: carousel2,
    badge: "LAPTOP DEALS — SAVE BIG",
    titleLine1: "Power Up",
    titleLine2: "Your Work",
    description: "MacBooks, Gaming Laptops & More | Easy installment plans on all models",
    cta: "Shop Laptops",
    link: "/category/laptops",
    gradient: "from-[hsl(263,70%,25%)] via-[hsl(263,70%,18%)] to-transparent",
  },
  {
    image: carousel3,
    badge: "MOTORCYCLE SALE — FLEXIBLE FINANCING",
    titleLine1: "Ride Your",
    titleLine2: "Dream Bike",
    description: "Premium Scotty Motorcycles & Bikes | Easy EMI available for all models",
    cta: "Shop Motorcycles",
    link: "/category/bikes",
    gradient: "from-[hsl(25,90%,25%)] via-[hsl(25,80%,18%)] to-transparent",
  },
  {
    image: carousel4,
    badge: "HOME APPLIANCES — MEGA DEALS",
    titleLine1: "Home",
    titleLine2: "Essentials",
    description: "AC, LED TV, Fridge, Washing Machine & Oven | Complete home solutions",
    cta: "Shop Appliances",
    link: "/category/appliances",
    gradient: "from-[hsl(0,72%,28%)] via-[hsl(0,65%,20%)] to-transparent",
  },
  {
    image: carousel5,
    badge: "GO GREEN — SOLAR SOLUTIONS",
    titleLine1: "Go",
    titleLine2: "Solar",
    description: "Complete Solar Panel Systems | Save on electricity with easy installments",
    cta: "Shop Solar",
    link: "/category/solar",
    gradient: "from-[hsl(45,93%,22%)] via-[hsl(45,80%,15%)] to-transparent",
  },
  {
    image: carousel6,
    badge: "BUNDLE & SAVE — UP TO 50% DISCOUNT",
    titleLine1: "Complete",
    titleLine2: "Jahez Package",
    description: "Fridge + Furniture + Appliances + More | Complete home bundle solutions",
    cta: "Shop Bundles",
    link: "/category/jahez",
    gradient: "from-[hsl(340,78%,28%)] via-[hsl(340,70%,18%)] to-transparent",
  },
  {
    image: carousel7,
    badge: "FURNISH YOUR HOME — PREMIUM COLLECTION",
    titleLine1: "Furnish Your",
    titleLine2: "Dream Home",
    description: "Luxury Furniture | Complete bedroom, living room & dining sets",
    cta: "Shop Furniture",
    link: "/category/furniture",
    gradient: "from-[hsl(160,60%,18%)] via-[hsl(160,50%,12%)] to-transparent",
  },
  {
    image: carousel8,
    badge: "CAR FINANCING — EASY INSTALLMENTS",
    titleLine1: "Drive Your",
    titleLine2: "Dream Car",
    description: "Toyota, Honda, Suzuki & More | Flexible car financing options available",
    cta: "Shop Cars",
    link: "/category/cars",
    gradient: "from-[hsl(217,91%,28%)] via-[hsl(217,80%,18%)] to-transparent",
  },
  {
    image: carousel9,
    badge: "WHOLESALE — BULK DISCOUNTS AVAILABLE",
    titleLine1: "Grow Your",
    titleLine2: "Business",
    description: "Business Raw Materials & Stock | B2B wholesale pricing with bulk discounts",
    cta: "Shop B2B",
    link: "/category/raw-materials",
    gradient: "from-[hsl(25,70%,22%)] via-[hsl(25,60%,15%)] to-transparent",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative h-[460px] md:h-[540px] overflow-hidden bg-foreground">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={s.image}
            alt={s.titleLine1}
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient}`} />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-[hsl(var(--coral-light))] text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-full shadow-lg">
                  <Sparkles className="h-3.5 w-3.5" />
                  {slide.badge}
                </span>

                <div>
                  <h1 className="font-display text-5xl lg:text-7xl font-black leading-none text-white">
                    <span className="block">{slide.titleLine1}</span>
                    <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--coral-light))] via-primary to-[hsl(var(--amber))] bg-clip-text text-transparent">
                      {slide.titleLine2}
                    </span>
                  </h1>
                </div>

                <p className="text-lg lg:text-xl text-white/80 max-w-xl leading-relaxed font-medium">
                  {slide.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to={slide.link}>
                    <Button size="lg" className="bg-gradient-to-r from-primary to-[hsl(var(--coral-light))] border-none text-primary-foreground shadow-lg hover:opacity-90 font-bold h-12 px-8 text-base rounded-xl">
                      {slide.cta} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
