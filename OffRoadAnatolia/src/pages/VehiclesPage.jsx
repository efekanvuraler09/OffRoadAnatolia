import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "../components/VehicleCard";
import vehicles from "../data/vehicles";

const BRANDS = [...new Set(vehicles.map((v) => v.name.split(" ")[0]))];
const FUEL_TYPES = [...new Set(vehicles.map((v) => v.specs.fuelType))];

export default function VehiclesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [diffLockOnly, setDiffLockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const filtered = useMemo(() => {
    let result = [...vehicles];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.slogan.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      );
    }

    if (selectedBrand !== "all") {
      result = result.filter((v) => v.name.startsWith(selectedBrand));
    }

    if (selectedFuel !== "all") {
      result = result.filter((v) => v.specs.fuelType === selectedFuel);
    }

    if (diffLockOnly) {
      result = result.filter((v) => v.specs.lockedDiff);
    }

    switch (sortBy) {
      case "hp-desc":
        result.sort((a, b) => b.specs.horsepower - a.specs.horsepower);
        break;
      case "hp-asc":
        result.sort((a, b) => a.specs.horsepower - b.specs.horsepower);
        break;
      case "ground-desc":
        result.sort((a, b) => b.specs.groundClearance - a.specs.groundClearance);
        break;
      case "weight-asc":
        result.sort((a, b) => a.specs.weight - b.specs.weight);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedBrand, selectedFuel, diffLockOnly, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedBrand("all");
    setSelectedFuel("all");
    setDiffLockOnly(false);
    setSortBy("default");
  };

  const hasActiveFilters =
    searchQuery || selectedBrand !== "all" || selectedFuel !== "all" || diffLockOnly || sortBy !== "default";

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full px-4 lg:px-8 mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-offroad-accent/10 border border-offroad-accent/20 
                           rounded-full text-offroad-accent text-xs font-semibold uppercase tracking-widest mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h1" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
            </svg>
            ARAZİ FİLOSU
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-offroad-text mb-4"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            TÜM{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-offroad-accent to-offroad-accent-light">
              ARAÇLAR
            </span>
          </h1>
          <p className="text-offroad-muted max-w-xl mx-auto">
            Filtrele, sırala ve hayalindeki arazi aracını bul.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-offroad-card border border-offroad-border rounded-2xl p-6 mb-10 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-xs text-offroad-muted uppercase tracking-wider mb-2">Arama</label>
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-offroad-muted"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Araç adı, slogan veya açıklama..."
                  className="w-full pl-10 pr-4 py-3 bg-offroad-darker border border-offroad-border rounded-xl text-offroad-text 
                             placeholder:text-offroad-muted/50 focus:outline-none focus:border-offroad-accent/50 transition-colors"
                />
              </div>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs text-offroad-muted uppercase tracking-wider mb-2">Marka</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-3 bg-offroad-darker border border-offroad-border rounded-xl text-offroad-text 
                           focus:outline-none focus:border-offroad-accent/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="all">Tüm Markalar</option>
                {BRANDS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Fuel */}
            <div>
              <label className="block text-xs text-offroad-muted uppercase tracking-wider mb-2">Yakıt</label>
              <select
                value={selectedFuel}
                onChange={(e) => setSelectedFuel(e.target.value)}
                className="w-full px-4 py-3 bg-offroad-darker border border-offroad-border rounded-xl text-offroad-text 
                           focus:outline-none focus:border-offroad-accent/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="all">Tümü</option>
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-xs text-offroad-muted uppercase tracking-wider mb-2">Sıralama</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-offroad-darker border border-offroad-border rounded-xl text-offroad-text 
                           focus:outline-none focus:border-offroad-accent/50 transition-colors cursor-pointer appearance-none"
              >
                <option value="default">Varsayılan</option>
                <option value="hp-desc">HP ↓ (Yüksek)</option>
                <option value="hp-asc">HP ↑ (Düşük)</option>
                <option value="ground-desc">Yerden Yükseklik ↓</option>
                <option value="weight-asc">Ağırlık ↑ (Hafif)</option>
              </select>
            </div>
          </div>

          {/* Extra filters row */}
          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-offroad-border/50">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={diffLockOnly}
                onChange={(e) => setDiffLockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-offroad-border bg-offroad-darker text-offroad-accent 
                           focus:ring-offroad-accent/50 focus:ring-2 cursor-pointer accent-[#e31c25]"
              />
              <span className="text-sm text-offroad-muted group-hover:text-offroad-text transition-colors">
                Sadece Kilitli Diferansiyel
              </span>
            </label>

            <div className="flex-grow" />

            <span className="text-sm text-offroad-muted">
              <span className="text-offroad-accent font-bold">{filtered.length}</span> araç bulundu
            </span>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-offroad-accent hover:text-offroad-accent-light transition-colors flex items-center gap-1"
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Filtreleri Temizle
              </button>
            )}
          </div>
        </div>

        {/* Vehicle Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8 auto-rows-fr w-full">
            {filtered.map((vehicle, index) => (
              <Link to={`/araclar/${vehicle.id}`} key={vehicle.id} className="block">
                <VehicleCard vehicle={vehicle} index={index} onClick={() => {}} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-offroad-card border border-offroad-border flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-offroad-muted" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-offroad-text mb-2" style={{ fontFamily: "Rajdhani, sans-serif" }}>
              Araç Bulunamadı
            </h3>
            <p className="text-offroad-muted mb-6">Filtreleri değiştirerek tekrar deneyin.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-offroad-accent hover:bg-offroad-accent-light text-white font-semibold rounded-xl transition-all duration-300"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
