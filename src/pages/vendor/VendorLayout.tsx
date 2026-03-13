import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Package, ShoppingCart, Users,
  CreditCard, BarChart3, Settings, LogOut,
  Bell, Menu, X, ChevronRight, Store,
  TrendingUp, Shield, Zap,
} from "lucide-react";

/* ── FlexiBerry Logo ── */
const FlexiBerryLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vl-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="vl-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#vl-bg)"/>
    <rect width="100" height="100" rx="28" fill="url(#vl-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#vl-bg)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#vl-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#vl-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#vl-bg)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#vl-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#vl-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#vl-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#vl-bg)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>
    </g>
    <rect width="100" height="100" rx="28" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.1"/>
  </svg>
);

/* ── Nav items ── */
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",    path: "/vendor",           badge: null },
  { icon: Package,         label: "Products",     path: "/vendor/products",  badge: "284" },
  { icon: ShoppingCart,    label: "Orders",       path: "/vendor/orders",    badge: "4" },
  { icon: CreditCard,      label: "Installments", path: "/vendor/installments", badge: null },
  { icon: Users,           label: "Buyers",       path: "/vendor/buyers",    badge: null },
  { icon: BarChart3,       label: "Analytics",    path: "/vendor/analytics", badge: null },
  { icon: Shield,          label: "KYC",          path: "/vendor/kyc",       badge: "2" },
  { icon: Settings,        label: "Settings",     path: "/vendor/settings",  badge: null },
];

const VendorLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/vendor") return location.pathname === "/vendor";
    return location.pathname.startsWith(path);
  };

  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f4ff", ...F }}>

      {/* ── MOBILE OVERLAY ── */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)", zIndex: 40 }}
        />
      )}

      {/* ══════════════════════════════════
          SIDEBAR
      ══════════════════════════════════ */}
      <aside style={{
        width: "240px",
        flexShrink: 0,
        background: "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0, bottom: 0, left: 0,
        zIndex: 50,
        transform: sidebarOpen ? "translateX(0)" : undefined,
        boxShadow: "4px 0 32px rgba(0,0,0,0.25)",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
      className="vendor-sidebar"
      >
        {/* Sidebar top glow */}
        <div style={{ position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(37,99,235,0.3)", filter: "blur(60px)", pointerEvents: "none" }}/>

        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <FlexiBerryLogo size={36}/>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "white", letterSpacing: "-0.02em", lineHeight: 1 }}>FlexiBerry</div>
              <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "2px" }}>Vendor Portal</div>
            </div>
          </Link>
        </div>

        {/* Vendor badge */}
        <div style={{ margin: "16px 16px 8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px", position: "relative", zIndex: 1 }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", fontWeight: 900, color: "white" }}>
            TZ
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "white", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>TechZone</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block" }}/>
              <span style={{ fontSize: "10px", color: "#10b981", fontWeight: 600 }}>Active · Verified</span>
            </div>
          </div>
        </div>

        {/* Nav section label */}
        <div style={{ padding: "16px 20px 8px", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Main Menu</span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "0 10px", overflowY: "auto", position: "relative", zIndex: 1 }}>
          {NAV_ITEMS.map(({ icon: Icon, label, path, badge }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 12px", borderRadius: "12px", marginBottom: "2px",
                  textDecoration: "none",
                  background: active ? "linear-gradient(135deg,rgba(37,99,235,0.35),rgba(124,58,237,0.25))" : "transparent",
                  border: active ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                  transition: "all 0.18s ease",
                  position: "relative",
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {active && <div style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", width: "3px", height: "20px", borderRadius: "0 3px 3px 0", background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}/>}
                <div style={{ width: "32px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", background: active ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.05)", flexShrink: 0, transition: "all 0.18s" }}>
                  <Icon size={15} color={active ? "white" : "rgba(255,255,255,0.5)"}/>
                </div>
                <span style={{ fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? "white" : "rgba(255,255,255,0.55)", flex: 1 }}>{label}</span>
                {badge && (
                  <span style={{ fontSize: "9px", fontWeight: 800, background: active ? "rgba(255,255,255,0.25)" : "rgba(239,68,68,0.8)", color: "white", padding: "2px 6px", borderRadius: "20px", minWidth: "18px", textAlign: "center" }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade CTA */}
        <div style={{ margin: "12px", background: "linear-gradient(135deg,rgba(37,99,235,0.2),rgba(124,58,237,0.2))", border: "1px solid rgba(99,102,241,0.25)", borderRadius: "14px", padding: "14px", position: "relative", zIndex: 1, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(124,58,237,0.3)", filter: "blur(20px)", pointerEvents: "none" }}/>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <Zap size={14} color="#fbbf24"/>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>Pro Features</span>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.55)", margin: "0 0 10px", lineHeight: 1.5 }}>Unlock advanced analytics, bulk uploads & priority support</p>
          <button style={{ width: "100%", height: "32px", borderRadius: "9px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "11px", fontWeight: 700, ...F }}>
            Upgrade Plan
          </button>
        </div>

        {/* Logout */}
        <div style={{ padding: "12px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
          <button
            onClick={() => navigate("/vendor/login")}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "12px", background: "transparent", border: "none", cursor: "pointer", ...F, transition: "background 0.18s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <LogOut size={14} color="#ef4444"/>
            </div>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ══════════════════════════════════
          MAIN CONTENT AREA
      ══════════════════════════════════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }} className="vendor-main">

        {/* ── TOP HEADER BAR ── */}
        <header style={{
          height: "64px", display: "flex", alignItems: "center", padding: "0 24px",
          background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(37,99,235,0.08)",
          position: "sticky", top: 0, zIndex: 30,
          boxShadow: "0 1px 16px rgba(0,0,0,0.04)",
          gap: "12px",
        }}>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mobile-menu-btn"
            style={{ display: "none", width: "36px", height: "36px", borderRadius: "10px", background: "#f1f5f9", border: "none", cursor: "pointer", alignItems: "center", justifyContent: "center", flexShrink: 0, ...F }}
          >
            {sidebarOpen ? <X size={16}/> : <Menu size={16}/>}
          </button>

          {/* Breadcrumb */}
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "6px" }}>
            <Store size={14} color="#94a3b8"/>
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>TechZone</span>
            <ChevronRight size={12} color="#cbd5e1"/>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>
              {NAV_ITEMS.find(n => isActive(n.path))?.label ?? "Dashboard"}
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

            {/* Live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "5px 10px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "20px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "lPing 2s ease infinite" }}/>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>Live</span>
            </div>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{ width: "38px", height: "38px", borderRadius: "11px", background: "#f8faff", border: "1px solid rgba(37,99,235,0.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
              >
                <Bell size={16} color="#64748b"/>
                <span style={{ position: "absolute", top: "7px", right: "7px", width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", border: "2px solid white" }}/>
              </button>

              {notifOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, width: "300px", background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.1)", boxShadow: "0 20px 60px rgba(0,0,0,0.12)", overflow: "hidden", zIndex: 100 }}>
                  <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>Notifications</span>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "white", background: "linear-gradient(135deg,#ef4444,#dc2626)", padding: "2px 7px", borderRadius: "20px" }}>3 new</span>
                  </div>
                  {[
                    { title: "New order received", sub: "iPhone 15 Pro Max · Ahmad Bilal", time: "2m ago", dot: "#2563eb" },
                    { title: "KYC approved", sub: "Your store verification is complete", time: "1h ago", dot: "#10b981" },
                    { title: "Payout processed", sub: "Rs 45,000 sent to your account", time: "3h ago", dot: "#f59e0b" },
                  ].map(({ title, sub, time, dot }) => (
                    <div key={title} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 20px", borderBottom: "1px solid #f8fafc", cursor: "pointer" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f8faff")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, marginTop: "4px", flexShrink: 0 }}/>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{title}</p>
                        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{sub}</p>
                      </div>
                      <span style={{ fontSize: "10px", color: "#cbd5e1", whiteSpace: "nowrap" }}>{time}</span>
                    </div>
                  ))}
                  <div style={{ padding: "12px 20px", textAlign: "center" }}>
                    <button style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", background: "none", border: "none", cursor: "pointer", ...F }}>View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 900, color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
              TZ
            </div>
          </div>
        </header>

        {/* ── PAGE CONTENT ── */}
        <main style={{ flex: 1, padding: "28px 28px 40px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes lPing { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 0 5px rgba(16,185,129,0); } }
        /* Sidebar always visible on desktop */
        .vendor-main { margin-left: 240px; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .vendor-main { margin-left: 0 !important; }
          .vendor-sidebar { transform: translateX(-100%); }
          .vendor-sidebar.open { transform: translateX(0); }
          .mobile-menu-btn { display: flex !important; }
        }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
};

export default VendorLayout;
