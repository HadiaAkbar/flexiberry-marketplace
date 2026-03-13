import { Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product, formatPrice, getMonthlyInstallment } from "@/data/products";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const VENDOR_NAMES: Record<string, string> = {
  phones:          "TechZone Official Store",
  laptops:         "DigiWorld Electronics",
  bikes:           "SpeedRiders Pk",
  appliances:      "HomeElite Appliances",
  solar:           "GreenPower Solutions",
  furniture:       "CraftHouse Furniture",
  jahez:           "StyleHub Fashion",
  cars:            "AutoPrime Dealers",
  "raw-materials": "BuildMart Supplies",
  general:         "FlexiBerry Official",
};

const VENDOR_IDS: Record<string, string> = {
  phones:          "vendor-techzone-001",
  laptops:         "vendor-digiworld-002",
  bikes:           "vendor-speedriders-003",
  appliances:      "vendor-homeelite-004",
  solar:           "vendor-greenpower-005",
  furniture:       "vendor-crafthouse-006",
  jahez:           "vendor-stylehub-007",
  cars:            "vendor-autoprime-008",
  "raw-materials": "vendor-buildmart-009",
  general:         "vendor-flexiberry-000",
};

const getCategoryEmoji = (text: string): string => {
  const t = text.toLowerCase();
  if (t.includes("ac") || t.includes("air condition") || t.includes("cooling")) return "❄️";
  if (t.includes("solar") || t.includes("panel") || t.includes("energy"))       return "☀️";
  if (t.includes("laptop") || t.includes("notebook") || t.includes("computer")) return "💻";
  if (t.includes("phone") || t.includes("mobile") || t.includes("smartphone"))  return "📱";
  if (t.includes("tv") || t.includes("television") || t.includes("screen"))     return "📺";
  if (t.includes("fridge") || t.includes("refrigerator"))                        return "🧊";
  if (t.includes("washing") || t.includes("washer"))                             return "🫧";
  if (t.includes("bike") || t.includes("motorcycle"))                            return "🏍️";
  if (t.includes("car") || t.includes("vehicle"))                               return "🚗";
  if (t.includes("camera"))                                                      return "📷";
  if (t.includes("watch"))                                                       return "⌚";
  if (t.includes("headphone") || t.includes("earphone") || t.includes("audio")) return "🎧";
  if (t.includes("microwave") || t.includes("oven"))                             return "🍳";
  if (t.includes("generator") || t.includes("ups"))                             return "⚡";
  return "📦";
};

const PASTEL_BGS = [
  "from-blue-50 to-indigo-100",
  "from-emerald-50 to-teal-100",
  "from-violet-50 to-purple-100",
  "from-amber-50 to-orange-100",
  "from-rose-50 to-pink-100",
  "from-sky-50 to-cyan-100",
];
const getCardBg = (id: string | number): string =>
  PASTEL_BGS[String(id).charCodeAt(0) % PASTEL_BGS.length];

const ImagePlaceholder = ({ product }: { product: Product }) => (
  <div className={`w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br ${getCardBg(product.id)}`}>
    <span className="text-6xl leading-none select-none">
      {getCategoryEmoji(`${product.name} ${product.description}`)}
    </span>
    <span className="text-xs font-semibold text-slate-500 text-center px-4 leading-snug max-w-[140px]">
      {product.name}
    </span>
  </div>
);

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imgFailed, setImgFailed] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const shopName = VENDOR_NAMES[product.categoryId] ?? "FlexiBerry Official";
  const shopId   = VENDOR_IDS[product.categoryId]   ?? "vendor-flexiberry-000";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      shopId,
      shopName,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWished(!wished);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5">

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imgFailed && product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <ImagePlaceholder product={product} />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {discount > 0 && (
              <span className="absolute top-2.5 left-2.5 gradient-coral text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                -{discount}%
              </span>
            )}

            <button
              onClick={handleWishlist}
              className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-card shadow-sm"
            >
              <Heart
                className="h-4 w-4"
                style={{
                  fill: wished ? "#ef4444" : "none",
                  color: wished ? "#ef4444" : "currentColor",
                }}
              />
            </button>
          </div>

          {/* Info */}
          <div className="p-3.5">

            {/* Shop name */}
            <div className="flex items-center gap-1 mb-1.5">
              <Store className="h-3 w-3 text-primary shrink-0" />
              <span className="text-[11px] text-primary font-semibold truncate">{shopName}</span>
            </div>

            <h3 className="font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem] mb-2 leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
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
              <Button
                size="sm"
                onClick={handleAddToCart}
                className={`h-8 text-xs border-none text-primary-foreground shadow-none hover:opacity-90 rounded-lg px-3 transition-all ${
                  added
                    ? "bg-green-500 hover:bg-green-500"
                    : "gradient-coral"
                }`}
              >
                {added ? (
                  <><Check className="h-3 w-3 mr-1" />Added</>
                ) : (
                  <><ShoppingCart className="h-3 w-3 mr-1" />Add</>
                )}
              </Button>
            </div>
          </div>

        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
