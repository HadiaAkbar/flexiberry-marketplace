import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart, Store, Zap, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { categories, featuredProducts } from "@/data/products";
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

/* ── Highlight matched letters in result ── */
const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "rgba(37,99,235,0.13)", color: "#2563eb", borderRadius: 3, padding: "0 1px", fontWeight: 700 }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
};

/* ── Search dropdown ── */
const SearchDropdown = ({
  query,
  onClose,
}: {
  query: string;
  onClose: () => void;
}) => {
  const q = query.trim().toLowerCase();

  const matchedProducts = featuredProducts
    .filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    )
    .slice(0, 5);

  const matchedCategories = categories
    .filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
    )
    .slice(0, 3);

  const hasResults = matchedProducts.length > 0 || matchedCategories.length > 0;

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
      background: "white",
      borderRadius: "16px",
      border: "1.5px solid rgba(37,99,235,0.15)",
      boxShadow: "0 20px 60px rgba(37,99,235,0.14), 0 4px 16px rgba(0,0,0,0.08)",
      zIndex: 100,
      overflow: "hidden",
      animation: "dropIn 0.18s cubic-bezier(0.34,1.56,0.64,1)",
    }}>

      {/* Categories section */}
      {matchedCategories.length > 0 && (
        <div>
          <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Categories
          </div>
          {matchedCategories.map(cat => (
            <Link
              key={cat.id}
              to={`/category/${cat.slug}`}
              onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "8px 16px", textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{
                height: 28, width: 28, borderRadius: 8, flexShrink: 0,
                background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <cat.icon className="h-3.5 w-3.5" style={{ color: "#2563eb" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>
                  <Highlight text={cat.name} query={query} />
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8" }}>{cat.description}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Divider */}
      {matchedCategories.length > 0 && matchedProducts.length > 0 && (
        <div style={{ height: 1, background: "rgba(37,99,235,0.07)", margin: "4px 0" }} />
      )}

      {/* Products section */}
      {matchedProducts.length > 0 && (
        <div>
          <div style={{ padding: "10px 16px 6px", fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Products
          </div>
          {matchedProducts.map(product => {
            const discount = product.originalPrice
              ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              : 0;
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "8px 16px", textDecoration: "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f0f7ff")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                {/* Thumbnail */}
                <div style={{
                  height: 38, width: 38, borderRadius: 9, flexShrink: 0,
                  background: "#f1f5f9", overflow: "hidden",
                  border: "1px solid rgba(37,99,235,0.08)",
                }}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📦</div>
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    <Highlight text={product.name} query={query} />
                  </div>
                  <div style={{ fontSize: 11, color: "#94a3b8" }}>{product.description}</div>
                </div>

                {/* Price + discount */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>
                    PKR {product.price.toLocaleString()}
                  </div>
                  {discount > 0 && (
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: "#ef4444",
                      background: "#fef2f2", borderRadius: 4, padding: "1px 5px", display: "inline-block",
                    }}>
                      -{discount}%
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* No results */}
      {!hasResults && (
        <div style={{ padding: "20px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>🔍</div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#64748b" }}>No results for "{query}"</p>
          <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Try different keywords</p>
        </div>
      )}

      {/* Footer — view all */}
      {hasResults && (
        <div style={{ borderTop: "1px solid rgba(37,99,235,0.07)", padding: "8px 16px" }}>
          <Link
            to={`/products`}
            onClick={onClose}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              fontSize: 12, fontWeight: 700, color: "#2563eb", textDecoration: "none",
              padding: "6px", borderRadius: 8, transition: "background 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Search size={13} />
            View all results for "{query}"
          </Link>
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [catOpen, setCatOpen]         = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate  = useNavigate();
  const { cartCount } = useCart();

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    setShowDropdown(val.trim().length >= 1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setShowDropdown(false);
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
      setSearchQuery("");
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
    setSearchQuery("");
  };

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
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.35rem",
                  background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  letterSpacing: "-0.03em",
                }}>Flexi</span>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.35rem",
                  color: "#0f172a", letterSpacing: "-0.03em",
                }}>Berry</span>
              </div>
              <span style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.12em", color: "#94a3b8", textTransform: "uppercase", marginTop: "1px" }}>
                Shop · Pay · Smile
              </span>
            </div>
          </Link>

          {/* ── SEARCH BAR ── */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div ref={searchRef} className="relative w-full" style={{ transition: "all 0.3s ease" }}>
              {/* Glow ring */}
              <div style={{
                position: "absolute", inset: "-2px", borderRadius: "16px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                opacity: searchFocused ? 1 : 0,
                transition: "opacity 0.25s ease",
                filter: "blur(6px)", zIndex: 0,
              }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    setSearchFocused(true);
                    if (searchQuery.trim().length >= 1) setShowDropdown(true);
                  }}
                  onBlur={() => setSearchFocused(false)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search products, brands and categories..."
                  style={{
                    width: "100%", height: "46px",
                    paddingLeft: "20px", paddingRight: searchQuery ? "88px" : "56px",
                    borderRadius: "14px",
                    border: searchFocused ? "1.5px solid rgba(37,99,235,0.5)" : "1.5px solid rgba(37,99,235,0.15)",
                    background: searchFocused ? "#fff" : "rgba(248,250,255,0.9)",
                    fontSize: "14px", color: "#0f172a", outline: "none",
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500,
                    boxShadow: searchFocused
                      ? "0 0 0 3px rgba(37,99,235,0.12), 0 4px 16px rgba(37,99,235,0.10)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.25s ease",
                  }}
                />

                {/* Clear button — shown when there's text */}
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setShowDropdown(false); }}
                    style={{
                      position: "absolute", right: "46px", top: "50%", transform: "translateY(-50%)",
                      background: "none", border: "none", cursor: "pointer",
                      color: "#94a3b8", padding: "4px", display: "flex", alignItems: "center",
                    }}
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Search button */}
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setShowDropdown(false);
                      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
                    }
                  }}
                  style={{
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

              {/* ── SUGGESTIONS DROPDOWN ── */}
              {showDropdown && searchQuery.trim().length >= 1 && (
                <SearchDropdown query={searchQuery} onClose={closeDropdown} />
              )}
            </div>
          </div>

          {/* ── RIGHT ACTIONS ── */}
          <div className="flex items-center gap-2 ml-auto">

            <Link to="/login" className="hidden sm:flex">
              <button style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "9px 16px", borderRadius: "12px",
                background: "transparent", border: "1.5px solid rgba(37,99,235,0.15)",
                cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#374151",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.2s ease",
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
                cursor: "pointer", color: "#94a3b8", transition: "all 0.2s ease",
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
                  transition: "transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: cartCount > 0 ? "scale(1)" : "scale(0.85)",
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
                cursor: "pointer", color: "#64748b", transition: "all 0.2s ease",
              }}>
              <Menu size={18} strokeWidth={2}/>
            </button>
          </div>
        </div>

        {/* ── CATEGORY NAV ── */}
        <div className="hidden md:block" style={{ borderTop: "1px solid rgba(37,99,235,0.07)" }}>
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1">

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
                  letterSpacing: "-0.01em", transition: "all 0.2s ease",
                }}>
                  <Menu size={15} strokeWidth={2.5}/>
                  All Categories
                  <ChevronDown size={13} strokeWidth={2.5} style={{ transition: "transform 0.2s ease", transform: catOpen ? "rotate(180deg)" : "rotate(0deg)" }}/>
                </button>

                {catOpen && (
                  <div style={{
                    position: "absolute", top: "100%", left: 0,
                    background: "white", borderRadius: "0 16px 16px 16px",
                    boxShadow: "0 20px 60px rgba(37,99,235,0.15), 0 4px 16px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(37,99,235,0.10)",
                    width: "260px", zIndex: 50, overflow: "hidden",
                    animation: "dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                  }}>
                    {categories.map((cat, i) => (
                      <Link key={cat.id} to={`/category/${cat.slug}`}
                        style={{
                          display: "flex", alignItems: "center", gap: "12px",
                          padding: "10px 16px", fontSize: "13px", fontWeight: 600, color: "#374151",
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

              {[
                { label: "⚡ Flash Sale", href: "/flash-sale" },
                { label: "✨ New Arrivals", href: "/new-arrivals" },
              ].map((item) => (
                <Link key={item.label} to={item.href}
                  style={{
                    padding: "10px 16px", fontSize: "13px", fontWeight: 600,
                    color: "#475569", textDecoration: "none", borderRadius: "10px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#2563eb";
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.06)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "#475569";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}>
                  {item.label}
                </Link>
              ))}

              <Link to="/vendor/register"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  padding: "8px 14px", fontSize: "13px", fontWeight: 700,
                  textDecoration: "none", borderRadius: "10px",
                  border: "1.5px solid rgba(37,99,235,0.20)", color: "#2563eb",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(37,99,235,0.06)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,99,235,0.4)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(37,99,235,0.20)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}>
                <Store size={14} strokeWidth={2.5}/>
                Sell as Vendor
              </Link>

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
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
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
        }}>
          <div className="p-4 space-y-2">
            {/* Mobile search */}
            <div className="relative mb-3">
              <input
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search..."
                style={{
                  width: "100%", height: "44px", paddingLeft: "16px", paddingRight: "48px",
                  borderRadius: "12px", border: "1.5px solid rgba(37,99,235,0.15)",
                  background: "#f8faff", fontSize: "14px", outline: "none",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
              <Search size={16} color="#94a3b8" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}/>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "7px 14px", borderRadius: "50px",
              background: "linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08))",
              border: "1.5px solid rgba(37,99,235,0.18)",
              fontSize: "12px", fontWeight: 700, color: "#2563eb", marginBottom: "4px",
            }}>
              <Zap size={12} fill="#2563eb" strokeWidth={0}/>
              Shop Now · Pay in Installments
            </div>

            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "12px",
                  fontSize: "13px", fontWeight: 600, color: "#374151",
                  textDecoration: "none", transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#f0f7ff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}>
                <div style={{
                  height: "32px", width: "32px", borderRadius: "10px",
                  background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <cat.icon className="h-4 w-4" style={{ color: "#2563eb" }}/>
                </div>
                {cat.name}
              </Link>
            ))}

            <Link to="/vendor/register"
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700, color: "#2563eb", textDecoration: "none",
              }}>
              <Store size={15} strokeWidth={2.5}/> Sell as Vendor
            </Link>
            <Link to="/login"
              style={{
                display: "block", padding: "10px 12px", borderRadius: "12px",
                fontSize: "13px", fontWeight: 700, color: "#2563eb", textDecoration: "none",
              }}>
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
