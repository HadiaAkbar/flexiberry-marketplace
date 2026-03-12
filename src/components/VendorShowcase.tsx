import { Link } from "react-router-dom";
import { shops } from "@/data/products";
import { Star, ArrowRight, ArrowUpRight, Package } from "lucide-react";
import { motion } from "framer-motion";

const vendorThemes = [
  {
    gradient: "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
    glow: "rgba(37,99,235,0.40)",
    glowSoft: "rgba(37,99,235,0.14)",
    accent: "#2563eb",
    accentLight: "#dbeafe",
    accentText: "#1d4ed8",
    tag: "Electronics",
  },
  {
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)",
    glow: "rgba(5,150,105,0.40)",
    glowSoft: "rgba(5,150,105,0.14)",
    accent: "#059669",
    accentLight: "#d1fae5",
    accentText: "#047857",
    tag: "Home & Living",
  },
  {
    gradient: "linear-gradient(135deg, #6b21a8 0%, #7c3aed 50%, #a78bfa 100%)",
    glow: "rgba(124,58,237,0.40)",
    glowSoft: "rgba(124,58,237,0.14)",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
    accentText: "#6d28d9",
    tag: "Motors & Energy",
  },
];

const VendorShowcase = () => {
  return (
    <section className="relative py-20 overflow-hidden" style={{
      background: "linear-gradient(160deg, #f8faff 0%, #fafaff 60%, #f0fff8 100%)"
    }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(ellipse at 10% 50%, rgba(37,99,235,0.05) 0%, transparent 55%),
          radial-gradient(ellipse at 90% 30%, rgba(124,58,237,0.05) 0%, transparent 55%)
        `
      }} />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#2563eb", marginBottom: "10px"
            }}>Verified Sellers</p>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)",
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.045em",
              lineHeight: 1.05,
              marginBottom: "10px"
            }}>Top Vendors</h2>
            <p style={{ fontSize: "1.05rem", color: "#64748b" }}>
              Trusted sellers with verified products
            </p>
          </div>
          <Link
            to="/shops"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "12px 24px", borderRadius: "14px",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "#fff", fontWeight: 700, fontSize: "14px",
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(37,99,235,0.30)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 28px rgba(37,99,235,0.40)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(37,99,235,0.30)";
            }}
          >
            View All Shops <ArrowRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {shops.map((shop, i) => {
            const theme = vendorThemes[i % vendorThemes.length];
            return (
              <motion.div
                key={shop.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to={`/shop/${shop.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      backdropFilter: "blur(20px) saturate(1.8)",
                      WebkitBackdropFilter: "blur(20px) saturate(1.8)",
                      borderRadius: "28px",
                      border: "1.5px solid rgba(255,255,255,0.95)",
                      overflow: "hidden",
                      boxShadow: `
                        0 2px 0 rgba(255,255,255,0.95) inset,
                        0 -1px 0 rgba(0,0,0,0.04) inset,
                        0 12px 40px ${theme.glowSoft},
                        0 3px 12px rgba(0,0,0,0.06)
                      `,
                      transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
                      cursor: "pointer"
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-8px) scale(1.015)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `
                        0 2px 0 rgba(255,255,255,0.95) inset,
                        0 -1px 0 rgba(0,0,0,0.04) inset,
                        0 28px 64px ${theme.glow},
                        0 8px 24px rgba(0,0,0,0.08)
                      `;
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                      (e.currentTarget as HTMLElement).style.boxShadow = `
                        0 2px 0 rgba(255,255,255,0.95) inset,
                        0 -1px 0 rgba(0,0,0,0.04) inset,
                        0 12px 40px ${theme.glowSoft},
                        0 3px 12px rgba(0,0,0,0.06)
                      `;
                    }}
                  >
                    {/* Gradient top strip */}
                    <div style={{
                      height: "6px",
                      background: theme.gradient,
                      width: "100%"
                    }} />

                    <div style={{ padding: "28px 28px 24px" }}>

                      {/* Top row */}
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>

                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          {/* Logo bubble — 3D */}
                          <div style={{
                            width: "64px", height: "64px",
                            borderRadius: "20px",
                            background: theme.gradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "28px",
                            boxShadow: `0 8px 24px ${theme.glow}, 0 2px 6px rgba(0,0,0,0.10)`,
                            position: "relative",
                            flexShrink: 0
                          }}>
                            <div style={{
                              position: "absolute", top: 0, left: 0, right: 0, height: "50%",
                              borderRadius: "20px 20px 0 0",
                              background: "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 100%)"
                            }} />
                            <span style={{ position: "relative", zIndex: 1 }}>{shop.logo}</span>
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                              <h3 style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                                fontWeight: 800,
                                color: "#0f172a",
                                letterSpacing: "-0.03em",
                                margin: 0
                              }}>{shop.name}</h3>
                            </div>
                            <span style={{
                              display: "inline-block",
                              fontSize: "11px", fontWeight: 700,
                              color: theme.accentText,
                              background: theme.accentLight,
                              padding: "3px 10px",
                              borderRadius: "99px",
                              letterSpacing: "0.03em"
                            }}>{shop.category}</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div style={{
                          width: "38px", height: "38px",
                          borderRadius: "12px",
                          background: theme.accentLight,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <ArrowUpRight size={18} color={theme.accentText} />
                        </div>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)",
                        color: "#475569",
                        lineHeight: 1.6,
                        marginBottom: "22px",
                        margin: "0 0 22px"
                      }}>{shop.description}</p>

                      {/* Divider */}
                      <div style={{
                        height: "1px",
                        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.07), transparent)",
                        marginBottom: "18px"
                      }} />

                      {/* Stats */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "10px",
                            background: "rgba(245,158,11,0.12)",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <Star size={16} style={{ fill: "#f59e0b", color: "#f59e0b" }} />
                          </div>
                          <div>
                            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{shop.rating}</span>
                            <span style={{ fontSize: "0.8rem", color: "#94a3b8", marginLeft: "4px" }}>rating</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                          <div style={{
                            width: "32px", height: "32px", borderRadius: "10px",
                            background: theme.accentLight,
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <Package size={16} color={theme.accentText} />
                          </div>
                          <div>
                            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>{shop.productCount}</span>
                            <span style={{ fontSize: "0.8rem", color: "#94a3b8", marginLeft: "4px" }}>Products</span>
                          </div>
                        </div>

                        {/* Verified badge */}
                        <div style={{
                          display: "flex", alignItems: "center", gap: "5px",
                          background: "rgba(5,150,105,0.10)",
                          borderRadius: "99px",
                          padding: "5px 12px"
                        }}>
                          <div style={{
                            width: "7px", height: "7px", borderRadius: "50%",
                            background: "#10b981",
                            boxShadow: "0 0 6px rgba(16,185,129,0.60)"
                          }} />
                          <span style={{ fontSize: "11px", fontWeight: 700, color: "#059669" }}>Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VendorShowcase;
