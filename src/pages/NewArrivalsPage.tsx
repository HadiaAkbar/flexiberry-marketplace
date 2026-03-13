import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { featuredProducts, formatPrice, getMonthlyInstallment, categories } from "@/data/products";
import {
  Star, Heart, ShoppingCart, ChevronRight, Sparkles,
  Zap, TrendingUp, Clock, BadgeCheck, Filter, ArrowUpDown,
} from "lucide-react";

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const DAYS_AGO = [0, 1, 2, 1, 3, 0, 4, 2, 5, 1, 3, 6, 2, 1, 0, 3];

const EMOJIS: Record<string, string> = {
  phones: "📱", laptops: "💻", bikes: "🏍️", appliances: "🏠",
  solar: "☀️", furniture: "🛋️", jahez: "💍", cars: "🚗",
  "raw-materials": "🧱", general: "📦",
};

const SORT_OPTIONS = [
  { val: "newest",      label: "Newest First" },
  { val: "price-asc",   label: "Price ↑" },
  { val: "price-desc",  label: "Price ↓" },
  { val: "rating",      label: "Top Rated" },
];

/* ─────────────────────────────────────────────
   ANIMATED ORBS BACKGROUND
───────────────────────────────────────────── */
const OrbField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* large slow orbs */}
    {[
      { w: 700, h: 700, x: "-10%", y: "-20%", c: "rgba(37,99,235,0.13)", dur: 18 },
      { w: 600, h: 600, x: "60%",  y: "-10%", c: "rgba(124,58,237,0.10)", dur: 22 },
      { w: 400, h: 400, x: "20%",  y: "50%",  c: "rgba(6,182,212,0.08)",  dur: 14 },
    ].map((o, i) => (
      <motion.div key={i}
        style={{ position: "absolute", width: o.w, height: o.h, left: o.x, top: o.y, borderRadius: "50%", background: `radial-gradient(circle, ${o.c} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
      />
    ))}
    {/* floating micro-particles */}
    {Array.from({ length: 24 }, (_, i) => ({
      x: (i * 19 + 7) % 100, y: (i * 31 + 5) % 90,
      s: 2 + (i % 3),
      color: i % 3 === 0 ? "rgba(99,179,237,0.7)" : i % 3 === 1 ? "rgba(167,139,250,0.7)" : "rgba(52,211,153,0.6)",
      dur: 3 + (i % 4),
    })).map((p, i) => (
      <motion.div key={`p${i}`}
        style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, borderRadius: "50%", background: p.color, filter: "blur(0.5px)" }}
        animate={{ y: [0, -28, 0], opacity: [0.25, 0.9, 0.25], scale: [1, 1.5, 1] }}
        transition={{ duration: p.dur, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
      />
    ))}
    {/* grid lines */}
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60a5fa" strokeWidth="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  </div>
);

/* ─────────────────────────────────────────────
   3D PRODUCT CARD
───────────────────────────────────────────── */
const Card3D = ({ product, index, daysAgo }: { product: any; index: number; daysAgo: number }) => {
  const [wished, setWished] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 300, damping: 25 });
  const sy = useSpring(my, { stiffness: 300, damping: 25 });
  const rotX = useTransform(sy, [-80, 80], [14, -14]);
  const rotY = useTransform(sx, [-80, 80], [-14, 14]);
  const shine = useTransform(sx, [-80, 80], ["135deg", "225deg"]);

  const handleMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };
  const handleLeave = () => { mx.set(0); my.set(0); };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const dateLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.055, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1100 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            position: "relative",
            background: "linear-gradient(155deg, #111827 0%, #0f172a 40%, #0c1120 100%)",
            border: "1px solid rgba(99,179,237,0.14)",
            borderRadius: "22px", overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,179,237,0.38)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(99,179,237,0.12), 0 0 40px rgba(37,99,235,0.14)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(99,179,237,0.14)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.04) inset";
          }}
          >
            {/* Shine layer */}
            <motion.div style={{
              position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", borderRadius: "22px",
              background: useTransform(shine, (d) => `linear-gradient(${d}, rgba(255,255,255,0.06) 0%, transparent 55%)`),
              opacity: 0,
            }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            />

            {/* ── IMAGE ── */}
            <div style={{ position: "relative", height: "192px", overflow: "hidden", background: "linear-gradient(155deg, #0d1829 0%, #111d35 100%)" }}>
              {!imgFailed && product.image ? (
                <motion.img
                  src={product.image} alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.span style={{ fontSize: "64px" }} whileHover={{ scale: 1.2, rotate: 8 }} transition={{ type: "spring" }}>
                    {EMOJIS[product.categoryId] ?? "📦"}
                  </motion.span>
                </div>
              )}

              {/* gradient bottom fade */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, #0f172a, transparent)", pointerEvents: "none" }} />

              {/* badges */}
              <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{
                  background: "linear-gradient(135deg, #0ea5e9, #3b82f6)", color: "white",
                  fontSize: "9px", fontWeight: 800, padding: "3px 9px", borderRadius: "50px",
                  display: "inline-flex", alignItems: "center", gap: "3px",
                  boxShadow: "0 3px 10px rgba(14,165,233,0.45)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "0.04em",
                }}>
                  <Sparkles size={8} /> NEW
                </span>
                {discount > 0 && (
                  <span style={{
                    background: "linear-gradient(135deg, #f97316, #ef4444)", color: "white",
                    fontSize: "9px", fontWeight: 800, padding: "3px 9px", borderRadius: "50px",
                    boxShadow: "0 3px 10px rgba(239,68,68,0.45)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    -{discount}%
                  </span>
                )}
              </div>

              {/* wishlist */}
              <button onClick={e => { e.preventDefault(); setWished(!wished); }}
                style={{
                  position: "absolute", top: 10, right: 10,
                  height: 32, width: 32, borderRadius: "50%", cursor: "pointer",
                  background: wished ? "rgba(239,68,68,0.95)" : "rgba(10,16,30,0.75)",
                  backdropFilter: "blur(10px)",
                  border: `1.5px solid ${wished ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.12)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: wished ? "0 0 16px rgba(239,68,68,0.5)" : "none",
                  transition: "all 0.25s ease",
                }}>
                <Heart size={13} color="white" fill={wished ? "white" : "none"} strokeWidth={2} />
              </button>

              {/* date chip */}
              <div style={{
                position: "absolute", bottom: 10, left: 10,
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(10px)",
                borderRadius: "50px", padding: "2px 8px",
                display: "inline-flex", alignItems: "center", gap: 4,
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <Clock size={8} color="rgba(148,163,184,0.8)" />
                <span style={{ fontSize: "9px", color: "rgba(148,163,184,0.85)", fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{dateLabel}</span>
              </div>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: "13px 14px 14px" }}>
              {/* stars */}
              <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 6 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={9}
                    style={{ fill: s <= Math.floor(product.rating) ? "#fbbf24" : "transparent", color: s <= Math.floor(product.rating) ? "#fbbf24" : "#1e293b" }}
                    strokeWidth={1.5}
                  />
                ))}
                <span style={{ fontSize: "9px", color: "#475569", marginLeft: 3, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>({product.reviews})</span>
              </div>

              {/* title */}
              <h3 style={{
                fontSize: "12px", fontWeight: 700, color: "#cbd5e1", lineHeight: 1.45,
                marginBottom: 10,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>{product.name}</h3>

              {/* price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 8 }}>
                <span style={{
                  fontSize: "17px", fontWeight: 900,
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span style={{ fontSize: "10px", color: "#334155", textDecoration: "line-through", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* installment pill */}
              <div style={{
                background: "rgba(96,165,250,0.07)", border: "1px solid rgba(96,165,250,0.15)",
                borderRadius: "9px", padding: "5px 9px", marginBottom: 11,
              }}>
                <p style={{ fontSize: "10px", color: "#60a5fa", fontWeight: 700, margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  💳 {getMonthlyInstallment(product.price, 12)}/mo · 12 months
                </p>
              </div>

              {/* add to cart */}
              <motion.button
                onClick={handleCart}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "100%", height: 36, borderRadius: "11px", border: "none", cursor: "pointer",
                  background: addedToCart
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #2563eb, #7c3aed)",
                  color: "white", fontSize: "11px", fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  boxShadow: addedToCart ? "0 4px 14px rgba(16,185,129,0.4)" : "0 4px 14px rgba(37,99,235,0.38)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              >
                {addedToCart
                  ? <><BadgeCheck size={12}/> Added!</>
                  : <><ShoppingCart size={12}/> Add to Cart</>
                }
              </motion.button>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   HERO COUNTER STAT
───────────────────────────────────────────── */
const StatPill = ({ icon: Icon, val, label }: { icon: any; val: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
    style={{
      display: "flex", alignItems: "center", gap: 10,
      background: "rgba(15,23,42,0.6)", backdropFilter: "blur(16px)",
      border: "1px solid rgba(99,179,237,0.18)", borderRadius: 14,
      padding: "10px 18px",
    }}
  >
    <div style={{ height: 36, width: 36, borderRadius: 10, background: "rgba(37,99,235,0.18)", border: "1px solid rgba(99,179,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={16} color="#60a5fa" />
    </div>
    <div>
      <p style={{ margin: 0, fontSize: 18, fontWeight: 900, color: "white", lineHeight: 1, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{val}</p>
      <p style={{ margin: 0, fontSize: "9px", color: "rgba(148,163,184,0.7)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const NewArrivalsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showSort, setShowSort] = useState(false);

  const allProducts = featuredProducts.slice(0, 24);
  const filtered = activeFilter === "all" ? allProducts : allProducts.filter(p => p.categoryId === activeFilter);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating")     return b.rating - a.rating;
    return 0;
  });

  const CATS = [
    { id: "all", label: "✨ All" },
    ...categories.slice(0, 9).map(c => ({ id: c.id, label: c.name })),
  ];

  const sortLabel = SORT_OPTIONS.find(o => o.val === sortBy)?.label ?? "Sort";

  return (
    <div style={{ minHeight: "100vh", background: "#060d1a", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", background: "linear-gradient(180deg, #04091a 0%, #080f1e 55%, #060d1a 100%)", padding: "80px 0 64px" }}>
        <OrbField />

        {/* bottom rule */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: 1, background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.4), transparent)" }} />

        <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
          {/* breadcrumb */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-2 mb-7" style={{ fontSize: 13, color: "rgba(148,163,184,0.5)" }}>
            <Link to="/" style={{ color: "rgba(148,163,184,0.5)", textDecoration: "none" }} onMouseEnter={e => (e.currentTarget.style.color = "#60a5fa")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.5)")}>Home</Link>
            <ChevronRight size={12} color="rgba(148,163,184,0.3)" />
            <span style={{ color: "#60a5fa", fontWeight: 600 }}>New Arrivals</span>
          </motion.div>

          {/* eyebrow */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.08 }}
            className="flex justify-center mb-5">
            <span style={{
              background: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(124,58,237,0.18))",
              border: "1px solid rgba(99,179,237,0.25)", borderRadius: 50,
              padding: "6px 20px", fontSize: 11, fontWeight: 800, color: "#93c5fd",
              letterSpacing: "0.1em", textTransform: "uppercase",
              display: "inline-flex", alignItems: "center", gap: 7,
              boxShadow: "0 0 24px rgba(37,99,235,0.14)",
            }}>
              <Sparkles size={12} color="#60a5fa" />
              Just Dropped · Updated Daily
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.13, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ textAlign: "center", fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: "-0.035em", marginBottom: 18 }}
          >
            <span style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #ffffff 30%, #93c5fd 60%, #c4b5fd 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              New Arrivals
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
            style={{ textAlign: "center", fontSize: 15, color: "rgba(148,163,184,0.65)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.7 }}>
            The freshest products from Pakistan's top verified vendors — all available on easy monthly installments.
          </motion.p>

          {/* stat pills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-3 flex-wrap">
            <StatPill icon={Zap}        val={`${allProducts.length}+`} label="New Products" />
            <StatPill icon={TrendingUp} val="Daily"                    label="New Drops" />
            <StatPill icon={BadgeCheck} val="100%"                     label="Verified Sellers" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STICKY FILTER / SORT BAR
      ══════════════════════════════════════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(6,13,26,0.95)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(99,179,237,0.09)",
        padding: "10px 0",
      }}>
        <div className="container mx-auto px-4">
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>

            {/* category pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", flex: 1, scrollbarWidth: "none", paddingBottom: 2 }}>
              {CATS.map(cat => (
                <motion.button key={cat.id} onClick={() => setActiveFilter(cat.id)}
                  whileTap={{ scale: 0.93 }}
                  style={{
                    padding: "6px 14px", borderRadius: 50, cursor: "pointer", whiteSpace: "nowrap",
                    fontSize: 11, fontWeight: 700, transition: "all 0.2s ease",
                    background: activeFilter === cat.id ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "rgba(255,255,255,0.04)",
                    color: activeFilter === cat.id ? "white" : "rgba(148,163,184,0.7)",
                    border: activeFilter === cat.id ? "none" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: activeFilter === cat.id ? "0 4px 14px rgba(37,99,235,0.4)" : "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                  {cat.label}
                </motion.button>
              ))}
            </div>

            {/* sort dropdown */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowSort(!showSort)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 13px",
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10, color: "rgba(148,163,184,0.8)", fontSize: 11, fontWeight: 700,
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                <ArrowUpDown size={11} /> {sortLabel}
              </button>
              <AnimatePresence>
                {showSort && (
                  <motion.div initial={{ opacity: 0, y: -6, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    style={{
                      position: "absolute", right: 0, top: "calc(100% + 6px)", background: "#0f172a",
                      border: "1px solid rgba(99,179,237,0.15)", borderRadius: 12,
                      overflow: "hidden", minWidth: 160, zIndex: 50,
                      boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                    }}>
                    {SORT_OPTIONS.map(o => (
                      <button key={o.val} onClick={() => { setSortBy(o.val); setShowSort(false); }}
                        style={{
                          display: "block", width: "100%", textAlign: "left",
                          padding: "9px 14px", fontSize: 12, fontWeight: 600,
                          background: sortBy === o.val ? "rgba(37,99,235,0.15)" : "transparent",
                          color: sortBy === o.val ? "#60a5fa" : "rgba(148,163,184,0.75)",
                          border: "none", cursor: "pointer",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          borderBottom: "1px solid rgba(255,255,255,0.04)",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => { if (sortBy !== o.val) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={e => { if (sortBy !== o.val) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                      >{o.label}</button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* count badge */}
            <div style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.16)", borderRadius: 50, padding: "5px 13px" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#60a5fa", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sorted.length} items</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════ */}
      <div className="container mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter + sortBy}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 18 }}
          >
            {sorted.map((product, i) => (
              <Card3D key={product.id} product={product} index={i} daysAgo={DAYS_AGO[i % DAYS_AGO.length]} />
            ))}
          </motion.div>
        </AnimatePresence>

        {sorted.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>✨</p>
            <h3 style={{ color: "white", fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No products found</h3>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: 14 }}>Try a different category</p>
          </motion.div>
        )}

        {sorted.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: "center", marginTop: 48 }}>
            <motion.button whileHover={{ scale: 1.04, boxShadow: "0 0 32px rgba(99,179,237,0.18)" }} whileTap={{ scale: 0.97 }}
              style={{
                background: "transparent", border: "1px solid rgba(99,179,237,0.22)",
                borderRadius: 14, padding: "13px 48px", color: "#60a5fa",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "border-color 0.2s",
              }}>
              Load More Products
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ══════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════ */}
      <div style={{ margin: "0 16px 52px" }}>
        <div style={{
          position: "relative", overflow: "hidden", borderRadius: 28,
          background: "linear-gradient(135deg, #0c1a30 0%, #130d2e 50%, #0c1a30 100%)",
          border: "1px solid rgba(99,179,237,0.14)",
          padding: "52px 32px", textAlign: "center",
        }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(37,99,235,0.14) 0%, transparent 55%), radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.12) 0%, transparent 55%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 1, background: "linear-gradient(90deg, transparent, rgba(99,179,237,0.3), transparent)" }} />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ position: "relative", zIndex: 1 }}>
            <Sparkles size={30} color="#60a5fa" style={{ margin: "0 auto 16px", display: "block" }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 10, letterSpacing: "-0.025em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Never Miss a New Drop
            </h2>
            <p style={{ color: "rgba(148,163,184,0.55)", fontSize: 14, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.65 }}>
              Fresh products added daily from Pakistan's top verified vendors. All on easy installments.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <Link to="/products" style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "white",
                fontSize: 13, fontWeight: 800, padding: "13px 30px", borderRadius: 13,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7,
                boxShadow: "0 8px 24px rgba(37,99,235,0.4)", fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Browse All Products <ChevronRight size={14} />
              </Link>
              <Link to="/login" style={{
                background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.8)",
                fontSize: 13, fontWeight: 700, padding: "13px 30px", borderRadius: 13,
                textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)",
                display: "inline-flex", alignItems: "center", gap: 7, fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ background: "#060d1a" }}><Footer /></div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #060d1a; }
        ::-webkit-scrollbar-thumb { background: rgba(96,165,250,0.25); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(96,165,250,0.45); }
      `}</style>
    </div>
  );
};

export default NewArrivalsPage;
