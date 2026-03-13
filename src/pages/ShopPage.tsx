import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Search, Star, MapPin, Package, TrendingUp, Shield,
  ArrowUpRight, Zap, Store, ChevronRight, BadgeCheck,
  SlidersHorizontal, X, Sparkles, Grid3X3, List,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

/* ─────────────────── FlexiBerry Logo (from Header) ─────────────────── */
const FlexiBerryLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sLogoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
      <linearGradient id="sLogoSheen" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <filter id="sLogoShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.5"/>
      </filter>
    </defs>
    <g filter="url(#sLogoShadow)">
      <rect width="100" height="100" rx="26" fill="url(#sLogoGrad)"/>
      <rect width="100" height="100" rx="26" fill="url(#sLogoSheen)"/>
    </g>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#sLogoGrad)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#sLogoGrad)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#sLogoGrad)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#sLogoGrad)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#sLogoGrad)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#sLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#sLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#sLogoGrad)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      <circle cx="43" cy="92" r="2.2" fill="white" opacity="0.7"/>
      <circle cx="52" cy="92" r="2.2" fill="white" opacity="0.4"/>
      <circle cx="61" cy="92" r="2.2" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="26" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
  </svg>
);

/* ─────────────────── MOCK VENDOR DATA ─────────────────── */
const VENDORS = [
  {
    id: "techzone",
    name: "TechZone Electronics",
    category: "Electronics",
    categoryColor: "#2563eb",
    categoryBg: "rgba(37,99,235,0.10)",
    city: "Lahore",
    description: "Premium electronics & gadgets — phones, laptops, accessories & more.",
    rating: 4.8,
    reviews: 1240,
    products: 320,
    verified: true,
    featured: true,
    installments: true,
    emoji: "🔌",
    bannerGrad: "linear-gradient(135deg, #1d4ed8 0%, #7c3aed 100%)",
    joined: "2022",
  },
  {
    id: "homekart",
    name: "HomeKart Pakistan",
    category: "Home & Living",
    categoryColor: "#059669",
    categoryBg: "rgba(5,150,105,0.10)",
    city: "Karachi",
    description: "Appliances, furniture & packages — complete home solutions.",
    rating: 4.6,
    reviews: 875,
    products: 210,
    verified: true,
    featured: true,
    installments: true,
    emoji: "🏠",
    bannerGrad: "linear-gradient(135deg, #047857 0%, #0891b2 100%)",
    joined: "2021",
  },
  {
    id: "megadeal",
    name: "MegaDeal Motors",
    category: "Motors & Energy",
    categoryColor: "#7c3aed",
    categoryBg: "rgba(124,58,237,0.10)",
    city: "Islamabad",
    description: "Vehicles, solar & heavy items — all on easy installments.",
    rating: 4.7,
    reviews: 560,
    products: 95,
    verified: true,
    featured: true,
    installments: true,
    emoji: "🚗",
    bannerGrad: "linear-gradient(135deg, #6d28d9 0%, #db2777 100%)",
    joined: "2023",
  },
  {
    id: "solarpk",
    name: "SolarPK Solutions",
    category: "Solar & Energy",
    categoryColor: "#d97706",
    categoryBg: "rgba(217,119,6,0.10)",
    city: "Lahore",
    description: "Go green with premium solar panels & energy systems.",
    rating: 4.9,
    reviews: 420,
    products: 68,
    verified: true,
    featured: false,
    installments: true,
    emoji: "☀️",
    bannerGrad: "linear-gradient(135deg, #b45309 0%, #f59e0b 100%)",
    joined: "2023",
  },
  {
    id: "jazbajahez",
    name: "Jazba Jahez Store",
    category: "Jahez & Dowry",
    categoryColor: "#be185d",
    categoryBg: "rgba(190,24,93,0.10)",
    city: "Faisalabad",
    description: "Complete jahez packages — furniture, appliances & bedding bundles.",
    rating: 4.5,
    reviews: 980,
    products: 145,
    verified: true,
    featured: false,
    installments: true,
    emoji: "🎁",
    bannerGrad: "linear-gradient(135deg, #9d174d 0%, #7c3aed 100%)",
    joined: "2021",
  },
  {
    id: "bikeworld",
    name: "BikeWorld Pakistan",
    category: "Bikes & Scooters",
    categoryColor: "#0891b2",
    categoryBg: "rgba(8,145,178,0.10)",
    city: "Rawalpindi",
    description: "Honda, Yamaha & electric bikes — all models on installments.",
    rating: 4.4,
    reviews: 670,
    products: 87,
    verified: true,
    featured: false,
    installments: true,
    emoji: "🏍️",
    bannerGrad: "linear-gradient(135deg, #0e7490 0%, #1d4ed8 100%)",
    joined: "2022",
  },
  {
    id: "furniturehub",
    name: "Furniture Hub PK",
    category: "Furniture",
    categoryColor: "#92400e",
    categoryBg: "rgba(146,64,14,0.10)",
    city: "Multan",
    description: "Bedroom sets, sofas & office furniture — crafted with quality.",
    rating: 4.3,
    reviews: 340,
    products: 192,
    verified: false,
    featured: false,
    installments: false,
    emoji: "🛋️",
    bannerGrad: "linear-gradient(135deg, #78350f 0%, #92400e 100%)",
    joined: "2023",
  },
  {
    id: "mobilezone",
    name: "MobileZone Official",
    category: "Mobiles",
    categoryColor: "#2563eb",
    categoryBg: "rgba(37,99,235,0.10)",
    city: "Karachi",
    description: "Official reseller of Samsung, iPhone, Xiaomi & more brands.",
    rating: 4.7,
    reviews: 2100,
    products: 450,
    verified: true,
    featured: true,
    installments: true,
    emoji: "📱",
    bannerGrad: "linear-gradient(135deg, #1e40af 0%, #0891b2 100%)",
    joined: "2020",
  },
  {
    id: "rawstore",
    name: "RawStore Materials",
    category: "Raw Materials",
    categoryColor: "#374151",
    categoryBg: "rgba(55,65,81,0.10)",
    city: "Sialkot",
    description: "Construction & industrial raw materials at wholesale prices.",
    rating: 4.2,
    reviews: 210,
    products: 310,
    verified: false,
    featured: false,
    installments: false,
    emoji: "🧱",
    bannerGrad: "linear-gradient(135deg, #1f2937 0%, #374151 100%)",
    joined: "2024",
  },
];

const CATEGORIES = ["All", "Electronics", "Mobiles", "Home & Living", "Motors & Energy", "Solar & Energy", "Jahez & Dowry", "Bikes & Scooters", "Furniture", "Raw Materials"];
const CITIES     = ["All Cities", "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Sialkot"];

const PLATFORM_STATS = [
  { label: "Verified Sellers", value: "1,200+", icon: BadgeCheck, color: "#2563eb" },
  { label: "Products Listed", value: "85K+",   icon: Package,    color: "#7c3aed" },
  { label: "Happy Customers", value: "2.4M+",  icon: Star,       color: "#f59e0b" },
  { label: "Cities Covered",  value: "120+",   icon: MapPin,     color: "#10b981" },
];

/* ─────────────────── SHOP CARD ─────────────────── */
const ShopCard = ({ vendor, index, view }: { vendor: typeof VENDORS[0]; index: number; view: "grid" | "list" }) => {
  const [hovered, setHovered] = useState(false);

  if (view === "list") {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "white",
          borderRadius: "20px",
          border: `1.5px solid ${hovered ? "rgba(37,99,235,0.25)" : "rgba(37,99,235,0.08)"}`,
          boxShadow: hovered ? "0 12px 40px rgba(37,99,235,0.14), 0 2px 8px rgba(0,0,0,0.04)" : "0 2px 12px rgba(0,0,0,0.04)",
          padding: "20px 24px",
          display: "flex", alignItems: "center", gap: "20px",
          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "translateY(-2px)" : "none",
          animation: `cardIn 0.4s ease forwards`,
          animationDelay: `${Math.min(index * 50, 350)}ms`,
          opacity: 0,
          cursor: "pointer",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          flexWrap: "wrap",
        }}>
        {/* Logo */}
        <div style={{
          height: "60px", width: "60px", borderRadius: "16px", flexShrink: 0,
          background: vendor.bannerGrad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
        }}>{vendor.emoji}</div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: "160px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
              {vendor.name}
            </span>
            {vendor.verified && <BadgeCheck size={15} color="#2563eb" fill="rgba(37,99,235,0.15)"/>}
            {vendor.featured && (
              <span style={{
                fontSize: "9px", fontWeight: 800, padding: "2px 7px", borderRadius: "99px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)", color: "white",
              }}>FEATURED</span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, padding: "2px 9px", borderRadius: "99px", background: vendor.categoryBg, color: vendor.categoryColor }}>{vendor.category}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#64748b" }}>
              <MapPin size={11}/> {vendor.city}
            </span>
          </div>
          <p style={{ fontSize: "12px", color: "#64748b", margin: "6px 0 0", lineHeight: 1.5 }}>{vendor.description}</p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "24px", flexShrink: 0, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#f59e0b" }}>★ {vendor.rating}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>{vendor.reviews.toLocaleString()} reviews</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a" }}>{vendor.products}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Products</div>
          </div>
          {vendor.installments && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "13px", fontWeight: 800, color: "#2563eb" }}>⚡ Kisti</div>
              <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>Available</div>
            </div>
          )}
        </div>

        {/* CTA */}
        <Link to={`/store/${vendor.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <button style={{
            display: "flex", alignItems: "center", gap: "6px",
            padding: "10px 20px", borderRadius: "12px",
            background: hovered ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "transparent",
            border: `1.5px solid ${hovered ? "transparent" : "rgba(37,99,235,0.20)"}`,
            color: hovered ? "white" : "#2563eb",
            fontSize: "13px", fontWeight: 700,
            cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
            boxShadow: hovered ? "0 6px 20px rgba(37,99,235,0.35)" : "none",
            transition: "all 0.2s ease",
          }}>
            Visit Shop <ArrowUpRight size={14} strokeWidth={2.5}/>
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: "22px",
        border: `1.5px solid ${hovered ? "rgba(37,99,235,0.22)" : "rgba(37,99,235,0.07)"}`,
        boxShadow: hovered
          ? "0 20px 50px rgba(37,99,235,0.14), 0 6px 16px rgba(0,0,0,0.06)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "none",
        animation: `cardIn 0.4s ease forwards`,
        animationDelay: `${Math.min(index * 60, 400)}ms`,
        opacity: 0,
        cursor: "pointer",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex", flexDirection: "column",
      }}>

      {/* ── Banner ── */}
      <div style={{
        height: "100px", position: "relative",
        background: vendor.bannerGrad,
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", top: "-30px", right: "-20px" }}/>
        <div style={{ position: "absolute", width: "70px", height: "70px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", bottom: "-20px", right: "40px" }}/>
        <div style={{ position: "absolute", width: "50px", height: "50px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "10px", left: "30%"  }}/>

        {/* Dot grid */}
        <svg style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.12 }} width="160" height="100" viewBox="0 0 160 100">
          {Array.from({ length: 5 }).map((_, row) =>
            Array.from({ length: 8 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 22 + 11} r="1.5" fill="white"/>
            ))
          )}
        </svg>

        {/* Badges top-right */}
        <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" }}>
          {vendor.featured && (
            <span style={{
              fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "99px",
              background: "rgba(255,255,255,0.25)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.40)",
              color: "white", display: "flex", alignItems: "center", gap: "3px",
            }}>
              <Sparkles size={8}/> FEATURED
            </span>
          )}
          {vendor.installments && (
            <span style={{
              fontSize: "9px", fontWeight: 800, padding: "3px 8px", borderRadius: "99px",
              background: "rgba(255,255,255,0.20)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.35)",
              color: "white", display: "flex", alignItems: "center", gap: "3px",
            }}>
              <Zap size={8}/> KISTI
            </span>
          )}
        </div>

        {/* Large emoji */}
        <div style={{
          position: "absolute", bottom: "-20px", left: "20px",
          height: "52px", width: "52px", borderRadius: "16px",
          background: "white",
          boxShadow: "0 6px 20px rgba(0,0,0,0.20)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px",
          border: "2px solid white",
          transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1)",
        }}>{vendor.emoji}</div>

        {/* Verified */}
        {vendor.verified && (
          <div style={{
            position: "absolute", bottom: "-16px", left: "56px",
            height: "22px", width: "22px", borderRadius: "50%",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white",
            boxShadow: "0 2px 8px rgba(37,99,235,0.40)",
          }}>
            <BadgeCheck size={12} color="white" fill="transparent"/>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "28px 18px 18px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Name row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "6px" }}>
          <div>
            <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {vendor.name}
            </h3>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "5px", flexWrap: "wrap" }}>
              <span style={{
                fontSize: "11px", fontWeight: 700, padding: "2px 9px", borderRadius: "99px",
                background: vendor.categoryBg, color: vendor.categoryColor,
              }}>{vendor.category}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>
                <MapPin size={10}/> {vendor.city}
              </span>
            </div>
          </div>
          {/* Rating pill */}
          <div style={{
            display: "flex", alignItems: "center", gap: "3px",
            padding: "4px 9px", borderRadius: "99px",
            background: "rgba(245,158,11,0.10)",
            border: "1.5px solid rgba(245,158,11,0.20)",
            flexShrink: 0,
          }}>
            <Star size={11} fill="#f59e0b" color="#f59e0b"/>
            <span style={{ fontSize: "11px", fontWeight: 800, color: "#b45309" }}>{vendor.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "12px", color: "#64748b", lineHeight: 1.55,
          margin: "8px 0 14px", flex: 1,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {vendor.description}
        </p>

        {/* Stats strip */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: "0",
          borderTop: "1px solid rgba(37,99,235,0.07)",
          borderBottom: "1px solid rgba(37,99,235,0.07)",
          margin: "0 -2px 14px",
          padding: "10px 4px",
        }}>
          {[
            { val: vendor.products.toString(), label: "Products", color: "#2563eb" },
            { val: `${vendor.reviews >= 1000 ? (vendor.reviews / 1000).toFixed(1) + "k" : vendor.reviews}`, label: "Reviews", color: "#7c3aed" },
            { val: vendor.joined, label: "Since", color: "#10b981" },
          ].map((s, i) => (
            <div key={i} style={{
              textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(37,99,235,0.07)" : "none",
              padding: "0 4px",
            }}>
              <div style={{ fontSize: "14px", fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: "9px", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link to={`/store/${vendor.id}`} style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%", height: "40px", borderRadius: "12px",
            background: hovered ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "rgba(37,99,235,0.06)",
            border: `1.5px solid ${hovered ? "transparent" : "rgba(37,99,235,0.15)"}`,
            color: hovered ? "white" : "#2563eb",
            fontSize: "13px", fontWeight: 700,
            cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            boxShadow: hovered ? "0 8px 24px rgba(37,99,235,0.38)" : "none",
            transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}>
            Visit Shop
            <ArrowUpRight size={14} strokeWidth={2.5} style={{ transition: "transform 0.2s", transform: hovered ? "translate(2px,-2px)" : "none" }}/>
          </button>
        </Link>
      </div>
    </div>
  );
};

/* ─────────────────── MAIN PAGE ─────────────────── */
const ShopPage = () => {
  const [search, setSearch]         = useState("");
  const [activeCategory, setCategory] = useState("All");
  const [activeCity, setCity]       = useState("All Cities");
  const [verifiedOnly, setVerified] = useState(false);
  const [installOnly, setInstall]   = useState(false);
  const [sortBy, setSort]           = useState<"rating" | "products" | "reviews" | "newest">("rating");
  const [view, setView]             = useState<"grid" | "list">("grid");
  const [heroVisible, setHero]      = useState(false);

  useEffect(() => { const t = setTimeout(() => setHero(true), 80); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    let list = [...VENDORS];
    if (search.trim())          list = list.filter(v => v.name.toLowerCase().includes(search.toLowerCase()) || v.description.toLowerCase().includes(search.toLowerCase()) || v.city.toLowerCase().includes(search.toLowerCase()));
    if (activeCategory !== "All") list = list.filter(v => v.category === activeCategory);
    if (activeCity !== "All Cities") list = list.filter(v => v.city === activeCity);
    if (verifiedOnly)           list = list.filter(v => v.verified);
    if (installOnly)            list = list.filter(v => v.installments);

    list.sort((a, b) => {
      if (sortBy === "rating")   return b.rating - a.rating;
      if (sortBy === "products") return b.products - a.products;
      if (sortBy === "reviews")  return b.reviews - a.reviews;
      return b.joined.localeCompare(a.joined);
    });
    return list;
  }, [search, activeCategory, activeCity, verifiedOnly, installOnly, sortBy]);

  const featured = filtered.filter(v => v.featured);
  const rest     = filtered.filter(v => !v.featured);

  const activeFilterCount = [
    activeCategory !== "All",
    activeCity !== "All Cities",
    verifiedOnly,
    installOnly,
    sortBy !== "rating",
    !!search.trim(),
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch(""); setCategory("All"); setCity("All Cities");
    setVerified(false); setInstall(false); setSort("rating");
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* ── HERO SECTION ── */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 35%, #7c3aed 70%, #4c1d95 100%)",
        padding: "64px 16px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Animated orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-150px", right: "-100px", animation: "floatOrb 8s ease-in-out infinite" }}/>
          <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-80px", left: "10%", animation: "floatOrb 10s ease-in-out infinite 2s" }}/>
          <div style={{ position: "absolute", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(124,58,237,0.25)", top: "20%", left: "40%", filter: "blur(40px)" }}/>
          {/* Grid dots */}
          <svg style={{ position: "absolute", right: "5%", top: 0, opacity: 0.07 }} width="400" height="300" viewBox="0 0 400 300">
            {Array.from({ length: 12 }).map((_, row) =>
              Array.from({ length: 20 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 26 + 13} r="1.8" fill="white"/>
              ))
            )}
          </svg>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "99px",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)",
            marginBottom: "20px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(-8px)",
            transition: "all 0.5s ease",
          }}>
            <BadgeCheck size={13} color="rgba(255,255,255,0.9)"/>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              Verified Sellers
            </span>
          </div>

          {/* Headline + logo */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "24px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(16px)",
            transition: "all 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s",
          }}>
            <div>
              {/* Logo + title side-by-side */}
              <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "12px" }}>
                <div style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "20px",
                  padding: "8px",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
                  flexShrink: 0,
                }}>
                  <FlexiBerryLogo size={52}/>
                </div>
                <h1 style={{
                  color: "white", fontWeight: 900,
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  margin: 0, letterSpacing: "-0.04em", lineHeight: 1,
                  fontFamily: "'Space Grotesk', sans-serif",
                  textShadow: "0 4px 24px rgba(0,0,0,0.20)",
                }}>
                  All Shops
                </h1>
              </div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(14px,2vw,17px)", margin: 0, fontWeight: 500, maxWidth: "480px", lineHeight: 1.55 }}>
                {VENDORS.length} verified sellers • Shop with confidence on FlexiBerry
              </p>
            </div>

            {/* Platform stats */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px",
              opacity: heroVisible ? 1 : 0,
              transition: "all 0.55s ease 0.15s",
            }}>
              {PLATFORM_STATS.map(({ label, value, icon: Icon, color }) => (
                <div key={label} style={{
                  padding: "12px 16px", borderRadius: "16px",
                  background: "rgba(255,255,255,0.12)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  display: "flex", alignItems: "center", gap: "10px",
                  minWidth: "140px",
                }}>
                  <div style={{
                    height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={15} color="white" strokeWidth={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize: "16px", fontWeight: 900, color: "white", lineHeight: 1 }}>{value}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: "2px" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Search bar ── */}
          <div style={{
            marginTop: "32px",
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateY(12px)",
            transition: "all 0.55s ease 0.20s",
          }}>
            <div style={{ position: "relative", maxWidth: "600px" }}>
              <Search size={16} color="rgba(255,255,255,0.55)"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
              <input
                placeholder="Search shops by name, city, or category…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", height: "52px",
                  paddingLeft: "44px", paddingRight: search ? "44px" : "16px",
                  borderRadius: "16px",
                  border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.14)",
                  backdropFilter: "blur(16px)",
                  fontSize: "14px", fontWeight: 500, color: "white",
                  outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.5)"}
                onBlur={e  => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
                  cursor: "pointer", height: "26px", width: "26px",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                }}>
                  <X size={11} strokeWidth={3}/>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, right: 0, height: "40px",
          background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)",
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
        }}/>
      </section>

      {/* ── FILTERS TOOLBAR ── */}
      <div style={{ maxWidth: "1400px", margin: "-10px auto 0", padding: "0 16px 0" }}>
        <div style={{
          background: "white",
          borderRadius: "20px",
          border: "1.5px solid rgba(37,99,235,0.08)",
          boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
          padding: "16px 20px",
          display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center",
        }}>
          {/* Filter icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <div style={{
              height: "32px", width: "32px", borderRadius: "9px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(37,99,235,0.35)",
            }}>
              <SlidersHorizontal size={14} color="white" strokeWidth={2.5}/>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>Filter</span>
            {activeFilterCount > 0 && (
              <span style={{
                height: "18px", minWidth: "18px", borderRadius: "99px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                fontSize: "10px", fontWeight: 800, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
              }}>{activeFilterCount}</span>
            )}
          </div>

          <div style={{ width: "1px", height: "28px", background: "rgba(37,99,235,0.10)", flexShrink: 0 }}/>

          {/* Category pills (scrollable) */}
          <div style={{ display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none", flex: 1, minWidth: 0 }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat;
              return (
                <button key={cat} onClick={() => setCategory(cat)} style={{
                  padding: "6px 14px", borderRadius: "99px", flexShrink: 0,
                  fontSize: "12px", fontWeight: 700,
                  border: `1.5px solid ${active ? "#2563eb" : "rgba(37,99,235,0.12)"}`,
                  background: active ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "transparent",
                  color: active ? "white" : "#64748b",
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: active ? "0 4px 12px rgba(37,99,235,0.30)" : "none",
                  transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                }}>{cat}</button>
              );
            })}
          </div>

          <div style={{ width: "1px", height: "28px", background: "rgba(37,99,235,0.10)", flexShrink: 0 }}/>

          {/* Right side controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
            {/* City */}
            <select value={activeCity} onChange={e => setCity(e.target.value)} style={{
              height: "34px", padding: "0 10px", borderRadius: "10px",
              border: "1.5px solid rgba(37,99,235,0.15)",
              background: "#fafbff", fontSize: "12px", fontWeight: 600,
              color: "#374151", outline: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSort(e.target.value as any)} style={{
              height: "34px", padding: "0 10px", borderRadius: "10px",
              border: "1.5px solid rgba(37,99,235,0.15)",
              background: "#fafbff", fontSize: "12px", fontWeight: 600,
              color: "#374151", outline: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              <option value="rating">Top Rated</option>
              <option value="products">Most Products</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Newest</option>
            </select>

            {/* Verified toggle */}
            <button onClick={() => setVerified(!verifiedOnly)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              height: "34px", padding: "0 12px", borderRadius: "10px",
              border: `1.5px solid ${verifiedOnly ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
              background: verifiedOnly ? "rgba(37,99,235,0.08)" : "transparent",
              color: verifiedOnly ? "#2563eb" : "#64748b",
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.15s",
            }}>
              <BadgeCheck size={13} strokeWidth={2.5}/> Verified
            </button>

            {/* Kisti toggle */}
            <button onClick={() => setInstall(!installOnly)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              height: "34px", padding: "0 12px", borderRadius: "10px",
              border: `1.5px solid ${installOnly ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
              background: installOnly ? "rgba(37,99,235,0.08)" : "transparent",
              color: installOnly ? "#2563eb" : "#64748b",
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: "all 0.15s",
            }}>
              <Zap size={13} strokeWidth={2.5}/> Kisti
            </button>

            {/* Reset */}
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} style={{
                height: "34px", padding: "0 12px", borderRadius: "10px",
                border: "1.5px solid rgba(239,68,68,0.20)",
                background: "rgba(239,68,68,0.07)",
                color: "#ef4444", fontSize: "12px", fontWeight: 700,
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "flex", alignItems: "center", gap: "4px",
              }}>
                <X size={11} strokeWidth={3}/> Reset
              </button>
            )}

            {/* View toggle */}
            <div style={{
              display: "flex", borderRadius: "10px",
              border: "1.5px solid rgba(37,99,235,0.12)",
              overflow: "hidden",
            }}>
              {([["grid", Grid3X3], ["list", List]] as const).map(([mode, Icon]) => (
                <button key={mode} onClick={() => setView(mode)} style={{
                  height: "34px", width: "34px", border: "none",
                  background: view === mode ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "transparent",
                  color: view === mode ? "white" : "#94a3b8",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  <Icon size={14} strokeWidth={2}/>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 16px 60px" }}>

        {/* Results count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: 0 }}>
            Showing <span style={{ fontWeight: 800, color: "#0f172a" }}>{filtered.length}</span> shop{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </p>
        </div>

        {filtered.length === 0 ? (
          /* Empty state */
          <div style={{
            textAlign: "center", padding: "80px 24px",
            background: "white", borderRadius: "24px",
            border: "1.5px solid rgba(37,99,235,0.08)",
            boxShadow: "0 4px 24px rgba(37,99,235,0.06)",
          }}>
            <div style={{
              height: "80px", width: "80px", borderRadius: "24px",
              background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <Store size={36} color="#2563eb" strokeWidth={1.5}/>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.03em" }}>No shops found</p>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>Try adjusting your filters or search terms</p>
            <button onClick={resetFilters} style={{
              padding: "12px 32px", borderRadius: "14px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              border: "none", color: "white", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
            }}>Reset Filters</button>
          </div>
        ) : (
          <>
            {/* Featured shops */}
            {featured.length > 0 && activeCategory === "All" && !search && (
              <div style={{ marginBottom: "36px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <div style={{
                    height: "28px", width: "28px", borderRadius: "8px",
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Sparkles size={13} color="white" strokeWidth={2.5}/>
                  </div>
                  <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>Featured Shops</h2>
                  <span style={{
                    padding: "2px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                    background: "rgba(37,99,235,0.08)", color: "#2563eb",
                  }}>{featured.length} shops</span>
                </div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: view === "list" ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "18px",
                }}>
                  {featured.map((v, i) => <ShopCard key={v.id} vendor={v} index={i} view={view}/>)}
                </div>
              </div>
            )}

            {/* All / remaining shops */}
            {(rest.length > 0 || search || activeCategory !== "All") && (
              <div>
                {featured.length > 0 && activeCategory === "All" && !search && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                    <div style={{
                      height: "28px", width: "28px", borderRadius: "8px",
                      background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                      border: "1.5px solid rgba(37,99,235,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Store size={13} color="#2563eb" strokeWidth={2.5}/>
                    </div>
                    <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>All Shops</h2>
                    <span style={{
                      padding: "2px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                      background: "rgba(37,99,235,0.08)", color: "#2563eb",
                    }}>{rest.length} shops</span>
                  </div>
                )}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: view === "list" ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "18px",
                }}>
                  {(search || activeCategory !== "All" ? filtered : rest).map((v, i) => (
                    <ShopCard key={v.id} vendor={v} index={i} view={view}/>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── BECOME A VENDOR BANNER ── */}
        <div style={{
          marginTop: "56px",
          borderRadius: "28px",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 40%, #7c3aed 100%)",
          padding: "44px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "24px",
          position: "relative", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(37,99,235,0.30), 0 8px 24px rgba(124,58,237,0.20)",
        }}>
          {/* Background decoration */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-80px", right: "15%" }}/>
            <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-60px", right: "5%" }}/>
            <svg style={{ position: "absolute", right: "20%", top: 0, opacity: 0.06 }} width="300" height="200" viewBox="0 0 300 200">
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 14 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 26 + 13} r="1.8" fill="white"/>
                ))
              )}
            </svg>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px" }}>
              <div style={{
                background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                borderRadius: "16px", padding: "8px",
                border: "1.5px solid rgba(255,255,255,0.25)",
              }}>
                <FlexiBerryLogo size={44}/>
              </div>
              <div>
                <h2 style={{
                  color: "white", fontWeight: 900, fontSize: "clamp(20px, 3vw, 28px)",
                  margin: 0, letterSpacing: "-0.03em",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  Sell on FlexiBerry
                </h2>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", margin: "4px 0 0", fontWeight: 500 }}>
                  0% commission for your first 90 days · 1,200+ vendors already growing
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {[
                { icon: TrendingUp, text: "Reach 2.4M+ customers" },
                { icon: Zap,        text: "Installments built-in" },
                { icon: Shield,     text: "KYC verified payouts" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Icon size={13} color="rgba(255,255,255,0.75)"/>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "rgba(255,255,255,0.80)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>
            <Link to="/vendor/login" style={{ textDecoration: "none" }}>
              <button style={{
                padding: "14px 28px", borderRadius: "14px",
                background: "rgba(255,255,255,0.15)",
                border: "1.5px solid rgba(255,255,255,0.30)",
                backdropFilter: "blur(8px)",
                color: "white", fontSize: "14px", fontWeight: 700,
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "flex", alignItems: "center", gap: "6px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)"}>
                Vendor Login <ChevronRight size={15}/>
              </button>
            </Link>
            <button style={{
              padding: "14px 28px", borderRadius: "14px",
              background: "white",
              border: "none",
              color: "#2563eb", fontSize: "14px", fontWeight: 800,
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              display: "flex", alignItems: "center", gap: "6px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.20)",
              transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.02)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.20)"; }}>
              Register Free <ArrowUpRight size={15}/>
            </button>
          </div>
        </div>
      </main>

      <Footer/>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-20px, -15px) scale(1.04); }
          66%       { transform: translate(15px, -25px) scale(0.97); }
        }
        input::placeholder { color: rgba(255,255,255,0.40); }
        select { appearance: auto; }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default ShopPage;
