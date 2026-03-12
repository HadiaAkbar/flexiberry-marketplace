import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";
import { Flame, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturedProducts = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="featured" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-secondary">
              <TabsTrigger value="featured" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Flame className="h-3 w-3 mr-1" /> Featured Products
              </TabsTrigger>
              <TabsTrigger value="trending" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="h-3 w-3 mr-1" /> Trending
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Clock className="h-3 w-3 mr-1" /> New
              </TabsTrigger>
            </TabsList>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <TabsContent value="featured">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(0, 5).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.filter(p => p.originalPrice).slice(0, 5).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredProducts.slice(5, 10).map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default FeaturedProducts;
