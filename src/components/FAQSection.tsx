import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do installment plans work on FlexiBerry?",
    answer:
      "FlexiBerry offers 6 and 12-month installment plans on all products. After signing up and completing KYC verification (CNIC, selfie, salary slip), you can purchase any product and pay in easy monthly installments. No credit card required.",
  },
  {
    question: "What documents are needed for KYC verification?",
    answer:
      "You need to submit your CNIC (front & back), a selfie, and a salary slip or bank statement. Our team reviews and approves applications within 3-5 business days.",
  },
  {
    question: "Is there any interest on installment plans?",
    answer:
      "Selected items are available on 0% interest. For other products, a small processing fee may apply. Full details are shown before you confirm your purchase.",
  },
  {
    question: "How can I become a vendor on FlexiBerry?",
    answer:
      'Visit our vendor registration page, fill in your business details, and our team will review your application. Once approved, you get a personalized shop with category-based themes. Please review our <a href="/vendor-policy" class="text-primary hover:underline font-medium">Vendor Policy</a> for more details.',
  },
  {
    question: "What is the return and refund policy?",
    answer:
      'FlexiBerry offers a 7-day return policy for most products. Items must be in original packaging and unused condition. Refunds are processed within 5-7 business days. Read our full <a href="/return-policy" class="text-primary hover:underline font-medium">Return & Refund Policy</a> for details.',
  },
  {
    question: "Is my payment information secure?",
    answer:
      'Yes, all transactions on FlexiBerry are encrypted and secured. We use industry-standard security protocols to protect your data. See our <a href="/privacy-policy" class="text-primary hover:underline font-medium">Privacy Policy</a> for more information.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Everything you need to know about FlexiBerry
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
