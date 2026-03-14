import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/data/products";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, X, ChevronDown, Star, Zap, Search } from "lucide-react";
import { useState, useMemo } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

interface Filters {
  priceMin: number;
  priceMax: number;
  minRating: number;
  installmentOnly: boolean;
  sortBy: SortOption;
  search: string;
}

const DEFAULT_FILTERS: Filters = {
  priceMin: 0,
  priceMax: 500000,
  minRating: 0,
  installmentOnly: false,
  sortBy: "relevance",
  search: "",
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const formatPKR = (n: number) =>
  n >= 1000 ? `PKR ${(n / 1000).toFixed(0)}k` : `PKR ${n}`;

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Relevance",
  "price-asc": "Price: Low → High",
  "price-desc": "Price: High → Low",
  rating: "Top Rated",
  newest: "Newest First",
};

const PRICE_PRESETS = [
  { label: "Under 5k", min: 0, max: 5000 },
  { label: "5k – 20k", min: 5000, max: 20000 },
  { label: "20k – 50k", min: 20000, max: 50000 },
  { label: "50k – 1L", min: 50000, max: 100000 },
  { label: "1L+", min: 100000, max: 500000 },
];

// ── Filter Sidebar ─────────────────────────────────────────────────────────────
const FilterSidebar = ({
  filters,
  onChange,
  onReset,
  activeCount,
}: {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
  activeCount: number;
}) => {
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);

  const Section = ({
    title,
    open,
    toggle,
    children,
  }: {
    title: string;
    open: boolean;
    toggle: () => void;
    children: React.ReactNode;
  }) => (
    <div style={{ borderBottom: "1px solid rgba(37,99,235,0.07)", paddingBottom: "14px", marginBottom: "14px" }}>
      <button
        onClick={toggle}
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", background: "none", border: "none", cursor: "pointer",
          padding: "0 0 10px", fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
        <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", letterSpacing: "0.04em", textTransform: "uppercase" }}>
          {title}
        </span>
        <ChevronDown size={14} color="#94a3b8" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}/>
      </button>
      {open && children}
    </div>
  );

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
            <SlidersHorizontal size={13} color="white" strokeWidth={2.5}/>
          </div>
          <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Filters</span>
          {activeCount > 0 && (
            <span style={{
              height: "18px", minWidth: "18px", borderRadius: "99px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              fontSize: "10px", fontWeight: 800, color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 5px",
            }}>{activeCount}</span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={onReset} style={{
            fontSize: "11px", fontWeight: 700, color: "#ef4444",
            background: "rgba(239,68,68,0.07)", border: "none", cursor: "pointer",
            padding: "3px 9px", borderRadius: "7px",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <Section title="Sort By" open={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([val, label]) => (
            <button key={val} onClick={() => onChange({ sortBy: val })}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                padding: "7px 10px", borderRadius: "9px", border: "none",
                cursor: "pointer", textAlign: "left", width: "100%",
                background: filters.sortBy === val ? "rgba(37,99,235,0.08)" : "transparent",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: "background 0.15s",
              }}>
              <div style={{
                height: "14px", width: "14px", borderRadius: "50%",
                border: `2px solid ${filters.sortBy === val ? "#2563eb" : "#cbd5e1"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {filters.sortBy === val && (
                  <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }}/>
                )}
              </div>
              <span style={{ fontSize: "12px", fontWeight: filters.sortBy === val ? 700 : 500, color: filters.sortBy === val ? "#2563eb" : "#475569" }}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Price Range */}
      <Section title="Price Range" open={priceOpen} toggle={() => setPriceOpen(!priceOpen)}>
        {/* Presets */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "12px" }}>
          {PRICE_PRESETS.map((p) => {
            const active = filters.priceMin === p.min && filters.priceMax === p.max;
            return (
              <button key={p.label}
                onClick={() => onChange({ priceMin: p.min, priceMax: p.max })}
                style={{
                  padding: "4px 10px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                  border: `1.5px solid ${active ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
                  background: active ? "rgba(37,99,235,0.08)" : "transparent",
                  color: active ? "#2563eb" : "#64748b",
                  cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  transition: "all 0.15s",
                }}>
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Min / Max inputs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {[
            { label: "Min", key: "priceMin", val: filters.priceMin },
            { label: "Max", key: "priceMax", val: filters.priceMax },
          ].map(({ label, key, val }) => (
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
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box",
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
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button key={r} onClick={() => onChange({ minRating: r })}
              style={{
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
                {filters.minRating === r && <div style={{ height: "6px", width: "6px", borderRadius: "50%", background: "#2563eb" }}/>}
              </div>
              {r === 0 ? (
                <span style={{ fontSize: "12px", fontWeight: 500, color: "#475569" }}>Any rating</span>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11}
                      fill={i < Math.floor(r) ? "#f59e0b" : "none"}
                      color={i < Math.ceil(r) ? "#f59e0b" : "#e2e8f0"}
                      strokeWidth={2}/>
                  ))}
                  <span style={{ fontSize: "11px", fontWeight: 700, color: filters.minRating === r ? "#2563eb" : "#64748b", marginLeft: "2px" }}>{r}+</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Installment toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "2px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            height: "28px", width: "28px", borderRadius: "8px",
            background: filters.installmentOnly
              ? "linear-gradient(135deg, #2563eb, #7c3aed)"
              : "linear-gradient(135deg, #eff6ff, #eef2ff)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={13} strokeWidth={2.5}
              color={filters.installmentOnly ? "white" : "#2563eb"}
              fill={filters.installmentOnly ? "white" : "none"}/>
          </div>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Installments Only</div>
            <div style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 500 }}>Easy monthly payments</div>
          </div>
        </div>
        {/* Toggle switch */}
        <button onClick={() => onChange({ installmentOnly: !filters.installmentOnly })}
          style={{
            width: "40px", height: "22px", borderRadius: "99px", border: "none",
            cursor: "pointer", padding: "2px",
            background: filters.installmentOnly
              ? "linear-gradient(135deg, #2563eb, #7c3aed)"
              : "rgba(203,213,225,0.8)",
            transition: "all 0.2s ease",
            display: "flex", alignItems: "center",
            justifyContent: filters.installmentOnly ? "flex-end" : "flex-start",
          }}>
          <div style={{
            height: "18px", width: "18px", borderRadius: "50%", background: "white",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            transition: "all 0.2s ease",
          }}/>
        </button>
      </div>
    </aside>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────
const CategoryPage = () => {
  const { slug } = useParams();
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = categories.find((c) => c.slug === slug);

  const updateFilter = (partial: Partial<Filters>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin !== DEFAULT_FILTERS.priceMin || filters.priceMax !== DEFAULT_FILTERS.priceMax) count++;
    if (filters.minRating !== DEFAULT_FILTERS.minRating) count++;
    if (filters.installmentOnly) count++;
    if (filters.sortBy !== DEFAULT_FILTERS.sortBy) count++;
    if (filters.search.trim()) count++;
    return count;
  }, [filters]);

  const filteredProducts = useMemo(() => {
    let list = category
      ? featuredProducts.filter((p) => p.categoryId === category.id)
      : [...featuredProducts];

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Price
    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    // Rating
    if (filters.minRating > 0) {
      list = list.filter((p) => (p.rating ?? 0) >= filters.minRating);
    }

    // Installment (assumes products have installmentAvailable or monthlyPrice)
    if (filters.installmentOnly) {
      list = list.filter((p) => p.monthlyPrice != null || (p as any).installmentAvailable);
    }

    // Sort
    switch (filters.sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "newest":
        list.reverse();
        break;
    }

    return list;
  }, [filters, category]);

  return (
    <div className="min-h-screen" style={{ background: "#f8faff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Header />

      <main className="container mx-auto px-4 py-6">

        {/* ── Breadcrumb ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
          <Link to="/" style={{ fontSize: "13px", fontWeight: 600, color: "#94a3b8", textDecoration: "none" }}>Home</Link>
          <ChevronRight size={13} color="#cbd5e1"/>
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{category?.name ?? "All Products"}</span>
        </div>

        {/* ── Page Header ── */}
        <div style={{
          background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
          borderRadius: "20px",
          padding: "24px 28px",
          marginBottom: "24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
          flexWrap: "wrap", gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {category && (
              <div style={{
                height: "52px", width: "52px", borderRadius: "15px",
                background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1.5px solid rgba(255,255,255,0.3)",
              }}>
                <category.icon className="h-6 w-6" style={{ color: "white" }}/>
              </div>
            )}
            <div>
              <h1 style={{ color: "white", fontWeight: 800, fontSize: "22px", margin: 0, letterSpacing: "-0.02em" }}>
                {category?.name ?? "All Products"}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", margin: "2px 0 0", fontWeight: 500 }}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                {activeFilterCount > 0 && ` · ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active`}
              </p>
            </div>
          </div>

          {/* Search bar inside header */}
          <div style={{ position: "relative", width: "260px" }}>
            <Search size={14} color="rgba(255,255,255,0.6)" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}/>
            <input
              placeholder={`Search in ${category?.name ?? "products"}…`}
              value={filters.search}
              onChange={e => updateFilter({ search: e.target.value })}
              style={{
                width: "100%", height: "40px",
                paddingLeft: "34px", paddingRight: "12px",
                borderRadius: "12px",
                border: "1.5px solid rgba(255,255,255,0.3)",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                fontSize: "13px", fontWeight: 500,
                color: "white", outline: "none",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        {/* ── Mobile filter toggle ── */}
        <div className="md:hidden" style={{ marginBottom: "16px" }}>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 18px", borderRadius: "12px",
              border: `1.5px solid ${activeFilterCount > 0 ? "#2563eb" : "rgba(37,99,235,0.15)"}`,
              background: activeFilterCount > 0 ? "rgba(37,99,235,0.07)" : "white",
              cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "13px", fontWeight: 700,
              color: activeFilterCount > 0 ? "#2563eb" : "#374151",
            }}>
            <SlidersHorizontal size={15} strokeWidth={2.5}/>
            Filters
            {activeFilterCount > 0 && (
              <span style={{
                height: "18px", minWidth: "18px", borderRadius: "99px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                fontSize: "10px", fontWeight: 800, color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "0 5px",
              }}>{activeFilterCount}</span>
            )}
            <ChevronDown size={13} style={{ marginLeft: "auto", transform: mobileFiltersOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}/>
          </button>

          {/* Mobile filter panel */}
          {mobileFiltersOpen && (
            <div style={{
              marginTop: "8px", borderRadius: "16px",
              border: "1.5px solid rgba(37,99,235,0.10)",
              background: "white", overflow: "hidden",
              boxShadow: "0 8px 32px rgba(37,99,235,0.10)",
            }}>
              <FilterSidebar
                filters={filters}
                onChange={updateFilter}
                onReset={resetFilters}
                activeCount={activeFilterCount}
              />
            </div>
          )}
        </div>

        {/* ── Layout: sidebar + grid ── */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* Desktop sidebar */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onReset={resetFilters}
              activeCount={activeFilterCount}
            />
          </div>

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Active filter chips */}
            {activeFilterCount > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {filters.search.trim() && (
                  <Chip label={`"${filters.search}"`} onRemove={() => updateFilter({ search: "" })}/>
                )}
                {(filters.priceMin !== 0 || filters.priceMax !== 500000) && (
                  <Chip label={`${formatPKR(filters.priceMin)} – ${formatPKR(filters.priceMax)}`} onRemove={() => updateFilter({ priceMin: 0, priceMax: 500000 })}/>
                )}
                {filters.minRating > 0 && (
                  <Chip label={`${filters.minRating}★+`} onRemove={() => updateFilter({ minRating: 0 })}/>
                )}
                {filters.installmentOnly && (
                  <Chip label="Installments Only" onRemove={() => updateFilter({ installmentOnly: false })}/>
                )}
                {filters.sortBy !== "relevance" && (
                  <Chip label={SORT_LABELS[filters.sortBy]} onRemove={() => updateFilter({ sortBy: "relevance" })}/>
                )}
                <button onClick={resetFilters} style={{
                  padding: "4px 12px", borderRadius: "99px", fontSize: "11px", fontWeight: 700,
                  color: "#ef4444", background: "rgba(239,68,68,0.07)",
                  border: "1.5px solid rgba(239,68,68,0.15)", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}>
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i}/>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                background: "white", borderRadius: "18px",
                border: "1.5px solid rgba(37,99,235,0.08)",
              }}>
                <div style={{
                  height: "64px", width: "64px", borderRadius: "18px",
                  background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                }}>
                  <Search size={28} color="#2563eb" strokeWidth={1.5}/>
                </div>
                <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>No products found</p>
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px", fontWeight: 500 }}>Try adjusting your filters or search terms</p>
                <button onClick={resetFilters} style={{
                  padding: "10px 24px", borderRadius: "12px",
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  border: "none", cursor: "pointer",
                  fontSize: "13px", fontWeight: 700, color: "white",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxShadow: "0 6px 18px rgba(37,99,235,0.35)",
                }}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

// ── Filter chip ────────────────────────────────────────────────────────────────
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
      lineHeight: 1,
    }}>
      <X size={11} strokeWidth={2.5}/>
    </button>
  </span>
);

export default CategoryPage;
