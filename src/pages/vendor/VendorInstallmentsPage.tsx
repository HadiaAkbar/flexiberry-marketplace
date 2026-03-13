import { useState } from "react";
import {
  CreditCard, Search, TrendingUp, Clock,
  CheckCircle, AlertTriangle, DollarSign, Calendar,
  ChevronRight, Users,
} from "lucide-react";

const INSTALLMENTS = [
  { id: "INS-001", buyer: "Ahmad Bilal", product: "Samsung Galaxy S24 Ultra", total: 89999, paid: 44999, remaining: 45000, plan: "12-month", monthsPaid: 6, totalMonths: 12, status: "on_track", nextDue: "Apr 1, 2026", avatar: "AB", color: "#3b82f6" },
  { id: "INS-002", buyer: "Hina Butt", product: "iPhone 15 Pro Max", total: 259999, paid: 86666, remaining: 173333, plan: "6-month", monthsPaid: 2, totalMonths: 6, status: "on_track", nextDue: "Apr 5, 2026", avatar: "HB", color: "#8b5cf6" },
  { id: "INS-003", buyer: "Murad Khan", product: "Sony PlayStation 5", total: 79999, paid: 53333, remaining: 26666, plan: "6-month", monthsPaid: 4, totalMonths: 6, status: "on_track", nextDue: "Apr 10, 2026", avatar: "MK", color: "#10b981" },
  { id: "INS-004", buyer: "Sara Anwar", product: "MacBook Pro M3", total: 349999, paid: 58333, remaining: 291666, plan: "12-month", monthsPaid: 2, totalMonths: 12, status: "overdue", nextDue: "Mar 1, 2026", avatar: "SA", color: "#f59e0b" },
  { id: "INS-005", buyer: "Faisal Mir", product: 'LG OLED 65"', total: 189999, paid: 189999, remaining: 0, plan: "18-month", monthsPaid: 18, totalMonths: 18, status: "completed", nextDue: "—", avatar: "FM", color: "#ef4444" },
  { id: "INS-006", buyer: "Zara Hussain", product: "iPad Pro M2", total: 179999, paid: 29999, remaining: 150000, plan: "6-month", monthsPaid: 1, totalMonths: 6, status: "overdue", nextDue: "Feb 15, 2026", avatar: "ZH", color: "#06b6d4" },
];

const STATUS_MAP: Record<string, { label: string; bg: string; color: string; border: string; icon: any }> = {
  on_track: { label: "On Track", bg: "#ecfdf5", color: "#059669", border: "#a7f3d0", icon: CheckCircle },
  overdue: { label: "Overdue", bg: "#fef2f2", color: "#dc2626", border: "#fecaca", icon: AlertTriangle },
  completed: { label: "Completed", bg: "#f0fdf4", color: "#15803d", border: "#86efac", icon: CheckCircle },
};

const VendorInstallmentsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  const filtered = INSTALLMENTS.filter(i => {
    const matchSearch = i.buyer.toLowerCase().includes(search.toLowerCase()) || i.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || i.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalActive = INSTALLMENTS.filter(i => i.status !== "completed").length;
  const totalCollected = INSTALLMENTS.reduce((s, i) => s + i.paid, 0);
  const totalRemaining = INSTALLMENTS.reduce((s, i) => s + i.remaining, 0);
  const overdueCount = INSTALLMENTS.filter(i => i.status === "overdue").length;

  const stats = [
    { label: "Active Plans", val: totalActive, color: "#2563eb", bg: "#eff6ff", icon: CreditCard },
    { label: "Collected", val: `Rs ${(totalCollected / 1000).toFixed(0)}K`, color: "#10b981", bg: "#ecfdf5", icon: DollarSign },
    { label: "Remaining", val: `Rs ${(totalRemaining / 1000).toFixed(0)}K`, color: "#f59e0b", bg: "#fffbeb", icon: TrendingUp },
    { label: "Overdue", val: overdueCount, color: "#ef4444", bg: "#fef2f2", icon: AlertTriangle },
  ];

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Installments</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Track buyer installment plans and payments</p>
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

      {/* Filter */}
      <div style={{ background: "white", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "14px 18px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "200px" }}>
          <Search size={14} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}/>
          <input placeholder="Search by buyer or product…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", height: "38px", paddingLeft: "34px", paddingRight: "12px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a" }}/>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "on_track", "overdue", "completed"].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              style={{ height: "36px", paddingInline: "12px", borderRadius: "9px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 700, ...F, textTransform: "capitalize",
                background: statusFilter === s ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#f1f5f9",
                color: statusFilter === s ? "white" : "#64748b",
                boxShadow: statusFilter === s ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
                transition: "all 0.18s" }}>
              {s === "all" ? "All" : s === "on_track" ? "On Track" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 120px 100px 110px", padding: "12px 20px", background: "#fafbff", borderBottom: "1px solid #f1f5f9", gap: "12px" }}>
          {["Buyer / Product", "Total", "Paid", "Progress", "Status", "Next Due"].map(h => (
            <span key={h} style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>

        {filtered.map(inst => {
          const sc = STATUS_MAP[inst.status];
          const pct = Math.round((inst.monthsPaid / inst.totalMonths) * 100);
          return (
            <div key={inst.id}
              style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 120px 100px 110px", padding: "14px 20px", borderBottom: "1px solid #f8fafc", gap: "12px", alignItems: "center", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#fafbff")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: `linear-gradient(135deg,${inst.color},${inst.color}bb)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 900, color: "white", flexShrink: 0 }}>{inst.avatar}</div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{inst.buyer}</p>
                  <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{inst.product}</p>
                </div>
              </div>
              <span style={{ fontSize: "12px", fontWeight: 800, color: "#0f172a" }}>Rs {inst.total.toLocaleString()}</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#10b981" }}>Rs {inst.paid.toLocaleString()}</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#64748b" }}>{inst.monthsPaid}/{inst.totalMonths} months</span>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#0f172a" }}>{pct}%</span>
                </div>
                <div style={{ height: "5px", borderRadius: "3px", background: "#f1f5f9", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: "3px", background: inst.status === "completed" ? "#10b981" : inst.status === "overdue" ? "#ef4444" : "#2563eb", width: `${pct}%`, transition: "width 0.5s ease" }}/>
                </div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 700, padding: "4px 9px", borderRadius: "20px", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                <sc.icon size={9}/> {sc.label}
              </span>
              <span style={{ fontSize: "11px", color: inst.status === "overdue" ? "#ef4444" : "#94a3b8", fontWeight: inst.status === "overdue" ? 700 : 400 }}>{inst.nextDue}</span>
            </div>
          );
        })}

        <div style={{ padding: "14px 20px", background: "#fafbff", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>Showing {filtered.length} of {INSTALLMENTS.length} plans</span>
        </div>
      </div>
    </div>
  );
};

export default VendorInstallmentsPage;
