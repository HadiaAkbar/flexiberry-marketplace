import { Pencil, Trash2, Plus } from "lucide-react";

const categories = [
  { emoji: "📱", name: "Phones", products: 98, created: "Jan 5, 2025", status: "Active" },
  { emoji: "💻", name: "Laptops", products: 45, created: "Jan 5, 2025", status: "Active" },
  { emoji: "🎮", name: "Gaming", products: 32, created: "Feb 10, 2025", status: "Active" },
  { emoji: "📺", name: "TVs & Displays", products: 28, created: "Feb 18, 2025", status: "Active" },
  { emoji: "⌚", name: "Wearables", products: 19, created: "Mar 1, 2025", status: "Draft" },
];

export default function CategoriesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-foreground">Shop Categories</h2>
          <p className="text-xs text-text3 mt-[2px]">Organize your products into categories</p>
        </div>
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg text-[13px] font-semibold bg-primary text-primary-foreground shadow-teal-glow hover:bg-primary-hover transition-all">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-background">
            <tr>
              <th className="px-4 py-[10px] text-left text-[11px] font-bold text-text3 uppercase tracking-[0.7px]">Category</th>
              <th className="px-4 py-[10px] text-left text-[11px] font-bold text-text3 uppercase tracking-[0.7px]">Products</th>
              <th className="px-4 py-[10px] text-left text-[11px] font-bold text-text3 uppercase tracking-[0.7px]">Created</th>
              <th className="px-4 py-[10px] text-left text-[11px] font-bold text-text3 uppercase tracking-[0.7px]">Status</th>
              <th className="px-4 py-[10px] text-left text-[11px] font-bold text-text3 uppercase tracking-[0.7px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.name} className="hover:bg-foreground/[0.014]">
                <td className="px-4 py-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{c.emoji}</span>
                    <span className="text-[13px] font-semibold text-foreground">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[13px] text-muted-foreground font-mono border-t border-border">{c.products}</td>
                <td className="px-4 py-3 text-[13px] text-muted-foreground border-t border-border">{c.created}</td>
                <td className="px-4 py-3 border-t border-border">
                  <span className={`inline-flex items-center gap-1 px-[9px] py-[3px] rounded-full text-[11px] font-bold ${
                    c.status === "Active" ? "bg-fb-green-bg text-fb-green" : "bg-secondary text-text3"
                  }`}>
                    <span className="w-[5px] h-[5px] rounded-full bg-current" />
                    {c.status}
                  </span>
                </td>
                <td className="px-4 py-3 border-t border-border">
                  <div className="flex gap-[5px]">
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-text3 hover:bg-background hover:text-foreground border border-transparent hover:border-border transition-all">
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button className="w-7 h-7 rounded-md flex items-center justify-center text-text3 hover:bg-fb-red-bg hover:text-fb-red border border-transparent transition-all">
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
  );
}