import { useState } from "react";
import { Eye, Pencil, Trash2, Plus, Search } from "lucide-react";

const products = [
  { id: "P-001", name: "Samsung Galaxy S24 Ultra", category: "Phones", price: "₨ 289,999", stock: 45, status: "Active" },
  { id: "P-002", name: "iPhone 15 Pro Max", category: "Phones", price: "₨ 459,999", stock: 23, status: "Active" },
  { id: "P-003", name: "MacBook Pro M3", category: "Laptops", price: "₨ 549,999", stock: 12, status: "Active" },
  { id: "P-004", name: "Sony PlayStation 5", category: "Gaming", price: "₨ 149,999", stock: 3, status: "Low Stock" },
  { id: "P-005", name: "Samsung 65\" QLED TV", category: "TVs", price: "₨ 249,999", stock: 0, status: "Out of Stock" },
];

const statusTabs = ["All", "Active", "Low Stock", "Out of Stock"];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = activeTab === "All" ? products : products.filter(p => p.status === activeTab);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-foreground">Product Management</h2>
          <p className="text-xs text-muted-foreground mt-[2px]">Manage your product catalog</p>
        </div>
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg text-[13px] font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-all">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-[14px_16px] border-b border-border gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-[7px] bg-background border border-border rounded-[7px] px-[11px] h-8 w-full sm:w-[200px]">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input type="text" placeholder="Search products..." className="border-none outline-none bg-transparent text-foreground text-xs font-sans w-full placeholder:text-muted-foreground" />
            </div>
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
          <span className="text-xs text-muted-foreground">{products.length} products</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background">
              <tr>
                {["ID", "Product", "Category", "Price", "Stock", "Status", "Actions"].map(h => (
                  <th key={h} className="px-4 py-[10px] text-left text-[11px] font-bold text-muted-foreground uppercase tracking-[0.7px] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{p.id}</td>
                  <td className="px-4 py-3 text-[13px] font-semibold text-foreground border-t border-border">{p.name}</td>
                  <td className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border">{p.category}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{p.price}</td>
                  <td className="px-4 py-3 text-xs font-mono text-muted-foreground border-t border-border">{p.stock}</td>
                  <td className="px-4 py-3 border-t border-border">
                    <span className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[11px] font-bold ${
                      p.status === "Active" ? "bg-green-100 text-green-600" :
                      p.status === "Low Stock" ? "bg-amber-100 text-amber-600" :
                      "bg-red-100 text-red-500"
                    }`}>
                      <span className="w-[5px] h-[5px] rounded-full bg-current" />
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-t border-border">
                    <div className="flex gap-[5px]">
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all">
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all">
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-red-100 hover:text-red-500 border border-transparent transition-all">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
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
