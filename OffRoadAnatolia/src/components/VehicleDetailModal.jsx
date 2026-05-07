import { useEffect, useRef } from "react";

function SpecBar({ label, value, max, unit, color = "accent" }) {
  const percentage = Math.min((value / max) * 100, 100);
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = `${percentage}%`;
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorMap = {
    accent: "from-offroad-accent to-offroad-accent-light",
    khaki: "from-offroad-khaki to-offroad-khaki-light",
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-offroad-muted font-medium">{label}</span>
        <span className="text-sm font-bold text-offroad-text" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          {value}
          {unit}
        </span>
      </div>
      <div className="h-3 bg-offroad-darker rounded-full overflow-hidden border border-offroad-border/30">
        <div
          ref={barRef}
          className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: "0%" }}
        >
          <div className="absolute inset-0 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function SpecIcon({ icon, label, value, active }) {
  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
        active
          ? "bg-offroad-accent/10 border-offroad-accent/30"
          : "bg-offroad-darker border-offroad-border/30"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          active ? "bg-offroad-accent text-white" : "bg-offroad-card text-offroad-muted"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-offroad-muted">{label}</div>
        <div className="text-sm font-semibold text-offroad-text">{value}</div>
      </div>
    </div>
  );
}

export default function VehicleDetailModal({ vehicle, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!vehicle) return null;

  const { specs } = vehicle;

  return (
    <div
      id="vehicle-detail-modal"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-offroad-overlay backdrop-blur-md animate-fade-in" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-4xl bg-offroad-dark rounded-3xl border border-offroad-border 
                   shadow-2xl shadow-black/60 animate-scale-in overflow-y-auto max-h-[90vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-offroad-card/80 backdrop-blur-sm 
                     border border-offroad-border flex items-center justify-center text-offroad-muted 
                     hover:text-offroad-text hover:bg-offroad-accent hover:border-offroad-accent
                     transition-all duration-300 group"
          aria-label="Kapat"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Hero Image */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-offroad-dark via-offroad-dark/40 to-transparent" />

          {/* Title on image */}
          <div className="absolute bottom-6 left-8 right-8">
            <div className="flex items-center gap-3 mb-2">
              {specs.lockedDiff && (
                <span className="inline-flex items-center gap-1.5 bg-offroad-accent/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Kilitli Diferansiyel
                </span>
              )}
              <span className="bg-offroad-khaki/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                {specs.fuelType}
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-1"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {vehicle.name}
            </h2>
            <p className="text-offroad-accent font-medium italic">
              "{vehicle.slogan}"
            </p>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-10 space-y-8">
          {/* Description */}
          <p className="text-offroad-muted leading-relaxed text-base">
            {vehicle.description}
          </p>

          {/* Key Specs Grid */}
          <div>
            <h3
              className="text-lg font-bold text-offroad-text mb-4 flex items-center gap-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-offroad-accent" stroke="currentColor" strokeWidth="2">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
              </svg>
              TEMEL BİLGİLER
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                }
                label="Motor"
                value={specs.engineDisplacement}
                active={false}
              />
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
                label="Tork"
                value={specs.torque}
                active={false}
              />
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 10h2v4H6zm4 0h2v4h-2zm4 0h2v4h-2z" />
                  </svg>
                }
                label="Şanzıman"
                value={specs.transmission}
                active={false}
              />
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="7" cy="17" r="3" />
                    <circle cx="17" cy="17" r="3" />
                    <path d="M10 17H14M7 14V9a2 2 0 012-2h6a2 2 0 012 2v5" />
                  </svg>
                }
                label="4x4 Sistem"
                value={specs.fourWD}
                active={true}
              />
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21V8l9-5 9 5v13" />
                    <path d="M9 21v-6h6v6" />
                  </svg>
                }
                label="Süspansiyon"
                value={specs.suspensionType}
                active={false}
              />
              <SpecIcon
                icon={
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3v18M3 12h18" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                }
                label="Ağırlık"
                value={`${specs.weight} kg`}
                active={false}
              />
            </div>
          </div>

          {/* Performance Bars */}
          <div>
            <h3
              className="text-lg font-bold text-offroad-text mb-5 flex items-center gap-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-offroad-accent" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
              </svg>
              ARAZİ PERFORMANSI
            </h3>
            <div className="space-y-5">
              <SpecBar
                label="Beygir Gücü"
                value={specs.horsepower}
                max={specs.maxHorsepower}
                unit=" HP"
                color="accent"
              />
              <SpecBar
                label="Yaklaşma Açısı"
                value={specs.approachAngle}
                max={specs.maxApproachAngle}
                unit="°"
                color="accent"
              />
              <SpecBar
                label="Uzaklaşma Açısı"
                value={specs.departureAngle}
                max={specs.maxDepartureAngle}
                unit="°"
                color="khaki"
              />
              <SpecBar
                label="Yerden Yükseklik"
                value={specs.groundClearance}
                max={specs.maxGroundClearance}
                unit=" mm"
                color="accent"
              />
              <SpecBar
                label="Su Geçiş Derinliği"
                value={specs.wadingDepth}
                max={specs.maxWadingDepth}
                unit=" mm"
                color="khaki"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
