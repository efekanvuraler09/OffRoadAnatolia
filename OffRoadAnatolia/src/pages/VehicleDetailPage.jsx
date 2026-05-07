import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import vehicles from "../data/vehicles";
import { playEngineSound } from "../lib/engineSound";

function SpecBar({ label, value, max, unit }) {
  const percentage = Math.min((value / max) * 100, 100);
  const barRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = `${percentage}%`;
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-offroad-muted font-medium">{label}</span>
        <span className="text-sm font-bold text-offroad-text" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          {value}{unit}
        </span>
      </div>
      <div className="h-3 bg-offroad-darker rounded-full overflow-hidden border border-offroad-border/30">
        <div
          ref={barRef}
          className="h-full bg-gradient-to-r from-offroad-accent to-offroad-accent-light rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: "0%" }}
        >
          <div className="absolute inset-0 bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, highlighted }) {
  return (
    <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300 ${
      highlighted
        ? "bg-offroad-accent/10 border-offroad-accent/30"
        : "bg-offroad-darker border-offroad-border/30 hover:border-offroad-border"
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        highlighted ? "bg-offroad-accent text-white" : "bg-offroad-card text-offroad-muted"
      }`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-offroad-muted uppercase tracking-wider">{label}</div>
        <div className="text-sm font-semibold text-offroad-text truncate">{value}</div>
      </div>
    </div>
  );
}

export default function VehicleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));
  const [isEngineOn, setIsEngineOn] = useState(false);
  const engineRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
    };
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-screen pt-28 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-offroad-text mb-4" style={{ fontFamily: "Rajdhani, sans-serif" }}>
          Araç Bulunamadı
        </h1>
        <p className="text-offroad-muted mb-8">Bu ID ile eşleşen bir araç yok.</p>
        <Link to="/araclar" className="px-6 py-3 bg-offroad-accent text-white font-semibold rounded-xl">
          Araçlara Dön
        </Link>
      </div>
    );
  }

  const { specs } = vehicle;

  const similar = vehicles
    .filter((v) => v.id !== vehicle.id && v.specs.fuelType === specs.fuelType)
    .slice(0, 3);

  const handleEngine = () => {
    if (!isEngineOn) {
      engineRef.current = playEngineSound(vehicle.id);
    } else {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
    }
    setIsEngineOn(!isEngineOn);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-8 lg:px-12 mb-6">
        <nav className="flex items-center gap-2 text-sm text-offroad-muted">
          <Link to="/" className="hover:text-offroad-text transition-colors">Ana Sayfa</Link>
          <span>/</span>
          <Link to="/araclar" className="hover:text-offroad-text transition-colors">Araçlar</Link>
          <span>/</span>
          <span className="text-offroad-accent font-medium truncate">{vehicle.name}</span>
        </nav>
      </div>

      {/* Hero Area */}
      <div className="px-4 sm:px-8 lg:px-12 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left - Image */}
          <div className="relative rounded-3xl overflow-hidden border border-offroad-border bg-offroad-card animate-fade-in">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-[350px] lg:h-[480px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-offroad-dark/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-wrap gap-2">
              {specs.lockedDiff && (
                <span className="inline-flex items-center gap-1.5 bg-offroad-accent/90 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Kilitli Dif
                </span>
              )}
              <span className="bg-offroad-dark/80 backdrop-blur-sm text-offroad-text text-sm font-bold px-4 py-2 rounded-full border border-offroad-border">
                {specs.fuelType}
              </span>
            </div>

            {/* Engine Button on Image */}
            <button
              onClick={handleEngine}
              className={`absolute bottom-5 right-5 flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 backdrop-blur-sm ${
                isEngineOn
                  ? "bg-green-500/20 text-green-400 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] animate-pulse"
                  : "bg-offroad-dark/80 text-white border border-offroad-border hover:border-offroad-accent hover:bg-offroad-accent/20"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isEngineOn ? "bg-green-400 shadow-[0_0_8px_#22c55e]" : "bg-offroad-accent"}`} />
              {isEngineOn ? "ENGINE ON" : "START-STOP"}
            </button>
          </div>

          {/* Right - Info */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-offroad-text mb-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              {vehicle.name}
            </h1>
            <p className="text-offroad-accent font-medium italic text-lg mb-6">
              "{vehicle.slogan}"
            </p>
            <p className="text-offroad-muted leading-relaxed text-base mb-8">
              {vehicle.description}
            </p>

            {/* Key Specs Grid */}
            <h3 className="text-lg font-bold text-offroad-text mb-4 flex items-center gap-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-offroad-accent" stroke="currentColor" strokeWidth="2">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
              </svg>
              TEMEL BİLGİLER
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>}
                label="Motor"
                value={specs.engineDisplacement}
              />
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                label="Tork"
                value={specs.torque}
              />
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h2v4H6zm4 0h2v4h-2zm4 0h2v4h-2z" /></svg>}
                label="Şanzıman"
                value={specs.transmission}
              />
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="17" r="3" /><circle cx="17" cy="17" r="3" /><path d="M10 17H14M7 14V9a2 2 0 012-2h6a2 2 0 012 2v5" /></svg>}
                label="4x4 Sistem"
                value={specs.fourWD}
                highlighted
              />
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M3 21V8l9-5 9 5v13" /><path d="M9 21v-6h6v6" /></svg>}
                label="Süspansiyon"
                value={specs.suspensionType}
              />
              <InfoCard
                icon={<svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18" strokeLinecap="round" /><circle cx="12" cy="12" r="9" /></svg>}
                label="Ağırlık"
                value={`${specs.weight} kg`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Bars - Full Width */}
      <div className="px-4 sm:px-8 lg:px-12 mb-16">
        <div className="bg-offroad-card border border-offroad-border rounded-3xl p-6 md:p-10 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h3 className="text-lg font-bold text-offroad-text mb-6 flex items-center gap-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-offroad-accent" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
            ARAZİ PERFORMANSI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            <SpecBar label="Beygir Gücü" value={specs.horsepower} max={specs.maxHorsepower} unit=" HP" />
            <SpecBar label="Yaklaşma Açısı" value={specs.approachAngle} max={specs.maxApproachAngle} unit="°" />
            <SpecBar label="Uzaklaşma Açısı" value={specs.departureAngle} max={specs.maxDepartureAngle} unit="°" />
            <SpecBar label="Yerden Yükseklik" value={specs.groundClearance} max={specs.maxGroundClearance} unit=" mm" />
            <SpecBar label="Su Geçiş Derinliği" value={specs.wadingDepth} max={specs.maxWadingDepth} unit=" mm" />
          </div>
        </div>
      </div>

      {/* Similar Vehicles */}
      {similar.length > 0 && (
        <div className="px-4 sm:px-8 lg:px-12">
          <h3 className="text-2xl font-bold text-offroad-text mb-6" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            BENZER <span className="text-offroad-accent">ARAÇLAR</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((v, i) => (
              <Link to={`/araclar/${v.id}`} key={v.id} className="block" onClick={() => window.scrollTo(0, 0)}>
                <div className="group relative bg-offroad-card rounded-2xl overflow-hidden border border-offroad-border hover:border-offroad-accent/50 transition-all duration-300 hover:-translate-y-1">
                  <img src={v.image} alt={v.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-offroad-card via-transparent to-transparent" />
                  <div className="p-5">
                    <h4 className="font-bold text-offroad-text group-hover:text-offroad-accent transition-colors" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                      {v.name}
                    </h4>
                    <p className="text-xs text-offroad-muted mt-1">{v.specs.horsepower} HP · {v.specs.fuelType}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="px-4 sm:px-8 lg:px-12 mt-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-offroad-muted hover:text-offroad-accent transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m7-7l-7 7 7 7" />
          </svg>
          Geri Dön
        </button>
      </div>
    </div>
  );
}
