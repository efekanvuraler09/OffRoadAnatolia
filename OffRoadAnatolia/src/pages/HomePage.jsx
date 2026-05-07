import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import VehicleCard from "../components/VehicleCard";
import vehicles from "../data/vehicles";

export default function HomePage() {
  const featured = vehicles.filter((v) => [1, 3, 9].includes(v.id)).slice(0, 3);

  return (
    <>
      <HeroSection />

      {/* Featured Vehicles */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-offroad-accent/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-offroad-khaki/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full px-4 lg:px-8 mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-offroad-accent/10 border border-offroad-accent/20 
                             rounded-full text-offroad-accent text-xs font-semibold uppercase tracking-widest mb-6">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              ÖNE ÇIKAN ARAÇLAR
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold text-offroad-text mb-4"
              style={{ fontFamily: "Rajdhani, sans-serif" }}
            >
              ARAZİ{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-offroad-accent to-offroad-accent-light">
                YILDIZLARI
              </span>
            </h2>
            <p className="text-offroad-muted max-w-xl mx-auto">
              Filomuzdan seçilmiş en dikkat çekici off-road makineleri.
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-12 h-0.5 bg-offroad-border rounded-full" />
              <div className="w-3 h-3 rotate-45 border-2 border-offroad-accent" />
              <div className="w-12 h-0.5 bg-offroad-border rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 auto-rows-fr w-full">
            {featured.map((vehicle, index) => (
              <Link to={`/araclar/${vehicle.id}`} key={vehicle.id} className="block">
                <VehicleCard vehicle={vehicle} index={index} onClick={() => {}} />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/araclar"
              className="inline-flex items-center gap-3 px-10 py-4 bg-offroad-accent hover:bg-offroad-accent-light 
                         text-white font-bold rounded-xl transition-all duration-300 text-lg shadow-xl 
                         shadow-offroad-accent/25 hover:shadow-2xl hover:shadow-offroad-accent/40 active:scale-95"
            >
              Tüm Araçları Gör
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14m-5-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
