import { useState } from "react";
import WishlistTab from "@/components/WishlistTab";
import { Link } from "react-router-dom";
import {
  User, ShoppingBag, CreditCard, Heart, Bell, Settings,
  ChevronRight, Package, CheckCircle2, Clock, AlertCircle,
  TrendingUp, Star, MapPin, Phone, Mail, LogOut,
  Home, BarChart3, Truck, Gift, Shield, Eye, Download,
  Calendar, Wallet, ArrowUpRight, MoreHorizontal, Search,
  ChevronDown, RefreshCw, X
} from "lucide-react";

/* ── FlexiBerry Logo ── */
const FlexiBerryLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="db-grad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/><stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="db-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.22"/><stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="26" fill="url(#db-grad)"/>
    <rect width="100" height="100" rx="26" fill="url(#db-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#db-grad)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#db-grad)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#db-grad)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#db-grad)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#db-grad)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#db-grad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#db-grad)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/><circle cx="35" cy="86" r="3.8" fill="url(#db-grad)"/><circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/><circle cx="70" cy="86" r="3.8" fill="white"/><circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      <circle cx="43" cy="92" r="2.2" fill="white" opacity="0.7"/><circle cx="52" cy="92" r="2.2" fill="white" opacity="0.4"/><circle cx="61" cy="92" r="2.2" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="26" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.15"/>
  </svg>
);

/* ── Mock Data ── */
const customer = {
  name: "Muhammad Ali",
  email: "ali@example.com",
  phone: "+92 311 2345678",
  city: "Lahore, Punjab",
  memberSince: "Jan 2024",
  avatar: "MA",
  tier: "Gold Member",
  loyaltyPoints: 2450,
};

const orders = [
  {
    id: "FBR-10042",
    product: "Samsung Galaxy S24 Ultra 256GB",
    shop: "TechZone Electronics",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=80&q=80",
    price: 299999,
    date: "Mar 8, 2026",
    status: "delivered",
    installments: { total: 12, paid: 3, amount: 24999 },
    nextDue: "Apr 8, 2026",
  },
  {
    id: "FBR-09871",
    product: 'LG OLED C3 65" Smart TV',
    shop: "Home Appliance Hub",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=80&q=80",
    price: 499999,
    date: "Feb 14, 2026",
    status: "delivered",
    installments: { total: 12, paid: 2, amount: 41666 },
    nextDue: "Mar 14, 2026",
  },
  {
    id: "FBR-09102",
    product: "Sony WH-1000XM5 Headphones",
    shop: "Audio Vision",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&q=80",
    price: 89999,
    date: "Jan 20, 2026",
    status: "in_transit",
    installments: { total: 6, paid: 1, amount: 14999 },
    nextDue: "Apr 20, 2026",
  },
  {
    id: "FBR-08554",
    product: "Dyson V15 Detect Vacuum",
    shop: "Home Appliance Hub",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&q=80",
    price: 149999,
    date: "Dec 5, 2025",
    status: "completed",
    installments: { total: 6, paid: 6, amount: 24999 },
    nextDue: null,
  },
];

const wishlistCount = 6;
const notifications = [
  { id: 1, text: "Your installment for FBR-10042 is due on Apr 8", type: "warning", time: "2 days ago" },
  { id: 2, text: "Order FBR-09102 is out for delivery!", type: "success", time: "5 hours ago" },
  { id: 3, text: "Flash Sale starts tomorrow — items in your wishlist are on discount", type: "info", time: "1 day ago" },
];

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: any }> = {
  delivered:   { label: "Delivered",   color: "#059669", bg: "#d1fae5", icon: CheckCircle2 },
  in_transit:  { label: "In Transit",  color: "#2563eb", bg: "#dbeafe", icon: Truck },
  processing:  { label: "Processing",  color: "#d97706", bg: "#fef3c7", icon: RefreshCw },
  completed:   { label: "Completed",   color: "#7c3aed", bg: "#ede9fe", icon: CheckCircle2 },
};

type Tab = "overview" | "orders" | "installments" | "wishlist" | "notifications" | "settings";

/* ═══════════════════════════════════════════════════════════ */
const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const totalSpend = orders.reduce((s, o) => s + o.price, 0);
  const activeInstallments = orders.filter(o => o.installments.paid < o.installments.total);
  const totalMonthlyDue = activeInstallments.reduce((s, o) => s + o.installments.amount, 0);

  const nav: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id: "overview",      icon: Home,       label: "Overview" },
    { id: "orders",        icon: ShoppingBag, label: "My Orders",     badge: orders.length },
    { id: "installments",  icon: CreditCard,  label: "Installments",  badge: activeInstallments.length },
    { id: "wishlist",      icon: Heart,       label: "Wishlist",       badge: wishlistCount },
    { id: "notifications", icon: Bell,        label: "Notifications",  badge: notifications.length },
    { id: "settings",      icon: Settings,    label: "Settings" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4ff", fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex", flexDirection: "column" }}>

      {/* ── TOP NAV ── */}
      <nav style={{ background: "white", borderBottom: "1px solid rgba(37,99,235,0.10)", boxShadow: "0 2px 12px rgba(37,99,235,0.07)", position: "sticky", top: 0, zIndex: 50, padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: "#64748b", display: "none" }} className="db-hamburger">
            <MoreHorizontal size={20} />
          </button>
          <FlexiBerryLogo size={36} />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.1rem", background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Flexi</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0f172a" }}>Berry</span>
            </div>
            <div style={{ fontSize: "9px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "-2px" }}>Customer Portal</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Search */}
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "10px" }} />
            <input placeholder="Search orders…" style={{ height: "34px", paddingLeft: "30px", paddingRight: "12px", borderRadius: "9px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", background: "#f8faff", width: "160px", fontFamily: "'Plus Jakarta Sans',sans-serif" }} />
          </div>

          {/* Notification bell */}
          <button onClick={() => setActiveTab("notifications")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: "6px", borderRadius: "9px", color: "#64748b" }}>
            <Bell size={18} />
            <span style={{ position: "absolute", top: "2px", right: "2px", width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", border: "2px solid white" }} />
          </button>

          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 10px 4px 4px", borderRadius: "50px", border: "1.5px solid rgba(37,99,235,0.15)", background: "rgba(37,99,235,0.03)" }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "11px", fontWeight: 800 }}>
              {customer.avatar}
            </div>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#374151" }}>{customer.name.split(" ")[0]}</span>
            <ChevronDown size={12} color="#94a3b8" />
          </div>

          <Link to="/login">
            <button style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "1.5px solid rgba(239,68,68,0.25)", borderRadius: "9px", padding: "6px 12px", cursor: "pointer", color: "#ef4444", fontSize: "12px", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              <LogOut size={13} /> Logout
            </button>
          </Link>
        </div>
      </nav>

      <div style={{ display: "flex", flex: 1 }}>

        {/* ── SIDEBAR ── */}
        <aside style={{ width: "220px", background: "white", borderRight: "1px solid rgba(37,99,235,0.08)", padding: "20px 12px", display: "flex", flexDirection: "column", gap: "4px", flexShrink: 0, position: "sticky", top: "60px", height: "calc(100vh - 60px)", overflowY: "auto" }}>
          {/* Profile card */}
          <div style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: "16px", padding: "16px", marginBottom: "12px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", fontWeight: 800, marginBottom: "10px", border: "2px solid rgba(255,255,255,0.4)" }}>
              {customer.avatar}
            </div>
            <p style={{ color: "white", fontWeight: 800, fontSize: "13px", margin: "0 0 2px" }}>{customer.name}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", margin: "0 0 8px" }}>{customer.email}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "rgba(255,255,255,0.2)", borderRadius: "99px", padding: "3px 8px" }}>
              <Star size={9} color="#fbbf24" fill="#fbbf24" />
              <span style={{ color: "white", fontSize: "9px", fontWeight: 700 }}>{customer.tier}</span>
            </div>
          </div>

          {/* Nav items */}
          {nav.map(({ id, icon: Icon, label, badge }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "9px 12px", borderRadius: "11px", border: "none",
                cursor: "pointer", width: "100%", textAlign: "left",
                background: activeTab === id ? "linear-gradient(135deg,rgba(37,99,235,0.10),rgba(124,58,237,0.10))" : "transparent",
                color: activeTab === id ? "#2563eb" : "#64748b",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
                fontWeight: activeTab === id ? 700 : 500,
                fontSize: "13px",
                borderLeft: activeTab === id ? "3px solid #2563eb" : "3px solid transparent",
                transition: "all 0.15s",
              }}>
              <Icon size={15} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{ background: activeTab === id ? "#2563eb" : "rgba(37,99,235,0.12)", color: activeTab === id ? "white" : "#2563eb", fontSize: "9px", fontWeight: 800, borderRadius: "99px", padding: "1px 6px", minWidth: "18px", textAlign: "center" }}>
                  {badge}
                </span>
              )}
            </button>
          ))}

          <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid rgba(37,99,235,0.07)" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "10px", border: "none", background: "transparent", cursor: "pointer", color: "#94a3b8", fontSize: "12px", fontFamily: "'Plus Jakarta Sans',sans-serif", width: "100%" }}>
                <ArrowUpRight size={13} /> Back to Store
              </button>
            </Link>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: "24px", overflow: "auto", minWidth: 0 }}>

          {/* ════════ OVERVIEW ════════ */}
          {activeTab === "overview" && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>
                  Good afternoon, {customer.name.split(" ")[0]} 👋
                </h1>
                <p style={{ color: "#94a3b8", fontSize: "13px", margin: 0 }}>Here's a summary of your FlexiBerry activity</p>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "14px", marginBottom: "24px" }}>
                {[
                  { label: "Total Spent", value: formatPKR(totalSpend), icon: Wallet, color: "#2563eb", bg: "#dbeafe" },
                  { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "#7c3aed", bg: "#ede9fe" },
                  { label: "Active Plans", value: activeInstallments.length, icon: CreditCard, color: "#059669", bg: "#d1fae5" },
                  { label: "Monthly Due", value: formatPKR(totalMonthlyDue), icon: Calendar, color: "#d97706", bg: "#fef3c7" },
                  { label: "Loyalty Points", value: customer.loyaltyPoints.toLocaleString(), icon: Star, color: "#e11d48", bg: "#ffe4e6" },
                  { label: "Wishlist Items", value: wishlistCount, icon: Heart, color: "#0891b2", bg: "#cffafe" },
                ].map(({ label, value, icon: Icon, color, bg }) => (
                  <div key={label} style={{ background: "white", borderRadius: "16px", padding: "16px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={17} color={color} />
                    </div>
                    <div>
                      <p style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{value}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders + Active Installments side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>

                {/* Recent Orders */}
                <div style={{ background: "white", borderRadius: "18px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Recent Orders</h3>
                    <button onClick={() => setActiveTab("orders")} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>View all →</button>
                  </div>
                  {orders.slice(0, 3).map(order => {
                    const s = statusConfig[order.status];
                    const Icon = s.icon;
                    return (
                      <div key={order.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", borderBottom: "1px solid rgba(37,99,235,0.06)" }}>
                        <img src={order.image} alt={order.product} style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.product}</p>
                          <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>{order.id} · {order.date}</p>
                        </div>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "3px", background: s.bg, color: s.color, fontSize: "9px", fontWeight: 700, borderRadius: "99px", padding: "3px 7px", flexShrink: 0 }}>
                          <Icon size={9} /> {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Active Installment Plans */}
                <div style={{ background: "white", borderRadius: "18px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: 0 }}>Active Plans</h3>
                    <button onClick={() => setActiveTab("installments")} style={{ fontSize: "11px", color: "#2563eb", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>View all →</button>
                  </div>
                  {activeInstallments.map(order => {
                    const pct = Math.round((order.installments.paid / order.installments.total) * 100);
                    const remaining = order.installments.total - order.installments.paid;
                    return (
                      <div key={order.id} style={{ marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid rgba(37,99,235,0.06)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{order.product.split(" ").slice(0, 3).join(" ")}…</p>
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#2563eb" }}>{formatPKR(order.installments.amount)}/mo</span>
                        </div>
                        <div style={{ height: "6px", borderRadius: "99px", background: "#e0e7ff", marginBottom: "5px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: "99px", transition: "width 1s ease" }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "10px", color: "#059669", fontWeight: 600 }}>{order.installments.paid} paid</span>
                          <span style={{ fontSize: "10px", color: "#94a3b8" }}>{remaining} remaining · Next: {order.nextDue}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Notifications strip */}
              <div style={{ background: "white", borderRadius: "18px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px" }}>Recent Notifications</h3>
                {notifications.map(n => {
                  const colors: Record<string, { bg: string; dot: string }> = { warning: { bg: "#fef3c7", dot: "#d97706" }, success: { bg: "#d1fae5", dot: "#059669" }, info: { bg: "#dbeafe", dot: "#2563eb" } };
                  const c = colors[n.type];
                  return (
                    <div key={n.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 12px", borderRadius: "11px", background: c.bg, marginBottom: "8px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.dot, marginTop: "4px", flexShrink: 0 }} />
                      <p style={{ fontSize: "12px", color: "#374151", fontWeight: 500, margin: 0, flex: 1 }}>{n.text}</p>
                      <span style={{ fontSize: "10px", color: "#94a3b8", flexShrink: 0 }}>{n.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ════════ ORDERS ════════ */}
          {activeTab === "orders" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 20px" }}>My Orders</h1>
              {orders.map(order => {
                const s = statusConfig[order.status];
                const StatusIcon = s.icon;
                const isExpanded = expandedOrder === order.id;
                const pct = Math.round((order.installments.paid / order.installments.total) * 100);
                const remaining = order.installments.total - order.installments.paid;

                return (
                  <div key={order.id} style={{ background: "white", borderRadius: "18px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: "14px", overflow: "hidden" }}>
                    {/* Order header */}
                    <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: "14px" }}>
                      <img src={order.image} alt={order.product} style={{ width: "56px", height: "56px", borderRadius: "12px", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", background: "#f1f5f9", borderRadius: "6px", padding: "2px 7px" }}>{order.id}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: s.bg, color: s.color, fontSize: "10px", fontWeight: 700, borderRadius: "99px", padding: "3px 9px" }}>
                            <StatusIcon size={10} /> {s.label}
                          </span>
                        </div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#0f172a", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{order.product}</p>
                        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
                          {order.shop} · Ordered {order.date}
                        </p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{formatPKR(order.price)}</p>
                        <p style={{ fontSize: "11px", color: "#2563eb", fontWeight: 600, margin: 0 }}>{formatPKR(order.installments.amount)}/mo</p>
                      </div>
                      <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} style={{ background: "rgba(37,99,235,0.07)", border: "none", borderRadius: "9px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#2563eb", flexShrink: 0, transition: "transform 0.2s", transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)" }}>
                        <ChevronRight size={15} />
                      </button>
                    </div>

                    {/* Expanded: Installment detail */}
                    {isExpanded && (
                      <div style={{ borderTop: "1px solid rgba(37,99,235,0.07)", padding: "18px 20px", background: "#fafbff" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                          {/* Installment progress */}
                          <div>
                            <p style={{ fontSize: "12px", fontWeight: 800, color: "#374151", margin: "0 0 12px" }}>Installment Progress</p>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                              <span style={{ fontSize: "11px", color: "#059669", fontWeight: 700 }}>✅ {order.installments.paid} installments paid</span>
                              <span style={{ fontSize: "11px", color: "#94a3b8" }}>{pct}%</span>
                            </div>
                            <div style={{ height: "8px", borderRadius: "99px", background: "#e0e7ff", marginBottom: "8px", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: "99px" }} />
                            </div>
                            <div style={{ display: "flex", gap: "6px", marginBottom: "12px", flexWrap: "wrap" }}>
                              {Array.from({ length: order.installments.total }).map((_, i) => (
                                <div key={i} title={`Installment ${i + 1}`} style={{ width: "24px", height: "24px", borderRadius: "6px", background: i < order.installments.paid ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", fontWeight: 700, color: i < order.installments.paid ? "white" : "#94a3b8" }}>
                                  {i < order.installments.paid ? "✓" : i + 1}
                                </div>
                              ))}
                            </div>
                            {remaining > 0 && (
                              <div style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: "10px", padding: "8px 12px", display: "flex", gap: "8px", alignItems: "center" }}>
                                <AlertCircle size={14} color="#d97706" />
                                <div>
                                  <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#92400e" }}>{remaining} installments remaining</p>
                                  <p style={{ margin: 0, fontSize: "10px", color: "#b45309" }}>Next due: {order.nextDue} · {formatPKR(order.installments.amount)}</p>
                                </div>
                              </div>
                            )}
                            {remaining === 0 && (
                              <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: "10px", padding: "8px 12px", display: "flex", gap: "8px", alignItems: "center" }}>
                                <CheckCircle2 size={14} color="#059669" />
                                <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: "#065f46" }}>All installments paid! ✨</p>
                              </div>
                            )}
                          </div>

                          {/* Order summary */}
                          <div>
                            <p style={{ fontSize: "12px", fontWeight: 800, color: "#374151", margin: "0 0 12px" }}>Order Summary</p>
                            {[
                              ["Order ID", order.id],
                              ["Product", order.product.split(" ").slice(0, 3).join(" ") + "…"],
                              ["Total Price", formatPKR(order.price)],
                              ["Monthly EMI", formatPKR(order.installments.amount)],
                              ["Plan Duration", `${order.installments.total} months`],
                              ["Amount Paid", formatPKR(order.installments.paid * order.installments.amount)],
                              ["Remaining", formatPKR(remaining * order.installments.amount)],
                            ].map(([k, v]) => (
                              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(37,99,235,0.05)" }}>
                                <span style={{ fontSize: "11px", color: "#94a3b8" }}>{k}</span>
                                <span style={{ fontSize: "11px", fontWeight: 700, color: "#374151" }}>{v}</span>
                              </div>
                            ))}
                            <button style={{ marginTop: "12px", width: "100%", height: "34px", borderRadius: "9px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                              <Download size={12} /> Download Receipt
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════ INSTALLMENTS ════════ */}
          {activeTab === "installments" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Installment Plans</h1>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 20px" }}>Track all your monthly payment plans in one place</p>

              {/* Summary */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Active Plans", value: activeInstallments.length, color: "#2563eb", bg: "#dbeafe" },
                  { label: "Monthly Total Due", value: formatPKR(totalMonthlyDue), color: "#059669", bg: "#d1fae5" },
                  { label: "Completed Plans", value: orders.filter(o => o.installments.paid === o.installments.total).length, color: "#7c3aed", bg: "#ede9fe" },
                ].map(({ label, value, color, bg }) => (
                  <div key={label} style={{ background: "white", borderRadius: "14px", padding: "16px", border: "1px solid rgba(37,99,235,0.07)", textAlign: "center" }}>
                    <p style={{ fontSize: "22px", fontWeight: 800, color, margin: "0 0 4px" }}>{value}</p>
                    <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{label}</p>
                  </div>
                ))}
              </div>

              {orders.map(order => {
                const pct = Math.round((order.installments.paid / order.installments.total) * 100);
                const remaining = order.installments.total - order.installments.paid;
                const isComplete = remaining === 0;

                return (
                  <div key={order.id} style={{ background: "white", borderRadius: "18px", border: `1px solid ${isComplete ? "rgba(5,150,105,0.2)" : "rgba(37,99,235,0.07)"}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: "14px", padding: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                      <img src={order.image} alt={order.product} style={{ width: "48px", height: "48px", borderRadius: "10px", objectFit: "cover", flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{order.product}</p>
                        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{order.id} · {order.shop}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: "14px", fontWeight: 800, color: "#2563eb", margin: "0 0 2px" }}>{formatPKR(order.installments.amount)}<span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 500 }}>/mo</span></p>
                        {isComplete
                          ? <span style={{ fontSize: "10px", background: "#d1fae5", color: "#059669", fontWeight: 700, borderRadius: "99px", padding: "2px 8px" }}>✓ Fully Paid</span>
                          : <span style={{ fontSize: "10px", background: "#fef3c7", color: "#d97706", fontWeight: 700, borderRadius: "99px", padding: "2px 8px" }}>Due: {order.nextDue}</span>
                        }
                      </div>
                    </div>

                    {/* Visual progress bar */}
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151" }}>{order.installments.paid} of {order.installments.total} installments paid</span>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: isComplete ? "#059669" : "#2563eb" }}>{pct}% complete</span>
                      </div>
                      <div style={{ height: "10px", borderRadius: "99px", background: "#f1f5f9", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: isComplete ? "linear-gradient(90deg,#059669,#10b981)" : "linear-gradient(90deg,#2563eb,#7c3aed)", borderRadius: "99px", transition: "width 1s" }} />
                      </div>
                    </div>

                    {/* Month-by-month chips */}
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginBottom: "12px" }}>
                      {Array.from({ length: order.installments.total }).map((_, i) => (
                        <div key={i} title={`Month ${i + 1}: ${formatPKR(order.installments.amount)}`} style={{ width: "28px", height: "28px", borderRadius: "7px", background: i < order.installments.paid ? (isComplete ? "linear-gradient(135deg,#059669,#10b981)" : "linear-gradient(135deg,#2563eb,#7c3aed)") : "#f1f5f9", border: i === order.installments.paid && !isComplete ? "2px dashed #2563eb" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: i < order.installments.paid ? "white" : "#94a3b8", cursor: "default", flexShrink: 0 }}>
                          {i < order.installments.paid ? "✓" : i + 1}
                        </div>
                      ))}
                    </div>

                    {/* Summary row */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { label: "Total", value: formatPKR(order.price) },
                        { label: "Paid", value: formatPKR(order.installments.paid * order.installments.amount), highlight: true },
                        { label: "Remaining", value: formatPKR(remaining * order.installments.amount) },
                      ].map(({ label, value, highlight }) => (
                        <div key={label} style={{ flex: 1, minWidth: "80px", background: highlight ? "linear-gradient(135deg,rgba(37,99,235,0.06),rgba(124,58,237,0.06))" : "#f8faff", borderRadius: "10px", padding: "8px 12px", border: `1px solid ${highlight ? "rgba(37,99,235,0.15)" : "rgba(37,99,235,0.06)"}` }}>
                          <p style={{ fontSize: "10px", color: "#94a3b8", margin: "0 0 2px" }}>{label}</p>
                          <p style={{ fontSize: "12px", fontWeight: 800, color: highlight ? "#2563eb" : "#374151", margin: 0 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════ NOTIFICATIONS ════════ */}
          {activeTab === "notifications" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 20px" }}>Notifications</h1>
              {notifications.map(n => {
                const configs: Record<string, { bg: string; border: string; dot: string; icon: any }> = {
                  warning: { bg: "#fffbeb", border: "#fde68a", dot: "#d97706", icon: AlertCircle },
                  success: { bg: "#f0fdf4", border: "#bbf7d0", dot: "#059669", icon: CheckCircle2 },
                  info:    { bg: "#eff6ff", border: "#bfdbfe", dot: "#2563eb", icon: Bell },
                };
                const c = configs[n.type];
                const Icon = c.icon;
                return (
                  <div key={n.id} style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: "14px", padding: "14px 16px", marginBottom: "10px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: c.dot, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={15} color="white" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "0 0 4px" }}>{n.text}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ════════ SETTINGS ════════ */}
          {activeTab === "settings" && (
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 20px" }}>Account Settings</h1>
              <div style={{ background: "white", borderRadius: "18px", padding: "24px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", paddingBottom: "20px", borderBottom: "1px solid rgba(37,99,235,0.07)" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "22px", fontWeight: 800 }}>{customer.avatar}</div>
                  <div>
                    <p style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{customer.name}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 6px" }}>{customer.tier} · Member since {customer.memberSince}</p>
                    <button style={{ fontSize: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "white", border: "none", borderRadius: "8px", padding: "5px 12px", cursor: "pointer", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Change Photo</button>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  {[
                    { label: "Full Name", value: customer.name, icon: User },
                    { label: "Email Address", value: customer.email, icon: Mail },
                    { label: "Phone Number", value: customer.phone, icon: Phone },
                    { label: "City", value: customer.city, icon: MapPin },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label}>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>{label}</label>
                      <div style={{ position: "relative" }}>
                        <Icon size={13} color="#94a3b8" style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }} />
                        <input defaultValue={value} style={{ width: "100%", height: "38px", paddingLeft: "28px", paddingRight: "10px", borderRadius: "10px", border: "1.5px solid rgba(37,99,235,0.15)", fontSize: "12px", outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif", background: "#fafbff", boxSizing: "border-box" }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: "18px", height: "40px", padding: "0 24px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: "0 6px 16px rgba(37,99,235,0.3)" }}>
                  Save Changes
                </button>
              </div>

              {/* Security */}
              <div style={{ background: "white", borderRadius: "18px", padding: "20px", border: "1px solid rgba(37,99,235,0.07)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: "6px" }}><Shield size={15} color="#2563eb"/>Security</h3>
                {[
                  { label: "Change Password", desc: "Update your account password" },
                  { label: "Two-Factor Authentication", desc: "Add an extra layer of security" },
                  { label: "Active Sessions", desc: "Manage devices logged into your account" },
                ].map(({ label, desc }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid rgba(37,99,235,0.06)" }}>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#374151", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{desc}</p>
                    </div>
                    <button style={{ background: "rgba(37,99,235,0.07)", border: "none", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", color: "#2563eb", fontSize: "11px", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Manage</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ════════ WISHLIST tab ════════ */}
{/* ════════ WISHLIST tab ════════ */}
{activeTab === "wishlist" && <WishlistTab />}

        </main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .db-hamburger { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

export default CustomerDashboard;
