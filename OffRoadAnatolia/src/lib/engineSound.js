// Motor sesi profilleri - her araç için yerel ses dosyası
// Ses dosyaları public/sounds/ klasöründe barındırılır

// Araç ID -> ses dosyası eşleştirmeleri (her araca özel)
export const vehicleSoundMap = {
  1: '/sounds/ford_ranger.mp3',      // Ford Ranger Wildtrak - 2.0L Bi-Turbo
  2: '/sounds/hilux_gr.mp3',         // Toyota Hilux GR Sport - 2.8L D-4D
  3: '/sounds/amarok_v6.mp3',        // Volkswagen Amarok - 3.0L V6 TDI
  4: '/sounds/tucson.mp3',           // Hyundai Tucson - 1.6L CRDi
  5: '/sounds/hilux_invincible.mp3', // Toyota Hilux Invincible - 2.4L D-4D
  6: '/sounds/xclass.mp3',           // Mercedes X-Class - 2.3L Twin-Turbo
  7: '/sounds/l200.mp3',             // Mitsubishi L200 - 2.4L MIVEC
  8: '/sounds/navara.mp3',           // Nissan Navara - 2.3L dCi Twin-Turbo
};

// Fallback sıralama: araç sesi yoksa genel bir ses dene
const FALLBACK_SOUND = '/sounds/diesel_medium.mp3';

export function playEngineSound(vehicleId) {
  const soundUrl = vehicleSoundMap[vehicleId] || FALLBACK_SOUND;
  
  const audio = new Audio(soundUrl);
  audio.volume = 0.7;
  audio.loop = true; // Motor sesi sürekli çalsın (rölanti efekti)
  
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch((err) => {
      console.warn('Motor sesi çalınamadı:', err.message);
    });
  }

  return {
    audio,
    stop: () => {
      // Fade out efekti - ani kapanma yerine yumuşak geçiş
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume = Math.max(0, audio.volume - 0.05);
        } else {
          clearInterval(fadeOut);
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0.7;
        }
      }, 50);
    },
  };
}
