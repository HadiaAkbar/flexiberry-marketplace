import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  featuredProducts,
  categories,
  formatPrice,
  getMonthlyInstallment,
} from "@/data/products";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Heart,
  ShoppingCart,
  CreditCard,
  Shield,
  Truck,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Share2,
  Minus,
  Plus,
  MessageSquare,
  Facebook,
  Twitter,
  ArrowUpToLine,
  BadgeCheck,
  Clock,
  Store,
  MapPin,
  X,
  Search,
} from "lucide-react";

/* ─── Category theme map ── */
const CATEGORY_THEMES: Record<string, { primary: string; light: string; accent: string; dark: string }> = {
  phones:          { primary: "#e53e3e", light: "#FFF5F5", accent: "#FC8181", dark: "#C53030" },
  laptops:         { primary: "#6D28D9", light: "#F5F3FF", accent: "#A78BFA", dark: "#5B21B6" },
  bikes:           { primary: "#C05621", light: "#FFFAF0", accent: "#F6AD55", dark: "#9C4221" },
  appliances:      { primary: "#B91C1C", light: "#FFF1F2", accent: "#FCA5A5", dark: "#991B1B" },
  solar:           { primary: "#B45309", light: "#FFFBEB", accent: "#FCD34D", dark: "#92400E" },
  furniture:       { primary: "#065F46", light: "#ECFDF5", accent: "#6EE7B7", dark: "#064E3B" },
  jahez:           { primary: "#BE185D", light: "#FDF2F8", accent: "#F9A8D4", dark: "#9D174D" },
  cars:            { primary: "#0369A1", light: "#EFF6FF", accent: "#93C5FD", dark: "#1E40AF" },
  "raw-materials": { primary: "#3F6212", light: "#F7FEE7", accent: "#BEF264", dark: "#365314" },
  general:         { primary: "#2563eb", light: "#EFF6FF", accent: "#93C5FD", dark: "#1D4ED8" },
};
const DEFAULT_THEME = CATEGORY_THEMES.general;

/* ─── Theme type alias ── */
type Theme = typeof DEFAULT_THEME;

/* ─── Mock vendor/shop data ── */
const VENDOR_MAP: Record<string, { shopName: string; shopId: string; location: string; verified: boolean }> = {
  phones:          { shopName: "TechZone Official Store",  shopId: "vendor-techzone-001",    location: "Lahore",     verified: true },
  laptops:         { shopName: "DigiWorld Electronics",    shopId: "vendor-digiworld-002",   location: "Karachi",    verified: true },
  bikes:           { shopName: "SpeedRiders Pk",           shopId: "vendor-speedriders-003", location: "Islamabad",  verified: true },
  appliances:      { shopName: "HomeElite Appliances",     shopId: "vendor-homeelite-004",   location: "Rawalpindi", verified: true },
  solar:           { shopName: "GreenPower Solutions",     shopId: "vendor-greenpower-005",  location: "Faisalabad", verified: true },
  furniture:       { shopName: "CraftHouse Furniture",     shopId: "vendor-crafthouse-006",  location: "Multan",     verified: true },
  jahez:           { shopName: "StyleHub Fashion",         shopId: "vendor-stylehub-007",    location: "Lahore",     verified: true },
  cars:            { shopName: "AutoPrime Dealers",        shopId: "vendor-autoprime-008",   location: "Karachi",    verified: true },
  "raw-materials": { shopName: "BuildMart Supplies",       shopId: "vendor-buildmart-009",   location: "Peshawar",   verified: true },
  general:         { shopName: "FlexiBerry Official",      shopId: "vendor-flexiberry-000",  location: "Lahore",     verified: true },
};

/* ─── Mock recently viewed ── */
const RECENTLY_VIEWED = [
  { id: "rv1", name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 449999, originalPrice: 499999 as number | null, rating: 4.7, reviews: 89,  image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80" },
  { id: "rv2", name: 'MacBook Pro M3 14"',       brand: "Apple",   price: 649999, originalPrice: null,                    rating: 4.9, reviews: 201, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" },
  { id: "rv3", name: "Sony WH-1000XM5",          brand: "Sony",    price: 89999,  originalPrice: 109999 as number | null, rating: 4.8, reviews: 312, image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&q=80" },
  { id: "rv4", name: 'iPad Pro M2 12.9"',        brand: "Apple",   price: 379999, originalPrice: null,                    rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80" },
  { id: "rv5", name: "Google Pixel 8 Pro",       brand: "Google",  price: 199999, originalPrice: 229999 as number | null, rating: 4.6, reviews: 78,  image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80" },
  { id: "rv6", name: 'Samsung 65" QLED 4K',      brand: "Samsung", price: 329999, originalPrice: 389999 as number | null, rating: 4.5, reviews: 43,  image: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e12a?w=400&q=80" },
];

/* ─── Mock reviews ── */
const MOCK_REVIEWS = [
  { name: "Ahmed Raza",    initials: "AR", rating: 5, date: "March 5, 2026",     comment: "Absolutely amazing product! Flexiberry delivered it next day and the installment plan was hassle-free. Build quality is exceptional and performance is unreal." },
  { name: "Fatima Sheikh", initials: "FS", rating: 5, date: "February 28, 2026", comment: "Got it on 12-month installment — totally worth it. Packaging was perfect and support team was very helpful explaining all the features." },
];

/* ─── Stars ── */
function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span style={{ display: "flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          style={{
            width: size, height: size,
            fill: s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb",
            color: s <= Math.round(rating) ? "#f59e0b" : "#e5e7eb",
          }}
        />
      ))}
    </span>
  );
}

/* ─── Zoom Lightbox (self-contained, all hooks at top level) ── */
interface LightboxProps {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
  theme: Theme;
}

function ZoomLightbox({ images, activeIndex, onClose, onChangeIndex, theme }: LightboxProps) {
  const [scale, setScale]       = useState(1);
  const [pos, setPos]           = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragOrigin              = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  /* reset zoom when image changes */
  useEffect(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, [activeIndex]);

  /* keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")                { onClose(); }
      if (e.key === "ArrowRight")            { onChangeIndex((activeIndex + 1) % images.length); }
      if (e.key === "ArrowLeft")             { onChangeIndex((activeIndex - 1 + images.length) % images.length); }
      if (e.key === "+" || e.key === "=")    { setScale((s) => Math.min(s + 0.5, 4)); }
      if (e.key === "-")                     { setScale((s) => { const n = Math.max(s - 0.5, 1); if (n === 1) setPos({ x: 0, y: 0 }); return n; }); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, images.length, onClose, onChangeIndex]);

  /* lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const zoomIn  = () => setScale((s) => Math.min(s + 0.5, 4));
  const zoomOut = () => setScale((s) => { const n = Math.max(s - 0.5, 1); if (n === 1) setPos({ x: 0, y: 0 }); return n; });
  const reset   = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: dragOrigin.current.px + (e.clientX - dragOrigin.current.mx),
      y: dragOrigin.current.py + (e.clientY - dragOrigin.current.my),
    });
  };
  const onMouseUp = () => setDragging(false);

  const onImgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale === 1) { setScale(2); } else { reset(); }
  };

  const F: React.CSSProperties = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 9998 }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        style={{ position: "fixed", top: 16, right: 16, zIndex: 10001, width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <X size={20} />
      </button>

      {/* Zoom controls */}
      <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 10001, display: "flex", alignItems: "center", gap: 6, background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "6px 14px", ...F }}>
        <button onClick={zoomOut} disabled={scale <= 1}
          style={{ background: "none", border: "none", color: scale <= 1 ? "rgba(255,255,255,0.3)" : "white", cursor: scale <= 1 ? "default" : "pointer", display: "flex", padding: "2px 6px", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          −
        </button>
        <span style={{ color: "white", fontSize: 12, fontWeight: 700, minWidth: 42, textAlign: "center" }}>
          {Math.round(scale * 100)}%
        </span>
        <button onClick={zoomIn} disabled={scale >= 4}
          style={{ background: "none", border: "none", color: scale >= 4 ? "rgba(255,255,255,0.3)" : "white", cursor: scale >= 4 ? "default" : "pointer", display: "flex", padding: "2px 6px", fontSize: 18, fontWeight: 700, lineHeight: 1 }}>
          +
        </button>
        <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.2)", margin: "0 2px" }} />
        <button onClick={reset} disabled={scale === 1}
          style={{ background: "none", border: "none", color: scale === 1 ? "rgba(255,255,255,0.3)" : "white", cursor: scale === 1 ? "default" : "pointer", fontSize: 11, fontWeight: 600, padding: "2px 4px", ...F }}>
          Reset
        </button>
      </div>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={() => onChangeIndex((activeIndex - 1 + images.length) % images.length)}
          style={{ position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10001, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={() => onChangeIndex((activeIndex + 1) % images.length)}
          style={{ position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)", zIndex: 10001, width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image area */}
      <div
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", cursor: scale > 1 ? (dragging ? "grabbing" : "grab") : "zoom-in" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <img
          src={images[activeIndex]}
          alt="Product zoom"
          draggable={false}
          onClick={onImgClick}
          style={{
            maxWidth: "88vw",
            maxHeight: "80vh",
            objectFit: "contain",
            borderRadius: scale === 1 ? 16 : 0,
            boxShadow: scale === 1 ? "0 40px 80px rgba(0,0,0,0.7)" : "none",
            transform: `scale(${scale}) translate(${pos.x / scale}px, ${pos.y / scale}px)`,
            transition: dragging ? "none" : "transform 0.2s ease",
            userSelect: "none",
          }}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div style={{ position: "fixed", bottom: 52, left: "50%", transform: "translateX(-50%)", zIndex: 10001, display: "flex", gap: 8 }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onChangeIndex(i)}
              style={{ width: 52, height: 52, borderRadius: 10, overflow: "hidden", padding: 3, border: `2px solid ${i === activeIndex ? theme.primary : "rgba(255,255,255,0.25)"}`, background: "rgba(255,255,255,0.08)", cursor: "pointer", transition: "border-color 0.2s", flexShrink: 0 }}
            >
              <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 6 }} />
            </button>
          ))}
        </div>
      )}

      {/* Hint */}
      <p style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10001, color: "rgba(255,255,255,0.35)", fontSize: 11, whiteSpace: "nowrap", margin: 0, pointerEvents: "none", ...F }}>
        Click image to toggle zoom · Drag to pan · Arrow keys to navigate · Esc to close
      </p>

      <style>{`
        @keyframes lbIn    { from { opacity:0 } to { opacity:1 } }
        @keyframes lbImgIn { from { opacity:0; transform:scale(0.92) } to { opacity:1; transform:scale(1) } }
      `}</style>
    </>
  );
}

/* ─── Mini product card ── */
function MiniCard({
  image, brand, name, price, originalPrice, rating, theme = DEFAULT_THEME,
}: {
  image: string; brand: string; name: string; price: number;
  originalPrice?: number | null; rating: number; theme?: Theme;
}) {
  const [wish, setWish] = useState(false);
  const disc = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col">
      <div className="absolute top-2.5 left-2.5 z-10 text-white text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: disc > 0 ? "#ef4444" : theme.primary }}>
        {disc > 0 ? `-${disc}%` : "New"}
      </div>
      <div className="relative aspect-square overflow-hidden" style={{ background: "#f9fafb", padding: 14 }}>
        <img src={image} alt={name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
        <button
          onClick={(e) => { e.preventDefault(); setWish(!wish); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center transition-transform hover:scale-110"
        >
          <Heart className="w-3.5 h-3.5" style={{ fill: wish ? "#ef4444" : "none", color: wish ? "#ef4444" : "#ccc" }} />
        </button>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.primary }}>{brand}</p>
        <p className="text-[13px] font-semibold text-gray-800 line-clamp-2 leading-snug">{name}</p>
        <Stars rating={rating} size={12} />
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          <span className="text-[15px] font-extrabold" style={{ color: theme.primary }}>PKR {price.toLocaleString()}</span>
          {originalPrice && <span className="text-[11px] text-gray-400 line-through">{originalPrice.toLocaleString()}</span>}
        </div>
      </div>
      <div className="flex gap-1.5 px-3 pb-3">
        <button
          className="flex-1 py-1.5 text-white text-[12px] font-bold rounded-md transition-opacity hover:opacity-85 flex items-center justify-center gap-1"
          style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` }}
        >
          <ShoppingCart className="w-3 h-3" /> Add to Cart
        </button>
        <button
          onClick={() => setWish(!wish)}
          className="w-8 h-8 border rounded-md flex items-center justify-center transition-colors"
          style={{ borderColor: wish ? "#ef4444" : "#e5e7eb", color: wish ? "#ef4444" : "#bbb" }}
        >
          <Heart className="w-3.5 h-3.5" style={{ fill: wish ? "#ef4444" : "none" }} />
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ── */
const ProductDetail = () => {
  const { id } = useParams();
  const product = featuredProducts.find((p) => p.id === id);
  const { addToCart } = useCart();

  /* ── ALL hooks declared unconditionally before any early return ── */
  const [mainImg,         setMainImg]         = useState(0);
  const [qty,             setQty]             = useState(1);
  const [wishlist,        setWishlist]        = useState(false);
  const [activeTab,       setActiveTab]       = useState<"desc" | "details" | "reviews">("desc");
  const [selectedColor,   setSelectedColor]   = useState("Natural Titanium");
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [addedToCart,     setAddedToCart]     = useState(false);
  const [hoverStar,       setHoverStar]       = useState(0);
  const [reviewStar,      setReviewStar]      = useState(5);
  const [zoomOpen,        setZoomOpen]        = useState(false);
  const [zoomIndex,       setZoomIndex]       = useState(0);

  /* ── Early return AFTER all hooks ── */
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">😕</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Product not found</h2>
            <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const category        = categories.find((c) => c.id === product.categoryId);
  const theme           = CATEGORY_THEMES[product.categoryId] ?? DEFAULT_THEME;
  const vendor          = VENDOR_MAP[product.categoryId] ?? VENDOR_MAP.general;
  const relatedProducts = featuredProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 6);
  const discount        = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const images          = [product.image, product.image, product.image, product.image];

  const COLORS    = ["Natural Titanium", "Black Titanium", "White Titanium", "Blue Titanium"];
  const COLOR_HEX: Record<string, string> = {
    "Natural Titanium": "#c9bfaf",
    "Black Titanium":   "#2d2d2d",
    "White Titanium":   "#f0ebe4",
    "Blue Titanium":    "#4d7fa6",
  };
  const STORAGES  = ["128GB", "256GB", "512GB", "1TB"];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      shopId: vendor.shopId,
      shopName: vendor.shopName,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const openZoom = (index: number) => { setZoomIndex(index); setZoomOpen(true); };

  const vendorCheckoutUrl = `/checkout/verify?productId=${product.id}&vendorId=${vendor.shopId}&vendor=${encodeURIComponent(vendor.shopName)}`;

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: "'Nunito Sans', 'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* Zoom Lightbox */}
      {zoomOpen && (
        <ZoomLightbox
          images={images}
          activeIndex={zoomIndex}
          onClose={() => setZoomOpen(false)}
          onChangeIndex={setZoomIndex}
          theme={theme}
        />
      )}

      {/* ── BREADCRUMB ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-[1240px] mx-auto px-5 py-2.5 flex items-center gap-2 text-[13px] text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          {category && (
            <>
              <Link to={`/category/${category.slug}`} className="hover:text-blue-600 transition-colors">{category.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            </>
          )}
          <span className="font-semibold truncate max-w-xs" style={{ color: theme.primary }}>{product.name}</span>
        </div>
      </div>

      {/* ── PRODUCT MAIN ── */}
      <section className="py-9">
        <div className="max-w-[1240px] mx-auto px-5 flex gap-14 items-start flex-col md:flex-row">

          {/* Gallery */}
          <div className="w-full md:w-[480px] shrink-0">

            {/* Main image */}
            <div
              className="border border-gray-200 rounded-xl overflow-hidden relative group"
              style={{ background: "#f9fafb", cursor: "zoom-in" }}
              onClick={() => openZoom(mainImg)}
            >
              <img
                src={images[mainImg]} alt={product.name}
                className="w-full aspect-square object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              {discount > 0 && (
                <div className="absolute top-3.5 left-3.5 text-white text-xs font-extrabold px-2.5 py-1 rounded" style={{ background: "#ef4444" }}>
                  -{discount}% OFF
                </div>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); openZoom(mainImg); }}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
                style={{ background: "rgba(0,0,0,0.50)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <Search className="w-3.5 h-3.5" /> Zoom
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2.5 mt-3.5">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(i)}
                  onDoubleClick={() => openZoom(i)}
                  className="flex-1 aspect-square rounded-lg overflow-hidden border-2 transition-all p-2 flex items-center justify-center"
                  style={{ borderColor: mainImg === i ? theme.primary : "#e5e7eb", background: "#f9fafb" }}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-4 rounded-xl border border-gray-100 overflow-hidden">
              {[
                { icon: Shield,     label: "100% Authentic",        sub: "Verified & KYC-protected" },
                { icon: Truck,      label: "Free Home Delivery",     sub: "24–48 hrs, all major cities" },
                { icon: RefreshCw,  label: "7-Day Easy Returns",     sub: "No questions asked" },
                { icon: CreditCard, label: "0% Markup Installments", sub: "3, 6, 12 or 24 months" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0" style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: theme.light }}>
                    <Icon className="w-4 h-4" style={{ color: theme.primary }} />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-700 leading-tight">{label}</p>
                    <p className="text-[11px] text-gray-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info panel */}
          <div className="flex-1 pt-1">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight mb-2" style={{ fontFamily: "'Nunito', 'Space Grotesk', sans-serif" }}>
              {product.name}
            </h1>

            {/* Vendor badge */}
            <Link
              to={`/vendor/${vendor.shopId}`}
              className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-lg border transition-all hover:shadow-sm group"
              style={{ background: theme.light, borderColor: theme.accent + "60", textDecoration: "none" }}
            >
              <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0" style={{ background: theme.primary }}>
                <Store className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[13px] font-bold leading-none group-hover:underline" style={{ color: theme.primary }}>{vendor.shopName}</span>
                {vendor.verified && <BadgeCheck className="w-3.5 h-3.5 shrink-0" style={{ color: "#16a34a" }} />}
              </div>
              <span className="text-gray-300 text-[11px] mx-0.5">•</span>
              <span className="flex items-center gap-0.5 text-[11px] text-gray-400">
                <MapPin className="w-3 h-3" />{vendor.location}
              </span>
            </Link>

            <p className="text-[13px] text-gray-400 mb-3">
              <span className="font-semibold text-gray-500">Reference:</span> {product.id.toUpperCase()}-001
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2.5 mb-5">
              <Stars rating={product.rating} size={16} />
              <a href="#reviews" onClick={() => setActiveTab("reviews")} className="text-[13px] flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                <MessageSquare className="w-3.5 h-3.5" /> Read reviews ({product.reviews})
              </a>
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-baseline gap-2">
                <span className="text-[32px] font-black leading-none" style={{ color: theme.primary, fontFamily: "'Nunito', sans-serif" }}>
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through font-medium">{formatPrice(product.originalPrice)}</span>
                )}
                {discount > 0 && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-500 text-white">-{discount}%</span>
                )}
              </div>
              <p className="text-[13px] font-semibold mt-1.5 flex items-center gap-1.5" style={{ color: "#16a34a" }}>
                <BadgeCheck className="w-4 h-4" /> Available from {getMonthlyInstallment(product.price, 12)}/month — 0% markup installment
              </p>
            </div>

            {/* Description */}
            <div className="text-[14px] text-gray-500 leading-7 mb-5 pt-4 border-t border-gray-100">
              <p className="mb-2">{product.description}. Premium quality product with manufacturer warranty, fast nationwide delivery, and easy installment plans with 0% markup.</p>
              <ul className="mt-2 flex flex-col gap-1">
                {[
                  "Top-grade materials and certified build quality",
                  "Manufacturer tested — shipped in original packaging",
                  "Compatible with all standard accessories",
                  "Energy-efficient modern design",
                  "Backed by FlexiBerry's 7-day return policy",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-gray-500">
                    <span className="text-gray-300 font-bold">—</span> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Color */}
            <div className="mb-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                Color — <span className="text-gray-600">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color} title={color}
                    onClick={() => setSelectedColor(color)}
                    className="w-7 h-7 rounded-full border-2 transition-all"
                    style={{
                      background: COLOR_HEX[color],
                      borderColor: selectedColor === color ? theme.primary : "transparent",
                      outline: selectedColor === color ? `2px solid ${theme.primary}30` : "none",
                      outlineOffset: 2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Storage */}
            <div className="mb-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Storage</p>
              <div className="flex gap-2 flex-wrap">
                {STORAGES.map((s) => (
                  <button
                    key={s} onClick={() => setSelectedStorage(s)}
                    className="px-3.5 py-1.5 border-[1.5px] rounded-md text-[13px] font-semibold transition-all"
                    style={{
                      borderColor: selectedStorage === s ? theme.primary : "#e5e7eb",
                      color: selectedStorage === s ? theme.primary : "#555",
                      background: selectedStorage === s ? theme.light : "#fff",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Installment Plans */}
            <div className="rounded-xl p-4 mb-5 border" style={{ background: theme.light, borderColor: theme.accent + "60" }}>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4" style={{ color: theme.primary }} />
                <span className="text-[13px] font-bold" style={{ color: theme.primary }}>Installment Plans</span>
                <BadgeCheck className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {(product.installmentOptions || [3, 6, 12, 24]).map((months) => (
                  <div key={months} className="bg-white rounded-lg p-3 text-center border" style={{ borderColor: theme.accent + "40" }}>
                    <p className="text-[11px] text-gray-400 mb-1">{months} Months</p>
                    <p className="text-base font-black" style={{ color: theme.primary }}>{getMonthlyInstallment(product.price, months)}</p>
                    <p className="text-[10px] text-gray-400">per month</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Qty + Buy */}
            <div className="flex items-center gap-3.5 mb-5">
              <div className="flex items-center border-[1.5px] border-gray-200 rounded-lg overflow-hidden">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-11 flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-[15px] font-bold text-gray-800 border-l border-r border-gray-200 h-11 flex items-center justify-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-9 h-11 flex items-center justify-center bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Link
                to={vendorCheckoutUrl}
                onClick={handleAddToCart}
                className="flex-1 h-11 flex items-center justify-center gap-2 text-white text-[13px] font-black uppercase tracking-wide rounded-lg transition-all hover:opacity-90 hover:-translate-y-px active:scale-95"
                style={{
                  background: addedToCart ? "linear-gradient(135deg, #16a34a, #15803d)" : `linear-gradient(135deg, ${theme.primary}, ${theme.dark})`,
                  boxShadow: `0 6px 20px ${theme.primary}40`,
                  textDecoration: "none",
                }}
              >
                <CreditCard className="w-4 h-4" /> {addedToCart ? "✓ Redirecting…" : "Buy on Installment"}
              </Link>
            </div>

            <p className="text-[11px] text-gray-400 -mt-3 mb-4 flex items-center gap-1">
              <Store className="w-3 h-3" /> Verification form will be sent to{" "}
              <Link to={`/vendor/${vendor.shopId}`} className="font-semibold hover:underline" style={{ color: theme.primary }}>
                {vendor.shopName}
              </Link>
            </p>

            {/* Wishlist + Compare */}
            <div className="flex items-center gap-5 text-[13px] text-gray-500 mb-5">
              <button onClick={() => setWishlist(!wishlist)} className="flex items-center gap-1.5 transition-colors hover:text-red-500" style={{ color: wishlist ? "#ef4444" : undefined }}>
                <Heart className="w-4 h-4" style={{ fill: wishlist ? "#ef4444" : "none", color: wishlist ? "#ef4444" : undefined }} />
                {wishlist ? "In Wishlist" : "Add to wishlist"}
              </button>
              <span className="text-gray-200">|</span>
              <button className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                <RefreshCw className="w-4 h-4" /> Add to compare
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pb-5 border-b border-gray-100 mb-5">
              <span className="text-[13px] font-semibold text-gray-400">Share:</span>
              {[{ Icon: Facebook, bg: "#1877f2" }, { Icon: Twitter, bg: "#1da1f2" }, { Icon: Share2, bg: "#ea4335" }].map(({ Icon, bg }, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: bg }}>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-2.5">
              {[
                { icon: Shield,    text: "Secure Payment & 100% Authentic Products", sub: "Guaranteed by FlexiBerry" },
                { icon: Truck,     text: "Free Home Delivery within 24–48 hours",    sub: "All major cities covered" },
                { icon: RefreshCw, text: "7-Day Easy Returns",                       sub: "No questions asked" },
              ].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="flex items-center gap-3 text-[13px] text-gray-500 px-3.5 py-2.5 rounded-lg border border-gray-100 bg-gray-50">
                  <Icon className="w-[18px] h-[18px] shrink-0 text-gray-400" />
                  <span>{text} — <span className="text-gray-400">{sub}</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div className="border-t border-gray-100 py-8">
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="flex border-b-2 border-gray-200 mb-7 gap-0">
            {(["desc", "details", "reviews"] as const).map((tab, i) => {
              const labels = ["Description", "Product Details", `Reviews (${product.reviews})`];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-7 py-3 text-[15px] font-semibold transition-colors relative border-b-[3px] -mb-[2px]"
                  style={{ color: activeTab === tab ? theme.primary : "#888", borderBottomColor: activeTab === tab ? theme.primary : "transparent" }}
                >
                  {labels[i]}
                </button>
              );
            })}
          </div>

          {activeTab === "desc" && (
            <div className="max-w-3xl text-[14px] text-gray-500 leading-7 space-y-3">
              <p>The {product.name} is an outstanding product available exclusively at FlexiBerry. This product features top-grade build quality, manufacturer warranty, and is fully tested before dispatch. Available exclusively on easy installments through FlexiBerry's 0% markup plan.</p>
              <p>Pay in 3, 6, 12, or 24 monthly installments with zero interest. Apply in-store or online — approval within 24 hours. Fast nationwide delivery included free of charge on all orders over PKR 5,000.</p>
              <p>All products sold by FlexiBerry-verified vendors undergo strict quality checks. KYC-verified purchase process ensures complete security for every transaction.</p>
            </div>
          )}

          {activeTab === "details" && (
            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full border-collapse">
                <tbody>
                  {[
                    ["Name",          product.name],
                    ["Sold By",       vendor.shopName],
                    ["Vendor Location", vendor.location],
                    ["Category",      category?.name ?? "Electronics"],
                    ["Reference",     `${product.id.toUpperCase()}-001`],
                    ["Rating",        `${product.rating} / 5 (${product.reviews} reviews)`],
                    ["Price",         formatPrice(product.price)],
                    ["Installments",  `From ${getMonthlyInstallment(product.price, 12)}/month`],
                    ["Warranty",      "1 Year Manufacturer Warranty"],
                    ["Delivery",      "Free Nationwide — 24 to 48 hours"],
                    ["Return Policy", "7-Day Easy Returns"],
                    ["Authenticity",  "100% Verified — KYC Protected"],
                  ].map(([key, val], i) => (
                    <tr key={key} className="border-b border-gray-50 last:border-0">
                      <td className="px-5 py-3.5 text-[13px] font-semibold text-gray-500 w-48" style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>{key}</td>
                      <td className="px-5 py-3.5 text-[13px] text-gray-700" style={{ background: i % 2 === 0 ? "#fafafa" : "#fff" }}>
                        {key === "Sold By" ? (
                          <Link to={`/vendor/${vendor.shopId}`} className="font-semibold hover:underline" style={{ color: theme.primary }}>
                            {val} {vendor.verified && <BadgeCheck className="w-3.5 h-3.5 inline text-emerald-500 ml-1" />}
                          </Link>
                        ) : val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div id="reviews" className="grid md:grid-cols-5 gap-10">
              <div className="md:col-span-3">
                <div className="flex items-start gap-8 mb-6 pb-6 border-b border-gray-100">
                  <div className="text-center shrink-0">
                    <div className="text-5xl font-black leading-none mb-1" style={{ color: theme.primary, fontFamily: "'Nunito', sans-serif" }}>{product.rating}</div>
                    <Stars rating={product.rating} size={18} />
                    <p className="text-[11px] text-gray-400 mt-1">{product.reviews} Reviews</p>
                  </div>
                  <div className="flex-1">
                    {[[5, 80], [4, 15], [3, 5]].map(([star, pct]) => (
                      <div key={star} className="flex items-center gap-2.5 mb-2">
                        <span className="text-[12px] text-gray-500 w-5">{star}★</span>
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "#f59e0b" }} />
                        </div>
                        <span className="text-[11px] text-gray-400 w-5">{Math.round(product.reviews * (pct as number) / 100)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  {MOCK_REVIEWS.map((r, i) => (
                    <div key={i} className="flex gap-4 pb-5 border-b border-gray-100 last:border-0">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` }}>
                        {r.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <strong className="text-[14px] text-gray-800">{r.name}</strong>
                          <Stars rating={r.rating} size={13} />
                          <span className="text-[11px] text-gray-300">{r.date}</span>
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed">{r.comment}</p>
                        <button className="mt-1.5 text-[12px] hover:underline" style={{ color: theme.primary }}>Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-1 text-[15px]">Write a Review</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[12px] text-gray-400">Your rating:</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button key={s} onMouseEnter={() => setHoverStar(s)} onMouseLeave={() => setHoverStar(0)} onClick={() => setReviewStar(s)}>
                          <Star className="w-5 h-5 transition-colors" style={{ fill: s <= (hoverStar || reviewStar) ? "#f59e0b" : "#e5e7eb", color: s <= (hoverStar || reviewStar) ? "#f59e0b" : "#e5e7eb" }} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 mb-3">
                    <input className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-white outline-none focus:border-blue-400" placeholder="Your Name" />
                    <input className="border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-white outline-none focus:border-blue-400" placeholder="Your Email" />
                  </div>
                  <textarea rows={4} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] bg-white outline-none focus:border-blue-400 resize-none mb-3" placeholder="Share your experience with this product..." />
                  <button className="w-full py-3 rounded-xl text-white text-[13px] font-bold tracking-wide transition-all hover:opacity-90 hover:-translate-y-px active:scale-95" style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` }}>
                    SUBMIT REVIEW
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── YOU MIGHT ALSO LIKE ── */}
      {relatedProducts.length > 0 && (
        <section className="py-9 border-t border-gray-100 bg-white">
          <div className="max-w-[1240px] mx-auto px-5">
            <h2 className="text-[22px] font-extrabold text-gray-900 mb-1.5" style={{ fontFamily: "'Nunito', 'Space Grotesk', sans-serif" }}>You Might Also Like</h2>
            <div className="w-14 h-[3px] rounded-full mb-7" style={{ background: theme.primary }} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {relatedProducts.map((p) => {
                const pTheme = CATEGORY_THEMES[p.categoryId] ?? DEFAULT_THEME;
                const cat = categories.find((c) => c.id === p.categoryId);
                return (
                  <Link key={p.id} to={`/product/${p.id}`}>
                    <MiniCard image={p.image} brand={cat?.name ?? "FlexiBerry"} name={p.name} price={p.price} originalPrice={p.originalPrice} rating={p.rating} theme={pTheme} />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── RECENTLY VIEWED ── */}
      <section className="py-9 border-t-2 border-gray-100" style={{ background: "#fafafa" }}>
        <div className="max-w-[1240px] mx-auto px-5">
          <div className="flex items-center gap-2.5 mb-1.5">
            <Clock className="w-5 h-5" style={{ color: theme.primary }} />
            <h2 className="text-[22px] font-extrabold text-gray-900" style={{ fontFamily: "'Nunito', 'Space Grotesk', sans-serif" }}>Recently Viewed</h2>
          </div>
          <div className="w-14 h-[3px] rounded-full mb-7" style={{ background: theme.primary }} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {RECENTLY_VIEWED.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <MiniCard image={p.image} brand={p.brand} name={p.name} price={p.price} originalPrice={p.originalPrice} rating={p.rating} theme={DEFAULT_THEME} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full text-white flex items-center justify-center shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` }}
      >
        <ArrowUpToLine className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ProductDetail;
