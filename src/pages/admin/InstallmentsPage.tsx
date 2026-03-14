// export default function InstallmentsPage() {
//   const plans = [
//     { months: 3, label: "Quick Plan", detail: "Low commitment, higher monthly payments", selected: false },
//     { months: 6, label: "Standard Plan", detail: "Most popular among customers", selected: true },
//     { months: 12, label: "Extended Plan", detail: "Lowest monthly payments", selected: false },
//   ];

//   return (
//     <div>
//       <div className="mb-4">
//         <h2 className="text-[15px] font-bold text-foreground">Installment Plans</h2>
//         <p className="text-xs text-text3 mt-[2px]">Configure installment options for your products</p>
//       </div>

//       <div className="grid grid-cols-3 gap-4 mb-6 max-lg:grid-cols-1">
//         {plans.map((p) => (
//           <div
//             key={p.months}
//             className={`bg-background border-[1.5px] rounded-lg p-4 transition-all cursor-pointer ${
//               p.selected ? "border-primary bg-teal-bg" : "border-border hover:border-primary hover:bg-teal-bg"
//             }`}
//           >
//             <div className="text-[28px] font-extrabold text-primary font-mono">{p.months}</div>
//             <div className="text-xs text-muted-foreground font-semibold mt-[2px]">{p.label}</div>
//             <div className="text-[11px] text-text3 mt-[10px]">{p.detail}</div>
//           </div>
//         ))}
//       </div>

//       <div className="bg-card border border-border rounded-lg p-[18px] shadow-card">
//         <h3 className="text-[15px] font-bold text-foreground mb-4">Active Installment Summary</h3>
//         <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
//           <div className="bg-background rounded-lg p-4 text-center">
//             <div className="text-2xl font-extrabold text-foreground font-mono">612</div>
//             <div className="text-xs text-text3 mt-1">Active Plans</div>
//           </div>
//           <div className="bg-background rounded-lg p-4 text-center">
//             <div className="text-2xl font-extrabold text-foreground font-mono">₨ 4.62M</div>
//             <div className="text-xs text-text3 mt-1">Monthly Collections</div>
//           </div>
//           <div className="bg-background rounded-lg p-4 text-center">
//             <div className="text-2xl font-extrabold text-foreground font-mono">94.8%</div>
//             <div className="text-xs text-text3 mt-1">On-time Payment Rate</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
