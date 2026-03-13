import { useState } from "react";
import {
  Shield, Upload, CheckCircle, Clock, XCircle,
  FileText, Camera, CreditCard, Building,
  AlertTriangle, ChevronRight,
} from "lucide-react";

const KYC_STEPS = [
  { id: "business", label: "Business Information", desc: "Company name, registration & address", icon: Building, status: "completed" as const },
  { id: "cnic", label: "CNIC Verification", desc: "Upload front & back of your CNIC", icon: CreditCard, status: "completed" as const },
  { id: "bank", label: "Bank Account", desc: "Bank name, account number & IBAN", icon: CreditCard, status: "pending" as const },
  { id: "store", label: "Store Photos", desc: "Upload photos of your physical store", icon: Camera, status: "not_started" as const },
];

const STATUS_MAP = {
  completed: { label: "Completed", bg: "#ecfdf5", color: "#059669", border: "#a7f3d0", icon: CheckCircle },
  pending: { label: "Under Review", bg: "#fef3c7", color: "#92400e", border: "#fde68a", icon: Clock },
  not_started: { label: "Not Started", bg: "#f1f5f9", color: "#64748b", border: "#e2e8f0", icon: FileText },
  rejected: { label: "Rejected", bg: "#fef2f2", color: "#dc2626", border: "#fecaca", icon: XCircle },
};

const VendorKYCPage = () => {
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };
  const completedSteps = KYC_STEPS.filter(s => s.status === "completed").length;
  const pct = Math.round((completedSteps / KYC_STEPS.length) * 100);

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>KYC Verification</h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Complete your verification to unlock all features</p>
      </div>

      {/* Progress card */}
      <div style={{ background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: "20px", padding: "28px", marginBottom: "24px", color: "white", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", pointerEvents: "none" }}/>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <Shield size={20}/>
              <h2 style={{ fontSize: "18px", fontWeight: 900, margin: 0 }}>Verification Progress</h2>
            </div>
            <p style={{ fontSize: "13px", opacity: 0.8, margin: 0 }}>{completedSteps} of {KYC_STEPS.length} steps completed</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ position: "relative", width: "80px", height: "80px" }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="40" cy="40" r="34" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none"/>
                <circle cx="40" cy="40" r="34" stroke="white" strokeWidth="6" fill="none"
                  strokeDasharray={`${(pct / 100) * 213.6} 213.6`} strokeLinecap="round"/>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: 900 }}>{pct}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* KYC Steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {KYC_STEPS.map((step, i) => {
          const sc = STATUS_MAP[step.status];
          return (
            <div key={step.id} style={{ background: "white", borderRadius: "18px", border: `1.5px solid ${step.status === "pending" ? "#fde68a" : "rgba(37,99,235,0.07)"}`, padding: "22px 24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "16px", cursor: "pointer", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)")}>
              <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: step.status === "completed" ? "#ecfdf5" : step.status === "pending" ? "#fef3c7" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <step.icon size={22} color={step.status === "completed" ? "#059669" : step.status === "pending" ? "#d97706" : "#94a3b8"}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8" }}>Step {i + 1}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10px", fontWeight: 700, padding: "3px 8px", borderRadius: "20px", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                    <sc.icon size={9}/> {sc.label}
                  </span>
                </div>
                <p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{step.label}</p>
                <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{step.desc}</p>
              </div>
              <div style={{ flexShrink: 0 }}>
                {step.status === "not_started" ? (
                  <button style={{ height: "36px", paddingInline: "16px", borderRadius: "10px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", ...F }}>
                    <Upload size={13}/> Upload
                  </button>
                ) : step.status === "pending" ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#d97706", fontSize: "12px", fontWeight: 700 }}>
                    <Clock size={14}/> Reviewing…
                  </div>
                ) : (
                  <CheckCircle size={22} color="#10b981"/>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Warning box */}
      <div style={{ marginTop: "20px", background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: "14px", padding: "16px 20px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0, marginTop: "2px" }}/>
        <div>
          <p style={{ fontSize: "13px", fontWeight: 700, color: "#92400e", margin: "0 0 4px" }}>Complete KYC to unlock payouts</p>
          <p style={{ fontSize: "12px", color: "#a16207", margin: 0 }}>You need to complete all verification steps before you can receive payouts. Complete the remaining steps to start receiving your earnings.</p>
        </div>
      </div>
    </div>
  );
};

export default VendorKYCPage;
