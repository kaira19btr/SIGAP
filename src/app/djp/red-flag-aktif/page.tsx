"use client"

import { useState } from "react"
import Link from "next/link"
import { summaryStats } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Flag,
  Landmark,
  Smartphone,
  Newspaper,
  Globe2,
  AlertTriangle,
  ChevronDown,
} from "lucide-react"

type Risiko = "Tinggi" | "Sedang" | "Rendah"
type StatusTindakLanjut = "Notifikasi Terkirim" | "Dalam Investigasi" | "SKD Diajukan"

const sumberIcon: Record<string, typeof Globe2> = {
  Similarweb: Globe2,
  "BI / PSP": Landmark,
  "App Store / Play Store": Smartphone,
  "Media Massa": Newspaper,
}

const redFlagList: {
  id: string
  platform: string
  domisili: string
  deskripsi: string
  gap: number
  sumber: string
  risiko: Risiko
  tanggal: string
  status: StatusTindakLanjut
  confidenceScore: number
}[] = [
  {
    id: "rf-1",
    platform: "Kling AI",
    domisili: "Tiongkok",
    deskripsi:
      "Traffic tahunan sudah 3x ambang batas, tapi belum ada pengajuan SKD maupun surat penunjukan pemungut PPN.",
    gap: 500_000_000,
    sumber: "Similarweb",
    risiko: "Tinggi",
    tanggal: "2 Jul 2026",
    status: "Notifikasi Terkirim",
    confidenceScore: 87,
  },
  {
    id: "rf-2",
    platform: "NeoPay AI",
    domisili: "Singapura",
    deskripsi:
      "Volume transaksi lewat PSP domestik melampaui Rp600 Juta, namun platform belum terdaftar sebagai pemungut resmi.",
    gap: 210_000_000,
    sumber: "BI / PSP",
    risiko: "Tinggi",
    tanggal: "29 Jun 2026",
    status: "Dalam Investigasi",
    confidenceScore: 88,
  },
  {
    id: "rf-3",
    platform: "VisionCraft",
    domisili: "Korea Selatan",
    deskripsi:
      "Lonjakan unduhan aplikasi terdeteksi drastis dalam 30 hari terakhir, confidence score melewati ambang investigasi.",
    gap: 95_000_000,
    sumber: "App Store / Play Store",
    risiko: "Sedang",
    tanggal: "27 Jun 2026",
    status: "Dalam Investigasi",
    confidenceScore: 66,
  },
  {
    id: "rf-4",
    platform: "PromptForge",
    domisili: "Amerika Serikat",
    deskripsi:
      "Disebut dalam tiga pemberitaan media soal ekspansi pasar Indonesia, tapi tidak ada jejak transaksi lewat PSP domestik.",
    gap: 40_000_000,
    sumber: "Media Massa",
    risiko: "Rendah",
    tanggal: "20 Jun 2026",
    status: "SKD Diajukan",
    confidenceScore: 48,
  },
]

const statusColor: Record<StatusTindakLanjut, string> = {
  "Notifikasi Terkirim": "bg-red-100 text-red-700",
  "Dalam Investigasi": "bg-amber-100 text-amber-700",
  "SKD Diajukan": "bg-teal-100 text-teal-700",
}

const risikoDot: Record<Risiko, string> = {
  Tinggi: "bg-red-500",
  Sedang: "bg-amber-500",
  Rendah: "bg-slate-400",
}

function formatRupiah(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp${(value / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`
  }
  return `Rp${Math.round(value / 1_000_000).toLocaleString("id-ID")} Jt`
}

export default function RedFlagAktifPage() {
  const [filter, setFilter] = useState<Risiko | "Semua">("Semua")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const totalContoh = redFlagList.length
  const totalKeseluruhan = summaryStats.totalRedFlag.value

  const jumlahPerRisikoContoh = {
    Tinggi: redFlagList.filter((r) => r.risiko === "Tinggi").length,
    Sedang: redFlagList.filter((r) => r.risiko === "Sedang").length,
    Rendah: redFlagList.filter((r) => r.risiko === "Rendah").length,
  }
  const risikoTinggiEstimasi = Math.round(
    (jumlahPerRisikoContoh.Tinggi / totalContoh) * totalKeseluruhan
  )
  const risikoSedangEstimasi = Math.round(
    (jumlahPerRisikoContoh.Sedang / totalContoh) * totalKeseluruhan
  )
  const risikoRendahEstimasi =
    totalKeseluruhan - risikoTinggiEstimasi - risikoSedangEstimasi

  const dalamInvestigasiContoh = redFlagList.filter(
    (r) => r.status === "Dalam Investigasi"
  ).length
  const dalamInvestigasiEstimasi = Math.round(
    (dalamInvestigasiContoh / totalContoh) * totalKeseluruhan
  )

  const rataRataGapPerKasus =
    redFlagList.reduce((sum, r) => sum + r.gap, 0) / totalContoh
  const totalEstimasiGap = rataRataGapPerKasus * totalKeseluruhan

  const filtered =
    filter === "Semua"
      ? redFlagList
      : redFlagList.filter((r) => r.risiko === filter)

  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h2 className="text-2xl font-bold text-slate-800">Red Flag Aktif</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Anomali ini muncul otomatis, dideteksi langsung oleh mesin korelasi
        SIGAP begitu selisih data sinyal melewati ambang batas materialitas.
      </p>

      {/* Ringkasan statistik — sinkron dengan summaryStats dashboard, hover mengembang */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Card className="p-4 transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <p className="text-xs text-slate-400 mb-1">Total Red Flag</p>
          <p className="text-2xl font-bold text-red-600">
            {totalKeseluruhan.toLocaleString("id-ID")}
          </p>
          <p className="text-xs text-red-500 mt-1">
            ● {summaryStats.totalRedFlag.trend}
          </p>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <p className="text-xs text-slate-400 mb-1">Risiko Tinggi</p>
          <p className="text-2xl font-bold text-slate-800">{risikoTinggiEstimasi}</p>
          <p className="text-xs text-slate-400 mt-1">
            {Math.round((risikoTinggiEstimasi / totalKeseluruhan) * 100)}% dari seluruh kasus
          </p>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <p className="text-xs text-slate-400 mb-1">Dalam Investigasi</p>
          <p className="text-2xl font-bold text-amber-600">{dalamInvestigasiEstimasi}</p>
          <p className="text-xs text-amber-600 mt-1">
            ⏱ Menunggu tindak lanjut
          </p>
        </Card>
        <Card className="p-4 transition-all duration-200 hover:scale-105 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <p className="text-xs text-slate-400 mb-1">Total Estimasi Gap</p>
          <p className="text-2xl font-bold text-slate-800">{formatRupiah(totalEstimasiGap)}</p>
          <p className="text-xs text-slate-400 mt-1">
            ≈{formatRupiah(rataRataGapPerKasus)} / kasus
          </p>
        </Card>
      </div>

      <p className="text-xs text-slate-400 mb-4">
        Menampilkan {totalContoh} kasus prioritas dari total {totalKeseluruhan.toLocaleString("id-ID")} red flag aktif — diurutkan berdasarkan tingkat risiko.
      </p>

      {/* Distribusi tingkat risiko — proporsional ke total keseluruhan */}
      <Card className="p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Distribusi Tingkat Risiko
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" /> Tinggi ({risikoTinggiEstimasi})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Sedang ({risikoSedangEstimasi})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> Rendah ({risikoRendahEstimasi})
            </span>
          </div>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden flex bg-slate-100">
          <div
            className="bg-red-500"
            style={{ width: `${(risikoTinggiEstimasi / totalKeseluruhan) * 100}%` }}
          />
          <div
            className="bg-amber-500"
            style={{ width: `${(risikoSedangEstimasi / totalKeseluruhan) * 100}%` }}
          />
          <div
            className="bg-slate-300"
            style={{ width: `${(risikoRendahEstimasi / totalKeseluruhan) * 100}%` }}
          />
        </div>
      </Card>

      {/* Filter tingkat risiko */}
      <div className="flex items-center gap-2 mb-4">
        {(["Semua", "Tinggi", "Sedang", "Rendah"] as const).map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
              filter === opt
                ? "bg-slate-900 border-slate-900 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Daftar red flag — tiap item kartu terpisah biar bisa mengembang bebas saat hover */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const SumberIcon = sumberIcon[item.sumber] ?? Globe2
          const isExpanded = expandedId === item.id
          return (
            <Card
              key={item.id}
              className="p-0 overflow-hidden transition-all duration-200 hover:scale-[1.015] hover:shadow-lg hover:-translate-y-0.5"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full text-left px-6 py-5 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.risiko === "Tinggi"
                          ? "bg-red-100"
                          : item.risiko === "Sedang"
                          ? "bg-amber-100"
                          : "bg-slate-100"
                      }`}
                    >
                      <Flag
                        className={`w-4.5 h-4.5 ${
                          item.risiko === "Tinggi"
                            ? "text-red-600"
                            : item.risiko === "Sedang"
                            ? "text-amber-600"
                            : "text-slate-500"
                        }`}
                      />
                    </div>
                    <span
                      className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${risikoDot[item.risiko]}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <p className="font-semibold text-sm text-slate-800">
                        {item.platform} <span className="text-slate-400 font-normal">· {item.domisili}</span>
                      </p>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-sm font-bold text-red-600">
                          {formatRupiah(item.gap)}
                        </span>
                        <Badge className={`${statusColor[item.status]} hover:${statusColor[item.status]}`}>
                          {item.status}
                        </Badge>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {item.deskripsi}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <SumberIcon className="w-3 h-3" />
                        {item.sumber}
                      </span>
                      <span>·</span>
                      <span>Tingkat risiko: {item.risiko}</span>
                      <span>·</span>
                      <span>{item.tanggal}</span>
                    </div>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-6 pb-5 pl-[4.25rem]">
                  <div className="bg-slate-50 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500">
                        Tindak lanjut yang sudah dilakukan sistem untuk kasus ini.
                      </p>
                      <Link
                        href={`/djp/metodologi-estimasi?platform=${encodeURIComponent(item.platform)}&score=${item.confidenceScore}`}
                        className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline mt-1 inline-block"
                      >
                        Kenapa skor {item.confidenceScore}? →
                      </Link>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
                        Lihat Profil Lengkap
                      </button>
                      <button className="text-xs font-semibold bg-slate-900 text-white px-3 py-1.5 rounded-md hover:bg-slate-800 transition-colors">
                        Verifikasi Manual
                      </button>
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