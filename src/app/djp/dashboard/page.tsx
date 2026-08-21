"use client"

import { useState } from "react"
import { summaryStats } from "@/lib/mock-data"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Users, Flag, ShieldCheck, FileCheck, Landmark } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const trendData = [
  { tahun: "2022", platform: 320, kepatuhan: 42, pendapatan: 1.2 },
  { tahun: "2023", platform: 480, kepatuhan: 51, pendapatan: 2.1 },
  { tahun: "2024", platform: 650, kepatuhan: 58, pendapatan: 3.4 },
  { tahun: "2025", platform: 920, kepatuhan: 66, pendapatan: 5.6 },
  { tahun: "2026", platform: 1284, kepatuhan: 74, pendapatan: 8.8 },
]

function formatTooltip(value: number, name: string) {
  if (name === "Pertumbuhan Platform") return [value.toLocaleString("id-ID") + " platform", name]
  if (name === "Tingkat Kepatuhan") return [`${value}%`, name]
  if (name === "Pendapatan Pajak PMSE") return [`Rp${value} T`, name]
  return [value, name]
}

const anomaliList = [
  {
    id: "anomali-1",
    platform: "Kling AI",
    domisili: "Tiongkok",
    deskripsi: "Traffic tahunan sudah 3x ambang batas, namun belum ada pengajuan SKD maupun surat penunjukan.",
    tanggal: "2 Jul 2026",
    sumber: "Similarweb",
    icon: "flag" as const,
  },
  {
    id: "anomali-2",
    platform: "NeoPay AI",
    domisili: "Singapura",
    deskripsi: "Volume transaksi lewat PSP domestik melampaui Rp600 juta, tapi belum terdaftar sebagai pemungut.",
    tanggal: "29 Jun 2026",
    sumber: "BI / PSP",
    icon: "domestik" as const,
  },
  {
    id: "anomali-3",
    platform: "VisionCraft",
    domisili: "Korea Selatan",
    deskripsi: "Lonjakan unduhan aplikasi terdeteksi drastis, confidence score naik melewati ambang investigasi.",
    tanggal: "27 Jun 2026",
    sumber: "App Store / Play Store",
    icon: "flag" as const,
  },
]

export default function DjpDashboardPage() {
  const [expandedKpi, setExpandedKpi] = useState<string | null>(null)

  const kpis = [
    {
      id: "platform",
      label: "Platform Terpantau",
      value: summaryStats.totalPlatform.value.toLocaleString("id-ID"),
      trend: summaryStats.totalPlatform.trend,
      up: summaryStats.totalPlatform.up,
      icon: Users,
      color: "text-slate-800",
      bar: "bg-slate-800",
      detail: {
        deskripsi: "Total seluruh platform PMSE yang saat ini berada dalam radar pemantauan RADAR PMSE/FiskaLens, mencakup semua status kepatuhan.",
        rincian: [
          { label: "Kategori AI Generatif", value: "412 platform" },
          { label: "Kategori Non-AI", value: "872 platform" },
          { label: "Ditambahkan bulan ini", value: "23 platform" },
        ],
      },
    },
    {
      id: "redflag",
      label: "Red Flag Aktif",
      value: summaryStats.totalRedFlag.value.toLocaleString("id-ID"),
      trend: summaryStats.totalRedFlag.trend,
      up: summaryStats.totalRedFlag.up,
      icon: Flag,
      color: "text-red-600",
      bar: "bg-red-500",
      detail: {
        deskripsi: "Platform yang traffic atau transaksinya sudah melampaui ambang batas, namun belum mengajukan SKD maupun terdaftar sebagai pemungut resmi.",
        rincian: [
          { label: "Prioritas tinggi (confidence >80%)", value: "21 platform" },
          { label: "Sudah dieskalasi ke titik jepit", value: "14 platform" },
          { label: "Menunggu investigasi awal", value: "22 platform" },
        ],
      },
    },
    {
      id: "skd",
      label: "SKD Terbit",
      value: summaryStats.totalSKD.value.toLocaleString("id-ID"),
      trend: summaryStats.totalSKD.trend,
      up: summaryStats.totalSKD.up,
      icon: ShieldCheck,
      color: "text-green-600",
      bar: "bg-green-500",
      detail: {
        deskripsi: "Platform yang mendaftar mandiri sebelum terdeteksi sistem dan berhasil lolos verifikasi human-in-the-loop, sehingga mendapat Sertifikat Kepatuhan Dini.",
        rincian: [
          { label: "SKD aktif saat ini", value: "312 platform" },
          { label: "SKD dicabut (gagal evaluasi)", value: "30 platform" },
          { label: "Menunggu evaluasi berkala", value: "48 platform" },
        ],
      },
    },
    {
      id: "pemungut",
      label: "Pemungut Resmi",
      value: summaryStats.totalPemungut.value.toLocaleString("id-ID"),
      trend: summaryStats.totalPemungut.trend,
      up: summaryStats.totalPemungut.up,
      icon: FileCheck,
      color: "text-teal-600",
      bar: "bg-teal-600",
      detail: {
        deskripsi: "Platform yang sudah resmi ditunjuk DJP sebagai pemungut PPN PMSE berdasarkan surat penunjukan resmi, terlepas dari jalur SKD atau deteksi manual.",
        rincian: [
          { label: "Ditunjuk lewat jalur SKD", value: "56 platform" },
          { label: "Ditunjuk lewat deteksi manual", value: "33 platform" },
          { label: "Rata-rata gap deteksi", value: "2,1 tahun" },
        ],
      },
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Ringkasan Kepatuhan
      </h1>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          const isExpanded = expandedKpi === kpi.id
          return (
            <div
              key={kpi.id}
              onClick={() => setExpandedKpi(isExpanded ? null : kpi.id)}
              className={`relative bg-white rounded-xl border overflow-hidden p-5 cursor-pointer transition-all duration-300 ${
                isExpanded
                  ? "col-span-4 shadow-lg"
                  : "hover:shadow-md hover:scale-[1.03]"
              }`}
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${kpi.bar}`} />
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  {kpi.label}
                </p>
                <Icon className={`w-4 h-4 ${kpi.color}`} />
              </div>
              <p className={`text-3xl font-bold ${kpi.color}`}>{kpi.value}</p>
              <p
                className={`text-xs mt-2 ${
                  kpi.up === true
                    ? "text-green-600"
                    : kpi.up === false
                    ? "text-red-500"
                    : "text-slate-400"
                }`}
              >
                {kpi.up === true && "▲ "}
                {kpi.up === false && "● "}
                {kpi.trend}
              </p>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t animate-in fade-in slide-in-from-top-1 duration-300">
                  <p className="text-sm text-slate-600 mb-3">{kpi.detail.deskripsi}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {kpi.detail.rincian.map((r) => (
                      <div key={r.label} className="bg-slate-50 rounded-lg p-3">
                        <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">
                          {r.label}
                        </p>
                        <p className="text-sm font-bold text-slate-800">{r.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tren 5 Tahun: Pertumbuhan Platform, Kepatuhan & Pendapatan Pajak</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={380}>
            <LineChart data={trendData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="tahun" tick={{ fontSize: 12, fill: "#64748b" }} />
              <YAxis
                yAxisId="platform"
                orientation="left"
                stroke="#0f172a"
                tick={{ fontSize: 11, fill: "#0f172a" }}
                domain={[0, 1400]}
                label={{ value: "Jumlah Platform", angle: -90, position: "insideLeft", fontSize: 11, fill: "#0f172a" }}
              />
              <YAxis
                yAxisId="persen"
                orientation="right"
                stroke="#0d9488"
                tick={{ fontSize: 11, fill: "#0d9488" }}
                domain={[0, 100]}
                label={{ value: "Kepatuhan (%)", angle: 90, position: "insideRight", fontSize: 11, fill: "#0d9488" }}
              />
              <YAxis yAxisId="rupiah" orientation="right" domain={[0, 10]} hide />
              <Tooltip formatter={formatTooltip} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line
                yAxisId="platform"
                type="monotone"
                dataKey="platform"
                name="Pertumbuhan Platform"
                stroke="#0f172a"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="persen"
                type="monotone"
                dataKey="kepatuhan"
                name="Tingkat Kepatuhan"
                stroke="#0d9488"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="rupiah"
                type="monotone"
                dataKey="pendapatan"
                name="Pendapatan Pajak PMSE"
                stroke="#dc2626"
                strokeWidth={2.5}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-400 mt-3">
            Estimasi ilustratif — pendapatan pajak dalam satuan Rp Triliun/tahun.
          </p>
        </CardContent>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-600 rounded-full px-2.5 py-1 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Prioritas
          </span>
          <h3 className="font-semibold text-slate-800">Anomali Terbaru</h3>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          3 platform dengan gap traffic vs status kepatuhan paling mencolok bulan ini
        </p>

        {anomaliList.map((item, index) => (
          <div
            key={item.id}
            className={index > 0 ? "pt-4 mt-4 border-t" : ""}
          >
            <div className="flex gap-3">
              <div
                className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                  item.icon === "flag" ? "bg-red-100" : "bg-indigo-100"
                }`}
              >
                {item.icon === "flag" ? (
                  <Flag className="w-4 h-4 text-red-600" />
                ) : (
                  <Landmark className="w-4 h-4 text-indigo-600" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800">
                  {item.platform} · {item.domisili}
                </p>
                <p className="text-sm text-slate-600 mt-0.5">
                  {item.deskripsi}
                </p>
                <p className="text-xs text-slate-400 mt-1.5">
                  Terdeteksi {item.tanggal} · {item.sumber}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}