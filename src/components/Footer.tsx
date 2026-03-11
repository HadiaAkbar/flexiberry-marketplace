import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <img src={logoImg} alt="FlexiBerry" className="h-9 w-9" />
              <span className="font-display font-bold text-lg">FlexiBerry</span>
            </div>
            <p className="text-sm opacity-75 mb-5 leading-relaxed">Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.</p>
            <div className="flex gap-2.5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:shadow-coral transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Quick Links</h4>
            <div className="space-y-2.5 text-sm opacity-75">
              {["About Us", "Contact", "Careers", "Blog", "Vendor Registration"].map((link) => (
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all hover:translate-x-1 duration-200">{link}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Customer Care</h4>
            <div className="space-y-2.5 text-sm opacity-75">
              {["Help Center", "How to Buy on Installments", "Returns Policy", "KYC Guide", "Payment Methods"].map((link) => (
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all hover:translate-x-1 duration-200">{link}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Contact Us</h4>
            <div className="space-y-3.5 text-sm opacity-75">
              <div className="flex items-center gap-2.5"><Mail className="h-4 w-4 shrink-0 text-coral-light" /> support@flexiberry.com</div>
              <div className="flex items-center gap-2.5"><Phone className="h-4 w-4 shrink-0 text-coral-light" /> +92 300 1234567</div>
              <div className="flex items-start gap-2.5"><MapPin className="h-4 w-4 shrink-0 mt-0.5 text-coral-light" /> Lahore, Punjab, Pakistan</div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm opacity-50">
          <p>© 2026 FlexiBerry. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="#" className="hover:opacity-100">Privacy Policy</Link>
            <Link to="#" className="hover:opacity-100">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
