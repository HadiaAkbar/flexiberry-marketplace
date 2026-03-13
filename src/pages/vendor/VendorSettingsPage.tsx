import { useState } from "react";
import {
  Settings, Store, Bell, Lock, CreditCard,
  Globe, Palette, Save, Camera, Mail,
  Phone, MapPin, User,
} from "lucide-react";

const VendorSettingsPage = () => {
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };
  const [activeTab, setActiveTab] = useState("store");
  const [storeName, setStoreName] = useState("TechZone");
  const [storeDesc, setStoreDesc] = useState("Premium electronics & gadgets. Authorized dealer for Samsung, Apple, Sony & more.");
  const [email, setEmail] = useState("techzone@email.com");
  const [phone, setPhone] = useState("0300-1234567");
  const [city, setCity] = useState("Lahore");
  const [address, setAddress] = useState("Shop 12, Hafeez Centre, Main Boulevard, Gulberg III");
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [orderNotif, setOrderNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);

  const tabs = [
    { id: "store", label: "Store Profile", icon: Store },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "payments", label: "Payment Info", icon: CreditCard },
  ];

  const inputStyle = { width: "100%", height: "42px", paddingInline: "14px", borderRadius: "10px", border: "1.5px solid #e2e8f0", fontSize: "13px", outline: "none", ...F, background: "#f8fafc", color: "#0f172a" } as const;
  const labelStyle = { fontSize: "12px", fontWeight: 700, color: "#374151", marginBottom: "6px", display: "block" } as const;

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button onClick={onChange} style={{ width: "44px", height: "24px", borderRadius: "12px", border: "none", cursor: "pointer", background: value ? "linear-gradient(135deg,#2563eb,#7c3aed)" : "#e2e8f0", position: "relative", transition: "background 0.2s" }}>
      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "white", position: "absolute", top: "3px", left: value ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}/>
    </button>
  );

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Settings</h1>
        <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Manage your store settings and preferences</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "20px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "12px", border: "none", cursor: "pointer", ...F, fontSize: "13px", fontWeight: activeTab === t.id ? 700 : 500, textAlign: "left",
                background: activeTab === t.id ? "linear-gradient(135deg,rgba(37,99,235,0.1),rgba(124,58,237,0.08))" : "transparent",
                color: activeTab === t.id ? "#2563eb" : "#64748b",
                transition: "all 0.18s" }}>
              <t.icon size={16}/> {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "white", borderRadius: "18px", border: "1.5px solid rgba(37,99,235,0.07)", padding: "28px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          {activeTab === "store" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Store Profile</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 24px" }}>Update your store information</p>

              {/* Store avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                <div style={{ width: "72px", height: "72px", borderRadius: "18px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 900, color: "white" }}>TZ</div>
                <button style={{ height: "36px", paddingInline: "14px", borderRadius: "10px", background: "#f1f5f9", border: "1.5px solid #e2e8f0", cursor: "pointer", fontSize: "12px", fontWeight: 700, color: "#64748b", display: "flex", alignItems: "center", gap: "6px", ...F }}>
                  <Camera size={14}/> Change Photo
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Store Name</label>
                  <input value={storeName} onChange={e => setStoreName(e.target.value)} style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>City</label>
                  <input value={city} onChange={e => setCity(e.target.value)} style={inputStyle}/>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} style={inputStyle}/>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={storeDesc} onChange={e => setStoreDesc(e.target.value)}
                    style={{ ...inputStyle, height: "80px", paddingTop: "10px", resize: "vertical" }}/>
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
                <button style={{ height: "42px", paddingInline: "24px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", ...F }}>
                  <Save size={15}/> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Notification Preferences</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 24px" }}>Choose how you want to be notified</p>

              {[
                { label: "Email Notifications", desc: "Receive order updates via email", val: emailNotif, set: () => setEmailNotif(!emailNotif) },
                { label: "SMS Notifications", desc: "Get text messages for important updates", val: smsNotif, set: () => setSmsNotif(!smsNotif) },
                { label: "Order Alerts", desc: "Instant alerts for new orders", val: orderNotif, set: () => setOrderNotif(!orderNotif) },
                { label: "Promotional Updates", desc: "Marketing and promotional communications", val: promoNotif, set: () => setPromoNotif(!promoNotif) },
              ].map(n => (
                <div key={n.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{n.label}</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0 }}>{n.desc}</p>
                  </div>
                  <Toggle value={n.val} onChange={n.set}/>
                </div>
              ))}
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Security Settings</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 24px" }}>Manage your account security</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={labelStyle}>Current Password</label>
                  <input type="password" placeholder="••••••••" style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>New Password</label>
                  <input type="password" placeholder="Enter new password" style={inputStyle}/>
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <input type="password" placeholder="Confirm new password" style={inputStyle}/>
                </div>
              </div>

              <div style={{ marginTop: "20px" }}>
                <button style={{ height: "42px", paddingInline: "24px", borderRadius: "11px", background: "linear-gradient(135deg,#2563eb,#7c3aed)", border: "none", cursor: "pointer", color: "white", fontSize: "13px", fontWeight: 700, display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)", ...F }}>
                  <Lock size={15}/> Update Password
                </button>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h2 style={{ fontSize: "16px", fontWeight: 900, color: "#0f172a", margin: "0 0 4px" }}>Payment Information</h2>
              <p style={{ fontSize: "12px", color: "#94a3b8", margin: "0 0 24px" }}>Manage your payout settings</p>

              <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "20px", marginBottom: "20px", border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <CreditCard size={18} color="#2563eb"/>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a" }}>Bank Account</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", fontSize: "13px" }}>
                  <div><span style={{ color: "#94a3b8" }}>Bank:</span> <span style={{ fontWeight: 700, color: "#0f172a" }}>HBL</span></div>
                  <div><span style={{ color: "#94a3b8" }}>Account:</span> <span style={{ fontWeight: 700, color: "#0f172a" }}>****4567</span></div>
                  <div><span style={{ color: "#94a3b8" }}>IBAN:</span> <span style={{ fontWeight: 700, color: "#0f172a" }}>PK****HABB****4567</span></div>
                  <div><span style={{ color: "#94a3b8" }}>Title:</span> <span style={{ fontWeight: 700, color: "#0f172a" }}>TechZone Pvt Ltd</span></div>
                </div>
              </div>

              <button style={{ height: "42px", paddingInline: "24px", borderRadius: "11px", background: "#f1f5f9", border: "1.5px solid #e2e8f0", cursor: "pointer", fontSize: "13px", fontWeight: 700, color: "#64748b", ...F }}>
                Update Bank Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorSettingsPage;
