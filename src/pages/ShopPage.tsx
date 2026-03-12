import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/data/products";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

/* ─── Types ─────────────────────────────────────────── */
interface FilterState {
  categoryIds: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  sortBy: string;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Sort by Newness" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
  { value: "popular", label: "Most Popular" },
];

const MAX_PRICE = 600000;

/* ─── Collapsible Filter Section ────────────────────── */
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="font-semibold text-sm text-gray-800">{title}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        )}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────── */
const ShopPage = () => {
  const { slug } = useParams<{ slug?: string }>();

  // Determine active category from slug
  const activeCategory = slug ? categories.find((c) => c.slug === slug) : null;

  const [filters, setFilters] = useState<FilterState>({
    categoryIds: activeCategory ? [activeCategory.id] : [],
    priceRange: [0, MAX_PRICE],
    minRating: 0,
    inStockOnly: false,
    sortBy: "newest",
  });

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  /* ── Filtered & sorted products ── */
  const filteredProducts = useMemo(() => {
    let result = [...featuredProducts];

    if (filters.categoryIds.length > 0) {
      result = result.filter((p) => filters.categoryIds.includes(p.categoryId));
    }

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [filters]);

  /* ── Helpers ── */
  const toggleCategory = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const clearAll = () => {
    setFilters({
      categoryIds: [],
      priceRange: [0, MAX_PRICE],
      minRating: 0,
      inStockOnly: false,
      sortBy: "newest",
    });
  };

  const hasActiveFilters =
    filters.categoryIds.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < MAX_PRICE ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  const formatPrice = (v: number) =>
    v >= 1000 ? `PKR ${(v / 1000).toFixed(0)}K` : `PKR ${v}`;

  /* ── Sidebar content (shared between desktop + mobile) ── */
  const SidebarContent = () => (
    <div className="p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-base text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <FilterSection title="Categories" defaultOpen={true}>
        <div className="space-y-1.5">
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, categoryIds: [] }))
            }
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${
              filters.categoryIds.length === 0
                ? "bg-blue-600 text-white font-semibold"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            <span>All Categories</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                filters.categoryIds.length === 0
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {featuredProducts.length}
            </span>
          </button>

          {categories.map((cat) => {
            const count = featuredProducts.filter(
              (p) => p.categoryId === cat.id
            ).length;
            const active = filters.categoryIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <cat.icon
                    className={`h-3.5 w-3.5 ${
                      active ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                  <span>{cat.name}</span>
                </div>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    active
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" defaultOpen={true}>
        <div className="px-1">
          <Slider
            min={0}
            max={MAX_PRICE}
            step={5000}
            value={[filters.priceRange[0], filters.priceRange[1]]}
            onValueChange={(val) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [val[0], val[1]] as [number, number],
              }))
            }
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700">
              {formatPrice(filters.priceRange[0])}
            </div>
            <span className="text-gray-300 text-sm">—</span>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-700">
              {formatPrice(filters.priceRange[1])}
            </div>
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Minimum Rating" defaultOpen={false}>
        <div className="space-y-1.5">
          {[0, 4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() =>
                setFilters((prev) => ({ ...prev, minRating: r }))
              }
              className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                filters.minRating === r
                  ? "bg-amber-50 text-amber-700 font-semibold border border-amber-200"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-amber-400">
                {"★".repeat(Math.floor(r || 1))}
              </span>
              <span>
                {r === 0
                  ? "All Ratings"
                  : r === 4
                  ? "4+ Stars"
                  : r === 4.5
                  ? "4.5+ Stars"
                  : "4.8+ Stars"}
              </span>
            </button>
          ))}
        </div>
      </FilterSection>

      {/* In Stock */}
      <FilterSection title="Availability" defaultOpen={false}>
        <label className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-50 transition-all">
          <div
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                inStockOnly: !prev.inStockOnly,
              }))
            }
            className={`w-10 h-5 rounded-full relative transition-all cursor-pointer ${
              filters.inStockOnly
                ? "bg-blue-600"
                : "bg-gray-200"
            }`}
          >
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                filters.inStockOnly ? "left-5" : "left-0.5"
              }`}
            />
          </div>
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </FilterSection>
    </div>
  );

  /* ── Page title ── */
  const pageTitle = activeCategory
    ? activeCategory.name
    : filters.categoryIds.length === 1
    ? categories.find((c) => c.id === filters.categoryIds[0])?.name || "Shop"
    : "All Products";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              {activeCategory ? (
                <>
                  <Link
                    to="/products"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Shop
                  </Link>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="text-blue-600 font-medium">
                    {activeCategory.name}
                  </span>
                </>
              ) : (
                <span className="text-blue-600 font-medium">Shop</span>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* ── SIDEBAR (desktop) ── */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <SidebarContent />
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-3.5 mb-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <span className="h-5 w-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
                        {filters.categoryIds.length +
                          (filters.minRating > 0 ? 1 : 0) +
                          (filters.inStockOnly ? 1 : 0)}
                      </span>
                    )}
                  </button>

                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-900">
                      {filteredProducts.length}
                    </span>{" "}
                    {filteredProducts.length === 1 ? "Product" : "Products"}{" "}
                    Found
                  </p>
                </div>

                <div className="flex items-center gap-3 ml-auto">
                  {/* Sort */}
                  <select
                    value={filters.sortBy}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sortBy: e.target.value,
                      }))
                    }
                    className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>

                  {/* View toggle */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 transition-colors ${
                        viewMode === "grid"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 transition-colors ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-gray-400 hover:text-gray-700"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {filters.categoryIds.map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    return cat ? (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200"
                      >
                        {cat.name}
                        <button
                          onClick={() => toggleCategory(id)}
                          className="hover:text-blue-900"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ) : null;
                  })}
                  {filters.minRating > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                      {filters.minRating}+ Stars
                      <button
                        onClick={() =>
                          setFilters((prev) => ({ ...prev, minRating: 0 }))
                        }
                        className="hover:text-amber-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {(filters.priceRange[0] > 0 ||
                    filters.priceRange[1] < MAX_PRICE) && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                      {formatPrice(filters.priceRange[0])} –{" "}
                      {formatPrice(filters.priceRange[1])}
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            priceRange: [0, MAX_PRICE],
                          }))
                        }
                        className="hover:text-green-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {filters.inStockOnly && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-200">
                      In Stock
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            inStockOnly: false,
                          }))
                        }
                        className="hover:text-purple-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Products Grid / List */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 py-24 text-center">
                  <p className="text-4xl mb-4">🔍</p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Try adjusting your filters to see more results.
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredProducts.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>
              ) : (
                /* List view */
                <div className="space-y-3">
                  {filteredProducts.map((product) => {
                    const discount = product.originalPrice
                      ? Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )
                      : 0;
                    return (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="group flex items-center gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-blue-200 transition-all"
                      >
                        <div className="h-24 w-24 rounded-xl bg-gray-50 overflow-hidden shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">
                            {product.description}
                          </p>
                          <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-amber-400 text-xs">★</span>
                            <span className="text-xs font-medium text-gray-700">
                              {product.rating}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-lg font-bold text-blue-600">
                            PKR {product.price.toLocaleString()}
                          </p>
                          {product.originalPrice && (
                            <p className="text-xs text-gray-400 line-through">
                              PKR {product.originalPrice.toLocaleString()}
                            </p>
                          )}
                          {discount > 0 && (
                            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                              -{discount}%
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto lg:hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent />
            <div className="px-5 pb-6">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default ShopPage;