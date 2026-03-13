import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopbar } from "./AdminTopbar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="ml-[252px] flex-1 flex flex-col min-h-screen transition-all">
        <AdminTopbar />
        <main className="flex-1 p-[22px_24px] animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}