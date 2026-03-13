import { useState } from "react";
import {
  ShoppingCart, Search, Filter, Eye, Check, X,
  Clock, TrendingUp, Package, ChevronDown,
  MapPin, CreditCard, Phone, Calendar,
  CheckCircle, XCircle, AlertCircle, Truck, MoreHorizontal,
} from "lucide-react";

const ORDERS = [
  { id: "ORD-2026-0091", product: "Samsung Galaxy S24 Ultra", buyer: "Ahmad Bilal",    phone: "0300-1234567", city: "Lahore",     plan: "12-month", amount: 89999,  status: "pending",   date: "Mar 13, 2026", avatar: "AB", color: "#3b82f6", img: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=60&q=80" },
  { id: "ORD-2026-0090", product: "iPhone 15 Pro Max 256GB",  buyer: "Hina Butt",     phone: "0321-9876543", city: "Karachi",    plan: "6-month",  amount: 259999, status: "approved",  date: "Mar 12, 2026", avatar: "HB", color: "#8b5cf6", img: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=60&q=80" },
  { id: "ORD-2026-0089", product: "Sony PlayStation 5 Slim",  buyer: "Murad Khan",    phone: "0333-5556789", city: "Islamabad",  plan: "6-month",  amount: 79999,  status: "shipped",   date: "Mar 11, 2026", avatar: "MK", color: "#10b981", img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=60&q=80" },
  { id: "ORD-2026-0088", product: "MacBook Pro M3 14-inch",   buyer: "Sara Anwar",    phone: "0345-1112222", city: "Faisalabad", plan: "12-month", amount: 349999, status: "pending",   date: "Mar 11, 2026", avatar: "SA", color: "#f59e0b", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=60&q=80" },
  { id: "ORD-2026-0087", product: "LG OLED 65\" C3 Series",  buyer: "Faisal Mir",    phone: "0312-3334444", city: "Multan",     plan: "18-month", amount: 189999, status: "rejected",  date: "Mar 10, 2026", avatar: "FM", color: "#ef4444", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f4e12a?w=60&q=80" },
  { id: "ORD-2026-0086", product: "iPad Pro M2 12.9-inch",    buyer: "Zara Hussain",  phone: "0307-7778888", city: "Rawalpindi", plan: "6-month",  amount: 179999, status: "delivered", date: "Mar 09, 2026", avatar: "ZH", color: "#06b6d4", img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=60&q=80" },
  { id: "ORD-2026-0085", product: "Dyson V15 Detect Vacuum",  buyer: "Ali Hassan",    phone: "0315-2223333", city: "Lahore",     plan: "3-month",  amount: 89999,  status: "delivered", date: "Mar 08, 2026", avatar: "AH", color: "#d946ef", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=60&q=80" },
  { id: "ORD-2026-0084", product: "Google Pixel 8 Pro",       buyer: "Nadia Iqbal",   phone: "0319-4445555", city: "Karachi",    plan: "12-month", amount: 199999, status: "approved",  date: "Mar 07, 2026", avatar: "NI", color: "#22c55e", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=60&q=80" },
];

const STATUS_CONFIG = {
  pending:   { label: "Pending",   bg: "#fef3c7", color: "#92400e", border: "#fde68a", icon: Clock,         dot: "#f59e0b" },
  approved:  { label: "Approved",  bg: "#dbeafe", color: "#1e40af", border: "#93c5fd", icon: CheckCircle,   dot: "#3b82f6" },
  shipped:   { label: "Shipped",   bg: "#f0fdf4", color: "#14532d", border: "#86efac", icon: Truck,         dot: "#22c55e" },
  delivered: { label: "Delivered", bg: "#ecfdf5", color: "#065f46", border: "#6ee7b7", icon: CheckCircle,   dot: "#10b981" },
  rejected:  { label: "Rejected",  bg: "#fee2e2", color: "#991b1b", border: "#fecaca", icon: XCircle,       dot: "#ef4444" },
};

type OrderStatus = keyof typeof STATUS_CONFIG;

const VendorOrdersPage = () => {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[0] | null>(null);
  const [orders, setOrders]         = useState(ORDERS);

  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const filtered = orders.filter((o) => {
    const matchSearch = o.buyer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search) || o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const updateStatus = (id: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) setSelectedOrder((prev) => prev ? { ...prev, status: newStatus } : prev);
  };

  const stats = [
    { label: "Total Orders",  val: orders.length,                                            color: "#2563eb", bg: "#eff6ff",  icon: ShoppingCart },
    { label: "Pending",       val: orders.filter((o) => o.status === "pending").length,      color: "#f59e0b", bg: "#fffbeb",  icon: Clock        },
    { label: "Approved",      val: orders.filter((o) => o.status === "approved").length,     color: "#3b82f6", bg: "#dbeafe",  icon: CheckCircle  },
    { label: "Delivered",     val: orders.filter((o) => o.status === "delivered").length,    color: "#10b981", bg: "#ecfdf5",  icon: Truck        },
  ];

  return (
    <div style={{ ...F, minHeight: "100%" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Orders</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Manage and process customer orders</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "14px", marginBottom: "22px" }}>
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
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "14px 18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
          <input placeholder="Search by order ID, buyer, or product…" value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "34px", paddingRight: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", boxSizing: "border-box", ...F, background: "#f8fafc", color: "#0f172a" }} />
        </div>

        {/* Status tabs */}
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "pending", "approved", "shipped", "delivered", "rejected"].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ height: "36px", paddingInline: "12px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 700, transition: "all 0.18s", ...F, textTransform: "capitalize",
                background: statusFilter === s ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9",
                color: statusFilter === s ? "white" : "#64748b",
                boxShadow: statusFilter === s ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
              }}>
              {s === "all" ? `All (${orders.length})` : `${s} (${orders.filter(o => o.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 120px 100px 110px 120px 100px", padding: "12px 20px", background: "#fafbff", borderBottom: "1px solid #f1f5f9", gap: "12px" }}>
          {["Order ID", "Product / Buyer", "Amount", "Plan", "Status", "Date", "Actions"].map((h) => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {filtered.map((order, i) => {
          const sc = STATUS_CONFIG[order.status as OrderStatus];
          return (
            <div key={order.id}
              style={{ display: "grid", gridTemplateColumns: "160px 1fr 120px 100px 110px 120px 100px", padding: "14px 20px", borderBottom: "1px solid #f8fafc", gap: "12px", alignItems: "center", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {/* Order ID */}
              <div>
                <p style={{ fontSize: "12px", fontWeight: 800, color: "#2563eb", margin: 0, fontFamily: "monospace" }}>{order.id}</p>
              </div>

              {/* Product + buyer */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={order.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.product}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: `linear-gradient(135deg,${order.color},${order.color}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "7px", fontWeight: 900, color: "white", flexShrink: 0 }}>{order.avatar}</div>
                    <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{order.buyer} · {order.city}</p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <p style={{ fontSize: "13px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Rs {order.amount.toLocaleString()}</p>

              {/* Plan */}
              <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "#f1f5f9", color: "#475569" }}>
                {order.plan}
              </span>

              {/* Status */}
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "20px", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                <sc.icon size={9} /> {sc.label}
              </span>

              {/* Date */}
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{order.date}</p>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <button onClick={() => setSelectedOrder(order)}
                  style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#eff6ff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Eye size={12} color="#2563eb" />
                </button>
                {order.status === "pending" && <>
                  <button onClick={() => updateStatus(order.id, "approved")}
                    style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#d1fae5", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={12} color="#059669" />
                  </button>
                  <button onClick={() => updateStatus(order.id, "rejected")}
                    style={{ width: "28px", height: "28px", borderRadius: "7px", background: "#fee2e2", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <X size={12} color="#ef4444" />
                  </button>
                </>}
              </div>
            </div>
          );
        })}

        <div style={{ padding: "14px 20px", background: "#fafbff", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Showing {filtered.length} of {orders.length} orders</span>
        </div>
      </div>

      {/* Order Detail Side Panel */}
      {selectedOrder && (
        <>
          <div onClick={() => setSelectedOrder(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(4px)", zIndex: 998 }} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "min(420px,95vw)", background: "white", zIndex: 999, boxShadow: "-20px 0 60px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", ...F }}>
            {/* Panel header */}
            <div style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", margin: "0 0 2px", fontFamily: "monospace" }}>{selectedOrder.id}</p>
                <h2 style={{ color: "white", fontWeight: 800, fontSize: "16px", margin: 0 }}>Order Details</h2>
              </div>
              <button onClick={() => setSelectedOrder(null)} style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "none", color: "white", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {/* Product */}
              <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "16px", marginBottom: "16px", display: "flex", gap: "12px", alignItems: "center" }}>
                <img src={selectedOrder.img} alt="" style={{ width: "60px", height: "60px", borderRadius: "10px", objectFit: "cover" }} />
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{selectedOrder.product}</p>
                  <p style={{ fontSize: "16px", fontWeight: 900, color: "#2563eb", margin: 0 }}>Rs {selectedOrder.amount.toLocaleString()}</p>
                </div>
              </div>

              {/* Status change */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#374151", marginBottom: "8px" }}>UPDATE STATUS</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(["pending", "approved", "shipped", "delivered", "rejected"] as OrderStatus[]).map((s) => {
                    const sc = STATUS_CONFIG[s];
                    const isActive = selectedOrder.status === s;
                    return (
                      <button key={s} onClick={() => updateStatus(selectedOrder.id, s)}
                        style={{ height: "32px", paddingInline: "12px", borderRadius: "8px", border: `1.5px solid ${isActive ? sc.dot : "#e2e8f0"}`, cursor: "pointer", fontSize: "11px", fontWeight: 700, ...F, textTransform: "capitalize", background: isActive ? sc.bg : "white", color: isActive ? sc.color : "#64748b", transition: "all 0.15s" }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Buyer info */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#374151", marginBottom: "10px" }}>BUYER INFORMATION</p>
                {[
                  { icon: CreditCard, label: "Name",     val: selectedOrder.buyer },
                  { icon: Phone,      label: "Phone",    val: selectedOrder.phone },
                  { icon: MapPin,     label: "City",     val: selectedOrder.city },
                  { icon: Package,    label: "Plan",     val: selectedOrder.plan },
                  { icon: Calendar,   label: "Date",     val: selectedOrder.date },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#64748b" />
                    </div>
                    <div>
                      <p style={{ fontSize: "10px", color: "#94a3b8", margin: "0 0 1px", fontWeight: 600 }}>{label}</p>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#0f172a", margin: 0 }}>{val}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel footer */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: "10px" }}>
              <button style={{ flex: 1, height: "42px", borderRadius: "11px", border: "1.5px solid #e2e8f0", background: "white", fontSize: "13px", fontWeight: 700, color: "#475569", cursor: "pointer", ...F }}>
                Print Invoice
              </button>
              <button
                onClick={() => updateStatus(selectedOrder.id, "approved")}
                style={{ flex: 2, height: "42px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", color: "white", fontSize: "13px", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", ...F }}>
                Approve Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorOrdersPage;
