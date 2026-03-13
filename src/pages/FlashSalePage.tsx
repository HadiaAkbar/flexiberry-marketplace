import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  Zap, Clock, ShoppingCart, Heart, Star, TrendingDown,
  ChevronRight, Filter, Tag, Flame, Timer, Package,
  BadgeCheck, ArrowRight, SlidersHorizontal,
} from "lucide-react";

// ── Countdown hook ────────────────────────────────────────────────────
function useCountdown(endTime: number) {
  const [timeLeft, setTimeLeft] = useState(endTime - Date.now());
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(endTime - Date.now()), 1000);
    return () => clearInterval(t);
  }, [endTime]);
  const total = Math.max(0, timeLeft);
  const h = String(Math.floor(total / 3_600_000)).padStart(2, "0");
  const m = String(Math.floor((total % 3_600_000) / 60_000)).padStart(2, "0");
  const s = String(Math.floor((total % 60_000) / 1_000)).padStart(2, "0");
  return { h, m, s, pct: Math.min(100, (total / endTime) * 100) };
}

// ── Flash sale products ───────────────────────────────────────────────
const FLASH_PRODUCTS = [
  {
    id: "f1", name: "Samsung Galaxy S24 Ultra 256GB",
    category: "phones", categoryLabel: "Smartphones",
    price: 289999, original: 369999, discount: 22,
    installment: 24166, rating: 4.9, reviews: 2341,
    stock: 7, totalStock: 30,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80",
    shop: "TechZone Official", shopId: "vendor-techzone-001", verified: true, hot: true,
  },
  {
    id: "f2", name: 'LG OLED C3 65" 4K Smart TV',
    category: "appliances", categoryLabel: "TVs",
    price: 449999, original: 589999, discount: 24,
    installment: 37499, rating: 4.8, reviews: 876,
    stock: 3, totalStock: 10,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&q=80",
    shop: "HomeElite Appliances", shopId: "vendor-homeelite-004", verified: true, hot: true,
  },
  {
    id: "f3", name: "MacBook Air M3 16GB 512GB",
    category: "laptops", categoryLabel: "Laptops",
    price: 359999, original: 429999, discount: 16,
    installment: 29999, rating: 4.7, reviews: 543,
    stock: 12, totalStock: 20,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    shop: "DigiWorld Electronics", shopId: "vendor-digiworld-002", verified: true, hot: false,
  },
  {
    id: "f4", name: "Sony WH-1000XM5 Headphones",
    category: "phones", categoryLabel: "Audio",
    price: 79999, original: 109999, discount: 27,
    installment: 6666, rating: 4.9, reviews: 3102,
    stock: 18, totalStock: 40,
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&q=80",
    shop: "TechZone Official", shopId: "vendor-techzone-001", verified: true, hot: false,
  },
  {
    id: "f5", name: "Dyson V15 Detect Absolute",
    category: "appliances", categoryLabel: "Appliances",
    price: 129999, original: 179999, discount: 28,
    installment: 10833, rating: 4.6, reviews: 712,
    stock: 5, totalStock: 15,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&q=80",
    shop: "HomeElite Appliances", shopId: "vendor-homeelite-004", verified: true, hot: true,
  },
  {
    id: "f6", name: 'iPad Pro M4 12.9" Wi-Fi 256GB',
    category: "phones", categoryLabel: "Tablets",
    price: 249999, original: 299999, discount: 17,
    installment: 20833, rating: 4.8, reviews: 621,
    stock: 9, totalStock: 25,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
    shop: "DigiWorld Electronics", shopId: "vendor-digiworld-002", verified: true, hot: false,
  },
  {
    id: "f7", name: "Honda CD 70 2025 Model",
    category: "bikes", categoryLabel: "Bikes",
    price: 179999, original: 209999, discount: 14,
    installment: 14999, rating: 4.5, reviews: 1890,
    stock: 4, totalStock: 8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    shop: "SpeedRiders Pk", shopId: "vendor-speedriders-003", verified: true, hot: true,
  },
  {
    id: "f8", name: "Dell XPS 15 Intel i9 RTX 4060",
    category: "laptops", categoryLabel: "Laptops",
    price: 469999, original: 569999, discount: 18,
    installment: 39166, rating: 4.7, reviews: 389,
    stock: 6, totalStock: 12,
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    shop: "DigiWorld Electronics", shopId: "vendor-digiworld-002", verified: true, hot: false,
  },
  {
    id: "f9", name: "Haier Inverter AC 1.5 Ton",
    category: "appliances", categoryLabel: "Appliances",
    price: 119999, original: 159999, discount: 25,
    installment: 9999, rating: 4.4, reviews: 2140,
    stock: 11, totalStock: 20,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    shop: "HomeElite Appliances", shopId: "vendor-homeelite-004", verified: false, hot: false,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Deals" },
  { id: "phones", label: "📱 Mobiles" },
  { id: "laptops", label: "💻 Laptops" },
  { id: "appliances", label: "🏠 Appliances" },
  { id: "bikes", label: "🏍️ Bikes" },
];

const SORTS = [
  { id: "discount", label: "Biggest Discount" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "ending", label: "Ending Soon" },
];

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

// ── Countdown box ─────────────────────────────────────────────────────
function CountBox({ val, label }: { val: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div style={{
        width: 56, height: 56, borderRadius: 12,
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk', monospace",
        fontSize: 26, fontWeight: 800, color: "white",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}>
        {val}
      </div>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 4, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

// ── Stock bar ─────────────────────────────────────────────────────────
function StockBar({ stock, total }: { stock: number; total: number }) {
  const pct = Math.round((stock / total) * 100);
  const color = pct <= 25 ? "#ef4444" : pct <= 50 ? "#f97316" : "#22c55e";
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>
          {pct <= 25 ? "🔥 Almost Gone!" : pct <= 50 ? "⚡ Selling Fast" : "✅ In Stock"}
        </span>
        <span style={{ fontSize: 10, color, fontWeight: 700 }}>{stock} left</span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: "#f3f4f6", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 99, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────
function FlashCard({ product, index }: { product: typeof FLASH_PRODUCTS[0]; index: number }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const { addToCart } = useCart();

  const handleCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.original,
      image: product.image,
      shopId: product.shopId,
      shopName: product.shop,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <div style={{
          background: "linear-gradient(135deg, #ef4444, #f97316)",
          color: "white", fontSize: 11, fontWeight: 800,
          padding: "3px 10px", borderRadius: 99,
          display: "flex", alignItems: "center", gap: 4,
          boxShadow: "0 3px 10px rgba(239,68,68,0.45)",
        }}>
          <TrendingDown size={10} /> -{product.discount}% OFF
        </div>
        {product.hot && (
          <div style={{
            background: "linear-gradient(135deg, #7c3aed, #2563eb)",
            color: "white", fontSize: 10, fontWeight: 700,
            padding: "2px 8px", borderRadius: 99,
            display: "flex", alignItems: "center", gap: 3,
          }}>
            <Flame size={9} /> HOT DEAL
          </div>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => setWishlisted(!wishlisted)}
        className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-52 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          {!imgFailed ? (
            <img
              src={product.image} alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">📦</div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Shop */}
        <div className="flex items-center gap-1 mb-1.5">
          <span style={{ fontSize: 11, color: "#2563eb", fontWeight: 600 }}>{product.shop}</span>
          {product.verified && <BadgeCheck size={11} className="text-emerald-500" />}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 mb-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className={`h-3 w-3 ${j < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`} />
            ))}
          </div>
          <span style={{ fontSize: 11, color: "#9ca3af" }}>({product.reviews.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mb-2">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span style={{ fontSize: 20, fontWeight: 800, color: "#ef4444", fontFamily: "'Space Grotesk', sans-serif" }}>
              {formatPKR(product.price)}
            </span>
            <span style={{ fontSize: 12, color: "#d1d5db", textDecoration: "line-through", fontWeight: 500 }}>
              {formatPKR(product.original)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Tag size={11} className="text-green-600" />
            <span style={{ fontSize: 11, color: "#16a34a", fontWeight: 600 }}>
              {formatPKR(product.installment)}/mo · 12-month plan
            </span>
          </div>
        </div>

        {/* Stock bar */}
        <div className="mb-3">
          <StockBar stock={product.stock} total={product.totalStock} />
        </div>

        {/* CTA */}
        <button
          onClick={handleCart}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95"
          style={{
            background: added
              ? "linear-gradient(135deg, #16a34a, #15803d)"
              : "linear-gradient(135deg, #ef4444, #f97316)",
            boxShadow: added
              ? "0 4px 14px rgba(22,163,74,0.4)"
              : "0 4px 14px rgba(239,68,68,0.4)",
          }}
        >
          <ShoppingCart size={15} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────
const FlashSalePage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState("discount");

  // End time: 6 hours from now
  const [endTime] = useState(() => Date.now() + 6 * 3_600_000);
  const { h, m, s } = useCountdown(endTime);

  const filtered = FLASH_PRODUCTS
    .filter(p => activeCategory === "all" || p.category === activeCategory)
    .sort((a, b) => {
      if (activeSort === "discount") return b.discount - a.discount;
      if (activeSort === "price-asc") return a.price - b.price;
      if (activeSort === "price-desc") return b.price - a.price;
      if (activeSort === "ending") return a.stock - b.stock;
      return 0;
    });

  const totalSaved = FLASH_PRODUCTS.reduce((acc, p) => acc + (p.original - p.price), 0);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(135deg, #1a0533 0%, #7c0b0b 40%, #c2410c 70%, #1a0533 100%)",
        minHeight: 320,
      }}>
        {/* Animated grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #f97316 0%, transparent 70%)", transform: "translate(-50%, -50%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #ef4444 0%, transparent 70%)", transform: "translate(50%, 50%)" }} />

        <div className="container mx-auto max-w-6xl px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left: Title */}
            <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/50 text-xs mb-4">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight size={12} />
                <span className="text-white/80 font-medium">Flash Sale</span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div style={{
                  height: 48, width: 48, borderRadius: 14,
                  background: "linear-gradient(135deg, #ef4444, #f97316)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(239,68,68,0.5)",
                }}>
                  <Zap size={24} color="white" fill="white" />
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    Limited Time Only
                  </p>
                  <h1 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 900, color: "white", lineHeight: 1,
                    letterSpacing: "-0.03em",
                  }}>
                    ⚡ Flash Sale
                  </h1>
                </div>
              </div>

              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 400, lineHeight: 1.6 }}>
                Massive discounts up to <strong style={{ color: "#fbbf24" }}>30% OFF</strong> on top brands. Buy on easy installments — limited stock!
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-5 flex-wrap">
                {[
                  { val: `${FLASH_PRODUCTS.length}`, label: "Hot Deals" },
                  { val: `PKR ${(totalSaved / 1000).toFixed(0)}K+`, label: "Total Savings" },
                  { val: "Up to 30%", label: "Max Discount" },
                ].map(({ val, label }) => (
                  <div key={label} style={{
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: 12, padding: "8px 16px", textAlign: "center",
                  }}>
                    <p style={{ color: "white", fontWeight: 800, fontSize: 16, fontFamily: "'Space Grotesk', sans-serif" }}>{val}</p>
                    <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Countdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 24, padding: "28px 32px", textAlign: "center",
                boxShadow: "0 24px 48px rgba(0,0,0,0.3)",
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Timer size={16} className="text-orange-400" />
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Sale Ends In
                </p>
              </div>
              <div className="flex items-end gap-3">
                <CountBox val={h} label="Hours" />
                <span style={{ color: "#f97316", fontSize: 28, fontWeight: 900, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>:</span>
                <CountBox val={m} label="Mins" />
                <span style={{ color: "#f97316", fontSize: 28, fontWeight: 900, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>:</span>
                <CountBox val={s} label="Secs" />
              </div>
              <div style={{
                marginTop: 16, background: "rgba(239,68,68,0.2)", borderRadius: 10,
                padding: "8px 16px",
              }}>
                <p style={{ color: "#fca5a5", fontSize: 11, fontWeight: 600 }}>
                  🔥 {filtered.length} deals active right now
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── FILTERS BAR ── */}
      <div className="bg-white border-b border-gray-100 sticky top-[73px] z-40"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 py-3 overflow-x-auto scrollbar-hide">

            {/* Category pills */}
            <div className="flex items-center gap-2 shrink-0">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: "7px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700,
                    cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s ease",
                    border: "1.5px solid",
                    borderColor: activeCategory === cat.id ? "transparent" : "rgba(0,0,0,0.1)",
                    background: activeCategory === cat.id
                      ? "linear-gradient(135deg, #ef4444, #f97316)"
                      : "transparent",
                    color: activeCategory === cat.id ? "white" : "#6b7280",
                    boxShadow: activeCategory === cat.id ? "0 4px 12px rgba(239,68,68,0.35)" : "none",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-200 shrink-0 hidden md:block" />

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                style={{
                  fontSize: 12, fontWeight: 600, color: "#374151",
                  border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 10,
                  padding: "6px 12px", outline: "none", cursor: "pointer",
                  background: "white", fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>

            {/* Count */}
            <div style={{
              padding: "6px 12px", borderRadius: 10, fontSize: 12, fontWeight: 700,
              background: "rgba(239,68,68,0.08)", color: "#ef4444",
            }}>
              {filtered.length} deals
            </div>
          </div>
        </div>
      </div>

      {/* ── PRODUCTS GRID ── */}
      <div className="container mx-auto max-w-6xl px-4 py-10">

        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div style={{
              height: 36, width: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(239,68,68,0.4)",
            }}>
              <Flame size={18} color="white" />
            </div>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: 20, color: "#111827" }}>
                {activeCategory === "all" ? "All Flash Deals" : CATEGORIES.find(c => c.id === activeCategory)?.label}
              </h2>
              <p style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
                Showing {filtered.length} of {FLASH_PRODUCTS.length} deals
              </p>
            </div>
          </div>
          <Link to="/products"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              fontSize: 13, fontWeight: 700, color: "#ef4444",
              textDecoration: "none",
            }}>
            Browse All Products <ArrowRight size={14} />
          </Link>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <FlashCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center py-24 text-center"
          >
            <div style={{ fontSize: 64, marginBottom: 16 }}>⚡</div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: "#111827" }}>
              No deals in this category
            </h3>
            <p style={{ color: "#6b7280", marginTop: 8 }}>Try a different category or check back soon!</p>
            <button
              onClick={() => setActiveCategory("all")}
              style={{
                marginTop: 20, padding: "10px 24px", borderRadius: 12,
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                color: "white", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
              }}
            >
              View All Deals
            </button>
          </motion.div>
        )}

        {/* Bottom CTA banner */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 rounded-3xl overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #1a0533 0%, #7c0b0b 60%, #c2410c 100%)" }}
          >
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }} />
            <div className="relative z-10 p-8 flex items-center justify-between flex-wrap gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={16} className="text-orange-400" />
                  <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Don't Miss Out
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 900, color: "white" }}>
                  Sale ends in {h}:{m}:{s}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>
                  All items on easy 6–12 month installment plans. Apply now!
                </p>
              </div>
              <Link to="/products"
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "14px 28px", borderRadius: 14,
                  background: "linear-gradient(135deg, #f97316, #ef4444)",
                  color: "white", fontWeight: 800, fontSize: 14,
                  textDecoration: "none",
                  boxShadow: "0 8px 24px rgba(239,68,68,0.5)",
                  transition: "all 0.2s ease",
                }}>
                Shop All Products <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FlashSalePage;
