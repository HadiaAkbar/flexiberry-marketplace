// import { Search, Bell, Settings, HelpCircle } from "lucide-react";
// import { useLocation } from "react-router-dom";

// const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
//   "/": { title: "Dashboard Overview", breadcrumb: "Mobile World PK / Dashboard" },
//   "/products": { title: "Product Management", breadcrumb: "Mobile World PK / Products" },
//   "/categories": { title: "Shop Categories", breadcrumb: "Mobile World PK / Categories" },
//   "/orders": { title: "Order Management", breadcrumb: "Mobile World PK / Orders" },
//   "/customers": { title: "Customer Management", breadcrumb: "Mobile World PK / Customers" },
//   "/installments": { title: "Installment Plans", breadcrumb: "Mobile World PK / Installments" },
//   "/notifications": { title: "Notifications", breadcrumb: "Mobile World PK / Notifications" },
//   "/shop-profile": { title: "Shop Profile", breadcrumb: "Mobile World PK / Profile" },
//   "/settings": { title: "Settings", breadcrumb: "Mobile World PK / Settings" },
// };

// export function AdminTopbar() {
//   const location = useLocation();
//   const page = pageTitles[location.pathname] || pageTitles["/"];

//   return (
//     <header className="bg-card border-b border-border h-[58px] px-6 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_0_hsl(var(--border))]">
//       <div>
//         <h1 className="text-base font-extrabold text-foreground">{page.title}</h1>
//         <p className="text-[11px] text-text3">{page.breadcrumb}</p>
//       </div>

//       <div className="flex items-center gap-2">
//         <div className="flex items-center gap-[7px] bg-background border border-border rounded-lg px-3 h-[34px] w-[200px]">
//           <Search className="w-3.5 h-3.5 text-text3" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="border-none outline-none bg-transparent text-foreground text-[12.5px] font-sans w-full placeholder:text-text3"
//           />
//         </div>

//         <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-border2 hover:bg-card transition-all relative">
//           <Bell className="w-4 h-4" />
//           <span className="absolute top-[7px] right-[7px] w-[6px] h-[6px] bg-fb-red rounded-full border-[1.5px] border-card" />
//         </button>

//         <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-border2 hover:bg-card transition-all">
//           <HelpCircle className="w-4 h-4" />
//         </button>

//         <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-border2 hover:bg-card transition-all">
//           <Settings className="w-4 h-4" />
//         </button>
//       </div>
//     </header>
//   );
// }
import { Search, Bell, Settings, HelpCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles: Record<string, { title: string; breadcrumb: string }> = {
  "/admin":               { title: "Dashboard Overview",   breadcrumb: "Mobile World PK / Dashboard" },
  "/admin/products":      { title: "Product Management",   breadcrumb: "Mobile World PK / Products" },
  "/admin/categories":    { title: "Shop Categories",      breadcrumb: "Mobile World PK / Categories" },
  "/admin/orders":        { title: "Order Management",     breadcrumb: "Mobile World PK / Orders" },
  "/admin/customers":     { title: "Customer Management",  breadcrumb: "Mobile World PK / Customers" },
  "/admin/installments":  { title: "Installment Plans",    breadcrumb: "Mobile World PK / Installments" },
  "/admin/notifications": { title: "Notifications",        breadcrumb: "Mobile World PK / Notifications" },
  "/admin/shop-profile":  { title: "Shop Profile",         breadcrumb: "Mobile World PK / Profile" },
  "/admin/settings":      { title: "Settings",             breadcrumb: "Mobile World PK / Settings" },
};

export function AdminTopbar() {
  const location = useLocation();
  const page = pageTitles[location.pathname] ?? pageTitles["/admin"];

  return (
    <header className="bg-card border-b border-border h-[58px] px-6 flex items-center justify-between sticky top-0 z-40 shadow-[0_1px_0_hsl(var(--border))]">
      <div>
        <h1 className="text-base font-extrabold text-foreground">{page.title}</h1>
        <p className="text-[11px] text-muted-foreground">{page.breadcrumb}</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-[7px] bg-background border border-border rounded-lg px-3 h-[34px] w-[200px]">
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent text-foreground text-[12.5px] font-sans w-full placeholder:text-muted-foreground"
          />
        </div>

        <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-card transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-[7px] right-[7px] w-[6px] h-[6px] bg-red-500 rounded-full border-[1.5px] border-card" />
        </button>

        <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-card transition-all">
          <HelpCircle className="w-4 h-4" />
        </button>

        <button className="w-[34px] h-[34px] rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-card transition-all">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}