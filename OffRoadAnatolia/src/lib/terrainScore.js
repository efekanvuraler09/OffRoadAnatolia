/**
 * Arazi Puanlama Algoritması (Terrain Score Engine)
 * 
 * Her aracın teknik özelliklerini analiz ederek 3 farklı arazi koşuluna
 * göre 0-10 arası performans puanı hesaplar.
 * 
 * Puanlama Kriterleri:
 * - Kaya Tırmanışı: Tork, yaklaşma/uzaklaşma açısı, yerden yükseklik, kilitli dif, ağırlık
 * - Çamur Performansı: Su geçiş derinliği, tork, kilitli dif, 4x4 sistemi, ağırlık
 * - Kum/Çöl: Beygir gücü, ağırlık, yerden yükseklik, 4x4 sistemi
 */

// Tork string'inden ("500 Nm") sayısal değeri çıkar
function parseTorque(torqueStr) {
  const match = torqueStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Bir değeri 0-1 arasına normalize et (min-max scaling)
function normalize(value, min, max) {
  if (max === min) return 0.5;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

// Veri aralıkları (projemizdeki araçlara göre kalibre edildi)
const RANGES = {
  torque:          { min: 250, max: 650 },
  horsepower:      { min: 100, max: 300 },
  approachAngle:   { min: 15,  max: 40 },
  departureAngle:  { min: 20,  max: 35 },
  groundClearance: { min: 150, max: 350 },
  wadingDepth:     { min: 300, max: 900 },
  weight:          { min: 1500, max: 2500 },
};

/**
 * 🪨 Kaya Tırmanışı Puanı
 * 
 * Kayalık arazide en önemli faktörler:
 * - Yüksek tork (düşük devirde güç)       → %25
 * - Geniş yaklaşma açısı                  → %20
 * - Geniş uzaklaşma açısı                 → %15
 * - Yüksek yerden yükseklik               → %15
 * - Kilitli diferansiyel                   → %15
 * - Düşük ağırlık (hafif = manevra)        → %10
 */
function calculateRockScore(specs) {
  const torque = parseTorque(specs.torque);
  
  const torqueScore     = normalize(torque, RANGES.torque.min, RANGES.torque.max);
  const approachScore   = normalize(specs.approachAngle, RANGES.approachAngle.min, RANGES.approachAngle.max);
  const departureScore  = normalize(specs.departureAngle, RANGES.departureAngle.min, RANGES.departureAngle.max);
  const clearanceScore  = normalize(specs.groundClearance, RANGES.groundClearance.min, RANGES.groundClearance.max);
  const diffBonus       = specs.lockedDiff ? 1.0 : 0.2;
  const weightScore     = 1 - normalize(specs.weight, RANGES.weight.min, RANGES.weight.max); // Hafif = iyi

  const raw = (
    torqueScore     * 0.25 +
    approachScore   * 0.20 +
    departureScore  * 0.15 +
    clearanceScore  * 0.15 +
    diffBonus       * 0.15 +
    weightScore     * 0.10
  );

  return Math.round(raw * 100) / 10; // 0.0 - 10.0
}

/**
 * 🟤 Çamur Performansı Puanı
 * 
 * Çamurda en önemli faktörler:
 * - Su geçiş derinliği (derin = çamurda batmaz)  → %30
 * - Yüksek tork                                  → %20
 * - Kilitli diferansiyel                          → %20
 * - 4x4 sistem kalitesi                           → %15
 * - Düşük ağırlık (hafif = batmaz)                → %15
 */
function calculateMudScore(specs) {
  const torque = parseTorque(specs.torque);

  const wadingScore = normalize(specs.wadingDepth, RANGES.wadingDepth.min, RANGES.wadingDepth.max);
  const torqueScore = normalize(torque, RANGES.torque.min, RANGES.torque.max);
  const diffBonus   = specs.lockedDiff ? 1.0 : 0.15;
  const weightScore = 1 - normalize(specs.weight, RANGES.weight.min, RANGES.weight.max);
  
  // 4x4 sistem kalitesi - sürekli > yarı zamanlı > seçilebilir
  let fourWDScore = 0.5;
  const fwd = specs.fourWD.toLowerCase();
  if (fwd.includes('sürekli') || fwd.includes('4motion') || fwd.includes('super select')) {
    fourWDScore = 1.0;
  } else if (fwd.includes('htrac') || fwd.includes('4matic')) {
    fourWDScore = 0.85;
  } else if (fwd.includes('yarı zamanlı')) {
    fourWDScore = 0.7;
  } else if (fwd.includes('seçilebilir')) {
    fourWDScore = 0.6;
  }

  const raw = (
    wadingScore   * 0.30 +
    torqueScore   * 0.20 +
    diffBonus     * 0.20 +
    fourWDScore   * 0.15 +
    weightScore   * 0.15
  );

  return Math.round(raw * 100) / 10;
}

/**
 * 🏜️ Kum / Çöl Puanı
 * 
 * Kumda en önemli faktörler:
 * - Beygir gücü (momentum kaybetmemek)       → %25
 * - Düşük ağırlık (batmamak)                 → %25
 * - Yerden yükseklik                          → %20
 * - 4x4 sistem kalitesi                       → %15
 * - Geniş yaklaşma açısı (kum tepeleri)       → %15
 */
function calculateSandScore(specs) {
  const hpScore        = normalize(specs.horsepower, RANGES.horsepower.min, RANGES.horsepower.max);
  const weightScore    = 1 - normalize(specs.weight, RANGES.weight.min, RANGES.weight.max);
  const clearanceScore = normalize(specs.groundClearance, RANGES.groundClearance.min, RANGES.groundClearance.max);
  const approachScore  = normalize(specs.approachAngle, RANGES.approachAngle.min, RANGES.approachAngle.max);
  
  let fourWDScore = 0.5;
  const fwd = specs.fourWD.toLowerCase();
  if (fwd.includes('sürekli') || fwd.includes('4motion') || fwd.includes('super select')) {
    fourWDScore = 1.0;
  } else if (fwd.includes('htrac') || fwd.includes('4matic')) {
    fourWDScore = 0.85;
  } else if (fwd.includes('yarı zamanlı')) {
    fourWDScore = 0.7;
  } else if (fwd.includes('seçilebilir')) {
    fourWDScore = 0.6;
  }

  const raw = (
    hpScore        * 0.25 +
    weightScore    * 0.25 +
    clearanceScore * 0.20 +
    fourWDScore    * 0.15 +
    approachScore  * 0.15
  );

  return Math.round(raw * 100) / 10;
}

/**
 * Ana fonksiyon - Araç için tüm arazi puanlarını hesapla
 * @param {object} specs - Aracın specs objesi
 * @returns {{ rock: number, mud: number, sand: number }}
 */
export function calculateTerrainScores(specs) {
  return {
    rock: calculateRockScore(specs),
    mud:  calculateMudScore(specs),
    sand: calculateSandScore(specs),
  };
}

/**
 * En yüksek puanı alan arazi tipini döndür
 * @param {{ rock: number, mud: number, sand: number }} scores
 * @returns {{ type: string, emoji: string, label: string, score: number }}
 */
export function getBestTerrain(scores) {
  const terrains = [
    { type: 'rock', emoji: '🪨', label: 'Kaya', score: scores.rock },
    { type: 'mud',  emoji: '🟤', label: 'Çamur', score: scores.mud },
    { type: 'sand', emoji: '🏜️', label: 'Kum', score: scores.sand },
  ];
  return terrains.reduce((best, t) => t.score > best.score ? t : best, terrains[0]);
}
