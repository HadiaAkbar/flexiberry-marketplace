import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import {
  ChevronLeft, Shield, CreditCard, User, Phone,
  MapPin, Upload, CheckCircle2, Lock, Zap,
  FileText, Building2, ArrowRight, Star, Package,
  ChevronDown, AlertCircle, Check, Truck, BadgeCheck, Sparkles,
} from "lucide-react";
import { featuredProducts, formatPrice } from "@/data/products";

type Step = 1 | 2 | 3 | 4;

/* ─── palette ─── */
const C = {
  bg:        "#f8faff",
  card:      "#ffffff",
  border:    "#eaecf4",
  muted:     "#8892a4",
  body:      "#3d4a5c",
  heading:   "#111827",
  sky:       "#0ea5e9",
  skyLight:  "#e0f5ff",
  violet:    "#7c3aed",
  violetLight:"#ede9fe",
  coral:     "#f43f5e",
  coralLight:"#fff1f2",
  amber:     "#f59e0b",
  amberLight:"#fffbeb",
  green:     "#10b981",
  greenLight:"#ecfdf5",
};

const INSTALLMENT_OPTIONS = [
  { months: 3,  label: "3 Months",  badge: "Fastest",    accent: C.amber,  accentLight: C.amberLight,  gradient: "linear-gradient(135deg,#f59e0b,#fb923c)" },
  { months: 6,  label: "6 Months",  badge: "Popular",    accent: C.green,  accentLight: C.greenLight,  gradient: "linear-gradient(135deg,#10b981,#06b6d4)" },
  { months: 12, label: "12 Months", badge: "Best Value", accent: C.sky,    accentLight: C.skyLight,    gradient: "linear-gradient(135deg,#0ea5e9,#6366f1)" },
  { months: 24, label: "24 Months", badge: "Lowest EMI", accent: C.violet, accentLight: C.violetLight, gradient: "linear-gradient(135deg,#7c3aed,#ec4899)" },
];

const CITIES = ["Lahore","Karachi","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Gujranwala"];

const STEPS = [
  { id: 1, label: "Plan",     icon: CreditCard   },
  { id: 2, label: "Identity", icon: User         },
  { id: 3, label: "Delivery", icon: MapPin       },
  { id: 4, label: "Confirm",  icon: CheckCircle2 },
];

/* ─── Animated number ─── */
function Counter({ value, duration = 600 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = performance.now();
    const from  = display;
    const tick  = (now: number) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * ease));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

/* ─── Upload row ─── */
function UploadField({ label, hint, uploaded, onUpload }: {
  label: string; hint: string; uploaded: boolean; onUpload: () => void;
}) {
  return (
    <button onClick={onUpload} type="button"
      style={{
        width: "100%", border: `2px dashed ${uploaded ? C.green : "#d0d8e8"}`,
        borderRadius: 16, padding: "14px 18px",
        background: uploaded ? "#f0fdf8" : "#fafbff",
        cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
        transition: "all 0.18s", fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
      onMouseEnter={e => { if (!uploaded) { (e.currentTarget as HTMLElement).style.borderColor = C.sky; (e.currentTarget as HTMLElement).style.background = C.skyLight; } }}
      onMouseLeave={e => { if (!uploaded) { (e.currentTarget as HTMLElement).style.borderColor = "#d0d8e8"; (e.currentTarget as HTMLElement).style.background = "#fafbff"; } }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 12, flexShrink: 0,
        background: uploaded ? "#d1fae5" : "#e0f2fe",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {uploaded ? <Check size={18} color={C.green} strokeWidth={2.5} /> : <Upload size={17} color={C.sky} />}
      </div>
      <div style={{ flex: 1, textAlign: "left" }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: uploaded ? "#065f46" : C.heading }}>
          {uploaded ? "Uploaded ✓" : label}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: C.muted }}>{hint}</p>
      </div>
      {!uploaded && (
        <span style={{ fontSize: 11, fontWeight: 700, color: C.sky, background: C.skyLight, padding: "5px 12px", borderRadius: 8, flexShrink: 0 }}>
          Browse
        </span>
      )}
    </button>
  );
}

/* ─── Input ─── */
function Field({ label, placeholder, value, onChange, type = "text", icon: Icon }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; type?: string; icon?: React.ComponentType<any>;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11.5, fontWeight: 700, color: C.body, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && (
          <Icon size={14} color={focused ? C.sky : "#b8c2d4"}
            style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", transition: "color 0.15s" }}
          />
        )}
        <input
          type={type} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            width: "100%", height: 46, paddingLeft: Icon ? 38 : 15, paddingRight: 15,
            borderRadius: 12, border: `1.5px solid ${focused ? C.sky : C.border}`,
            fontSize: 13.5, fontFamily: "'Plus Jakarta Sans', sans-serif", color: C.heading,
            background: "#fff", outline: "none", transition: "all 0.15s",
            boxShadow: focused ? `0 0 0 4px ${C.skyLight}` : "none",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Select ─── */
function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 11.5, fontWeight: 700, color: C.body, letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <MapPin size={14} color="#b8c2d4" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <ChevronDown size={13} color="#b8c2d4" style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
        <select value={value} onChange={e => onChange(e.target.value)} style={{
          width: "100%", height: 46, paddingLeft: 38, paddingRight: 36,
          borderRadius: 12, border: `1.5px solid ${C.border}`, fontSize: 13.5,
          fontFamily: "'Plus Jakarta Sans', sans-serif", color: value ? C.heading : "#b8c2d4",
          background: "#fff", outline: "none", appearance: "none", boxSizing: "border-box",
          cursor: "pointer",
        }}>
          <option value="">Select city…</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}

/* ─── Pill badge ─── */
function Pill({ text, color, bg }: { text: string; color: string; bg: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 800, color, background: bg, padding: "3px 9px", borderRadius: 20, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>
      {text}
    </span>
  );
}

/* ─── Nav button (Back) ─── */
function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      height: 50, paddingInline: 22, borderRadius: 14, background: "#f4f6fb",
      border: `1.5px solid ${C.border}`, color: C.body, cursor: "pointer",
      fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 7,
      fontFamily: "'Plus Jakarta Sans', sans-serif", transition: "all 0.15s",
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#eaecf4"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f4f6fb"; }}
    >
      <ChevronLeft size={16} /> Back
    </button>
  );
}

/* ─── Primary CTA button ─── */
function PrimaryBtn({ label, onClick, disabled, gradient, shadow }: {
  label: React.ReactNode; onClick: () => void; disabled?: boolean;
  gradient: string; shadow: string;
}) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      flex: 1, height: 50, borderRadius: 14, border: "none",
      background: disabled ? "#eef0f6" : gradient,
      color: disabled ? "#b8c2d4" : "white", fontSize: 14, fontWeight: 800,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
      cursor: disabled ? "not-allowed" : "pointer",
      boxShadow: disabled ? "none" : shadow,
      transition: "all 0.18s", fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}
      onMouseEnter={e => { if (!disabled) { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.filter = "brightness(1.06)"; } }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.filter = "none"; }}
    >
      {label}
    </button>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const productId  = searchParams.get("productId") || "";
  const vendorName = searchParams.get("vendor")    || "FlexiBerry Official";
  const product    = featuredProducts.find(p => p.id === productId) || featuredProducts[0];

  const [step,           setStep]           = useState<Step>(1);
  const [animating,      setAnimating]      = useState(false);
  const [selectedMonths, setSelectedMonths] = useState(12);

  const [fullName,          setFullName]          = useState("");
  const [cnic,              setCnic]              = useState("");
  const [dob,               setDob]               = useState("");
  const [mobileNum,         setMobileNum]         = useState("");
  const [email,             setEmail]             = useState("");
  const [cnicFrontUploaded, setCnicFrontUploaded] = useState(false);
  const [cnicBackUploaded,  setCnicBackUploaded]  = useState(false);
  const [selfieUploaded,    setSelfieUploaded]    = useState(false);

  const [address,  setAddress]  = useState("");
  const [city,     setCity]     = useState("");
  const [landmark, setLandmark] = useState("");

  const [processing, setProcessing] = useState(false);
  const [confirmed,  setConfirmed]  = useState(false);
  const [countdown,  setCountdown]  = useState(4);

  const monthly    = Math.round(product.price / selectedMonths);
  const step2Valid = fullName.length > 2 && cnic.length >= 13 && mobileNum.length >= 10 && cnicFrontUploaded && cnicBackUploaded;
  const step3Valid = address.length > 5 && city.length > 0;
  const opt        = INSTALLMENT_OPTIONS.find(o => o.months === selectedMonths)!;

  const goTo = (s: Step) => {
    setAnimating(true);
    setTimeout(() => { setStep(s); setAnimating(false); }, 180);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleConfirm = () => {
    setProcessing(true);
    let c = 4;
    const t = setInterval(() => {
      setCountdown(c);
      c--;
      if (c < 0) { clearInterval(t); setConfirmed(true); setProcessing(false); }
    }, 1000);
  };

  const formatCNIC = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 13);
    if (d.length <= 5)  return d;
    if (d.length <= 12) return `${d.slice(0,5)}-${d.slice(5)}`;
    return `${d.slice(0,5)}-${d.slice(5,12)}-${d.slice(12)}`;
  };

  /* ── fonts + keyframes ── */
  const globalStyle = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    * { box-sizing: border-box; }
    body { background: #f8faff; }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeUp { from { opacity:0; transform:translateY(14px);} to { opacity:1; transform:none;} }
    @keyframes popIn { from { transform:scale(0.6); opacity:0; } to { transform:scale(1); opacity:1; } }
    @keyframes drawArc { from { stroke-dashoffset:251;} to { stroke-dashoffset:0;} }
    input[type="date"]::-webkit-calendar-picker-indicator { opacity:0.4; cursor:pointer; }
  `;

  /* ════════════════════════════════
     SUCCESS SCREEN
  ════════════════════════════════ */
  if (confirmed) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#f0f9ff,#f5f3ff,#fff7ed)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Header />
        <style>{globalStyle}</style>
        <div style={{ maxWidth: 520, margin: "0 auto", padding: "56px 20px", animation: "fadeUp 0.5s ease both" }}>
          <div style={{ background: "#fff", borderRadius: 28, padding: "48px 40px", boxShadow: "0 20px 60px rgba(14,165,233,0.1), 0 4px 16px rgba(0,0,0,0.05)", border: `1px solid ${C.border}`, textAlign: "center" }}>

            {/* ring + check */}
            <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 24px" }}>
              <svg width="96" height="96" style={{ position: "absolute", inset: 0 }}>
                <defs>
                  <linearGradient id="arc" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#7c3aed" />
                  </linearGradient>
                </defs>
                <circle cx="48" cy="48" r="40" fill="none" stroke="#f0f4ff" strokeWidth="5" />
                <circle cx="48" cy="48" r="40" fill="none" stroke="url(#arc)" strokeWidth="5"
                  strokeDasharray="251" strokeDashoffset="251" strokeLinecap="round"
                  style={{ transform: "rotate(-90deg)", transformOrigin: "48px 48px", animation: "drawArc 1s cubic-bezier(0.4,0,0.2,1) 0.1s forwards" }}
                />
              </svg>
              <div style={{
                position: "absolute", inset: 12, borderRadius: "50%",
                background: "linear-gradient(135deg,#0ea5e9,#7c3aed)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 28px rgba(14,165,233,0.4)",
                animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.6s both",
              }}>
                <Check size={32} color="white" strokeWidth={3} />
              </div>
            </div>

            <Pill text="Application Submitted" color="#059669" bg="#d1fae5" />
            <h1 style={{ fontSize: 28, fontWeight: 900, color: C.heading, margin: "14px 0 8px", letterSpacing: "-0.03em" }}>You're all set! 🎉</h1>
            <p style={{ fontSize: 14, color: C.body, margin: "0 0 28px", lineHeight: 1.7 }}>
              Your plan for <strong style={{ color: C.heading }}>{product.name}</strong> was sent to{" "}
              <strong style={{ color: C.sky }}>{vendorName}</strong>. Confirmation within 24 hrs.
            </p>

            {/* Payment pill */}
            <div style={{ background: "linear-gradient(135deg,#0ea5e9,#7c3aed)", borderRadius: 18, padding: "20px 22px", marginBottom: 22, color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ fontSize: 10, opacity: 0.65, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Monthly</p>
                <p style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>PKR {monthly.toLocaleString()}</p>
                <p style={{ fontSize: 11, opacity: 0.6, margin: "3px 0 0" }}>× {selectedMonths} months · 0% markup</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, opacity: 0.65, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</p>
                <p style={{ fontSize: 17, fontWeight: 800, margin: 0 }}>{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Timeline */}
            {[
              { e: "📧", t: "Confirmation email sent",       done: true  },
              { e: "🔍", t: "KYC review in progress",        done: false },
              { e: "📦", t: "Dispatch after approval",       done: false },
              { e: "🚚", t: "Free delivery in 24–48 hrs",    done: false },
            ].map(({ e, t, done }) => (
              <div key={t} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 15px", borderRadius: 12, marginBottom: 8,
                background: done ? "#f0fdf4" : "#fafbff", border: `1px solid ${done ? "#bbf7d0" : C.border}`,
              }}>
                <span style={{ fontSize: 18 }}>{e}</span>
                <span style={{ fontSize: 13, flex: 1, textAlign: "left", color: done ? "#065f46" : C.body, fontWeight: done ? 700 : 400 }}>{t}</span>
                {done && <Check size={14} color={C.green} strokeWidth={2.5} />}
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <Link to="/" style={{
                flex: 1, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                borderRadius: 13, border: `1.5px solid ${C.border}`, color: C.body, fontSize: 13, fontWeight: 700, textDecoration: "none",
              }}>← Home</Link>
              <Link to="/dashboard" style={{
                flex: 2, height: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                borderRadius: 13, background: "linear-gradient(135deg,#0ea5e9,#7c3aed)", color: "white",
                fontSize: 13, fontWeight: 800, textDecoration: "none", boxShadow: "0 8px 22px rgba(14,165,233,0.35)",
              }}>
                Track Application <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════
     MAIN LAYOUT
  ════════════════════════════════ */
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{globalStyle}</style>
      <Header />

      {/* Thin animated top bar */}
      <div style={{ height: 3, background: "#eaecf4" }}>
        <div style={{
          height: "100%", width: `${((step - 1) / 3) * 100}%`,
          background: opt.gradient, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: `0 0 8px ${opt.accent}99`,
        }} />
      </div>

      {/* ── Bright hero banner ── */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "18px 28px", display: "flex", alignItems: "center", gap: 18 }}>
          {/* Product thumbnail */}
          <div style={{
            width: 52, height: 52, borderRadius: 14, overflow: "hidden",
            background: "linear-gradient(135deg,#f0f9ff,#f5f3ff)",
            border: `1.5px solid ${C.border}`, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <img src={product.image} alt="" style={{ width: 42, height: 42, objectFit: "contain" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, margin: "0 0 2px", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Installment Checkout · {vendorName}
            </p>
            <h1 style={{ fontSize: 16, fontWeight: 800, color: C.heading, margin: 0, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.name}
            </h1>
          </div>
          {/* Secure badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#f0fdf4", border: `1px solid #bbf7d0`, borderRadius: 20, padding: "6px 14px", flexShrink: 0 }}>
            <Lock size={12} color={C.green} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#065f46" }}>Secured by FlexiBerry</span>
          </div>
          {/* Price chip */}
          <div style={{ background: opt.accentLight, border: `1px solid ${opt.accent}33`, borderRadius: 20, padding: "6px 16px", flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: opt.accent }}>PKR <Counter value={monthly} />/mo</span>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 28px 80px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

        {/* ══ LEFT ══ */}
        <div>
          {/* Step nav */}
          <div style={{
            display: "flex", alignItems: "center", background: "#fff",
            border: `1px solid ${C.border}`, borderRadius: 20, padding: "5px 6px",
            marginBottom: 20, width: "fit-content", gap: 2,
            boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
          }}>
            {STEPS.map((s, i) => {
              const active = step === s.id;
              const done   = step > s.id;
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 7, padding: "7px 16px", borderRadius: 14,
                    background: active ? opt.gradient : done ? "#f0fdf4" : "transparent",
                    transition: "all 0.25s",
                  }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                      background: active ? "rgba(255,255,255,0.25)" : done ? C.green : "#f0f4f8",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      {done
                        ? <Check size={12} color="white" strokeWidth={3} />
                        : <s.icon size={12} color={active ? "white" : C.muted} />
                      }
                    </div>
                    <span style={{
                      fontSize: 12.5, fontWeight: active || done ? 700 : 500,
                      color: active ? "white" : done ? "#065f46" : C.muted,
                    }}>{s.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 10, height: 1.5, background: done ? "#bbf7d0" : C.border, margin: "0 2px" }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Content card ── */}
          <div style={{
            background: "#fff", borderRadius: 24, border: `1px solid ${C.border}`,
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)", overflow: "hidden",
            opacity: animating ? 0 : 1, transform: animating ? "translateY(10px)" : "none",
            transition: "opacity 0.18s, transform 0.18s",
          }}>
            {/* Gradient top stripe — changes per step */}
            <div style={{ height: 4, background: opt.gradient }} />

            {/* ─── STEP 1: Plan ─── */}
            {step === 1 && (
              <div style={{ padding: "32px 34px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: opt.gradient, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 6px 18px ${opt.accent}44`, flexShrink: 0 }}>
                    <CreditCard size={20} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: C.heading, margin: 0, letterSpacing: "-0.02em" }}>Choose Your Plan</h2>
                    <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>0% markup · split into equal payments</p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Pill text="Zero Interest" color="#065f46" bg="#d1fae5" />
                  </div>
                </div>

                {/* Plan cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 26 }}>
                  {INSTALLMENT_OPTIONS.map(o => {
                    const sel = selectedMonths === o.months;
                    const mo  = Math.round(product.price / o.months);
                    return (
                      <button key={o.months} onClick={() => setSelectedMonths(o.months)}
                        style={{
                          padding: "22px 20px", borderRadius: 20, cursor: "pointer", textAlign: "left",
                          border: `2px solid ${sel ? o.accent : C.border}`,
                          background: sel ? o.accentLight : "#fafbff",
                          transition: "all 0.18s", position: "relative", overflow: "hidden",
                          fontFamily: "'Plus Jakarta Sans', sans-serif",
                          boxShadow: sel ? `0 6px 22px ${o.accent}22` : "0 1px 4px rgba(0,0,0,0.03)",
                        }}
                        onMouseEnter={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = o.accent; (e.currentTarget as HTMLElement).style.background = o.accentLight; } }}
                        onMouseLeave={e => { if (!sel) { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.background = "#fafbff"; } }}
                      >
                        {/* top accent line */}
                        {sel && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: o.gradient }} />}

                        {/* badge */}
                        <div style={{ position: "absolute", top: 13, right: 13 }}>
                          <Pill text={o.badge} color={o.accent} bg={o.accentLight} />
                        </div>

                        {/* radio */}
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%",
                          border: `2px solid ${sel ? o.accent : "#d0d8e8"}`,
                          background: sel ? o.accent : "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginBottom: 14, transition: "all 0.15s",
                        }}>
                          {sel && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff" }} />}
                        </div>

                        <p style={{ fontSize: 27, fontWeight: 900, color: C.heading, margin: "0 0 2px", letterSpacing: "-0.03em", lineHeight: 1 }}>
                          PKR {mo.toLocaleString()}
                        </p>
                        <p style={{ fontSize: 12, color: C.muted, margin: "0 0 8px" }}>per month</p>
                        <p style={{ fontSize: 12.5, fontWeight: 600, color: C.body, margin: 0 }}>
                          {o.label} &nbsp;·&nbsp; {formatPrice(product.price)} total
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Zero markup callout */}
                <div style={{ display: "flex", gap: 14, alignItems: "center", background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 16, padding: "16px 20px", marginBottom: 26 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Shield size={20} color={C.green} />
                  </div>
                  <div>
                    <p style={{ margin: "0 0 3px", fontSize: 13.5, fontWeight: 800, color: "#065f46" }}>Zero Markup Guarantee</p>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#059669", lineHeight: 1.5 }}>
                      You pay exactly PKR {product.price.toLocaleString()} — split into {selectedMonths} equal payments. No hidden fees.
                    </p>
                  </div>
                </div>

                <button onClick={() => goTo(2)} style={{
                  width: "100%", height: 54, borderRadius: 15, border: "none",
                  background: opt.gradient, color: "white", fontSize: 15, fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  cursor: "pointer", boxShadow: `0 8px 26px ${opt.accent}44`,
                  transition: "all 0.18s", fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.filter = "brightness(1.06)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.filter = "none"; }}
                >
                  Continue to Identity Verification <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* ─── STEP 2: KYC ─── */}
            {step === 2 && (
              <div style={{ padding: "32px 34px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px #7c3aed44", flexShrink: 0 }}>
                    <Shield size={20} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: C.heading, margin: 0, letterSpacing: "-0.02em" }}>Identity Verification</h2>
                    <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Required for installment approval</p>
                  </div>
                </div>

                <div style={{ background: "#f5f3ff", border: "1.5px solid #ddd6fe", borderRadius: 13, padding: "12px 16px", marginBottom: 22, display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <AlertCircle size={15} color={C.violet} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0, fontSize: 12.5, color: "#5b21b6", lineHeight: 1.6 }}>
                    Your information is encrypted end-to-end and only shared with the vendor for approval. We never sell your data.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
                  <Field label="Full Name (as per CNIC)" placeholder="Muhammad Ali" value={fullName} onChange={setFullName} icon={User} />
                  <Field label="CNIC Number" placeholder="12345-1234567-1" value={cnic} onChange={v => setCnic(formatCNIC(v))} icon={FileText} />
                  <Field label="Date of Birth" placeholder="" value={dob} onChange={setDob} type="date" />
                  <Field label="Mobile Number" placeholder="0300-1234567" value={mobileNum} onChange={setMobileNum} icon={Phone} />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Field label="Email Address (optional)" placeholder="you@email.com" value={email} onChange={setEmail} />
                  </div>
                </div>

                <p style={{ fontSize: 11, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 10px" }}>Required Documents</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 22 }}>
                  <UploadField label="CNIC — Front Side" hint="Clear photo, all corners visible" uploaded={cnicFrontUploaded} onUpload={() => setCnicFrontUploaded(true)} />
                  <UploadField label="CNIC — Back Side" hint="Clear photo, all corners visible" uploaded={cnicBackUploaded} onUpload={() => setCnicBackUploaded(true)} />
                  <UploadField label="Selfie with CNIC (optional)" hint="Hold CNIC clearly next to your face" uploaded={selfieUploaded} onUpload={() => setSelfieUploaded(true)} />
                </div>

                {!step2Valid && (
                  <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "11px 15px", marginBottom: 18, display: "flex", gap: 9 }}>
                    <AlertCircle size={14} color="#f97316" style={{ flexShrink: 0, marginTop: 1 }} />
                    <p style={{ margin: 0, fontSize: 12.5, color: "#9a3412", lineHeight: 1.5 }}>
                      Please fill all required fields and upload front &amp; back of your CNIC.
                    </p>
                  </div>
                )}

                <div style={{ display: "flex", gap: 10 }}>
                  <BackBtn onClick={() => goTo(1)} />
                  <PrimaryBtn
                    label={<>Delivery Details <ArrowRight size={17} /></>}
                    onClick={() => goTo(3)}
                    disabled={!step2Valid}
                    gradient="linear-gradient(135deg,#7c3aed,#6366f1)"
                    shadow="0 8px 24px #7c3aed44"
                  />
                </div>
              </div>
            )}

            {/* ─── STEP 3: Delivery ─── */}
            {step === 3 && (
              <div style={{ padding: "32px 34px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#10b981,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px #10b98144", flexShrink: 0 }}>
                    <MapPin size={20} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: C.heading, margin: 0, letterSpacing: "-0.02em" }}>Delivery Address</h2>
                    <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Free delivery · dispatched after KYC approval</p>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
                  <Field label="Full Street Address" placeholder="House 42, Street 7, DHA Phase 5" value={address} onChange={setAddress} icon={MapPin} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <SelectField label="City" value={city} onChange={setCity} options={CITIES} />
                    <Field label="Landmark (optional)" placeholder="Near Packages Mall" value={landmark} onChange={setLandmark} icon={Building2} />
                  </div>
                </div>

                {/* Delivery chips */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 24 }}>
                  {[
                    { e: "🚚", title: "Free Delivery", sub: "No shipping cost",   accent: C.sky,    bg: C.skyLight },
                    { e: "⚡", title: "24–48 hrs",     sub: "After KYC approval", accent: C.amber,  bg: C.amberLight },
                    { e: "📦", title: "Sealed Box",    sub: "Original packaging", accent: C.green,  bg: C.greenLight },
                  ].map(({ e, title, sub, accent, bg }) => (
                    <div key={title} style={{ background: bg, borderRadius: 16, padding: "18px 12px", textAlign: "center", border: `1.5px solid ${accent}22` }}>
                      <span style={{ fontSize: 24, display: "block", marginBottom: 8 }}>{e}</span>
                      <p style={{ fontSize: 12.5, fontWeight: 800, color: C.heading, margin: "0 0 3px" }}>{title}</p>
                      <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>{sub}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <BackBtn onClick={() => goTo(2)} />
                  <PrimaryBtn
                    label={<>Review & Confirm <ArrowRight size={17} /></>}
                    onClick={() => goTo(4)}
                    disabled={!step3Valid}
                    gradient="linear-gradient(135deg,#10b981,#06b6d4)"
                    shadow="0 8px 24px #10b98144"
                  />
                </div>
              </div>
            )}

            {/* ─── STEP 4: Review ─── */}
            {step === 4 && (
              <div style={{ padding: "32px 34px 30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 14, background: "linear-gradient(135deg,#f59e0b,#f43f5e)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px #f59e0b44", flexShrink: 0 }}>
                    <CheckCircle2 size={20} color="white" />
                  </div>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 900, color: C.heading, margin: 0, letterSpacing: "-0.02em" }}>Review & Submit</h2>
                    <p style={{ fontSize: 13, color: C.muted, margin: 0 }}>Everything look good? Submit to apply.</p>
                  </div>
                </div>

                {[
                  { title: "Installment Plan", accent: C.sky,    bg: C.skyLight,    border: "#bae6fd",
                    rows: [["Duration",`${selectedMonths} months`],["Monthly",`PKR ${monthly.toLocaleString()}`],["Total",formatPrice(product.price)],["Markup","PKR 0 — Free ✓"]] },
                  { title: "Identity (KYC)",   accent: C.violet, bg: C.violetLight, border: "#ddd6fe",
                    rows: [["Name",fullName||"—"],["CNIC",cnic||"—"],["Mobile",mobileNum||"—"],["Docs",`${[cnicFrontUploaded,cnicBackUploaded,selfieUploaded].filter(Boolean).length}/3 uploaded`]] },
                  { title: "Delivery",         accent: C.green,  bg: C.greenLight,  border: "#a7f3d0",
                    rows: [["Address",(address||"—").slice(0,24)+(address.length>24?"…":"")],["City",city||"—"],["Landmark",landmark||"—"],["ETA","24–48 hrs post-approval"]] },
                ].map(({ title, accent, bg, border, rows }) => (
                  <div key={title} style={{ borderRadius: 16, overflow: "hidden", border: `1.5px solid ${border}`, marginBottom: 12 }}>
                    <div style={{ background: bg, padding: "9px 18px", borderBottom: `1px solid ${border}` }}>
                      <span style={{ fontSize: 10.5, fontWeight: 800, color: accent, textTransform: "uppercase", letterSpacing: "0.09em" }}>{title}</span>
                    </div>
                    <div style={{ background: "#fff", padding: "14px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {rows.map(([lbl, val]) => (
                        <div key={lbl}>
                          <p style={{ margin: "0 0 2px", fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>{lbl}</p>
                          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: C.heading }}>{val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 22, display: "flex", gap: 9 }}>
                  <AlertCircle size={14} color={C.amber} style={{ flexShrink: 0, marginTop: 1 }} />
                  <p style={{ margin: 0, fontSize: 12.5, color: "#92400e", lineHeight: 1.6 }}>
                    By submitting you authorise FlexiBerry &amp; <strong>{vendorName}</strong> to review your KYC and process this installment application.
                  </p>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <BackBtn onClick={() => goTo(3)} />
                  <button onClick={handleConfirm} disabled={processing} style={{
                    flex: 1, height: 50, borderRadius: 14, border: "none",
                    background: processing ? "#f0f4f8" : "linear-gradient(135deg,#f59e0b,#f43f5e)",
                    color: processing ? C.muted : "white", fontSize: 14, fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                    cursor: processing ? "not-allowed" : "pointer",
                    boxShadow: processing ? "none" : "0 8px 24px #f59e0b55",
                    transition: "all 0.18s", fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}>
                    {processing ? (
                      <>
                        <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2.5px solid ${C.border}`, borderTopColor: C.sky, animation: "spin 0.7s linear infinite" }} />
                        Processing… {countdown}s
                      </>
                    ) : (
                      <><Zap size={17} /> Submit Application</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ══ RIGHT SIDEBAR ══ */}
        <div style={{ position: "sticky", top: 20, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Product card */}
          <div style={{ background: "#fff", borderRadius: 22, border: `1px solid ${C.border}`, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            {/* Image panel with soft mesh bg */}
            <div style={{
              background: `radial-gradient(ellipse at top left, ${opt.accentLight}, #fff 60%)`,
              padding: "28px 22px 20px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative",
            }}>
              <div style={{ position: "absolute", top: 12, left: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "4px 10px" }}>
                  <BadgeCheck size={11} color={C.green} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#065f46" }}>Verified</span>
                </div>
              </div>
              <img src={product.image} alt={product.name}
                style={{ width: 130, height: 130, objectFit: "contain", filter: "drop-shadow(0 10px 22px rgba(0,0,0,0.12))" }}
              />
            </div>

            <div style={{ padding: "18px 22px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.muted, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.09em" }}>{vendorName}</p>
              <h3 style={{ fontSize: 14.5, fontWeight: 800, color: C.heading, margin: "0 0 8px", lineHeight: 1.45 }}>{product.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 16 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} color={C.amber} fill={s <= Math.round(product.rating) ? C.amber : "#f0f4f8"} />
                ))}
                <span style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>({product.reviews})</span>
              </div>

              {/* Live pricing */}
              <div style={{
                background: `radial-gradient(ellipse at top right, ${opt.accentLight}, #fafbff)`,
                border: `1.5px solid ${opt.accent}28`, borderRadius: 16, padding: "16px 18px",
              }}>
                <p style={{ fontSize: 10, color: C.muted, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Monthly Payment</p>
                <p style={{ fontSize: 28, fontWeight: 900, color: C.heading, margin: "0 0 2px", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  PKR <Counter value={monthly} />
                </p>
                <p style={{ fontSize: 11.5, color: C.muted, margin: "0 0 14px" }}>× {selectedMonths} months</p>

                <div style={{ height: 1, background: C.border, marginBottom: 12 }} />

                {[
                  ["Product Price",    formatPrice(product.price), C.heading],
                  ["Delivery",         "FREE",                     C.green  ],
                  ["Markup / Interest","PKR 0",                    C.green  ],
                ].map(([lbl, val, color]) => (
                  <div key={lbl} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12.5, color: C.body }}>{lbl}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color }}>{val}</span>
                  </div>
                ))}

                <div style={{ height: 1, background: C.border, margin: "10px 0 12px" }} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: C.heading }}>Total</span>
                  <span style={{ fontSize: 13, fontWeight: 900, color: C.heading }}>{formatPrice(product.price)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust list */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "18px 20px", border: `1px solid ${C.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 14px" }}>Why FlexiBerry</p>
            {[
              { icon: Lock,       label: "256-bit SSL encryption",    accent: C.green,  bg: C.greenLight },
              { icon: Shield,     label: "KYC-verified transactions",  accent: C.violet, bg: C.violetLight },
              { icon: Package,    label: "Original sealed product",    accent: C.sky,    bg: C.skyLight },
              { icon: BadgeCheck, label: "7-day hassle-free returns",  accent: C.amber,  bg: C.amberLight },
              { icon: Truck,      label: "Free nationwide delivery",   accent: C.coral,  bg: C.coralLight },
            ].map(({ icon: Icon, label, accent, bg }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 11 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color={accent} />
                </div>
                <span style={{ fontSize: 12.5, color: C.body, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
