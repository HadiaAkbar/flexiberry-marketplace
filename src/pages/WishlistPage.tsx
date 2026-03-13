import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, ShoppingCart, Trash2, Star, Share2,
  Tag, Clock, TrendingDown, Store, ChevronRight, Package,
  ShoppingBag
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ── Mock wishlist data ────────────────────────────────────────────────────────
const initialWishlist = [
  {
    id: "p1",
    name: "Samsung Galaxy S24 Ultra 256GB",
    shop: "TechZone Electronics",
    shopId: "techzone",
    price: 299999,
    originalPrice: 349999,
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
    inStock: true,
    installment: 24999,
    discount: 14,
    addedAt: "2 days ago",
  },
  {
    id: "p2",
    name: 'LG OLED C3 65" Smart TV',
    shop: "Home Appliance Hub",
    shopId: "homeappliance",
    price: 499999,
    originalPrice: 589999,
    rating: 4.9,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80",
    inStock: true,
    installment: 41666,
    discount: 15,
    addedAt: "5 days ago",
  },
  {
    id: "p3",
    name: "MacBook Air M3 16GB",
    shop: "Digital World Store",
    shopId: "digitalworld",
    price: 389999,
    originalPrice: 389999,
    rating: 4.7,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    inStock: false,
    installment: 32499,
    discount: 0,
    addedAt: "1 week ago",
  },
  {
    id: "p4",
    name: "Sony WH-1000XM5 Headphones",
    shop: "Audio Vision",
    shopId: "audiovision",
    price: 89999,
    originalPrice: 109999,
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    inStock: true,
    installment: 7499,
    discount: 18,
    addedAt: "3 days ago",
  },
  {
    id: "p5",
    name: "Dyson V15 Detect Vacuum",
    shop: "Home Appliance Hub",
    shopId: "homeappliance",
    price: 149999,
    originalPrice: 179999,
    rating: 4.6,
    reviews: 678,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    inStock: true,
    installment: 12499,
    discount: 17,
    addedAt: "1 day ago",
  },
  {
    id: "p6",
    name: 'iPad Pro M4 12.9"',
    shop: "TechZone Electronics",
    shopId: "techzone",
    price: 269999,
    originalPrice: 299999,
    rating: 4.8,
    reviews: 521,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    inStock: true,
    installment: 22499,
    discount: 10,
    addedAt: "4 days ago",
  },
];

const formatPKR = (n: number) => "PKR " + n.toLocaleString("en-PK");

// ─────────────────────────────────────────────────────────────────────────────
const WishlistPage = () => {
  const [items,      setItems]      = useState(initialWishlist);
  const [addedToCart, setAddedToCart] = useState<string[]>([]);

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const handleAddToCart = (id: string) => {
    setAddedToCart((prev) => [...prev, id]);
    setTimeout(() => setAddedToCart((prev) => prev.filter((i) => i !== id)), 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* ── Page hero — matches site header gradient style ── */}
      <div className="relative overflow-hidden gradient-primary">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, white 0%, transparent 70%)", transform: "translate(-50%, 40%)" }} />

        <div className="container mx-auto max-w-7xl px-4 py-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-white/60 text-sm mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white font-medium">Wishlist</span>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center">
                <Heart className="h-5.5 w-5.5 text-white fill-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">
                  My Wishlist
                </h1>
                <p className="text-white/60 text-sm mt-0.5">
                  {items.length} saved item{items.length !== 1 ? "s" : ""} · Easy installment on all
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/cart"
                className="flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all"
              >
                <ShoppingCart className="h-4 w-4" /> Go to Cart
              </Link>
              {items.length > 0 && (
                <button
                  onClick={() => setItems([])}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
                >
                  <Trash2 className="h-4 w-4" /> Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 container mx-auto max-w-7xl px-4 py-8">

        {/* Empty state */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-5">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm text-sm">
              Save products you love and buy them on easy installments later.
            </p>
            <Link
              to="/products"
              className="gradient-primary text-white font-semibold px-8 py-3 rounded-2xl hover:shadow-primary-lg transition-all hover:-translate-y-0.5"
            >
              Browse Products
            </Link>
          </motion.div>
        )}

        {/* Product grid */}
        {items.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <AnimatePresence>
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                    className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 flex flex-col"
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
                      className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/90 dark:bg-card border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Product image */}
                    <div className="relative h-48 overflow-hidden bg-muted">
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-background/65 backdrop-blur-[2px] flex items-center justify-center z-10">
                          <span className="bg-destructive text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Package className="h-3.5 w-3.5" /> Out of Stock
                          </span>
                        </div>
                      )}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          (e.target as HTMLImageElement).parentElement!.classList.add("flex","items-center","justify-center");
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      {/* Shop */}
                      <Link
                        to={`/store/${item.shopId}`}
                        className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline mb-1.5"
                      >
                        <Store className="h-3 w-3" /> {item.shop}
                      </Link>

                      {/* Name */}
                      <h3 className="font-semibold text-foreground text-sm leading-snug mb-2.5 line-clamp-2 flex-1">
                        {item.name}
                      </h3>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mb-2.5">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`h-3 w-3 ${j < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({item.reviews.toLocaleString()})</span>
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-foreground">{formatPKR(item.price)}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-xs text-muted-foreground line-through">{formatPKR(item.originalPrice)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-green-600 font-medium">
                          <Tag className="h-3 w-3" />
                          {formatPKR(item.installment)}/mo · 12-month plan
                        </div>
                      </div>

                      {/* Added date */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <Clock className="h-3 w-3" /> Saved {item.addedAt}
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-2 mt-auto">
                        <button
                          onClick={() => handleAddToCart(item.id)}
                          disabled={!item.inStock || addedToCart.includes(item.id)}
                          className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl transition-all
                            ${addedToCart.includes(item.id)
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : item.inStock
                                ? "gradient-primary text-white hover:shadow-primary hover:-translate-y-0.5"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                        >
                          <ShoppingCart className="h-3.5 w-3.5" />
                          {addedToCart.includes(item.id) ? "Added!" : item.inStock ? "Add to Cart" : "Unavailable"}
                        </button>
                        <button className="h-9 w-9 flex-shrink-0 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                          <Share2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 rounded-2xl bg-card border border-border p-6 flex items-center justify-between gap-4 flex-wrap"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Ready to buy?</p>
                  <p className="text-sm text-muted-foreground">All items available on 6–12 month installment plans</p>
                </div>
              </div>
              <Link
                to="/cart"
                className="gradient-primary text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:shadow-primary-lg transition-all hover:-translate-y-0.5"
              >
                Proceed to Cart <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WishlistPage;
