import { Pencil } from "lucide-react";

export default function ShopProfilePage() {
  return (
    <div>
      {/* Banner */}
      <div className="h-[100px] sm:h-[140px] bg-gradient-to-r from-primary to-blue-700 rounded-lg mb-[-40px] relative">
        <button className="absolute right-3 top-3 inline-flex items-center gap-[6px] px-3 py-[6px] rounded-lg text-xs font-semibold bg-card/80 text-foreground backdrop-blur-sm border border-border hover:bg-card transition-all">
          <Pencil className="w-3 h-3" /> Edit Banner
        </button>
      </div>

      <div className="px-3 sm:px-5 relative z-[1] flex items-end gap-4 mb-4">
        <div className="w-[60px] h-[60px] sm:w-[76px] sm:h-[76px] rounded-[14px] bg-gradient-to-br from-blue-500 to-purple-500 border-[3px] border-card flex items-center justify-center text-[22px] sm:text-[28px] font-bold text-primary-foreground shadow-card">
          M
        </div>
        <div className="pb-1">
          <h2 className="text-base sm:text-lg font-extrabold text-foreground">Mobile World PK</h2>
          <p className="text-xs text-muted-foreground">Electronics · Lahore, Pakistan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 lg:p-[18px] shadow-card">
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

        <div className="bg-card border border-border rounded-lg p-4 lg:p-[18px] shadow-card">
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
                <div className="text-[11px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
