# Motor Sesleri Kurulum Talimatları

Bu projedeki her araç için gerçek motor sesi gereklidir. 
Ses dosyaları `public/sounds/` klasörüne `.mp3` formatında konmalıdır.

## Gerekli Dosyalar

| Dosya Adı | Araçlar | Ses Karakteri |
|-----------|---------|---------------|
| `diesel_heavy.mp3` | Ford Ranger, Hilux GR Sport, Nissan Navara | Ağır dizel pickup - marş + rölanti |
| `diesel_v6.mp3` | Volkswagen Amarok 3.0L V6 TDI | V6 dizel gurultu - derin ve güçlü |
| `diesel_suv.mp3` | Hyundai Tucson 1.6 CRDi | SUV dizel - yumuşak ama güçlü |
| `diesel_medium.mp3` | Toyota Hilux Invincible, Mitsubishi L200 | Orta boy dizel pickup - standart tıkırtı |
| `diesel_luxury.mp3` | Mercedes X-Class | Lüks dizel - sessiz ve rafine |
| `petrol_vintage.mp3` | Renault 12 Toros 🔥 | Eski benzinli marş - uzun tıkırtı, efsane ses |

## Nereden İndirilir?

### Ücretsiz Kaynaklar (önerilen sıralama):

1. **Mixkit.co** (en kolay)
   - https://mixkit.co/free-sound-effects/car/
   - "engine start", "truck engine", "car ignition" aratın
   - "Download free" butonuna tıklayın
   
2. **Pixabay.com**
   - https://pixabay.com/sound-effects/search/diesel%20engine%20start/
   - Hesap gerekebilir ama ücretsiz
   
3. **Freesound.org**
   - https://freesound.org
   - "diesel engine cold start", "V6 idle", "old car start" aratın
   - Ücretsiz hesap gerekli

### Önerilen Arama Terimleri:

| Profil | İngilizce Arama |
|--------|-----------------|
| diesel_heavy | "diesel pickup truck engine start cold start" |
| diesel_v6 | "V6 diesel engine start idle" |
| diesel_suv | "SUV diesel engine start" |
| diesel_medium | "diesel car engine ignition start idle" |
| diesel_luxury | "luxury car diesel engine quiet start" |
| petrol_vintage | "old car engine start vintage retro ignition crank" |

## Dosyaları Yerleştirme

İndirdiğiniz ses dosyalarını şu klasöre koyun:
```
OffRoadAnatolia/
└── public/
    └── sounds/
        ├── diesel_heavy.mp3
        ├── diesel_v6.mp3
        ├── diesel_suv.mp3
        ├── diesel_medium.mp3
        ├── diesel_luxury.mp3
        └── petrol_vintage.mp3
```

## Ses Format Gereksinimleri

- **Format:** MP3 (tarayıcı uyumluluğu için)
- **Uzunluk:** 3-10 saniye (loop olarak çalacak)
- **Kalite:** 128kbps veya üzeri
- **İçerik:** Marş alma sesi + rölanti (sürekli tekrar edebilir olmalı)
