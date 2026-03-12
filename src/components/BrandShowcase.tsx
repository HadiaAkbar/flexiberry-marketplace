import samsungLogo from "@/assets/brands/samsung.png";
import appleLogo from "@/assets/brands/apple.png";
import haierLogo from "@/assets/brands/haier.png";
import hondaLogo from "@/assets/brands/honda.png";
import toyotaLogo from "@/assets/brands/toyota.png";
import lgLogo from "@/assets/brands/lg.png";
import sonyLogo from "@/assets/brands/sony.png";
import dawlanceLogo from "@/assets/brands/dawlance.png";
import yamahaLogo from "@/assets/brands/yamaha.png";
import dellLogo from "@/assets/brands/dell.png";

const brands = [
  { name: "Samsung", logo: samsungLogo },
  { name: "Apple",   logo: appleLogo   },
  { name: "Haier",   logo: haierLogo   },
  { name: "Honda",   logo: hondaLogo   },
  { name: "Toyota",  logo: toyotaLogo  },
  { name: "LG",      logo: lgLogo      },
  { name: "Sony",    logo: sonyLogo    },
  { name: "Dawlance",logo: dawlanceLogo},
  { name: "Yamaha",  logo: yamahaLogo  },
  { name: "Dell",    logo: dellLogo    },
];

const BrandShowcase = () => {
  return (
    <section className="relative py-16 overflow-hidden" style={{
      background: "linear-gradient(160deg, #f8faff 0%, #eef2ff 50%, #f0fdf8 100%)"
    }}>

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "-80px", left: "10%",
          width: "320px", height: "320px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)",
          filter: "blur(40px)"
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", right: "15%",
          width: "260px", height: "260px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
          filter: "blur(40px)"
        }} />
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 mb-10 text-center relative z-10">
        <p style={{
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
          textTransform: "uppercase", color: "#2563eb", marginBottom: "10px"
        }}>Trusted Partners</p>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 800,
          color: "#0f172a",
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          marginBottom: "10px"
        }}>
          Top Brands
        </h2>
        <p style={{ fontSize: "1rem", color: "#64748b", fontWeight: 400 }}>
          Shop from Pakistan's most trusted brands
        </p>

        {/* Underline accent */}
        <div style={{
          width: "56px", height: "4px", borderRadius: "99px",
          background: "linear-gradient(90deg, #2563eb, #7c3aed)",
          margin: "14px auto 0"
        }} />
      </div>

      {/* Scrolling logos — NO card behind them */}
      <div className="overflow-hidden relative z-10">
        <div style={{
          display: "flex",
          animation: "brand-scroll 28s linear infinite",
          willChange: "transform",
          gap: "0px"
        }}>
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="group"
              style={{
                flexShrink: 0,
                width: "160px",
                height: "90px",
                margin: "0 20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
                // 3-D floating tile — no flat card bg
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(14px) saturate(1.8)",
                WebkitBackdropFilter: "blur(14px) saturate(1.8)",
                borderRadius: "20px",
                border: "1.5px solid rgba(255,255,255,0.90)",
                boxShadow: `
                  0 6px 20px rgba(37,99,235,0.09),
                  0 2px 6px rgba(0,0,0,0.06),
                  inset 0 1.5px 0 rgba(255,255,255,1),
                  inset 0 -1px 0 rgba(0,0,0,0.04)
                `,
                transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px) scale(1.05)";
                (e.currentTarget as HTMLElement).style.boxShadow = `
                  0 18px 44px rgba(37,99,235,0.18),
                  0 4px 12px rgba(0,0,0,0.08),
                  inset 0 1.5px 0 rgba(255,255,255,1),
                  inset 0 -1px 0 rgba(0,0,0,0.04)
                `;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = `
                  0 6px 20px rgba(37,99,235,0.09),
                  0 2px 6px rgba(0,0,0,0.06),
                  inset 0 1.5px 0 rgba(255,255,255,1),
                  inset 0 -1px 0 rgba(0,0,0,0.04)
                `;
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                style={{
                  maxHeight: "42px",
                  maxWidth: "110px",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  filter: "none",
                  transition: "filter 0.2s ease"
                }}
              />
              <span style={{
                fontSize: "9.5px",
                fontWeight: 600,
                color: "#94a3b8",
                letterSpacing: "0.06em",
                textTransform: "uppercase"
              }}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fade edges */}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: "120px",
        background: "linear-gradient(to right, #f8faff, transparent)",
        pointerEvents: "none", zIndex: 20
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: "120px",
        background: "linear-gradient(to left, #f0fdf8, transparent)",
        pointerEvents: "none", zIndex: 20
      }} />
    </section>
  );
};

export default BrandShowcase;
