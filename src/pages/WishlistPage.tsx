import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ShoppingCart, Trash2, Star, ArrowLeft, Share2,
  Tag, Clock, TrendingDown, Store, ChevronRight, Package
} from "lucide-react";

// ── Mock wishlist data ──────────────────────────────────────────────────────
const initialWishlist = [
  {
    id: "p1",
    name: "Samsung Galaxy S24 Ultra",
    shop: "TechZone Electronics",
    shopId: "shop-1",
    price: 299999,
    originalPrice: 349999,
    rating: 4.8,
    reviews: 1240,
    image: "📱",
    category: "Smartphones",
    inStock: true,
    installment: 24999,
    discount: 14,
    addedAt: "2 days ago",
  },
  {
    id: "p2",
    name: 'LG OLED C3 65" Smart TV',
    shop: "Home Appliance Hub",
    shopId: "shop-2",
    price: 499999,
    originalPrice: 589999,
    rating: 4.9,
    reviews: 856,
    image: "📺",
    category: "TVs",
    inStock: true,
    installment: 41666,
    discount: 15,
    addedAt: "5 days ago",
  },
  {
    id: "p3",
    name: "MacBook Air M3 16GB",
    shop: "Digital World Store",
    shopId: "shop-3",
    price: 389999,
    originalPrice: 389999,
    rating: 4.7,
    reviews: 432,
    image: "💻",
    category: "Laptops",
    inStock: false,
    installment: 32499,
    discount: 0,
    addedAt: "1 week ago",
  },
  {
    id: "p4",
    name: "Sony WH-1000XM5 Headphones",
    shop: "Audio Vision",
    shopId: "shop-4",
    price: 89999,
    originalPrice: 109999,
    rating: 4.9,
    reviews: 2100,
    image: "🎧",
    category: "Audio",
    inStock: true,
    installment: 7499,
    discount: 18,
    addedAt: "3 days ago",
  },
  {
    id: "p5",
    name: "Dyson V15 Detect Vacuum",
    shop: "Home Appliance Hub",
    shopId: "shop-2",
    price: 149999,
    originalPrice: 179999,
    rating: 4.6,
    reviews: 678,
    image: "🌀",
    category: "Appliances",
    inStock: true,
    installment: 12499,
    discount: 17,
    addedAt: "1 day ago",
  },
  {
    id: "p6",
    name: "iPad Pro M4 12.9\"",
    shop: "TechZone Electronics",
    shopId: "shop-1",
    price: 269999,
    originalPrice: 299999,
    rating: 4.8,
    reviews: 521,
    image: "📱",
    category: "Tablets",
    inStock: true,
    installment: 22499,
    discount: 10,
    addedAt: "4 days ago",
  },
];

const formatPKR = (n: number) =>
  "PKR " + n.toLocaleString("en-PK");

// ── Component ───────────────────────────────────────────────────────────────
const WishlistPage = () => {
  const [items, setItems] = useState(initialWishlist);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const handleAddToCart = (id: string) => {
    setAddedToCart((prev) => [...prev, id]);
    setTimeout(() => setAddedToCart((prev) => prev.filter((i) => i !== id)), 2000);
  };

  const clearAll = () => setItems([]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero header ── */}
      <div className="relative overflow-hidden gradient-primary py-12 px-4">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

        <div className="container mx-auto max-w-6xl relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white fill-white" />
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
                  My Wishlist
                </h1>
              </div>
              <p className="text-white/70 text-sm">
                {items.length} saved item{items.length !== 1 ? "s" : ""} · Easy installment on all
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearAll}
                className="text-white/60 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="h-4 w-4" /> Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-10">

        {/* ── Empty state ── */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Start saving products you love and buy them on easy installments later.
            </p>
            <Link
              to="/products"
              className="gradient-primary text-white font-semibold px-8 py-3 rounded-2xl hover:shadow-primary-lg transition-all hover:-translate-y-0.5"
            >
              Browse Products
            </Link>
          </motion.div>
        )}

        {/* ── Grid ── */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Discount badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-3 left-3 z-10 gradient-coral text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" /> {item.discount}% OFF
                    </div>
                  )}

                  {/* Remove button */}
                  <button
                    onClick={() => remove(item.id)}
                    className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 dark:bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Product image area */}
                  <div className="relative h-44 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10">
                        <span className="bg-destructive text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5" /> Out of Stock
                        </span>
                      </div>
                    )}
                    <span className="text-6xl">{item.image}</span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Shop name */}
                    <Link
                      to={`/store/${item.shopId}`}
                      className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline mb-1.5"
                    >
                      <Store className="h-3 w-3" />
                      {item.shop}
                    </Link>

                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-3 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3 w-3 ${j < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({item.reviews.toLocaleString()})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-foreground">{formatPKR(item.price)}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-muted-foreground line-through">{formatPKR(item.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Tag className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">
                          {formatPKR(item.installment)}/mo · 12-month plan
                        </span>
                      </div>
                    </div>

                    {/* Added date */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                      <Clock className="h-3 w-3" /> Saved {item.addedAt}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(item.id)}
                        disabled={!item.inStock || addedToCart.includes(item.id)}
                        className={`flex-1 flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all
                          ${addedToCart.includes(item.id)
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : item.inStock
                              ? "gradient-primary text-white hover:shadow-primary hover:-translate-y-0.5"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        {addedToCart.includes(item.id) ? "Added!" : item.inStock ? "Add to Cart" : "Unavailable"}
                      </button>
                      <button className="h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 rounded-2xl border border-border bg-card p-6 flex items-center justify-between gap-4 flex-wrap"
          >
            <div>
              <p className="font-semibold text-foreground">Ready to buy?</p>
              <p className="text-sm text-muted-foreground">All items available on 6–12 month installment plans</p>
            </div>
            <Link
              to="/cart"
              className="gradient-primary text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-primary-lg transition-all hover:-translate-y-0.5"
            >
              Go to Cart <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;