export type SumberSinyal =
  | "Similarweb"
  | "data.ai"
  | "Sensor Tower"
  | "BI / PSP"
  | "App Store / Play Store"
  | "Kominfo"
  | "Media Massa"

export type NodeType = "global" | "domestik"

export type JenisSinyal =
  | "Lonjakan Traffic"
  | "Transaksi Melebihi Ambang"
  | "Unduhan / IAP Terdeteksi"
  | "Update Status Registrasi"
  | "Pemberitaan Media"

export interface SinyalTemplate {
  platform: string
  domisili: string
  sumber: SumberSinyal
  jenis: JenisSinyal
  deltaSkor: number
  skorBaru: number
  keterangan: string
}

export interface SinyalEvent extends SinyalTemplate {
  id: string
  waktu: number
  node: NodeType
}

export function sumberKeNode(sumber: SumberSinyal): NodeType {
  if (sumber === "Similarweb" || sumber === "data.ai" || sumber === "Sensor Tower") {
    return "global"
  }
  if (sumber === "Media Massa") {
    return "global"
  }
  return "domestik"
}

export const nodeInfo: Record<NodeType, { label: string; sumberList: string }> = {
  global: {
    label: "Global Signal Node",
    sumberList: "Similarweb · data.ai · Sensor Tower · Media Massa",
  },
  domestik: {
    label: "Domestic Enforcement Node",
    sumberList: "Kominfo · PSP/BI · App Store / Play Store",
  },
}

export const poolSinyal: SinyalTemplate[] = [
  {
    platform: "Kling AI",
    domisili: "Tiongkok",
    sumber: "Similarweb",
    jenis: "Lonjakan Traffic",
    deltaSkor: 9,
    skorBaru: 87,
    keterangan: "Traffic domestik naik 22% dalam 7 hari terakhir",
  },
  {
    platform: "DeepSeek",
    domisili: "Tiongkok",
    sumber: "Sensor Tower",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 12,
    skorBaru: 91,
    keterangan: "Ranking aplikasi naik ke Top 10 kategori Produktivitas",
  },
  {
    platform: "NeoPay AI",
    domisili: "Singapura",
    sumber: "BI / PSP",
    jenis: "Transaksi Melebihi Ambang",
    deltaSkor: 7,
    skorBaru: 74,
    keterangan: "Volume transaksi PSP domestik lewati ambang bulan ke-2",
  },
  {
    platform: "VisionCraft",
    domisili: "Korea Selatan",
    sumber: "App Store / Play Store",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 5,
    skorBaru: 66,
    keterangan: "Billing terdeteksi belum di-routing lewat IAP resmi",
  },
  {
    platform: "PromptForge",
    domisili: "Amerika Serikat",
    sumber: "Media Massa",
    jenis: "Pemberitaan Media",
    deltaSkor: 3,
    skorBaru: 55,
    keterangan: "Disebut media lokal sebagai tools AI populer baru",
  },
  {
    platform: "Manus AI",
    domisili: "Tiongkok",
    sumber: "Sensor Tower",
    jenis: "Lonjakan Traffic",
    deltaSkor: 14,
    skorBaru: 85,
    keterangan: "Adopsi melonjak pasca peluncuran fitur baru minggu ini",
  },
  {
    platform: "Runway ML",
    domisili: "Amerika Serikat",
    sumber: "BI / PSP",
    jenis: "Transaksi Melebihi Ambang",
    deltaSkor: 6,
    skorBaru: 68,
    keterangan: "Kenaikan transaksi kartu kredit domestik terdeteksi",
  },
  {
    platform: "Midjourney Mobile",
    domisili: "Amerika Serikat",
    sumber: "data.ai",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 8,
    skorBaru: 62,
    keterangan: "Unduhan aplikasi naik tajam pekan ini",
  },
  {
    platform: "ScriptSynth AI",
    domisili: "Kanada",
    sumber: "Media Massa",
    jenis: "Pemberitaan Media",
    deltaSkor: 2,
    skorBaru: 48,
    keterangan: "Artikel ulasan produk di media teknologi lokal",
  },
  {
    platform: "Claude AI",
    domisili: "Amerika Serikat",
    sumber: "Similarweb",
    jenis: "Lonjakan Traffic",
    deltaSkor: 11,
    skorBaru: 82,
    keterangan: "Kunjungan domain naik konsisten 3 minggu berturut-turut",
  },
  {
    platform: "Gemini Advanced",
    domisili: "Amerika Serikat",
    sumber: "Sensor Tower",
    jenis: "Lonjakan Traffic",
    deltaSkor: 10,
    skorBaru: 79,
    keterangan: "Integrasi ekosistem Android mendorong adopsi baru",
  },
  {
    platform: "Grok AI",
    domisili: "Amerika Serikat",
    sumber: "data.ai",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 9,
    skorBaru: 76,
    keterangan: "Unduhan mandiri melonjak pasca fitur media sosial",
  },
  {
    platform: "HeyGen",
    domisili: "Amerika Serikat",
    sumber: "Sensor Tower",
    jenis: "Lonjakan Traffic",
    deltaSkor: 6,
    skorBaru: 61,
    keterangan: "Popularitas naik untuk kebutuhan konten pemasaran",
  },
  {
    platform: "Jasper AI",
    domisili: "Amerika Serikat",
    sumber: "BI / PSP",
    jenis: "Transaksi Melebihi Ambang",
    deltaSkor: 5,
    skorBaru: 66,
    keterangan: "Langganan konten marketing domestik terus naik",
  },
  {
    platform: "Perplexity AI",
    domisili: "Amerika Serikat",
    sumber: "App Store / Play Store",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 7,
    skorBaru: 74,
    keterangan: "Unduhan tinggi di Play Store, billing belum resmi",
  },
  {
    platform: "CapCut AI",
    domisili: "Tiongkok",
    sumber: "data.ai",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 13,
    skorBaru: 89,
    keterangan: "Basis pengguna sangat besar, billing IAP belum di-routing",
  },
  {
    platform: "Suno AI",
    domisili: "Amerika Serikat",
    sumber: "Similarweb",
    jenis: "Lonjakan Traffic",
    deltaSkor: 8,
    skorBaru: 61,
    keterangan: "Unduhan melonjak pasca fitur kolaborasi baru",
  },
  {
    platform: "Character.AI",
    domisili: "Amerika Serikat",
    sumber: "Kominfo",
    jenis: "Update Status Registrasi",
    deltaSkor: 4,
    skorBaru: 68,
    keterangan: "Belum ditemukan tanda daftar PSE Lingkup Privat",
  },
  {
    platform: "Mistral Le Chat",
    domisili: "Prancis",
    sumber: "Media Massa",
    jenis: "Pemberitaan Media",
    deltaSkor: 3,
    skorBaru: 51,
    keterangan: "Adopsi meningkat di kalangan developer Indonesia",
  },
  {
    platform: "Framer AI",
    domisili: "Belanda",
    sumber: "BI / PSP",
    jenis: "Transaksi Melebihi Ambang",
    deltaSkor: 5,
    skorBaru: 60,
    keterangan: "Transaksi langganan naik signifikan bulan ini",
  },
  {
    platform: "Windsurf AI",
    domisili: "Amerika Serikat",
    sumber: "data.ai",
    jenis: "Unduhan / IAP Terdeteksi",
    deltaSkor: 6,
    skorBaru: 56,
    keterangan: "Adopsi tim engineering lokal meningkat cepat",
  },
  {
    platform: "Lovable AI",
    domisili: "Swedia",
    sumber: "Similarweb",
    jenis: "Lonjakan Traffic",
    deltaSkor: 7,
    skorBaru: 64,
    keterangan: "Tren digunakan startup pemula naik cepat",
  },
]

export function waktuRelatif(waktu: number, sekarang: number): string {
  const detik = Math.floor((sekarang - waktu) / 1000)
  if (detik < 5) return "baru saja"
  if (detik < 60) return `${detik} detik lalu`
  const menit = Math.floor(detik / 60)
  if (menit < 60) return `${menit} menit lalu`
  const jam = Math.floor(menit / 60)
  return `${jam} jam lalu`
}