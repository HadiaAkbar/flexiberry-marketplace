const notifications = [
  { unread: true, color: "bg-fb-green", text: "<strong>Ahmad Bilal</strong> made a payment of <strong>₨ 7,499</strong> for Samsung S24 Ultra", time: "2 minutes ago" },
  { unread: true, color: "bg-fb-amber", text: "New order <strong>#FB-8756</strong> from <strong>Hina Butt</strong> — iPhone 15 Pro Max", time: "15 minutes ago" },
  { unread: true, color: "bg-fb-red", text: "<strong>3 installments</strong> are overdue. Review and send reminders.", time: "1 hour ago" },
  { unread: false, color: "bg-fb-blue", text: "<strong>Murad Khan</strong> completed payment 5/6 for Sony PlayStation 5", time: "3 hours ago" },
  { unread: false, color: "bg-primary", text: "Product stock alert: <strong>Sony PlayStation 5</strong> is running low (3 left)", time: "5 hours ago" },
];

export default function NotificationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[15px] font-bold text-foreground">Notifications</h2>
          <p className="text-xs text-text3 mt-[2px]">Stay updated with your shop activity</p>
        </div>
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg text-[13px] font-semibold bg-card text-muted-foreground border border-border hover:border-border2 transition-all">
          Mark all read
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg shadow-card overflow-hidden">
        {notifications.map((n, i) => (
          <div
            key={i}
            className={`flex gap-3 px-[14px] py-3 cursor-pointer transition-colors hover:bg-background ${
              n.unread ? "bg-teal-bg" : ""
            } ${i > 0 ? "border-t border-border" : ""}`}
          >
            <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${n.color}`} />
            <div className="flex-1">
              <p className="text-[13px] text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: n.text }} />
              <p className="text-[11px] text-text3 mt-[2px]">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}