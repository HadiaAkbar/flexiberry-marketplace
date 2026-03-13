import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, X, PartyPopper, Mail, ArrowLeft, KeyRound, RefreshCw } from "lucide-react";

/* ── Inline SVG: FlexiBerry Tagged-Cart Logo ── */
const FlexiBerryLogo = ({ size = 64 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lg-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#2563eb"/>
        <stop offset="100%" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="lg-sh" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="white" stopOpacity="0.18"/>
        <stop offset="100%" stopColor="white" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#lg-bg)"/>
    <rect width="100" height="100" rx="28" fill="url(#lg-sh)"/>
    <g transform="rotate(-14, 50, 52)">
      <path d="M 8 20 L 17 20 L 23 40" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 23 40 L 23 70 Q 23 76 29 76 L 79 76 Q 85 76 85 70 L 85 40 Q 85 34 79 34 L 35 34 Q 27 34 23 40 Z" fill="white"/>
      <circle cx="32" cy="39" r="4.5" fill="url(#lg-bg)"/>
      <rect x="30" y="45" width="5" height="21" rx="2.5" fill="url(#lg-bg)"/>
      <rect x="30" y="45" width="13" height="4.5" rx="2.25" fill="url(#lg-bg)"/>
      <rect x="30" y="53.5" width="10" height="4" rx="2" fill="url(#lg-bg)"/>
      <rect x="48" y="45" width="5" height="21" rx="2.5" fill="url(#lg-bg)"/>
      <path d="M 53 45 Q 65 45 65 51.5 Q 65 57.5 53 57.5" stroke="url(#lg-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M 53 57.8 Q 67 57.8 67 64.5 Q 67 71 53 71" stroke="url(#lg-bg)" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <circle cx="35" cy="86" r="7.5" fill="white"/>
      <circle cx="35" cy="86" r="3.8" fill="url(#lg-bg)"/>
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

/* ── Shared animation styles ── */
const GlobalStyles = () => (
  <style>{`
    @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes popUp {
      from { opacity: 0; transform: translate(-50%, -46%) scale(0.92); }
      to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes pulseRing {
      0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.3); }
      50%       { box-shadow: 0 0 0 10px rgba(255,255,255,0); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
);

/* ── Account Created Popup ── */
const SuccessPopup = ({ name, onClose }: { name: string; onClose: () => void }) => (
  <>
    <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(4px)",zIndex:999,animation:"fadeIn 0.2s ease" }}/>
    <div style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1000,width:"min(420px,92vw)",background:"white",borderRadius:"24px",boxShadow:"0 32px 80px rgba(37,99,235,0.22),0 8px 24px rgba(0,0,0,0.12)",overflow:"hidden",animation:"popUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",padding:"28px 24px 24px",textAlign:"center",position:"relative" }}>
        <button onClick={onClose} style={{ position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:"28px",height:"28px",cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center" }}><X size={14}/></button>
        <div style={{ width:"72px",height:"72px",borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",border:"3px solid rgba(255,255,255,0.4)",animation:"pulseRing 2s ease-in-out infinite" }}>
          <CheckCircle2 size={38} color="white" strokeWidth={2}/>
        </div>
        <h2 style={{ color:"white",fontWeight:800,fontSize:"20px",margin:"0 0 6px" }}>Account Created! 🎉</h2>
        <p style={{ color:"rgba(255,255,255,0.75)",fontSize:"13px",margin:0 }}>Welcome to FlexiBerry, {name||"there"}!</p>
      </div>
      <div style={{ padding:"24px" }}>
        {[{emoji:"🛒",text:"Shop thousands of products on easy installments"},{emoji:"⚡",text:"Exclusive flash sale deals just for members"},{emoji:"🔒",text:"KYC-secured account with safe payments"}].map(({emoji,text})=>(
          <div key={text} style={{ display:"flex",alignItems:"center",gap:"12px",padding:"10px 0",borderBottom:"1px solid rgba(37,99,235,0.07)" }}>
            <span style={{ fontSize:"20px" }}>{emoji}</span>
            <p style={{ margin:0,fontSize:"13px",color:"#374151",fontWeight:600 }}>{text}</p>
          </div>
        ))}
        <div style={{ display:"flex",gap:"10px",marginTop:"20px" }}>
          <button onClick={onClose} style={{ flex:1,height:"44px",borderRadius:"12px",background:"linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",border:"none",cursor:"pointer",color:"white",fontSize:"13px",fontWeight:700,fontFamily:"'Plus Jakarta Sans',sans-serif",boxShadow:"0 6px 18px rgba(37,99,235,0.35)",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px" }}><PartyPopper size={15}/>Start Shopping</button>
          <button onClick={onClose} style={{ height:"44px",padding:"0 16px",borderRadius:"12px",background:"transparent",border:"1.5px solid rgba(37,99,235,0.2)",cursor:"pointer",color:"#2563eb",fontSize:"13px",fontWeight:600,fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Close</button>
        </div>
      </div>
    </div>
  </>
);

/* ── Forgot Password Modal ── */
type ForgotStep = "email" | "sent";

const ForgotPasswordModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState<ForgotStep>("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("sent"); }, 1500);
  };

  const F = { fontFamily: "'Plus Jakarta Sans',sans-serif" };

  return (
    <>
      <div onClick={onClose} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(4px)",zIndex:999,animation:"fadeIn 0.2s ease" }}/>
      <div style={{ position:"fixed",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:1000,width:"min(400px,92vw)",background:"white",borderRadius:"24px",boxShadow:"0 32px 80px rgba(37,99,235,0.22),0 8px 24px rgba(0,0,0,0.12)",overflow:"hidden",animation:"popUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",...F }}>

        {/* Gradient header */}
        <div style={{ background:"linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",padding:"24px",position:"relative",textAlign:"center" }}>
          <button onClick={onClose} style={{ position:"absolute",top:"12px",right:"12px",background:"rgba(255,255,255,0.2)",border:"none",borderRadius:"50%",width:"28px",height:"28px",cursor:"pointer",color:"white",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <X size={14}/>
          </button>
          <div style={{ width:"60px",height:"60px",borderRadius:"50%",background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px",border:"3px solid rgba(255,255,255,0.35)" }}>
            {step === "email" ? <KeyRound size={28} color="white"/> : <Mail size={28} color="white"/>}
          </div>
          <h2 style={{ color:"white",fontWeight:800,fontSize:"18px",margin:"0 0 4px" }}>
            {step === "email" ? "Forgot Password?" : "Check Your Email"}
          </h2>
          <p style={{ color:"rgba(255,255,255,0.7)",fontSize:"12px",margin:0 }}>
            {step === "email" ? "Enter your email and we'll send a reset link" : `We sent a reset link to ${email}`}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding:"24px" }}>
          {step === "email" ? (
            <>
              <div style={{ marginBottom:"16px" }}>
                <label style={{ fontSize:"12px",fontWeight:700,color:"#374151",display:"block",marginBottom:"6px",...F }}>Email Address</label>
                <div style={{ position:"relative" }}>
                  <Mail size={15} color="#94a3b8" style={{ position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }}/>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    autoFocus
                    style={{ width:"100%",height:"44px",paddingLeft:"36px",paddingRight:"12px",borderRadius:"11px",border:"1.5px solid rgba(37,99,235,0.2)",fontSize:"13px",outline:"none",boxSizing:"border-box",background:"#fafbff",...F }}
                  />
                </div>
              </div>

              <button
                onClick={handleSend}
                disabled={loading || !email}
                style={{ width:"100%",height:"44px",borderRadius:"12px",background:loading||!email?"rgba(37,99,235,0.35)":"linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",border:"none",cursor:loading||!email?"not-allowed":"pointer",color:"white",fontSize:"13px",fontWeight:700,boxShadow:"0 6px 18px rgba(37,99,235,0.3)",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",transition:"all 0.2s",...F }}>
                {loading
                  ? <><RefreshCw size={15} style={{ animation:"spin 1s linear infinite" }}/> Sending…</>
                  : "Send Reset Link"}
              </button>

              <button onClick={onClose} style={{ width:"100%",marginTop:"10px",height:"40px",borderRadius:"12px",background:"transparent",border:"1.5px solid rgba(37,99,235,0.15)",cursor:"pointer",color:"#64748b",fontSize:"13px",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",...F }}>
                <ArrowLeft size={14}/> Back to Login
              </button>
            </>
          ) : (
            <>
              {/* Email sent confirmation */}
              <div style={{ textAlign:"center",padding:"8px 0 16px" }}>
                <div style={{ width:"64px",height:"64px",borderRadius:"50%",background:"linear-gradient(135deg,#d1fae5,#a7f3d0)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 14px",border:"3px solid #6ee7b7" }}>
                  <CheckCircle2 size={32} color="#059669"/>
                </div>
                <p style={{ fontSize:"13px",color:"#374151",fontWeight:700,margin:"0 0 4px" }}>Reset link sent successfully!</p>
                <p style={{ fontSize:"12px",color:"#94a3b8",margin:0 }}>Didn't receive it? Check your spam folder or try again.</p>
              </div>

              {/* Tips */}
              <div style={{ background:"rgba(37,99,235,0.05)",border:"1px solid rgba(37,99,235,0.12)",borderRadius:"12px",padding:"12px 14px",marginBottom:"16px" }}>
                {[{emoji:"📬",text:"Check your inbox for the reset link"},{emoji:"⏱️",text:"Link expires in 30 minutes"},{emoji:"🔒",text:"Choose a strong new password"}].map(({emoji,text})=>(
                  <div key={text} style={{ display:"flex",alignItems:"center",gap:"10px",padding:"5px 0" }}>
                    <span style={{ fontSize:"16px" }}>{emoji}</span>
                    <span style={{ fontSize:"12px",color:"#475569",fontWeight:500,...F }}>{text}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => { setStep("email"); setEmail(""); }} style={{ width:"100%",marginBottom:"8px",height:"40px",borderRadius:"12px",background:"transparent",border:"1.5px solid rgba(37,99,235,0.2)",cursor:"pointer",color:"#2563eb",fontSize:"13px",fontWeight:600,display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",...F }}>
                <RefreshCw size={14}/> Resend Email
              </button>

              <button onClick={onClose} style={{ width:"100%",height:"44px",borderRadius:"12px",background:"linear-gradient(135deg,#2563eb 0%,#7c3aed 100%)",border:"none",cursor:"pointer",color:"white",fontSize:"13px",fontWeight:700,boxShadow:"0 6px 18px rgba(37,99,235,0.3)",...F }}>
                Back to Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

/* ── Main Page ── */
const LoginPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <GlobalStyles />
      <Header />

      {showSuccess && <SuccessPopup name={name} onClose={() => setShowSuccess(false)} />}
      {showForgot  && <ForgotPasswordModal onClose={() => setShowForgot(false)} />}

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <FlexiBerryLogo size={64} />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome to FlexiBerry</h1>
            <p className="text-muted-foreground text-sm mt-1">Login or create your account</p>
            <p className="text-muted-foreground text-sm text-center">(Customer)</p>
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
                <Button className="w-full gradient-coral border-none text-primary-foreground hover:opacity-90" onClick={() => navigate("/dashboard")}>Login</Button>
                <p className="text-center text-xs text-muted-foreground">
                  <button
                    onClick={() => setShowForgot(true)}
                    className="text-primary hover:underline bg-transparent border-none cursor-pointer text-xs p-0"
                  >
                    Forgot password?
                  </button>
                </p>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Muhammad Ali"
                    className="mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                <Button
                  className="w-full gradient-coral border-none text-primary-foreground hover:opacity-90"
                  onClick={() => setShowSuccess(true)}
                >
                  Create Account
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-4 border-t border-border text-center">
              <p className="text-xs text-muted-foreground mb-3">Want to sell on FlexiBerry?</p>
              <Link to="/vendor/login">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  Login as Vendor
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
