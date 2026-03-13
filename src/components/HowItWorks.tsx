import { UserPlus, FileText, CheckCircle, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Create Account",
    description: "Sign up in minutes with your basic details. No paperwork, no hassle.",
    gradient: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    glow: "rgba(37,99,235,0.35)",
    glowSoft: "rgba(37,99,235,0.12)",
    numColor: "#2563eb",
    iconBg: "rgba(37,99,235,0.12)",
    dotBg: "linear-gradient(135deg, #2563eb, #60a5fa)",
    connectorColor: "#bfdbfe",
  },
  {
    icon: FileText,
    number: "02",
    title: "Upload Documents",
    description: "Submit CNIC, selfie & salary slip for fast KYC verification.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    glow: "rgba(124,58,237,0.35)",
    glowSoft: "rgba(124,58,237,0.12)",
    numColor: "#7c3aed",
    iconBg: "rgba(124,58,237,0.12)",
    dotBg: "linear-gradient(135deg, #7c3aed, #c4b5fd)",
    connectorColor: "#ddd6fe",
  },
  {
    icon: CheckCircle,
    number: "03",
    title: "Get Approved",
    description: "Our team reviews and approves your application in 3-5 business days.",
    gradient: "linear-gradient(135deg, #059669 0%, #34d399 100%)",
    glow: "rgba(5,150,105,0.35)",
    glowSoft: "rgba(5,150,105,0.12)",
    numColor: "#059669",
    iconBg: "rgba(5,150,105,0.12)",
    dotBg: "linear-gradient(135deg, #059669, #6ee7b7)",
    connectorColor: "#a7f3d0",
  },
  {
    icon: ShoppingBag,
    number: "04",
    title: "Shop on Installments",
    description: "Purchase anything with flexible 6 or 12 month monthly plans.",
    gradient: "linear-gradient(135deg, #d97706 0%, #fbbf24 100%)",
    glow: "rgba(217,119,6,0.35)",
    glowSoft: "rgba(217,119,6,0.12)",
    numColor: "#d97706",
    iconBg: "rgba(217,119,6,0.12)",
    dotBg: "linear-gradient(135deg, #d97706, #fde68a)",
    connectorColor: "#fde68a",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative py-16 overflow-hidden" style={{
      background: "linear-gradient(160deg, #f0f4ff 0%, #fafafa 50%, #f0fff8 100%)"
    }}>

      {/* Background mesh */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(37,99,235,0.05) 0%, transparent 50%),
                          radial-gradient(circle at 80% 70%, rgba(124,58,237,0.05) 0%, transparent 50%)`,
      }} />

      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-10 relative z-10">
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#2563eb", marginBottom: "10px"
        }}>Simple Process</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
          fontWeight: 900,
          color: "#0f172a",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: "10px"
        }}>
          How FlexiBerry Works
        </h2>
        <p style={{ fontSize: "0.95rem", color: "#64748b", fontWeight: 400, maxWidth: "420px", margin: "0 auto" }}>
          Get started in 4 simple steps and start shopping on easy installments
        </p>
        <div style={{
          width: "48px", height: "3px", borderRadius: "99px",
          background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          margin: "12px auto 0"
        }} />
      </div>

      {/* Steps grid */}
      <div className="container mx-auto px-4 relative z-10">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.10, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
            >
              {/* Connector arrow between cards (desktop) */}
              {i < steps.length - 1 && (
                <div style={{
                  position: "absolute",
                  top: "52px",
                  right: "-12px",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  pointerEvents: "none"
                }} className="hidden lg:flex">
                  <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
                    <path d="M0 7 H18 M14 2 L22 7 L14 12" stroke={step.connectorColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}

              {/* Card */}
              <div
                style={{
                  background: "rgba(255,255,255,0.88)",
                  backdropFilter: "blur(20px) saturate(1.8)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                  borderRadius: "20px",
                  border: "1.5px solid rgba(255,255,255,0.95)",
                  padding: "22px 18px 18px",
                  boxShadow: `
                    0 2px 0 rgba(255,255,255,0.9) inset,
                    0 -2px 0 rgba(0,0,0,0.04) inset,
                    0 10px 32px ${step.glowSoft},
                    0 3px 10px rgba(0,0,0,0.05)
                  `,
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.02)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 2px 0 rgba(255,255,255,0.9) inset,
                    0 -2px 0 rgba(0,0,0,0.04) inset,
                    0 20px 48px ${step.glow},
                    0 6px 18px rgba(0,0,0,0.07)
                  `;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = `
                    0 2px 0 rgba(255,255,255,0.9) inset,
                    0 -2px 0 rgba(0,0,0,0.04) inset,
                    0 10px 32px ${step.glowSoft},
                    0 3px 10px rgba(0,0,0,0.05)
                  `;
                }}
              >
                {/* Top-right number watermark */}
                <div style={{
                  position: "absolute", top: "12px", right: "14px",
                  fontSize: "38px", fontWeight: 900,
                  fontFamily: "var(--font-display)",
                  color: step.numColor, opacity: 0.08,
                  lineHeight: 1, letterSpacing: "-0.06em",
                  pointerEvents: "none", userSelect: "none"
                }}>{step.number}</div>

                {/* Step badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: step.iconBg,
                  borderRadius: "99px",
                  padding: "4px 10px 4px 6px",
                  marginBottom: "14px"
                }}>
                  <div style={{
                    width: "20px", height: "20px",
                    borderRadius: "50%",
                    background: step.dotBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 2px 6px ${step.glow}`
                  }}>
                    <span style={{
                      fontSize: "9px", fontWeight: 800, color: "#fff",
                      letterSpacing: "-0.02em"
                    }}>{i + 1}</span>
                  </div>
                  <span style={{
                    fontSize: "10px", fontWeight: 700,
                    color: step.numColor, letterSpacing: "0.06em",
                    textTransform: "uppercase"
                  }}>Step {i + 1}</span>
                </div>

                {/* Icon */}
                <div style={{
                  width: "52px", height: "52px",
                  borderRadius: "14px",
                  background: step.gradient,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "14px",
                  boxShadow: `0 6px 18px ${step.glow}, 0 2px 4px rgba(0,0,0,0.08)`,
                  position: "relative"
                }}>
                  {/* Shine */}
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0,
                    height: "50%", borderRadius: "14px 14px 0 0",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)"
                  }} />
                  <step.icon style={{ width: "22px", height: "22px", color: "#fff", position: "relative", zIndex: 1 }} />
                </div>

                {/* Text */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                  fontWeight: 800,
                  color: "#0f172a",
                  letterSpacing: "-0.025em",
                  marginBottom: "7px",
                  lineHeight: 1.25
                }}>{step.title}</h3>
                <p style={{
                  fontSize: "clamp(0.82rem, 1.2vw, 0.9rem)",
                  color: "#64748b",
                  lineHeight: 1.6,
                  margin: 0
                }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
