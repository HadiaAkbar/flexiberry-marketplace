import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoImg} alt="FlexiBerry" className="h-8 w-8" />
              <span className="font-display font-bold text-lg">FlexiBerry</span>
            </div>
            <p className="text-sm opacity-80 mb-4">Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments.</p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm opacity-80">
              {["About Us", "Contact", "Careers", "Blog", "Vendor Registration"].map((link) => (
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all">{link}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Customer Care</h4>
            <div className="space-y-2 text-sm opacity-80">
              {["Help Center", "How to Buy on Installments", "Returns Policy", "KYC Guide", "Payment Methods"].map((link) => (
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all">{link}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> support@flexiberry.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +92 300 1234567</div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 shrink-0 mt-0.5" /> Lahore, Punjab, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-sm opacity-60">
          <p>© 2026 FlexiBerry. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
