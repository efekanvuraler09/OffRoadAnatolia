import { Link } from "react-router-dom";
import vehicles from "../data/vehicles";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-offroad-accent/10 border border-offroad-accent/20 
                           rounded-full text-offroad-accent text-xs font-semibold uppercase tracking-widest mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4m0-4h.01" />
            </svg>
            HAKKIMIZDA
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-offroad-text mb-6"
            style={{ fontFamily: "Rajdhani, sans-serif" }}
          >
            OFFROAD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-offroad-accent to-offroad-accent-light">
              ANATOLIA
            </span>
          </h1>
          <p className="text-lg text-offroad-muted max-w-2xl mx-auto leading-relaxed">
            Türkiye'nin en kapsamlı off-road araç bilgi ve karşılaştırma platformu.
            Arazinin gücünü keşfedin, hayalinizdeki aracı bulun.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
              title: "Misyonumuz",
              text: "Türkiye pazarında satılan off-road araçlarını tarafsız ve teknik verilerle karşılaştırarak, alıcıların en doğru kararı vermesine yardımcı olmak.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              ),
              title: "Vizyonumuz",
              text: "Anadolu'nun eşsiz coğrafyasını keşfetmek isteyen off-road tutkunlarının ilk başvuru noktası olmak ve Türkiye'nin arazi kültürünü dijitale taşımak.",
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Değerlerimiz",
              text: "Doğru teknik veri, tarafsız karşılaştırma, kullanıcı odaklı tasarım ve Türkiye pazarına özel yerelleştirilmiş içerik.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-offroad-card border border-offroad-border rounded-2xl p-8 text-center hover:border-offroad-accent/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-offroad-accent/10 border border-offroad-accent/20 flex items-center justify-center text-offroad-accent">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-offroad-text mb-3" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                {card.title}
              </h3>
              <p className="text-offroad-muted text-sm leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-offroad-card border border-offroad-border rounded-3xl p-8 md:p-12 mb-16 animate-fade-in">
          <h2 className="text-2xl font-bold text-offroad-text text-center mb-8" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            RAKAMLARLA <span className="text-offroad-accent">OFFROAD ANATOLIA</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: vehicles.length, label: "Araç Modeli" },
              { value: [...new Set(vehicles.map((v) => v.name.split(" ")[0]))].length, label: "Marka" },
              { value: vehicles.filter((v) => v.specs.lockedDiff).length, label: "Kilitli Dif" },
              { value: "7/24", label: "Erişim" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-offroad-accent mb-1" style={{ fontFamily: "Rajdhani, sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-offroad-muted uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Anatolia Culture */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-2xl font-bold text-offroad-text mb-6" style={{ fontFamily: "Rajdhani, sans-serif" }}>
            ANADOLU'NUN <span className="text-offroad-accent">ARAZİ KÜLTÜRÜ</span>
          </h2>
          <div className="bg-offroad-darker border border-offroad-border rounded-2xl p-8 space-y-4 text-offroad-muted leading-relaxed">
            <p>
              Anadolu, binlerce yıllık tarihi boyunca insanlara zorlu ama eşsiz güzellikte bir coğrafya sunmuştur.
              Toros Dağları'nın sarp geçitlerinden, Kapadokya'nın peri bacalarına; Doğu Anadolu'nun yüksek platolarından,
              Ege'nin engebeli zeytinliklerine kadar bu topraklar, güçlü ve dayanıklı araçlara her zaman ihtiyaç duymuştur.
            </p>
            <p>
              Efsanevi Renault 12 Toros'tan günümüzün modern pickup'larına kadar, Anadolu'da bir araç sadece bir ulaşım
              aracı değil — bir yaşam biçimidir. Çiftçiden dağcıya, orman muhafızından maceracıya, herkesin güvenebileceği
              bir yol arkadaşı arayışı bu toprakların DNA'sına işlenmiştir.
            </p>
            <p>
              OffRoad Anatolia olarak bu kültürü dijital dünyaya taşıyor, Türkiye pazarında satılan en güçlü arazi
              araçlarını bir araya getirerek sizlere sunuyoruz.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in">
          <Link
            to="/araclar"
            className="inline-flex items-center gap-3 px-10 py-4 bg-offroad-accent hover:bg-offroad-accent-light 
                       text-white font-bold rounded-xl transition-all duration-300 text-lg shadow-xl 
                       shadow-offroad-accent/25 hover:shadow-2xl hover:shadow-offroad-accent/40 active:scale-95"
          >
            Araçları Keşfet
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
