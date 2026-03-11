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
        <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-square bg-secondary overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {discount > 0 && (
              <span className="absolute top-2 left-2 gradient-coral text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">
                -{discount}%
              </span>
            )}
            <button className="absolute top-2 right-2 h-8 w-8 rounded-full bg-card/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card">
              <Heart className="h-4 w-4 text-coral" />
            </button>
          </div>

          {/* Info */}
          <div className="p-3">
            <p className="text-xs text-muted-foreground mb-1 truncate">{product.description}</p>
            <h3 className="font-medium text-sm text-foreground line-clamp-2 min-h-[2.5rem] mb-2">{product.name}</h3>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <div className="bg-coral/5 rounded-md px-2 py-1.5 mb-2">
              <p className="text-xs text-coral-dark font-medium">
                💳 {getMonthlyInstallment(product.price, 12)}/mo × 12 months
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-amber text-amber" />
                <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
              </div>
              <Button size="sm" className="h-7 text-xs gradient-coral border-none text-primary-foreground shadow-none hover:opacity-90">
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
