import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import {
  ChevronRight, ChevronLeft, Shield, CreditCard, User, Phone,
  MapPin, Upload, CheckCircle2, Lock, Zap, Clock, BadgeCheck,
  Camera, FileText, Building2, ArrowRight, Star, Package,
  ChevronDown, AlertCircle, X, Check,
} from "lucide-react";
import { featuredProducts, formatPrice, getMonthlyInstallment } from "@/data/products";

/* ─── Types ── */
type Step = 1 | 2 | 3 | 4;

/* ─── Installment options ── */
const INSTALLMENT_OPTIONS = [
  { months: 3,  label: "3 Months",  badge: "Fastest", badgeColor: "#f59e0b" },
  { months: 6,  label: "6 Months",  badge: "Popular", badgeColor: "#10b981" },
  { months: 12, label: "12 Months", badge: "Best Value", badgeColor: "#2563eb" },
  { months: 24, label: "24 Months", badge: "Low Monthly", badgeColor: "#8b5cf6" },
];

/* ─── Pakistan cities ── */
const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala"];

/* ─── Step indicator ── */
const STEPS = [
  { id: 1, label: "Plan",        icon: CreditCard },
  { id: 2, label: "Identity",    icon: User },
  { id: 3, label: "Delivery",    icon: MapPin },
  { id: 4, label: "Confirm",     icon: CheckCircle2 },
];

/* ─── Animated counter ── */
function Counter({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * value));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value, duration]);
  return <>{display.toLocaleString()}</>;
}

/* ─── File Upload Field ── */
function UploadField({ label, hint, uploaded, onUpload }: {
  label: string; hint: string; uploaded: boolean; onUpload: () => void;
}) {
  return (
    <button
      onClick={onUpload}
      type="button"
      style={{
        width: "100%",
        border: `2px dashed ${uploaded ? "#10b981" : "rgba(37,99,235,0.25)"}`,
        borderRadius: 16,
        padding: "18px 20px",
        background: uploaded ? "rgba(16,185,129,0.04)" : "rgba(37,99,235,0.02)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 14,
        transition: "all 0.2s",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: uploaded ? "rgba(16,185,129,0.12)" : "rgba(37,99,235,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      }}>
        {uploaded
          ? <CheckCircle2 size={20} color="#10b981" />
          : <Upload size={18} color="#2563eb" />
        }
      </div>
      <div style={{ textAlign: "left", flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: uploaded ? "#059669" : "#1e293b", margin: 0 }}>
          {uploaded ? "Uploaded ✓" : label}
        </p>
        <p style={{ fontSize: 11, color: "#94a3b8", margin: "2px 0 0" }}>{hint}</p>
      </div>
      {!uploaded && (
        <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", border: "1.5px solid rgba(37,99,235,0.3)", padding: "4px 10px", borderRadius: 8 }}>
          Browse
        </span>
      )}
    </button>
  );
}

/* ─── Input Field ── */
function Field({
  label, placeholder, value, onChange, type = "text", icon: Icon, error,
}: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string;
  icon?: React.ComponentType<any>; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.03em", fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon size={15} color={focused ? "#2563eb" : "#94a3b8"}
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.2s" }}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: 46,
            paddingLeft: Icon ? 40 : 14,
            paddingRight: 14,
            borderRadius: 12,
            border: `1.5px solid ${error ? "#ef4444" : focused ? "#2563eb" : "#e2e8f0"}`,
            fontSize: 13,
            fontFamily: "'DM Sans', sans-serif",
            color: "#0f172a",
            background: focused ? "#fafbff" : "#f8fafc",
            outline: "none",
            transition: "all 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      {error && <p style={{ fontSize: 11, color: "#ef4444", margin: 0, fontFamily: "'DM Sans', sans-serif" }}>{error}</p>}
    </div>
  );
}

/* ─── Select Field ── */
function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", letterSpacing: "0.03em", fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <MapPin size={15} color="#94a3b8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <ChevronDown size={14} color="#94a3b8" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", height: 46, paddingLeft: 40, paddingRight: 36,
            borderRadius: 12, border: "1.5px solid #e2e8f0", fontSize: 13,
            fontFamily: "'DM Sans', sans-serif", color: "#0f172a",
            background: "#f8fafc", outline: "none", appearance: "none",
            boxSizing: "border-box",
          }}
        >
          <option value="">Select city…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

/* ─── Glowing orb ── */
const Orb = ({ color, size, top, left, right, opacity = 0.18 }: any) => (
  <div style={{
    position: "absolute", width: size, height: size, borderRadius: "50%",
    background: color, filter: `blur(${size * 0.5}px)`,
    opacity, top, left, right, pointerEvents: "none",
  }} />
);

/* ══════════════════════════════════════════════════════════
   MAIN CHECKOUT PAGE
══════════════════════════════════════════════════════════ */
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const vendorName = searchParams.get("vendor") || "FlexiBerry Official";

  const product = featuredProducts.find(p => p.id === productId) || featuredProducts[0];

  /* ── State ── */
  const [step, setStep] = useState<Step>(1);
  const [selectedMonths, setSelectedMonths] = useState(12);
  const [animating, setAnimating] = useState(false);

  /* Step 2: KYC */
  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [dob, setDob] = useState("");
  const [mobileNum, setMobileNum] = useState("");
  const [email, setEmail] = useState("");
  const [cnicFrontUploaded, setCnicFrontUploaded] = useState(false);
  const [cnicBackUploaded, setCnicBackUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  /* Step 3: Delivery */
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");

  /* Step 4: confirmed */
  const [confirmed, setConfirmed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const monthly = product.price / selectedMonths;
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };

  /* Validation */
  const step2Valid = fullName.length > 2 && cnic.length >= 13 && mobileNum.length >= 11
    && cnicFrontUploaded && cnicBackUploaded;
  const step3Valid = address.length > 5 && city.length > 0;

  /* Transitions */
  const goTo = (s: Step) => {
    setAnimating(true);
    setTimeout(() => { setStep(s); setAnimating(false); }, 220);
  };

  /* Confirm order */
  const handleConfirm = () => {
    setProcessing(true);
    let c = 5;
    const t = setInterval(() => {
      c--;
      setCountdown(c);
      if (c === 0) {
        clearInterval(t);
        setConfirmed(true);
        setProcessing(false);
      }
    }, 1000);
  };

  /* CNIC formatter */
  const formatCNIC = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 13);
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return `${digits.slice(0,5)}-${digits.slice(5)}`;
    return `${digits.slice(0,5)}-${digits.slice(5,12)}-${digits.slice(12)}`;
  };

  /* Progress % */
  const progress = ((step - 1) / 3) * 100;

  /* ─────────────────────────────── SUCCESS ─── */
  if (confirmed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0f1e", display: "flex", flexDirection: "column", ...F }}>
        <Header />
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 20px", position: "relative", overflow: "hidden",
        }}>
          <Orb color="#10b981" size={400} top={-100} left="50%" opacity={0.12} />
          <Orb color="#2563eb" size={300} top="60%" left={-100} opacity={0.1} />

          <div style={{
            maxWidth: 520, width: "100%", textAlign: "center",
            background: "rgba(255,255,255,0.04)", backdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 32, padding: 48,
            position: "relative", zIndex: 1,
          }}>
            {/* Animated ring */}
            <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 24px" }}>
              <svg width="96" height="96" viewBox="0 0 96 96" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                <circle cx="48" cy="48" r="42" stroke="rgba(16,185,129,0.2)" strokeWidth="4" fill="none" />
                <circle cx="48" cy="48" r="42" stroke="#10b981" strokeWidth="4" fill="none"
                  strokeDasharray="263.9" strokeDashoffset="0" strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s ease" }}
                />
              </svg>
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(16,185,129,0.12)", borderRadius: "50%",
              }}>
                <CheckCircle2 size={40} color="#10b981" />
              </div>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "#10b981", textTransform: "uppercase", marginBottom: 12 }}>
              Application Submitted
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 900, color: "white", margin: "0 0 12px", lineHeight: 1.2 }}>
              You're all set! 🎉
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", margin: "0 0 28px", lineHeight: 1.7 }}>
              Your installment application for <strong style={{ color: "white" }}>{product.name}</strong> has been submitted to <strong style={{ color: "white" }}>{vendorName}</strong>. You'll receive confirmation within 24 hours.
            </p>

            {/* Summary */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 20, marginBottom: 24, textAlign: "left" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  { label: "Product", val: product.name.slice(0, 24) + "…" },
                  { label: "Plan", val: `${selectedMonths} Months` },
                  { label: "Monthly", val: `PKR ${Math.round(monthly).toLocaleString()}` },
                  { label: "Total", val: formatPrice(product.price) },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: "0 0 3px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "white", margin: 0 }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, textAlign: "left" }}>
              {[
                { emoji: "📧", text: "Confirmation email sent to your inbox", done: true },
                { emoji: "🔍", text: "KYC verification in progress (24 hrs)", done: false },
                { emoji: "📦", text: "Product dispatch after approval", done: false },
                { emoji: "🚚", text: "Free home delivery within 48 hrs", done: false },
              ].map(({ emoji, text, done }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, background: done ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${done ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.06)"}` }}>
                  <span style={{ fontSize: 18 }}>{emoji}</span>
                  <span style={{ fontSize: 12, color: done ? "#6ee7b7" : "rgba(255,255,255,0.5)", fontWeight: done ? 600 : 400 }}>{text}</span>
                  {done && <Check size={14} color="#10b981" style={{ marginLeft: "auto" }} />}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <Link to="/" style={{
                flex: 1, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 700, textDecoration: "none", transition: "all 0.2s",
              }}>
                Back Home
              </Link>
              <Link to="/dashboard" style={{
                flex: 2, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: "linear-gradient(135deg, #10b981, #059669)",
                color: "white", fontSize: 13, fontWeight: 800, textDecoration: "none",
                boxShadow: "0 8px 24px rgba(16,185,129,0.35)", transition: "all 0.2s",
              }}>
                Track Application <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────── MAIN LAYOUT ─── */
  return (
    <div style={{ minHeight: "100vh", background: "#080c18", ...F }}>
      <Header />

      {/* Top progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #2563eb, #7c3aed, #10b981)",
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 12px rgba(37,99,235,0.6)",
        }} />
      </div>

      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "40px 20px 80px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28, alignItems: "start" }}>

        {/* ══════════ LEFT COLUMN ══════════ */}
        <div>

          {/* Step indicator */}
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "6px 8px", marginBottom: 28, width: "fit-content",
          }}>
            {STEPS.map((s, i) => {
              const active = step === s.id;
              const done = step > s.id;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 14px", borderRadius: 14, transition: "all 0.3s",
                    background: active ? "linear-gradient(135deg, #2563eb22, #7c3aed22)" : "transparent",
                    border: active ? "1px solid rgba(37,99,235,0.4)" : "1px solid transparent",
                  }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
                      background: done ? "#10b981" : active ? "linear-gradient(135deg, #2563eb, #7c3aed)" : "rgba(255,255,255,0.06)",
                      transition: "all 0.3s", flexShrink: 0,
                    }}>
                      {done
                        ? <Check size={13} color="white" />
                        : <s.icon size={13} color={active ? "white" : "rgba(255,255,255,0.35)"} />
                      }
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: active ? 700 : 500,
                      color: active ? "white" : done ? "#6ee7b7" : "rgba(255,255,255,0.35)",
                      transition: "all 0.3s",
                    }}>
                      {s.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 16, height: 1, background: "rgba(255,255,255,0.1)", margin: "0 2px" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Card container */}
          <div style={{
            background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.08)", borderRadius: 28,
            overflow: "hidden", position: "relative",
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(10px)" : "none",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}>
            {/* Card inner glow */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), rgba(124,58,237,0.5), transparent)" }} />

            {/* ══ STEP 1: PLAN SELECTION ══ */}
            {step === 1 && (
              <div style={{ padding: "36px 36px 32px" }}>
                <div style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CreditCard size={17} color="white" />
                    </div>
                    <div>
                      <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>Choose Your Plan</h2>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>0% markup — pay in easy monthly installments</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
                  {INSTALLMENT_OPTIONS.map(opt => {
                    const selected = selectedMonths === opt.months;
                    const monthly = Math.round(product.price / opt.months);
                    return (
                      <button
                        key={opt.months}
                        onClick={() => setSelectedMonths(opt.months)}
                        style={{
                          padding: "20px 18px",
                          borderRadius: 18,
                          border: `1.5px solid ${selected ? "rgba(37,99,235,0.7)" : "rgba(255,255,255,0.08)"}`,
                          background: selected ? "linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.12))" : "rgba(255,255,255,0.03)",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.2s",
                          boxShadow: selected ? "0 0 0 1px rgba(37,99,235,0.3), 0 8px 32px rgba(37,99,235,0.12)" : "none",
                          position: "relative",
                          overflow: "hidden",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {/* Badge */}
                        <div style={{
                          position: "absolute", top: 12, right: 12,
                          fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 20,
                          background: `${opt.badgeColor}22`, color: opt.badgeColor,
                          border: `1px solid ${opt.badgeColor}44`,
                          letterSpacing: "0.06em", textTransform: "uppercase",
                        }}>
                          {opt.badge}
                        </div>

                        {/* Radio */}
                        <div style={{
                          width: 18, height: 18, borderRadius: "50%",
                          border: `2px solid ${selected ? "#2563eb" : "rgba(255,255,255,0.2)"}`,
                          marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center",
                          background: selected ? "#2563eb" : "transparent",
                          transition: "all 0.2s",
                        }}>
                          {selected && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                        </div>

                        <p style={{ fontSize: 24, fontWeight: 900, color: "white", margin: "0 0 2px", lineHeight: 1 }}>
                          PKR {monthly.toLocaleString()}
                        </p>
                        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: "0 0 10px" }}>per month</p>
                        <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                          {opt.label} · Total: {formatPrice(product.price)}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* 0% markup callout */}
                <div style={{
                  background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)",
                  borderRadius: 14, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 28,
                }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shield size={17} color="#10b981" />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#6ee7b7", margin: "0 0 2px" }}>Zero Markup Guarantee</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: 0 }}>
                      You pay exactly PKR {product.price.toLocaleString()} — split into {selectedMonths} equal payments. No hidden fees.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => goTo(2)}
                  style={{
                    width: "100%", height: 52, borderRadius: 14,
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    border: "none", cursor: "pointer", color: "white", fontSize: 14, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    boxShadow: "0 8px 28px rgba(37,99,235,0.4)", transition: "all 0.2s",
                    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.01em",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  Continue to Verification <ArrowRight size={17} />
                </button>
              </div>
            )}

            {/* ══ STEP 2: KYC IDENTITY ══ */}
            {step === 2 && (
              <div style={{ padding: "36px 36px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Shield size={17} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>KYC Verification</h2>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>Required to approve your installment plan</p>
                  </div>
                </div>

                {/* Info banner */}
                <div style={{
                  background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)",
                  borderRadius: 12, padding: "12px 16px", marginBottom: 24,
                  display: "flex", alignItems: "flex-start", gap: 10,
                }}>
                  <AlertCircle size={15} color="#60a5fa" style={{ marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
                    Your information is encrypted and only shared with the vendor for installment approval. We never sell your data.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="Full Name (as per CNIC)" placeholder="Muhammad Ali Khan" value={fullName} onChange={setFullName} icon={User} />
                    <Field label="CNIC Number" placeholder="12345-1234567-1" value={cnic}
                      onChange={v => setCnic(formatCNIC(v))} icon={FileText} />
                    <Field label="Date of Birth" placeholder="DD/MM/YYYY" value={dob} onChange={setDob} type="date" icon={Clock} />
                    <Field label="Mobile Number" placeholder="0300-1234567" value={mobileNum} onChange={setMobileNum} icon={Phone} />
                    <div style={{ gridColumn: "1 / -1" }}>
                      <Field label="Email Address (optional)" placeholder="you@example.com" value={email} onChange={setEmail} type="email" />
                    </div>
                  </div>
                </div>

                {/* Document uploads */}
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Required Documents
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <UploadField label="CNIC — Front Side" hint="Clear photo, all corners visible" uploaded={cnicFrontUploaded} onUpload={() => setCnicFrontUploaded(true)} />
                    <UploadField label="CNIC — Back Side" hint="Clear photo, all corners visible" uploaded={cnicBackUploaded} onUpload={() => setCnicBackUploaded(true)} />
                    <UploadField label="Selfie with CNIC (optional)" hint="Hold your CNIC next to your face" uploaded={selfieUploaded} onUpload={() => setSelfieUploaded(true)} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => goTo(1)} style={{
                    height: 50, paddingInline: 24, borderRadius: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => step2Valid && goTo(3)}
                    disabled={!step2Valid}
                    style={{
                      flex: 1, height: 50, borderRadius: 14,
                      background: step2Valid ? "linear-gradient(135deg, #7c3aed, #2563eb)" : "rgba(255,255,255,0.07)",
                      border: "none", cursor: step2Valid ? "pointer" : "not-allowed",
                      color: step2Valid ? "white" : "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      boxShadow: step2Valid ? "0 8px 28px rgba(124,58,237,0.35)" : "none",
                      transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Delivery Details <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEP 3: DELIVERY ══ */}
            {step === 3 && (
              <div style={{ padding: "36px 36px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={17} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>Delivery Address</h2>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>Free nationwide delivery · 24–48 hours</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
                  <Field label="Full Street Address" placeholder="House 42, Street 7, DHA Phase 5" value={address} onChange={setAddress} icon={MapPin} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <SelectField label="City" value={city} onChange={setCity} options={CITIES} />
                    <Field label="Nearby Landmark (optional)" placeholder="Near Packages Mall" value={landmark} onChange={setLandmark} icon={Building2} />
                  </div>
                </div>

                {/* Delivery promise */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
                  {[
                    { icon: "🚚", title: "Free Delivery", sub: "No shipping cost" },
                    { icon: "⏱️", title: "24–48 Hours", sub: "After approval" },
                    { icon: "📦", title: "Original Pack", sub: "Sealed & verified" },
                  ].map(({ icon, title, sub }) => (
                    <div key={title} style={{
                      background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14, padding: "14px 12px", textAlign: "center",
                    }}>
                      <span style={{ fontSize: 22, display: "block", marginBottom: 6 }}>{icon}</span>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "white", margin: "0 0 2px" }}>{title}</p>
                      <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: 0 }}>{sub}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => goTo(2)} style={{
                    height: 50, paddingInline: 24, borderRadius: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={() => step3Valid && goTo(4)}
                    disabled={!step3Valid}
                    style={{
                      flex: 1, height: 50, borderRadius: 14,
                      background: step3Valid ? "linear-gradient(135deg, #059669, #10b981)" : "rgba(255,255,255,0.07)",
                      border: "none", cursor: step3Valid ? "pointer" : "not-allowed",
                      color: step3Valid ? "white" : "rgba(255,255,255,0.3)", fontSize: 14, fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      boxShadow: step3Valid ? "0 8px 28px rgba(16,185,129,0.3)" : "none",
                      transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Review & Confirm <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEP 4: REVIEW & SUBMIT ══ */}
            {step === 4 && (
              <div style={{ padding: "36px 36px 32px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#f59e0b,#d97706)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle2 size={17} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: "white", margin: 0, letterSpacing: "-0.02em" }}>Review & Submit</h2>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: 0 }}>Verify all details before submitting</p>
                  </div>
                </div>

                {/* Review blocks */}
                {[
                  {
                    title: "Installment Plan",
                    color: "#2563eb",
                    items: [
                      { label: "Duration", val: `${selectedMonths} Months` },
                      { label: "Monthly Payment", val: `PKR ${Math.round(monthly).toLocaleString()}` },
                      { label: "Total Amount", val: formatPrice(product.price) },
                      { label: "Markup", val: "0% — Free" },
                    ],
                  },
                  {
                    title: "Identity (KYC)",
                    color: "#7c3aed",
                    items: [
                      { label: "Full Name", val: fullName || "—" },
                      { label: "CNIC", val: cnic || "—" },
                      { label: "Mobile", val: mobileNum || "—" },
                      { label: "Documents", val: `${[cnicFrontUploaded, cnicBackUploaded, selfieUploaded].filter(Boolean).length}/3 uploaded` },
                    ],
                  },
                  {
                    title: "Delivery",
                    color: "#10b981",
                    items: [
                      { label: "Address", val: address || "—" },
                      { label: "City", val: city || "—" },
                      { label: "Landmark", val: landmark || "Not specified" },
                      { label: "Estimate", val: "24–48 hrs after approval" },
                    ],
                  },
                ].map(({ title, color, items }, gi) => (
                  <div key={title} style={{
                    background: "rgba(255,255,255,0.025)", border: `1px solid ${color}22`,
                    borderRadius: 16, marginBottom: 14, overflow: "hidden",
                  }}>
                    <div style={{ padding: "10px 18px", borderBottom: `1px solid ${color}18`, background: `${color}10` }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</span>
                    </div>
                    <div style={{ padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {items.map(({ label, val }) => (
                        <div key={label}>
                          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                          <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: 0 }}>{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Terms */}
                <div style={{
                  background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)",
                  borderRadius: 12, padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10, alignItems: "flex-start",
                }}>
                  <AlertCircle size={14} color="#f59e0b" style={{ marginTop: 1, flexShrink: 0 }} />
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: 0, lineHeight: 1.6 }}>
                    By submitting, you authorize FlexiBerry and <strong style={{ color: "rgba(255,255,255,0.65)" }}>{vendorName}</strong> to review your KYC documents and process your installment application.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 12 }}>
                  <button onClick={() => goTo(3)} style={{
                    height: 52, paddingInline: 22, borderRadius: 14,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 13, fontWeight: 700,
                    display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif",
                  }}>
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={processing}
                    style={{
                      flex: 1, height: 52, borderRadius: 14,
                      background: processing ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg, #f59e0b, #d97706)",
                      border: "none", cursor: processing ? "not-allowed" : "pointer",
                      color: processing ? "rgba(255,255,255,0.5)" : "white", fontSize: 14, fontWeight: 800,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      boxShadow: processing ? "none" : "0 8px 28px rgba(245,158,11,0.4)",
                      transition: "all 0.2s", fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {processing
                      ? <>
                          <div style={{ width: 18, height: 18, borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.3)", borderTopColor: "white", animation: "spin 0.8s linear infinite" }} />
                          Submitting… {countdown}s
                        </>
                      : <><Zap size={17} /> Submit Application</>
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══════════ RIGHT: ORDER SUMMARY ══════════ */}
        <div style={{ position: "sticky", top: 24 }}>

          {/* Product card */}
          <div style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, overflow: "hidden", marginBottom: 16,
          }}>
            {/* Product image */}
            <div style={{ background: "rgba(255,255,255,0.04)", padding: 24, display: "flex", justifyContent: "center", position: "relative" }}>
              <Orb color="#2563eb" size={180} top="10%" left="20%" opacity={0.08} />
              <img
                src={product.image}
                alt={product.name}
                style={{ width: 140, height: 140, objectFit: "contain", position: "relative", zIndex: 1 }}
              />
              <div style={{
                position: "absolute", top: 12, left: 12,
                background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
                borderRadius: 8, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5,
              }}>
                <BadgeCheck size={11} color="#10b981" />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#6ee7b7" }}>Verified</span>
              </div>
            </div>

            <div style={{ padding: "20px 22px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {vendorName}
              </p>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 6px", lineHeight: 1.4 }}>
                {product.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={11} color="#f59e0b" fill={s <= Math.round(product.rating) ? "#f59e0b" : "none"} />
                ))}
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginLeft: 4 }}>({product.reviews} reviews)</span>
              </div>

              {/* Price breakdown */}
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Product Price</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "white" }}>{formatPrice(product.price)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Delivery</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>FREE</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Markup / Interest</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>PKR 0</span>
                </div>
                <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "12px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)" }}>Monthly Payment</span>
                  <span style={{ fontSize: 22, fontWeight: 900, color: "white", letterSpacing: "-0.02em" }}>
                    PKR <Counter value={Math.round(product.price / selectedMonths)} />
                  </span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right", margin: "3px 0 0" }}>
                  × {selectedMonths} months
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "18px 20px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: Lock, text: "256-bit encrypted checkout", color: "#10b981" },
                { icon: Shield, text: "KYC-verified vendor & buyer", color: "#2563eb" },
                { icon: Package, text: "Original product, sealed packaging", color: "#7c3aed" },
                { icon: BadgeCheck, text: "7-day no-questions return policy", color: "#f59e0b" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={13} color={color} />
                  </div>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.45)", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .checkout-grid { grid-template-columns: 1fr !important; }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.4); }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
