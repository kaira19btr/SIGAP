"use client"

import { useState, useEffect, Fragment } from "react"
import { mockPlatforms, summaryStats, extraPlatforms } from "@/lib/mock-data"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import SigapLoader from "@/components/SigapLoader"
import {
  Search,
  Globe2,
  TrendingUp,
  Wallet,
  Landmark,
  Smartphone,
  Newspaper,
  Users,
  Flag,
  Zap,
  ListChecks,
} from "lucide-react"

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

const faktorPelaporan: Record<string, number> = {
  "Pemungut Resmi": 0.95,
  SKD: 0.88,
  "Red Flag": 0.35,
  "Belum Terdaftar": 0,
}

const rowColors = [
  "border-l-purple-400",
  "border-l-orange-400",
  "border-l-blue-400",
  "border-l-pink-400",
  "border-l-yellow-400",
  "border-l-indigo-400",
]

function formatRupiah(value: number) {
  if (value >= 1_000_000_000) {
    return `Rp${(value / 1_000_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} M`
  }
  if (value >= 1_000_000) {
    return `Rp${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} Jt`
  }
  return `Rp${value.toLocaleString("id-ID")}`
}

const langkahPencarian = [
  {
    icon: Search,
    title: "Ketik nama platform",
    desc: "Nama, domain, atau sebagian kata sudah cukup",
  },
  {
    icon: Zap,
    title: "Sistem menarik sinyal",
    desc: "Traffic, transaksi, unduhan, dan sorotan media ditarik otomatis",
  },
  {
    icon: ListChecks,
    title: "Lihat profil lengkap",
    desc: "Status kepatuhan dan gap langsung terlihat dalam satu tampilan",
  },
]

export default function PencarianPlatformPage() {
  const [query, setQuery] = useState("")
  const [domisiliFilter, setDomisiliFilter] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const [expandedRowId, setExpandedRowId] = useState<string | null>(null)
  const [notifState, setNotifState] = useState<Record<string, "idle" | "loading" | "done">>({})
  const [verifState, setVerifState] = useState<Record<string, "idle" | "loading" | "done">>({})
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

  const daftarDomisili = Array.from(
    new Set(mockPlatforms.map((p) => p.domisili))
  )

  const isFiltering = query.trim().length > 0 || domisiliFilter !== null

  const results = query.trim()
    ? mockPlatforms.filter((p) =>
        p.nama.toLowerCase().includes(query.toLowerCase())
      )
    : domisiliFilter
    ? mockPlatforms.filter((p) => p.domisili === domisiliFilter)
    : []

  const selected = mockPlatforms.find((p) => p.id === selectedId)

  const dilaporkan = selected
    ? Math.round(selected.estimasiTransaksi * (faktorPelaporan[selected.status] ?? 0))
    : 0
  const gap = selected ? selected.estimasiTransaksi - dilaporkan : 0

  const rincianSinyal = selected
    ? [
        {
          label: "Traffic Tahunan",
          value: selected.traffic.toLocaleString("id-ID") + " kunjungan",
          sumber: "Similarweb",
          icon: Globe2,
        },
        {
          label: "Estimasi Transaksi",
          value: formatRupiah(selected.estimasiTransaksi),
          sumber: "BI / PSP",
          icon: Landmark,
        },
        {
          label: "Unduhan Aplikasi",
          value: Math.round(selected.traffic * 0.18).toLocaleString("id-ID") + "/bulan",
          sumber: "App Store / Play Store",
          icon: Smartphone,
        },
        {
          label: "Sorotan Media",
          value:
            selected.status === "Red Flag"
              ? "6 pemberitaan"
              : selected.status === "Belum Terdaftar"
              ? "2 pemberitaan"
              : "0 pemberitaan",
          sumber: "Media Massa",
          icon: Newspaper,
        },
      ]
    : []

  function resetSelection() {
    setSelectedId(null)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">
        Pencarian Platform
      </h2>
      <p className="text-sm text-slate-500 mb-6">
        Masukkan nama atau domain platform, dan sistem akan menarik seluruh
        sinyal kepatuhannya dari berbagai sumber sekaligus.
      </p>

      {/* Statistik ringkas */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {summaryStats.totalPlatform.value.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-slate-400">Platform Terpantau</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <Flag className="w-4 h-4 text-red-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-red-600 leading-tight">
              {summaryStats.totalRedFlag.value.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-slate-400">Red Flag Aktif</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
            <ListChecks className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {summaryStats.totalSKD.value.toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-slate-400">SKD Terbit</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
            <Globe2 className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800 leading-tight">
              {daftarDomisili.length}
            </p>
            <p className="text-xs text-slate-400">Negara Domisili</p>
          </div>
        </div>
      </div>

      {/* Kolom pencarian */}
      <Card className="p-5 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setDomisiliFilter(null)
              setSelectedId(null)
            }}
            placeholder="Cari nama platform atau domain (contoh: Kling AI, OpenAI)"
            className="pl-10"
          />
        </div>

        {/* Filter cepat by domisili */}
        {!query.trim() && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-1">Filter cepat:</span>
            {daftarDomisili.map((domisili) => (
              <button
                key={domisili}
                onClick={() => {
                  setSelectedId(null)
                  setDomisiliFilter(
                    domisiliFilter === domisili ? null : domisili
                  )
                }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  domisiliFilter === domisili
                    ? "bg-teal-600 border-teal-600 text-white"
                    : "bg-white border-slate-200 text-slate-600 hover:border-teal-300"
                }`}
              >
                {domisili}
              </button>
            ))}
          </div>
        )}

        {/* Daftar hasil pencarian / filter */}
        {isFiltering && results.length > 0 && !selected && (
          <div className="mt-3 border rounded-lg divide-y">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm text-slate-800">{p.nama}</p>
                  <p className="text-xs text-slate-500">{p.domisili}</p>
                </div>
                <Badge className={getStatusColor(p.status)}>{p.status}</Badge>
              </button>
            ))}
          </div>
        )}

        {isFiltering && results.length === 0 && (
          <p className="mt-3 text-sm text-slate-400">
            {query.trim()
              ? `Tidak ada platform yang cocok dengan "${query}".`
              : `Tidak ada platform berdomisili ${domisiliFilter}.`}
          </p>
        )}
      </Card>

      {/* Profil lengkap platform terpilih — 2 kolom */}
      {selected && (
        <div className="grid grid-cols-[1fr_1.1fr] gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h3 className="text-lg font-bold text-slate-800">
                {selected.nama}
              </h3>
              <Badge className={getStatusColor(selected.status)}>
                {selected.status === "Red Flag" && "● "}
                {selected.status === "Red Flag" ? "Red Flag — Anomali Terdeteksi" : selected.status}
              </Badge>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              {selected.domisili} · Confidence score {selected.confidenceScore}%
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1.5 leading-tight">
                  Dilaporkan Platform
                </p>
                <p className="text-base font-bold text-slate-800 leading-tight">
                  {formatRupiah(dilaporkan)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1.5 leading-tight">
                  Data Hasil Sinyal
                </p>
                <p className="text-base font-bold text-slate-800 leading-tight">
                  {formatRupiah(selected.estimasiTransaksi)}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1.5 leading-tight">
                  Selisih (Gap)
                </p>
                <p
                  className={`text-base font-bold leading-tight ${
                    gap > 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {formatRupiah(gap)}
                </p>
              </div>
            </div>

            {(selected.traffic >= 12000 ||
              selected.estimasiTransaksi >= 600000000) && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-4">
                <span className="text-red-600">⚠</span>
                <p className="text-sm font-medium text-red-700">
                  Sudah mencapai ambang batas kewajiban pemungutan PPN.
                </p>
              </div>
            )}

            <button
              onClick={resetSelection}
              className="text-xs text-slate-400 hover:text-slate-600 mt-4 underline"
            >
              ← Kembali ke pencarian
            </button>
          </Card>

          <Card className="p-6">
            <p className="text-sm font-bold text-slate-800 mb-4">
              Rincian Sinyal Terdeteksi
            </p>
            <div className="space-y-3">
              {rincianSinyal.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between gap-4 ${
                      index > 0 ? "pt-3 border-t" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-slate-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-800 truncate">
                          {item.label}
                        </p>
                        <p className="text-xs text-slate-400">
                          {item.sumber}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-slate-700 text-right shrink-0">
                      {item.value}
                    </p>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}

      {/* Empty state — panduan singkat + shortcut platform prioritas */}
      {!isFiltering && !selected && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-10">
            {langkahPencarian.map((langkah, index) => {
              const Icon = langkah.icon
              return (
                <div key={langkah.title} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Icon className="w-3.5 h-3.5 text-teal-600" />
                      <p className="text-sm font-semibold text-slate-800">
                        {langkah.title}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {langkah.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            Sering Dicek
          </p>
          <div className="flex flex-wrap gap-2">
            {mockPlatforms
              .filter((p) => p.status === "Red Flag" || p.confidenceScore < 70)
              .slice(0, 6)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className="flex items-center gap-2 text-sm bg-white border border-slate-200 rounded-full pl-1.5 pr-4 py-1.5 hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                      p.status === "Red Flag" ? "bg-red-500" : "bg-slate-400"
                    }`}
                  >
                    {p.nama.charAt(0)}
                  </span>
                  <span className="text-slate-700">{p.nama}</span>
                  {p.status === "Red Flag" && (
                    <span className="text-[10px] text-red-500 font-medium">●</span>
                  )}
                </button>
              ))}
          </div>
        </>
      )}

      <Card className="mt-10">
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
                        setExpandedRowId(
                          expandedRowId === platform.id ? null : platform.id
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
                    {expandedRowId === platform.id && (
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