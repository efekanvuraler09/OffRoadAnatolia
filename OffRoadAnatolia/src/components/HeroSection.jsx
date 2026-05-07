import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/ranger_mud_bg.png')] bg-fixed bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-offroad-black/80 via-offroad-black/60 to-offroad-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-offroad-black/50 to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-offroad-accent/20 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-slide-up pb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-offroad-accent/10 border border-offroad-accent/30 
                        rounded-full text-offroad-accent text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-offroad-accent animate-pulse" />
          Türkiye'nin Off-Road Araç Rehberi
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "Rajdhani, sans-serif" }}
        >
          ARAZİNİN
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-offroad-accent via-offroad-accent-light to-offroad-khaki">
            GÜCÜNÜ KEŞFEDİN
          </span>
        </h1>

        <p className="text-lg md:text-xl text-offroad-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          En güçlü off-road araçlarını karşılaştırın, teknik özelliklerini
          inceleyin ve arazinin ruhunu keşfedin.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/araclar"
            id="hero-explore-btn"
            className="px-8 py-4 bg-offroad-accent hover:bg-offroad-accent-light text-white font-bold 
                       rounded-xl transition-all duration-300 text-lg shadow-xl shadow-offroad-accent/25 
                       hover:shadow-2xl hover:shadow-offroad-accent/40 active:scale-95 flex items-center gap-3"
          >
            Araçları Keşfet
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
          <Link
            to="/hakkimizda"
            id="hero-about-btn"
            className="px-8 py-4 bg-transparent border-2 border-offroad-border hover:border-offroad-accent/50 
                       text-offroad-text font-medium rounded-xl transition-all duration-300 text-lg 
                       hover:bg-offroad-accent/5"
          >
            Hakkımızda
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-96 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-50">
          <span className="text-xs text-offroad-muted tracking-widest uppercase">Kaydır</span>
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-offroad-accent" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14m-7-7l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
