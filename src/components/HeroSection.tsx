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
    badge: "UP TO 40% OFF",
    badgeIcon: "🔥",
    titleLine1: "Buy Smart,",
    titleLine2: "Pay Easy",
    description: "Latest iPhones & Samsung Galaxy with 6–12 month installment plans. No credit card needed.",
    cta: "Shop Smartphones",
    link: "/category/smartphones",
    accent: "#FF6B6B",
    accentLight: "#FFE0E0",
    bgFrom: "hsl(217,91%,20%)",
    bgTo: "hsl(230,60%,12%)",
    tag: "SMARTPHONES",
  },
  {
    image: carousel2,
    badge: "SAVE BIG",
    badgeIcon: "💻",
    titleLine1: "Power Up",
    titleLine2: "Your Work",
    description: "MacBooks, Gaming Laptops & more on easy installment plans for every budget.",
    cta: "Shop Laptops",
    link: "/category/laptops",
    accent: "#A78BFA",
    accentLight: "#EDE9FE",
    bgFrom: "hsl(263,70%,18%)",
    bgTo: "hsl(270,50%,10%)",
    tag: "LAPTOPS",
  },
  {
    image: carousel3,
    badge: "FLEXIBLE EMI",
    badgeIcon: "🏍️",
    titleLine1: "Ride Your",
    titleLine2: "Dream Bike",
    description: "Premium Scotty Motorcycles & Bikes with easy EMI available for all models.",
    cta: "Shop Motorcycles",
    link: "/category/bikes",
    accent: "#FB923C",
    accentLight: "#FFEDD5",
    bgFrom: "hsl(25,90%,18%)",
    bgTo: "hsl(20,70%,10%)",
    tag: "BIKES",
  },
  {
    image: carousel4,
    badge: "MEGA DEALS",
    badgeIcon: "🏠",
    titleLine1: "Home",
    titleLine2: "Essentials",
    description: "AC, LED TV, Fridge, Washing Machine & Oven — complete home solutions on installments.",
    cta: "Shop Appliances",
    link: "/category/appliances",
    accent: "#F87171",
    accentLight: "#FEE2E2",
    bgFrom: "hsl(0,72%,18%)",
    bgTo: "hsl(5,60%,10%)",
    tag: "APPLIANCES",
  },
  {
    image: carousel5,
    badge: "GO GREEN",
    badgeIcon: "☀️",
    titleLine1: "Go",
    titleLine2: "Solar",
    description: "Complete Solar Panel Systems — save on electricity bills with easy installments.",
    cta: "Shop Solar",
    link: "/category/solar",
    accent: "#FBBF24",
    accentLight: "#FEF3C7",
    bgFrom: "hsl(45,80%,15%)",
    bgTo: "hsl(40,70%,8%)",
    tag: "SOLAR",
  },
  {
    image: carousel6,
    badge: "SAVE 50%",
    badgeIcon: "🎁",
    titleLine1: "Complete",
    titleLine2: "Jahez Package",
    description: "Fridge + Furniture + Appliances + More — complete home bundle solutions.",
    cta: "Shop Bundles",
    link: "/category/jahez",
    accent: "#F472B6",
    accentLight: "#FCE7F3",
    bgFrom: "hsl(340,78%,18%)",
    bgTo: "hsl(330,60%,10%)",
    tag: "JAHEZ",
  },
  {
    image: carousel7,
    badge: "PREMIUM",
    badgeIcon: "🛋️",
    titleLine1: "Furnish Your",
    titleLine2: "Dream Home",
    description: "Luxury Furniture — complete bedroom, living room & dining sets on easy plans.",
    cta: "Shop Furniture",
    link: "/category/furniture",
    accent: "#34D399",
    accentLight: "#D1FAE5",
    bgFrom: "hsl(160,60%,12%)",
    bgTo: "hsl(165,50%,8%)",
    tag: "FURNITURE",
  },
  {
    image: carousel8,
    badge: "EASY EMI",
    badgeIcon: "🚗",
    titleLine1: "Drive Your",
    titleLine2: "Dream Car",
    description: "Toyota, Honda, Suzuki & More — flexible car financing options available now.",
    cta: "Shop Cars",
    link: "/category/cars",
    accent: "#38BDF8",
    accentLight: "#E0F2FE",
    bgFrom: "hsl(200,80%,15%)",
    bgTo: "hsl(210,70%,8%)",
    tag: "CARS",
  },
  {
    image: carousel9,
    badge: "BULK DISCOUNTS",
    badgeIcon: "📦",
    titleLine1: "Grow Your",
    titleLine2: "Business",
    description: "Business Raw Materials & Stock — B2B wholesale pricing with bulk discounts.",
    cta: "Shop B2B",
    link: "/category/raw-materials",
    accent: "#A3E635",
    accentLight: "#ECFCCB",
    bgFrom: "hsl(80,60%,12%)",
    bgTo: "hsl(90,50%,8%)",
    tag: "B2B",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const textVariants = {
    enter: { opacity: 0, x: direction * -40, y: 0 },
    center: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: direction * 40, y: 0 },
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 1.08, x: direction * 60 },
    center: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.95, x: direction * -60 },
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "clamp(420px, 56vw, 580px)",
        background: `linear-gradient(135deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
        transition: "background 0.8s ease",
      }}
    >
      {/* Animated background glow blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transition: "opacity 0.8s" }}
      >
        <div
          className="absolute rounded-full blur-[120px] opacity-20"
          style={{
            width: "45%",
            height: "70%",
            top: "-10%",
            left: "-5%",
            background: slide.accent,
            transition: "background 0.8s ease",
          }}
        />
        <div
          className="absolute rounded-full blur-[80px] opacity-10"
          style={{
            width: "30%",
            height: "50%",
            bottom: "-10%",
            left: "20%",
            background: slide.accent,
            transition: "background 0.8s ease",
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT: Content */}
        <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-8 lg:py-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-5"
            >
              {/* Tag + Badge */}
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] font-black tracking-[0.2em] px-3 py-1.5 rounded-full"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {slide.tag}
                </span>
                <span
                  className="text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                  style={{
                    background: slide.accent,
                    color: "#fff",
                    boxShadow: `0 4px 20px ${slide.accent}60`,
                  }}
                >
                  <span>{slide.badgeIcon}</span>
                  {slide.badge}
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="font-black leading-none text-white" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                  {slide.titleLine1}
                </h1>
                <h1
                  className="font-black leading-none"
                  style={{
                    fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
                    color: slide.accent,
                    textShadow: `0 0 40px ${slide.accent}80`,
                    transition: "color 0.6s ease, text-shadow 0.6s ease",
                  }}
                >
                  {slide.titleLine2}
                </h1>
              </div>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed max-w-sm"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {slide.description}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-4 pt-1">
                <Link to={slide.link}>
                  <button
                    className="group flex items-center gap-2 font-bold text-sm px-6 py-3.5 rounded-2xl transition-all duration-300 hover:gap-3"
                    style={{
                      background: slide.accent,
                      color: "#fff",
                      boxShadow: `0 8px 30px ${slide.accent}50`,
                    }}
                  >
                    {slide.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>

                {/* Installment pill */}
                <div
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <span className="text-lg">💳</span>
                  <div>
                    <p className="text-[10px] text-white/50 leading-none">Starting from</p>
                    <p className="text-xs font-bold text-white leading-tight">0% Installments</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT: Image */}
        <div className="hidden lg:flex items-center justify-center relative overflow-hidden">
          {/* Decorative ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "70%",
              aspectRatio: "1",
              border: `1px solid ${slide.accent}25`,
              transition: "border-color 0.6s ease",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: "55%",
              aspectRatio: "1",
              border: `1px solid ${slide.accent}15`,
              transition: "border-color 0.6s ease",
            }}
          />

          {/* Glow behind image */}
          <div
            className="absolute rounded-full blur-[60px] opacity-30"
            style={{
              width: "50%",
              aspectRatio: "1",
              background: slide.accent,
              transition: "background 0.6s ease",
            }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative z-10"
              style={{ width: "82%", maxWidth: 480 }}
            >
              <img
                src={slide.image}
                alt={slide.titleLine1}
                className="w-full h-full object-cover"
                style={{
                  borderRadius: "24px 24px 60px 24px",
                  boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px ${slide.accent}20`,
                  aspectRatio: "4/3",
                }}
                loading="eager"
              />

              {/* Floating price card */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.2)",
                }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: "#999" }}>Monthly from</p>
                <p className="text-lg font-black leading-tight" style={{ color: slide.accent }}>
                  PKR 10,000
                </p>
                <p className="text-[10px]" style={{ color: "#aaa" }}>12 easy installments</p>
              </motion.div>

              {/* Floating rating card */}
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="absolute -top-3 -right-4 px-3 py-2.5 rounded-2xl flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                }}
              >
                <span className="text-base">⭐</span>
                <div>
                  <p className="text-xs font-black leading-none" style={{ color: "#1a1a2e" }}>4.9 / 5.0</p>
                  <p className="text-[10px] leading-tight" style={{ color: "#aaa" }}>200+ reviews</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: image strip at bottom */}
      <div
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{ opacity: 0.15 }}
      >
        <img src={slide.image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          color: "#fff",
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2 items-center">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="rounded-full transition-all duration-400"
            style={{
              height: 6,
              width: i === current ? 28 : 6,
              background: i === current ? slide.accent : "rgba(255,255,255,0.3)",
              boxShadow: i === current ? `0 0 10px ${slide.accent}80` : "none",
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute bottom-5 right-6 z-30 text-xs font-bold tabular-nums"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
};

export default HeroSection;
