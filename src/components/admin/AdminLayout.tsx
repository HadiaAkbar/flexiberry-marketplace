import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";
import { useIsMobile } from "@/hooks/use-mobile";

export function AdminLayout() {
  const isMobile = useIsMobile();

  return (
    <div className="admin-theme flex min-h-screen bg-background">
      <AdminSidebar />
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-200 ${
        isMobile ? "ml-0" : "ml-[252px]"
      }`}>
        <AdminTopbar />
        <main className={`flex-1 p-4 lg:p-6 animate-fade-in ${isMobile ? "pt-16" : ""}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
