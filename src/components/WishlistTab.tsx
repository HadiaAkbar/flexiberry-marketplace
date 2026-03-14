import { useState } from "react";
import { Heart, Store, ShoppingCart, Share2, Trash2, Clock, Tag, TrendingDown, Package } from "lucide-react";

const INITIAL_WISHLIST = [
  { id: "p1", name: "Samsung Galaxy S24 Ultra 256GB", shop: "TechZone Electronics", price: 299999, originalPrice: 349999, rating: 4.8, reviews: 1240, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80", inStock: true, installment: 24999, discount: 14, addedAt: "2 days ago" },
  { id: "p2", name: 'LG OLED C3 65" Smart TV', shop: "Home Appliance Hub", price: 499999, originalPrice: 589999, rating: 4.9, reviews: 856, image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80", inStock: true, installment: 41666, discount: 15, addedAt: "5 days ago" },
  { id: "p3", name: "MacBook Air M3 16GB", shop: "Digital World Store", price: 389999, originalPrice: 389999, rating: 4.7, reviews: 432, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80", inStock: false, installment: 32499, discount: 0, addedAt: "1 week ago" },
  { id: "p4", name: "Sony WH-1000XM5 Headphones", shop: "Audio Vision", price: 89999, originalPrice: 109999, rating: 4.9, reviews: 2100, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80", inStock: true, installment: 7499, discount: 18, addedAt: "3 days ago" },
  { id: "p5", name: "Dyson V15 Detect Vacuum", shop: "Home Appliance Hub", price: 149999, originalPrice: 179999, rating: 4.6, reviews: 678, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80", inStock: true, installment: 12499, discount: 17, addedAt: "1 day ago" },
  { id: "p6", name: 'iPad Pro M4 12.9"', shop: "TechZone Electronics", price: 269999, originalPrice: 299999, rating: 4.8, reviews: 521, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80", inStock: true, installment: 22499, discount: 10, addedAt: "4 days ago" },
];

const fmt = (n: number) => "PKR " + n.toLocaleString("en-PK");

const Stars = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "2px", fontSize: "11px" }}>
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? "#f59e0b" : "#d1d5db" }}>★</span>
    ))}
    <span style={{ fontSize: "10px", color: "#94a3b8", marginLeft: "2px" }}>({rating})</span>
  </div>
);

const WishlistTab = () => {
  const F = { fontFamily: "'Plus Jakarta Sans', sans-serif" };
  const [items, setItems] = useState(INITIAL_WISHLIST);
  const [cartAdded, setCartAdded] = useState<string[]>([]);

  const remove = (id: string) => setItems(prev => prev.filter(x => x.id !== id));

  const clearAll = () => {
    if (confirm("Remove all wishlist items?")) setItems([]);
  };

  const addToCart = (id: string) => {
    if (cartAdded.includes(id)) return;
    setCartAdded(prev => [...prev, id]);
    setTimeout(() => setCartAdded(prev => prev.filter(x => x !== id)), 2000);
  };

  const cardStyle = (hovered: boolean): React.CSSProperties => ({
    background: "white",
    borderRadius: "16px",
    border: "1.5px solid rgba(37,99,235,0.07)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    transition: "box-shadow 0.2s, transform 0.2s",
    boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.09)" : "0 2px 8px rgba(0,0,0,0.04)",
    transform: hovered ? "translateY(-2px)" : "none",
  });

  return (
    <div style={{ ...F }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
        <div>
          <h1 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.02em" }}>My Wishlist</h1>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>
            {items.length} saved item{items.length !== 1 ? "s" : ""} · Easy installment on all
          </p>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#fef2f2", color: "#e11d48", border: "1.5px solid #fecdd3", borderRadius: "20px", fontSize: "12px", fontWeight: 700, padding: "5px 12px" }}>
            <Heart size={12} fill="#e11d48" /> {items.length} item{items.length !== 1 ? "s" : ""}
          </span>
          {items.length > 0 && (
            <button onClick={clearAll} style={{ ...F, fontSize: "12px", fontWeight: 700, color: "#64748b", background: "#f1f5f9", border: "1.5px solid #e2e8f0", borderRadius: "9px", padding: "6px 14px", cursor: "pointer" }}>
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div style={{ background: "white", borderRadius: "18px", padding: "48px 24px", border: "1.5px solid rgba(37,99,235,0.07)", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#ffe4e6,#fecdd3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <Heart size={28} color="#e11d48" fill="#e11d48" />
          </div>
          <p style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Your wishlist is empty</p>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Save products you love and buy them on easy installments</p>
        </div>
      )}

      {/* Grid */}
      {items.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "14px" }}>
          {items.map(item => {
            const added = cartAdded.includes(item.id);
            return (
              <WishlistCard
                key={item.id}
                item={item}
                added={added}
                onRemove={() => remove(item.id)}
                onAddToCart={() => addToCart(item.id)}
                F={F}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

// Separate card to use local hover state
const WishlistCard = ({ item, added, onRemove, onAddToCart, F }: any) => {
  const [hovered, setHovered] = useState(false);
  const [removeHovered, setRemoveHovered] = useState(false);

  return (
    <div
      style={{
        background: "white", borderRadius: "16px",
        border: "1.5px solid rgba(37,99,235,0.07)",
        overflow: "hidden", display: "flex", flexDirection: "column",
        position: "relative", transition: "box-shadow 0.2s, transform 0.2s",
        boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.09)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      <div style={{ height: "160px", overflow: "hidden", background: "#f1f5f9", position: "relative" }}>
        {!item.inStock && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
            <span style={{ background: "#dc2626", color: "white", fontSize: "11px", fontWeight: 700, padding: "5px 12px", borderRadius: "99px", display: "flex", alignItems: "center", gap: "4px" }}>
              <Package size={11} /> Out of Stock
            </span>
          </div>
        )}
        {item.discount > 0 && (
          <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 3, background: "linear-gradient(135deg,#ef4444,#f97316)", color: "white", fontSize: "10px", fontWeight: 800, padding: "3px 8px", borderRadius: "99px", display: "flex", alignItems: "center", gap: "3px" }}>
            <TrendingDown size={10} /> -{item.discount}%
          </div>
        )}
        <button
          onClick={onRemove}
          onMouseEnter={() => setRemoveHovered(true)}
          onMouseLeave={() => setRemoveHovered(false)}
          style={{ position: "absolute", top: "8px", right: "8px", zIndex: 3, width: "28px", height: "28px", borderRadius: "50%", background: removeHovered ? "#fef2f2" : "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", color: removeHovered ? "#dc2626" : "#64748b", opacity: hovered ? 1 : 0, transition: "opacity 0.2s, background 0.15s, color 0.15s", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
        >✕</button>
        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hovered ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>

      {/* Body */}
      <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
        <div style={{ fontSize: "10px", color: "#2563eb", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px" }}>
          <Store size={10} /> {item.shop}
        </div>
        <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any, overflow: "hidden", margin: 0 }}>
          {item.name}
        </p>
        <Stars rating={item.rating} />
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "14px", fontWeight: 900, color: "#0f172a" }}>{fmt(item.price)}</span>
            {item.originalPrice > item.price && (
              <span style={{ fontSize: "11px", color: "#94a3b8", textDecoration: "line-through" }}>{fmt(item.originalPrice)}</span>
            )}
          </div>
          <div style={{ fontSize: "10px", color: "#059669", fontWeight: 700, marginTop: "2px", display: "flex", alignItems: "center", gap: "3px" }}>
            <Tag size={9} /> {fmt(item.installment)}/mo · 12-month plan
          </div>
        </div>
        <div style={{ fontSize: "10px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "3px" }}>
          <Clock size={9} /> Saved {item.addedAt}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
          <button
            onClick={onAddToCart}
            disabled={!item.inStock}
            style={{
              ...F, flex: 1, height: "34px", borderRadius: "9px", border: added ? "1.5px solid #a7f3d0" : "none",
              cursor: item.inStock ? "pointer" : "not-allowed", fontSize: "11px", fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", transition: "all 0.15s",
              background: added ? "#ecfdf5" : item.inStock ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9",
              color: added ? "#059669" : item.inStock ? "white" : "#94a3b8",
            }}
          >
            {added ? <><span>✓</span> Added</> : item.inStock ? <><ShoppingCart size={11} /> Add to Cart</> : "Unavailable"}
          </button>
          <button style={{ width: "34px", height: "34px", borderRadius: "9px", border: "1.5px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0 }}>
            <Share2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistTab;
