import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { categories } from "@/data/products";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const marqueeItems = [
  "🔥 0% Commission for first 90 days!",
  "📱 iPhone 15 Pro — Starting PKR 45,833/mo",
  "🏍️ Honda CD 70 on Easy Installments",
  "🎉 Jahez Packages — Bundle & Save 50%",
  "☀️ Solar Systems — Go Green Today",
  "🚚 Free Nationwide Delivery",
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Marquee top bar */}
      <div className="gradient-coral overflow-hidden">
        <div className="py-2">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="text-primary-foreground text-xs font-medium mx-8">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card/95 backdrop-blur-xl shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logoImg} alt="FlexiBerry" className="h-10 w-10 object-contain" />
            <span className="font-display font-bold text-xl hidden sm:block">
              <span className="text-gradient-coral">Flexi</span>
              <span className="text-foreground">Berry</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="relative w-full">
              <Input
                placeholder="Search products, brands and categories..."
                className="pr-12 h-11 rounded-xl bg-secondary border-none focus-visible:ring-primary text-sm"
              />
              <Button size="icon" className="absolute right-1 top-1 h-9 w-9 rounded-lg gradient-coral border-none shadow-sm">
                <Search className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-foreground hover:text-primary">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-primary relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-0.5 -right-0.5 gradient-coral text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">0</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Category nav */}
        <div className="hidden md:block border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-0.5">
              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold gradient-coral text-primary-foreground rounded-none">
                  <Menu className="h-4 w-4" />
                  All Categories
                  <ChevronDown className="h-3 w-3" />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 bg-card border border-border rounded-b-xl shadow-xl w-64 z-50 overflow-hidden">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm group"
                      >
                        <cat.icon className={`h-4 w-4 ${cat.themeColor} group-hover:scale-110 transition-transform`} />
                        <span className="font-medium">{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {["Flash Sale", "Installment Deals", "New Arrivals", "Top Brands", "Jahez Packages"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3.5 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card border-b border-border shadow-xl">
          <div className="p-4 space-y-1">
            <div className="relative w-full mb-3">
              <Input placeholder="Search..." className="pr-10 bg-secondary border-none rounded-xl" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="flex items-center gap-3 px-3 py-2.5 hover:bg-secondary rounded-xl text-sm font-medium">
                <cat.icon className={`h-4 w-4 ${cat.themeColor}`} />
                {cat.name}
              </Link>
            ))}
            <Link to="/login" className="block px-3 py-2.5 text-sm text-primary font-semibold">Login / Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
