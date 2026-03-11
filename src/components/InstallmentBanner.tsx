import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const InstallmentBanner = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden gradient-sunset p-8 md:p-14">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 h-48 w-48 rounded-full bg-primary-foreground/10 blur-[80px]" />
            <div className="absolute bottom-10 left-20 h-36 w-36 rounded-full bg-primary-foreground/10 blur-[60px]" />
            <div className="absolute top-1/2 right-1/4 h-24 w-24 rounded-full bg-primary-foreground/5 blur-[40px]" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md rounded-full px-4 py-2 mb-5 border border-primary-foreground/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-semibold text-primary-foreground">Easy Installments</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5 leading-tight">
                Buy Anything on <br />6 or 12 Month Plans
              </h2>
              <p className="text-primary-foreground/85 mb-6 text-base leading-relaxed">
                No credit card needed. Just upload your CNIC and bank statement, get approved in 3-5 days, and start paying in easy monthly installments.
              </p>
              <div className="space-y-3 mb-8">
                {["Zero interest on selected items", "KYC verification in 3-5 days", "Automated payment reminders"].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-primary-foreground/90">
                    <div className="h-5 w-5 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                      <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/how-it-works">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold h-12 px-8 rounded-xl shadow-lg">
                  Learn How It Works <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-primary-foreground/10 backdrop-blur-md rounded-3xl p-7 border border-primary-foreground/15 shadow-xl">
                <h3 className="font-display text-lg font-bold text-primary-foreground mb-5">Sample Payment Plan</h3>
                <div className="bg-primary-foreground/10 rounded-2xl p-5 mb-5">
                  <p className="text-sm text-primary-foreground/70 mb-1">Product Price</p>
                  <p className="text-3xl font-bold text-primary-foreground">PKR 120,000</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-foreground/10 rounded-2xl p-4 text-center">
                    <p className="text-xs text-primary-foreground/70 mb-1">6 Months</p>
                    <p className="text-xl font-bold text-primary-foreground">PKR 20,000</p>
                    <p className="text-xs text-primary-foreground/60 mt-1">per month</p>
                  </div>
                  <div className="bg-primary-foreground/10 rounded-2xl p-4 text-center">
                    <p className="text-xs text-primary-foreground/70 mb-1">12 Months</p>
                    <p className="text-xl font-bold text-primary-foreground">PKR 10,000</p>
                    <p className="text-xs text-primary-foreground/60 mt-1">per month</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstallmentBanner;
