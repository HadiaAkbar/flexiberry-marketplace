import { useState } from "react";

const INITIAL_ITEMS = [
  { id: 0, emoji: "🪪", name: "Ahmad Bilal", type: "CNIC · 35202-1234567-1 · Lahore", meta: "2 hours ago · Samsung Galaxy S24 · ₨89,999", status: "pending" },
  { id: 1, emoji: "📄", name: "Sara Anwar", type: "Bank Statement + Salary Slip · Karachi", meta: "5 hours ago · MacBook Air M2 · ₨189,999", status: "pending" },
  { id: 2, emoji: "📸", name: "Murad Khan", type: "Verification Photo + CNIC · Islamabad", meta: "1 day ago · LG Smart TV · ₨74,999", status: "pending" },
  { id: 3, emoji: "🪪", name: "Hina Butt", type: "CNIC + Bank Statement · Rawalpindi", meta: "2 days ago · iPhone 15 Pro · ₨259,999", status: "pending" },
  { id: 4, emoji: "📄", name: "Zain Malik", type: "Salary Slip · Faisalabad", meta: "3 days ago · Haier AC 1.5 Ton · ₨79,999", status: "pending" },
  { id: 5, emoji: "🪪", name: "Nadia Siddiqui", type: "CNIC · 42101-9876543-2 · Karachi", meta: "3 days ago · Dell Laptop · ₨149,999", status: "pending" },
  { id: 6, emoji: "📸", name: "Usman Tariq", type: "Verification Photo + CNIC · Multan", meta: "4 days ago · Royal Enfield · ₨499,999", status: "pending" },
];

const VendorKYCPage = () => {
  const F = { fontFamily: "'DM Sans', system-ui, sans-serif" };
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [viewItem, setViewItem] = useState(null);

  const setStatus = (id, status) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));

  const pending = items.filter(i => i.status === "pending").length;

  const btnStyle = (type) => ({
    ...F, fontWeight: 700, cursor: "pointer", borderRadius: "9px", fontSize: "12px",
    padding: "7px 13px", display: "inline-flex", alignItems: "center", gap: "4px",
    whiteSpace: "nowrap", border: "none",
    ...(type === "approve" && { background: "#059669", color: "white" }),
    ...(type === "reject" && { background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca" }),
    ...(type === "view" && { background: "#f1f5f9", color: "#475569", border: "1.5px solid #e2e8f0" }),
  });

  const pillStyle = (type) => ({
    display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "11px",
    fontWeight: 700, padding: "4px 10px", borderRadius: "20px",
    ...(type === "approved" && { background: "#ecfdf5", color: "#059669", border: "1.5px solid #a7f3d0" }),
    ...(type === "rejected" && { background: "#fef2f2", color: "#dc2626", border: "1.5px solid #fecaca" }),
  });

  return (
    <div style={{ ...F, minHeight: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "22px" }}>
        <div>
          <h1 style={{ fontSize: "21px", fontWeight: 900, color: "#0f172a", margin: "0 0 3px", letterSpacing: "-0.02em" }}>KYC Document Verification</h1>
          <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>Review and approve buyer documents</p>
        </div>
        {pending === 0
          ? <span style={{ ...pillStyle("approved"), fontSize: "12px", padding: "6px 13px" }}>✓ All Reviewed</span>
          : <span style={{ ...pillStyle("rejected"), fontSize: "12px", padding: "6px 13px" }}>⏳ {pending} Pending</span>
        }
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "14px" }}>
        {items.map(item => (
          <div key={item.id}
            style={{
              background: item.status === "approved" ? "#f0fdf4" : item.status === "rejected" ? "#fef2f2" : "white",
              borderRadius: "18px",
              border: `1.5px solid ${item.status === "approved" ? "#a7f3d0" : item.status === "rejected" ? "#fecaca" : "rgba(37,99,235,0.08)"}`,
              padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)", transition: "box-shadow 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)"}>

            <div style={{ width: "50px", height: "50px", borderRadius: "13px", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
              {item.emoji}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", margin: "0 0 2px" }}>{item.name}</p>
              <p style={{ fontSize: "11px", color: "#64748b", fontWeight: 600, margin: "0 0 2px" }}>{item.type}</p>
              <p style={{ fontSize: "11px", color: "#94a3b8", margin: "0 0 12px" }}>{item.meta}</p>

              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", alignItems: "center" }}>
                {item.status === "pending" && (<>
                  <button style={btnStyle("approve")} onClick={() => setStatus(item.id, "approved")}>✓ Approve</button>
                  <button style={btnStyle("reject")} onClick={() => setStatus(item.id, "rejected")}>✗ Reject</button>
                </>)}
                {item.status === "approved" && (<>
                  <span style={pillStyle("approved")}>✓ Approved</span>
                  <button style={btnStyle("reject")} onClick={() => setStatus(item.id, "rejected")}>✗ Reject</button>
                </>)}
                {item.status === "rejected" && (<>
                  <span style={pillStyle("rejected")}>✗ Rejected</span>
                  <button style={btnStyle("approve")} onClick={() => setStatus(item.id, "approved")}>✓ Approve</button>
                </>)}
                <button style={btnStyle("view")} onClick={() => setViewItem(item)}>View Doc</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {viewItem && (
        <div onClick={() => setViewItem(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.42)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div onClick={e => e.stopPropagation()} style={{ ...F, background: "white", borderRadius: "20px", padding: "26px", width: "340px", maxWidth: "92vw", border: "1.5px solid #e2e8f0" }}>
            <div style={{ background: "#f8fafc", borderRadius: "13px", padding: "22px", textAlign: "center", marginBottom: "14px", border: "1.5px dashed #e2e8f0" }}>
              <div style={{ fontSize: "34px", marginBottom: "6px" }}>{viewItem.emoji}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#0f172a" }}>{viewItem.type}</div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "3px" }}>Document preview · Demo</div>
            </div>
            <p style={{ fontSize: "15px", fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{viewItem.name}</p>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 16px" }}>{viewItem.meta}</p>
            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button style={btnStyle("view")} onClick={() => setViewItem(null)}>Close</button>
              {viewItem.status !== "approved" && <button style={btnStyle("approve")} onClick={() => { setStatus(viewItem.id, "approved"); setViewItem(null); }}>✓ Approve</button>}
              {viewItem.status !== "rejected" && <button style={btnStyle("reject")} onClick={() => { setStatus(viewItem.id, "rejected"); setViewItem(null); }}>✗ Reject</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorKYCPage;
