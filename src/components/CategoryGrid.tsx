import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";

const CategoryGrid = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link to="/categories" className="text-sm text-primary hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <Link
                to={`/category/${cat.slug}`}
                className={`group flex flex-col items-center gap-2 p-4 rounded-xl ${cat.themeBg} border border-transparent hover:border-border hover:shadow-md transition-all duration-300`}
              >
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-card shadow-sm group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`h-6 w-6 ${cat.themeColor}`} />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{cat.name}</span>
                <span className="text-xs text-muted-foreground text-center line-clamp-1">{cat.description}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
