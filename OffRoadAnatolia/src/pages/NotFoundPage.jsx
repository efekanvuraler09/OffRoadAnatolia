import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 mb-8 rounded-full bg-offroad-card border border-offroad-border flex items-center justify-center animate-pulse">
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-offroad-accent" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1
        className="text-6xl md:text-8xl font-bold text-offroad-accent mb-4"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        404
      </h1>
      <h2
        className="text-2xl md:text-3xl font-bold text-offroad-text mb-4"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        SAYFA BULUNAMADI
      </h2>
      <p className="text-offroad-muted mb-8 max-w-md">
        Aradığınız sayfa arazi parkurunda kaybolmuş gibi görünüyor.
        Ana sayfaya dönüp tekrar keşfe çıkabilirsiniz.
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-offroad-accent hover:bg-offroad-accent-light text-white font-bold 
                   rounded-xl transition-all duration-300 text-lg shadow-xl shadow-offroad-accent/25 
                   hover:shadow-2xl active:scale-95 flex items-center gap-3"
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
        </svg>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
