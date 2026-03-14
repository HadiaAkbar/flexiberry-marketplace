import { useState } from "react";
import {
  Package, Search, Plus, Edit2, Trash2, Eye,
  TrendingUp, Star, ToggleLeft, ToggleRight, X,
} from "lucide-react";

const INITIAL_PRODUCTS = [
  { id: 1, name: "Samsung Galaxy S24 Ultra", category: "Smartphones", price: 89999, stock: 24, sold: 156, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&q=80" },
  { id: 2, name: "iPhone 15 Pro Max 256GB", category: "Smartphones", price: 259999, stock: 12, sold: 89, rating: 4.9, status: "active", img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=80&q=80" },
  { id: 3, name: "Sony PlayStation 5 Slim", category: "Gaming", price: 79999, stock: 35, sold: 201, rating: 4.7, status: "active", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=80&q=80" },
  { id: 4, name: "MacBook Pro M3 14-inch", category: "Laptops", price: 349999, stock: 8, sold: 42, rating: 4.9, status: "active", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=80&q=80" },
  { id: 5, name: 'LG OLED 65" C3 Series', category: "TVs", price: 189999, stock: 6, sold: 28, rating: 4.6, status: "active", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e12a?w=80&q=80" },
  { id: 6, name: "iPad Pro M2 12.9-inch", category: "Tablets", price: 179999, stock: 15, sold: 67, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=80&q=80" },
  { id: 7, name: "Dyson V15 Detect Vacuum", category: "Appliances", price: 89999, stock: 0, sold: 34, rating: 4.5, status: "out_of_stock", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80" },
  { id: 8, name: "Google Pixel 8 Pro", category: "Smartphones", price: 199999, stock: 18, sold: 53, rating: 4.7, status: "active", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=80&q=80" },
  { id: 9, name: "AirPods Pro 2nd Gen", category: "Audio", price: 34999, stock: 45, sold: 312, rating: 4.8, status: "active", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=80&q=80" },
  { id: 10, name: 'Samsung 49" Odyssey G9', category: "Monitors", price: 249999, stock: 3, sold: 11, rating: 4.4, status: "draft", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=80&q=80" },
];

const CATEGORIES = ["Smartphones", "Laptops", "Tablets", "TVs", "Audio", "Gaming", "Appliances", "Monitors"];
const EMPTY_FORM = { name: "", category: "", price: "", stock: "", downPayment: "", plans: "3,6,12", status: "active", description: "", imgPreview: "" };

const fmtId = (id) => "FB-PRD-" + String(id).padStart(4, "0");

const VendorProductsPage = () => {
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [modal, setModal] = useState(null); // null | "add" | "edit" | "view"
  const [viewProduct, setViewProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [nextId, setNextId] = useState(11);

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (catFilter === "all" || p.category === catFilter)
  );

  const stats = [
    { label: "Total Products", val: products.length, icon: Package, bg: "#eff6ff", color: "#2563eb" },
    { label: "Active", val: products.filter((p) => p.status === "active").length, icon: ToggleRight, bg: "#ecfdf5", color: "#10b981" },
    { label: "Out of Stock", val: products.filter((p) => p.stock === 0).length, icon: ToggleLeft, bg: "#fef2f2", color: "#ef4444" },
    { label: "Total Revenue", val: `₨${(products.reduce((s, p) => s + p.price * p.sold, 0) / 1_000_000).toFixed(1)}M`, icon: TrendingUp, bg: "#fffbeb", color: "#f59e0b" },
  ];

  const pillStyle = (s) => ({
    fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "20px", textTransform: "capitalize", display: "inline-flex", alignItems: "center",
    background: s === "active" ? "#ecfdf5" : s === "draft" ? "#f1f5f9" : "#fef2f2",
    color: s === "active" ? "#059669" : s === "draft" ? "#64748b" : "#dc2626",
    border: `1px solid ${s === "active" ? "#a7f3d0" : s === "draft" ? "#e2e8f0" : "#fecaca"}`,
  });

  const pillLabel = (s) => (s === "out_of_stock" ? "Out of Stock" : s);

  const deleteProduct = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModal("add");
  };

  const openEdit = (id) => {
    const p = products.find((x) => x.id === id);
    setForm({
      name: p.name, category: p.category, price: String(p.price),
      stock: String(p.stock), downPayment: "", plans: "3,6,12",
      status: p.status === "out_of_stock" ? "active" : p.status,
      description: "", imgPreview: p.img,
    });
    setEditingId(id);
    setModal("edit");
  };

  const openView = (id) => {
    setViewProduct(products.find((x) => x.id === id));
    setModal("view");
  };

  const closeModal = () => { setModal(null); setViewProduct(null); setEditingId(null); };

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, imgPreview: (ev.target?.result as string) || "" }));
    reader.readAsDataURL(file);
  };

  const submitProduct = () => {
    if (!form.name.trim() || !form.category) return alert("Please fill in product name and category.");
    const price = parseInt(form.price) || 0;
    const stock = parseInt(form.stock) || 0;
    const status = stock === 0 ? "out_of_stock" : form.status;
    if (editingId !== null) {
      setProducts((prev) => prev.map((p) => p.id === editingId ? { ...p, name: form.name, category: form.category, price, stock, status, img: form.imgPreview || p.img } : p));
    } else {
      setProducts((prev) => [{ id: nextId, name: form.name, category: form.category, price, stock, sold: 0, rating: 4.5, status, img: form.imgPreview || "" }, ...prev]);
      setNextId((n) => n + 1);
    }
    closeModal();
  };

  // Shared styles
  const inputStyle = { height: "40px", padding: "0 12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a", width: "100%" };
  const labelStyle = { fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "6px", display: "block" };
  const modalOverlay: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 };
  const modalBox: React.CSSProperties = { ...F, background: "white", borderRadius: "22px", width: "520px", maxWidth: "95vw", border: "1.5px solid #e2e8f0", maxHeight: "90vh", display: "flex", flexDirection: "column" };
  const modalHead = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 24px 16px", borderBottom: "1px solid #f1f5f9" };
  const modalFoot = { padding: "16px 24px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "10px", justifyContent: "flex-end" };
  const btnPrimary = { height: "40px", paddingInline: "18px", borderRadius: "10px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "white", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px", ...F };
  const btnGhost = { height: "40px", paddingInline: "16px", borderRadius: "10px", background: "#f1f5f9", color: "#64748b", border: "1.5px solid #e2e8f0", cursor: "pointer", fontSize: "13px", fontWeight: 700, ...F };
  const closeBtn = { width: "30px", height: "30px", borderRadius: "8px", border: "none", background: "#f1f5f9", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
  const detailBadge = { display: "inline-flex", alignItems: "center", gap: "8px", background: "#f8fafc", borderRadius: "10px", padding: "10px 14px", fontSize: "12px", color: "#64748b", fontWeight: 600, border: "1.5px solid #f1f5f9" };

  // Form modal (shared for add & edit)
  const FormModal = (
    <div onClick={closeModal} style={modalOverlay}>
      <div onClick={(e) => e.stopPropagation()} style={modalBox}>
        <div style={modalHead}>
          <span style={{ fontSize: "17px", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.01em" }}>
            {modal === "edit" ? "Edit Product" : "Add New Product"}
          </span>
          <button style={closeBtn} onClick={closeModal}><X size={16} color="#64748b" /></button>
        </div>

        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {/* Image Upload */}
          <label style={{ display: "block", border: "2px dashed #e2e8f0", borderRadius: "12px", padding: "20px", textAlign: "center", cursor: "pointer", marginBottom: "16px", background: "#f8fafc" }}>
            {form.imgPreview
              ? <img src={form.imgPreview} alt="" style={{ maxHeight: "120px", objectFit: "contain", borderRadius: "8px" }} />
              : <><div style={{ fontSize: "26px", marginBottom: "6px" }}>📷</div><div style={{ fontSize: "12px", color: "#94a3b8" }}>Click to upload product image</div></>}
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImgUpload} />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Product Name</label>
              <input style={inputStyle} placeholder="e.g. Samsung Galaxy S24 Ultra" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Price (₨)</label>
              <input style={inputStyle} type="number" placeholder="89999" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Stock Quantity</label>
              <input style={inputStyle} type="number" placeholder="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} />
            </div>
            <div>
              <label style={labelStyle}>Installment Plans</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.plans} onChange={(e) => setForm((f) => ({ ...f, plans: e.target.value }))}>
                <option value="3,6,12">3 / 6 / 12 Months</option>
                <option value="6,12">6 / 12 Months</option>
                <option value="12,24">12 / 24 Months</option>
                <option value="none">No Installments</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Down Payment (₨)</label>
              <input style={inputStyle} type="number" placeholder="0" value={form.downPayment} onChange={(e) => setForm((f) => ({ ...f, downPayment: e.target.value }))} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Description</label>
              <textarea style={{ ...inputStyle, height: "80px", padding: "10px 12px", resize: "none" }} placeholder="Short product description…" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </div>
          </div>
        </div>

        <div style={modalFoot}>
          <button style={btnGhost} onClick={closeModal}>Cancel</button>
          <button style={btnPrimary} onClick={submitProduct}>
            {modal === "edit" ? "💾 Save Changes" : <><Plus size={14} /> Add Product</>}
          </button>
        </div>
      </div>
    </div>
  );

  // View modal
  const ViewModal = viewProduct && (
    <div onClick={closeModal} style={modalOverlay}>
      <div onClick={(e) => e.stopPropagation()} style={{ ...modalBox, width: "440px" }}>
        <div style={modalHead}>
          <span style={{ fontSize: "17px", fontWeight: 900, color: "#0f172a" }}>Product Details</span>
          <button style={closeBtn} onClick={closeModal}><X size={16} color="#64748b" /></button>
        </div>

        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          {/* Product header */}
          <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "18px" }}>
            {viewProduct.img
              ? <img src={viewProduct.img} alt="" style={{ width: "80px", height: "80px", borderRadius: "14px", objectFit: "cover", flexShrink: 0 }} />
              : <div style={{ width: "80px", height: "80px", borderRadius: "14px", background: "#e2e8f0", flexShrink: 0 }} />}
            <div>
              <div style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", marginBottom: "6px" }}>{viewProduct.name}</div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                <span style={pillStyle(viewProduct.status)}>{pillLabel(viewProduct.status)}</span>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>⭐ {viewProduct.rating}</span>
              </div>
            </div>
          </div>

          {/* Detail badges grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              ["🆔", "Product ID", fmtId(viewProduct.id)],
              ["📦", "Category", viewProduct.category],
              ["💰", "Price", `₨${viewProduct.price.toLocaleString()}`],
              ["🏷️", "Stock", viewProduct.stock === 0 ? "Out of Stock" : `${viewProduct.stock} units`],
              ["📊", "Units Sold", viewProduct.sold],
              ["💵", "Total Revenue", `₨${(viewProduct.price * viewProduct.sold).toLocaleString()}`],
            ].map(([icon, label, val]) => (
              <div key={label} style={detailBadge}>
                <span style={{ fontSize: "16px" }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "10px", color: "#94a3b8", marginBottom: "1px" }}>{label}</div>
                  <strong style={{ fontSize: "13px", color: viewProduct.stock === 0 && label === "Stock" ? "#ef4444" : "#0f172a" }}>{val}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={modalFoot}>
          <button style={btnGhost} onClick={closeModal}>Close</button>
          <button style={btnPrimary} onClick={() => { closeModal(); openEdit(viewProduct.id); }}>✏️ Edit Product</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "22px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Products</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Manage your product catalog</p>
        </div>
        <button onClick={openAdd} style={{ ...btnPrimary, height: "40px", paddingInline: "18px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "20px" }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "16px 18px", display: "flex", alignItems: "center", gap: "14px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "13px 18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "180px" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }} />
          <input placeholder="Search products…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "34px", paddingRight: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a" }} />
        </div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button key={c} onClick={() => setCatFilter(c)}
              style={{ height: "34px", paddingInline: "11px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 700, ...F, textTransform: "capitalize", background: catFilter === c ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9", color: catFilter === c ? "white" : "#64748b", boxShadow: catFilter === c ? "0 4px 12px rgba(37,99,235,0.3)" : "none", transition: "all 0.18s" }}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 90px 60px 70px 100px 80px", padding: "11px 20px", background: "#fafbff", borderBottom: "1px solid #f1f5f9", gap: "10px" }}>
          {["Product", "Category", "Price", "Stock", "Sold", "Status", "Actions"].map((h) => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: "32px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>No products found</div>
        )}

        {filtered.map((p) => (
          <div key={p.id}
            style={{ display: "grid", gridTemplateColumns: "1fr 110px 90px 60px 70px 100px 80px", padding: "13px 20px", borderBottom: "1px solid #f8fafc", gap: "10px", alignItems: "center", transition: "background 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
              {p.img
                ? <img src={p.img} alt="" style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                : <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "#e2e8f0", flexShrink: 0 }} />}
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Star size={10} color="#f59e0b" fill="#f59e0b" />
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{p.rating}</span>
                  <span style={{ fontSize: "11px", color: "#cbd5e1" }}>·</span>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>{fmtId(p.id)}</span>
                </div>
              </div>
            </div>

            <span style={{ fontSize: "11px", color: "#64748b" }}>{p.category}</span>
            <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>₨{p.price.toLocaleString()}</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: p.stock === 0 ? "#ef4444" : "#0f172a" }}>{p.stock}</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>{p.sold}</span>
            <span style={pillStyle(p.status)}>{pillLabel(p.status)}</span>

            <div style={{ display: "flex", gap: "4px" }}>
              <button onClick={() => openView(p.id)} style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#eff6ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Eye size={12} color="#2563eb" /></button>
              <button onClick={() => openEdit(p.id)} style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#f1f5f9", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Edit2 size={12} color="#64748b" /></button>
              <button onClick={() => deleteProduct(p.id)} style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#fef2f2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={12} color="#ef4444" /></button>
            </div>
          </div>
        ))}

        <div style={{ padding: "13px 20px", background: "#fafbff", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Showing {filtered.length} of {products.length} products</span>
        </div>
      </div>

      {/* Modals */}
      {(modal === "add" || modal === "edit") && FormModal}
      {modal === "view" && ViewModal}
    </div>
  );
};

export default VendorProductsPage;
