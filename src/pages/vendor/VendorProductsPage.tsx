import { useState } from "react";
import {
  Package, Search, Plus, Edit2, Trash2, Eye,
  TrendingUp, Filter, MoreHorizontal, Star,
  ChevronLeft, ChevronRight, ToggleLeft, ToggleRight,
} from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Samsung Galaxy S24 Ultra", category: "Smartphones", price: 89999, stock: 24, sold: 156, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&q=80" },
  { id: 2, name: "iPhone 15 Pro Max 256GB", category: "Smartphones", price: 259999, stock: 12, sold: 89, rating: 4.9, status: "active", img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=80&q=80" },
  { id: 3, name: "Sony PlayStation 5 Slim", category: "Gaming", price: 79999, stock: 35, sold: 201, rating: 4.7, status: "active", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=80&q=80" },
  { id: 4, name: "MacBook Pro M3 14-inch", category: "Laptops", price: 349999, stock: 8, sold: 42, rating: 4.9, status: "active", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80" },
  { id: 5, name: 'LG OLED 65" C3 Series', category: "TVs", price: 189999, stock: 6, sold: 28, rating: 4.6, status: "active", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e12a?w=80&q=80" },
  { id: 6, name: "iPad Pro M2 12.9-inch", category: "Tablets", price: 179999, stock: 15, sold: 67, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&q=80" },
  { id: 7, name: "Dyson V15 Detect Vacuum", category: "Appliances", price: 89999, stock: 0, sold: 34, rating: 4.5, status: "out_of_stock", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80" },
  { id: 8, name: "Google Pixel 8 Pro", category: "Smartphones", price: 199999, stock: 18, sold: 53, rating: 4.7, status: "active", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=80&q=80" },
  { id: 9, name: "AirPods Pro 2nd Gen", category: "Audio", price: 34999, stock: 45, sold: 312, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&q=80" },
  { id: 10, name: "Samsung 49\" Odyssey G9", category: "Monitors", price: 249999, stock: 3, sold: 11, rating: 4.4, status: "draft", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&q=80" },
];

const VendorProductsPage = () => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const categories = ["all", ...new Set(PRODUCTS.map(p => p.category))];
  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "all" || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const totalProducts = PRODUCTS.length;
  const activeProducts = PRODUCTS.filter(p => p.status === "active").length;
  const outOfStock = PRODUCTS.filter(p => p.stock === 0).length;
  const totalRevenue = PRODUCTS.reduce((s, p) => s + p.price * p.sold, 0);

  const stats = [
    { label: "Total Products", val: totalProducts, color: "#2563eb", bg: "#eff6ff", icon: Package },
    { label: "Active", val: activeProducts, color: "#10b981", bg: "#ecfdf5", icon: ToggleRight },
    { label: "Out of Stock", val: outOfStock, color: "#ef4444", bg: "#fef2f2", icon: ToggleLeft },
    { label: "Total Revenue", val: `Rs ${(totalRevenue / 1_000_000).toFixed(1)}M`, color: "#f59e0b", bg: "#fffbeb", icon: TrendingUp },
  ];

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Products</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Manage your product catalog</p>
        </div>
        <button style={{ height: "40px", paddingInline: "18px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", ...F }}>
          <Plus size={16}/> Add Product
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "22px" }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <s.icon size={18} color={s.color}/>
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "14px 18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}/>
          <input placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "34px", paddingRight: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a" }}/>
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              style={{ height: "36px", paddingInline: "12px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 700, ...F, textTransform: "capitalize",
                background: catFilter === c ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9",
                color: catFilter === c ? "white" : "#64748b",
                boxShadow: catFilter === c ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                transition: "all 0.18s" }}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Product Table */}
      <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 80px 80px 90px 100px 80px", padding: "12px 20px", background: "#fafbff", borderBottom: "1px solid #f1f5f9", gap: "12px" }}>
          {["Product", "Category", "Price", "Stock", "Sold", "Status", "Actions"].map(h => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {filtered.map(product => (
          <div key={product.id}
            style={{ display: "grid", gridTemplateColumns: "1fr 120px 80px 80px 90px 100px 80px", padding: "14px 20px", borderBottom: "1px solid #f8fafc", gap: "12px", alignItems: "center", transition: "background 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            {/* Product */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
              <img src={product.img} alt="" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }}/>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{product.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                  <Star size={10} color="#f59e0b" fill="#f59e0b"/><span style={{ fontSize: "11px", color: "#94a3b8" }}>{product.rating}</span>
                </div>
              </div>
            </div>
            <span style={{ fontSize: "11px", color: "#64748b" }}>{product.category}</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>Rs {product.price.toLocaleString()}</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: product.stock === 0 ? "#ef4444" : "#0f172a" }}>{product.stock}</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>{product.sold}</span>
            <span style={{ fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "20px",
              background: product.status === "active" ? "#ecfdf5" : product.status === "draft" ? "#f1f5f9" : "#fef2f2",
              color: product.status === "active" ? "#059669" : product.status === "draft" ? "#64748b" : "#dc2626",
              border: `1px solid ${product.status === "active" ? "#a7f3d0" : product.status === "draft" ? "#e2e8f0" : "#fecaca"}`,
              textTransform: "capitalize" }}>{product.status === "out_of_stock" ? "Out of Stock" : product.status}</span>
            <div style={{ display: "flex", gap: "4px" }}>
              <button style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#eff6ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={12} color="#2563eb"/></button>
              <button style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#f1f5f9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={12} color="#64748b"/></button>
              <button style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#fef2f2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} color="#ef4444"/></button>
            </div>
          </div>
        ))}

        <div style={{ padding: "14px 20px", background: "#fafbff", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Showing {filtered.length} of {PRODUCTS.length} products</span>
        </div>
      </div>
    </div>
  );
};

export default VendorProductsPage;
