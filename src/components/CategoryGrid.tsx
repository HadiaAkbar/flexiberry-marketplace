import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Pastel versions of each carousel accent — same hue, low saturation, high lightness
// icon colour is the deeper shade of the same hue for contrast on the pastel bg
const categoryStyles: Record<string, { bg: string; iconBg: string; iconColor: string; text: string }> = {
  phones: {
    bg:        "#FFE4E4",   // pastel coral-red
    iconBg:    "#FFBDBD",
    iconColor: "#C0392B",
    text:      "#7A1F1F",
  },
  laptops: {
    bg:        "#EDE8FF",   // pastel violet
    iconBg:    "#D4C9FF",
    iconColor: "#6D28D9",
    text:      "#3B1D8A",
  },
  bikes: {
    bg:        "#FFE9D5",   // pastel orange
    iconBg:    "#FFD0A8",
    iconColor: "#C05621",
    text:      "#7A3210",
  },
  appliances: {
    bg:        "#FFE4E4",   // pastel rose-red
    iconBg:    "#FFBDBD",
    iconColor: "#B91C1C",
    text:      "#7A1F1F",
  },
  solar: {
    bg:        "#FFF8D6",   // pastel golden amber
    iconBg:    "#FDEEA0",
    iconColor: "#B45309",
    text:      "#7A3D00",
  },
  furniture: {
    bg:        "#D6F5EC",   // pastel emerald
    iconBg:    "#A7EDD8",
    iconColor: "#065F46",
    text:      "#064E3B",
  },
  jahez: {
    bg:        "#FFE4F3",   // pastel pink
    iconBg:    "#FFBFDF",
    iconColor: "#BE185D",
    text:      "#831843",
  },
  cars: {
    bg:        "#DBF3FF",   // pastel sky blue
    iconBg:    "#B0E4FF",
    iconColor: "#0369A1",
    text:      "#0C3F6A",
  },
  "raw-materials": {
    bg:        "#ECFFD4",   // pastel lime
    iconBg:    "#D4F9A0",
    iconColor: "#3F6212",
    text:      "#2D4A0A",
  },
  general: {
    bg:        "#FFE9D5",   // pastel peach
    iconBg:    "#FFD0A8",
    iconColor: "#C05621",
    text:      "#7A3210",
  },
};

const CategoryGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Shop by Category
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Find what you need across 10+ categories
            </p>
          </div>
          {/* <Link
            to="/categories"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const style = categoryStyles[cat.id] ?? {
              bg: "#F3F4F6",
              iconBg: "#E5E7EB",
              iconColor: "#374151",
              text: "#111827",
            };

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
                  style={{ backgroundColor: style.bg }}
                >
                  {/* Icon container */}
                  <div
                    className="h-14 w-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: style.iconBg }}
                  >
                    <cat.icon
                      className="h-7 w-7"
                      style={{ color: style.iconColor }}
                    />
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <span
                      className="text-sm font-semibold block"
                      style={{ color: style.text }}
                    >
                      {cat.name}
                    </span>
                    <span
                      className="text-xs line-clamp-1 mt-0.5"
                      style={{ color: style.iconColor, opacity: 0.75 }}
                    >
                      {cat.description}
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
