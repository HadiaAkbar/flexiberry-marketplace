import { StatCard } from "@/components/admin/StatCard";
import { Check, X } from "lucide-react";

const stats = [
  { icon: "📦", iconColor: "teal" as const, value: "284", label: "Total Products", trend: "8%", trendUp: true },
  { icon: "🧾", iconColor: "blue" as const, value: "847", label: "Orders Received", trend: "23%", trendUp: true },
  { icon: "💳", iconColor: "amber" as const, value: "612", label: "Active Installments", trend: "15%", trendUp: true },
  { icon: "💰", iconColor: "green" as const, value: "₨ 8.4M", label: "Monthly Revenue", trend: "26%", trendUp: true },
];

const pendingOrders = [
  { product: "Samsung Galaxy S24 Ultra", customer: "Ahmad Bilal", plan: "12-month plan", price: "₨ 89,999" },
  { product: "iPhone 15 Pro Max", customer: "Hina Butt", plan: "6-month plan", price: "₨ 259,999" },
  { product: "Sony PlayStation 5", customer: "Murad Khan", plan: "6-month plan", price: "₨ 79,999" },
  { product: "MacBook Pro M3", customer: "Sara Anwar", plan: "12-month plan", price: "₨ 349,999" },
];

const topProducts = [
  { name: "Samsung Galaxy S24 Ultra", orders: 142, revenue: "₨ 12.8M" },
  { name: "iPhone 15 Pro Max", orders: 89, revenue: "₨ 23.1M" },
  { name: "MacBook Air M2", orders: 54, revenue: "₨ 10.3M" },
  { name: "Sony PlayStation 5", orders: 37, revenue: "₨ 3.0M" },
];

const barData = [
  { label: "Mon", height: 55 },
  { label: "Tue", height: 70 },
  { label: "Wed", height: 45 },
  { label: "Thu", height: 85 },
  { label: "Fri", height: 60 },
  { label: "Sat", height: 90 },
  { label: "Sun", height: 40 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-[22px]">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-[14px]">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Chart */}
        <div className="bg-card border border-border rounded-lg p-4 lg:p-[18px] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-foreground">Sales Overview</h3>
              <p className="text-xs text-muted-foreground mt-[2px]">Last 7 days</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-extrabold text-foreground font-mono">₨ 2.1M</div>
              <div className="text-[11px] text-green-600 font-semibold">▲ 18.4% vs last week</div>
            </div>
          </div>
          <div className="h-[100px] flex items-end gap-[6px]">
            {barData.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-[5px]">
                <div
                  className="w-full rounded-t bg-primary hover:opacity-75 transition-opacity cursor-pointer"
                  style={{ height: `${bar.height}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-card border border-border rounded-lg p-4 lg:p-[18px] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-bold text-foreground">Pending Orders</h3>
            <span className="text-xs text-primary font-semibold">4 new</span>
          </div>
          <div className="space-y-3">
            {pendingOrders.map((o) => (
              <div key={o.customer} className="flex items-center justify-between p-3 bg-background rounded-lg gap-2">
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-foreground truncate">{o.product}</div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {o.customer} · {o.plan} · {o.price}
                  </div>
                </div>
                <div className="flex gap-[5px] shrink-0">
                  <button className="w-7 h-7 rounded-md flex items-center justify-center bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-all">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-md flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
          <div className="flex items-center justify-between p-[18px] pb-0">
            <h3 className="text-[15px] font-bold text-foreground">Top Products This Month</h3>
            <button className="text-xs text-primary font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full mt-3">
              <thead className="bg-background">
                <tr>
                  <th className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px]">Product</th>
                  <th className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px]">Orders</th>
                  <th className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px]">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p) => (
                  <tr key={p.name} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-[13px] font-semibold text-foreground border-t border-border">{p.name}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground font-mono border-t border-border">{p.orders}</td>
                    <td className="px-4 py-3 text-[13px] text-muted-foreground font-mono border-t border-border">{p.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Installment Collection */}
        <div className="bg-card border border-border rounded-lg p-4 lg:p-[18px] shadow-card">
          <h3 className="text-[15px] font-bold text-foreground mb-4">Installment Collection</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-muted-foreground">Paid on time</span>
                <span className="font-semibold text-foreground">487 (79%)</span>
              </div>
              <div className="h-[6px] bg-background rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "79%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-muted-foreground">Due this week</span>
                <span className="font-semibold text-foreground">98 (16%)</span>
              </div>
              <div className="h-[6px] bg-background rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: "16%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[13px] mb-1.5">
                <span className="text-muted-foreground">Overdue</span>
                <span className="font-semibold text-foreground">27 (5%)</span>
              </div>
              <div className="h-[6px] bg-background rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "5%" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-border">
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-lg font-extrabold text-foreground font-mono">₨ 4.62M</div>
                <div className="text-[11px] text-muted-foreground">Collected this month</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-lg font-extrabold text-foreground font-mono">₨ 241K</div>
                <div className="text-[11px] text-muted-foreground">Still outstanding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
