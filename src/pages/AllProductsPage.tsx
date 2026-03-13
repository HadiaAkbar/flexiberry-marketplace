import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/data/products";
import {
  Search, SlidersHorizontal, X, Grid3X3, List,
  ChevronDown, Sparkles, Package, Star, TrendingUp,
  ArrowUpDown, Filter,
} from "lucide-react";

const SORT_OPTIONS = [
  { value: "featured",   label: "Featured" },
  { value: "price-asc",  label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating",     label: "Top Rated" },
  { value: "reviews",    label: "Most Reviewed" },
  { value: "discount",   label: "Biggest Discount" },
];

const PRICE_RANGES = [
  { label: "Under 50K",     min: 0,       max: 50000 },
  { label: "50K – 200K",    min: 50000,   max: 200000 },
  { label: "200K – 500K",   min: 200000,  max: 500000 },
  { label: "500K – 1M",     min: 500000,  max: 1000000 },
  { label: "Above 1M",      min: 1000000, max: Infinity },
];

const AllProductsPage = () => {
  const [search, setSearch]         = useState("");
  const [activeCategory, setCategory] = useState("all");
  const [sortBy, setSort]           = useState("featured");
  const [priceRange, setPriceRange] = useState<null | { min: number; max: number }>(null);
  const [installOnly, setInstall]   = useState(false);
  const [inStockOnly, setInStock]   = useState(false);
  const [view, setView]             = useState<"grid" | "list">("grid");
  const [heroVisible, setHero]      = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => { const t = setTimeout(() => setHero(true), 80); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    let list = [...featuredProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== "all") list = list.filter(p => p.categoryId === activeCategory);
    if (priceRange) list = list.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    if (installOnly) list = list.filter(p => p.installmentOptions.length > 0);
    if (inStockOnly) list = list.filter(p => p.inStock);

    list.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":  return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating":     return b.rating - a.rating;
        case "reviews":    return b.reviews - a.reviews;
        case "discount": {
          const da = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) : 0;
          const db = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) : 0;
          return db - da;
        }
        default: return 0;
      }
    });

    return list;
  }, [search, activeCategory, sortBy, priceRange, installOnly, inStockOnly]);

  const activeFilterCount = [
    activeCategory !== "all",
    !!priceRange,
    installOnly,
    inStockOnly,
    sortBy !== "featured",
    !!search.trim(),
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch(""); setCategory("all"); setSort("featured");
    setPriceRange(null); setInstall(false); setInStock(false);
  };

  // Stats
  const totalProducts = featuredProducts.length;
  const inStockCount  = featuredProducts.filter(p => p.inStock).length;
  const avgRating     = (featuredProducts.reduce((s, p) => s + p.rating, 0) / totalProducts).toFixed(1);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 35%, #7c3aed 70%, #4c1d95 100%)",
        padding: "56px 16px 72px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", top: "-150px", right: "-100px", animation: "floatOrb 8s ease-in-out infinite" }}/>
          <div style={{ position: "absolute", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", bottom: "-60px", left: "5%", animation: "floatOrb 11s ease-in-out infinite 3s" }}/>
          <div style={{ position: "absolute", width: "180px", height: "180px", borderRadius: "50%", background: "rgba(124,58,237,0.22)", top: "20%", left: "38%", filter: "blur(40px)" }}/>
          <svg style={{ position: "absolute", right: "4%", top: 0, opacity: 0.07 }} width="380" height="280" viewBox="0 0 380 280">
            {Array.from({ length: 11 }).map((_, row) =>
              Array.from({ length: 18 }).map((_, col) => (
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
            border: "1px solid rgba(255,255,255,0.25)", marginBottom: "18px",
            opacity: heroVisible ? 1 : 0, transition: "all 0.5s ease",
            transform: heroVisible ? "none" : "translateY(-8px)",
          }}>
            <Sparkles size={12} color="rgba(255,255,255,0.9)"/>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: "0.10em", textTransform: "uppercase" }}>
              All Products
            </span>
          </div>

          {/* Title + stats */}
          <div style={{
            display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            flexWrap: "wrap", gap: "24px",
            opacity: heroVisible ? 1 : 0, transition: "all 0.55s cubic-bezier(0.22,1,0.36,1) 0.05s",
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

            {/* Quick stats */}
            <div style={{
              display: "flex", gap: "10px", flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0, transition: "all 0.55s ease 0.15s",
            }}>
              {[
                { icon: Package, val: `${totalProducts}`, label: "Products" },
                { icon: Star,    val: avgRating,           label: "Avg Rating" },
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
                    <Icon size={14} color="white" strokeWidth={2}/>
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 900, color: "white", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.65)", fontWeight: 600, marginTop: "2px" }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search */}
          <div style={{
            marginTop: "28px",
            opacity: heroVisible ? 1 : 0, transition: "all 0.55s ease 0.20s",
            transform: heroVisible ? "none" : "translateY(12px)",
          }}>
            <div style={{ position: "relative", maxWidth: "560px" }}>
              <Search size={16} color="rgba(255,255,255,0.55)"
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
              <input
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", height: "50px",
                  paddingLeft: "44px", paddingRight: search ? "44px" : "16px",
                  borderRadius: "14px", border: "1.5px solid rgba(255,255,255,0.25)",
                  background: "rgba(255,255,255,0.14)", backdropFilter: "blur(16px)",
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

        {/* Curved bottom */}
        <div style={{
          position: "absolute", bottom: -1, left: 0, right: 0, height: "40px",
          background: "linear-gradient(160deg, #f8faff 0%, #f3f0ff 60%, #f0fff8 100%)",
          borderRadius: "60% 60% 0 0 / 100% 100% 0 0",
        }}/>
      </section>

      {/* ── FILTERS TOOLBAR ── */}
      <div style={{ maxWidth: "1400px", margin: "-10px auto 0", padding: "0 16px" }}>
        <div style={{
          background: "white", borderRadius: "20px",
          border: "1.5px solid rgba(37,99,235,0.08)",
          boxShadow: "0 4px 24px rgba(37,99,235,0.08)",
          padding: "14px 18px",
          display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center",
        }}>
          {/* Filter icon + count */}
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

          {/* Category pills */}
          <div style={{ display: "flex", gap: "5px", overflowX: "auto", scrollbarWidth: "none", flex: 1, minWidth: 0 }}>
            {[{ id: "all", name: "All" }, ...categories].map(cat => {
              const active = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => setCategory(cat.id)} style={{
                  padding: "6px 13px", borderRadius: "99px", flexShrink: 0,
                  fontSize: "12px", fontWeight: 700,
                  border: `1.5px solid ${active ? "#2563eb" : "rgba(37,99,235,0.12)"}`,
                  background: active ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "transparent",
                  color: active ? "white" : "#64748b",
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: active ? "0 4px 12px rgba(37,99,235,0.30)" : "none",
                  transition: "all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                  whiteSpace: "nowrap",
                }}>{cat.name}</button>
              );
            })}
          </div>

          <div style={{ width: "1px", height: "28px", background: "rgba(37,99,235,0.10)", flexShrink: 0 }}/>

          {/* Right controls */}
          <div style={{ display: "flex", gap: "8px", alignItems: "center", flexShrink: 0, flexWrap: "wrap" }}>
            {/* Price range */}
            <select
              value={priceRange ? `${priceRange.min}-${priceRange.max}` : ""}
              onChange={e => {
                if (!e.target.value) { setPriceRange(null); return; }
                const found = PRICE_RANGES.find(r => `${r.min}-${r.max}` === e.target.value);
                setPriceRange(found ?? null);
              }}
              style={{
                height: "34px", padding: "0 10px", borderRadius: "10px",
                border: "1.5px solid rgba(37,99,235,0.15)",
                background: "#fafbff", fontSize: "12px", fontWeight: 600,
                color: "#374151", outline: "none", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>
              <option value="">All Prices</option>
              {PRICE_RANGES.map(r => (
                <option key={r.label} value={`${r.min}-${r.max}`}>{r.label}</option>
              ))}
            </select>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSort(e.target.value)} style={{
              height: "34px", padding: "0 10px", borderRadius: "10px",
              border: "1.5px solid rgba(37,99,235,0.15)",
              background: "#fafbff", fontSize: "12px", fontWeight: 600,
              color: "#374151", outline: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>

            {/* Kisti toggle */}
            <button onClick={() => setInstall(!installOnly)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              height: "34px", padding: "0 12px", borderRadius: "10px",
              border: `1.5px solid ${installOnly ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
              background: installOnly ? "rgba(37,99,235,0.08)" : "transparent",
              color: installOnly ? "#2563eb" : "#64748b",
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.15s",
            }}>
              ⚡ Kisti
            </button>

            {/* In Stock toggle */}
            <button onClick={() => setInStock(!inStockOnly)} style={{
              display: "flex", alignItems: "center", gap: "5px",
              height: "34px", padding: "0 12px", borderRadius: "10px",
              border: `1.5px solid ${inStockOnly ? "#059669" : "rgba(37,99,235,0.15)"}`,
              background: inStockOnly ? "rgba(5,150,105,0.08)" : "transparent",
              color: inStockOnly ? "#059669" : "#64748b",
              fontSize: "12px", fontWeight: 700, cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.15s",
            }}>
              ✓ In Stock
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
              border: "1.5px solid rgba(37,99,235,0.12)", overflow: "hidden",
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
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Results count */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", margin: 0 }}>
            Showing <span style={{ fontWeight: 800, color: "#0f172a" }}>{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "all" && ` in ${categories.find(c => c.id === activeCategory)?.name ?? activeCategory}`}
          </p>
        </div>

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
              <Package size={36} color="#2563eb" strokeWidth={1.5}/>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: "0 0 8px", letterSpacing: "-0.03em" }}>No products found</p>
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>Try adjusting your filters or search terms</p>
            <button onClick={resetFilters} style={{
              padding: "12px 32px", borderRadius: "14px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              border: "none", color: "white", fontSize: "14px", fontWeight: 700,
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
            }}>Reset Filters</button>
          </div>
        ) : view === "grid" ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "18px",
          }}>
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          /* List view */
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filtered.map((product, i) => {
              const discount = product.originalPrice
                ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                : 0;
              return (
                <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: "white", borderRadius: "18px",
                    border: "1.5px solid rgba(37,99,235,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    padding: "16px 20px",
                    display: "flex", alignItems: "center", gap: "16px",
                    transition: "all 0.25s cubic-bezier(0.22,1,0.36,1)",
                    animation: `cardIn 0.4s ease forwards`,
                    animationDelay: `${Math.min(i * 40, 300)}ms`,
                    opacity: 0,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.22)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "none";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.08)";
                  }}>
                    {/* Image */}
                    <div style={{
                      height: "70px", width: "70px", borderRadius: "14px", flexShrink: 0,
                      background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                      overflow: "hidden",
                    }}>
                      {product.image && (
                        <img src={product.image} alt={product.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                          {product.name}
                        </span>
                        {discount > 0 && (
                          <span style={{
                            fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "99px",
                            background: "rgba(239,68,68,0.10)", color: "#ef4444",
                          }}>-{discount}%</span>
                        )}
                      </div>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 6px", lineHeight: 1.5 }}>
                        {product.description}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "12px", color: "#b45309", fontWeight: 700 }}>
                          ★ {product.rating}
                        </span>
                        <span style={{ fontSize: "11px", color: "#94a3b8" }}>({product.reviews} reviews)</span>
                        {product.inStock && (
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>● In Stock</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: "16px", fontWeight: 900, color: "#2563eb" }}>
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
                        borderRadius: "99px", marginTop: "6px", display: "inline-block",
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
      </main>

      <Footer />

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(14px); }
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

export default AllProductsPage;
