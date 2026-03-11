import { Link } from "react-router-dom";
import { shops } from "@/data/products";
import { Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const VendorShowcase = () => {
  return (
    <section className="py-10 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Top Vendors</h2>
          <Link to="/shops" className="text-sm text-primary hover:underline">View All Shops →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {shops.map((shop, i) => (
            <motion.div
              key={shop.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <Link
                to={`/shop/${shop.id}`}
                className="group block bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="h-14 w-14 rounded-xl gradient-coral flex items-center justify-center text-2xl">
                    {shop.logo}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{shop.name}</h3>
                    <p className="text-xs text-muted-foreground">{shop.category}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{shop.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber text-amber" />
                    <span>{shop.rating}</span>
                  </div>
                  <span>{shop.productCount} Products</span>
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
