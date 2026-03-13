import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, User, Phone,
  ChevronRight, ArrowLeft, Shield, Zap,
  KeyRound, RefreshCw, X, CheckCircle2,
  PartyPopper, ShoppingBag, Star, Package,
  Store, CreditCard,
} from "lucide-react";

/* ══════════════════════════════════════════════
   FLEXIBERRY LOGO
══════════════════════════════════════════════ */
const FlexiBerryLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lb-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="lb-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#lb-bg)"/>
    <rect width="100" height="100" rx="28" fill="url(#lb-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#lb-bg)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#lb-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#lb-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#lb-bg)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#lb-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#lb-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#lb-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#lb-bg)"/>
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

/* ══════════════════════════════════════════════
   FORGOT PASSWORD MODAL
══════════════════════════════════════════════ */
type ForgotStep = "email" | "sent";

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("sent"); }, 1500);
  };

  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)", zIndex: 999, animation: "fadeIn 0.2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000, width: "min(420px,92vw)", background: "white", borderRadius: "28px", boxShadow: "0 40px 100px rgba(37,99,235,0.25), 0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden", animation: "popUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", ...F }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)", padding: "28px 28px 24px", position: "relative", textAlign: "center" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
            <svg width="100%" height="100%"><defs><pattern id="fp-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#fp-dots)"/></svg>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={13} strokeWidth={2.5}/>
          </button>
          <div style={{ width: "64px", height: "64px", borderRadius: "20px", background: "rgba(255,255,255,0.18)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>
            {step === "email" ? <KeyRound size={28} color="white"/> : <Mail size={28} color="white"/>}
          </div>
          <h2 style={{ color: "white", fontWeight: 800, fontSize: "18px", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {step === "email" ? "Reset Password" : "Check Your Inbox"}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", margin: 0 }}>
            {step === "email" ? "We'll send a secure reset link to your email" : `Reset link sent to ${email}`}
          </p>
        </div>

        <div style={{ padding: "24px 28px 28px" }}>
          {step === "email" ? (
            <>
              <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "8px", letterSpacing: "0.04em", textTransform: "uppercase" }}>Email Address</label>
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <Mail size={15} color={focused ? "#2563eb" : "#94a3b8"} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }}/>
                <input
                  type="email" placeholder="your@email.com" value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                  autoFocus
                  style={{ width: "100%", height: "48px", paddingLeft: "40px", paddingRight: "14px", borderRadius: "14px", border: `1.5px solid ${focused ? "#2563eb" : "rgba(37,99,235,0.2)"}`, background: focused ? "#f8faff" : "#fafafa", fontSize: "14px", outline: "none", boxSizing: "border-box", transition: "all 0.2s", boxShadow: focused ? "0 0 0 4px rgba(37,99,235,0.08)" : "none", ...F }}
                />
              </div>
              <button onClick={handleSend} disabled={loading || !email} style={{ width: "100%", height: "48px", borderRadius: "14px", background: loading || !email ? "rgba(37,99,235,0.3)" : "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: loading || !email ? "not-allowed" : "pointer", color: "white", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: loading || !email ? "none" : "0 8px 24px rgba(37,99,235,0.35)", transition: "all 0.2s", ...F }}>
                {loading ? <><RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }}/> Sending…</> : "Send Reset Link →"}
              </button>
              <button onClick={onClose} style={{ width: "100%", marginTop: "10px", height: "44px", borderRadius: "14px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.15)", cursor: "pointer", color: "#64748b", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}>
                <ArrowLeft size={14}/> Back to Login
              </button>
            </>
          ) : (
            <>
              <div style={{ textAlign: "center", padding: "4px 0 20px" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg,#d1fae5,#a7f3d0)", border: "3px solid #6ee7b7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle2 size={36} color="#059669"/>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>Link sent!</p>
                <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>Check spam if you don't see it.</p>
              </div>
              {[{ emoji: "📬", text: "Check your inbox for the reset link" }, { emoji: "⏱️", text: "Link expires in 30 minutes" }, { emoji: "🔒", text: "Create a strong new password" }].map(({ emoji, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <span style={{ fontSize: "18px" }}>{emoji}</span>
                  <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                <button onClick={() => { setStep("email"); setEmail(""); }} style={{ flex: 1, height: "44px", borderRadius: "14px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.2)", cursor: "pointer", color: "#2563eb", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", ...F }}>
                  <RefreshCw size={13}/> Resend
                </button>
                <button onClick={onClose} style={{ flex: 2, height: "44px", borderRadius: "14px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, boxShadow: "0 8px 24px rgba(37,99,235,0.35)", ...F }}>
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════
   SUCCESS POPUP
══════════════════════════════════════════════ */
const SuccessPopup = ({ name, onClose }: { name: string; onClose: () => void }) => {
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.6)", backdropFilter: "blur(8px)", zIndex: 999, animation: "fadeIn 0.2s ease" }}/>
      <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 1000, width: "min(420px,92vw)", background: "white", borderRadius: "28px", boxShadow: "0 40px 100px rgba(37,99,235,0.25)", overflow: "hidden", animation: "popUp 0.35s cubic-bezier(0.34,1.56,0.64,1)", ...F }}>
        <div style={{ background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)", padding: "32px 28px 28px", textAlign: "center", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
            <svg width="100%" height="100%"><defs><pattern id="sp-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#sp-dots)"/></svg>
          </div>
          <button onClick={onClose} style={{ position: "absolute", top: "14px", right: "14px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={13} strokeWidth={2.5}/>
          </button>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", animation: "pulse 2s ease-in-out infinite", boxShadow: "0 0 0 0 rgba(255,255,255,0.3)" }}>
            <CheckCircle2 size={42} color="white" strokeWidth={2}/>
          </div>
          <h2 style={{ color: "white", fontWeight: 900, fontSize: "22px", margin: "0 0 6px", letterSpacing: "-0.03em" }}>Welcome, {name || "there"}! 🎉</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", margin: 0 }}>Your FlexiBerry account is ready</p>
        </div>
        <div style={{ padding: "24px 28px 28px" }}>
          {[
            { icon: ShoppingBag, text: "Shop thousands of products on easy installments", color: "#2563eb" },
            { icon: Zap, text: "Access exclusive flash sale deals for members", color: "#f59e0b" },
            { icon: Shield, text: "KYC-secured account with safe payments", color: "#10b981" },
          ].map(({ icon: Icon, text, color }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: `${color}12`, border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={15} color={color}/>
              </div>
              <span style={{ fontSize: "13px", color: "#374151", fontWeight: 600 }}>{text}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={onClose} style={{ flex: 2, height: "48px", borderRadius: "14px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "14px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 8px 24px rgba(37,99,235,0.35)", ...F }}>
              <PartyPopper size={16}/> Start Shopping
            </button>
            <button onClick={onClose} style={{ flex: 1, height: "48px", borderRadius: "14px", background: "transparent", border: "1.5px solid rgba(37,99,235,0.2)", cursor: "pointer", color: "#2563eb", fontSize: "13px", fontWeight: 600, ...F }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════
   FIELD COMPONENT
══════════════════════════════════════════════ */
const Field = ({ label, type = "text", placeholder, value, onChange, icon: Icon, rightSlot }: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void;
  icon: any; rightSlot?: React.ReactNode;
}) => {
  const [focused, setFocused] = useState(false);
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };
  return (
    <div>
      <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "7px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon size={15} color={focused ? "#2563eb" : "#94a3b8"} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }}/>
        <input
          type={type} placeholder={placeholder} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ width: "100%", height: "48px", paddingLeft: "40px", paddingRight: rightSlot ? "46px" : "14px", borderRadius: "13px", border: `1.5px solid ${focused ? "#2563eb" : "rgba(37,99,235,0.15)"}`, background: focused ? "#f8faff" : "#fafafa", fontSize: "14px", fontWeight: 500, color: "#0f172a", outline: "none", boxSizing: "border-box" as const, transition: "all 0.2s", boxShadow: focused ? "0 0 0 4px rgba(37,99,235,0.08)" : "none", ...F }}
        />
        {rightSlot && <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>{rightSlot}</div>}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN LOGIN PAGE
══════════════════════════════════════════════ */
const LoginPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPass, setShowPass] = useState(false);
  const [showRegPass, setShowRegPass] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Register fields
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [regPass, setRegPass] = useState("");

  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f0f4ff 0%,#faf8ff 50%,#f0fdf4 100%)", display: "flex", flexDirection: "column" as const, ...F }}>

      {showForgot && <ForgotPasswordModal onClose={() => setShowForgot(false)}/>}
      {showSuccess && <SuccessPopup name={name} onClose={() => { setShowSuccess(false); navigate("/dashboard"); }}/>}

      {/* ── TOPBAR ── */}
      <header style={{ height: "64px", display: "flex", alignItems: "center", padding: "0 32px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(37,99,235,0.08)", position: "sticky", top: 0, zIndex: 50 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <FlexiBerryLogo size={36}/>
          <div>
            <div style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em", lineHeight: 1 }}>FlexiBerry</div>
            <div style={{ fontSize: "10px", fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>Shop on Installments</div>
          </div>
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "12px" }}>
          <Link to="/" style={{ fontSize: "13px", fontWeight: 600, color: "#64748b", textDecoration: "none" }}>← Back to Shop</Link>
          <Link to="/vendor/login" style={{ fontSize: "13px", fontWeight: 700, color: "white", background: "linear-gradient(135deg,#2563eb,#7c3aed)", padding: "8px 18px", borderRadius: "10px", textDecoration: "none", boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
            Vendor Portal
          </Link>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <div style={{ display: "flex", gap: "56px", alignItems: "center", maxWidth: "980px", width: "100%" }}>

          {/* ── LEFT: BRAND PANEL (hidden on mobile) ── */}
          <div
            className="left-panel"
            style={{
              flex: "0 0 400px",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "none" : "translateX(-24px)",
              transition: "all 0.65s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {/* Main gradient card */}
            <div style={{ borderRadius: "32px", background: "linear-gradient(145deg,#1e3a8a 0%,#2563eb 45%,#7c3aed 100%)", padding: "40px 36px", position: "relative", overflow: "hidden", boxShadow: "0 32px 80px rgba(37,99,235,0.35), 0 8px 32px rgba(124,58,237,0.20)", marginBottom: "16px" }}>
              {/* Glows */}
              <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "rgba(124,58,237,0.25)", top: "-100px", right: "-60px", filter: "blur(50px)", pointerEvents: "none" }}/>
              <div style={{ position: "absolute", width: "240px", height: "240px", borderRadius: "50%", background: "rgba(37,99,235,0.2)", bottom: "-60px", left: "-50px", filter: "blur(40px)", pointerEvents: "none" }}/>
              {/* Dot grid */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
                <svg width="100%" height="100%"><defs><pattern id="ldots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#ldots)"/></svg>
              </div>

              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px", position: "relative", zIndex: 1 }}>
                <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "16px", padding: "10px", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  <FlexiBerryLogo size={40}/>
                </div>
                <div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const }}>Welcome to</div>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: "white", letterSpacing: "-0.03em", lineHeight: 1 }}>FlexiBerry</div>
                </div>
              </div>

              {/* Headline */}
              <div style={{ position: "relative", zIndex: 1, marginBottom: "28px" }}>
                <h2 style={{ fontSize: "34px", fontWeight: 900, color: "white", margin: "0 0 10px", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
                  Shop Smarter,<br/>
                  <span style={{ color: "#a5b4fc" }}>Pay in Parts.</span>
                </h2>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", margin: 0, lineHeight: 1.6 }}>
                  Pakistan's leading installment marketplace. Buy any product with 0% markup on easy monthly plans.
                </p>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "8px", position: "relative", zIndex: 1 }}>
                {[
                  { val: "50K+", label: "Happy Customers" },
                  { val: "10K+", label: "Products" },
                  { val: "Rs 2B+", label: "Sold" },
                ].map(({ val, label }) => (
                  <div key={label} style={{ flex: 1, textAlign: "center", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", borderRadius: "12px", padding: "10px 6px", border: "1px solid rgba(255,255,255,0.18)" }}>
                    <div style={{ fontSize: "16px", fontWeight: 900, color: "white", lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.55)", fontWeight: 600, marginTop: "3px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature list */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "8px" }}>
              {[
                { icon: CreditCard, text: "6, 12, or 18-month installment plans", color: "#2563eb" },
                { icon: Star, text: "10,000+ verified products & vendors", color: "#f59e0b" },
                { icon: Shield, text: "KYC-verified, 100% secure payments", color: "#10b981" },
                { icon: Package, text: "Free nationwide delivery on orders PKR 5K+", color: "#8b5cf6" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 14px", background: "white", borderRadius: "14px", border: "1px solid rgba(37,99,235,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: `${color}12`, border: `1.5px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={14} color={color}/>
                  </div>
                  <span style={{ fontSize: "13px", color: "#374151", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: FORM CARD ── */}
          <div style={{ flex: 1, maxWidth: "420px", width: "100%", margin: "0 auto", opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)", transition: "all 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s" }}>

            {/* Card */}
            <div style={{ background: "white", borderRadius: "28px", border: "1.5px solid rgba(37,99,235,0.1)", boxShadow: "0 20px 60px rgba(37,99,235,0.10), 0 4px 16px rgba(0,0,0,0.04)", overflow: "hidden" }}>
              {/* Rainbow top band */}
              <div style={{ height: "5px", background: "linear-gradient(90deg,#2563eb,#7c3aed,#10b981)" }}/>

              <div style={{ padding: "28px 32px 32px" }}>
                {/* Logo + title */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                  <FlexiBerryLogo size={40}/>
                  <div>
                    <h1 style={{ fontSize: "20px", fontWeight: 900, color: "#0f172a", margin: 0, letterSpacing: "-0.03em" }}>
                      {tab === "login" ? "Welcome back" : "Create account"}
                    </h1>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "2px 0 0", fontWeight: 500 }}>
                      {tab === "login" ? "Sign in to your FlexiBerry account" : "Join Pakistan's #1 installment marketplace"}
                    </p>
                  </div>
                </div>

                {/* Tab switcher */}
                <div style={{ display: "flex", background: "#f1f5f9", borderRadius: "14px", padding: "4px", marginBottom: "24px", gap: "4px" }}>
                  {(["login", "register"] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTab(t)}
                      style={{
                        flex: 1, height: "38px", borderRadius: "10px", border: "none",
                        cursor: "pointer", fontSize: "13px", fontWeight: 700,
                        transition: "all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                        background: tab === t ? "white" : "transparent",
                        color: tab === t ? "#0f172a" : "#64748b",
                        boxShadow: tab === t ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                        ...F,
                      }}>
                      {t === "login" ? "Sign In" : "Register"}
                    </button>
                  ))}
                </div>

                {/* ── LOGIN FORM ── */}
                {tab === "login" && (
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
                    <Field label="Email Address" type="email" placeholder="your@email.com" value={loginEmail} onChange={setLoginEmail} icon={Mail}/>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "7px" }}>
                        <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Password</label>
                        <button type="button" onClick={() => setShowForgot(true)} style={{ fontSize: "12px", fontWeight: 700, color: "#2563eb", background: "none", border: "none", cursor: "pointer", padding: 0, ...F }}>
                          Forgot password?
                        </button>
                      </div>
                      <Field
                        label="" type={showPass ? "text" : "password"}
                        placeholder="••••••••" value={loginPass} onChange={setLoginPass} icon={Lock}
                        rightSlot={
                          <button type="button" onClick={() => setShowPass(!showPass)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: "2px" }}>
                            {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                          </button>
                        }
                      />
                    </div>

                    <button
                      onClick={() => navigate("/dashboard")}
                      style={{ width: "100%", height: "50px", borderRadius: "14px", background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)", border: "none", cursor: "pointer", color: "white", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 8px 32px rgba(37,99,235,0.4)", position: "relative", overflow: "hidden", transition: "all 0.2s", ...F }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(37,99,235,0.45)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(37,99,235,0.4)"; }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.12) 50%,transparent 60%)", animation: "shimmer 3s ease infinite" }}/>
                      <Zap size={16} style={{ position: "relative", zIndex: 1 }}/>
                      <span style={{ position: "relative", zIndex: 1 }}>Sign In</span>
                      <ChevronRight size={16} style={{ position: "relative", zIndex: 1 }}/>
                    </button>
                  </div>
                )}

                {/* ── REGISTER FORM ── */}
                {tab === "register" && (
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "14px" }}>
                    <Field label="Full Name" placeholder="Muhammad Ali" value={name} onChange={setName} icon={User}/>
                    <Field label="Email Address" type="email" placeholder="your@email.com" value={regEmail} onChange={setRegEmail} icon={Mail}/>
                    <Field label="Phone Number" placeholder="+92 3XX XXXXXXX" value={phone} onChange={setPhone} icon={Phone}/>
                    <div>
                      <label style={{ fontSize: "11px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "7px", letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Password</label>
                      <Field
                        label="" type={showRegPass ? "text" : "password"}
                        placeholder="Create a strong password" value={regPass} onChange={setRegPass} icon={Lock}
                        rightSlot={
                          <button type="button" onClick={() => setShowRegPass(!showRegPass)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", padding: "2px" }}>
                            {showRegPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                          </button>
                        }
                      />
                    </div>

                    <button
                      onClick={() => setShowSuccess(true)}
                      style={{ width: "100%", height: "50px", borderRadius: "14px", background: "linear-gradient(135deg,#1e3a8a 0%,#2563eb 50%,#7c3aed 100%)", border: "none", cursor: "pointer", color: "white", fontSize: "15px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", boxShadow: "0 8px 32px rgba(37,99,235,0.4)", position: "relative", overflow: "hidden", transition: "all 0.2s", marginTop: "4px", ...F }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.12) 50%,transparent 60%)", animation: "shimmer 3s ease infinite" }}/>
                      <span style={{ position: "relative", zIndex: 1 }}>Create My Account</span>
                      <ChevronRight size={16} style={{ position: "relative", zIndex: 1 }}/>
                    </button>

                    <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                      By creating an account you agree to our{" "}
                      <a href="#" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>Terms</a>
                      {" & "}
                      <a href="#" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a>
                    </p>
                  </div>
                )}

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0 16px" }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right,transparent,rgba(37,99,235,0.12))" }}/>
                  <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const, whiteSpace: "nowrap" }}>Are you a vendor?</span>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left,transparent,rgba(37,99,235,0.12))" }}/>
                </div>

                {/* Vendor CTA */}
                <Link to="/vendor/login" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", background: "linear-gradient(135deg,#f8faff,#f5f3ff)", borderRadius: "16px", border: "1.5px solid rgba(37,99,235,0.12)", transition: "all 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.3)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.12)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                    <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 4px 12px rgba(37,99,235,0.3)" }}>
                      <Store size={17} color="white"/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: 0 }}>Vendor Dashboard</p>
                      <p style={{ fontSize: "11px", color: "#64748b", margin: "1px 0 0" }}>Manage your store & installments</p>
                    </div>
                    <ChevronRight size={16} color="#94a3b8"/>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .left-panel { display: none; }
        @media (min-width: 900px) { .left-panel { display: block; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popUp { from { opacity: 0; transform: translate(-50%,-46%) scale(0.92); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 60%,100% { transform: translateX(200%); } }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); } 50% { box-shadow: 0 0 0 12px rgba(255,255,255,0); } }
        input::placeholder { color: #c0ccd8; }
      `}</style>
    </div>
  );
};

export default LoginPage;
