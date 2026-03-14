import { useState } from "react";
import { Eye, Check, X, Search } from "lucide-react";

const orders = [
  { id: "#FB-8821", initials: "AB", customer: "Ahmad Bilal", product: "Samsung S24 Ultra", amount: "₨ 89,999", plan: "12 Mo", monthly: "₨ 7,499", progress: "6/12", status: "Active" },
  { id: "#FB-8756", initials: "HB", customer: "Hina Butt", product: "iPhone 15 Pro Max", amount: "₨ 259,999", plan: "6 Mo", monthly: "₨ 43,333", progress: "1/6", status: "Pending" },
  { id: "#FB-8744", initials: "MK", customer: "Murad Khan", product: "Sony PlayStation 5", amount: "₨ 79,999", plan: "6 Mo", monthly: "₨ 13,333", progress: "5/6", status: "Active" },
  { id: "#FB-8698", initials: "SA", customer: "Sara Anwar", product: "MacBook Pro M3", amount: "₨ 349,999", plan: "12 Mo", monthly: "₨ 29,166", progress: "0/12", status: "Pending" },
  { id: "#FB-8411", initials: "ZA", customer: "Zahid Abbas", product: "Samsung 65\" QLED", amount: "₨ 149,999", plan: "12 Mo", monthly: "₨ 12,499", progress: "12/12", status: "Done" },
];

const statusTabs = ["All Status", "Pending", "Active", "Completed", "Rejected"];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All Status");

  const filtered = activeTab === "All Status" ? orders : orders.filter(o => o.status === activeTab);

  const getProgressWidth = (progress: string) => {
    const [cur, total] = progress.split("/").map(Number);
    return `${(cur / total) * 100}%`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-foreground">Order Management</h2>
          <p className="text-xs text-muted-foreground mt-[2px]">Track and manage all customer orders</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-[14px_16px] border-b border-border gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-[7px] bg-background border border-border rounded-[7px] px-[11px] h-8 w-full sm:w-[200px]">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search orders..." className="border-none outline-none bg-transparent text-foreground text-xs font-sans w-full placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-wrap gap-1">
              {statusTabs.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-3 py-[6px] rounded-lg text-xs font-semibold border transition-all ${
                    activeTab === t ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">847 total orders</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                {["Order ID", "Customer", "Product", "Amount", "Plan", "Monthly", "Progress", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{o.id}</td>
                  <td className="px-4 py-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-[10px] font-bold text-primary-foreground shrink-0">
                        {o.initials}
                      </div>
                      <span className="text-[13px] font-semibold text-foreground whitespace-nowrap">{o.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border whitespace-nowrap">{o.product}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{o.amount}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground border-t border-border">{o.plan}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{o.monthly}</td>
                  <td className="px-4 py-3 border-t border-border w-[100px]">
                    <div className="flex items-center gap-2">
                      <div className="h-[6px] flex-1 bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: getProgressWidth(o.progress) }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">{o.progress}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-t border-border">
                    <span className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[11px] font-bold ${
                      o.status === "Active" ? "bg-green-100 text-green-600" :
                      o.status === "Pending" ? "bg-amber-100 text-amber-600" :
                      o.status === "Done" ? "bg-blue-100 text-blue-600" :
                      "bg-red-100 text-red-500"
                    }`}>
                      <span className="w-[5px] h-[5px] rounded-full bg-current" />
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-t border-border">
                    <div className="flex gap-[5px]">
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all">
                        <Eye className="w-3 h-3" />
                      </button>
                      {o.status === "Pending" && (
                        <>
                          <button className="w-7 h-7 rounded-md flex items-center justify-center bg-green-100 text-green-600 hover:bg-green-500 hover:text-white transition-all">
                            <Check className="w-3 h-3" />
                          </button>
                          <button className="w-7 h-7 rounded-md flex items-center justify-center bg-red-100 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Showing 1–5 of 847 orders</span>
          <div className="flex gap-1">
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">‹</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold bg-primary text-primary-foreground border border-primary">1</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">2</button>
            <button className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-semibold border border-border bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
