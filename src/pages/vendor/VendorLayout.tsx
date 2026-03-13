import { useState, useEffect, useRef } from "react";
import {
  Package, TrendingUp, CreditCard, DollarSign,
  Check, X, ArrowUpRight, Bell, Search,
  ChevronRight, Zap, BarChart3, Users,
  RefreshCw, ShoppingCart, Eye, MoreHorizontal,
  Activity
} from "lucide-react";

/* ── Animated Counter ── */
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 1200 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
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
  return <>{prefix}{val >= 1000000 ? (val / 1000000).toFixed(1) + "M" : val >= 1000 ? (val / 1000).toFixed(1) + "K" : val}{suffix}</>;
}

/* ── Spark Line SVG ── */
function SparkLine({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 28;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / range) * (h - 4) - 2
  ]);
  const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const fill = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ")
    + ` L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${color.replace("#", "")})`} />
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Mini Bar Chart ── */
function MiniBar({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-0.5 h-7">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-500"
          style={{
            height: `${(v / max) * 100}%`,
            background: i === data.length - 1 ? color : `${color}55`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Ring Progress ── */
function RingProgress({ pct, color, size = 44 }: { pct: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#e5e7eb" strokeWidth="3" fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth="3" fill="none"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s cubic-bezier(0.4,0,0.2,1)" }}
      />
    </svg>
  );
}

/* ── Pulse Dot ── */
const PulseDot = ({ color }: { color: string }) => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: color }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: color }} />
  </span>
);

/* ─────────────────────────────────────────────────────── */
/*  MAIN DASHBOARD                                         */
/* ─────────────────────────────────────────────────────── */
const VendorDashboard = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [orderFilter, setOrderFilter] = useState<"all" | "pending" | "approved">("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: 284,
      icon: Package,
      pct: 8,
      color: "#10b981",
      bg: "from-emerald-50 to-teal-50",
      border: "border-emerald-100",
      spark: [40, 55, 48, 70, 62, 80, 76, 90, 85, 95, 88, 100],
    },
    {
      label: "Orders Received",
      value: 847,
      icon: ShoppingCart,
      pct: 23,
      color: "#2563eb",
      bg: "from-blue-50 to-indigo-50",
      border: "border-blue-100",
      spark: [30, 45, 38, 60, 52, 75, 68, 82, 79, 91, 86, 97],
    },
    {
      label: "Active Installments",
      value: 612,
      icon: CreditCard,
      pct: 15,
      color: "#8b5cf6",
      bg: "from-violet-50 to-purple-50",
      border: "border-violet-100",
      spark: [50, 42, 65, 58, 72, 68, 80, 75, 88, 83, 92, 89],
    },
    {
      label: "Monthly Revenue",
      value: 8400000,
      prefix: "Rs ",
      icon: DollarSign,
      pct: 26,
      color: "#f59e0b",
      bg: "from-amber-50 to-yellow-50",
      border: "border-amber-100",
      spark: [35, 50, 42, 65, 55, 78, 70, 88, 82, 94, 90, 100],
    },
  ];

  const pendingOrders = [
    { product: "Samsung Galaxy S24 Ultra", buyer: "Ahmad Bilal", plan: "12-month plan", amount: "Rs 89,999", status: "pending", avatar: "AB", color: "#3b82f6" },
    { product: "iPhone 15 Pro Max", buyer: "Hina Butt", plan: "6-month plan", amount: "Rs 259,999", status: "pending", avatar: "HB", color: "#8b5cf6" },
    { product: "Sony PlayStation 5", buyer: "Murad Khan", plan: "6-month plan", amount: "Rs 79,999", status: "approved", avatar: "MK", color: "#10b981" },
    { product: "MacBook Pro M3", buyer: "Sara Anwar", plan: "12-month plan", amount: "Rs 349,999", status: "pending", avatar: "SA", color: "#f59e0b" },
    { product: "LG OLED 65\"", buyer: "Faisal Mir", plan: "18-month plan", amount: "Rs 189,999", status: "pending", avatar: "FM", color: "#ef4444" },
  ];

  const weekData = [41, 68, 52, 83, 76, 95, 88];
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const maxWeek = Math.max(...weekData);

  const filtered = pendingOrders.filter(o =>
    orderFilter === "all" ? true :
    orderFilter === "pending" ? o.status === "pending" :
    o.status === "approved"
  );

  return (
    <div
      className="min-h-full"
      style={{
        fontFamily: "'DM Sans', 'Plus Jakarta Sans', system-ui, sans-serif",
        background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 50%, #f0fdf4 100%)",
      }}
    >
      {/* ── TOP BAR ── */}
      <div
        className="mb-8 flex items-center justify-between"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(-8px)", transition: "all 0.5s ease" }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PulseDot color="#10b981" />
            <span className="text-xs font-semibold text-emerald-600 tracking-wide uppercase">Live Dashboard</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">
            Good morning, <span style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>TechZone</span> 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Here's what's happening with your store today.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 bg-white/80 backdrop-blur outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all w-44"
            />
          </div>
          <button className="relative h-9 w-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow transition-all">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
          </button>
          <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)" }}>
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div
            key={s.label}
            onClick={() => setActiveCard(activeCard === i ? null : i)}
            className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${s.bg} ${s.border} p-5 cursor-pointer transition-all duration-300 group`}
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateY(20px)",
              transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, box-shadow 0.2s`,
              boxShadow: activeCard === i ? `0 8px 30px ${s.color}25` : "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            {/* Glow blob */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 blur-2xl pointer-events-none transition-opacity group-hover:opacity-30"
              style={{ background: s.color }}
            />

            <div className="flex items-start justify-between mb-3">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shadow-sm"
                style={{ background: `${s.color}18`, border: `1.5px solid ${s.color}30` }}
              >
                <s.icon className="h-4.5 w-4.5" style={{ color: s.color, width: 18, height: 18 }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
                <TrendingUp className="h-3 w-3" />+{s.pct}%
              </div>
            </div>

            <div className="mb-3">
              <p className="text-2xl font-black text-gray-900 tabular-nums leading-none mb-0.5">
                {s.prefix || ""}
                <AnimatedCounter target={s.value} duration={900 + i * 100} />
              </p>
              <p className="text-xs font-medium text-gray-500">{s.label}</p>
            </div>

            <SparkLine data={s.spark} color={s.color} />

            <div className="mt-2 flex items-center gap-1 text-xs font-semibold" style={{ color: s.color }}>
              <span>vs last month</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div className="grid xl:grid-cols-5 gap-5">

        {/* ── SALES CHART (3/5) ── */}
        <div
          className="xl:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.35s" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-black text-gray-900">Sales Overview</h2>
              <p className="text-xs text-gray-400 mt-0.5">Last 7 days performance</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xl font-black text-gray-900">Rs 2.1M</p>
                <p className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5 justify-end">
                  <TrendingUp className="h-3 w-3" /> +18.4% vs last week
                </p>
              </div>
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-400 pr-2">
              {["100K", "75K", "50K", "25K", "0"].map(l => <span key={l}>{l}</span>)}
            </div>
            {/* Bars */}
            <div className="ml-8 flex items-end gap-2 h-40">
              {weekData.map((v, i) => {
                const h = (v / maxWeek) * 100;
                const isToday = i === 6;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group/bar">
                    <div className="relative w-full flex items-end justify-center" style={{ height: 120 }}>
                      {/* Tooltip */}
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none z-10">
                        Rs {(v * 2.1).toFixed(0)}K
                      </div>
                      <div
                        className="w-full rounded-t-lg transition-all duration-500 relative overflow-hidden"
                        style={{
                          height: `${h}%`,
                          background: isToday
                            ? "linear-gradient(180deg,#2563eb,#1d4ed8)"
                            : "linear-gradient(180deg,#e8eeff,#dce4ff)",
                          boxShadow: isToday ? "0 -4px 12px rgba(37,99,235,0.3)" : "none",
                          minHeight: 4,
                        }}
                      >
                        {isToday && (
                          <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(to right,transparent 0%,rgba(255,255,255,0.6) 50%,transparent 100%)", animation: "shimmer 2s infinite" }} />
                        )}
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold ${isToday ? "text-blue-600" : "text-gray-400"}`}>{weekDays[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center gap-6">
            {[
              { color: "#2563eb", label: "This Week", val: "Rs 2.1M" },
              { color: "#dce4ff", label: "Last Week", val: "Rs 1.77M" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm" style={{ background: l.color }} />
                <span className="text-xs text-gray-500">{l.label}</span>
                <span className="text-xs font-bold text-gray-700">{l.val}</span>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
              <BarChart3 className="h-3.5 w-3.5" />
              Daily revenue
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (2/5) ── */}
        <div className="xl:col-span-2 flex flex-col gap-5">

          {/* ── QUICK ACTIONS ── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.4s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-gray-900">Quick Actions</h2>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { icon: Package, label: "Add Product", color: "#2563eb", bg: "from-blue-500 to-indigo-500" },
                { icon: Eye, label: "Review KYC", color: "#8b5cf6", bg: "from-violet-500 to-purple-500" },
                { icon: Users, label: "View Buyers", color: "#10b981", bg: "from-emerald-500 to-teal-500" },
                { icon: ShoppingCart, label: "All Orders", color: "#f59e0b", bg: "from-amber-500 to-orange-500" },
              ].map(({ icon: Icon, label, bg }) => (
                <button
                  key={label}
                  className={`bg-gradient-to-br ${bg} rounded-xl p-3.5 flex flex-col items-start gap-2 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-white shadow-sm group/btn`}
                >
                  <div className="h-7 w-7 rounded-lg bg-white/20 flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                    <Icon className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="text-xs font-bold leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── PERFORMANCE RINGS ── */}
          <div
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
            style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.45s" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-gray-900">Performance</h2>
              <span className="text-xs text-gray-400">This month</span>
            </div>
            <div className="space-y-3">
              {[
                { label: "Order Fulfillment", pct: 94, color: "#10b981" },
                { label: "KYC Approval Rate", pct: 78, color: "#2563eb" },
                { label: "Customer Satisfaction", pct: 88, color: "#8b5cf6" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="relative">
                    <RingProgress pct={pct} color={color} size={40} />
                    <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700">{label}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: mounted ? `${pct}%` : "0%", background: `linear-gradient(90deg,${color}88,${color})` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PENDING ORDERS ── */}
      <div
        className="mt-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)", transition: "all 0.5s ease 0.5s" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-black text-gray-900">Pending Orders</h2>
            <span className="px-2 py-0.5 text-[10px] font-black rounded-full text-white" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
              4 NEW
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(["all", "pending", "approved"] as const).map(f => (
              <button
                key={f}
                onClick={() => setOrderFilter(f)}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all"
                style={orderFilter === f
                  ? { background: "linear-gradient(135deg,#2563eb,#7c3aed)", color: "white" }
                  : { background: "#f9fafb", color: "#6b7280" }
                }
              >
                {f}
              </button>
            ))}
            <button className="ml-2 text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
              View all <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="divide-y divide-gray-50">
          {filtered.map((order, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50/50 transition-colors group"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Avatar */}
              <div
                className="h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-black shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg,${order.color},${order.color}cc)` }}
              >
                {order.avatar}
              </div>

              {/* Product */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-800 truncate">{order.product}</p>
                <p className="text-xs text-gray-400">{order.buyer} · {order.plan}</p>
              </div>

              {/* Amount */}
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-gray-900">{order.amount}</p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <MiniBar data={[3,5,4,7,6,8,order.status === "approved" ? 9 : 5]} color={order.color} />
                </div>
              </div>

              {/* Status */}
              <div className="shrink-0">
                {order.status === "approved" ? (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full text-emerald-700 bg-emerald-50 border border-emerald-100">
                    <Check className="h-3 w-3" /> Approved
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full text-amber-700 bg-amber-50 border border-amber-100">
                    <Activity className="h-3 w-3" /> Pending
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="h-7 w-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center hover:bg-emerald-100 transition-colors" title="Approve">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                </button>
                <button className="h-7 w-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center hover:bg-red-100 transition-colors" title="Reject">
                  <X className="h-3.5 w-3.5 text-red-500" />
                </button>
                <button className="h-7 w-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <MoreHorizontal className="h-3.5 w-3.5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {pendingOrders.length} orders</p>
          <button className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1">
            Manage all orders <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default VendorDashboard;
