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

// Fallback: araç sesi yoksa genel bir ses dene
const FALLBACK_SOUND = '/sounds/amarok_v6.mp3';

// iOS cihaz tespiti — iOS Safari'de audio.volume programatik olarak değiştirilemez
const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

export function playEngineSound(vehicleId) {
  const soundUrl = vehicleSoundMap[vehicleId] || FALLBACK_SOUND;
  
  const audio = new Audio(soundUrl);
  if (!isIOS) audio.volume = 0.7;
  audio.loop = true;
  
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch((err) => {
      console.warn('Motor sesi çalınamadı:', err.message);
    });
  }

  return {
    audio,
    stop: () => {
      if (isIOS) {
        // iOS: Volume değiştirilemez, direkt durdur
        audio.pause();
        audio.currentTime = 0;
      } else {
        // Desktop: Fade out efekti — yumuşak geçiş
        let vol = audio.volume;
        const fadeOut = setInterval(() => {
          vol -= 0.05;
          if (vol > 0.05) {
            audio.volume = vol;
          } else {
            clearInterval(fadeOut);
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0.7;
          }
        }, 50);
      }
    },
  };
}
