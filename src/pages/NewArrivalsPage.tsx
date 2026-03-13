import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  motion, useMotionValue, useTransform,
  useSpring, AnimatePresence, animate,
} from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  featuredProducts, formatPrice,
  getMonthlyInstallment, categories,
} from "@/data/products";
import {
  Star, Heart, ShoppingCart, ChevronRight,
  Sparkles, Zap, TrendingUp, BadgeCheck,
  Clock, ArrowUpDown, Check,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const DAYS_AGO = [0, 1, 2, 1, 3, 0, 4, 2, 5, 1, 3, 6, 0, 2, 1, 4];

const EMOJIS: Record<string, string> = {
  phones: "📱", laptops: "💻", bikes: "🏍️",
  appliances: "🏠", solar: "☀️", furniture: "🛋️",
  jahez: "💍", cars: "🚗", "raw-materials": "🧱", general: "📦",
};

const CAT_COLORS: Record<string, string> = {
  phones: "#06b6d4", laptops: "#8b5cf6", bikes: "#f97316",
  appliances: "#10b981", solar: "#f59e0b", furniture: "#ec4899",
  jahez: "#e11d48", cars: "#3b82f6", "raw-materials": "#84cc16", general: "#6366f1",
};

const SORT_OPTIONS = [
  { val: "newest",     label: "Newest First" },
  { val: "price-asc",  label: "Price: Low → High" },
  { val: "price-desc", label: "Price: High → Low" },
  { val: "rating",     label: "Top Rated" },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATED NUMBER (count-up on mount)
═══════════════════════════════════════════════════════════ */
const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    const ctrl = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = Math.round(v) + suffix; },
    });
    return () => ctrl.stop();
  }, [to, suffix]);
  return <span ref={nodeRef}>0{suffix}</span>;
};

/* ═══════════════════════════════════════════════════════════
   BACKGROUND — deep-space mesh + grid
═══════════════════════════════════════════════════════════ */
const DeepSpaceBG = () => (
  <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
    {/* Noise texture overlay */}
    <div style={{
      position: "absolute", inset: 0, opacity: 0.035,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      backgroundRepeat: "repeat", backgroundSize: "128px",
    }} />
    {/* Radial glow — top left */}
    <div style={{
      position: "absolute", width: 900, height: 900,
      top: -300, left: -200, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 65%)",
    }} />
    {/* Radial glow — top right */}
    <div style={{
      position: "absolute", width: 700, height: 700,
      top: -200, right: -150, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 65%)",
    }} />
    {/* Radial glow — centre */}
    <div style={{
      position: "absolute", width: 600, height: 600,
      top: "30%", left: "50%", transform: "translate(-50%,-50%)",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(99,179,237,0.04) 0%, transparent 70%)",
    }} />
    {/* Fine grid */}
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.055 }}>
      <defs>
        <pattern id="na-grid" width="56" height="56" patternUnits="userSpaceOnUse">
          <path d="M56 0L0 0 0 56" fill="none" stroke="#60a5fa" strokeWidth="0.7"/>
        </pattern>
        <pattern id="na-dot" width="56" height="56" patternUnits="userSpaceOnUse">
          <circle cx="28" cy="28" r="1" fill="#818cf8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#na-grid)"/>
      <rect width="100%" height="100%" fill="url(#na-dot)"/>
    </svg>
    {/* Floating micro-orbs */}
    {Array.from({ length: 22 }).map((_, i) => (
      <motion.div key={i}
        style={{
          position: "absolute",
          left: `${(i * 17 + 3) % 100}%`,
          top: `${(i * 29 + 7) % 100}%`,
          width: 2 + (i % 3),
          height: 2 + (i % 3),
          borderRadius: "50%",
          background: i % 3 === 0 ? "rgba(6,182,212,0.8)"
            : i % 3 === 1 ? "rgba(167,139,250,0.7)" : "rgba(52,211,153,0.6)",
          filter: "blur(0.4px)",
        }}
        animate={{ y: [0, -(18 + i % 14), 0], opacity: [0.2, 0.85, 0.2] }}
        transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.22, ease: "easeInOut" }}
      />
    ))}
    {/* Horizontal scan line */}
    <motion.div style={{
      position: "absolute", left: 0, right: 0, height: 1,
      background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.35) 40%, rgba(139,92,246,0.35) 60%, transparent 100%)",
    }}
    animate={{ top: ["0%", "100%"] }}
    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

/* ═══════════════════════════════════════════════════════════
   HOLOGRAPHIC 3D PRODUCT CARD
═══════════════════════════════════════════════════════════ */
const HoloCard = ({
  product, index, daysAgo,
}: { product: any; index: number; daysAgo: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [wished, setWished]       = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const [carted, setCarted]       = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  /* Spring-physics tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-80, 80], [16, -16]), { stiffness: 260, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-80, 80], [-16, 16]), { stiffness: 260, damping: 22 });

  /* Specular highlight follows cursor */
  const shineX = useSpring(useTransform(mx, [-80, 80], ["-30%",  "130%"]), { stiffness: 200, damping: 20 });
  const shineY = useSpring(useTransform(my, [-80, 80], ["-30%",  "130%"]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top  - r.height / 2);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setCarted(true);
    setTimeout(() => setCarted(false), 2200);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const accentColor = CAT_COLORS[product.categoryId] ?? "#60a5fa";
  const dateLabel   = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.86, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      transition={{ delay: index * 0.06, duration: 0.62, ease: [0.21, 1.02, 0.38, 1] }}
      style={{ perspective: 1100, zIndex: isHovered ? 10 : 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={ref}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.045, z: 30 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
          <div style={{
            position: "relative",
            borderRadius: 22,
            overflow: "hidden",
            background: `linear-gradient(155deg,
              rgba(15,23,42,0.98) 0%,
              rgba(13,19,36,0.99) 50%,
              rgba(10,14,28,1) 100%)`,
            border: isHovered
              ? `1px solid ${accentColor}55`
              : "1px solid rgba(148,163,184,0.10)",
            boxShadow: isHovered
              ? `0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px ${accentColor}22, 0 0 50px ${accentColor}18`
              : "0 6px 28px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.04) inset",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}>

            {/* ── HOLOGRAPHIC SHINE ── */}
            <motion.div style={{
              position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
              borderRadius: 22, overflow: "hidden",
              opacity: isHovered ? 1 : 0, transition: "opacity 0.3s",
            }}>
              <motion.div style={{
                position: "absolute",
                width: "160%", height: "160%",
                left: shineX, top: shineY,
                transform: "translate(-50%,-50%)",
                background: `radial-gradient(ellipse 50% 50% at center,
                  ${accentColor}22 0%,
                  rgba(255,255,255,0.04) 40%,
                  transparent 70%)`,
                pointerEvents: "none",
              }} />
              {/* Iridescent stripe */}
              <motion.div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg,
                  transparent 20%,
                  rgba(6,182,212,0.06) 35%,
                  rgba(167,139,250,0.08) 50%,
                  rgba(52,211,153,0.06) 65%,
                  transparent 80%)`,
                opacity: isHovered ? 0.8 : 0,
                transition: "opacity 0.4s",
              }} />
            </motion.div>

            {/* ── IMAGE AREA ── */}
            <div style={{
              position: "relative", height: 196,
              background: `linear-gradient(155deg, #0a1320, #0f1e35)`,
              overflow: "hidden",
            }}>
              {!imgFailed && product.image ? (
                <motion.img
                  src={product.image} alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  whileHover={{ scale: 1.14 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `radial-gradient(circle at 50% 60%, ${accentColor}18 0%, transparent 70%)`,
                }}>
                  <motion.span
                    style={{ fontSize: 64, filter: `drop-shadow(0 0 20px ${accentColor}66)` }}
                    whileHover={{ scale: 1.25, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {EMOJIS[product.categoryId] ?? "📦"}
                  </motion.span>
                </div>
              )}

              {/* Bottom vignette */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                background: "linear-gradient(to top, rgba(10,14,28,1) 0%, transparent 100%)",
                pointerEvents: "none",
              }} />

              {/* Accent line top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${accentColor}bb, transparent)`,
                opacity: isHovered ? 1 : 0, transition: "opacity 0.3s",
              }} />

              {/* ── BADGES ── */}
              <div style={{ position: "absolute", top: 10, left: 10, display: "flex", flexDirection: "column", gap: 5, zIndex: 3 }}>
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.06 + 0.2 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    background: `linear-gradient(135deg, ${accentColor}dd, ${accentColor}99)`,
                    color: "white", fontSize: 9, fontWeight: 800,
                    padding: "3px 9px", borderRadius: 50,
                    boxShadow: `0 3px 12px ${accentColor}55`,
                    fontFamily: "'Outfit', sans-serif", letterSpacing: "0.06em",
                  }}>
                  <Sparkles size={8} /> NEW
                </motion.span>
                {discount > 0 && (
                  <span style={{
                    background: "linear-gradient(135deg, #f97316cc, #ef4444cc)",
                    color: "white", fontSize: 9, fontWeight: 800,
                    padding: "3px 9px", borderRadius: 50,
                    boxShadow: "0 3px 10px rgba(239,68,68,0.45)",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    -{discount}%
                  </span>
                )}
              </div>

              {/* ── WISHLIST ── */}
              <motion.button
                onClick={e => { e.preventDefault(); setWished(!wished); }}
                whileTap={{ scale: 0.82 }}
                whileHover={{ scale: 1.15 }}
                style={{
                  position: "absolute", top: 10, right: 10, zIndex: 3,
                  height: 34, width: 34, borderRadius: "50%",
                  background: wished ? "rgba(239,68,68,0.92)" : "rgba(10,16,30,0.78)",
                  backdropFilter: "blur(12px)",
                  border: `1.5px solid ${wished ? "rgba(239,68,68,0.6)" : "rgba(255,255,255,0.13)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: wished ? "0 0 20px rgba(239,68,68,0.55), 0 4px 12px rgba(0,0,0,0.3)" : "none",
                }}>
                <Heart size={14} color="white" fill={wished ? "white" : "none"} strokeWidth={2} />
              </motion.button>

              {/* ── DATE CHIP ── */}
              <div style={{
                position: "absolute", bottom: 10, left: 10, zIndex: 3,
                background: "rgba(0,0,0,0.72)", backdropFilter: "blur(12px)",
                borderRadius: 50, padding: "2px 9px",
                display: "inline-flex", alignItems: "center", gap: 4,
                border: "1px solid rgba(255,255,255,0.09)",
              }}>
                <Clock size={8} color={accentColor} />
                <span style={{ fontSize: 9, color: "rgba(148,163,184,0.9)", fontWeight: 600, fontFamily: "'Outfit', sans-serif" }}>
                  {dateLabel}
                </span>
              </div>
            </div>

            {/* ── CARD BODY ── */}
            <div style={{ padding: "13px 14px 15px" }}>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 7 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={9} style={{
                    fill: s <= Math.floor(product.rating) ? "#fbbf24" : "transparent",
                    color: s <= Math.floor(product.rating) ? "#fbbf24" : "#1e293b",
                  }} strokeWidth={1.5} />
                ))}
                <span style={{ fontSize: 9, color: "#475569", marginLeft: 3, fontFamily: "'Outfit', sans-serif" }}>
                  ({product.reviews?.toLocaleString()})
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: 12, fontWeight: 600, color: "#cbd5e1", lineHeight: 1.45,
                marginBottom: 10,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden", fontFamily: "'Outfit', sans-serif",
              }}>{product.name}</h3>

              {/* Price */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginBottom: 8 }}>
                <span style={{
                  fontSize: 18, fontWeight: 800,
                  background: `linear-gradient(135deg, ${accentColor} 0%, #a78bfa 100%)`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em",
                }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: 10, color: "#334155", textDecoration: "line-through", fontFamily: "'Outfit', sans-serif" }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Installment pill */}
              <div style={{
                background: `${accentColor}0d`,
                border: `1px solid ${accentColor}28`,
                borderRadius: 9, padding: "5px 10px", marginBottom: 11,
              }}>
                <p style={{ fontSize: 10, color: accentColor, fontWeight: 700, margin: 0, fontFamily: "'Outfit', sans-serif" }}>
                  💳 {getMonthlyInstallment(product.price, 12)}/mo · 12 months
                </p>
              </div>

              {/* CTA */}
              <motion.button
                onClick={handleCart}
                whileTap={{ scale: 0.94 }}
                style={{
                  width: "100%", height: 37, borderRadius: 11, border: "none",
                  cursor: "pointer",
                  background: carted
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : `linear-gradient(135deg, ${accentColor}cc 0%, #7c3aed 100%)`,
                  color: "white", fontSize: 11, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  boxShadow: carted
                    ? "0 4px 16px rgba(16,185,129,0.45)"
                    : `0 4px 16px ${accentColor}44`,
                  fontFamily: "'Outfit', sans-serif",
                  letterSpacing: "0.02em",
                  transition: "background 0.35s, box-shadow 0.35s",
                }}
              >
                <AnimatePresence mode="wait">
                  {carted ? (
                    <motion.span key="done"
                      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <Check size={12} /> Added to Cart!
                    </motion.span>
                  ) : (
                    <motion.span key="add"
                      initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
                      style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <ShoppingCart size={12} /> Add to Cart
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Bottom accent bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent 0%, ${accentColor}88 50%, transparent 100%)`,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.35s",
            }} />
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════ */
const StatCard = ({
  icon: Icon, val, suffix, label, delay, color,
}: { icon: any; val: number; suffix?: string; label: string; delay: number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ delay, duration: 0.55, ease: [0.21, 1.02, 0.38, 1] }}
    style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "rgba(15,23,42,0.7)", backdropFilter: "blur(16px)",
      border: `1px solid ${color}25`,
      borderRadius: 16, padding: "12px 20px",
      boxShadow: `0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px ${color}10`,
    }}
  >
    <div style={{
      height: 40, width: 40, borderRadius: 12, flexShrink: 0,
      background: `${color}18`, border: `1px solid ${color}30`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: `0 4px 14px ${color}22`,
    }}>
      <Icon size={18} color={color} />
    </div>
    <div>
      <p style={{
        margin: 0, fontSize: 22, fontWeight: 800, color: "white",
        lineHeight: 1, fontFamily: "'Outfit', sans-serif",
        textShadow: `0 0 20px ${color}66`,
      }}>
        <CountUp to={val} suffix={suffix ?? ""} />
      </p>
      <p style={{
        margin: 0, fontSize: 10, color: "rgba(148,163,184,0.65)",
        textTransform: "uppercase", letterSpacing: "0.09em",
        fontFamily: "'Outfit', sans-serif",
      }}>{label}</p>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════ */
const NewArrivalsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy]             = useState("newest");
  const [sortOpen, setSortOpen]         = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [noMore, setNoMore]             = useState(false);
  const noMoreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  /* Close sort dropdown on outside click */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const allProducts = featuredProducts.slice(0, 24);

  const filtered = activeFilter === "all"
    ? allProducts
    : allProducts.filter(p => p.categoryId === activeFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc")  return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating")     return b.rating - a.rating;
    return 0;
  });

  const visibleProducts = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  const handleLoadMore = () => {
    if (hasMore) {
      setVisibleCount(prev => Math.min(prev + 12, sorted.length));
      setNoMore(false);
    } else {
      setNoMore(true);
      if (noMoreTimer.current) clearTimeout(noMoreTimer.current);
      noMoreTimer.current = setTimeout(() => setNoMore(false), 3000);
    }
  };

  const handleFilterChange = (id: string) => {
    setActiveFilter(id);
    setVisibleCount(12);
    setNoMore(false);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
    setSortOpen(false);
    setVisibleCount(12);
    setNoMore(false);
  };

  const CATS = [
    { id: "all", label: "✦ All" },
    ...categories.slice(0, 9).map(c => ({ id: c.id, label: c.name })),
  ];

  const sortLabel = SORT_OPTIONS.find(o => o.val === sortBy)?.label ?? "Sort";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#04080f",
      fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif",
    }}>
      <Header />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section style={{
        position: "relative", overflow: "hidden",
        background: "linear-gradient(180deg, #030710 0%, #060c18 55%, #04080f 100%)",
        padding: "88px 0 72px",
      }}>
        <DeepSpaceBG />

        {/* Depth rings */}
        {[360, 520, 700].map((r, i) => (
          <motion.div key={i} style={{
            position: "absolute",
            left: "50%", top: "50%",
            width: r, height: r,
            transform: "translate(-50%,-50%)",
            borderRadius: "50%",
            border: `1px solid rgba(6,182,212,${0.07 - i * 0.02})`,
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
          />
        ))}

        {/* Bottom edge rule */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)", width: "75%", height: 1,
          background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.45), rgba(139,92,246,0.45), transparent)",
        }} />

        <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>

          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-8"
            style={{ fontSize: 13, color: "rgba(148,163,184,0.45)" }}
          >
            <Link to="/" style={{ color: "rgba(148,163,184,0.45)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#06b6d4")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(148,163,184,0.45)")}>
              Home
            </Link>
            <ChevronRight size={12} color="rgba(148,163,184,0.25)" />
            <span style={{ color: "#06b6d4", fontWeight: 600 }}>New Arrivals</span>
          </motion.div>

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.08, ease: [0.21, 1.02, 0.38, 1] }}
            style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}
          >
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, rgba(6,182,212,0.14), rgba(139,92,246,0.14))",
              border: "1px solid rgba(6,182,212,0.28)",
              borderRadius: 50, padding: "7px 22px",
              fontSize: 11, fontWeight: 700, color: "#67e8f9",
              letterSpacing: "0.12em", textTransform: "uppercase",
              boxShadow: "0 0 30px rgba(6,182,212,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}>
              <Sparkles size={12} color="#06b6d4" />
              Just Dropped · Updated Daily
              <Sparkles size={12} color="#06b6d4" />
            </span>
          </motion.div>

          {/* Giant headline */}
          <motion.h1
            initial={{ opacity: 0, y: 44, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.14, duration: 0.72, ease: [0.21, 1.02, 0.38, 1] }}
            style={{
              fontSize: "clamp(52px, 9vw, 96px)",
              fontWeight: 900, lineHeight: 0.98,
              letterSpacing: "-0.04em", marginBottom: 22,
            }}
          >
            <span style={{
              background: "linear-gradient(135deg, #e2e8f0 0%, #ffffff 25%, #67e8f9 55%, #c4b5fd 80%, #f0abfc 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              display: "block",
              textShadow: "none",
            }}>
              New Arrivals
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            style={{
              fontSize: 16, color: "rgba(148,163,184,0.6)",
              maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.75,
            }}
          >
            The freshest drops from Pakistan's top verified vendors —
            every item available on easy monthly installments.
          </motion.p>

          {/* Stat pills */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <StatCard icon={Zap}        val={allProducts.length} suffix="+"  label="New Products"    delay={0.32} color="#06b6d4" />
            <StatCard icon={TrendingUp} val={500}                suffix="+"  label="Verified Sellers" delay={0.40} color="#8b5cf6" />
            <StatCard icon={BadgeCheck} val={100}                suffix="%"  label="Authentic Goods"  delay={0.48} color="#10b981" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STICKY FILTER + SORT BAR
      ══════════════════════════════════════════ */}
      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(4,8,15,0.96)",
        backdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid rgba(6,182,212,0.10)",
        padding: "10px 0",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}>
        <div className="container mx-auto px-4">
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none" }}>

            {/* Category pills */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, overflowX: "auto", scrollbarWidth: "none" }}>
              {CATS.map(cat => {
                const active = activeFilter === cat.id;
                const c = CAT_COLORS[cat.id] ?? "#06b6d4";
                return (
                  <motion.button key={cat.id}
                    onClick={() => handleFilterChange(cat.id)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      flexShrink: 0,
                      padding: "6px 15px", borderRadius: 50, cursor: "pointer",
                      fontSize: 11, fontWeight: 700, whiteSpace: "nowrap",
                      fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em",
                      background: active ? `${c}22` : "rgba(255,255,255,0.04)",
                      color: active ? c : "rgba(148,163,184,0.65)",
                      border: active ? `1px solid ${c}50` : "1px solid rgba(255,255,255,0.07)",
                      boxShadow: active ? `0 4px 16px ${c}30, 0 0 0 1px ${c}20` : "none",
                      transition: "all 0.22s ease",
                    }}
                  >
                    {cat.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Sort dropdown */}
            <div ref={sortRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "7px 13px", borderRadius: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(148,163,184,0.75)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif",
                  whiteSpace: "nowrap",
                }}>
                <ArrowUpDown size={11} /> {sortLabel}
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      position: "absolute", right: 0, top: "calc(100% + 8px)",
                      background: "#0a1020",
                      border: "1px solid rgba(6,182,212,0.18)",
                      borderRadius: 14, overflow: "hidden",
                      minWidth: 170, zIndex: 60,
                      boxShadow: "0 16px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(6,182,212,0.08)",
                    }}>
                    {SORT_OPTIONS.map((o, i) => (
                      <button key={o.val}
                        onClick={() => handleSortChange(o.val)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          width: "100%", textAlign: "left",
                          padding: "9px 14px", fontSize: 12, fontWeight: 600,
                          background: sortBy === o.val ? "rgba(6,182,212,0.12)" : "transparent",
                          color: sortBy === o.val ? "#67e8f9" : "rgba(148,163,184,0.75)",
                          border: "none", cursor: "pointer",
                          borderBottom: i < SORT_OPTIONS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                          fontFamily: "'Outfit', sans-serif",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => { if (sortBy !== o.val) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={e => { if (sortBy !== o.val) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                      >
                        {o.label}
                        {sortBy === o.val && <Check size={11} color="#06b6d4" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Count badge */}
            <div style={{
              flexShrink: 0,
              background: "rgba(6,182,212,0.08)",
              border: "1px solid rgba(6,182,212,0.18)",
              borderRadius: 50, padding: "5px 14px",
            }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#67e8f9", fontFamily: "'Outfit', sans-serif" }}>
                {sorted.length} items
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PRODUCT GRID
      ══════════════════════════════════════════ */}
      <div className="container mx-auto px-4 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + sortBy}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(198px, 1fr))",
              gap: 18,
            }}
          >
            {visibleProducts.map((product, i) => (
              <HoloCard
                key={product.id}
                product={product}
                index={i}
                daysAgo={DAYS_AGO[i % DAYS_AGO.length]}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {sorted.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "80px 0" }}>
            <p style={{ fontSize: 52, marginBottom: 14 }}>✨</p>
            <h3 style={{ color: "white", fontSize: 22, fontWeight: 700, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>
              No products found
            </h3>
            <p style={{ color: "rgba(148,163,184,0.45)", fontSize: 14 }}>
              Try selecting a different category
            </p>
          </motion.div>
        )}

        {/* Load more / No more */}
        {sorted.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: "center", marginTop: 52, position: "relative" }}
          >
            <AnimatePresence mode="wait">
              {noMore ? (
                <motion.div
                  key="no-more"
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1))",
                    border: "1px solid rgba(6,182,212,0.3)",
                    borderRadius: 14, padding: "14px 32px",
                    color: "#67e8f9", fontSize: 13, fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    boxShadow: "0 0 28px rgba(6,182,212,0.15)",
                  }}
                >
                  <span style={{ fontSize: 18 }}>✅</span>
                  You've seen all {sorted.length} products!
                </motion.div>
              ) : (
                <motion.button
                  key="load-more"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleLoadMore}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    position: "relative", overflow: "hidden",
                    background: "transparent",
                    border: `1px solid ${hasMore ? "rgba(6,182,212,0.28)" : "rgba(6,182,212,0.15)"}`,
                    borderRadius: 14, padding: "14px 52px",
                    color: hasMore ? "#67e8f9" : "rgba(103,232,249,0.45)",
                    fontSize: 13, fontWeight: 700,
                    cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.04em",
                    boxShadow: "0 0 20px rgba(6,182,212,0.08)",
                  }}
                >
                  {/* Shine sweep */}
                  <motion.span style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent)",
                  }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span style={{ position: "relative", zIndex: 1 }}>
                    {hasMore
                      ? `Load More · ${sorted.length - visibleCount} remaining`
                      : "Load More Products"
                    }
                  </span>
                </motion.button>
              )}
            </AnimatePresence>

            {/* Progress indicator */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <div style={{ width: 180, height: 3, borderRadius: 99, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <motion.div
                  animate={{ width: `${Math.min((visibleCount / sorted.length) * 100, 100)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #06b6d4, #8b5cf6)" }}
                />
              </div>
              <span style={{ fontSize: 10, color: "rgba(148,163,184,0.45)", fontFamily: "'Outfit', sans-serif", fontWeight: 600 }}>
                {Math.min(visibleCount, sorted.length)}/{sorted.length}
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════════ */}
      <div style={{ margin: "8px 16px 56px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.21, 1.02, 0.38, 1] }}
          style={{
            position: "relative", overflow: "hidden",
            borderRadius: 28, textAlign: "center",
            background: "linear-gradient(135deg, #08152a 0%, #10082a 50%, #08152a 100%)",
            border: "1px solid rgba(6,182,212,0.14)",
            padding: "56px 32px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Background mesh */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 25% 50%, rgba(6,182,212,0.10) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(139,92,246,0.10) 0%, transparent 60%)" }} />
            {/* Scanning line */}
            <motion.div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)" }}
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              animate={{ rotate: [0, 20, -10, 20, 0], scale: [1, 1.15, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", marginBottom: 18 }}
            >
              <Sparkles size={32} color="#06b6d4" style={{ filter: "drop-shadow(0 0 12px rgba(6,182,212,0.6))" }} />
            </motion.div>

            <h2 style={{
              fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, color: "white",
              marginBottom: 12, letterSpacing: "-0.03em",
              fontFamily: "'Outfit', sans-serif",
              textShadow: "0 0 40px rgba(6,182,212,0.2)",
            }}>
              Never Miss a Drop
            </h2>
            <p style={{
              color: "rgba(148,163,184,0.55)", fontSize: 15,
              marginBottom: 32, maxWidth: 420, margin: "0 auto 32px",
              lineHeight: 1.7,
            }}>
              Fresh products land daily from Pakistan's top verified vendors.<br />
              All on easy installments — no bank account needed.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/products" style={{
                  background: "linear-gradient(135deg, #0891b2, #7c3aed)",
                  color: "white", fontSize: 13, fontWeight: 800,
                  padding: "14px 32px", borderRadius: 14,
                  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7,
                  boxShadow: "0 8px 28px rgba(6,182,212,0.35), 0 0 0 1px rgba(6,182,212,0.2)",
                  fontFamily: "'Outfit', sans-serif", letterSpacing: "0.02em",
                }}>
                  Browse All Products <ChevronRight size={15} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link to="/login" style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(148,163,184,0.8)",
                  fontSize: 13, fontWeight: 700,
                  padding: "14px 32px", borderRadius: 14,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  Create Account
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div style={{ background: "#04080f" }}><Footer /></div>

      {/* ═══ GLOBAL STYLES ═══ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #04080f; }
        ::-webkit-scrollbar-thumb { background: rgba(6,182,212,0.25); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(6,182,212,0.45); }
        ::selection { background: rgba(6,182,212,0.3); color: #e2e8f0; }
      `}</style>
    </div>
  );
};

export default NewArrivalsPage;
