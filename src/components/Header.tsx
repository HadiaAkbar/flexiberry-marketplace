import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, Store, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Inline SVG logo mark — bold "F" monogram with berry accent dot
const FlexiBerryLogo = () => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="42" height="42" rx="12" fill="url(#logoGrad)" />
    {/* F letterform */}
    <path
      d="M12 10H28V14.5H16.5V19H26V23.5H16.5V32H12V10Z"
      fill="white"
    />
    {/* Berry dot — accent circle top-right */}
    <circle cx="31" cy="11" r="5" fill="#FFF" opacity="0.25" />
    <circle cx="31" cy="11" r="3" fill="white" />
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="42" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF6B4A" />
        <stop offset="100%" stopColor="#E8430A" />
      </linearGradient>
    </defs>
  </svg>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Marquee top bar */}
      <div className="overflow-hidden" style={{ background: "linear-gradient(90deg, #FF6B4A 0%, #E8430A 100%)" }}>
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

      {/* Main header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <FlexiBerryLogo />
            <div className="hidden sm:block leading-none">
              <span className="font-black text-xl tracking-tight" style={{ color: "#FF6B4A" }}>
                Flexi
              </span>
              <span className="font-black text-xl tracking-tight text-gray-800">
                Berry
              </span>
            </div>
          </Link>

          {/* ── SEARCH BAR ── */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative w-full">
              <Input
                placeholder="Search products, brands and categories..."
                className="pr-14 h-11 rounded-xl bg-gray-50 border border-gray-200 focus-visible:ring-orange-400 text-sm text-gray-700 placeholder:text-gray-400"
              />
              <button
                className="absolute right-1.5 top-1.5 h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #E8430A)" }}
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
                  style={{ background: "#FFF0EC" }}
                >
                  <User className="h-3.5 w-3.5" style={{ color: "#FF6B4A" }} />
                </div>
                <span>Login</span>
              </button>
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist">
              <button className="relative h-10 w-10 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-orange-500 transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <button
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FF6B4A, #E8430A)" }}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                <span
                  className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full text-[10px] font-black flex items-center justify-center text-white border-2 border-white"
                  style={{ background: "#E8430A" }}
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
                  style={{ background: "linear-gradient(135deg, #FF6B4A, #E8430A)" }}
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
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors text-sm group"
                      >
                        <div
                          className="h-7 w-7 rounded-lg flex items-center justify-center"
                          style={{ background: "#FFF0EC" }}
                        >
                          <cat.icon className="h-3.5 w-3.5" style={{ color: "#FF6B4A" }} />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-orange-600">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {["Flash Sale", "New Arrivals"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {item}
                </Link>
              ))}

              <Link
                to="/vendor/register"
                className="px-4 py-2.5 text-sm font-bold flex items-center gap-1.5 transition-colors"
                style={{ color: "#FF6B4A" }}
              >
                <Store className="h-3.5 w-3.5" />
                Sell as Vendor
              </Link>
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
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-orange-50 rounded-xl text-sm font-medium text-gray-700"
              >
                <div className="h-7 w-7 rounded-lg flex items-center justify-center" style={{ background: "#FFF0EC" }}>
                  <cat.icon className="h-3.5 w-3.5" style={{ color: "#FF6B4A" }} />
                </div>
                {cat.name}
              </Link>
            ))}
            <Link
              to="/vendor/register"
              className="flex items-center gap-2 px-3 py-2.5 text-sm font-bold"
              style={{ color: "#FF6B4A" }}
            >
              <Store className="h-4 w-4" />
              Sell as Vendor
            </Link>
            <Link to="/login" className="block px-3 py-2.5 text-sm font-bold" style={{ color: "#FF6B4A" }}>
              Login / Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
