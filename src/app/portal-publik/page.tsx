"use client"

import { useState } from "react"
import { Search, ShieldCheck, ShieldAlert, ShieldQuestion, ChevronDown, Globe2, Calendar, Tag } from "lucide-react"

type StatusKepatuhan = "terdaftar" | "belum_terdaftar" | "dalam_investigasi"

interface StatusPlatform {
  nama: string
  domisili: string
  kategori: string
  status: StatusKepatuhan
  keterangan: string
  diperbarui: string
  nomorSKD: string | null
  tanggalRegistrasi: string | null
}

const dataPlatform: StatusPlatform[] = [
  { nama: "ChatGPT (OpenAI)", domisili: "Amerika Serikat", kategori: "AI Generatif - Chat", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "03 Nov 2025", nomorSKD: "SKD/2025/00104", tanggalRegistrasi: "03 Nov 2025" },
  { nama: "Claude AI (Anthropic)", domisili: "Amerika Serikat", kategori: "AI Generatif - Chat", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "06 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Gemini Advanced", domisili: "Amerika Serikat", kategori: "AI Generatif - Chat", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "06 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "DeepSeek", domisili: "Tiongkok", kategori: "AI Generatif - Chat", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "05 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Grok AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Chat", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "05 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Mistral Le Chat", domisili: "Prancis", kategori: "AI Generatif - Chat", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "24 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Perplexity AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Search", status: "belum_terdaftar", keterangan: "SKD dicabut karena gagal lolos evaluasi berkala kedua.", diperbarui: "19 Sep 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Microsoft 365 Copilot", domisili: "Amerika Serikat", kategori: "AI Produktivitas", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE, lolos 6x evaluasi berkala.", diperbarui: "18 Mar 2023", nomorSKD: "SKD/2023/00007", tanggalRegistrasi: "18 Mar 2023" },
  { nama: "Notion AI", domisili: "Amerika Serikat", kategori: "AI Produktivitas", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "20 Apr 2026", nomorSKD: "SKD/2026/00047", tanggalRegistrasi: "20 Apr 2026" },
  { nama: "Zoom AI Companion", domisili: "Amerika Serikat", kategori: "AI Produktivitas", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "02 Mei 2026", nomorSKD: "SKD/2026/00052", tanggalRegistrasi: "02 Mei 2026" },
  { nama: "Canva AI Suite", domisili: "Australia", kategori: "AI Desain", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "08 Mar 2026", nomorSKD: "SKD/2026/00033", tanggalRegistrasi: "08 Mar 2026" },
  { nama: "Adobe Firefly", domisili: "Amerika Serikat", kategori: "AI Generatif - Image", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "28 Jan 2026", nomorSKD: "SKD/2026/00019", tanggalRegistrasi: "28 Jan 2026" },
  { nama: "Midjourney", domisili: "Amerika Serikat", kategori: "AI Generatif - Image", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "02 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Ideogram AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Image", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "29 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Leonardo AI", domisili: "Australia", kategori: "AI Generatif - Image", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "20 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Stability AI", domisili: "Inggris", kategori: "AI Generatif - Image", status: "belum_terdaftar", keterangan: "SKD dicabut karena restrukturisasi entitas hukum di Indonesia.", diperbarui: "11 Agu 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Runway ML", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "30 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Runway AI Studio", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "15 Apr 2026", nomorSKD: "SKD/2026/00044", tanggalRegistrasi: "15 Apr 2026" },
  { nama: "Pika Labs", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", status: "belum_terdaftar", keterangan: "SKD dicabut karena tidak merespons permintaan verifikasi ulang.", diperbarui: "07 Okt 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Luma AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "18 Jun 2026", nomorSKD: "SKD/2026/00064", tanggalRegistrasi: "18 Jun 2026" },
  { nama: "HeyGen", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "01 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Synthesia", domisili: "Inggris", kategori: "AI Generatif - Video", status: "belum_terdaftar", keterangan: "SKD dicabut karena volume transaksi turun drastis di bawah ambang.", diperbarui: "22 Agu 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "ElevenLabs", domisili: "Inggris", kategori: "AI Generatif - Voice", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "10 Jun 2026", nomorSKD: "SKD/2026/00061", tanggalRegistrasi: "10 Jun 2026" },
  { nama: "ElevenLabs Reader", domisili: "Inggris", kategori: "AI Generatif - Voice", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "02 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "ScriptSynth AI", domisili: "Kanada", kategori: "AI Generatif - Voice", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "18 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "VoiceForge", domisili: "Inggris", kategori: "AI Generatif - Voice", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "04 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Suno AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Musik", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "29 Mei 2026", nomorSKD: "SKD/2026/00058", tanggalRegistrasi: "29 Mei 2026" },
  { nama: "Character.AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Chatbot", status: "belum_terdaftar", keterangan: "SKD dicabut karena perubahan struktur perusahaan tidak dilaporkan.", diperbarui: "03 Agu 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Replika", domisili: "Amerika Serikat", kategori: "AI Companion", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "21 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Jasper AI", domisili: "Amerika Serikat", kategori: "AI Penulisan", status: "terdaftar", keterangan: "Terdaftar sebagai Pemungut PPN PMSE.", diperbarui: "14 Feb 2026", nomorSKD: "SKD/2026/00025", tanggalRegistrasi: "14 Feb 2026" },
  { nama: "Grammarly AI", domisili: "Amerika Serikat", kategori: "AI Penulisan", status: "belum_terdaftar", keterangan: "SKD dicabut karena data setoran tidak sinkron selama 2 periode.", diperbarui: "15 Okt 2025", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Copy.ai", domisili: "Amerika Serikat", kategori: "AI Penulisan", status: "belum_terdaftar", keterangan: "Belum ada tanda registrasi PSE maupun SKD.", diperbarui: "21 Jun 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Cursor AI", domisili: "Amerika Serikat", kategori: "AI Code Assistant", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "06 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
  { nama: "Manus AI", domisili: "Tiongkok", kategori: "AI Agent", status: "dalam_investigasi", keterangan: "Status pemungutan PPN PMSE sedang dalam proses verifikasi oleh DJP.", diperbarui: "06 Jul 2026", nomorSKD: null, tanggalRegistrasi: null },
]

type KonfigStatusItem = {
  label: string
  badge: string
  cardBorder: string
  cardBg: string
  iconWrap: string
  icon: typeof ShieldCheck
}

const konfigStatus: Record<StatusKepatuhan, KonfigStatusItem> = {
  terdaftar: {
    label: "Terdaftar Pemungut PPN",
    badge: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300",
    cardBorder: "border-emerald-200",
    cardBg: "bg-emerald-50/40",
    iconWrap: "bg-emerald-100 text-emerald-600",
    icon: ShieldCheck,
  },
  belum_terdaftar: {
    label: "Belum Terdaftar",
    badge: "bg-red-100 text-red-700 ring-1 ring-red-300",
    cardBorder: "border-red-200",
    cardBg: "bg-red-50/40",
    iconWrap: "bg-red-100 text-red-600",
    icon: ShieldAlert,
  },
  dalam_investigasi: {
    label: "Dalam Investigasi",
    badge: "bg-amber-100 text-amber-700 ring-1 ring-amber-300",
    cardBorder: "border-amber-200",
    cardBg: "bg-amber-50/40",
    iconWrap: "bg-amber-100 text-amber-600",
    icon: ShieldQuestion,
  },
}

export default function CekStatusPage() {
  const [query, setQuery] = useState("")
  const [expandedNama, setExpandedNama] = useState<string | null>(null)

  const hasil = dataPlatform.filter((p) =>
    p.nama.toLowerCase().includes(query.toLowerCase())
  )

  function toggleExpand(nama: string) {
    setExpandedNama((prev) => (prev === nama ? null : nama))
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-6 rounded-full bg-teal-500" />
        <h1 className="text-2xl font-bold text-gray-900">Cek Status Platform</h1>
      </div>
      <p className="text-gray-500 mb-6 ml-4">
        Cari status pemungutan PPN PMSE dari platform digital luar negeri yang kamu gunakan.
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari nama platform AI... (contoh: ChatGPT, Claude, Midjourney)"
          className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      <div className="space-y-3">
        {query === "" && (
          <p className="text-gray-400 text-center py-10">
            Ketik nama platform untuk mulai mencari.
          </p>
        )}

        {query !== "" && hasil.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            Platform tidak ditemukan dalam basis data kami.
          </p>
        )}

        {hasil.map((p) => {
          const cfg = konfigStatus[p.status]
          const Icon = cfg.icon
          const isExpanded = expandedNama === p.nama

          return (
            <div
              key={p.nama}
              className={`rounded-xl border overflow-hidden transition-all duration-300 ${
                isExpanded ? `${cfg.cardBorder} shadow-md` : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <button
                onClick={() => toggleExpand(p.nama)}
                className={`w-full flex justify-between items-center p-5 text-left transition-colors ${
                  isExpanded ? cfg.cardBg : "bg-white"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.iconWrap}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900">
                      {p.nama}{" "}
                      <span className="text-gray-400 font-normal">· {p.domisili}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">{p.kategori}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${cfg.badge}`}
                  >
                    {cfg.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>

              {isExpanded && (
                <div className={`px-5 pb-5 ${cfg.cardBg}`}>
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{p.keterangan}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Globe2 className="w-3 h-3" /> Negara Asal
                        </p>
                        <p className="text-sm font-bold text-gray-800">{p.domisili}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Tag className="w-3 h-3" /> Kategori
                        </p>
                        <p className="text-sm font-bold text-gray-800">{p.kategori}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">
                          Nomor Sertifikat SKD
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {p.nomorSKD ?? "Belum diterbitkan"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Tanggal Registrasi
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          {p.tanggalRegistrasi ?? "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400">
                      Terakhir diperbarui: {p.diperbarui}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}