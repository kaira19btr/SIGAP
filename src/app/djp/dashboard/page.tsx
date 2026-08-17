"use client"

import { useState, useEffect } from "react"
import { mockPlatforms, summaryStats, extraPlatforms } from "@/lib/mock-data"
import { Fragment } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Flag, ShieldCheck, FileCheck, Landmark } from "lucide-react"
import SigapLoader from "@/components/SigapLoader"

function getStatusColor(status: string) {
  switch (status) {
    case "Red Flag":
      return "bg-red-100 text-red-700 hover:bg-red-100"
    case "SKD":
      return "bg-green-100 text-green-700 hover:bg-green-100"
    case "Pemungut Resmi":
      return "bg-teal-100 text-teal-700 hover:bg-teal-100"
    case "Belum Terdaftar":
      return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    default:
      return ""
  }
}

const rowColors = [
  "border-l-purple-400",
  "border-l-orange-400",
  "border-l-blue-400",
  "border-l-pink-400",
  "border-l-yellow-400",
  "border-l-indigo-400",
]

type ActionState = "idle" | "loading" | "done"

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
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [expandedKpi, setExpandedKpi] = useState<string | null>(null)
  const [notifState, setNotifState] = useState<Record<string, ActionState>>({})
  const [verifState, setVerifState] = useState<Record<string, ActionState>>({})
  const [showAllModal, setShowAllModal] = useState(false)
  const [loadedExtra, setLoadedExtra] = useState(false)

  function handleNotif(id: string) {
    setNotifState((prev) => ({ ...prev, [id]: "loading" }))
    setTimeout(() => {
      setNotifState((prev) => ({ ...prev, [id]: "done" }))
    }, 1200)
  }

  function handleVerif(id: string) {
    setVerifState((prev) => ({ ...prev, [id]: "loading" }))
    setTimeout(() => {
      setVerifState((prev) => ({ ...prev, [id]: "done" }))
    }, 1200)
  }

  useEffect(() => {
    if (showAllModal) {
      setLoadedExtra(false)
      const timer = setTimeout(() => setLoadedExtra(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [showAllModal])

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
          <CardTitle>Daftar Platform Terpantau</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Platform</TableHead>
                <TableHead>Domisili</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Confidence Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPlatforms.map((platform, index) => {
                const notif = notifState[platform.id] ?? "idle"
                const verif = verifState[platform.id] ?? "idle"

                return (
                  <Fragment key={platform.id}>
                    <TableRow
                      onClick={() =>
                        setSelectedId(
                          selectedId === platform.id ? null : platform.id
                        )
                      }
                      className={`cursor-pointer border-l-4 ${rowColors[index % rowColors.length]}`}
                    >
                      <TableCell>{platform.nama}</TableCell>
                      <TableCell>{platform.domisili}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(platform.status)}>
                          {platform.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{platform.confidenceScore}</TableCell>
                    </TableRow>
                    {selectedId === platform.id && (
                      <TableRow>
                        <TableCell colSpan={4} className="bg-slate-50">
                          <div className="flex justify-between items-center py-3 gap-6">
                            <div className="text-sm text-slate-600">
                              <p>Traffic tahunan: {platform.traffic.toLocaleString("id-ID")}</p>
                              <p>Estimasi transaksi: Rp{platform.estimasiTransaksi.toLocaleString("id-ID")}</p>
                              {(platform.traffic >= 12000 || platform.estimasiTransaksi >= 600000000) && (
                                <p className="mt-2 font-semibold text-red-600">
                                  ⚠ Sudah mencapai ambang batas (threshold)
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-6">
                              <div
                                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                                style={{
                                  background: `conic-gradient(#0d9488 ${platform.confidenceScore * 3.6}deg, #e2e8f0 0deg)`,
                                }}
                              >
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-700">
                                  {platform.confidenceScore}%
                                </div>
                              </div>

                              <div className="flex flex-col gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={notif !== "idle"}
                                  onClick={() => handleNotif(platform.id)}
                                  className="transition-all duration-300 w-44 justify-center gap-2"
                                >
                                  {notif === "loading" && <SigapLoader />}
                                  {notif === "idle" && "Kirim Notifikasi Resmi"}
                                  {notif === "loading" && "Mengirim..."}
                                  {notif === "done" && "✓ Terkirim"}
                                </Button>

                                <Button
                                  size="sm"
                                  disabled={verif !== "idle"}
                                  onClick={() => handleVerif(platform.id)}
                                  className="transition-all duration-300 w-44 justify-center gap-2"
                                >
                                  {verif === "loading" && <SigapLoader light />}
                                  {verif === "idle" && "Verifikasi Manual"}
                                  {verif === "loading" && "Memverifikasi..."}
                                  {verif === "done" && "✓ Terverifikasi"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                )
              })}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-1 pt-4 text-sm text-slate-500">
            <p>
              Menampilkan {mockPlatforms.length} dari{" "}
              <span className="font-semibold text-slate-700">
                {summaryStats.totalPlatform.value.toLocaleString("id-ID")}
              </span>{" "}
              platform terpantau
            </p>
            <button
              onClick={() => setShowAllModal(true)}
              className="text-teal-600 font-medium hover:underline"
            >
              Lihat semua platform →
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-1">
          <Badge className="bg-red-100 text-red-600 hover:bg-red-100 gap-1.5 rounded-full px-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            Prioritas
          </Badge>
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

      {showAllModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <h3 className="font-bold text-slate-800">Seluruh Platform Terpantau</h3>
                <p className="text-xs text-slate-500">
                  {summaryStats.totalPlatform.value.toLocaleString("id-ID")} platform terdeteksi sistem
                </p>
              </div>
              <button
                onClick={() => setShowAllModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 text-lg"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 divide-y">
              {mockPlatforms.map((platform, index) => (
                <div
                  key={platform.id}
                  className={`flex items-center justify-between px-6 py-3 border-l-4 ${rowColors[index % rowColors.length]}`}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-800">{platform.nama}</p>
                    <p className="text-xs text-slate-500">{platform.domisili}</p>
                  </div>
                  <Badge className={getStatusColor(platform.status)}>
                    {platform.status}
                  </Badge>
                </div>
              ))}

              {loadedExtra
                ? extraPlatforms.map((platform, index) => (
                    <div
                      key={platform.id}
                      className={`flex items-center justify-between px-6 py-3 border-l-4 ${rowColors[index % rowColors.length]} animate-in fade-in slide-in-from-bottom-1 duration-300`}
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-800">{platform.nama}</p>
                        <p className="text-xs text-slate-500">{platform.domisili}</p>
                      </div>
                      <Badge className={getStatusColor(platform.status)}>
                        {platform.status}
                      </Badge>
                    </div>
                  ))
                : Array.from({ length: 6 }).map((_, i) => (
                    <div key={`skeleton-${i}`} className="flex items-center justify-between px-6 py-3 animate-pulse">
                      <div className="space-y-2">
                        <div className="h-3 w-32 bg-slate-200 rounded" />
                        <div className="h-2 w-20 bg-slate-100 rounded" />
                      </div>
                      <div className="h-5 w-16 bg-slate-100 rounded-full" />
                    </div>
                  ))}
            </div>

            <div className="px-6 py-3 border-t text-center text-xs text-slate-400">
              Memuat sebagian dari {summaryStats.totalPlatform.value.toLocaleString("id-ID")} platform...
            </div>
          </div>
        </div>
      )}
    </div>
  )
}