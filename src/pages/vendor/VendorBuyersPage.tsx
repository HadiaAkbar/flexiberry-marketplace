import { useState } from "react";
import {
  Users, Search, ShoppingCart, CreditCard,
  TrendingUp, MapPin, Phone, Mail,
  Star, Eye, MoreHorizontal,
} from "lucide-react";

const BUYERS = [
  { id: 1, name: "Ahmad Bilal", email: "ahmad@email.com", phone: "0300-1234567", city: "Lahore", orders: 5, totalSpent: 489995, rating: 4.9, status: "active", joined: "Jan 2025", avatar: "AB", color: "#3b82f6" },
  { id: 2, name: "Hina Butt", email: "hina@email.com", phone: "0321-9876543", city: "Karachi", orders: 3, totalSpent: 369997, rating: 4.7, status: "active", joined: "Mar 2025", avatar: "HB", color: "#8b5cf6" },
  { id: 3, name: "Murad Khan", email: "murad@email.com", phone: "0333-5556789", city: "Islamabad", orders: 7, totalSpent: 559993, rating: 5.0, status: "active", joined: "Nov 2024", avatar: "MK", color: "#10b981" },
  { id: 4, name: "Sara Anwar", email: "sara@email.com", phone: "0345-1112222", city: "Faisalabad", orders: 2, totalSpent: 429998, rating: 4.5, status: "active", joined: "Jun 2025", avatar: "SA", color: "#f59e0b" },
  { id: 5, name: "Faisal Mir", email: "faisal@email.com", phone: "0312-3334444", city: "Multan", orders: 4, totalSpent: 379996, rating: 4.3, status: "inactive", joined: "Sep 2024", avatar: "FM", color: "#ef4444" },
  { id: 6, name: "Zara Hussain", email: "zara@email.com", phone: "0307-7778888", city: "Rawalpindi", orders: 6, totalSpent: 619994, rating: 4.8, status: "active", joined: "Feb 2025", avatar: "ZH", color: "#06b6d4" },
  { id: 7, name: "Ali Hassan", email: "ali@email.com", phone: "0315-2223333", city: "Lahore", orders: 1, totalSpent: 89999, rating: 4.6, status: "active", joined: "Dec 2025", avatar: "AH", color: "#d946ef" },
  { id: 8, name: "Nadia Iqbal", email: "nadia@email.com", phone: "0319-4445555", city: "Karachi", orders: 3, totalSpent: 479997, rating: 4.9, status: "active", joined: "Aug 2025", avatar: "NI", color: "#22c55e" },
];

const VendorBuyersPage = () => {
  const [search, setSearch] = useState("");
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const filtered = BUYERS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) || b.city.toLowerCase().includes(search.toLowerCase())
  );

  const totalBuyers = BUYERS.length;
  const activeBuyers = BUYERS.filter(b => b.status === "active").length;
  const totalOrders = BUYERS.reduce((s, b) => s + b.orders, 0);
  const totalRevenue = BUYERS.reduce((s, b) => s + b.totalSpent, 0);

  const stats = [
    { label: "Total Buyers", val: totalBuyers, color: "#2563eb", bg: "#eff6ff", icon: Users },
    { label: "Active", val: activeBuyers, color: "#10b981", bg: "#ecfdf5", icon: TrendingUp },
    { label: "Total Orders", val: totalOrders, color: "#8b5cf6", bg: "#f5f3ff", icon: ShoppingCart },
    { label: "Revenue", val: `Rs ${(totalRevenue / 1_000_000).toFixed(1)}M`, color: "#f59e0b", bg: "#fffbeb", icon: CreditCard },
  ];

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Buyers</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>View and manage your customer base</p>
        </div>
      </div>

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

      {/* Search */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "14px 18px", marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "relative", maxWidth: "400px" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}/>
          <input placeholder="Search buyers…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "34px", paddingRight: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a" }}/>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
        {filtered.map(buyer => (
          <div key={buyer.id} style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)")}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `linear-gradient(135deg,${buyer.color},${buyer.color}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 900, color: "white", flexShrink: 0 }}>{buyer.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{buyer.name}</p>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: buyer.status === "active" ? "#10b981" : "#94a3b8" }}/>
                </div>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: "2px 0 0" }}>{buyer.email}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                <Star size={12} color="#f59e0b" fill="#f59e0b"/><span style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{buyer.rating}</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
              <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "10px 12px" }}>
                <p style={{ fontSize: "10px", color: "#94a3b8", margin: "0 0 2px" }}>Orders</p>
                <p style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", margin: 0 }}>{buyer.orders}</p>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "10px 12px" }}>
                <p style={{ fontSize: "10px", color: "#94a3b8", margin: "0 0 2px" }}>Total Spent</p>
                <p style={{ fontSize: "14px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Rs {(buyer.totalSpent / 1000).toFixed(0)}K</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "11px", color: "#94a3b8" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={11}/> {buyer.city}</span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><Phone size={11}/> {buyer.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorBuyersPage;
