import { Search, Eye } from "lucide-react";

const customers = [
  { initials: "AB", name: "Ahmad Bilal", email: "ahmad@email.com", orders: 5, spent: "₨ 523,000", status: "Active" },
  { initials: "HB", name: "Hina Butt", email: "hina@email.com", orders: 2, spent: "₨ 319,998", status: "Active" },
  { initials: "MK", name: "Murad Khan", email: "murad@email.com", orders: 3, spent: "₨ 209,997", status: "Active" },
  { initials: "SA", name: "Sara Anwar", email: "sara@email.com", orders: 1, spent: "₨ 349,999", status: "Pending" },
  { initials: "ZA", name: "Zahid Abbas", email: "zahid@email.com", orders: 4, spent: "₨ 449,996", status: "Active" },
];

export default function CustomersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-foreground">Customer Management</h2>
          <p className="text-xs text-muted-foreground mt-[2px]">View and manage all customers</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        <div className="flex items-center justify-between p-[14px_16px] border-b border-border">
          <div className="flex items-center gap-[7px] bg-background border border-border rounded-[7px] px-[11px] h-8 w-full sm:w-[250px]">
            <Search className="w-3.5 h-3.5 text-muted-foreground" />
            <input type="text" placeholder="Search customers..." className="border-none outline-none bg-transparent text-foreground text-xs font-sans w-full placeholder:text-muted-foreground" />
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">312 total customers</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                {["Customer", "Email", "Orders", "Total Spent", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.name} className="hover:bg-muted/30">
                  <td className="px-4 py-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center text-[11px] font-bold text-primary-foreground shrink-0">
                        {c.initials}
                      </div>
                      <span className="text-[13px] font-semibold text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border">{c.email}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground font-mono border-t border-border">{c.orders}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground font-mono border-t border-border">{c.spent}</td>
                  <td className="px-4 py-3 border-t border-border">
                    <span className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[11px] font-bold ${
                      c.status === "Active" ? "bg-green-100 text-green-600" : "bg-amber-100 text-amber-600"
                    }`}>
                      <span className="w-[5px] h-[5px] rounded-full bg-current" />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-t border-border">
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all">
                      <Eye className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
