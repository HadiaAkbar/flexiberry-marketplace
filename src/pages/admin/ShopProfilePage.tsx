import { Pencil } from "lucide-react";

export default function ShopProfilePage() {
  return (
    <div>
      {/* Banner */}
      <div className="h-[140px] bg-gradient-to-r from-[#0B9B9D] to-[#1565C0] rounded-lg mb-[-40px] relative">
        <button className="absolute right-3 top-3 inline-flex items-center gap-[6px] px-3 py-[6px] rounded-lg text-xs font-semibold bg-card/80 text-foreground backdrop-blur-sm border border-border hover:bg-card transition-all">
          <Pencil className="w-3 h-3" /> Edit Banner
        </button>
      </div>

      <div className="px-5 relative z-[1] flex items-end gap-4 mb-4">
        <div className="w-[76px] h-[76px] rounded-[14px] bg-gradient-to-br from-fb-blue to-fb-purple border-[3px] border-card flex items-center justify-center text-[28px] font-bold text-primary-foreground shadow-card-hover">
          M
        </div>
        <div className="pb-1">
          <h2 className="text-lg font-extrabold text-foreground">Mobile World PK</h2>
          <p className="text-xs text-text3">Electronics · Lahore, Pakistan</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        <div className="bg-card border border-border rounded-lg p-[18px] shadow-card">
          <h3 className="text-[15px] font-bold text-foreground mb-4">Shop Information</h3>
          <div className="space-y-3">
            {[
              ["Shop Name", "Mobile World PK"],
              ["Category", "Electronics"],
              ["Location", "Lahore, Pakistan"],
              ["Phone", "+92 300 1234567"],
              ["Email", "info@mobileworldpk.com"],
              ["Joined", "January 5, 2025"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="text-[13px] text-muted-foreground">{label}</span>
                <span className="text-[13px] font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-[18px] shadow-card">
          <h3 className="text-[15px] font-bold text-foreground mb-4">Performance</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "4.8/5", label: "Rating" },
              { value: "847", label: "Total Orders" },
              { value: "284", label: "Products" },
              { value: "312", label: "Customers" },
            ].map(s => (
              <div key={s.label} className="bg-background rounded-lg p-3 text-center">
                <div className="text-lg font-extrabold text-foreground font-mono">{s.value}</div>
                <div className="text-[11px] text-text3">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}