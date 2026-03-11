import { Link } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { categories } from "@/data/products";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="gradient-coral">
        <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-primary-foreground text-xs">
          <span>🎉 0% Commission for first 90 days — Sell on FlexiBerry!</span>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/vendor/register" className="hover:underline">Become a Vendor</Link>
            <Link to="/help" className="hover:underline">Help & Support</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
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
                className="pr-12 h-11 rounded-lg bg-secondary border-none focus-visible:ring-primary"
              />
              <Button size="icon" className="absolute right-1 top-1 h-9 w-9 rounded-md gradient-coral border-none">
                <Search className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-foreground">
                <User className="h-4 w-4" />
                <span className="text-sm">Login</span>
              </Button>
            </Link>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="text-foreground relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="text-foreground relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
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
            <div className="flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium gradient-coral text-primary-foreground rounded-none">
                  <Menu className="h-4 w-4" />
                  All Categories
                  <ChevronDown className="h-3 w-3" />
                </button>
                {catOpen && (
                  <div className="absolute top-full left-0 bg-card border border-border rounded-b-lg shadow-lg w-64 z-50">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-sm"
                      >
                        <cat.icon className={`h-4 w-4 ${cat.themeColor}`} />
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              {["Flash Sale", "Installment Deals", "New Arrivals", "Top Brands", "Jahez Packages"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-2.5 text-sm text-muted-foreground hover:text-primary transition-colors"
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
        <div className="md:hidden bg-card border-b border-border shadow-lg">
          <div className="p-4 space-y-2">
            <div className="relative w-full mb-3">
              <Input placeholder="Search..." className="pr-10 bg-secondary border-none" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/category/${cat.slug}`} className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg text-sm">
                <cat.icon className={`h-4 w-4 ${cat.themeColor}`} />
                {cat.name}
              </Link>
            ))}
            <Link to="/login" className="block px-3 py-2 text-sm text-primary font-medium">Login / Register</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
