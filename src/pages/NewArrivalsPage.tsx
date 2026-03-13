import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Store, Shield, TrendingUp, ChevronRight,
  Eye, EyeOff, ArrowLeft, DollarSign, BarChart3,
  CheckCircle2, Mail, Lock,
} from "lucide-react";

/* ── Inline SVG Logo ───────────────────────────────────────────────── */
const FlexiBerryLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vl-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="vl-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#vl-bg)"/>
    <rect width="100" height="100" rx="28" fill="url(#vl-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#vl-bg)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#vl-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#vl-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#vl-bg)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#vl-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#vl-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#vl-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#vl-bg)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      <circle cx="43" cy="91" r="2.5" fill="white" opacity="0.7"/>
      <circle cx="52" cy="91" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="61" cy="91" r="2.5" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="28" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.1"/>
  </svg>
);

const PERKS = [
  { icon: DollarSign, title: "Earn More",       desc: "Reach thousands of buyers across Pakistan" },
  { icon: TrendingUp, title: "Grow Faster",     desc: "Smart analytics and installment-driven sales" },
  { icon: Shield,     title: "Secure Payments", desc: "KYC-verified payouts, zero fraud risk" },
  { icon: BarChart3,  title: "Live Dashboard",  desc: "Track orders, revenue & applications live" },
];

const STATS = [
  { val: "10K+",    label: "Active Buyers" },
  { val: "500+",    label: "Verified Vendors" },
  { val: "PKR 2B+", label: "GMV Processed" },
];

const VendorLoginPage = () => {
  const [showPass,   setShowPass]   = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass,  setLoginPass]  = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-stretch">
        <div className="container mx-auto max-w-6xl px-4 py-10 flex gap-8 items-start">

          {/* ── LEFT PANEL ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col w-[420px] shrink-0"
          >
            <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 mb-5 text-white">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl pointer-events-none" />
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <FlexiBerryLogo size={52} />
                  <div>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-widest">FlexiBerry</p>
                    <h2 className="font-display text-xl font-black">Vendor Portal</h2>
                  </div>
                </div>
                <h3 className="font-display text-3xl font-black leading-tight mb-3">
                  Sell Smarter.<br />Grow Faster.
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-6">
                  Join Pakistan's fastest-growing installment marketplace and reach buyers ready to purchase on easy monthly plans.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {STATS.map(({ val, label }) => (
                    <div key={label} className="bg-white/15 backdrop-blur rounded-2xl p-3 text-center border border-white/20">
                      <p className="font-black text-lg leading-tight">{val}</p>
                      <p className="text-white/65 text-[10px] mt-0.5 leading-snug">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {PERKS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3.5 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="h-9 w-9 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                    <Icon className="h-[18px] w-[18px] text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-muted-foreground text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              <span>Trusted by <strong className="text-foreground">500+ verified vendors</strong> across Pakistan</span>
            </div>
          </motion.div>

          {/* ── RIGHT: LOGIN FORM ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="flex-1"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link to="/login" className="hover:text-foreground transition-colors">Login</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">Vendor Portal</span>
            </div>

            <div className="bg-card border border-border rounded-3xl shadow-sm p-8">

              {/* Heading */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-11 w-11 rounded-xl gradient-primary flex items-center justify-center">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground">Vendor Login</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">Sign in to your vendor dashboard</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Email */}
                <div>
                  <Label htmlFor="v-email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="v-email"
                      type="email"
                      placeholder="store@example.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label htmlFor="v-pass" className="text-sm font-medium">Password</Label>
                    <Link to="#" className="text-xs text-primary hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="v-pass"
                      type={showPass ? "text" : "password"}
                      placeholder="••••••••"
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  className="w-full gradient-primary border-none text-white font-semibold py-5 text-sm hover:opacity-90 transition-opacity"
                  onClick={() => navigate("/vendor")}
                >
                  Sign In to Vendor Dashboard
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">don't have an account?</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Register hint */}
              <div className="bg-muted/40 rounded-2xl p-5 text-center">
                <p className="text-sm font-semibold text-foreground mb-1">New to FlexiBerry Vendor?</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Register your shop using the <strong>"Sell as Vendor"</strong> button in the top navigation bar.
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  Free to join · KYC verified · Instant dashboard access
                </div>
              </div>

              {/* Security note */}
              <div className="mt-5 flex items-center gap-2 bg-muted/50 rounded-xl px-4 py-3">
                <Shield className="h-4 w-4 text-green-600 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Your account is protected with KYC verification and end-to-end encryption.
                </p>
              </div>
            </div>

            {/* Back link */}
            <div className="mt-5 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Customer Login
              </Link>
            </div>
          </motion.div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VendorLoginPage;
