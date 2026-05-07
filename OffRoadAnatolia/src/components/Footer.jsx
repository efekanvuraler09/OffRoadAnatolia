import { Link } from "react-router-dom";
import vehicles from "../data/vehicles";

export default function Footer() {
  return (
    <footer className="relative bg-offroad-dark border-t border-offroad-border mt-20">
      {/* Gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-offroad-accent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <h3
              className="text-2xl font-bold text-offroad-text flex items-center gap-2"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              OFFROAD <span className="text-offroad-accent">ANATOLIA</span>
            </h3>
          </Link>

          {/* Active Vehicle Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-offroad-card border border-offroad-accent/30 px-4 py-2 rounded-full">
              <span className="w-2.5 h-2.5 rounded-full bg-offroad-accent animate-pulse" />
              <span className="text-sm font-semibold text-offroad-text tracking-wider" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {vehicles.length} AKTİF ARAÇ MODELİ
              </span>
            </div>
            <Link
              to="/hakkimizda"
              className="text-sm text-offroad-muted hover:text-offroad-accent transition-colors"
            >
              Hakkımızda
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-offroad-muted text-center md:text-right">
            © 2026 OffRoad Anatolia. Tüm hakları saklıdır.
            <br className="hidden md:block" />
            <span className="text-xs pt-1 block">Anadolu'nun Arazi Ruhu 🏔️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
