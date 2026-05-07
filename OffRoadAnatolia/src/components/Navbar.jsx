import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Ana Sayfa", to: "/" },
    { label: "Araçlar", to: "/araclar" },
    { label: "Hakkımızda", to: "/hakkimizda" },
  ];

  const isActive = (to) => location.pathname === to;

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-offroad-dark/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-offroad-border py-2"
          : "bg-transparent py-3"
      }`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" id="nav-logo" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                className="w-11 h-11 transition-transform duration-500 group-hover:rotate-90"
              >
                <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" className="text-offroad-accent" />
                <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-offroad-accent-light" />
                <circle cx="24" cy="24" r="4" className="fill-offroad-accent" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <line
                    key={angle}
                    x1="24" y1="4" x2="24" y2="10"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                    className="text-offroad-accent"
                    transform={`rotate(${angle} 24 24)`}
                  />
                ))}
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl font-bold tracking-wider text-offroad-text whitespace-nowrap"
                style={{ fontFamily: "Rajdhani, sans-serif" }}
              >
                OFFROAD <span className="text-offroad-accent">ANATOLIA</span>
              </span>
              <span className="text-[9px] tracking-[0.25em] text-offroad-muted uppercase hidden sm:block">
                Arazi Araçları Rehberi
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative px-5 py-2.5 text-sm font-medium transition-colors duration-300 rounded-lg whitespace-nowrap ${
                  isActive(item.to)
                    ? "text-offroad-accent bg-offroad-accent/10"
                    : "text-offroad-muted hover:text-offroad-text hover:bg-offroad-card/50"
                }`}
              >
                {item.label}
                {isActive(item.to) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-offroad-accent rounded-full" />
                )}
              </Link>
            ))}
            <Link
              to="/araclar"
              className="ml-3 px-7 py-2.5 bg-offroad-accent hover:bg-offroad-accent-light text-white text-sm font-semibold 
                         rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-offroad-accent/25 
                         active:scale-95 whitespace-nowrap"
            >
              Keşfet
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-offroad-text"
            aria-label="Menü"
          >
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0 scale-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="py-4 space-y-1 border-t border-offroad-border">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.to)
                    ? "text-offroad-accent bg-offroad-accent/10"
                    : "text-offroad-muted hover:text-offroad-text hover:bg-offroad-card"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
