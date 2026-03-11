import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Flame, TrendingUp, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturedProducts = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="trending" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-foreground">Featured Products</h2>
            <TabsList className="bg-secondary">
              <TabsTrigger value="trending" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="h-3 w-3 mr-1" /> Trending
              </TabsTrigger>
              <TabsTrigger value="deals" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Flame className="h-3 w-3 mr-1" /> Deals
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Clock className="h-3 w-3 mr-1" /> New
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="deals">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.filter(p => p.originalPrice).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 5).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
