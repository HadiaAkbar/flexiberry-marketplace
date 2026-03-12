import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    titleLine2: "Pay Easy",
    description: "Latest iPhones & Samsung Galaxy with 6–12 month installment plans. ",
    cta: "Shop Smartphones",
    link: "/category/smartphones",
    accent: "#FF6B6B",
    bg: "#1a0a0a",
    tag: "SMARTPHONES",
  },
  {
    image: carousel2,
    badgeIcon: "💻",
    titleLine1: "Power Up",
    titleLine2: "Your Work",
    description: "MacBooks, Gaming Laptops & more on easy installment plans for every budget.",
    cta: "Shop Laptops",
    link: "/category/laptops",
    accent: "#A78BFA",
    bg: "#0f0a1e",
    tag: "LAPTOPS",
  },
  {
    image: carousel3,
    titleLine1: "Ride Your",
    titleLine2: "Dream Bike",
    description: "Premium Scotty Motorcycles & Bikes with easy EMI available for all models.",
    cta: "Shop Motorcycles",
    link: "/category/bikes",
    accent: "#FB923C",
    bg: "#1a0d04",
    tag: "BIKES",
  },
  {
    image: carousel4,
    titleLine1: "Home",
    titleLine2: "Essentials",
    description: "AC, LED TV, Fridge, Washing Machine & Oven — complete home solutions on installments.",
    cta: "Shop Appliances",
    link: "/category/appliances",
    accent: "#F87171",
    bg: "#1a0808",
    tag: "APPLIANCES",
  },
  {
    image: carousel5,
    titleLine1: "Go",
    titleLine2: "Solar",
    description: "Complete Solar Panel Systems — save on electricity bills with easy installments.",
    cta: "Shop Solar",
    link: "/category/solar",
    accent: "#FBBF24",
    bg: "#141004",
    tag: "SOLAR",
  },
  {
    image: carousel6,
    titleLine1: "Complete",
    titleLine2: "Jahez Package",
    description: "Fridge + Furniture + Appliances + More — complete home bundle solutions.",
    cta: "Shop Bundles",
    link: "/category/jahez",
    accent: "#F472B6",
    bg: "#1a0812",
    tag: "JAHEZ",
  },
  {
    image: carousel7,
    titleLine1: "Furnish Your",
    titleLine2: "Dream Home",
    description: "Luxury Furniture — complete bedroom, living room & dining sets on easy plans.",
    cta: "Shop Furniture",
    link: "/category/furniture",
    accent: "#34D399",
    bg: "#041410",
    tag: "FURNITURE",
  },
  {
    image: carousel8,
    titleLine1: "Drive Your",
    titleLine2: "Dream Car",
    description: "Toyota, Honda, Suzuki & More — flexible car financing options available now.",
    cta: "Shop Cars",
    link: "/category/cars",
    accent: "#38BDF8",
    bg: "#041018",
    tag: "CARS",
  },
  {
    image: carousel9,
    titleLine1: "Grow Your",
    titleLine2: "Business",
    description: "Business Raw Materials & Stock — B2B wholesale pricing with bulk discounts.",
    cta: "Shop B2B",
    link: "/category/raw-materials",
    accent: "#A3E635",
    bg: "#0a1204",
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

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: "clamp(400px, 52vw, 560px)",
        backgroundColor: slide.bg,
        transition: "background-color 0.9s ease",
      }}
    >
      {/* ── FULL BLEED IMAGE on right, fading into background colour ── */}
      <AnimatePresence>
        <motion.div
          key={current + "-bg"}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          {/* Image occupies right 60% of the banner */}
          <div className="absolute top-0 right-0 h-full" style={{ width: "62%" }}>
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
            />
          </div>

          {/* Left-to-right gradient: solid bg colour → transparent */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
                to right,
                ${slide.bg} 0%,
                ${slide.bg} 36%,
                ${slide.bg}f0 45%,
                ${slide.bg}bb 52%,
                ${slide.bg}66 60%,
                ${slide.bg}22 72%,
                transparent 85%
              )`,
            }}
          />

          {/* Top vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${slide.bg}88 0%, transparent 18%, transparent 78%, ${slide.bg}dd 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── ACCENT GLOW blob top-left ── */}
      <div
        className="absolute rounded-full blur-[160px] pointer-events-none"
        style={{
          zIndex: 2,
          width: "40%",
          aspectRatio: "1",
          top: "-25%",
          left: "-8%",
          background: slide.accent,
          opacity: 0.13,
          transition: "background 0.7s ease",
        }}
      />

      {/* ── SUBTLE GRID OVERLAY ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── LEFT TEXT CONTENT ── */}
      <div className="relative h-full flex items-center" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div style={{ maxWidth: 500 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: direction * -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * 30 }}
                transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="space-y-5"
              >
                {/* Badge row */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className="text-[10px] font-black tracking-[0.18em] px-3 py-1.5 rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      color: "rgba(255,255,255,0.45)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {slide.tag}
                  </span>
                  <span
                    className="text-[11px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{
                      background: slide.accent,
                      color: "#fff",
                      boxShadow: `0 4px 18px ${slide.accent}55`,
                      transition: "background 0.5s, box-shadow 0.5s",
                    }}
                  >
                    {slide.badgeIcon} {slide.badge}
                  </span>
                </div>

                {/* Headline */}
                <div>
                  <h1
                    className="font-black text-white"
                    style={{ fontSize: "clamp(2.2rem, 5.2vw, 4.8rem)", lineHeight: 1.04 }}
                  >
                    {slide.titleLine1}
                  </h1>
                  <h1
                    className="font-black"
                    style={{
                      fontSize: "clamp(2.2rem, 5.2vw, 4.8rem)",
                      lineHeight: 1.04,
                      color: slide.accent,
                      textShadow: `0 0 48px ${slide.accent}55`,
                      transition: "color 0.5s, text-shadow 0.5s",
                    }}
                  >
                    {slide.titleLine2}
                  </h1>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.58)",
                    fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                    lineHeight: 1.7,
                    maxWidth: 390,
                  }}
                >
                  {slide.description}
                </p>

                {/* CTA + pill */}
                <div className="flex items-center gap-3 pt-1 flex-wrap">
                  <Link to={slide.link}>
                    <button
                      className="group flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-2xl hover:scale-[1.03] transition-transform"
                      style={{
                        background: slide.accent,
                        color: "#fff",
                        boxShadow: `0 8px 28px ${slide.accent}45`,
                        transition: "background 0.4s, box-shadow 0.4s",
                      }}
                    >
                      {slide.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </Link>

                  <div
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <span className="text-lg">💳</span>
                    <div>
                      <p className="text-[10px] leading-none" style={{ color: "rgba(255,255,255,0.38)" }}>
                        Starting from
                      </p>
                      <p className="text-xs font-bold text-white leading-tight">0% Installments</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── PREV / NEXT ARROWS ── */}
      {[{ fn: prev, Icon: ChevronLeft, side: "left-4" }, { fn: next, Icon: ChevronRight, side: "right-4" }].map(
        ({ fn, Icon, side }) => (
          <button
            key={side}
            onClick={fn}
            className={`absolute ${side} top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-all hover:scale-110`}
            style={{
              zIndex: 20,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.13)",
              backdropFilter: "blur(10px)",
              color: "#fff",
            }}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      )}

      {/* ── DOTS ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 items-center" style={{ zIndex: 20 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className="rounded-full transition-all duration-300"
            style={{
              height: 5,
              width: i === current ? 26 : 5,
              background: i === current ? slide.accent : "rgba(255,255,255,0.22)",
              boxShadow: i === current ? `0 0 8px ${slide.accent}80` : "none",
            }}
          />
        ))}
      </div>

      {/* ── SLIDE COUNTER ── */}
      <div
        className="absolute bottom-5 right-6 text-xs font-bold tabular-nums"
        style={{ zIndex: 20, color: "rgba(255,255,255,0.28)" }}
      >
        {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
      </div>
    </section>
  );
};

export default HeroSection;
