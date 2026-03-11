import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/data/products";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const products = category
    ? featuredProducts.filter((p) => p.categoryId === category.id)
    : featuredProducts;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{category?.name || "All Products"}</span>
        </div>

        <div className="flex items-center gap-4 mb-6">
          {category && (
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${category.themeBg}`}>
              <category.icon className={`h-6 w-6 ${category.themeColor}`} />
            </div>
          )}
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">{category?.name || "All Products"}</h1>
            <p className="text-sm text-muted-foreground">{products.length} products found</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No products found in this category yet.</p>
            <Link to="/" className="text-primary hover:underline mt-2 inline-block">Browse all products</Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
