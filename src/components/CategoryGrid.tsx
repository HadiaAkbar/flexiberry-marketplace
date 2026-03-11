import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CategoryGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-sm text-muted-foreground mt-1">Find what you need across 10+ categories</p>
          </div>
          <Link to="/categories" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center ${cat.themeBg} group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`h-7 w-7 ${cat.themeColor}`} />
                </div>
                <div className="text-center">
                  <span className="text-sm font-semibold text-foreground block">{cat.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{cat.description}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
