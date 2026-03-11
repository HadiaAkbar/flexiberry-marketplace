import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, Store, Users, FileText, BarChart3, Settings, Shield, LogOut } from "lucide-react";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const adminLinks = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Vendors", url: "/admin/vendors", icon: Store },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Applications", url: "/admin/applications", icon: FileText },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Security", url: "/admin/security", icon: Shield },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2">
          <img src={logoImg} alt="FlexiBerry" className="h-8 w-8" />
          {!collapsed && <span className="font-display font-bold text-coral">Super Admin</span>}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-primary/10 text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-border px-4 bg-card">
            <SidebarTrigger className="mr-4" />
            <h1 className="font-display font-semibold text-foreground">FlexiBerry Admin</h1>
            <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-coral" />
              <span>Super Admin</span>
              <LogOut className="h-4 w-4 cursor-pointer hover:text-primary ml-2" />
            </div>
          </header>
          <main className="flex-1 p-6 bg-secondary/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
