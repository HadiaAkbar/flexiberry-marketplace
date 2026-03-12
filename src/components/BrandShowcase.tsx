import samsungLogo from "@/assets/brands/samsung.png";
import appleLogo from "@/assets/brands/apple.png";
import haierLogo from "@/assets/brands/haier.png";
import hondaLogo from "@/assets/brands/honda.png";
import toyotaLogo from "@/assets/brands/toyota.png";
import lgLogo from "@/assets/brands/lg.png";
import sonyLogo from "@/assets/brands/sony.png";
import dawlanceLogo from "@/assets/brands/dawlance.png";
import yamahaLogo from "@/assets/brands/yamaha.png";
import dellLogo from "@/assets/brands/dell.png";

const brands = [
  { name: "Samsung", logo: samsungLogo },
  { name: "Apple", logo: appleLogo },
  { name: "Haier", logo: haierLogo },
  { name: "Honda", logo: hondaLogo },
  { name: "Toyota", logo: toyotaLogo },
  { name: "LG", logo: lgLogo },
  { name: "Sony", logo: sonyLogo },
  { name: "Dawlance", logo: dawlanceLogo },
  { name: "Yamaha", logo: yamahaLogo },
  { name: "Dell", logo: dellLogo },
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
              className="mx-6 flex-shrink-0 h-20 w-40 rounded-xl bg-secondary flex items-center justify-center border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer p-3"
            >
              <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
