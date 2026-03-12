const brands = [
  "Samsung", "Apple", "Haier", "Honda", "Toyota",
  "LG", "Sony", "Dawlance", "Yamaha", "Lenovo",
  "HP", "Dell", "Orient", "Gree", "Inverex",
];

const BrandShowcase = () => {
  return (
    <section className="py-10 border-t border-b border-border bg-card">
      <div className="container mx-auto px-4 mb-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">
          Top Brands
        </h2>
        <p className="text-sm text-muted-foreground mt-1 text-center">Shop from Pakistan's most trusted brands</p>
      </div>
      <div className="overflow-hidden">
        <div className="flex animate-brand-scroll whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="mx-6 flex-shrink-0 h-16 w-36 rounded-xl bg-secondary flex items-center justify-center border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
            >
              <span className="font-display font-bold text-sm text-muted-foreground">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
