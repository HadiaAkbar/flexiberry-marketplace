import { Link } from "react-router-dom";
import { shops } from "@/data/products";
import { Star, ChevronRight, ArrowRight, Store } from "lucide-react";
import { motion } from "framer-motion";

const VendorShowcase = () => {
  return (
    <section className="py-12 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Top Vendors</h2>
            <p className="text-sm text-muted-foreground mt-1">Trusted sellers with verified products</p>
          </div>
          <Link to="/shops" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All Shops <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {shops.map((shop, i) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/shop/${shop.id}`}
                className="group block bg-card rounded-2xl border border-border p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl gradient-coral flex items-center justify-center text-2xl shadow-sm">
                    {shop.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">{shop.name}</h3>
                    <p className="text-xs text-muted-foreground">{shop.category}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{shop.description}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                    <span className="font-semibold text-foreground">{shop.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Store className="h-3.5 w-3.5" />
                    <span>{shop.productCount} Products</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VendorShowcase;
