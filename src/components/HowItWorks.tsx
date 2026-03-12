import { UserPlus, FileText, CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    number: 1,
    title: "Create Account",
    description: "Sign up in minutes with your basic details",
    color: "bg-blue-50 text-blue-500",
    dotColor: "bg-blue-500",
  },
  {
    icon: FileText,
    number: 2,
    title: "Upload Documents",
    description: "Submit CNIC, selfie & salary slip for verification",
    color: "bg-purple-50 text-purple-500",
    dotColor: "bg-purple-500",
  },
  {
    icon: CheckCircle,
    number: 3,
    title: "Get Approved",
    description: "Admin reviews and approves your application",
    color: "bg-emerald-50 text-emerald-500",
    dotColor: "bg-emerald-500",
  },
  {
    icon: ShoppingBag,
    number: 4,
    title: "Shop on Installments",
    description: "Purchase products with flexible monthly plans",
    color: "bg-amber-50 text-amber-500",
    dotColor: "bg-amber-500",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            How FlexiBerry Works
          </h2>
          <p className="text-sm text-muted-foreground mt-2">Get started in 4 simple steps</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-border" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative mb-4">
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center ${step.color.split(" ")[0]}`}>
                    <step.icon className={`h-7 w-7 ${step.color.split(" ")[1]}`} />
                  </div>
                  <span className={`absolute -top-2 -right-2 h-6 w-6 rounded-full ${step.dotColor} text-card text-xs font-bold flex items-center justify-center shadow-sm`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
