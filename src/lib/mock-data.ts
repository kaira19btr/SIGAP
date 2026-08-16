export type Platform = {
  id: string
  nama: string
  domisili: string
  status: "Belum Terdaftar" | "Red Flag" | "SKD" | "Pemungut Resmi"
  confidenceScore: number
  traffic: number
  estimasiTransaksi: number
}

export const mockPlatforms: Platform[] = [
  {
    id: "1",
    nama: "Kling AI",
    domisili: "Tiongkok",
    status: "Red Flag",
    confidenceScore: 87,
    traffic: 15000,
    estimasiTransaksi: 750000000,
  },
  {
    id: "2",
    nama: "OpenAI",
    domisili: "Amerika Serikat",
    status: "Pemungut Resmi",
    confidenceScore: 100,
    traffic: 500000,
    estimasiTransaksi: 12000000000,
  },
  {
    id: "3",
    nama: "Vertex Nova AI",
    domisili: "Singapura",
    status: "SKD",
    confidenceScore: 92,
    traffic: 8000,
    estimasiTransaksi: 900000000,
  },
  {
    id: "4",
    nama: "Sora Ren AI",
    domisili: "Jepang",
    status: "Belum Terdaftar",
    confidenceScore: 45,
    traffic: 3000,
    estimasiTransaksi: 200000000,
  },
  {
    id: "5",
    nama: "Hanul AI",
    domisili: "Korea Selatan",
    status: "Red Flag",
    confidenceScore: 78,
    traffic: 11000,
    estimasiTransaksi: 620000000,
  },
]
export const extraPlatforms: Platform[] = [
  { id: "6", nama: "PixelForge AI", domisili: "Taiwan", status: "Belum Terdaftar", confidenceScore: 38, traffic: 2500, estimasiTransaksi: 150000000 },
  { id: "7", nama: "Lumen Cognition", domisili: "Kanada", status: "SKD", confidenceScore: 81, traffic: 6200, estimasiTransaksi: 480000000 },
  { id: "8", nama: "DeepStroke Studio", domisili: "Jerman", status: "Red Flag", confidenceScore: 73, traffic: 9800, estimasiTransaksi: 540000000 },
  { id: "9", nama: "Aurelia Synth", domisili: "Prancis", status: "Belum Terdaftar", confidenceScore: 29, traffic: 1800, estimasiTransaksi: 95000000 },
  { id: "10", nama: "NextGen Voice", domisili: "India", status: "SKD", confidenceScore: 88, traffic: 14000, estimasiTransaksi: 710000000 },
  { id: "11", nama: "Chronos Render", domisili: "Belanda", status: "Pemungut Resmi", confidenceScore: 95, traffic: 22000, estimasiTransaksi: 1800000000 },
]
export const sebaranNegara = [
  { negara: "Tiongkok", flag: "🇨🇳", total: 312, redFlag: 89, skd: 140, resmi: 83 },
  { negara: "Amerika Serikat", flag: "🇺🇸", total: 248, redFlag: 12, skd: 95, resmi: 141 },
  { negara: "Singapura", flag: "🇸🇬", total: 176, redFlag: 34, skd: 88, resmi: 54 },
  { negara: "Korea Selatan", flag: "🇰🇷", total: 154, redFlag: 41, skd: 60, resmi: 53 },
  { negara: "Jepang", flag: "🇯🇵", total: 121, redFlag: 18, skd: 70, resmi: 33 },
  { negara: "India", flag: "🇮🇳", total: 98, redFlag: 27, skd: 45, resmi: 26 },
  { negara: "Jerman", flag: "🇩🇪", total: 87, redFlag: 9, skd: 52, resmi: 26 },
  { negara: "Kanada", flag: "🇨🇦", total: 88, redFlag: 15, skd: 40, resmi: 33 },
]
export const summaryStats = {
  totalPlatform: { value: 1284, trend: "+3,2% dibanding kuartal lalu", up: true },
  totalRedFlag: { value: 57, trend: "12 baru minggu ini", up: false },
  totalSKD: { value: 342, trend: "+8 minggu ini", up: true },
  totalPemungut: { value: 89, trend: "Berdasarkan penunjukan resmi", up: null },
}
export const jejakAudit = [
  {
    id: "log-1",
    waktu: "15 Agu 2026, 09:42",
    aktor: "Sistem SIGAP",
    aksi: "Red Flag Otomatis",
    target: "Kling AI",
    detail: "Gap Rp500 Juta terdeteksi, melampaui ambang batas materialitas",
    tipe: "otomatis" as const,
  },
  {
    id: "log-2",
    waktu: "15 Agu 2026, 09:15",
    aktor: "Dr. Bambang Sutrisno",
    aksi: "Verifikasi Manual",
    target: "OpenAI",
    detail: "Verifikasi status pemungut resmi disetujui",
    tipe: "manual" as const,
  },
  {
    id: "log-3",
    waktu: "14 Agu 2026, 16:30",
    aktor: "Sistem SIGAP",
    aksi: "Notifikasi Resmi Terkirim",
    target: "Hanul AI",
    detail: "Surat pemberitahuan otomatis dikirim ke platform",
    tipe: "otomatis" as const,
  },
  {
    id: "log-4",
    waktu: "14 Agu 2026, 11:05",
    aktor: "Siti Andrayani",
    aksi: "Pencarian Platform",
    target: "Sora Ren AI",
    detail: "Menarik profil lengkap dan riwayat sinyal platform",
    tipe: "manual" as const,
  },
  {
    id: "log-5",
    waktu: "13 Agu 2026, 14:20",
    aktor: "Sistem SIGAP",
    aksi: "Agregasi Sinyal",
    target: "Vertex Nova AI",
    detail: "Confidence score diperbarui dari 88 menjadi 92",
    tipe: "otomatis" as const,
  },
  {
    id: "log-6",
    waktu: "12 Agu 2026, 10:00",
    aktor: "Dr. Bambang Sutrisno",
    aksi: "Ekspor Laporan",
    target: "Seluruh Platform",
    detail: "Mengunduh ringkasan kepatuhan periode Juli-Agustus 2026",
    tipe: "manual" as const,
  },
]