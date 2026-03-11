import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product, formatPrice, getMonthlyInstallment } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">
          {/* Image */}
          <div className="relative aspect-square bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            {discount > 0 && (
              <span className="absolute top-2.5 left-2.5 gradient-coral text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                -{discount}%
              </span>
            )}
            <button className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card shadow-sm">
              <Heart className="h-4 w-4 text-primary" />
            </button>
          </div>

          {/* Info */}
          <div className="p-3.5">
            <p className="text-[11px] text-muted-foreground mb-1 truncate uppercase tracking-wide">{product.description}</p>
            <h3 className="font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem] mb-2 leading-snug">{product.name}</h3>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="bg-accent/10 rounded-lg px-2.5 py-2 mb-3 border border-accent/20">
              <p className="text-xs text-accent font-semibold">
                💳 {getMonthlyInstallment(product.price, 12)}/mo × 12
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber text-amber" />
                <span className="text-xs font-medium text-foreground">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <Button size="sm" className="h-8 text-xs gradient-coral border-none text-primary-foreground shadow-none hover:opacity-90 rounded-lg px-3">
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
