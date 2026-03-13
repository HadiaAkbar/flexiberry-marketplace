import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/data/products";
import {
  Search, SlidersHorizontal, X, Grid3X3, List,
  ChevronDown, Sparkles, Package, Star, TrendingUp, Zap,
} from "lucide-react";

/* ─── Types & Constants ──────────────────────────────── */
type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "reviews" | "discount";

interface Filters {
  search: string;
  category: string;
  sortBy: SortOption;
  priceMin: number;
  priceMax: number;
  minRating: number;
  installmentOnly: boolean;
  inStockOnly: boolean;
}

const DEFAULT_FILTERS: Filters = {
  search: "",
  category: "all",
  sortBy: "featured",
  priceMin: 0,
  priceMax: 2000000,
  minRating: 0,
  installmentOnly: false,
  inStockOnly: false,
};

const SORT_LABELS: Record<SortOption, string> = {
  featured:     "Featured",
  "price-asc":  "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating:       "Top Rated",
  reviews:      "Most Reviewed",
  discount:     "Biggest Discount",
};

const PRICE_PRESETS = [
  { label: "Under 50K",   min: 0,       max: 50000   },
  { label: "50K–200K",    min: 50000,   max: 200000  },
  { label: "200K–500K",   min: 200000,  max: 500000  },
  { label: "500K–1M",     min: 500000,  max: 1000000 },
  { label: "Above 1M",    min: 1000000, max: 2000000 },
];

const formatPKR = (n: number) =>
  n >= 1000000 ? `PKR ${(n / 1000000).toFixed(1)}M`
  : n >= 1000  ? `PKR ${(n / 1000).toFixed(0)}K`
  : `PKR ${n}`;

/* ─── Filter Chip ────────────────────────────────────── */
const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: "5px",
    padding: "4px 10px", borderRadius: "99px",
    background: "rgba(37,99,235,0.08)",
    border: "1.5px solid rgba(37,99,235,0.18)",
    fontSize: "11px", fontWeight: 700, color: "#2563eb",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  }}>
    {label}
    <button onClick={onRemove} style={{
      background: "none", border: "none", cursor: "pointer",
      color: "#94a3b8", padding: 0, display: "flex", alignItems: "center",
    }}>
      <X size={11} strokeWidth={2.5} />
    </button>
  </span>
);

/* ─── Section Wrapper ────────────────────────────────── */
const Section = ({
  title, open, toggle, children,
}: {
  title: string; open: boolean; toggle: () => void; children: React.ReactNode;
}) => (
  <div style={{ borderBottom: "1px solid rgba(37,99,235,0.07)", paddingBottom: "14px", marginBottom: "14px" }}>
    <button onClick={toggle} style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      width: "100%", background: "none", border: "none", cursor: "pointer",
      padding: "0 0 10px", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {title}
      </span>
      <ChevronDown size={14} color="#94a3b8"
        style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }} />
    </button>
    {open && children}
  </div>
);

/* ─── Filter Sidebar ─────────────────────────────────── */
const FilterSidebar = ({
  filters, onChange, onReset, activeCount,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
  activeCount: number;
}) => {
  const [sortOpen,    setSortOpen]    = useState(true);
  const [catOpen,     setCatOpen]     = useState(true);
  const [priceOpen,   setPriceOpen]   = useState(true);
  const [ratingOpen,  setRatingOpen]  = useState(true);
  const [extrasOpen,  setExtrasOpen]  = useState(true);

  return (
    <aside style={{
      width: "240px", flexShrink: 0,
      background: "white",
      borderRadius: "18px",
      border: "1.5px solid rgba(37,99,235,0.10)",
      boxShadow: "0 4px 24px rgba(37,99,235,0.07)",
      padding: "18px",
      alignSelf: "flex-start",
      position: "sticky",
      top: "90px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            height: "28px", width: "28px", borderRadius: "8px",
            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SlidersHorizontal size={13} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Filters</span>
          {activeCount > 0 && (
            <span style={{
              height: "18px", minWidth: "18px", borderRadius: "99px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              fontSize: "10px", fontWeight: 800, color: "white",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px",
            }}>{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} style={{
            fontSize: "11px", fontWeight: 700, color: "#ef4444",
            background: "rgba(239,68,68,0.07)", border: "none", cursor: "pointer",
            padding: "3px 9px", borderRadius: "7px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Reset</button>
        )}
      </div>

      {/* Sort */}
      <Section title="Sort By" open={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([val, label]) => (
            <button key={val} onClick={() => onChange({ sortBy: val })} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "7px 10px", borderRadius: "9px", border: "none",
              cursor: "pointer", textAlign: "left", width: "100%",
              background: filters.sortBy === val ? "rgba(37,99,235,0.08)" : "transparent",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
            }}>
              <div style={{
                height: "14px", width: "14px", borderRadius: "50%",
                border: `2px solid ${filters.sortBy === val ? "#2563eb" : "#cbd5e1"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {filters.sortBy === val && (
                  <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }} />
                )}
              </div>
              <span style={{ fontSize: "12px", fontWeight: filters.sortBy === val ? 700 : 500, color: filters.sortBy === val ? "#2563eb" : "#475569" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Category */}
      <Section title="Category" open={catOpen} toggle={() => setCatOpen(!catOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {[{ id: "all", name: "All Categories" }, ...categories].map(cat => {
            const active = filters.category === cat.id;
            const count = cat.id === "all"
              ? featuredProducts.length
              : featuredProducts.filter(p => p.categoryId === cat.id).length;
            return (
              <button key={cat.id} onClick={() => onChange({ category: cat.id })} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "7px 10px", borderRadius: "9px", border: "none",
                cursor: "pointer", background: active ? "rgba(37,99,235,0.08)" : "transparent",
                fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    height: "14px", width: "14px", borderRadius: "50%",
                    border: `2px solid ${active ? "#2563eb" : "#cbd5e1"}`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    {active && <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }} />}
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: active ? 700 : 500, color: active ? "#2563eb" : "#475569" }}>
                    {cat.name}
                  </span>
                </div>
                <span style={{
                  fontSize: "10px", fontWeight: 700, padding: "1px 6px", borderRadius: "99px",
                  background: active ? "rgba(37,99,235,0.15)" : "rgba(0,0,0,0.05)",
                  color: active ? "#2563eb" : "#94a3b8",
                }}>{count}</span>
              </button>
            );
          })}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range" open={priceOpen} toggle={() => setPriceOpen(!priceOpen)}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {PRICE_PRESETS.map(p => {
            const active = filters.priceMin === p.min && filters.priceMax === p.max;
            return (
              <button key={p.label} onClick={() => onChange({ priceMin: p.min, priceMax: p.max })} style={{
                padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                border: `1.5px solid ${active ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
                background: active ? "rgba(37,99,235,0.08)" : "transparent",
                color: active ? "#2563eb" : "#64748b",
                cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.15s",
              }}>{p.label}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {([["Min", "priceMin", filters.priceMin], ["Max", "priceMax", filters.priceMax]] as const).map(([label, key, val]) => (
            <div key={key}>
              <label style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", display: "block", marginBottom: "4px" }}>{label}</label>
              <input
                type="number"
                value={val}
                onChange={e => onChange({ [key]: Number(e.target.value) } as Partial<Filters>)}
                style={{
                  width: "100%", height: "32px", borderRadius: "8px",
                  border: "1.5px solid rgba(37,99,235,0.15)",
                  background: "#fafbff", fontSize: "11px", fontWeight: 600,
                  color: "#0f172a", outline: "none", paddingLeft: "8px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box",
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
          <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>{formatPKR(filters.priceMin)}</span>
          <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600 }}>{formatPKR(filters.priceMax)}</span>
        </div>
      </Section>

      {/* Rating */}
      <Section title="Min. Rating" open={ratingOpen} toggle={() => setRatingOpen(!ratingOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {[0, 3, 3.5, 4, 4.5].map(r => (
            <button key={r} onClick={() => onChange({ minRating: r })} style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "6px 10px", borderRadius: "9px", border: "none",
              cursor: "pointer", background: filters.minRating === r ? "rgba(37,99,235,0.08)" : "transparent",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "background 0.15s",
            }}>
              <div style={{
                height: "14px", width: "14px", borderRadius: "50%",
                border: `2px solid ${filters.minRating === r ? "#2563eb" : "#cbd5e1"}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                {filters.minRating === r && <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }} />}
              </div>
              {r === 0 ? (
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#475569" }}>Any rating</span>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11}
                      fill={i < Math.floor(r) ? "#f59e0b" : "none"}
                      color={i < Math.ceil(r) ? "#f59e0b" : "#e2e8f0"}
                      strokeWidth={2} />
                  ))}
                  <span style={{ fontSize: "11px", fontWeight: 700, color: filters.minRating === r ? "#2563eb" : "#64748b", marginLeft: "2px" }}>
                    {r}+
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Extras */}
    
    </aside>
  );
};

/* ─── Main Page ──────────────────────────────────────── */
const AllProductsPage = () => {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [view, setView]       = useState<"grid" | "list">("grid");
  const [heroVisible, setHero] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHero(true), 80);
    return () => clearTimeout(t);
  }, []);

  const updateFilter = (partial: Partial<Filters>) =>
    setFilters(prev => ({ ...prev, ...partial }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.search.trim())                                                        n++;
    if (filters.category !== "all")                                                   n++;
    if (filters.sortBy !== "featured")                                                n++;
    if (filters.priceMin !== 0 || filters.priceMax !== 2000000)                      n++;
    if (filters.minRating > 0)                                                        n++;
    if (filters.installmentOnly)                                                      n++;
    if (filters.inStockOnly)                                                          n++;
    return n;
  }, [filters]);

  const filtered = useMemo(() => {
    let list = [...featuredProducts];

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (filters.category !== "all")  list = list.filter(p => p.categoryId === filters.category);
    if (filters.priceMin > 0)        list = list.filter(p => p.price >= filters.priceMin);
    if (filters.priceMax < 2000000)  list = list.filter(p => p.price <= filters.priceMax);
    if (filters.minRating > 0)       list = list.filter(p => (p.rating ?? 0) >= filters.minRating);
    if (filters.installmentOnly)     list = list.filter(p => p.installmentOptions?.length > 0);
    if (filters.inStockOnly)         list = list.filter(p => p.inStock);

    list.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":  return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating":     return (b.rating ?? 0) - (a.rating ?? 0);
        case "reviews":    return (b.reviews ?? 0) - (a.reviews ?? 0);
        case "discount": {
          const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return db - da;
        }
        default: return 0;
      }
    });

    return list;
  }, [filters]);

  const totalProducts = featuredProducts.length;
  const inStockCount  = featuredProducts.filter(p => p.inStock).length;
  const avgRating     = (featuredProducts.reduce((s, p) => s + (p.rating ?? 0), 0) / totalProducts).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 35%, #7c3aed 70%, #4c1d95 100%)",
        padding: "56px 16px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-150px", right: "-100px", animation: "floatOrb 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-60px", left: "5%", animation: "floatOrb 11s ease-in-out infinite 3s" }} />
          <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(124,58,237,0.22)", top: "20%", left: "38%", filter: "blur(40px)" }} />
          <svg style={{ position: "absolute", right: "4%", top: 0, opacity: 0.07 }} width="380" height="280" viewBox="0 0 380 280">
            {Array.from({ length: 11 }).map((_, row) =>
              Array.from({ length: 18 }).map((_, col) => (
                <circle key={`${row}-${col}`} cx={col * 22 + 11} cy={row * 26 + 13} r="1.8" fill="white" />
              ))
            )}
          </svg>
        </div>

        <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "6px 14px", borderRadius: "99px",
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.25)", marginBottom: "18px",
            opacity: heroVisible ? 1 : 0, transition: "all 0.5s ease",
            transform: heroVisible ? "none" : "translateY(-8px)",
          }}>
            <Sparkles size={12} color="rgba(255,255,255,0.9)" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              All Products
            </span>
          </div>

          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "24px",
            opacity: heroVisible ? 1 : 0,
            transition: "all 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s",
            transform: heroVisible ? "none" : "translateY(16px)",
          }}>
            <div>
              <h1 style={{
                color: "white", fontWeight: 900, margin: "0 0 10px",
                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                letterSpacing: "-0.04em", lineHeight: 1,
                fontFamily: "'Space Grotesk', sans-serif",
                textShadow: "0 4px 24px rgba(0,0,0,0.20)",
              }}>
                Browse Everything
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(14px,2vw,17px)", margin: 0, fontWeight: 500, lineHeight: 1.55 }}>
                {totalProducts} products across {categories.length} categories — all on easy installments
              </p>
            </div>
            <div style={{
              display: "flex", gap: "10px", flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0, transition: "all 0.55s ease 0.15s",
            }}>
              {[
                { icon: Package, val: `${totalProducts}`, label: "Products" },
                { icon: Star, val: avgRating, label: "Avg Rating" },
                { icon: TrendingUp, val: `${inStockCount}`, label: "In Stock" },
              ].map(({ icon: Icon, val, label }) => (
                <div key={label} style={{
                  padding: "12px 16px", borderRadius: "16px",
                  background: "rgba(255,255,255,0.12)", backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  display: "flex", alignItems: "center", gap: "10px", minWidth: "120px",
                }}>
                  <div style={{
                    height: "30px", width: "30px", borderRadius: "9px", flexShrink: 0,
                    background: "rgba(255,255,255,0.18)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={14} color="white" strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 900, color: "white", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: "2px" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            marginTop: "28px",
            opacity: heroVisible ? 1 : 0, transition: "all 0.55s ease 0.20s",
            transform: heroVisible ? "none" : "translateY(12px)",
          }}>
            <div style={{ position: "relative", maxWidth: "560px" }}>
              <Search size={16} color="rgba(255,255,255,0.55)"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
              <input
                placeholder="Search products…"
                value={filters.search}
                onChange={e => updateFilter({ search: e.target.value })}
                style={{
                  width: "100%", height: "50px",
                  paddingLeft: "44px", paddingRight: filters.search ? "44px" : "16px",
                  borderRadius: "14px", border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.14)", backdropFilter: "blur(16px)",
                  fontSize: "14px", fontWeight: 500, color: "white",
                  outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)", transition: "border-color 0.2s",
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.5)"}
                onBlur={e  => (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.25)"}
              />
              {filters.search && (
                <button onClick={() => updateFilter({ search: "" })} style={{
                  position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                  background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
                  cursor: "pointer", height: "26px", width: "26px",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "white",
                }}>
                  <X size={11} strokeWidth={3} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Curved bottom */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, right: 0, height: "40px",
          background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)",
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
        }} />
      </section>

      {/* ── MAIN LAYOUT ── */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 16px 60px" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* ── SIDEBAR (desktop) ── */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              activeCount={activeFilterCount}
            />
          </div>

          {/* ── CONTENT ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Toolbar row */}
            <div style={{
              background: "white", borderRadius: "16px",
              border: "1.5px solid rgba(37,99,235,0.08)",
              boxShadow: "0 2px 12px rgba(37,99,235,0.06)",
              padding: "10px 14px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "10px", marginBottom: "16px", flexWrap: "wrap",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                {/* Mobile filter btn */}
                <button
                  className="md:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  style={{
                    display: "flex", alignItems: "center", gap: "6px",
                    padding: "6px 12px", borderRadius: "10px", cursor: "pointer",
                    border: `1.5px solid ${activeFilterCount > 0 ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
                    background: activeFilterCount > 0 ? "rgba(37,99,235,0.07)" : "transparent",
                    color: activeFilterCount > 0 ? "#2563eb" : "#374151",
                    fontSize: "12px", fontWeight: 700,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                  <SlidersHorizontal size={13} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span style={{
                      height: "16px", minWidth: "16px", borderRadius: "99px",
                      background: "linear-gradient(135deg,#2563eb,#7c3aed)",
                      fontSize: "9px", fontWeight: 800, color: "white",
                      display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px",
                    }}>{activeFilterCount}</span>
                  )}
                </button>

                <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: 0 }}>
                  <span style={{ fontWeight: 800, color: "#0f172a" }}>{filtered.length}</span>
                  {" "}product{filtered.length !== 1 ? "s" : ""}
                  {filters.category !== "all" && ` in ${categories.find(c => c.id === filters.category)?.name}`}
                </p>
              </div>

              {/* View toggle */}
              <div style={{
                display: "flex", borderRadius: "10px",
                border: "1.5px solid rgba(37,99,235,0.12)", overflow: "hidden",
              }}>
                {([["grid", Grid3X3], ["list", List]] as const).map(([mode, Icon]) => (
                  <button key={mode} onClick={() => setView(mode)} style={{
                    height: "32px", width: "32px", border: "none",
                    background: view === mode ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "transparent",
                    color: view === mode ? "white" : "#94a3b8",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}>
                    <Icon size={13} strokeWidth={2} />
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile filter panel */}
            {mobileFiltersOpen && (
              <div className="md:hidden" style={{ marginBottom: "14px" }}>
                <FilterSidebar
                  filters={filters}
                  onChange={updateFilter}
                  onReset={resetFilters}
                  activeCount={activeFilterCount}
                />
              </div>
            )}

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {filters.search.trim() && (
                  <Chip label={`"${filters.search}"`} onRemove={() => updateFilter({ search: "" })} />
                )}
                {filters.category !== "all" && (
                  <Chip label={categories.find(c => c.id === filters.category)?.name ?? filters.category} onRemove={() => updateFilter({ category: "all" })} />
                )}
                {filters.sortBy !== "featured" && (
                  <Chip label={SORT_LABELS[filters.sortBy]} onRemove={() => updateFilter({ sortBy: "featured" })} />
                )}
                {(filters.priceMin !== 0 || filters.priceMax !== 2000000) && (
                  <Chip label={`${formatPKR(filters.priceMin)} – ${formatPKR(filters.priceMax)}`} onRemove={() => updateFilter({ priceMin: 0, priceMax: 2000000 })} />
                )}
                {filters.minRating > 0 && (
                  <Chip label={`${filters.minRating}★+`} onRemove={() => updateFilter({ minRating: 0 })} />
                )}
                {filters.installmentOnly && (
                  <Chip label="Installments Only" onRemove={() => updateFilter({ installmentOnly: false })} />
                )}
                {filters.inStockOnly && (
                  <Chip label="In Stock Only" onRemove={() => updateFilter({ inStockOnly: false })} />
                )}
                <button onClick={resetFilters} style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                  color: "#ef4444", background: "rgba(239,68,68,0.07)",
                  border: "1.5px solid rgba(239,68,68,0.15)", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>Clear all</button>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 ? (
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
                  <Package size={36} color="#2563eb" strokeWidth={1.5} />
                </div>
                <p style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.03em" }}>
                  No products found
                </p>
                <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>
                  Try adjusting your filters or search terms
                </p>
                <button onClick={resetFilters} style={{
                  padding: "12px 32px", borderRadius: "14px",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  border: "none", color: "white", fontSize: "14px", fontWeight: 700,
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
                }}>Reset Filters</button>
              </div>

            /* Grid view */
            ) : view === "grid" ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
                gap: "16px",
              }}>
                {filtered.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

            /* List view */
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filtered.map((product, i) => {
                  const discount = product.originalPrice
                    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                    : 0;
                  return (
                    <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                      <div
                        style={{
                          background: "white", borderRadius: "18px",
                          border: "1.5px solid rgba(37,99,235,0.08)",
                          boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                          padding: "14px 18px",
                          display: "flex", alignItems: "center", gap: "16px",
                          transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                          animation: "cardIn 0.4s ease forwards",
                          animationDelay: `${Math.min(i * 40, 300)}ms`,
                          opacity: 0,
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "translateY(-2px)";
                          el.style.boxShadow = "0 12px 40px rgba(37,99,235,0.12)";
                          el.style.borderColor = "rgba(37,99,235,0.22)";
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.transform = "none";
                          el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                          el.style.borderColor = "rgba(37,99,235,0.08)";
                        }}
                      >
                        <div style={{
                          height: "68px", width: "68px", borderRadius: "12px", flexShrink: 0,
                          background: "linear-gradient(135deg, #eff6ff, #f5f3ff)", overflow: "hidden",
                        }}>
                          {product.image && (
                            <img src={product.image} alt={product.name}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                            />
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                              {product.name}
                            </span>
                            {discount > 0 && (
                              <span style={{
                                fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "99px",
                                background: "rgba(239,68,68,0.10)", color: "#ef4444",
                              }}>-{discount}%</span>
                            )}
                          </div>
                          <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 5px", lineHeight: 1.4 }}>
                            {product.description}
                          </p>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "11px", color: "#b45309", fontWeight: 700 }}>
                              ★ {product.rating}
                            </span>
                            <span style={{ fontSize: "11px", color: "#94a3b8" }}>({product.reviews} reviews)</span>
                            {product.inStock && (
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>● In Stock</span>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontSize: "15px", fontWeight: 900, color: "#2563eb" }}>
                            PKR {product.price.toLocaleString()}
                          </div>
                          {product.originalPrice && (
                            <div style={{ fontSize: "11px", color: "#94a3b8", textDecoration: "line-through" }}>
                              PKR {product.originalPrice.toLocaleString()}
                            </div>
                          )}
                          <div style={{
                            fontSize: "10px", fontWeight: 700, color: "#7c3aed",
                            background: "rgba(124,58,237,0.08)", padding: "3px 8px",
                            borderRadius: "99px", marginTop: "5px", display: "inline-block",
                          }}>
                            ⚡ Installments
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatOrb {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(-20px,-15px) scale(1.04); }
          66%       { transform: translate(15px,-25px) scale(0.97); }
        }
        input::placeholder { color: rgba(255,255,255,0.40); }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default AllProductsPage;
