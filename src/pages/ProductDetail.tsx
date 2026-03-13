import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  featuredProducts,
  categories,
  formatPrice,
  getMonthlyInstallment,
} from "@/data/products";
import {
  Star,
  Heart,
  ShoppingCart,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  Share2,
  Facebook,
  Twitter,
  Minus,
  Plus,
  BadgeCheck,
  MessageSquare,
  ArrowRight,
  Store,
} from "lucide-react";

/* ─── Category theme map ─────────────────────────────── */
const CATEGORY_THEMES: Record<
  string,
  { primary: string; light: string; accent: string; dark: string; gradient: string }
> = {
  phones:        { primary: "#e53e3e", light: "#FFF5F5", accent: "#FC8181", dark: "#C53030", gradient: "linear-gradient(135deg,#e53e3e,#C53030)" },
  laptops:       { primary: "#6D28D9", light: "#F5F3FF", accent: "#A78BFA", dark: "#5B21B6", gradient: "linear-gradient(135deg,#6D28D9,#5B21B6)" },
  bikes:         { primary: "#C05621", light: "#FFFAF0", accent: "#F6AD55", dark: "#9C4221", gradient: "linear-gradient(135deg,#C05621,#9C4221)" },
  appliances:    { primary: "#B91C1C", light: "#FFF1F2", accent: "#FCA5A5", dark: "#991B1B", gradient: "linear-gradient(135deg,#B91C1C,#991B1B)" },
  solar:         { primary: "#B45309", light: "#FFFBEB", accent: "#FCD34D", dark: "#92400E", gradient: "linear-gradient(135deg,#B45309,#92400E)" },
  furniture:     { primary: "#065F46", light: "#ECFDF5", accent: "#6EE7B7", dark: "#064E3B", gradient: "linear-gradient(135deg,#065F46,#064E3B)" },
  jahez:         { primary: "#BE185D", light: "#FDF2F8", accent: "#F9A8D4", dark: "#9D174D", gradient: "linear-gradient(135deg,#BE185D,#9D174D)" },
  cars:          { primary: "#0369A1", light: "#EFF6FF", accent: "#93C5FD", dark: "#1E40AF", gradient: "linear-gradient(135deg,#0369A1,#1E40AF)" },
  "raw-materials": { primary: "#3F6212", light: "#F7FEE7", accent: "#BEF264", dark: "#365314", gradient: "linear-gradient(135deg,#3F6212,#365314)" },
  general:       { primary: "#2563eb", light: "#EFF6FF", accent: "#93C5FD", dark: "#1D4ED8", gradient: "linear-gradient(135deg,#2563eb,#1D4ED8)" },
};
const DEFAULT_THEME = CATEGORY_THEMES.general;

/* ─── Mock reviews ───────────────────────────────────── */
const MOCK_REVIEWS = [
  { name: "Ahmed Khan", avatar: "AK", rating: 5, date: "Mar 5, 2026", comment: "Excellent product! Delivered on time and exactly as described. The installment plan made it very affordable." },
  { name: "Sara Ali",  avatar: "SA", rating: 4, date: "Feb 28, 2026", comment: "Good quality, packaging was perfect. Delivery was a bit delayed but support team was responsive." },
];

/* ─── Star renderer ──────────────────────────────────── */
function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={size === "lg" ? "h-5 w-5" : "h-3.5 w-3.5"}
          style={{
            fill: s <= Math.round(rating) ? "#FBBF24" : "#E5E7EB",
            color: s <= Math.round(rating) ? "#FBBF24" : "#E5E7EB",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Product Detail Page ────────────────────────────── */
const VendorProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = featuredProducts.find((p) => p.id === id);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details" | "reviews">("description");
  const [mainImg, setMainImg] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl mb-4">😕</p>
            <p className="text-5xl mb-4">😕</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Product not found</h2>
            <Link to="/products" className="text-blue-600 hover:underline">Back to Shop</Link>
            <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const theme = CATEGORY_THEMES[product.categoryId] || DEFAULT_THEME;
  const relatedProducts = featuredProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Mock multiple images (reuse the same image for demo)
  const images = [product.image, product.image, product.image, product.image];

  const relatedProducts = featuredProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 6);

  const otherProducts = featuredProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const TABS = [
    { key: "description", label: "Description" },
    { key: "details",     label: "Product Details" },
    { key: "reviews",     label: `Reviews (${MOCK_REVIEWS.length})` },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ── Breadcrumb ── */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="container mx-auto px-4 flex items-center gap-1.5 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/products" className="hover:text-blue-600 transition-colors">Shop</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            {category && (
              <>
                <Link to={`/category/${category.slug}`} className="hover:text-blue-600 transition-colors">
                  {category.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5" />
              </>
            )}
            <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-5 py-2.5 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          <Link to="/vendor/dashboard" className="hover:text-blue-600">Vendor</Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          <span className="font-semibold text-gray-700 truncate">{product.name}</span>
        </div>
      </div>

        {/* ── PRODUCT SECTION ── */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-10">

              {/* ── LEFT: Images ── */}
              <div>
                {/* Main image */}
                <div
                  className="relative rounded-2xl overflow-hidden aspect-square mb-4 border-2"
                  style={{ borderColor: theme.accent + "40", background: theme.light }}
                >
                  <img
                    src={images[mainImg]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                  {discount > 0 && (
                    <span
                      className="absolute top-4 left-4 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow-lg"
                      style={{ background: theme.gradient }}
                    >
                      -{discount}% OFF
                    </span>
                  )}
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
                  >
                    <Heart
                      className={`h-5 w-5 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-3">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImg(i)}
                      className="aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105"
                      style={{
                        borderColor: mainImg === i ? theme.primary : "#E5E7EB",
                        background: theme.light,
                      }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
      <section className="py-10">
        <div className="max-w-[1240px] mx-auto px-5 grid md:grid-cols-2 gap-10">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-8">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-contain" />
          </div>

              {/* ── RIGHT: Details ── */}
              <div className="flex flex-col">
                {/* Category badge */}
                {category && (
                  <div
                    className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-xs font-bold mb-3"
                    style={{ background: theme.light, color: theme.primary, border: `1.5px solid ${theme.accent}50` }}
                  >
                    <category.icon className="h-3.5 w-3.5" />
                    {category.name}
                  </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              <Store className="h-3.5 w-3.5" /> Vendor Listing
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{product.name}</h1>
            <p className="text-sm text-gray-500 mb-4">Category: {category?.name ?? "General"}</p>

            <div className="flex items-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="h-4 w-4"
                  style={{
                    fill: s <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb",
                    color: s <= Math.round(product.rating) ? "#f59e0b" : "#e5e7eb",
                  }}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-blue-700">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                )}

                <h1
                  className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {product.name}
                </h1>

                {/* Reference + Rating */}
                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  <span className="text-xs text-gray-400">Reference: <span className="text-gray-600 font-medium">{product.id}</span></span>
                  <div className="flex items-center gap-2">
                    <Stars rating={product.rating} />
                    <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      Read reviews ({product.reviews})
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-gray-100">
                  <span
                    className="text-4xl font-black"
                    style={{ color: theme.primary }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through font-medium">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {discount > 0 && (
                    <span
                      className="text-sm font-black px-2.5 py-1 rounded-lg text-white"
                      style={{ background: theme.primary }}
                    >
                      -{discount}%
                    </span>
                  )}
                </div>

                {/* Short description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Premium quality product from TechZone Electronics. Available on easy installment plans with 0% markup on select options. Fast nationwide delivery included.
                </p>

                {/* Installment Plans */}
                <div
                  className="rounded-xl p-4 mb-5 border"
                  style={{ background: theme.light, borderColor: theme.accent + "50" }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="h-4 w-4" style={{ color: theme.primary }} />
                    <span className="text-sm font-bold" style={{ color: theme.primary }}>Installment Plans</span>
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {(product.installmentOptions || [6, 12]).map((months) => (
                      <div
                        key={months}
                        className="bg-white rounded-lg p-2.5 text-center border"
                        style={{ borderColor: theme.accent + "40" }}
                      >
                        <p className="text-xs text-gray-500">{months} Months</p>
                        <p className="text-sm font-black" style={{ color: theme.primary }}>
                          {getMonthlyInstallment(product.price, months)}
                        </p>
                        <p className="text-[10px] text-gray-400">per month</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {/* Qty */}
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3 py-2.5 hover:bg-gray-100 transition-colors text-gray-600 font-bold"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-black text-gray-800 tabular-nums text-sm">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-3 py-2.5 hover:bg-gray-100 transition-colors text-gray-600 font-bold"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-white font-black text-sm transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95 shadow-lg"
                    style={{ background: theme.gradient }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    ADD TO CART
                  </button>
                </div>

                {/* Wishlist + Compare */}
                <div className="flex items-center gap-4 mb-5 text-sm text-gray-500">
                  <button
                    onClick={() => setWishlist(!wishlist)}
                    className="flex items-center gap-1.5 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`h-4 w-4 ${wishlist ? "fill-red-500 text-red-500" : ""}`} />
                    Add to wishlist
                  </button>
                  <span className="text-gray-200">|</span>
                  <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <RefreshCw className="h-4 w-4" />
                    Add to compare
                  </button>
                {discount > 0 && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded">-{discount}%</span>}
              </div>
              <p className="text-sm text-emerald-600 font-semibold mt-2 flex items-center gap-1.5">
                <CreditCard className="h-4 w-4" />
                From {getMonthlyInstallment(product.price, 12)}/month (0% markup)
              </p>
            </div>

            <p className="text-gray-600 leading-7 border-t border-gray-100 pt-4 mb-6">{product.description}</p>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-gray-50">-</button>
                <span className="w-12 text-center font-semibold">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-gray-50">+</button>
              </div>
              <button className="flex-1 h-11 rounded-lg text-white font-bold bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => setWishlisted((w) => !w)}
                className="h-11 w-11 rounded-lg border border-gray-200 flex items-center justify-center"
              >
                <Heart className="h-4 w-4" style={{ fill: wishlisted ? "#ef4444" : "none", color: wishlisted ? "#ef4444" : "#6b7280" }} />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {[Shield, Truck, RefreshCw].map((Icon, idx) => (
                <div key={idx} className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-gray-500" /> Trusted policy
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="py-10 border-t border-gray-100">
          <div className="max-w-[1240px] mx-auto px-5">
            <h2 className="text-xl font-extrabold mb-5">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/vendor/product/${p.id}`} className="rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow">
                  <img src={p.image} alt={p.name} className="w-full aspect-square object-contain bg-gray-50 rounded-lg mb-2" />
                  <p className="text-xs text-gray-500">{categories.find((c) => c.id === p.categoryId)?.name ?? "General"}</p>
                  <p className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-10">{p.name}</p>
                  <p className="text-sm font-bold text-blue-700 mt-1">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

                {/* Share */}
                <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-5">
                  <span className="text-sm font-semibold text-gray-600">Share:</span>
                  {[Facebook, Twitter, Share2].map((Icon, i) => (
                    <button
                      key={i}
                      className="h-8 w-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 transition-colors text-gray-500 hover:text-gray-800"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
      <Footer />
    </div>
  );
};

                {/* Policy badges */}
                <div className="space-y-2.5">
                  {[
                    { icon: Shield, text: "Security Policy — KYC Verified & 100% Secure Payments" },
                    { icon: Truck,  text: "Delivery Policy — Free nationwide delivery in 3–5 days" },
                    { icon: RefreshCw, text: "Return Policy — 7-day hassle-free returns" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-gray-500">
     
(Content truncated due to size limit. Use line ranges to read remaining content)
export default VendorProductDetail;
