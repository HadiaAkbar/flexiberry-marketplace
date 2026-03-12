import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { featuredProducts, categories, formatPrice, getMonthlyInstallment } from "@/data/products";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Clock,
  TrendingUp,
  Package,
  Shield,
  Truck,
  RefreshCw,
  Phone,
  ArrowRight,
  Store,
  BadgeCheck,
} from "lucide-react";

/* ─── Category theme map ─────────────────────────────── */
const CATEGORY_THEMES: Record<string, { primary: string; light: string; accent: string; dark: string; gradient: string }> = {
  phones:       { primary: "#e53e3e", light: "#FFF5F5", accent: "#FC8181", dark: "#C53030", gradient: "from-red-600 to-rose-500" },
  laptops:      { primary: "#6D28D9", light: "#F5F3FF", accent: "#A78BFA", dark: "#5B21B6", gradient: "from-violet-600 to-purple-500" },
  bikes:        { primary: "#C05621", light: "#FFFAF0", accent: "#F6AD55", dark: "#9C4221", gradient: "from-orange-600 to-amber-500" },
  appliances:   { primary: "#B91C1C", light: "#FFF1F2", accent: "#FCA5A5", dark: "#991B1B", gradient: "from-red-700 to-red-500" },
  solar:        { primary: "#B45309", light: "#FFFBEB", accent: "#FCD34D", dark: "#92400E", gradient: "from-amber-600 to-yellow-500" },
  furniture:    { primary: "#065F46", light: "#ECFDF5", accent: "#6EE7B7", dark: "#064E3B", gradient: "from-emerald-700 to-green-500" },
  jahez:        { primary: "#BE185D", light: "#FDF2F8", accent: "#F9A8D4", dark: "#9D174D", gradient: "from-pink-700 to-rose-500" },
  cars:         { primary: "#0369A1", light: "#EFF6FF", accent: "#93C5FD", dark: "#1E40AF", gradient: "from-blue-700 to-sky-500" },
  "raw-materials": { primary: "#3F6212", light: "#F7FEE7", accent: "#BEF264", dark: "#365314", gradient: "from-lime-700 to-green-500" },
  general:      { primary: "#2563eb", light: "#EFF6FF", accent: "#93C5FD", dark: "#1D4ED8", gradient: "from-blue-600 to-indigo-500" },
};

const DEFAULT_THEME = { primary: "#2563eb", light: "#EFF6FF", accent: "#93C5FD", dark: "#1D4ED8", gradient: "from-blue-600 to-indigo-500" };

/* ─── Mock vendor data ───────────────────────────────── */
const VENDOR = {
  id: "techzone",
  name: "TechZone Electronics",
  tagline: "Premium Electronics at Unbeatable Prices",
  emoji: "🔌",
  rating: 4.8,
  reviews: 1247,
  products: 156,
  joined: "2023",
  verified: true,
  banners: [
    { title: "New Arrivals 2026", sub: "Latest Phones & Laptops just landed", cta: "Shop Now", bg: "from-blue-900 via-blue-700 to-indigo-600", accent: "#60A5FA" },
    { title: "Flash Sale Today", sub: "Up to 30% off on select electronics", cta: "Grab Deals", bg: "from-rose-900 via-red-700 to-orange-600", accent: "#FCA5A5" },
    { title: "Easy Installments", sub: "Buy now, pay later in 6–12 months", cta: "Apply Now", bg: "from-emerald-900 via-emerald-700 to-teal-600", accent: "#6EE7B7" },
  ],
};

/* ─── Flash Deal countdown ───────────────────────────── */
function useCountdown(targetSeconds = 7200) {
  const [secs, setSecs] = useState(targetSeconds);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return { h, m, s };
}

function TimerBox({ val, label }: { val: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-900 text-white font-black text-lg w-10 h-10 rounded-lg flex items-center justify-center tabular-nums shadow-inner">
        {val}
      </div>
      <span className="text-[9px] text-gray-500 mt-0.5 uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─── Product Card for Store ─────────────────────────── */
function StoreProductCard({ product, theme, index }: { product: any; theme: typeof DEFAULT_THEME; index: number }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const [wishlist, setWishlist] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to={`/vendor/product/${product.id}`} className="block relative">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {discount > 0 && (
            <span
              className="absolute top-2.5 left-2.5 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-md"
              style={{ background: theme.primary }}
            >
              -{discount}%
            </span>
          )}
          <span className="absolute top-2.5 right-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            New
          </span>
          <button
            onClick={(e) => { e.preventDefault(); setWishlist(!wishlist); }}
            className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow transition-transform hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
          </button>
        </div>
      </Link>

      <div className="p-3.5 flex flex-col flex-1">
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: theme.primary }}>
          {product.description}
        </p>
        <Link to={`/vendor/product/${product.id}`}>
          <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[2.5rem] mb-2 hover:text-blue-600 transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {[1,2,3,4,5].map((s) => (
            <Star key={s} className={`h-3 w-3 ${s <= Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`} />
          ))}
          <span className="text-[11px] text-gray-500 ml-0.5">({product.reviews})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base font-black" style={{ color: theme.primary }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <div
          className="rounded-lg px-2.5 py-1.5 mb-3 border text-xs font-semibold"
          style={{ background: theme.light, borderColor: theme.accent + "40", color: theme.primary }}
        >
          💳 {getMonthlyInstallment(product.price, 12)}/mo × 12
        </div>

        <button
          className="mt-auto w-full py-2.5 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` }}
        >
          <ShoppingCart className="h-4 w-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
const VendorStorePage = () => {
  const { vendorId = "techzone" } = useParams<{ vendorId?: string }>();
  const [slide, setSlide] = useState(0);
  const { h, m, s } = useCountdown(7200);

  const next = useCallback(() => setSlide((p) => (p + 1) % VENDOR.banners.length), []);
  const prev = useCallback(() => setSlide((p) => (p - 1 + VENDOR.banners.length) % VENDOR.banners.length), []);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const theme = DEFAULT_THEME;
  const allProducts = featuredProducts.slice(0, 12);
  const flashDeals = featuredProducts.filter((p) => p.originalPrice).slice(0, 6);
  const featured = featuredProducts.slice(0, 8);
  const banner = VENDOR.banners[slide];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ── VENDOR HERO BANNER ── */}
        <div className={`relative overflow-hidden bg-gradient-to-br ${banner.bg} transition-all duration-700`} style={{ minHeight: 340 }}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
          />

          <div className="relative container mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-10">
            {/* Left: Vendor info + text */}
            <div className="flex-1 text-white z-10">
              {/* Vendor badge */}
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 rounded-full px-4 py-1.5 mb-5">
                <span className="text-lg">{VENDOR.emoji}</span>
                <span className="text-sm font-semibold">{VENDOR.name}</span>
                {VENDOR.verified && <BadgeCheck className="h-4 w-4 text-emerald-400" />}
              </div>

              <h1 className="font-black text-4xl md:text-5xl leading-tight mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                {banner.title}
              </h1>
              <p className="text-white/75 text-lg mb-6">{banner.sub}</p>

              <div className="flex items-center gap-3 flex-wrap">
                <button
                  className="flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-2xl transition-all hover:scale-105 active:scale-95"
                  style={{ background: banner.accent, color: "#1a1a1a" }}
                >
                  {banner.cta} <ArrowRight className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {VENDOR.rating}
                  </span>
                  <span>·</span>
                  <span>{VENDOR.products} Products</span>
                  <span>·</span>
                  <span className="flex items-center gap-1"><BadgeCheck className="h-3.5 w-3.5 text-emerald-400" /> Verified</span>
                </div>
              </div>
            </div>

            {/* Right: Stats cards */}
            <div className="hidden md:grid grid-cols-2 gap-3 z-10">
              {[
                { icon: Package, label: "Products", val: "156+" },
                { icon: Star, label: "Rating", val: "4.8/5" },
                { icon: Shield, label: "Verified", val: "KYC ✓" },
                { icon: Truck, label: "Delivery", val: "Free" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 text-center text-white min-w-[110px]">
                  <Icon className="h-5 w-5 mx-auto mb-1 opacity-80" />
                  <p className="text-lg font-black">{val}</p>
                  <p className="text-xs opacity-60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Slide controls */}
          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-20">
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {VENDOR.banners.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                className="rounded-full transition-all"
                style={{ height: 5, width: i === slide ? 24 : 5, background: i === slide ? "white" : "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>
        </div>

        {/* ── TRUST BADGES ── */}
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
              {[
                { icon: Truck, label: "Free Nationwide Delivery", sub: "On orders PKR 5000+" },
                { icon: RefreshCw, label: "7-Day Returns", sub: "Hassle-free policy" },
                { icon: Shield, label: "KYC Verified Shop", sub: "100% secure" },
                { icon: Phone, label: "24/7 Support", sub: "+92 300 1234567" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 px-5 py-4">
                  <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#EFF6FF" }}>
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-12">

          {/* ── FLASH DEALS ── */}
          {flashDeals.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-red-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                      Flash Deals
                    </h2>
                    <p className="text-xs text-gray-500">Limited time offers</p>
                  </div>
                  {/* Countdown */}
                  <div className="ml-4 flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                    <Clock className="h-3.5 w-3.5 text-red-500" />
                    <span className="text-xs text-gray-500 mr-1">Ends in:</span>
                    <div className="flex items-center gap-1">
                      <TimerBox val={h} label="hr" />
                      <span className="text-gray-400 font-bold text-sm mb-4">:</span>
                      <TimerBox val={m} label="min" />
                      <span className="text-gray-400 font-bold text-sm mb-4">:</span>
                      <TimerBox val={s} label="sec" />
                    </div>
                  </div>
                </div>
                <Link to="/products" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                  View All <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {flashDeals.map((p, i) => (
                  <StoreProductCard key={p.id} product={p} theme={{ primary: "#e53e3e", light: "#FFF5F5", accent: "#FC8181", dark: "#C53030", gradient: "from-red-600 to-rose-500" }} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* ── FEATURED PRODUCTS ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center" style={{ background: theme.primary }}>
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Featured Products
                  </h2>
                  <p className="text-xs text-gray-500">Handpicked by the vendor</p>
                </div>
              </div>
              <Link to="/products" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {featured.map((p, i) => (
                <StoreProductCard key={p.id} product={p} theme={CATEGORY_THEMES[p.categoryId] || DEFAULT_THEME} index={i} />
              ))}
            </div>
          </section>

          {/* ── SHOP BY CATEGORY (within this vendor) ── */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-xl bg-violet-600 flex items-center justify-center">
                <Store className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                  Shop by Category
                </h2>
                <p className="text-xs text-gray-500">Browse our collections</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {categories.slice(0, 10).map((cat) => {
                const catTheme = CATEGORY_THEMES[cat.id] || DEFAULT_THEME;
                const count = featuredProducts.filter((p) => p.categoryId === cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="group flex flex-col items-center gap-2.5 p-5 rounded-2xl border transition-all hover:shadow-lg hover:scale-[1.03] duration-300 text-center"
                    style={{ background: catTheme.light, borderColor: catTheme.accent + "40" }}
                  >
                    <div
                      className="h-12 w-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ background: catTheme.primary + "18" }}
                    >
                      <cat.icon className="h-6 w-6" style={{ color: catTheme.primary }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: catTheme.dark }}>{cat.name}</p>
                      <p className="text-xs" style={{ color: catTheme.primary, opacity: 0.7 }}>{count} items</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── ALL PRODUCTS ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gray-900 flex items-center justify-center">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne', sans-serif" }}>
                    All Products
                  </h2>
                  <p className="text-xs text-gray-500">{allProducts.length} products available</p>
                </div>
              </div>
              <Link to="/products" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                See Full Shop <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {allProducts.map((p, i) => (
                <StoreProductCard key={p.id} product={p} theme={CATEGORY_THEMES[p.categoryId] || DEFAULT_THEME} index={i} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorStorePage;