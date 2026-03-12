import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Package, CreditCard, MapPin, Settings,
  LogOut, ChevronRight, Star, TrendingUp, Clock, CheckCircle2,
  XCircle, Truck, AlertCircle, Bell, Shield, Eye, EyeOff,
  Edit3, Plus, Home, Briefcase, User, Phone, Mail,
  ArrowLeft, Calendar, ChevronDown
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
type Tab = "dashboard" | "orders" | "installments" | "address" | "settings";

// ── Mock data ────────────────────────────────────────────────────────────────
const user = {
  name: "Ahmed Raza",
  email: "ahmed.raza@gmail.com",
  phone: "+92 300 1234567",
  avatar: "AR",
  joinedDate: "Member since Jan 2024",
  tier: "Gold Member",
};

const stats = [
  { label: "Total Orders", value: "24", icon: Package, color: "from-blue-500 to-blue-600" },
  { label: "Completed", value: "18", icon: CheckCircle2, color: "from-green-500 to-emerald-600" },
  { label: "Cancelled", value: "2", icon: XCircle, color: "from-red-500 to-rose-600" },
  { label: "Pending", value: "4", icon: Clock, color: "from-amber-500 to-orange-500" },
];

const recentOrders = [
  { id: "#FB-78423", product: "Samsung Galaxy S24 Ultra", shop: "TechZone Electronics", price: 299999, status: "Delivered", date: "10 Mar 2026", image: "📱" },
  { id: "#FB-78301", product: 'LG OLED 65" TV', shop: "Home Appliance Hub", price: 499999, status: "In Transit", date: "8 Mar 2026", image: "📺" },
  { id: "#FB-78198", product: "Sony WH-1000XM5", shop: "Audio Vision", price: 89999, status: "Processing", date: "5 Mar 2026", image: "🎧" },
  { id: "#FB-77954", product: "Dyson V15 Vacuum", shop: "Home Appliance Hub", price: 149999, status: "Cancelled", date: "28 Feb 2026", image: "🌀" },
];

const installments = [
  {
    id: "INS-001",
    product: "Samsung Galaxy S24 Ultra",
    image: "📱",
    shop: "TechZone Electronics",
    totalAmount: 299999,
    paidAmount: 149999,
    monthlyAmount: 24999,
    nextDue: "15 Apr 2026",
    months: { paid: 6, total: 12 },
    status: "Active",
  },
  {
    id: "INS-002",
    product: "MacBook Air M3",
    image: "💻",
    shop: "Digital World Store",
    totalAmount: 389999,
    paidAmount: 97499,
    monthlyAmount: 32499,
    nextDue: "20 Apr 2026",
    months: { paid: 3, total: 12 },
    status: "Active",
  },
  {
    id: "INS-003",
    product: "Haier Inverter AC 1.5 Ton",
    image: "❄️",
    shop: "Home Appliance Hub",
    totalAmount: 129999,
    paidAmount: 129999,
    monthlyAmount: 10833,
    nextDue: "—",
    months: { paid: 12, total: 12 },
    status: "Completed",
  },
];

const addresses = [
  {
    id: "addr-1",
    label: "Home",
    icon: Home,
    name: "Ahmed Raza",
    line1: "House 45, Street 12, G-9/3",
    city: "Islamabad",
    province: "ICT",
    zip: "44000",
    phone: "+92 300 1234567",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    icon: Briefcase,
    name: "Ahmed Raza",
    line1: "Office 301, Blue Area, Jinnah Ave",
    city: "Islamabad",
    province: "ICT",
    zip: "44000",
    phone: "+92 300 1234567",
    isDefault: false,
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
  Delivered:   { color: "text-green-700",  bg: "bg-green-50 border-green-200",  icon: CheckCircle2 },
  "In Transit":{ color: "text-blue-700",   bg: "bg-blue-50 border-blue-200",    icon: Truck },
  Processing:  { color: "text-amber-700",  bg: "bg-amber-50 border-amber-200",  icon: Clock },
  Cancelled:   { color: "text-red-700",    bg: "bg-red-50 border-red-200",      icon: XCircle },
  Pending:     { color: "text-orange-700", bg: "bg-orange-50 border-orange-200",icon: AlertCircle },
};

// ── Sub-pages ─────────────────────────────────────────────────────────────────

const Dashboard = () => (
  <div>
    {/* Stats */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-card border border-border rounded-2xl p-5"
        >
          <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
            <s.icon className="h-5 w-5 text-white" />
          </div>
          <p className="text-2xl font-bold font-display text-foreground">{s.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Recent orders */}
    <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Orders</h3>
        <button className="text-xs text-primary font-medium hover:underline">View all →</button>
      </div>
      <div className="divide-y divide-border">
        {recentOrders.map((order) => {
          const cfg = statusConfig[order.status];
          return (
            <div key={order.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
              <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center text-2xl flex-shrink-0">
                {order.image}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{order.product}</p>
                <p className="text-xs text-muted-foreground">{order.shop} · {order.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-foreground">{formatPKR(order.price)}</p>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border mt-1 ${cfg.bg} ${cfg.color}`}>
                  <cfg.icon className="h-3 w-3" /> {order.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* Active installments summary */}
    <div className="bg-card border border-border rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Active Installments</h3>
        <button className="text-xs text-primary font-medium hover:underline">View all →</button>
      </div>
      {installments.filter(i => i.status === "Active").map((ins) => {
        const progress = (ins.months.paid / ins.months.total) * 100;
        return (
          <div key={ins.id} className="px-6 py-4 border-b border-border last:border-0">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">{ins.image}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{ins.product}</p>
                <p className="text-xs text-muted-foreground">Next due: {ins.nextDue}</p>
              </div>
              <p className="text-sm font-semibold text-foreground">{formatPKR(ins.monthlyAmount)}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div
                className="gradient-primary h-1.5 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{ins.months.paid} of {ins.months.total} payments done</p>
          </div>
        );
      })}
    </div>
  </div>
);

const Orders = () => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <Package className="h-5 w-5 text-primary" />
      <h2 className="font-display font-bold text-xl text-foreground">Your Orders</h2>
    </div>
    <div className="space-y-3">
      {recentOrders.map((order, i) => {
        const cfg = statusConfig[order.status];
        return (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                {order.image}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{order.product}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{order.shop}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
                    <cfg.icon className="h-3 w-3" /> {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{order.id}</span>
                    <span>·</span>
                    <Calendar className="h-3 w-3" />
                    <span>{order.date}</span>
                  </div>
                  <p className="font-bold text-foreground">{formatPKR(order.price)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  </div>
);

const Installments = () => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <CreditCard className="h-5 w-5 text-primary" />
      <h2 className="font-display font-bold text-xl text-foreground">Installment Plans</h2>
    </div>
    <div className="space-y-4">
      {installments.map((ins, i) => {
        const progress = (ins.months.paid / ins.months.total) * 100;
        const remaining = ins.totalAmount - ins.paidAmount;
        return (
          <motion.div
            key={ins.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-3xl flex-shrink-0">
                {ins.image}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-foreground">{ins.product}</p>
                    <p className="text-xs text-muted-foreground">{ins.shop}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    ins.status === "Active"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-muted text-muted-foreground border-border"
                  }`}>
                    {ins.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-muted-foreground">{ins.months.paid} payments done</span>
                <span className="font-medium text-foreground">{ins.months.total - ins.months.paid} remaining</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${ins.status === "Completed" ? "bg-green-500" : "gradient-primary"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Financials */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Monthly</p>
                <p className="font-bold text-foreground text-sm">{formatPKR(ins.monthlyAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Paid</p>
                <p className="font-bold text-green-600 text-sm">{formatPKR(ins.paidAmount)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Remaining</p>
                <p className={`font-bold text-sm ${remaining === 0 ? "text-muted-foreground" : "text-foreground"}`}>
                  {remaining === 0 ? "—" : formatPKR(remaining)}
                </p>
              </div>
            </div>

            {ins.status === "Active" && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  Next due: <span className="font-semibold text-foreground">{ins.nextDue}</span>
                </div>
                <button className="text-xs font-semibold text-primary hover:underline">
                  Pay Early →
                </button>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  </div>
);

const AddressBook = () => {
  const [addrs, setAddrs] = useState(addresses);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="font-display font-bold text-xl text-foreground">Saved Addresses</h2>
        </div>
        <button className="gradient-primary text-white text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:shadow-primary transition-all hover:-translate-y-0.5">
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>
      <div className="space-y-4">
        {addrs.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative bg-card border rounded-2xl p-6 hover:shadow-md transition-all ${
              addr.isDefault ? "border-primary/40 shadow-primary" : "border-border"
            }`}
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                Default
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <addr.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">{addr.label}</span>
            </div>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="font-medium text-foreground flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {addr.name}</p>
              <p>{addr.line1}</p>
              <p>{addr.city}, {addr.province} {addr.zip}</p>
              <p className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {addr.phone}</p>
            </div>
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
              <button className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                <Edit3 className="h-3 w-3" /> Edit
              </button>
              {!addr.isDefault && (
                <>
                  <span className="text-border">·</span>
                  <button className="text-xs font-medium text-muted-foreground hover:text-foreground">Set as Default</button>
                  <span className="text-border">·</span>
                  <button className="text-xs font-medium text-destructive hover:underline">Remove</button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AccountSettings = () => {
  const [showPass, setShowPass] = useState(false);
  const [notifications, setNotifications] = useState({
    orders: true, installments: true, promotions: false, security: true,
  });

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Settings className="h-5 w-5 text-primary" />
        <h2 className="font-display font-bold text-xl text-foreground">Account Settings</h2>
      </div>

      {/* Profile info */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <User className="h-4 w-4 text-primary" /> Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: user.name, icon: User },
            { label: "Email Address", value: user.email, icon: Mail },
            { label: "Phone Number", value: user.phone, icon: Phone },
          ].map((field) => (
            <div key={field.label} className={field.label === "Email Address" ? "md:col-span-2" : ""}>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">{field.label}</label>
              <div className="relative">
                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  defaultValue={field.value}
                  className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 gradient-primary text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:shadow-primary transition-all hover:-translate-y-0.5">
          Save Changes
        </button>
      </div>

      {/* Password */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" /> Security
        </h3>
        <div className="space-y-3">
          {["Current Password", "New Password", "Confirm New Password"].map((label) => (
            <div key={label}>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">{label}</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                <button
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-muted border border-border text-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-muted/70 transition-colors">
          Update Password
        </button>
      </div>

      {/* Notifications */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-primary" /> Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            { key: "orders", label: "Order Updates", desc: "Shipping, delivery, and return notifications" },
            { key: "installments", label: "Installment Reminders", desc: "Due date alerts and payment confirmations" },
            { key: "promotions", label: "Promotions & Offers", desc: "Flash sales, discounts, and special deals" },
            { key: "security", label: "Security Alerts", desc: "Login activity and account changes" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button
                onClick={() => toggle(key as any)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  notifications[key as keyof typeof notifications] ? "gradient-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    notifications[key as keyof typeof notifications] ? "translate-x-5.5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h3 className="font-semibold text-red-700 mb-1">Danger Zone</h3>
        <p className="text-xs text-red-600 mb-4">These actions are irreversible. Please be certain.</p>
        <button className="text-sm font-medium text-red-700 border border-red-300 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const navItems: { id: Tab; label: string; icon: any }[] = [
    { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
    { id: "orders",       label: "Your Orders",  icon: Package },
    { id: "installments", label: "Installments", icon: CreditCard },
    { id: "address",      label: "My Address",   icon: MapPin },
    { id: "settings",     label: "Settings",     icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":    return <Dashboard />;
      case "orders":       return <Orders />;
      case "installments": return <Installments />;
      case "address":      return <AddressBook />;
      case "settings":     return <AccountSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Breadcrumb header ── */}
      <div className="border-b border-border bg-card/50 px-4 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">My Account</span>
        </div>
      </div>

      {/* ── Page title ── */}
      <div className="bg-card border-b border-border px-4 py-8">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">My Account</h1>
          <p className="text-muted-foreground text-sm">
            Manage your profile, track orders, and easily update your personal details anytime, all in one convenient place.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 flex-shrink-0">
            {/* User card */}
            <div className="bg-card border border-border rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {user.avatar}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full mt-1">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {user.tier}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> {user.joinedDate}
              </p>
            </div>

            {/* Nav */}
            <nav className="bg-card border border-border rounded-2xl overflow-hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 text-sm transition-all border-b border-border last:border-0 group
                    ${activeTab === item.id
                      ? "text-primary font-semibold bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                >
                  <item.icon className={`h-4.5 w-4.5 ${activeTab === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {item.label}
                  {activeTab === item.id && <ChevronRight className="h-4 w-4 ml-auto text-primary" />}
                </button>
              ))}
              {/* Logout */}
              <button className="w-full flex items-center gap-3 px-5 py-4 text-sm text-destructive hover:bg-red-50 transition-colors border-t border-border">
                <LogOut className="h-4.5 w-4.5" />
                Logout
              </button>
            </nav>
          </aside>

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;