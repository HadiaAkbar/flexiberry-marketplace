import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const InstallmentBanner = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden gradient-warm p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 h-40 w-40 rounded-full bg-primary-foreground/30 blur-3xl" />
            <div className="absolute bottom-10 left-20 h-32 w-32 rounded-full bg-primary-foreground/20 blur-3xl" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur rounded-full px-4 py-1.5 mb-4">
                <CreditCard className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm font-medium text-primary-foreground">Easy Installments</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Buy Anything on <br />6 or 12 Month Plans
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                No credit card needed. Just upload your CNIC and bank statement, get approved in 3-5 days, and start paying in easy monthly installments.
              </p>
              <div className="space-y-2 mb-6">
                {["Zero interest on selected items", "KYC verification in 3-5 days", "Automated payment reminders"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-primary-foreground/90 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                    {item}
                  </div>
                ))}
              </div>
              <Link to="/how-it-works">
                <Button size="lg" className="bg-card text-foreground hover:bg-card/90 font-semibold">
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
              <div className="bg-card/10 backdrop-blur rounded-2xl p-6 border border-primary-foreground/20">
                <h3 className="font-display text-lg font-bold text-primary-foreground mb-4">Sample Payment Plan</h3>
                <div className="bg-card/10 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary-foreground/70">Product Price</p>
                  <p className="text-2xl font-bold text-primary-foreground">PKR 120,000</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-primary-foreground/70">6 Months</p>
                    <p className="text-lg font-bold text-primary-foreground">PKR 20,000</p>
                    <p className="text-xs text-primary-foreground/60">per month</p>
                  </div>
                  <div className="bg-card/10 rounded-lg p-3 text-center">
                    <p className="text-xs text-primary-foreground/70">12 Months</p>
                    <p className="text-lg font-bold text-primary-foreground">PKR 10,000</p>
                    <p className="text-xs text-primary-foreground/60">per month</p>
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
