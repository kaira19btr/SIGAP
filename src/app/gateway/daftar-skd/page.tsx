"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShieldX, Calendar, ChevronDown, FileText, Building2 } from "lucide-react"
import AnimatedNumber from "@/components/AnimatedNumber"

type StatusSKD = "Aktif" | "Dicabut"

type PlatformSKD = {
  id: string
  platform: string
  domisili: string
  kategori: string
  nomorSertifikat: string
  tanggalTerbit: string
  status: StatusSKD
  tanggalEvaluasiBerikutnya: string
  alasanCabut: string | null
  riwayatEvaluasi: string
  petugasVerifikasi: string
}

const daftarSKD: PlatformSKD[] = [
  { id: "skd-1", platform: "Zoom AI Companion", domisili: "Amerika Serikat", kategori: "AI Produktivitas", nomorSertifikat: "SKD/2026/00052", tanggalTerbit: "2 Mei 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "2 Nov 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 1x evaluasi berkala", petugasVerifikasi: "Dedi Kurniawan, Tim Verifikasi SKD" },
  { id: "skd-2", platform: "OpenAI (ChatGPT)", domisili: "Amerika Serikat", kategori: "AI Generatif - Text/Chat", nomorSertifikat: "SKD/2025/00104", tanggalTerbit: "3 Nov 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Penyesuaian administratif, April 2026", riwayatEvaluasi: "Dicabut sebelum evaluasi pertama", petugasVerifikasi: "Andi Pratama, Tim Investigasi PMSE" },
  { id: "skd-3", platform: "Canva AI Suite", domisili: "Australia", kategori: "AI Desain", nomorSertifikat: "SKD/2026/00033", tanggalTerbit: "8 Mar 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "8 Sep 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 1x evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-4", platform: "Notion AI", domisili: "Amerika Serikat", kategori: "AI Produktivitas", nomorSertifikat: "SKD/2026/00047", tanggalTerbit: "20 Apr 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "20 Okt 2026", alasanCabut: null, riwayatEvaluasi: "Belum ada evaluasi berkala", petugasVerifikasi: "Dedi Kurniawan, Tim Verifikasi SKD" },
  { id: "skd-5", platform: "Grammarly AI", domisili: "Amerika Serikat", kategori: "AI Penulisan", nomorSertifikat: "SKD/2025/00098", tanggalTerbit: "15 Okt 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Data setoran tidak sinkron selama 2 periode", riwayatEvaluasi: "Gagal pada evaluasi ke-2", petugasVerifikasi: "Rina Kartika, Tim Investigasi PMSE" },
  { id: "skd-6", platform: "Spotify", domisili: "Swedia", kategori: "Streaming Musik", nomorSertifikat: "SKD/2025/00012", tanggalTerbit: "5 Jan 2025", status: "Aktif", tanggalEvaluasiBerikutnya: "5 Jul 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 3x evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-7", platform: "Netflix", domisili: "Amerika Serikat", kategori: "Streaming Video", nomorSertifikat: "SKD/2023/00002", tanggalTerbit: "9 Jan 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "9 Jul 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 6x evaluasi berkala", petugasVerifikasi: "Andi Pratama, Tim Verifikasi SKD" },
  { id: "skd-8", platform: "Adobe Firefly", domisili: "Amerika Serikat", kategori: "AI Generatif - Image", nomorSertifikat: "SKD/2026/00019", tanggalTerbit: "28 Jan 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "28 Jul 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 1x evaluasi berkala", petugasVerifikasi: "Dedi Kurniawan, Tim Verifikasi SKD" },
  { id: "skd-9", platform: "Perplexity AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Search", nomorSertifikat: "SKD/2025/00087", tanggalTerbit: "19 Sep 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Gagal lolos evaluasi berkala kedua", riwayatEvaluasi: "Gagal pada evaluasi ke-2", petugasVerifikasi: "Rina Kartika, Tim Investigasi PMSE" },
  { id: "skd-10", platform: "Grab", domisili: "Singapura", kategori: "Transportasi & Logistik", nomorSertifikat: "SKD/2024/00003", tanggalTerbit: "14 Feb 2024", status: "Aktif", tanggalEvaluasiBerikutnya: "14 Agu 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 5x evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-11", platform: "ElevenLabs", domisili: "Inggris", kategori: "AI Generatif - Voice", nomorSertifikat: "SKD/2026/00061", tanggalTerbit: "10 Jun 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "10 Des 2026", alasanCabut: null, riwayatEvaluasi: "Belum ada evaluasi berkala", petugasVerifikasi: "Andi Pratama, Tim Verifikasi SKD" },
  { id: "skd-12", platform: "Character.AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Chatbot", nomorSertifikat: "SKD/2025/00071", tanggalTerbit: "3 Agu 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Perubahan struktur perusahaan tidak dilaporkan", riwayatEvaluasi: "Gagal pada evaluasi ke-1", petugasVerifikasi: "Rina Kartika, Tim Investigasi PMSE" },
  { id: "skd-13", platform: "Shopee", domisili: "Singapura", kategori: "E-commerce", nomorSertifikat: "SKD/2023/00001", tanggalTerbit: "2 Jan 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "2 Jul 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 6x evaluasi berkala", petugasVerifikasi: "Dedi Kurniawan, Tim Verifikasi SKD" },
  { id: "skd-14", platform: "Suno AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Musik", nomorSertifikat: "SKD/2026/00058", tanggalTerbit: "29 Mei 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "29 Nov 2026", alasanCabut: null, riwayatEvaluasi: "Belum ada evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-15", platform: "Pika Labs", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", nomorSertifikat: "SKD/2025/00093", tanggalTerbit: "7 Okt 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Tidak merespons permintaan verifikasi ulang", riwayatEvaluasi: "Gagal pada evaluasi ke-1", petugasVerifikasi: "Andi Pratama, Tim Investigasi PMSE" },
  { id: "skd-16", platform: "Microsoft 365 Copilot", domisili: "Amerika Serikat", kategori: "AI Produktivitas", nomorSertifikat: "SKD/2023/00007", tanggalTerbit: "18 Mar 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "18 Sep 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 6x evaluasi berkala", petugasVerifikasi: "Rina Kartika, Tim Verifikasi SKD" },
  { id: "skd-17", platform: "Jasper AI", domisili: "Amerika Serikat", kategori: "AI Penulisan", nomorSertifikat: "SKD/2026/00025", tanggalTerbit: "14 Feb 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "14 Agu 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 1x evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-18", platform: "Synthesia", domisili: "Inggris", kategori: "AI Generatif - Video", nomorSertifikat: "SKD/2025/00081", tanggalTerbit: "22 Agu 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Volume transaksi turun drastis di bawah ambang", riwayatEvaluasi: "Gagal pada evaluasi ke-2", petugasVerifikasi: "Dedi Kurniawan, Tim Investigasi PMSE" },
  { id: "skd-19", platform: "Disney+ Hotstar", domisili: "Amerika Serikat", kategori: "Streaming Video", nomorSertifikat: "SKD/2023/00009", tanggalTerbit: "6 Apr 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "6 Okt 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 5x evaluasi berkala", petugasVerifikasi: "Andi Pratama, Tim Verifikasi SKD" },
  { id: "skd-20", platform: "Luma AI", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", nomorSertifikat: "SKD/2026/00064", tanggalTerbit: "18 Jun 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "18 Des 2026", alasanCabut: null, riwayatEvaluasi: "Belum ada evaluasi berkala", petugasVerifikasi: "Sari Dewi, Tim Verifikasi SKD" },
  { id: "skd-21", platform: "Stability AI", domisili: "Inggris", kategori: "AI Generatif - Image", nomorSertifikat: "SKD/2025/00076", tanggalTerbit: "11 Agu 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Restrukturisasi entitas hukum di Indonesia", riwayatEvaluasi: "Gagal pada evaluasi ke-1", petugasVerifikasi: "Rina Kartika, Tim Investigasi PMSE" },
  { id: "skd-22", platform: "LinkedIn Premium", domisili: "Amerika Serikat", kategori: "Jejaring Profesional", nomorSertifikat: "SKD/2023/00005", tanggalTerbit: "2 Feb 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "2 Agu 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 6x evaluasi berkala", petugasVerifikasi: "Dedi Kurniawan, Tim Verifikasi SKD" },
  { id: "skd-23", platform: "Runway AI Studio", domisili: "Amerika Serikat", kategori: "AI Generatif - Video", nomorSertifikat: "SKD/2026/00044", tanggalTerbit: "15 Apr 2026", status: "Aktif", tanggalEvaluasiBerikutnya: "15 Okt 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 1x evaluasi berkala", petugasVerifikasi: "Andi Pratama, Tim Verifikasi SKD" },
  { id: "skd-24", platform: "Poe by Quora", domisili: "Amerika Serikat", kategori: "AI Generatif - Chatbot", nomorSertifikat: "SKD/2025/00090", tanggalTerbit: "30 Sep 2025", status: "Dicabut", tanggalEvaluasiBerikutnya: "-", alasanCabut: "Belum menyetorkan PPN selama 2 periode berturut", riwayatEvaluasi: "Gagal pada evaluasi ke-3", petugasVerifikasi: "Sari Dewi, Tim Investigasi PMSE" },
  { id: "skd-25", platform: "Alibaba Cloud AI", domisili: "Tiongkok", kategori: "AI Cloud & Infrastruktur", nomorSertifikat: "SKD/2023/00004", tanggalTerbit: "20 Jan 2023", status: "Aktif", tanggalEvaluasiBerikutnya: "20 Jul 2026", alasanCabut: null, riwayatEvaluasi: "Lolos 6x evaluasi berkala", petugasVerifikasi: "Rina Kartika, Tim Verifikasi SKD" },
]

export default function DaftarSKDPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const jumlahAktif = daftarSKD.filter((d) => d.status === "Aktif").length
  const jumlahDicabut = daftarSKD.filter((d) => d.status === "Dicabut").length

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className="text-xs text-slate-400 mb-1">Total Pemegang SKD</p>
          <p className="text-2xl font-bold text-slate-800">
            <AnimatedNumber value={daftarSKD.length} />
          </p>
          <p className="text-xs text-emerald-600 mt-1">▲ +3,2% dibanding kuartal lalu</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-400 mb-1">SKD Aktif</p>
          <p className="text-2xl font-bold text-emerald-600">
            <AnimatedNumber value={jumlahAktif} />
          </p>
          <p className="text-xs text-emerald-600 mt-1">▲ +8 minggu ini</p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-slate-400 mb-1">SKD Dicabut</p>
          <p className="text-2xl font-bold text-red-600">
            <AnimatedNumber value={jumlahDicabut} />
          </p>
          <p className="text-xs text-red-500 mt-1">● 2 baru minggu ini</p>
        </Card>
      </div>

      <div className="space-y-3">
        {daftarSKD.map((item) => {
          const isExpanded = expandedId === item.id
          return (
            <Card
              key={item.id}
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? "" : "hover:scale-[1.015] hover:shadow-md"
              }`}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left p-5 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        item.status === "Aktif" ? "bg-emerald-50" : "bg-red-50"
                      }`}
                    >
                      {item.status === "Aktif" ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ShieldX className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-800">
                        {item.platform}{" "}
                        <span className="text-slate-400 font-normal">· {item.domisili}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Nomor sertifikat: {item.nomorSertifikat}
                      </p>
                      <p className="text-xs text-slate-400">Terbit: {item.tanggalTerbit}</p>
                      {item.alasanCabut && (
                        <p className="text-xs text-red-500 mt-1">
                          Alasan dicabut: {item.alasanCabut}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        className={
                          item.status === "Aktif"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            : "bg-red-50 text-red-600 hover:bg-red-50"
                        }
                      >
                        {item.status}
                      </Badge>
                      {item.status === "Aktif" && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          Evaluasi: {item.tanggalEvaluasiBerikutnya}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Kategori Platform
                        </p>
                        <p className="text-sm font-bold text-slate-800">{item.kategori}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3" /> Riwayat Evaluasi
                        </p>
                        <p className="text-sm font-bold text-slate-800">{item.riwayatEvaluasi}</p>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">
                          Petugas Verifikasi
                        </p>
                        <p className="text-sm font-bold text-slate-800">{item.petugasVerifikasi}</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                      <p>
                        Nomor sertifikat lengkap:{" "}
                        <span className="font-medium text-slate-700">{item.nomorSertifikat}</span>
                      </p>
                      <p className="mt-1">
                        Status saat ini:{" "}
                        <span
                          className={`font-medium ${
                            item.status === "Aktif" ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {item.status}
                        </span>
                        {item.status === "Aktif" && ` — evaluasi berikutnya ${item.tanggalEvaluasiBerikutnya}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}