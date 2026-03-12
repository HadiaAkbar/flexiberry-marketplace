import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

/* ── Inline SVG: FlexiBerry Tagged-Cart Logo ── */
const FlexiBerryLogo = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="lg-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#lg-bg)"/>
    <rect width="100" height="100" rx="28" fill="url(#lg-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      {/* FB initials inside cart */}
      <circle cx="32" cy="39" r="4.5" fill="url(#lg-bg)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#lg-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#lg-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#lg-bg)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#lg-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#lg-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#lg-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      {/* Wheels */}
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#lg-bg)"/>
      <circle cx="35" cy="86" r="1.5" fill="white"/>
      <circle cx="70" cy="86" r="7.5" fill="#10b981"/>
      <circle cx="70" cy="86" r="3.8" fill="white"/>
      <circle cx="70" cy="86" r="1.5" fill="#10b981"/>
      {/* Installment dots */}
      <circle cx="43" cy="91" r="2.5" fill="white" opacity="0.7"/>
      <circle cx="52" cy="91" r="2.5" fill="white" opacity="0.4"/>
      <circle cx="61" cy="91" r="2.5" fill="white" opacity="0.18"/>
    </g>
    <rect width="100" height="100" rx="28" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.1"/>
  </svg>
);

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FlexiBerryLogo size={64} />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome to FlexiBerry</h1>
            <p className="text-muted-foreground text-sm mt-1">Login or create your account</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-6">
            <Tabs defaultValue="login">
              <TabsList className="w-full bg-secondary mb-6">
                <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Login</TabsTrigger>
                <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" className="mt-1" />
                </div>
                <Button className="w-full gradient-coral border-none text-primary-foreground hover:opacity-90">Login</Button>
                <p className="text-center text-xs text-muted-foreground">
                  <Link to="#" className="text-primary hover:underline">Forgot password?</Link>
                </p>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Muhammad Ali" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" placeholder="your@email.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+92 3XX XXXXXXX" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" type="password" placeholder="••••••••" className="mt-1" />
                </div>
                <Button className="w-full gradient-coral border-none text-primary-foreground hover:opacity-90">Create Account</Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-3">Want to sell on FlexiBerry?</p>
              <Link to="/vendor/login">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Register as Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
