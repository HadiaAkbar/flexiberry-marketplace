import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import logoImg from "@/assets/flexiberry-logo-clean.png";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <img src={logoImg} alt="FlexiBerry" className="h-16 w-16 mx-auto mb-4" />
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
              <Link to="/vendor/register">
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
