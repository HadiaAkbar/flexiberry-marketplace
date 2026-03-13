import { useState } from "react";

function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-[38px] h-5 rounded-[10px] relative transition-colors shrink-0 ${on ? "bg-primary" : "bg-border2"}`}
    >
      <span className={`absolute top-[3px] left-[3px] w-[14px] h-[14px] rounded-full bg-card shadow-sm transition-transform ${on ? "translate-x-[18px]" : ""}`} />
    </button>
  );
}

const settings = [
  { title: "Order Notifications", desc: "Get notified when new orders are placed", on: true },
  { title: "Payment Reminders", desc: "Send automatic payment reminders to customers", on: true },
  { title: "Low Stock Alerts", desc: "Alert when product stock falls below threshold", on: true },
  { title: "Marketing Emails", desc: "Receive promotional and marketing emails", on: false },
  { title: "Two-Factor Authentication", desc: "Add extra security to your account", on: false },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-[15px] font-bold text-foreground">Settings</h2>
        <p className="text-xs text-text3 mt-[2px]">Configure your shop preferences</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-[18px] shadow-card">
        {settings.map((s, i) => (
          <div key={s.title} className={`flex items-center justify-between py-[14px] ${i < settings.length - 1 ? "border-b border-border" : ""}`}>
            <div>
              <div className="text-sm font-semibold text-foreground mb-[2px]">{s.title}</div>
              <div className="text-[11px] text-text3">{s.desc}</div>
            </div>
            <Toggle defaultOn={s.on} />
          </div>
        ))}
      </div>
    </div>
  );
}