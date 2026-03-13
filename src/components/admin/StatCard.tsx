interface StatCardProps {
  icon: string;
  iconColor: "teal" | "blue" | "amber" | "green" | "purple";
  value: string;
  label: string;
  trend: string;
  trendUp: boolean;
}

const iconBgMap = {
  teal: "bg-teal-bg",
  blue: "bg-fb-blue-bg",
  amber: "bg-fb-amber-bg",
  green: "bg-fb-green-bg",
  purple: "bg-fb-purple-bg",
};

export function StatCard({ icon, iconColor, value, label, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-[18px] shadow-card hover:shadow-card-hover hover:-translate-y-[1px] transition-all">
      <div className="flex items-start justify-between mb-[14px]">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-xl ${iconBgMap[iconColor]}`}>
          {icon}
        </div>
        <span
          className={`text-[11px] font-bold px-2 py-[3px] rounded-full ${
            trendUp ? "bg-fb-green-bg text-fb-green" : "bg-fb-red-bg text-fb-red"
          }`}
        >
          {trendUp ? "↑" : "↓"} {trend}
        </span>
      </div>
      <div className="text-[28px] font-extrabold text-foreground font-mono leading-none mb-1">{value}</div>
      <div className="text-xs text-muted-foreground font-medium">{label}</div>
    </div>
  );
}