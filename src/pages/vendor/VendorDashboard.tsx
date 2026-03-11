import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, FileText, TrendingUp, Users, ShoppingCart } from "lucide-react";

const stats = [
  { title: "Total Products", value: "156", icon: Package, change: "+12 this month", color: "text-coral" },
  { title: "Total Revenue", value: "PKR 2.4M", icon: DollarSign, change: "+18% vs last month", color: "text-accent" },
  { title: "Pending Applications", value: "23", icon: FileText, change: "5 new today", color: "text-amber" },
  { title: "Active Installments", value: "89", icon: TrendingUp, change: "PKR 890K receivable", color: "text-coral" },
];

const VendorDashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">Welcome back, TechZone!</h2>
        <p className="text-muted-foreground text-sm">Here's your store overview for today.</p>
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
            <CardTitle className="text-foreground">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { buyer: "Ahmed Khan", product: "iPhone 15 Pro", status: "Pending", amount: "PKR 549,999" },
                { buyer: "Sara Ali", product: "MacBook Air M3", status: "Approved", amount: "PKR 429,999" },
                { buyer: "Hassan Raza", product: "Samsung S24", status: "Pending", amount: "PKR 449,999" },
              ].map((app, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{app.buyer}</p>
                    <p className="text-xs text-muted-foreground">{app.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{app.amount}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${app.status === "Approved" ? "bg-accent/10 text-accent" : "bg-amber/10 text-amber"}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Package, label: "Add Product", color: "gradient-coral" },
                { icon: FileText, label: "Review KYC", color: "gradient-teal" },
                { icon: Users, label: "View Buyers", color: "gradient-navy" },
                { icon: ShoppingCart, label: "View Orders", color: "gradient-warm" },
              ].map(({ icon: Icon, label, color }) => (
                <button key={label} className={`${color} text-primary-foreground rounded-xl p-4 text-center hover:opacity-90 transition-opacity`}>
                  <Icon className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
