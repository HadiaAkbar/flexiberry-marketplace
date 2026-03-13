import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, Store, Zap, Home, X, MapPin, Phone, Mail, Lock, Eye, EyeOff, Package, Shield, TrendingUp, DollarSign, BarChart3, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { categories } from "@/data/products";
import { useCart } from "@/context/CartContext";

const marqueeItems = [
  { icon: "🔥", text: "0% Commission for first 90 days!" },
  { icon: "📱", text: "iPhone 15 Pro — Starting PKR 45,833/mo" },
  { icon: "🏍️", text: "Honda CD 70 on Easy Installments" },
  { icon: "🎉", text: "Jahez Packages — Bundle & Save 50%" },
  { icon: "☀️", text: "Solar Systems — Go Green Today" },
  { icon: "🚚", text: "Free Nationwide Delivery" },
];

const FlexiBerryLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hLogoGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="100%" stopColor="#8b5cf6"/>
      </linearGradient>
      <linearGradient id="hLogoSheen" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.22"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <filter id="hLogoShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#3b82f6" floodOpacity="0.5"/>
      </filter>
    </defs>
    <g filter="url(#hLogoShadow)">
      <rect width="100" height="100" rx="26" fill="url(#hLogoGrad)"/>
      <rect width="100" height="100" rx="26" fill="url(#hLogoSheen)"/>
    </g>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#hLogoGrad)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#hLogoGrad)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#hLogoGrad)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#hLogoGrad)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#hLogoGrad)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#hLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#hLogoGrad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#hLogoGrad)"/>
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

// ── VENDOR FORM — defined OUTSIDE Header to prevent remount on every keystroke ──
interface VendorFormProps {
  onClose: () => void;
  shopName: string; setShopName: (v: string) => void;
  ownerName: string; setOwnerName: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  city: string; setCity: (v: string) => void;
  email: string; setEmail: (v: string) => void;
  password: string; setPassword: (v: string) => void;
  category: string; setCategory: (v: string) => void;
  showPass: boolean; setShowPass: (v: boolean) => void;
  onSubmit: () => void;
}

const VendorForm = ({
  onClose, shopName, setShopName, ownerName, setOwnerName,
  phone, setPhone, city, setCity, email, setEmail,
  password, setPassword, category, setCategory,
  showPass, setShowPass, onSubmit,
}: VendorFormProps) => (
  <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "10px" }}>
    {/* Row 1 */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Shop Name</label>
        <div style={{ position: "relative" }}>
          <Store size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input value={shopName} onChange={e => setShopName(e.target.value)} placeholder="TechZone Electronics"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
        </div>
      </div>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Owner Name</label>
        <div style={{ position: "relative" }}>
          <User size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Muhammad Ali"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
        </div>
      </div>
    </div>
    {/* Row 2 */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Phone</label>
        <div style={{ position: "relative" }}>
          <Phone size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+92 3XX XXXXXXX"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
        </div>
      </div>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>City</label>
        <div style={{ position: "relative" }}>
          <MapPin size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="Lahore, Karachi…"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
        </div>
      </div>
    </div>
    {/* Category */}
    <div>
      <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Product Category</label>
      <div style={{ position: "relative" }}>
        <Package size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
        <select value={category} onChange={e => setCategory(e.target.value)}
          style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#fafbff", appearance: "none" }}>
          <option value="">Select a category…</option>
          <option value="phones">Mobiles & Phones</option>
          <option value="laptops">Laptops & Computers</option>
          <option value="appliances">Home Appliances</option>
          <option value="furniture">Furniture</option>
          <option value="bikes">Bikes & Scooters</option>
          <option value="solar">Solar & Energy</option>
          <option value="cars">Cars & Vehicles</option>
          <option value="jahez">Jahez & Dowry</option>
          <option value="raw-materials">Raw Materials</option>
          <option value="general">General / Other</option>
        </select>
      </div>
    </div>
    {/* Email + Password */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business Email</label>
        <div style={{ position: "relative" }}>
          <Mail size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="store@example.com"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
        </div>
      </div>
      <div>
        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "4px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Password</label>
        <div style={{ position: "relative" }}>
          <Lock size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}/>
          <input type={showPass ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters"
            style={{ width: "100%", height: "36px", paddingLeft: "28px", paddingRight: "30px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", background: "#fafbff" }}/>
          <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 0 }}>
            {showPass ? <EyeOff size={13}/> : <Eye size={13}/>}
          </button>
        </div>
      </div>
    </div>
    {/* Submit */}
    <button
      onClick={onSubmit}
      style={{
        width: "100%", height: "40px", borderRadius: "11px",
        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
        border: "none", cursor: "pointer",
        color: "white", fontSize: "13px", fontWeight: 700,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
        boxShadow: "0 6px 18px rgba(37,99,235,0.40)",
        transition: "all 0.2s ease",
        marginTop: "2px",
      }}>
      Create Vendor Account
      <ChevronRight size={14}/>
    </button>
    <p style={{ fontSize: "10px", color: "#94a3b8", textAlign: "center", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      By registering you agree to FlexiBerry's <Link to="#" style={{ color: "#2563eb" }}>Terms</Link> & <Link to="#" style={{ color: "#2563eb" }}>Vendor Policy</Link>. KYC required to activate payouts.
    </p>
  </div>
);

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [mobileVendorOpen, setMobileVendorOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  // Vendor form state lives here in Header, but VendorForm component is defined outside
  const [showPass, setShowPass] = useState(false);
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const vendorRef = useRef<HTMLDivElement>(null);
  const vendorBtnRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { cartCount } = useCart();

  // Shared vendor form props object
  const vendorFormProps = {
    shopName, setShopName,
    ownerName, setOwnerName,
    phone, setPhone,
    city, setCity,
    email, setEmail,
    password, setPassword,
    category, setCategory,
    showPass, setShowPass,
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (vendorRef.current && !vendorRef.current.contains(e.target as Node)) {
        setVendorOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const updatePos = () => {
      if (vendorBtnRef.current && vendorOpen) {
        const rect = vendorBtnRef.current.getBoundingClientRect();
        setDropdownPos({
          top: rect.bottom + 10,
          right: window.innerWidth - rect.right,
        });
      }
    };
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos);
    };
  }, [vendorOpen]);

  return (
    <header className="sticky top-0 z-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── MARQUEE TOP BAR ── */}
      <div className="relative overflow-hidden" style={{
        background: "linear-gradient(90deg, #1d1060 0%, #2563eb 40%, #7c3aed 70%, #1d1060 100%)",
        backgroundSize: "200% 100%",
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.07) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "marqueeShimmer 3s ease-in-out infinite",
        }}/>
        <div className="py-2 overflow-hidden">
          <div style={{ display: "flex", animation: "marquee 32s linear infinite", whiteSpace: "nowrap" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-8 text-white text-xs font-semibold tracking-wide" style={{ opacity: 0.95 }}>
                <span className="mr-1.5">{item.icon}</span>{item.text}
                <span className="mx-8 opacity-30">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN HEADER ── */}
      <div style={{
        background: "linear-gradient(180deg, #ffffff 0%, #fafbff 100%)",
        borderBottom: "1px solid rgba(37,99,235,0.10)",
        boxShadow: "0 4px 24px rgba(37,99,235,0.08), 0 1px 0 rgba(255,255,255,0.9) inset",
      }}>
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)", filter: "drop-shadow(0 4px 12px rgba(37,99,235,0.25))" }}
              className="group-hover:scale-110">
              <FlexiBerryLogo size={42} />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <div className="flex items-baseline gap-0.5">
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "-0.03em",
                }}>Flexi</span>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.35rem",
                  color: "#0f172a",
                  letterSpacing: "-0.03em",
                }}>Berry</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginTop: "1px" }}>
                Shop · Pay · Smile
              </span>
            </div>
          </Link>

          {/* ── SEARCH BAR ── */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative w-full" style={{ transition: "all 0.3s ease" }}>
              <div style={{
                position: "absolute", inset: "-2px", borderRadius: "16px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                opacity: searchFocused ? 1 : 0,
                transition: "opacity 0.25s ease",
                filter: "blur(6px)",
                zIndex: 0,
              }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <input
                  placeholder="Search products, brands and categories..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    width: "100%", height: "46px",
                    paddingLeft: "20px", paddingRight: "56px",
                    borderRadius: "14px",
                    border: searchFocused ? "1.5px solid rgba(37,99,235,0.5)" : "1.5px solid rgba(37,99,235,0.15)",
                    background: searchFocused ? "#fff" : "rgba(248,250,255,0.9)",
                    fontSize: "14px", color: "#0f172a", outline: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    boxShadow: searchFocused
                      ? "0 0 0 3px rgba(37,99,235,0.12), 0 4px 16px rgba(37,99,235,0.10)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.25s ease",
                  }}
                />
                <button style={{
                  position: "absolute", right: "5px", top: "5px",
                  height: "36px", width: "36px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 12px rgba(37,99,235,0.40), inset 0 1px 0 rgba(255,255,255,0.25)",
                  transition: "all 0.2s ease",
                }}>
                  <Search size={15} color="white" strokeWidth={2.5}/>
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 ml-auto">
            <Link to="/login" className="hidden sm:flex">
              <button style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "9px 16px", borderRadius: "12px",
                background: "transparent",
                border: "1.5px solid rgba(37,99,235,0.15)",
                cursor: "pointer", fontSize: "13px", fontWeight: 600,
                color: "#374151",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(37,99,235,0.4)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(37,99,235,0.05)";
                (e.currentTarget as HTMLButtonElement).style.color = "#2563eb";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(37,99,235,0.15)";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#374151";
              }}>
                <div style={{
                  height: "26px", width: "26px", borderRadius: "8px",
                  background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User size={13} color="#2563eb" strokeWidth={2.5}/>
                </div>
                Login
              </button>
            </Link>

            <Link to="/wishlist">
              <button style={{
                height: "42px", width: "42px", borderRadius: "12px",
                background: "transparent", border: "1.5px solid rgba(37,99,235,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#94a3b8",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "#fff0f3";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(239,68,68,0.3)";
                (e.currentTarget as HTMLButtonElement).style.color = "#ef4444";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(37,99,235,0.12)";
                (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
                (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}>
                <Heart size={17} strokeWidth={2}/>
              </button>
            </Link>

            <Link to="/cart">
              <button style={{
                position: "relative",
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "13px",
                background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                border: "none", cursor: "pointer",
                fontSize: "13px", fontWeight: 700, color: "white",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: "0 6px 20px rgba(37,99,235,0.45), 0 2px 6px rgba(124,58,237,0.30), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.12)",
                transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                letterSpacing: "-0.01em",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.03)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 10px 28px rgba(37,99,235,0.55), 0 4px 10px rgba(124,58,237,0.35), inset 0 1px 0 rgba(255,255,255,0.28)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.45), 0 2px 6px rgba(124,58,237,0.30), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.12)";
              }}>
                <ShoppingCart size={16} strokeWidth={2.5}/>
                <span className="hidden sm:inline">Cart</span>
                <span style={{
                  position: "absolute", top: "-7px", right: "-7px",
                  height: "20px", width: "20px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #f97316, #ef4444)",
                  fontSize: "10px", fontWeight: 800, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "2px solid white",
                  boxShadow: "0 2px 6px rgba(239,68,68,0.50)",
                }}>{cartCount}</span>
              </button>
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                height: "42px", width: "42px", borderRadius: "12px",
                background: menuOpen ? "rgba(37,99,235,0.08)" : "transparent",
                border: "1.5px solid rgba(37,99,235,0.12)",
                cursor: "pointer", color: "#64748b",
                transition: "all 0.2s ease",
              }}>
              <Menu size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {/* ── CATEGORY NAV (desktop) ── */}
        <div className="hidden md:block" style={{ borderTop: "1px solid rgba(37,99,235,0.07)" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1">

              {/* All Categories pill */}
              <div className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}>
                <button style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "10px 20px",
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  border: "none", cursor: "pointer",
                  fontSize: "13px", fontWeight: 700, color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  borderRadius: "0 0 14px 0",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.35), inset 0 1px 0 rgba(255,255,255,0.20)",
                  letterSpacing: "-0.01em",
                  transition: "all 0.2s ease",
                }}>
                  <Menu size={15} strokeWidth={2.5}/>
                  All Categories
                  <ChevronDown size={13} strokeWidth={2.5} style={{ transition: "transform 0.2s ease", transform: catOpen ? "rotate(180deg)" : "rotate(0deg)" }}/>
                </button>

                {catOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0,
                    background: "white",
                    borderRadius: "0 16px 16px 16px",
                    boxShadow: "0 20px 60px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(37,99,235,0.10)",
                    width: "260px", zIndex: 50, overflow: "hidden",
                    animation: "dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    {categories.map((cat, i) => (
                      <Link key={cat.id} to={`/category/${cat.slug}`}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "10px 16px",
                          fontSize: "13px", fontWeight: 600, color: "#374151",
                          textDecoration: "none",
                          borderBottom: i < categories.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(90deg, #eff6ff, #f5f3ff)";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
                          (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "20px";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                          (e.currentTarget as HTMLAnchorElement).style.color = "#374151";
                          (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "16px";
                        }}>
                        <div style={{
                          height: "30px", width: "30px", borderRadius: "9px", flexShrink: 0,
                          background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 2px 6px rgba(37,99,235,0.12)",
                        }}>
                          <cat.icon className="h-4 w-4" style={{ color: "#2563eb" }}/>
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "13px" }}>{cat.name}</div>
                          <div style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{cat.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Nav links */}
              {[
                { label: "🏠 Home", href: "/" },
                { label: "⚡ Flash Sale", href: "/flash-sale" },
                { label: "✨ New Arrivals", href: "/new-arrivals" },
              ].map((item) => (
                <Link key={item.label} to={item.href}
                  style={{
                    padding: "10px 16px", fontSize: "13px", fontWeight: 600,
                    color: location.pathname === item.href ? "#2563eb" : "#475569",
                    textDecoration: "none", borderRadius: "10px",
                    background: location.pathname === item.href ? "rgba(37,99,235,0.07)" : "transparent",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = location.pathname === item.href ? "#2563eb" : "#475569";
                    (e.currentTarget as HTMLAnchorElement).style.background = location.pathname === item.href ? "rgba(37,99,235,0.07)" : "transparent";
                  }}>
                  {item.label}
                </Link>
              ))}

              {/* ── SELL AS VENDOR DROPDOWN (desktop) ── */}
              <div className="relative" ref={vendorRef}>
                <button
                  ref={vendorBtnRef}
                  onClick={() => setVendorOpen(!vendorOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "8px 14px", fontSize: "13px", fontWeight: 700,
                    borderRadius: "10px", cursor: "pointer",
                    border: vendorOpen ? "1.5px solid rgba(37,99,235,0.4)" : "1.5px solid rgba(37,99,235,0.20)",
                    background: vendorOpen ? "rgba(37,99,235,0.06)" : "transparent",
                    color: "#2563eb",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "all 0.2s ease",
                  }}>
                  <Store size={14} strokeWidth={2.5}/>
                  Sell as Vendor
                  <ChevronDown size={12} strokeWidth={2.5} style={{ transition: "transform 0.2s ease", transform: vendorOpen ? "rotate(180deg)" : "rotate(0deg)" }}/>
                </button>

                {vendorOpen && (
                  <div style={{
                    position: "fixed", top: dropdownPos.top, right: dropdownPos.right,
                    width: "520px", background: "white", borderRadius: "20px",
                    boxShadow: "0 24px 64px rgba(37,99,235,0.18), 0 4px 16px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(37,99,235,0.12)",
                    zIndex: 100, overflow: "hidden",
                    maxHeight: "80vh",
                    animation: "dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    {/* Header strip */}
                    <div style={{
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                      padding: "16px 20px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{
                          height: "36px", width: "36px", borderRadius: "10px",
                          background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Store size={18} color="white" strokeWidth={2.5}/>
                        </div>
                        <div>
                          <p style={{ color: "white", fontWeight: 800, fontSize: "14px", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Register Your Shop</p>
                          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", margin: 0 }}>Start selling on FlexiBerry today</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Link
                          to="/vendor/login"
                          onClick={() => setVendorOpen(false)}
                          style={{
                            fontSize: "11px", fontWeight: 700, color: "white",
                            background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                            padding: "5px 12px", borderRadius: "8px", textDecoration: "none",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}>
                          Already registered? Login →
                        </Link>
                        <button onClick={() => setVendorOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)", padding: "4px" }}>
                          <X size={16}/>
                        </button>
                      </div>
                    </div>

                    {/* Perks row */}
                    <div style={{ overflowY: "auto", maxHeight: "calc(80vh - 68px)" }}>
                      <div style={{
                        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "0", borderBottom: "1px solid rgba(37,99,235,0.08)",
                      }}>
                        {[
                          { icon: DollarSign, label: "Earn More" },
                          { icon: TrendingUp, label: "Grow Faster" },
                          { icon: Shield, label: "KYC Secure" },
                          { icon: BarChart3, label: "Live Stats" },
                        ].map(({ icon: Icon, label }, i) => (
                          <div key={label} style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                            padding: "10px 8px",
                            borderRight: i < 3 ? "1px solid rgba(37,99,235,0.07)" : "none",
                            background: "rgba(248,250,255,0.8)",
                          }}>
                            <div style={{
                              height: "28px", width: "28px", borderRadius: "8px",
                              background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                              <Icon size={13} color="#2563eb" strokeWidth={2.5}/>
                            </div>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
                          </div>
                        ))}
                      </div>
                      <VendorForm
                        {...vendorFormProps}
                        onClose={() => setVendorOpen(false)}
                        onSubmit={() => { setVendorOpen(false); navigate("/vendor"); }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Installment pill */}
              <div className="ml-auto">
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 18px", borderRadius: "50px",
                  background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)",
                  border: "1.5px solid rgba(37,99,235,0.18)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.80), 0 2px 8px rgba(37,99,235,0.08)",
                }}>
                  <div style={{
                    height: "22px", width: "22px", borderRadius: "7px", flexShrink: 0,
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 3px 8px rgba(37,99,235,0.40)",
                  }}>
                    <Zap size={12} color="white" strokeWidth={2.5} fill="white"/>
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 700,
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    letterSpacing: "-0.01em",
                  }}>Shop Now · Pay in Installments</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div style={{
          background: "white",
          borderBottom: "1px solid rgba(37,99,235,0.08)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}>
          <div className="p-4">

            {/* Search */}
            <div className="relative mb-4">
              <input
                placeholder="Search..."
                style={{
                  width: "100%", height: "44px", paddingLeft: "16px", paddingRight: "48px",
                  borderRadius: "12px", border: "1.5px solid rgba(37,99,235,0.15)",
                  background: "#f8faff", fontSize: "14px", outline: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box",
                }}
              />
              <Search size={16} color="#94a3b8" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}/>
            </div>

            {/* ── SECTION: Quick Links ── */}
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: "6px", paddingLeft: "4px" }}>
              Quick Links
            </p>

            {/* Home */}
            <Link to="/" onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700,
                color: isHome ? "#2563eb" : "#374151",
                background: isHome ? "rgba(37,99,235,0.07)" : "transparent",
                textDecoration: "none", marginBottom: "2px",
              }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                background: isHome ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "linear-gradient(135deg, #eff6ff, #eef2ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Home size={15} strokeWidth={2.5} color={isHome ? "white" : "#2563eb"}/>
              </div>
              Home
            </Link>

            {/* Flash Sale */}
            <Link to="/flash-sale" onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700,
                color: location.pathname === "/flash-sale" ? "#ef4444" : "#374151",
                background: location.pathname === "/flash-sale" ? "rgba(239,68,68,0.07)" : "transparent",
                textDecoration: "none", marginBottom: "2px",
              }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                background: location.pathname === "/flash-sale"
                  ? "linear-gradient(135deg, #ef4444, #f97316)"
                  : "linear-gradient(135deg, #fff5f5, #fff1eb)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Zap size={15} strokeWidth={2.5}
                  color={location.pathname === "/flash-sale" ? "white" : "#ef4444"}
                  fill={location.pathname === "/flash-sale" ? "white" : "none"}/>
              </div>
              ⚡ Flash Sale
              <span style={{
                marginLeft: "auto", fontSize: "9px", fontWeight: 800,
                background: "linear-gradient(135deg, #ef4444, #f97316)",
                color: "white", padding: "2px 8px", borderRadius: "99px",
              }}>HOT</span>
            </Link>

            {/* New Arrivals */}
            <Link to="/new-arrivals" onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700,
                color: location.pathname === "/new-arrivals" ? "#7c3aed" : "#374151",
                background: location.pathname === "/new-arrivals" ? "rgba(124,58,237,0.07)" : "transparent",
                textDecoration: "none", marginBottom: "2px",
              }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                background: location.pathname === "/new-arrivals"
                  ? "linear-gradient(135deg, #7c3aed, #2563eb)"
                  : "linear-gradient(135deg, #f5f3ff, #eff6ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: "15px", lineHeight: 1 }}>✨</span>
              </div>
              New Arrivals
              <span style={{
                marginLeft: "auto", fontSize: "9px", fontWeight: 800,
                background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                color: "white", padding: "2px 8px", borderRadius: "99px",
              }}>NEW</span>
            </Link>

            {/* ── SECTION: Categories (horizontal scrollable) ── */}
            <div style={{ height: "1px", background: "rgba(37,99,235,0.07)", margin: "12px 0 10px" }}/>
            <p style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.10em", textTransform: "uppercase", marginBottom: "8px", paddingLeft: "4px" }}>
              Categories
            </p>
            <div style={{
              display: "flex", gap: "8px",
              overflowX: "auto", paddingBottom: "10px",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(37,99,235,0.35) rgba(37,99,235,0.07)",
              WebkitOverflowScrolling: "touch",
            }}>
              {categories.map((cat) => (
                <Link key={cat.id} to={`/category/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                    padding: "10px 14px", borderRadius: "14px", flexShrink: 0,
                    background: "linear-gradient(135deg, #f8faff, #f0f4ff)",
                    border: "1.5px solid rgba(37,99,235,0.10)",
                    textDecoration: "none", minWidth: "72px",
                  }}>
                  <div style={{
                    height: "36px", width: "36px", borderRadius: "10px",
                    background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(37,99,235,0.12)",
                  }}>
                    <cat.icon className="h-4 w-4" style={{ color: "#2563eb" }}/>
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#374151", textAlign: "center", lineHeight: 1.2, whiteSpace: "nowrap" }}>
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>

            {/* ── SECTION: Vendor ── */}
            <div style={{ height: "1px", background: "rgba(37,99,235,0.07)", margin: "10px 0" }}/>

            {/* Sell as Vendor — toggles inline registration panel */}
            <button
              onClick={() => setMobileVendorOpen(!mobileVendorOpen)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700, color: "#2563eb",
                background: mobileVendorOpen ? "rgba(37,99,235,0.07)" : "transparent",
                border: "none", cursor: "pointer", width: "100%",
                textAlign: "left", marginBottom: "2px",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                background: mobileVendorOpen
                  ? "linear-gradient(135deg, #2563eb, #7c3aed)"
                  : "linear-gradient(135deg, #eff6ff, #eef2ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Store size={15} strokeWidth={2.5} color={mobileVendorOpen ? "white" : "#2563eb"}/>
              </div>
              Sell as Vendor
              <ChevronDown size={14} strokeWidth={2.5} style={{
                marginLeft: "auto",
                transition: "transform 0.2s ease",
                transform: mobileVendorOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}/>
            </button>

            {/* ── INLINE MOBILE VENDOR REGISTRATION PANEL ── */}
            {mobileVendorOpen && (
              <div style={{
                borderRadius: "16px",
                border: "1.5px solid rgba(37,99,235,0.12)",
                overflow: "hidden",
                marginBottom: "4px",
                animation: "dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
              }}>
                {/* Panel header */}
                <div style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  padding: "14px 16px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      height: "32px", width: "32px", borderRadius: "9px",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Store size={16} color="white" strokeWidth={2.5}/>
                    </div>
                    <div>
                      <p style={{ color: "white", fontWeight: 800, fontSize: "13px", margin: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Register Your Shop</p>
                      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", margin: 0 }}>Start selling on FlexiBerry today</p>
                    </div>
                  </div>
                  <Link
                    to="/vendor/login"
                    onClick={() => { setMobileVendorOpen(false); setMenuOpen(false); }}
                    style={{
                      fontSize: "10px", fontWeight: 700, color: "white",
                      background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                      padding: "4px 10px", borderRadius: "7px", textDecoration: "none",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", whiteSpace: "nowrap",
                    }}>
                    Login →
                  </Link>
                </div>

                {/* Perks strip */}
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                  background: "rgba(248,250,255,0.9)",
                  borderBottom: "1px solid rgba(37,99,235,0.08)",
                }}>
                  {[
                    { icon: DollarSign, label: "Earn More" },
                    { icon: TrendingUp, label: "Grow Faster" },
                    { icon: Shield, label: "KYC Secure" },
                    { icon: BarChart3, label: "Live Stats" },
                  ].map(({ icon: Icon, label }, i) => (
                    <div key={label} style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
                      padding: "8px 4px",
                      borderRight: i < 3 ? "1px solid rgba(37,99,235,0.07)" : "none",
                    }}>
                      <div style={{
                        height: "24px", width: "24px", borderRadius: "7px",
                        background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={11} color="#2563eb" strokeWidth={2.5}/>
                      </div>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#374151", fontFamily: "'Plus Jakarta Sans', sans-serif", textAlign: "center" }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* Registration form */}
                <div style={{ background: "white" }}>
                  <VendorForm
                    {...vendorFormProps}
                    onClose={() => { setMobileVendorOpen(false); setMenuOpen(false); }}
                    onSubmit={() => { setMobileVendorOpen(false); setMenuOpen(false); navigate("/vendor"); }}
                  />
                </div>
              </div>
            )}

            {/* Login / Register */}
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700, color: "#374151",
                textDecoration: "none",
              }}>
              <div style={{
                height: "32px", width: "32px", borderRadius: "10px", flexShrink: 0,
                background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <User size={15} strokeWidth={2.5} color="#2563eb"/>
              </div>
              Login / Register
            </Link>

          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeShimmer {
          0%, 100% { background-position: -200% 0; }
          50%       { background-position: 200% 0; }
        }
        @keyframes dropIn {
          0%   { opacity: 0; transform: translateY(-8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
};

export default Header;
