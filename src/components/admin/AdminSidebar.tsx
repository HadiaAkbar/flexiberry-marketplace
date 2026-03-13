import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  CreditCard,
  Bell,
  Store,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navSections = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    ],
  },
  {
    label: "Catalog",
    items: [
      { title: "Products", icon: Package, path: "/admin/products" },
      { title: "Categories", icon: FolderOpen, path: "/admin/categories" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { title: "Orders", icon: ShoppingCart, path: "/admin/orders", badge: "4" },
      { title: "Customers", icon: Users, path: "/admin/customers" },
      { title: "Installment Plans", icon: CreditCard, path: "/admin/installments" },
    ],
  },
  {
    label: "Communication",
    items: [
      { title: "Notifications", icon: Bell, path: "/admin/notifications", badge: "3", badgeGreen: false },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "Shop Profile", icon: Store, path: "/admin/shop-profile" },
      { title: "Settings", icon: Settings, path: "/admin/settings" },
    ],
  },
];

export function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-sidebar flex flex-col z-50 transition-all duration-200 ${
        collapsed ? "w-[68px]" : "w-[252px]"
      }`}
    >
      {/* Logo */}
      <div className="px-[18px] py-5 border-b border-sidebar-border/10 flex items-center gap-[11px]">
        <div className="w-[34px] h-[34px] bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-primary-foreground font-mono font-black text-base shrink-0">
          F
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-extrabold text-sidebar-foreground">FlexiBerry</div>
            <div className="text-[10px] font-semibold text-primary uppercase tracking-[1px] mt-[1px]">
              Shop Admin
            </div>
          </div>
        )}
      </div>

      {/* Shop Badge */}
      {!collapsed && (
        <div className="mx-[14px] mt-[14px] bg-sidebar-foreground/5 border border-sidebar-foreground/10 rounded-[10px] p-3 flex items-center gap-[10px]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fb-blue to-fb-purple flex items-center justify-center text-sm font-bold text-sidebar-foreground shrink-0">
            M
          </div>
          <div>
            <div className="text-xs font-bold text-sidebar-foreground">Mobile World PK</div>
            <div className="text-[10px] text-sidebar-foreground/40">Electronics · Lahore</div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-[10px] scrollbar-none">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div className="px-4 pt-[14px] pb-[5px] text-[10px] font-bold text-sidebar-foreground/25 uppercase tracking-[1.5px]">
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-[9px] py-[9px] px-[14px] mx-2 rounded-lg transition-all text-[13px] font-medium ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground/50 hover:bg-sidebar-foreground/5 hover:text-sidebar-foreground/85"
                  }`}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                  {item.badge && !collapsed && (
                    <span className="ml-auto bg-fb-red text-primary-foreground text-[10px] font-bold px-[6px] py-[2px] rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-1 p-2 rounded-lg text-sidebar-foreground/40 hover:text-sidebar-foreground/70 hover:bg-sidebar-foreground/5 transition-all flex items-center justify-center"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Footer */}
      <div className="p-[14px] border-t border-sidebar-foreground/[0.07]">
        <div className="flex items-center gap-[9px] px-3 py-[10px] rounded-[9px] bg-sidebar-foreground/5 cursor-pointer hover:bg-sidebar-foreground/[0.08]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[#06b6d4] flex items-center justify-center text-[13px] font-bold text-primary-foreground shrink-0">
            AK
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-sidebar-foreground truncate">Ali Khan</div>
              <div className="text-[10px] text-sidebar-foreground/35 truncate">ali@mobileworldpk.com</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}