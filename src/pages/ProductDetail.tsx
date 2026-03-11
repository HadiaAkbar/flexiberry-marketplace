import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories, formatPrice, getMonthlyInstallment } from "@/data/products";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, CreditCard, Shield, Truck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetail = () => {
  const { id } = useParams();
  const product = featuredProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Link to="/" className="text-primary hover:underline mt-4 inline-block">Go back home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const relatedProducts = featuredProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          {category && <Link to={`/category/${category.slug}`} className="hover:text-primary">{category.name}</Link>}
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-secondary rounded-2xl overflow-hidden aspect-square">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber text-amber" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              <span className="text-sm text-accent">In Stock</span>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="gradient-coral text-primary-foreground text-xs font-bold px-2 py-1 rounded-md">-{discount}%</span>
                </>
              )}
            </div>

            {/* Installment options */}
            <div className="bg-coral/5 border border-coral/20 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-5 w-5 text-coral" />
                <h3 className="font-semibold text-foreground">Installment Plans</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {product.installmentOptions.map((months) => (
                  <div key={months} className="bg-card rounded-lg p-3 text-center border border-border">
                    <p className="text-xs text-muted-foreground">{months} Months</p>
                    <p className="text-lg font-bold text-primary">{getMonthlyInstallment(product.price, months)}</p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <Button size="lg" className="flex-1 gradient-coral border-none text-primary-foreground shadow-coral hover:opacity-90 font-semibold">
                <CreditCard className="mr-2 h-5 w-5" />
                Buy on Installment
              </Button>
              <Button size="lg" variant="outline" className="border-border">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-border">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-3 text-sm">
              {[
                { icon: Shield, text: "KYC Verified Purchase — 100% Secure" },
                { icon: Truck, text: "Free Nationwide Delivery" },
                { icon: CreditCard, text: "0% Interest on Selected Plans" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-4 w-4 text-accent" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
