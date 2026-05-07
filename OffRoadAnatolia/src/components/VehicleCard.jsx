import { useState, useRef, useEffect } from "react";
import { playEngineSound } from "../lib/engineSound";

export default function VehicleCard({ vehicle, onClick, index }) {
  const [isEngineOn, setIsEngineOn] = useState(false);
  const engineRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (engineRef.current) {
        engineRef.current.stop();
        engineRef.current = null;
      }
    };
  }, []);

  const handleEngineToggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
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
    <div
      id={`vehicle-card-${vehicle.id}`}
      onClick={() => onClick(vehicle)}
      className="group relative bg-offroad-card rounded-2xl overflow-hidden cursor-pointer 
                 border border-offroad-border hover:border-offroad-accent/50 
                 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl 
                 hover:shadow-offroad-accent/10 animate-fade-in mud-texture flex flex-col"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "both" }}
    >
      {/* Image Container */}
      <div className="relative h-56 shrink-0 overflow-hidden">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-offroad-card via-transparent to-transparent" />
        
        {/* 4x4 Badge */}
        {vehicle.specs.lockedDiff && (
          <div className="absolute top-4 right-4 bg-offroad-accent/90 backdrop-blur-sm text-white 
                          text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5
                          shadow-lg shadow-offroad-accent/30">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            KİLİTLİ DİF
          </div>
        )}

        {/* Hover play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-16 h-16 rounded-full bg-offroad-accent/80 backdrop-blur-sm flex items-center justify-center 
                          shadow-xl shadow-offroad-accent/30 transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M15 12l-6 4V8l6 4z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <h3
          className="text-xl font-bold text-offroad-text group-hover:text-offroad-accent transition-colors duration-300 mb-1"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          {vehicle.name}
        </h3>
        <p className="text-sm text-offroad-accent font-medium italic mb-4">
          "{vehicle.slogan}"
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2.5 bg-offroad-darker rounded-xl border border-offroad-border/50">
            <div className="text-offroad-accent font-bold text-lg" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {vehicle.specs.horsepower}
            </div>
            <div className="text-[10px] text-offroad-muted uppercase tracking-wider">
              HP
            </div>
          </div>
          <div className="text-center p-2.5 bg-offroad-darker rounded-xl border border-offroad-border/50">
            <div className="text-offroad-accent font-bold text-lg" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {vehicle.specs.groundClearance}
            </div>
            <div className="text-[10px] text-offroad-muted uppercase tracking-wider">
              mm
            </div>
          </div>
          <div className="text-center p-2.5 bg-offroad-darker rounded-xl border border-offroad-border/50">
            <div className="text-offroad-accent font-bold text-lg" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              {vehicle.specs.approachAngle}°
            </div>
            <div className="text-[10px] text-offroad-muted uppercase tracking-wider">
              Yaklaşma
            </div>
          </div>
        </div>

        <div className="grow" />

        {/* View Details & Engine Action CTA */}
        <div className="mt-6 flex items-center justify-between border-t border-offroad-border/50 pt-4">
          <button
            onClick={handleEngineToggle}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
              isEngineOn
                ? "bg-transparent text-green-500 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-pulse"
                : "bg-offroad-darker text-white border-offroad-border hover:border-offroad-accent hover:bg-offroad-accent/10"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isEngineOn ? "bg-green-500 shadow-[0_0_8px_#22c55e]" : "bg-offroad-accent"
              }`}
            />
            {isEngineOn ? "ENGINE ON" : "START-STOP"}
          </button>
          <div className="flex items-center gap-2 text-offroad-accent text-sm font-semibold 
                          group-hover:gap-3 transition-all duration-300">
            İncele
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-7-7l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-offroad-accent via-offroad-accent-light to-offroad-khaki 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  );
}
