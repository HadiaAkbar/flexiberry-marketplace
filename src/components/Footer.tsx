import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const FlexiBerryLogo = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="f-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="f-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
      <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2563eb" floodOpacity="0.4"/>
      </filter>
    </defs>

    <g filter="url(#f-shadow)">
      <rect width="100" height="100" rx="28" fill="url(#f-bg)"/>
      <rect width="100" height="100" rx="28" fill="url(#f-sh)"/>
    </g>

    <g transform="rotate(-14, 50, 52)">
      {/* Cart handle */}
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* Tag-shaped basket */}
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>

      {/* Tag punch hole */}
      <circle cx="32" cy="39" r="4.5" fill="url(#f-bg)"/>

      {/* F */}
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#f-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#f-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#f-bg)"/>

      {/* B */}
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#f-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#f-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#f-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>

      {/* Wheels */}
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#f-bg)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>

      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>

      {/* Installment dots */}
      <circle cx="43" cy="91" r="2.5" fill="white" opacity="0.7"/>
      <circle cx="52" cy="91" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="61" cy="91" r="2.5" fill="white" opacity="0.18"/>
    </g>

    {/* Border overlay */}
    <rect width="100" height="100" rx="28" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.1"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="gradient-navy text-primary-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <FlexiBerryLogo size={36} />
              <span className="font-display font-bold text-lg">FlexiBerry</span>
            </div>
            <p className="text-sm opacity-75 mb-5 leading-relaxed">
              Where Smart Shopping Meets Flexible Payments. Buy anything on easy installments across Pakistan.
            </p>
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
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all hover:translate-x-1 duration-200">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Customer Care</h4>
            <div className="space-y-2.5 text-sm opacity-75">
              {["Help Center", "How to Buy on Installments", "Returns Policy", "KYC Guide", "Payment Methods"].map((link) => (
                <Link key={link} to="#" className="block hover:opacity-100 hover:text-coral-light transition-all hover:translate-x-1 duration-200">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-5 text-base">Contact Us</h4>
            <div className="space-y-3.5 text-sm opacity-75">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-coral-light" /> support@flexiberry.com
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-coral-light" /> +92 300 1234567
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-coral-light" /> Lahore, Punjab, Pakistan
              </div>
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
