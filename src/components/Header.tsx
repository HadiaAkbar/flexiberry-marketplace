import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { categories } from "@/data/products";

const marqueeItems = [
  "🔥 0% Commission for first 90 days!",
  "📱 iPhone 15 Pro — Starting PKR 45,833/mo",
  "🏍️ Honda CD 70 on Easy Installments",
  "🎉 Jahez Packages — Bundle & Save 50%",
  "☀️ Solar Systems — Go Green Today",
  "🚚 Free Nationwide Delivery",
];

// ── TAGGED CART LOGO (tilted cart with tag body + FB initials) ──
const FlexiBerryLogo = () => (
  <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb" />
        <stop offset="100%" stopColor="#7c3aed" />
      </linearGradient>
      <linearGradient id="logoSheen" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Background squircle */}
    <rect width="100" height="100" rx="24" fill="url(#logoGrad)" />
    <rect width="100" height="100" rx="24" fill="url(#logoSheen)" />

    {/* Tilted cart group */}
    <g transform="rotate(-14, 50, 52)">
      {/* Cart handle arm */}
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Tag-shaped basket body */}
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white" />

      {/* Tag punch hole */}
      <circle cx="32" cy="39" r="4.5" fill="url(#logoGrad)" />

      {/* F — stem */}
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#logoGrad)" />
      {/* F — top bar */}
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#logoGrad)" />
      {/* F — mid bar */}
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#logoGrad)" />

      {/* B — stem */}
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#logoGrad)" />
      {/* B — upper lobe */}
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#logoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      {/* B — lower lobe */}
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#logoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* Left wheel — blue */}
      <circle cx="35" cy="86" r="7.5" fill="white" />
      <circle cx="35" cy="86" r="3.8" fill="url(#logoGrad)" />
      <circle cx="35" cy="86" r="1.5" fill="white" />

      {/* Right wheel — green (paid/go) */}
      <circle cx="70" cy="86" r="7.5" fill="#10b981" />
      <circle cx="70" cy="86" r="3.8" fill="white" />
      <circle cx="70" cy="86" r="1.5" fill="#10b981" />

      {/* Installment dots */}
      <circle cx="43" cy="92" r="2.2" fill="white" opacity="0.7" />
      <circle cx="52" cy="92" r="2.2" fill="white" opacity="0.4" />
      <circle cx="61" cy="92" r="2.2" fill="white" opacity="0.18" />
    </g>

    {/* Border overlay */}
    <rect width="100" height="100" rx="24" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.12" />
  </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">

      {/* ── MARQUEE TOP BAR ── */}
      <div
        className="overflow-hidden"
        style={{ background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)" }}
      >
        <div className="py-2">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-white text-xs font-medium mx-8 opacity-95">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <FlexiBerryLogo />
            <div className="hidden sm:flex flex-col leading-none">
              <div>
                <span className="font-black text-xl tracking-tight text-[#2563eb]">Flexi</span>
                <span className="font-black text-xl tracking-tight text-gray-800">Berry</span>
              </div>
              <span
                className="text-[9px] font-bold tracking-wide uppercase mt-0.5 px-1.5 py-0.5 rounded-full w-fit"
                style={{
                  background: "linear-gradient(90deg, #2563eb14, #7c3aed14)",
                  color: "#7c3aed",
                  border: "1px solid #7c3aed30",
                }}
              >
              </span>
            </div>
          </Link>

          {/* ── SEARCH BAR ── */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative w-full">
              <Input
                placeholder="Search products, brands and categories..."
                className="pr-14 h-11 rounded-xl bg-gray-50 border border-gray-200 focus-visible:ring-blue-400 text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-1 ml-auto">

            {/* Login */}
            <Link to="/login">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                <div
                  className="h-7 w-7 rounded-full flex items-center justify-center"
                  style={{ background: "#eff6ff" }}
                >
                  <User className="h-3.5 w-3.5 text-[#2563eb]" />
                </div>
                <span>Login</span>
              </button>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist">
              <button className="relative h-10 w-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <button
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                <span
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[10px] font-black flex items-center justify-center text-white border-2 border-white"
                  style={{ background: "#7c3aed" }}
                >
                  0
                </span>
              </button>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden h-10 w-10 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ── CATEGORY NAV ── */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-0.5">

              {/* All Categories dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-none"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  <Menu className="h-4 w-4" />
                  All Categories
                  <ChevronDown className="h-3 w-3" />
                </button>

                {catOpen && (
                  <div className="absolute top-full left-0 bg-white border border-gray-100 rounded-b-xl shadow-xl w-64 z-50 overflow-hidden">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors text-sm group"
                      >
                        <div
                          className="h-7 w-7 rounded-lg flex items-center justify-center"
                          style={{ background: "#eff6ff" }}
                        >
                          <cat.icon className="h-3.5 w-3.5 text-[#2563eb]" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-blue-600">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {["Flash Sale", "New Arrivals"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </Link>
              ))}

              <Link
                to="/vendor/register"
                className="px-4 py-2.5 text-sm font-bold flex items-center gap-1.5 transition-colors text-[#2563eb] hover:text-[#7c3aed]"
              >
                <Store className="h-3.5 w-3.5" />
                Sell as Vendor
              </Link>

              {/* Installment tag pill — right-aligned */}
              <div className="ml-auto flex items-center">
                <span
                  className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #2563eb18, #7c3aed18)",
                    color: "#2563eb",
                    border: "1px solid #2563eb28",
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 100 100" fill="none">
                    <g transform="rotate(-14, 50, 52)">
                      <path d="M 8 20 L 17 20 L 23 40" stroke="#2563eb" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="#2563eb" />
                    </g>
                  </svg>
                  Shop Now · Pay in Installments
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 shadow-xl">
          <div className="p-4 space-y-1">
            <div className="relative w-full mb-3">
              <Input
                placeholder="Search..."
                className="pr-10 bg-gray-50 border-gray-200 rounded-xl"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>

            {/* Mobile installment tag */}
            <div className="mb-2">
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #2563eb18, #7c3aed18)",
                  color: "#2563eb",
                  border: "1px solid #2563eb28",
                }}
              >
                🛒 Shop Now · Pay in Installments
              </span>
            </div>

            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 rounded-xl text-sm font-medium text-gray-700"
              >
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "#eff6ff" }}>
                  <cat.icon className="h-3.5 w-3.5 text-[#2563eb]" />
                </div>
                {cat.name}
              </Link>
            ))}

            <Link
              to="/vendor/register"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold text-[#2563eb]"
            >
              <Store className="h-4 w-4" />
              Sell as Vendor
            </Link>

            <Link to="/login" className="block px-3 py-2.5 text-sm font-bold text-[#2563eb]">
              Login / Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
