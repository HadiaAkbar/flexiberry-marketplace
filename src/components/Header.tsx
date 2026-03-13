import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart, Heart, User, Menu, X, Search,
  ChevronDown, LayoutGrid, Home, Zap, Sparkles,
  Store, Bolt, BadgePercent
} from "lucide-react";

// ─── Config — replace with real state/context ─────────────────────────────────
const CART_COUNT     = 3;
const WISHLIST_COUNT = 6;
const IS_LOGGED_IN   = false;
const USER_INITIALS  = "AR";

// ─── Marquee ticker ────────────────────────────────────────────────────────────
const TICKERS = [
  { icon: "💰", text: "0% Commission for first 90 days!" },
  { icon: "📱", text: "iPhone 15 Pro — Starting PKR 45,833/mo" },
  { icon: "🏍️", text: "Honda CD 70 on Easy Installments" },
  { icon: "🌙", text: "Jahez Packages — Bundle & Save 50%" },
  { icon: "☀️", text: "Solar Systems — Go Green Today" },
  { icon: "🆓", text: "Free Nationwide Delivery on PKR 5,000+" },
  { icon: "📺", text: "Samsung 65\" OLED — Just PKR 41,666/mo" },
  { icon: "💳", text: "0% Interest — Up to 12-Month Plans" },
];

// ─── Category dropdown ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { icon: "⚡", label: "Electronics",      to: "/store?cat=electronics" },
  { icon: "🏠", label: "Home Appliances",  to: "/store?cat=appliances" },
  { icon: "🎵", label: "Audio & Sound",    to: "/store?cat=audio" },
  { icon: "🎮", label: "Gaming",           to: "/store?cat=gaming" },
  { icon: "👗", label: "Fashion",          to: "/store?cat=fashion" },
  { icon: "🏃", label: "Sports & Fitness", to: "/store?cat=sports" },
];

// ─── Bottom nav ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { to: "/",           label: "Home",           emoji: "🏠" },
  { to: "/flash-sale", label: "Flash Sale",     emoji: "⚡" },
  { to: "/products",   label: "New Arrivals",   emoji: "✨" },
  { to: "/store",      label: "Sell as Vendor", emoji: "🏪", hasArrow: true },
];

// ══════════════════════════════════════════════════════════════════════════════
const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search,     setSearch]     = useState("");
  const [catOpen,    setCatOpen]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const catRef = useRef<HTMLDivElement>(null);

  const isActive = (p: string) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setMobileSearchOpen(false); }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/products?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    // Entire header sits on the dark navy gradient — matches image 2 exactly
    <div
      className="sticky top-0 z-50 w-full"
      style={{ background: "linear-gradient(160deg, hsl(224 55% 14%) 0%, hsl(232 48% 18%) 100%)" }}
    >

      {/* ════════════════════════════════════════════════
          ROW 1 — Scrolling promo ticker
      ════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden h-8 flex items-center border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium px-5"
            >
              <span>{t.icon}</span>
              <span>{t.text}</span>
              <span className="text-white/25 ml-3">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ROW 2 — Logo · Search · Actions
      ════════════════════════════════════════════════ */}
      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-4 h-[66px]">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              {/* Square icon with FB + rounded */}
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)",
                }}
              >
                <span className="text-white font-black text-sm font-display leading-none">FB</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-black text-[18px] tracking-tight text-white">
                  Flexi<span style={{ color: "hsl(221 83% 70%)" }}>Berry</span>
                </span>
                <span className="text-[8.5px] tracking-[0.18em] uppercase text-white/45 font-semibold mt-0.5">
                  SHOP · PAY · SMILE
                </span>
              </div>
            </Link>

            {/* Search — wide, rounded pill, grey bg */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl relative">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products, brands and categories..."
                className="w-full h-11 pl-5 pr-14 rounded-2xl text-sm text-white/90 placeholder:text-white/40 focus:outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
                onFocus={e => (e.target.style.background = "rgba(255,255,255,0.15)")}
                onBlur={e => (e.target.style.background = "rgba(255,255,255,0.10)")}
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-xl flex items-center justify-center transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)",
                }}
              >
                <Search className="h-4 w-4 text-white" />
              </button>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 flex-shrink-0 ml-auto md:ml-0">

              {/* Mobile search toggle */}
              <button
                onClick={() => setMobileSearchOpen(v => !v)}
                className="md:hidden h-10 w-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Login */}
              {IS_LOGGED_IN ? (
                <Link to="/account" className="hidden sm:flex h-10 w-10 rounded-full items-center justify-center text-white text-xs font-bold transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)" }}>
                  {USER_INITIALS}
                </Link>
              ) : (
                <Link to="/account"
                  className="hidden sm:flex items-center gap-1.5 h-10 px-3 rounded-xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              )}

              {/* Wishlist — bare heart, white */}
              <Link
                to="/wishlist"
                className="relative h-10 w-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {WISHLIST_COUNT > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-[17px] w-[17px] bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: "hsl(224 55% 14%)" }}>
                    {WISHLIST_COUNT}
                  </span>
                )}
              </Link>

              {/* Cart — solid gradient pill button */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 h-10 px-4 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:-translate-y-0.5 ml-1"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
                }}
                aria-label="Cart"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {CART_COUNT > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 h-5 w-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2"
                    style={{ borderColor: "hsl(224 55% 14%)" }}>
                    {CART_COUNT}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(v => !v)}
                className="lg:hidden h-10 w-10 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors ml-1"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile search expand */}
          <AnimatePresence>
            {mobileSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden overflow-hidden pb-3"
              >
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products, brands…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white/90 placeholder:text-white/40 focus:outline-none"
                    style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}
                  />
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          ROW 3 — Nav bar (desktop only)
      ════════════════════════════════════════════════ */}
      <div className="hidden lg:block border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center h-11 gap-1">

            {/* All Categories dropdown button */}
            <div ref={catRef} className="relative flex-shrink-0">
              <button
                onClick={() => setCatOpen(v => !v)}
                className="flex items-center gap-2 h-8 px-4 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)",
                }}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                All Categories
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.14 }}
                    className="absolute top-full left-0 mt-2 w-52 rounded-2xl overflow-hidden z-50"
                    style={{
                      background: "hsl(224 45% 12%)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                    }}
                  >
                    {CATEGORIES.map(cat => (
                      <Link
                        key={cat.to}
                        to={cat.to}
                        onClick={() => setCatOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/75 hover:text-white transition-colors"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "")}
                      >
                        <span className="text-base">{cat.icon}</span>
                        {cat.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav links */}
            <nav className="flex items-center flex-1 ml-1">
              {NAV_LINKS.map(({ to, label, emoji, hasArrow }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-1.5 px-3.5 h-8 rounded-xl text-sm font-medium transition-colors whitespace-nowrap
                    ${isActive(to)
                      ? "text-white font-semibold bg-white/10"
                      : "text-white/65 hover:text-white hover:bg-white/08"
                    }`}
                >
                  <span className="text-sm">{emoji}</span>
                  {label}
                  {hasArrow && <ChevronDown className="h-3 w-3 opacity-50" />}
                </Link>
              ))}
            </nav>

            {/* Shop Now CTA — right aligned, outlined pill */}
            <Link
              to="/products"
              className="flex-shrink-0 flex items-center gap-2 h-8 px-5 rounded-full text-sm font-bold transition-all hover:bg-white/10 ml-auto"
              style={{
                border: "1.5px solid rgba(255,255,255,0.30)",
                color: "rgba(255,255,255,0.90)",
              }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: "hsl(221 83% 70%)" }} />
              Shop Now · Pay in Installments
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          Mobile slide-out drawer
      ════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 320 }}
              className="fixed left-0 top-0 bottom-0 w-72 z-50 overflow-y-auto lg:hidden"
              style={{
                background: "hsl(224 55% 10%)",
                borderRight: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)" }}>
                    <span className="text-white font-black text-xs font-display">FB</span>
                  </div>
                  <span className="font-display font-black text-base text-white">
                    Flexi<span style={{ color: "hsl(221 83% 70%)" }}>Berry</span>
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)}
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 space-y-0.5">
                {/* Categories */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 px-3 pt-3 pb-2">Categories</p>
                {CATEGORIES.map(cat => (
                  <Link key={cat.to} to={cat.to} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/08 transition-colors">
                    <span className="text-lg">{cat.icon}</span>
                    {cat.label}
                  </Link>
                ))}

                <div className="my-3" style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

                {/* Nav */}
                <p className="text-xs font-bold uppercase tracking-widest text-white/30 px-3 pb-2">Navigate</p>
                {NAV_LINKS.map(({ to, label, emoji }) => (
                  <Link key={to} to={to} onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                      ${isActive(to) ? "bg-white/12 text-white font-semibold" : "text-white/65 hover:text-white hover:bg-white/08"}`}>
                    <span className="text-lg">{emoji}</span>
                    {label}
                  </Link>
                ))}

                <div className="my-3" style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

                {/* Account + Wishlist */}
                <Link to="/account" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/08 transition-colors">
                  <User className="h-5 w-5" />
                  {IS_LOGGED_IN ? "My Account" : "Login / Register"}
                </Link>
                <Link to="/wishlist" onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/65 hover:text-white hover:bg-white/08 transition-colors">
                  <Heart className="h-5 w-5" />
                  My Wishlist
                  {WISHLIST_COUNT > 0 && (
                    <span className="ml-auto h-5 w-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                      {WISHLIST_COUNT}
                    </span>
                  )}
                </Link>

                {/* CTA */}
                <div className="pt-4 px-1">
                  <Link to="/products" onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full text-white font-bold py-3 rounded-2xl transition-all text-sm"
                    style={{ background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(263 72% 58%) 100%)", boxShadow: "0 4px 16px rgba(37,99,235,0.4)" }}>
                    <Zap className="h-4 w-4" />
                    Shop Now · Pay in Installments
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
