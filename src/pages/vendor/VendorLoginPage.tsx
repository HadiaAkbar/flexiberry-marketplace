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
  CheckCircle2, Mail, Lock, X, KeyRound, RefreshCw,
} from "lucide-react";

/* ── Inline SVG Logo ── */
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

/* ── Forgot Password Modal ── */
type ForgotStep = "email" | "sent";

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep]       = useState<ForgotStep>("email");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("sent"); }, 1500);
  };

  const F = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <>
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 999, animation: "fpFadeIn 0.2s ease" }}
      />
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000, width: "min(400px,92vw)", background: "white", borderRadius: "24px", boxShadow: "0 32px 80px rgba(37,99,235,0.22), 0 8px 24px rgba(0,0,0,0.12)", overflow: "hidden", animation: "fpPopUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", ...F }}>
        <div style={{ background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", padding: "24px", position: "relative", textAlign: "center" }}>
          <button onClick={onClose} style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={14} />
          </button>
          <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", border: "3px solid rgba(255,255,255,0.35)" }}>
            {step === "email" ? <KeyRound size={28} color="white" /> : <Mail size={28} color="white" />}
          </div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: "18px", margin: "0 0 4px" }}>
            {step === "email" ? "Forgot Password?" : "Check Your Email"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", margin: 0 }}>
            {step === "email" ? "Enter your vendor email and we'll send a reset link" : `We sent a reset link to ${email}`}
          </p>
        </div>
        <div style={{ padding: "24px" }}>
          {step === "email" ? (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px", ...F }}>Vendor Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={15} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                  <input
                    type="email"
                    placeholder="store@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    autoFocus
                    style={{ width: "100%", height: "44px", paddingLeft: "36px", paddingRight: "12px", borderRadius: "11px", border: "1.5px solid rgba(37,99,235,0.2)", fontSize: "13px", outline: "none", boxSizing: "border-box", background: "#fafbff", ...F }}
                  />
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={loading || !email}
                style={{ width: "100%", height: "44px", borderRadius: "12px", background: loading || !email ? "rgba(37,99,235,0.35)" : "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", border: "none", cursor: loading || !email ? "not-allowed" : "pointer", color: "white", fontSize: "13px", fontWeight: 700, boxShadow: "0 6px 18px rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "all 0.2s", ...F }}>
                {loading ? <><RefreshCw size={15} style={{ animation: "fpSpin 1s linear infinite" }} /> Sending…</> : "Send Reset Link"}
              </button>
              <button onClick={onClose} style={{ width: "100%", marginTop: "10px", height: "40px", borderRadius: "12px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.15)", cursor: "pointer", color: "#64748b", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}>
                <ArrowLeft size={14} /> Back to Login
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", border: "3px solid #6ee7b7" }}>
                  <CheckCircle2 size={32} color="#059669" />
                </div>
                <p style={{ fontSize: "13px", color: "#374151", fontWeight: 700, margin: "0 0 4px" }}>Reset link sent successfully!</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>Didn't receive it? Check your spam folder or try again.</p>
              </div>
              <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 14px", marginBottom: "16px" }}>
                {[
                  { emoji: "📬", text: "Check your inbox for the reset link" },
                  { emoji: "⏱️", text: "Link expires in 30 minutes" },
                  { emoji: "🔒", text: "Choose a strong new password" },
                ].map(({ emoji, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0" }}>
                    <span style={{ fontSize: "16px" }}>{emoji}</span>
                    <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500, ...F }}>{text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setStep("email"); setEmail(""); }} style={{ width: "100%", marginBottom: "8px", height: "40px", borderRadius: "12px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.2)", cursor: "pointer", color: "#2563eb", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}>
                <RefreshCw size={14} /> Resend Email
              </button>
              <button onClick={onClose} style={{ width: "100%", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, boxShadow: "0 6px 18px rgba(37,99,235,0.3)", ...F }}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fpFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fpPopUp   { from { opacity: 0; transform: translate(-50%,-46%) scale(0.92); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes fpSpin    { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
};

/* ── Create Vendor Account Modal ── */
type CreateStep = "info" | "success";

const CreateVendorModal = ({ onClose }: { onClose: () => void }) => {
  // NO navigate — stays inside the modal entirely
  const [step, setStep] = useState<CreateStep>("info");
  const F = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)", zIndex: 999, animation: "cvFadeIn 0.2s ease" }}
      />

      {/* Modal */}
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000, width: "min(440px,94vw)", background: "white", borderRadius: "24px", boxShadow: "0 32px 80px rgba(37,99,235,0.22), 0 8px 24px rgba(0,0,0,0.12)", overflow: "hidden", animation: "cvPopUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", ...F }}>

        {/* Gradient header */}
        <div style={{ background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", padding: "28px 24px 24px", position: "relative", textAlign: "center" }}>
          <button
            onClick={onClose}
            style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "28px", height: "28px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={14} />
          </button>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", border: "3px solid rgba(255,255,255,0.35)" }}>
            {step === "info" ? <Store size={30} color="white" /> : <CheckCircle2 size={30} color="white" />}
          </div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: "20px", margin: "0 0 6px" }}>
            {step === "info" ? "Become a FlexiBerry Vendor" : "You're Almost In!"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", margin: 0 }}>
            {step === "info"
              ? "Join 500+ verified vendors selling on Pakistan's fastest-growing installment marketplace"
              : "Your vendor application has been received successfully"}
          </p>
        </div>

        {/* ── INFO STEP ── */}
        {step === "info" && (
          <div style={{ padding: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "20px" }}>
              {[
                { val: "10K+", label: "Active Buyers" },
                { val: "Free", label: "To Join" },
                { val: "24hr", label: "KYC Approval" },
              ].map(({ val, label }) => (
                <div key={label} style={{ background: "rgba(37,99,235,0.06)", borderRadius: "12px", padding: "12px 8px", textAlign: "center", border: "1px solid rgba(37,99,235,0.12)" }}>
                  <p style={{ fontWeight: 800, fontSize: "16px", color: "#2563eb", margin: "0 0 2px", ...F }}>{val}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0, ...F }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: "20px" }}>
              {[
                { emoji: "🏪", text: "List unlimited products with installment plans" },
                { emoji: "📊", text: "Real-time dashboard for orders & revenue" },
                { emoji: "🔒", text: "KYC-verified payouts, zero fraud risk" },
                { emoji: "📣", text: "Reach buyers across all of Pakistan" },
              ].map(({ emoji, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: "18px", width: "24px", textAlign: "center" }}>{emoji}</span>
                  <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500, ...F }}>{text}</span>
                </div>
              ))}
            </div>

            {/* ✅ KEY FIX: onClick sets step to "success" — does NOT call navigate() */}
            <button
              onClick={() => setStep("success")}
              style={{ width: "100%", height: "46px", borderRadius: "12px", background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", border: "none", cursor: "pointer", color: "white", fontSize: "14px", fontWeight: 700, boxShadow: "0 6px 18px rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px", transition: "opacity 0.2s", ...F }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <Store size={16} />
              Create Vendor Account — It's Free
            </button>

            <button
              onClick={onClose}
              style={{ width: "100%", height: "40px", borderRadius: "12px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.18)", cursor: "pointer", color: "#64748b", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}
            >
              <ArrowLeft size={14} /> Back to Login
            </button>

            <p style={{ textAlign: "center", fontSize: "11px", color: "#94a3b8", marginTop: "14px", ...F }}>
              By registering, you agree to FlexiBerry's Vendor Terms & Conditions
            </p>
          </div>
        )}

        {/* ── SUCCESS STEP ── */}
        {step === "success" && (
          <div style={{ padding: "24px" }}>
            <div style={{ textAlign: "center", padding: "8px 0 20px" }}>
              <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: "3px solid #6ee7b7" }}>
                <CheckCircle2 size={36} color="#059669" />
              </div>
              <p style={{ fontSize: "16px", color: "#111827", fontWeight: 800, margin: "0 0 6px", ...F }}>Application Submitted!</p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.6, ...F }}>
                Our team will review your application and contact you within <strong>24 hours</strong> for KYC verification.
              </p>
            </div>

            <div style={{ background: "rgba(37,99,235,0.05)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: "12px", padding: "12px 14px", marginBottom: "20px" }}>
              {[
                { emoji: "📧", text: "Check your email for a confirmation message" },
                { emoji: "📋", text: "Prepare your CNIC & business documents" },
                { emoji: "⏱️", text: "KYC review completed within 24 hours" },
                { emoji: "🚀", text: "Dashboard access granted after approval" },
              ].map(({ emoji, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 0" }}>
                  <span style={{ fontSize: "16px" }}>{emoji}</span>
                  <span style={{ fontSize: "12px", color: "#475569", fontWeight: 500, ...F }}>{text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              style={{ width: "100%", height: "46px", borderRadius: "12px", background: "linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)", border: "none", cursor: "pointer", color: "white", fontSize: "14px", fontWeight: 700, boxShadow: "0 6px 18px rgba(37,99,235,0.3)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "10px", transition: "opacity 0.2s", ...F }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Back to Login
            </button>

            <button
              onClick={() => setStep("info")}
              style={{ width: "100%", height: "40px", borderRadius: "12px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.18)", cursor: "pointer", color: "#64748b", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}
            >
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes cvFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cvPopUp  { from { opacity: 0; transform: translate(-50%,-46%) scale(0.92); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
      `}</style>
    </>
  );
};

/* ── Main Page ── */
const VendorLoginPage = () => {
  const [showPass,        setShowPass]        = useState(false);
  const [loginEmail,      setLoginEmail]      = useState("");
  const [loginPass,       setLoginPass]       = useState("");
  const [showForgot,      setShowForgot]      = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Forgot Password Modal */}
      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      {/* Create Vendor Account Modal */}
      {showCreateModal && <CreateVendorModal onClose={() => setShowCreateModal(false)} />}

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
                    <button
                      type="button"
                      onClick={() => setShowForgot(true)}
                      className="text-xs text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                      Forgot password?
                    </button>
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
                  Register your shop and start selling on Pakistan's fastest-growing installment marketplace.
                </p>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="w-full h-10 rounded-xl gradient-primary border-none text-white text-xs font-semibold cursor-pointer flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Store className="h-3.5 w-3.5" />
                  Create Vendor Account
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3">
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
