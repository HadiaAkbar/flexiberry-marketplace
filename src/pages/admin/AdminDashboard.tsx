import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { title: "Total Users", value: "12,456", icon: Users, change: "+324 this week", color: "text-coral" },
  { title: "Active Vendors", value: "58", icon: Store, change: "3 pending approval", color: "text-accent" },
  { title: "Platform Revenue", value: "PKR 18.5M", icon: DollarSign, change: "+22% vs last month", color: "text-coral" },
  { title: "Active Installments", value: "1,234", icon: TrendingUp, change: "PKR 45M receivable", color: "text-amber" },
];

const AdminDashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Platform Overview</h2>
        <p className="text-muted-foreground text-sm">FlexiBerry platform statistics and management.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Pending Vendor Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "ElectroHub Lahore", category: "Electronics", date: "Mar 10, 2026" },
                { name: "Green Solar PK", category: "Solar Energy", date: "Mar 9, 2026" },
                { name: "FurniCraft", category: "Furniture", date: "Mar 8, 2026" },
              ].map((vendor, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{vendor.name}</p>
                    <p className="text-xs text-muted-foreground">{vendor.category} · Applied {vendor.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors">Approve</button>
                    <button className="text-xs px-3 py-1 rounded-full bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: AlertTriangle, text: "15 overdue installments flagged", type: "warning" },
                { icon: CheckCircle, text: "Daily cron job ran successfully", type: "success" },
                { icon: AlertTriangle, text: "3 KYC documents awaiting review", type: "warning" },
                { icon: CheckCircle, text: "Payment reminders sent to 28 buyers", type: "success" },
              ].map((alert, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <alert.icon className={`h-4 w-4 shrink-0 ${alert.type === "warning" ? "text-amber" : "text-accent"}`} />
                  <span className="text-sm text-foreground">{alert.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
