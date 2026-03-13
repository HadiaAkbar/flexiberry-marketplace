import { useState, useEffect, useRef } from "react";
import {
  Package, TrendingUp, CreditCard, DollarSign,
  Check, X, ArrowUpRight, Bell, Search,
  ChevronRight, Zap, BarChart3, Users,
  RefreshCw, ShoppingCart, Eye, MoreHorizontal,
  Activity, Plus, Download, Filter,
} from "lucide-react";

/* ══════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════ */
function AnimatedCounter({ target, prefix = "", duration = 1200 }: {
  target: number; prefix?: string; duration?: number;
}) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);

  const display = val >= 1_000_000
    ? (val / 1_000_000).toFixed(1) + "M"
    : val >= 1_000
    ? (val / 1_000).toFixed(val >= 10_000 ? 0 : 1) + "K"
    : val;

  return <>{prefix}{display}</>;
}

/* ══════════════════════════════════════════
   SPARK LINE
══════════════════════════════════════════ */
function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const W = 88, H = 32;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * (H - 6) - 3,
  ]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = line + ` L${W},${H} L0,${H} Z`;
  const id = `sg${color.replace("#", "")}`;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`}/>
      <path d={line} stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* last dot */}
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={color}/>
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="5" fill={color} opacity="0.2"/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   MINI BAR
══════════════════════════════════════════ */
function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "24px" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, borderRadius: "2px", background: i === data.length - 1 ? color : `${color}55`, height: `${(v / max) * 100}%`, transition: "height 0.5s ease" }}/>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   SVG RING PROGRESS
══════════════════════════════════════════ */
function RingProgress({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = (size - 7) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} stroke="#e8ecf4" strokeWidth="3.5" fill="none"/>
      <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth="3.5" fill="none"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)" }}/>
    </svg>
  );
}

/* ══════════════════════════════════════════
   PULSE DOT
══════════════════════════════════════════ */
const PulseDot = ({ color }: { color: string }) => (
  <span style={{ position: "relative", display: "inline-flex", width: "8px", height: "8px" }}>
    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.6, animation: "pdPing 1.5s ease infinite" }}/>
    <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: color, display: "inline-block" }}/>
  </span>
);

/* ══════════════════════════════════════════
   MAIN DASHBOARD
══════════════════════════════════════════ */
const VendorDashboard = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [orderFilter, setOrderFilter] = useState<"all" | "pending" | "approved">("all");
  const [mounted, setMounted] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  /* ── Stat cards ── */
  const stats = [
    {
      label: "Total Products", value: 284, icon: Package, pct: 8,
      color: "#10b981", grad: "linear-gradient(135deg,#ecfdf5,#d1fae5)",
      border: "rgba(16,185,129,0.2)", glow: "rgba(16,185,129,0.15)",
      spark: [40,55,48,70,62,80,76,90,85,95,88,100],
    },
    {
      label: "Orders Received", value: 847, icon: ShoppingCart, pct: 23,
      color: "#2563eb", grad: "linear-gradient(135deg,#eff6ff,#dbeafe)",
      border: "rgba(37,99,235,0.2)", glow: "rgba(37,99,235,0.12)",
      spark: [30,45,38,60,52,75,68,82,79,91,86,97],
    },
    {
      label: "Active Installments", value: 612, icon: CreditCard, pct: 15,
      color: "#8b5cf6", grad: "linear-gradient(135deg,#f5f3ff,#ede9fe)",
      border: "rgba(139,92,246,0.2)", glow: "rgba(139,92,246,0.12)",
      spark: [50,42,65,58,72,68,80,75,88,83,92,89],
    },
    {
      label: "Monthly Revenue", value: 8_400_000, prefix: "Rs ", icon: DollarSign, pct: 26,
      color: "#f59e0b", grad: "linear-gradient(135deg,#fffbeb,#fef3c7)",
      border: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.12)",
      spark: [35,50,42,65,55,78,70,88,82,94,90,100],
    },
  ];

  /* ── Orders ── */
  const orders = [
    { product: "Samsung Galaxy S24 Ultra", buyer: "Ahmad Bilal",  plan: "12-month", amount: "Rs 89,999",  status: "pending",  avatar: "AB", color: "#3b82f6", spark: [3,5,4,7,6,8,5] },
    { product: "iPhone 15 Pro Max",        buyer: "Hina Butt",    plan: "6-month",  amount: "Rs 259,999", status: "pending",  avatar: "HB", color: "#8b5cf6", spark: [4,6,5,8,7,9,6] },
    { product: "Sony PlayStation 5",       buyer: "Murad Khan",   plan: "6-month",  amount: "Rs 79,999",  status: "approved", avatar: "MK", color: "#10b981", spark: [3,5,4,7,6,8,9] },
    { product: "MacBook Pro M3",           buyer: "Sara Anwar",   plan: "12-month", amount: "Rs 349,999", status: "pending",  avatar: "SA", color: "#f59e0b", spark: [2,4,3,6,5,7,4] },
    { product: 'LG OLED 65"',             buyer: "Faisal Mir",   plan: "18-month", amount: "Rs 189,999", status: "pending",  avatar: "FM", color: "#ef4444", spark: [3,5,4,6,5,7,4] },
  ];

  const weekData  = [41, 68, 52, 83, 76, 95, 88];
  const weekDays  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxWeek   = Math.max(...weekData);
  const filtered  = orders.filter(o =>
    orderFilter === "all" ? true :
    orderFilter === "pending" ? o.status === "pending" : o.status === "approved"
  );

  return (
    <div style={{ ...F, minHeight: "100%" }}>

      {/* ══════════════════════════════════
          GREETING ROW
      ══════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        marginBottom: "28px", flexWrap: "wrap", gap: "16px",
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-10px)",
        transition: "all 0.5s ease",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
            <PulseDot color="#10b981"/>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669", letterSpacing: "0.08em", textTransform: "uppercase" }}>Live Dashboard</span>
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Good morning, <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TechZone</span> 👋
          </h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0", fontWeight: 500 }}>Friday, March 13, 2026 · Here's your store overview</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ position: "relative" }}>
            <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
            <input placeholder="Search orders…" style={{ height: "38px", paddingLeft: "34px", paddingRight: "14px", borderRadius: "11px", border: "1.5px solid rgba(37,99,235,0.12)", background: "white", fontSize: "13px", outline: "none", width: "180px", ...F, color: "#0f172a" }}/>
          </div>
          <button style={{ height: "38px", paddingInline: "16px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", ...F }}>
            <Plus size={14}/> Add Product
          </button>
          <button style={{ height: "38px", width: "38px", borderRadius: "11px", background: "white", border: "1.5px solid rgba(37,99,235,0.12)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <RefreshCw size={14} color="#64748b"/>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════
          STAT CARDS
      ══════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "24px" }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            onClick={() => setActiveCard(activeCard === i ? null : i)}
            style={{
              borderRadius: "20px", background: s.grad,
              border: `1.5px solid ${activeCard === i ? s.color : s.border}`,
              padding: "20px", cursor: "pointer", position: "relative", overflow: "hidden",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(24px)",
              transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, box-shadow 0.2s, border-color 0.2s`,
              boxShadow: activeCard === i ? `0 12px 40px ${s.glow}` : `0 2px 8px rgba(0,0,0,0.04)`,
            }}
            onMouseEnter={e => { if (activeCard !== i) (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 28px ${s.glow}`; }}
            onMouseLeave={e => { if (activeCard !== i) (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"; }}
          >
            {/* Glow orb */}
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: s.color, opacity: 0.12, filter: "blur(20px)", pointerEvents: "none" }}/>

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "14px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${s.color}18`, border: `1.5px solid ${s.color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon size={18} color={s.color}/>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 800, padding: "3px 8px", borderRadius: "20px", background: `${s.color}15`, color: s.color }}>
                <TrendingUp size={10}/>+{s.pct}%
              </div>
            </div>

            {/* Value */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#0f172a", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "3px" }}>
                {s.prefix || ""}<AnimatedCounter target={s.value} duration={900 + i * 100}/>
              </div>
              <div style={{ fontSize: "12px", fontWeight: 500, color: "#64748b" }}>{s.label}</div>
            </div>

            {/* Sparkline */}
            <SparkLine data={s.spark} color={s.color}/>

            {/* Footer */}
            <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", fontWeight: 600, color: s.color }}>
              <span>vs last month</span>
              <ArrowUpRight size={11}/>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════
          MIDDLE GRID: CHART + ACTIONS + PERFORMANCE
      ══════════════════════════════════ */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px", marginBottom: "20px" }}>

        {/* ── SALES CHART ── */}
        <div style={{
          background: "white", borderRadius: "20px", border: "1.5px solid rgba(37,99,235,0.08)",
          padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "all 0.5s ease 0.32s",
        }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
            <div>
              <h2 style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.02em" }}>Sales Overview</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>Last 7 days performance</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>Rs 2.1M</p>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", margin: 0, display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                  <TrendingUp size={11}/> +18.4% vs last week
                </p>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: "#eff6ff", border: "1.5px solid #dbeafe", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Activity size={16} color="#2563eb"/>
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div style={{ position: "relative" }}>
            {/* Y labels */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between", fontSize: "10px", color: "#cbd5e1", fontWeight: 600 }}>
              {["100K", "75K", "50K", "25K", "0"].map(l => <span key={l}>{l}</span>)}
            </div>

            {/* Bars */}
            <div style={{ marginLeft: "36px", display: "flex", alignItems: "flex-end", gap: "8px", height: "150px" }}>
              {weekData.map((v, i) => {
                const h    = (v / maxWeek) * 100;
                const today = i === weekData.length - 1;
                const hov  = hoveredBar === i;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer" }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}>
                    <div style={{ position: "relative", width: "100%", height: "120px", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                      {/* Tooltip */}
                      {hov && (
                        <div style={{ position: "absolute", bottom: `calc(${h}% + 8px)`, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", fontSize: "10px", fontWeight: 700, padding: "4px 8px", borderRadius: "7px", whiteSpace: "nowrap", zIndex: 10, ...F }}>
                          Rs {(v * 2.1).toFixed(0)}K
                          <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderTop: "4px solid #0f172a" }}/>
                        </div>
                      )}
                      <div style={{
                        width: "100%", borderRadius: "6px 6px 0 0",
                        height: `${h}%`, minHeight: "4px",
                        background: today
                          ? "linear-gradient(180deg,#3b82f6,#1d4ed8)"
                          : hov
                          ? "linear-gradient(180deg,#94a3b8,#64748b)"
                          : "linear-gradient(180deg,#e8eeff,#c7d2fe)",
                        boxShadow: today ? "0 -4px 16px rgba(37,99,235,0.35)" : "none",
                        transition: "all 0.2s ease",
                        position: "relative", overflow: "hidden",
                      }}>
                        {today && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(255,255,255,0.25),transparent)", animation: "shimBar 2.5s ease infinite" }}/>}
                      </div>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 700, color: today ? "#2563eb" : "#94a3b8" }}>{weekDays[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: "20px" }}>
            {[
              { color: "#2563eb", label: "This Week", val: "Rs 2.1M" },
              { color: "#c7d2fe", label: "Last Week", val: "Rs 1.77M" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: l.color }}/>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>{l.label}</span>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "#374151" }}>{l.val}</span>
              </div>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>
              <BarChart3 size={12}/> Daily revenue
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Quick Actions */}
          <div style={{
            background: "white", borderRadius: "20px", border: "1.5px solid rgba(37,99,235,0.08)",
            padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.38s",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Quick Actions</h2>
              <Zap size={14} color="#f59e0b"/>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { icon: Package,      label: "Add Product", bg: "linear-gradient(135deg,#2563eb,#3b82f6)" },
                { icon: Eye,          label: "Review KYC",  bg: "linear-gradient(135deg,#7c3aed,#8b5cf6)" },
                { icon: Users,        label: "View Buyers", bg: "linear-gradient(135deg,#059669,#10b981)" },
                { icon: ShoppingCart, label: "All Orders",  bg: "linear-gradient(135deg,#d97706,#f59e0b)" },
              ].map(({ icon: Icon, label, bg }) => (
                <button key={label} style={{
                  background: bg, borderRadius: "14px", padding: "14px 12px",
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "8px",
                  border: "none", cursor: "pointer", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  transition: "transform 0.18s, box-shadow 0.18s", ...F,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={13} color="white"/>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, lineHeight: 1.2 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div style={{
            background: "white", borderRadius: "20px", border: "1.5px solid rgba(37,99,235,0.08)",
            padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", flex: 1,
            opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
            transition: "all 0.5s ease 0.42s",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <h2 style={{ fontSize: "13px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Performance</h2>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>This month</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { label: "Order Fulfillment",      pct: 94, color: "#10b981" },
                { label: "KYC Approval Rate",      pct: 78, color: "#2563eb" },
                { label: "Customer Satisfaction",  pct: 88, color: "#8b5cf6" },
              ].map(({ label, pct, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <RingProgress pct={pct} color={color} size={44}/>
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 900, color }}>{pct}%</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "11px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "5px" }}>{label}</span>
                    <div style={{ height: "4px", borderRadius: "4px", background: "#f1f5f9", overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: "4px", width: mounted ? `${pct}%` : "0%", background: `linear-gradient(90deg,${color}77,${color})`, transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)" }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════
          PENDING ORDERS TABLE
      ══════════════════════════════════ */}
      <div style={{
        background: "white", borderRadius: "20px", border: "1.5px solid rgba(37,99,235,0.08)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)", overflow: "hidden",
        opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
        transition: "all 0.5s ease 0.48s",
      }}>
        {/* Table header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #f1f5f9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "14px", fontWeight: 900, color: "#0f172a", margin: 0 }}>Pending Orders</h2>
            <span style={{ fontSize: "10px", fontWeight: 800, padding: "3px 9px", borderRadius: "20px", color: "white", background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>4 NEW</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {(["all", "pending", "approved"] as const).map(f => (
              <button key={f} onClick={() => setOrderFilter(f)} style={{
                fontSize: "11px", fontWeight: 700, padding: "6px 12px", borderRadius: "9px",
                border: "none", cursor: "pointer", transition: "all 0.18s", ...F, textTransform: "capitalize",
                background: orderFilter === f ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f8fafc",
                color: orderFilter === f ? "white" : "#64748b",
                boxShadow: orderFilter === f ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
              }}>{f}</button>
            ))}
            <button style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: "#2563eb", background: "none", border: "none", cursor: "pointer", ...F }}>
              View all <ChevronRight size={12}/>
            </button>
          </div>
        </div>

        {/* Column headers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 130px 110px 100px", padding: "10px 24px", background: "#fafbff", borderBottom: "1px solid #f1f5f9", gap: "12px" }}>
          {["Product", "Amount", "Trend", "Status", "Actions"].map(h => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {/* Rows */}
        <div>
          {filtered.map((order, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 120px 130px 110px 100px",
              padding: "14px 24px", borderBottom: "1px solid #f8fafc", alignItems: "center", gap: "12px",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {/* Product + buyer */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: `linear-gradient(135deg,${order.color},${order.color}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900, color: "white", flexShrink: 0, boxShadow: `0 4px 10px ${order.color}44` }}>
                  {order.avatar}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{order.product}</p>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, fontWeight: 500 }}>{order.buyer} · {order.plan}</p>
                </div>
              </div>

              {/* Amount */}
              <div>
                <p style={{ fontSize: "13px", fontWeight: 900, color: "#0f172a", margin: 0 }}>{order.amount}</p>
              </div>

              {/* Mini trend */}
              <div>
                <MiniBar data={order.spark} color={order.color}/>
              </div>

              {/* Status badge */}
              <div>
                {order.status === "approved" ? (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "20px", color: "#065f46", background: "#d1fae5", border: "1px solid #a7f3d0" }}>
                    <Check size={10}/> Approved
                  </span>
                ) : (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "20px", color: "#92400e", background: "#fef3c7", border: "1px solid #fde68a" }}>
                    <Activity size={10}/> Pending
                  </span>
                )}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <button title="Approve" style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#d1fae5", border: "1px solid #a7f3d0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#6ee7b7")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#d1fae5")}>
                  <Check size={13} color="#059669"/>
                </button>
                <button title="Reject" style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#fee2e2", border: "1px solid #fecaca", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fca5a5")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fee2e2")}>
                  <X size={13} color="#ef4444"/>
                </button>
                <button style={{ width: "28px", height: "28px", borderRadius: "8px", background: "#f1f5f9", border: "1px solid #e2e8f0", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <MoreHorizontal size={13} color="#64748b"/>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 24px", background: "#fafbff", borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 500 }}>Showing {filtered.length} of {orders.length} orders</span>
          <button style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", fontWeight: 700, color: "#2563eb", background: "none", border: "none", cursor: "pointer", ...F }}>
            <Download size={11}/> Export orders
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes pdPing  { 0%,100%{ transform:scale(1);opacity:.6; } 50%{ transform:scale(2.2);opacity:0; } }
        @keyframes shimBar { 0%{ transform:translateX(-100%); } 100%{ transform:translateX(250%); } }
        @media (max-width: 1100px) {
          .grid-5col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;
