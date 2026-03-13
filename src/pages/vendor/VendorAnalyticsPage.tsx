import { useState } from "react";
import {
  BarChart3, TrendingUp, DollarSign, ShoppingCart,
  Users, ArrowUpRight, ArrowDownRight, Eye,
  Package, CreditCard,
} from "lucide-react";

function MiniChart({ data, color, height = 80 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data), min = Math.min(...data);
  const range = max - min || 1;
  const W = 280, H = height;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * W,
    H - ((v - min) / range) * (H - 8) - 4,
  ]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const area = line + ` L${W},${H} L0,${H} Z`;
  const id = `ac${color.replace("#", "")}`;
  return (
    <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`}/>
      <path d={line} stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

const VendorAnalyticsPage = () => {
  const [period, setPeriod] = useState("7d");
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const kpis = [
    { label: "Total Revenue", value: "Rs 8.4M", change: "+26%", up: true, color: "#10b981", icon: DollarSign, data: [35,50,42,65,55,78,70,88,82,94,90,100] },
    { label: "Orders", value: "847", change: "+23%", up: true, color: "#2563eb", icon: ShoppingCart, data: [30,45,38,60,52,75,68,82,79,91,86,97] },
    { label: "Visitors", value: "12.4K", change: "+18%", up: true, color: "#8b5cf6", icon: Eye, data: [40,55,48,70,62,80,76,90,85,95,88,100] },
    { label: "Conversion Rate", value: "6.8%", change: "-2%", up: false, color: "#f59e0b", icon: TrendingUp, data: [72,68,75,70,66,72,68,65,70,66,68,64] },
  ];

  const topProducts = [
    { name: "Samsung Galaxy S24 Ultra", sales: 156, revenue: "Rs 14M", pct: 100 },
    { name: "iPhone 15 Pro Max", sales: 89, revenue: "Rs 23.1M", pct: 78 },
    { name: "AirPods Pro 2nd Gen", sales: 312, revenue: "Rs 10.9M", pct: 65 },
    { name: "Sony PlayStation 5", sales: 201, revenue: "Rs 16.1M", pct: 55 },
    { name: "MacBook Pro M3", sales: 42, revenue: "Rs 14.7M", pct: 48 },
  ];

  const topCities = [
    { city: "Lahore", orders: 245, pct: 100, color: "#2563eb" },
    { city: "Karachi", orders: 198, pct: 81, color: "#8b5cf6" },
    { city: "Islamabad", orders: 156, pct: 64, color: "#10b981" },
    { city: "Faisalabad", orders: 98, pct: 40, color: "#f59e0b" },
    { city: "Multan", orders: 67, pct: 27, color: "#ef4444" },
  ];

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Analytics</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Track your store performance and insights</p>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["7d", "30d", "90d", "1y"].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              style={{ height: "36px", paddingInline: "14px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 700, ...F,
                background: period === p ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9",
                color: period === p ? "white" : "#64748b",
                boxShadow: period === p ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                transition: "all 0.18s" }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: "24px" }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${k.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <k.icon size={16} color={k.color}/>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11px", fontWeight: 800, color: k.up ? "#10b981" : "#ef4444" }}>
                {k.up ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>} {k.change}
              </div>
            </div>
            <p style={{ fontSize: "24px", fontWeight: 900, color: "#0f172a", margin: "0 0 2px", letterSpacing: "-0.03em" }}>{k.value}</p>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 12px" }}>{k.label}</p>
            <MiniChart data={k.data} color={k.color} height={50}/>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "24px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <h2 style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Revenue Trend</h2>
        <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 16px" }}>Monthly revenue over the selected period</p>
        <MiniChart data={[1200,1800,1500,2200,1900,2800,2400,3100,2900,3600,3200,4000]} color="#2563eb" height={120}/>
      </div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Top Products */}
        <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Top Products</h2>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 16px" }}>By number of sales</p>
          {topProducts.map((p, i) => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < topProducts.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "7px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "#64748b", flexShrink: 0 }}>{i + 1}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</p>
                <div style={{ height: "4px", borderRadius: "2px", background: "#f1f5f9", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "2px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", width: `${p.pct}%` }}/>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a", margin: 0 }}>{p.sales}</p>
                <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>{p.revenue}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Top Cities */}
        <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Top Cities</h2>
          <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 16px" }}>Orders by location</p>
          {topCities.map((c, i) => (
            <div key={c.city} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 0", borderBottom: i < topCities.length - 1 ? "1px solid #f1f5f9" : "none" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: "12px", fontWeight: 800, color: c.color }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 4px" }}>{c.city}</p>
                <div style={{ height: "5px", borderRadius: "3px", background: "#f1f5f9", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "3px", background: c.color, width: `${c.pct}%`, transition: "width 0.5s ease" }}/>
                </div>
              </div>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#0f172a" }}>{c.orders}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorAnalyticsPage;
