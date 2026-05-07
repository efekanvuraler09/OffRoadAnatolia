# OffRoad Anatolia — Geliştirme Yol Haritası (ROADMAP)

> **Son Güncelleme:** 2026-05-04  
> **Proje:** React 19 + Vite 8 + Tailwind CSS v4  
> **Tema:** Kırmızı (#e31c25) & Beyaz, koyu arka plan  
> **Mevcut Durum:** 9 araç, statik veri (vehicles.js), tek sayfa (SPA), modal detay

---

# MEVCUT MİMARİ ANALİZİ

## Dosya Yapısı
```
src/
├── App.jsx                    # Ana bileşen, araç grid + modal state
├── main.jsx                   # React entry point
├── index.css                  # Tailwind tema, animasyonlar, scrollbar
├── components/
│   ├── Navbar.jsx             # Fixed navbar, scroll efekti, mobil menü
│   ├── HeroSection.jsx        # Parallax arka plan, CTA butonları
│   ├── VehicleCard.jsx        # Araç kartı, Start-Stop motor sesi
│   ├── VehicleDetailModal.jsx # Detay modal, SpecBar + SpecIcon
│   └── Footer.jsx             # Dinamik araç sayacı, copyright
└── data/
    └── vehicles.js            # 9 araç, statik JSON array
```

## Tespit Edilen Sorunlar
1. **Navbar:** Yazılar dar ekranlarda iç içe geçiyor, spacing yetersiz
2. **Tek Sayfa:** Tüm araçlar + hero + footer tek App.jsx'te, routing yok
3. **Detay Modal:** "Dizel" badge'i dar/okunmaz, bar renkleri tutarsız (kırmızı+beyaz karışık)
4. **Hakkımızda:** Sadece footer'a anchor, gerçek bir sayfa/içerik yok
5. **Veri:** 9 araç elle JS'de tanımlı, ölçeklenemiyor
6. **Karşılaştırma:** Navbar'da link var ama özellik yok
7. **SEO/Performans:** Tek sayfa, meta tag'ler statik, lazy loading eksik

---

# FAZ 1 — UI / UX İYİLEŞTİRMELERİ

## 1.1 Navbar Düzeltmesi

**Sorun:** `gap-1` çok dar, logo + 4 link + CTA butonu sıkışıyor.

**Yapılacaklar:**
- [ ] `gap-1` → `gap-2` veya `gap-4` yap
- [ ] Link padding `px-4` → `px-5 py-2.5`
- [ ] Logo ile linkler arası `flex-grow` veya `justify-between` ile yayılsın
- [ ] Mobil menüde font boyutunu büyüt, touch target min 44px yap
- [ ] Scroll durumunda navbar yüksekliği `h-20` → `h-16` geçişi ekle
- [ ] Aktif sayfa için link altı çizgi (underline) kalıcı yap

**Dosya:** `src/components/Navbar.jsx`

---

## 1.2 Araçlar Ayrı Sayfa + Filtreleme

**Sorun:** Tüm 9 araç kartı ana sayfada listeleniyor, filtreleme yok.

**Yapılacaklar:**
- [ ] `react-router-dom` kur (`npm install react-router-dom`)
- [ ] Route yapısı oluştur:
  - `/` → Ana Sayfa (Hero + öne çıkan 3 araç + CTA)
  - `/araclar` → Araç Listesi (filtreleme + tüm kartlar)
  - `/araclar/:id` → Araç Detay (modal yerine tam sayfa)
  - `/hakkimizda` → Hakkımızda
- [ ] `src/pages/` klasörü oluştur:
  - `HomePage.jsx` — Hero + öne çıkan araçlar
  - `VehiclesPage.jsx` — Filtreli araç listesi
  - `VehicleDetailPage.jsx` — Tam sayfa detay
  - `AboutPage.jsx` — Hakkımızda
- [ ] Filtreleme sistemi:
  - Marka filtresi (Ford, Toyota, VW, vb.)
  - Yakıt tipi (Dizel / Benzin / LPG)
  - 4x4 sistemi (Sürekli / Yarı Zamanlı / Önden Çekiş)
  - Diferansiyel kilidi (Var / Yok)
  - HP aralığı (slider)
  - Yerden yükseklik aralığı (slider)
- [ ] Sıralama: HP'ye göre, ağırlığa göre, yerden yüksekliğe göre
- [ ] Ana sayfadaki araç grid'i kaldır, yerine "Tüm Araçları Gör" CTA koy

**Yeni Dosyalar:**
```
src/pages/HomePage.jsx
src/pages/VehiclesPage.jsx
src/pages/VehicleDetailPage.jsx
src/pages/AboutPage.jsx
src/components/VehicleFilter.jsx
src/components/FeaturedVehicles.jsx
```

---

## 1.3 Araç Detay Sayfası Modernleştirme

**Sorunlar:**
- "Dizel" badge'i dar ve okunmuyor
- Performans barlarında renk tutarsızlığı (bazıları `accent/kırmızı`, bazıları `khaki/beyaz`)
- Modal küçük ekranlarda scroll sorunu
- Spec bilgileri sıkışık

**Yapılacaklar:**
- [ ] Modal'dan tam sayfa detaya geçiş (`/araclar/:id`)
- [ ] Tüm SpecBar renkleri tek tutarlı gradient: `from-offroad-accent to-offroad-accent-light`
- [ ] `khaki` renk kullanımını barlardan kaldır
- [ ] Badge'leri büyüt: `text-xs` → `text-sm`, `px-3` → `px-4 py-2`
- [ ] Detay sayfası layout:
  - Sol: Büyük araç görseli (sticky)
  - Sağ: Spec bilgileri, barlar, açıklama
- [ ] Araç görseli için galeri/carousel desteği
- [ ] "Benzer Araçlar" bölümü ekle (aynı kategorideki diğer araçlar)
- [ ] Motor sesi çalma butonu detay sayfasında da olsun
- [ ] Sosyal medya paylaşım butonları

**Dosya:** `src/pages/VehicleDetailPage.jsx` (yeni) + `src/components/SpecBar.jsx` (ayrıştır)

---

## 1.4 Hakkımızda Sayfası

**Sorun:** `#about` anchor sadece footer'a gidiyor, gerçek içerik yok.

**Yapılacaklar:**
- [ ] `src/pages/AboutPage.jsx` oluştur
- [ ] Sayfa İçeriği:
  - Proje tanıtımı ve misyon
  - "Neden OffRoad Anatolia?" bölümü
  - Türkiye'nin arazi kültürü hakkında bilgi
  - İletişim formu (frontend-only veya mailto)
  - Sosyal medya linkleri
- [ ] Navbar'daki "Hakkımızda" → `/hakkimizda` route
- [ ] Hero'daki "Hakkımızda" butonu → `/hakkimizda` route
- [ ] Footer'daki referans → `/hakkimizda` route

**Dosya:** `src/pages/AboutPage.jsx`

---

## 1.5 Ek UI İyileştirmeleri

- [ ] **Loading State:** Sayfa geçişlerinde skeleton loader
- [ ] **404 Sayfası:** Bilinmeyen route'lar için özel 404
- [ ] **Breadcrumb:** Detay sayfasında "Ana Sayfa > Araçlar > Ford Ranger"
- [ ] **Back to Top:** Sayfa sonunda yukarı dön butonu
- [ ] **Dark/Light Toggle:** İleride (opsiyonel)
- [ ] **Responsive Test:** Tüm sayfalar 320px-1920px arası test
- [ ] **Karşılaştırma Özelliği:**
  - Araç kartlarında "Karşılaştır" checkbox
  - En fazla 3 araç seçilebilir
  - Yan yana spec tablosu
  - `/karsilastir` route

**Yeni Dosyalar:**
```
src/pages/ComparePage.jsx
src/components/CompareBar.jsx       # Alt kısımda seçili araçlar çubuğu
src/components/CompareTable.jsx     # Yan yana karşılaştırma tablosu
src/components/Breadcrumb.jsx
src/components/SkeletonCard.jsx
src/pages/NotFoundPage.jsx
```

---

# FAZ 2 — VERİTABANI ENTEGRASYONU

## 2.1 Veritabanı Seçimi ve Kurulumu

**Önerilen:** Supabase (PostgreSQL) — Ücretsiz tier, REST API, gerçek zamanlı

**Yapılacaklar:**
- [ ] Supabase hesabı aç → Yeni proje oluştur
- [ ] Proje URL ve `anon` key'i al
- [ ] `npm install @supabase/supabase-js`
- [ ] `src/lib/supabase.js` oluştur (client init)
- [ ] `.env` dosyasına key'leri ekle:
  ```
  VITE_SUPABASE_URL=https://xxx.supabase.co
  VITE_SUPABASE_ANON_KEY=xxx
  ```

**Dosyalar:**
```
src/lib/supabase.js
.env
.env.example
```

---

## 2.2 Veritabanı Tabloları

### `brands` — Marka Yönetimi
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | Birincil anahtar |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Ford, Toyota, VW... |
| logo_url | VARCHAR(500) | | Marka logosu URL |
| country | VARCHAR(50) | | Menşe ülke |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Oluşturma tarihi |

### `categories` — Araç Kategorileri
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | Birincil anahtar |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Pickup, SUV, Sedan, Efsane |
| slug | VARCHAR(50) | NOT NULL, UNIQUE | URL-dostu isim |
| icon_svg | TEXT | | Kategori ikonu (SVG) |

### `vehicles` — Ana Araç Tablosu
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | Birincil anahtar |
| brand_id | INT | FK → brands.id | Marka referansı |
| category_id | INT | FK → categories.id | Kategori referansı |
| name | VARCHAR(100) | NOT NULL | Model adı |
| slug | VARCHAR(100) | NOT NULL, UNIQUE | URL-dostu isim |
| slogan | VARCHAR(200) | | Tagline |
| description | TEXT | | Detaylı açıklama |
| image_url | VARCHAR(500) | | Ana görsel URL |
| engine_sound_url | VARCHAR(500) | | Motor sesi URL |
| engine_displacement | VARCHAR(50) | | Motor hacmi |
| horsepower | INT | | Beygir gücü |
| max_horsepower | INT | DEFAULT 300 | Bar skalası maks |
| torque | VARCHAR(30) | | Tork |
| approach_angle | INT | | Yaklaşma açısı |
| max_approach_angle | INT | DEFAULT 45 | Bar skalası maks |
| departure_angle | INT | | Ayrılma açısı |
| max_departure_angle | INT | DEFAULT 40 | Bar skalası maks |
| ground_clearance | INT | | Yerden yükseklik (mm) |
| max_ground_clearance | INT | DEFAULT 350 | Bar skalası maks |
| suspension_type | VARCHAR(100) | | Süspansiyon |
| four_wd | VARCHAR(100) | | 4x4 sistemi |
| locked_diff | BOOLEAN | DEFAULT FALSE | Kilitli dif |
| wading_depth | INT | | Su geçiş (mm) |
| max_wading_depth | INT | DEFAULT 1000 | Bar skalası maks |
| fuel_type | VARCHAR(30) | | Yakıt tipi |
| transmission | VARCHAR(50) | | Şanzıman |
| weight | INT | | Ağırlık (kg) |
| is_featured | BOOLEAN | DEFAULT FALSE | Öne çıkan mı |
| is_active | BOOLEAN | DEFAULT TRUE | Aktif mi |
| sort_order | INT | DEFAULT 0 | Sıralama |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | Oluşturma |
| updated_at | TIMESTAMPTZ | DEFAULT NOW() | Güncelleme |

### `vehicle_images` — Çoklu Görsel Galerisi
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | |
| vehicle_id | INT | FK → vehicles.id, ON DELETE CASCADE | |
| image_url | VARCHAR(500) | NOT NULL | Görsel URL |
| alt_text | VARCHAR(200) | | Açıklama |
| is_primary | BOOLEAN | DEFAULT FALSE | Ana görsel mi |
| sort_order | INT | DEFAULT 0 | Sıralama |

### `terrain_ratings` — Arazi Puanlaması
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | |
| vehicle_id | INT | FK → vehicles.id, ON DELETE CASCADE | |
| terrain_type | VARCHAR(50) | NOT NULL | Çamur, Kum, Kaya, Kar, Orman |
| rating | INT | CHECK (1-10) | Yetkinlik puanı |

### `engine_sounds` — Motor Sesleri
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | |
| vehicle_id | INT | FK → vehicles.id, ON DELETE CASCADE | |
| sound_type | VARCHAR(50) | NOT NULL | cold_start, idle, revving, exhaust |
| audio_url | VARCHAR(500) | NOT NULL | Ses URL |
| duration_ms | INT | | Süre (ms) |

### `comparisons` — Karşılaştırma Geçmişi
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | |
| vehicle_id_1 | INT | FK → vehicles.id | 1. araç |
| vehicle_id_2 | INT | FK → vehicles.id | 2. araç |
| view_count | INT | DEFAULT 1 | Kaç kez yapıldı |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | |

### `tags` — Etiket Sistemi
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| id | SERIAL | PK | |
| name | VARCHAR(50) | NOT NULL, UNIQUE | off-road, lüks, ekonomik... |
| color | VARCHAR(7) | | HEX renk kodu |

### `vehicle_tags` — Araç-Etiket İlişkisi (M:N)
| Sütun | Tip | Kısıtlama | Açıklama |
|-------|-----|-----------|----------|
| vehicle_id | INT | FK → vehicles.id | |
| tag_id | INT | FK → tags.id | |
| | | PK (vehicle_id, tag_id) | Bileşik anahtar |

---

## 2.3 İlişki Diyagramı (ER)

```
brands (1) ──────────< (N) vehicles (1) ──────< (N) vehicle_images
                              │
categories (1) ──────< (N) vehicles (1) ──────< (N) terrain_ratings
                              │
                              ├──────< (N) engine_sounds
                              │
                              >──────< (N) vehicle_tags >──────< tags
                              │
                    comparisons (vehicle_id_1, vehicle_id_2)
```

---

## 2.4 Frontend Entegrasyonu

**Yapılacaklar:**
- [ ] `src/lib/supabase.js` — Supabase client
- [ ] `src/hooks/useVehicles.js` — Araç listesi hook (filtreleme + pagination)
- [ ] `src/hooks/useVehicle.js` — Tekil araç hook (slug ile)
- [ ] `src/hooks/useBrands.js` — Marka listesi hook
- [ ] `src/hooks/useCategories.js` — Kategori listesi hook
- [ ] `vehicles.js` dosyasını tamamen kaldır
- [ ] Tüm bileşenlerde statik import yerine hook kullan

**Örnek Hook Yapısı:**
```javascript
// src/hooks/useVehicles.js
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useVehicles(filters = {}) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let query = supabase
      .from('vehicles')
      .select('*, brands(name, logo_url), categories(name)')
      .eq('is_active', true)
      .order('sort_order');

    if (filters.brandId) query = query.eq('brand_id', filters.brandId);
    if (filters.fuelType) query = query.eq('fuel_type', filters.fuelType);
    if (filters.lockedDiff !== undefined) query = query.eq('locked_diff', filters.lockedDiff);

    query.then(({ data, error }) => {
      if (error) setError(error);
      else setVehicles(data);
      setLoading(false);
    });
  }, [filters]);

  return { vehicles, loading, error };
}
```

---

## 2.5 Veri Migrasyon Planı

- [ ] Mevcut 9 aracın markalarını `brands` tablosuna ekle
- [ ] Kategorileri oluştur (Pickup, SUV, Efsane)
- [ ] Mevcut `vehicles.js`'deki 9 aracı SQL INSERT ile DB'ye aktar
- [ ] Görselleri Supabase Storage'a yükle (opsiyonel)
- [ ] `vehicles.js` dosyasını sil, tüm referansları hook'lara çevir
- [ ] Test: 9 aracın frontend'de sorunsuz listelendiğini doğrula

---

# FAZ 3 — İLERİ SEVİYE ÖZELLİKLER (Opsiyonel)

## 3.1 Performans
- [ ] Görsel optimizasyonu (WebP format, lazy loading)
- [ ] React.lazy + Suspense ile sayfa bazlı code splitting
- [ ] Supabase sorgu cache (React Query / SWR entegrasyonu)

## 3.2 SEO
- [ ] react-helmet ile sayfa bazlı meta tag'ler
- [ ] Open Graph tag'leri (sosyal medya paylaşım önizlemesi)
- [ ] Sitemap.xml otomatik oluşturma
- [ ] Araç detay sayfalarında structured data (JSON-LD)

## 3.3 PWA Desteği
- [ ] Service Worker ile offline cache
- [ ] manifest.json
- [ ] Push notification (yeni araç eklendiğinde)

## 3.4 Analytics
- [ ] Sayfa görüntülenme takibi
- [ ] En çok tıklanan araçlar
- [ ] Popüler karşılaştırma çiftleri
- [ ] Filtre kullanım istatistikleri

## 3.5 i18n (Çoklu Dil)
- [ ] Türkçe (varsayılan)
- [ ] İngilizce
- [ ] react-i18next entegrasyonu

---

# UYGULAMA SIRASI

| Sıra | Görev | Faz | Tahmini |
|------|-------|-----|---------|
| 1 | Navbar düzeltme | Faz 1.1 | 15 dk |
| 2 | React Router kurulumu | Faz 1.2 | 30 dk |
| 3 | Araçlar sayfası + filtreleme | Faz 1.2 | 45 dk |
| 4 | Detay sayfası modernleştirme | Faz 1.3 | 45 dk |
| 5 | Hakkımızda sayfası | Faz 1.4 | 20 dk |
| 6 | Karşılaştırma özelliği | Faz 1.5 | 45 dk |
| 7 | 404, breadcrumb, skeleton | Faz 1.5 | 20 dk |
| 8 | Supabase kurulum | Faz 2.1 | 15 dk |
| 9 | Tablo oluşturma | Faz 2.2 | 30 dk |
| 10 | Hook'lar + veri migrasyonu | Faz 2.4-2.5 | 45 dk |
| 11 | İleri özellikler | Faz 3 | Belirsiz |
