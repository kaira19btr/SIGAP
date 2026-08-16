"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { mockPlatforms, extraPlatforms } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const PetaPlatform = dynamic(() => import("@/components/peta-platform"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center text-slate-400 text-sm">
      Memuat peta...
    </div>
  ),
})

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

type FilterKategori = "Semua" | "Bersih" | "Dalam Peninjauan" | "Red Flag"

const filterPills: { label: FilterKategori; dot: string }[] = [
  { label: "Semua", dot: "bg-slate-400" },
  { label: "Bersih", dot: "bg-green-500" },
  { label: "Dalam Peninjauan", dot: "bg-amber-500" },
  { label: "Red Flag", dot: "bg-red-500" },
]

export default function PetaSebaranGlobalPage() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<FilterKategori>("Semua")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const semuaPlatform = [...mockPlatforms, ...extraPlatforms].sort((a, b) =>
    a.nama.localeCompare(b.nama)
  )

  const platformTerfilter = semuaPlatform.filter((p) => {
    const cocokSearch =
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.domisili.toLowerCase().includes(search.toLowerCase())

    const cocokFilter =
      filter === "Semua"
        ? true
        : filter === "Bersih"
        ? p.status === "SKD" || p.status === "Pemungut Resmi"
        : filter === "Dalam Peninjauan"
        ? p.status === "Belum Terdaftar"
        : p.status === "Red Flag"

    return cocokSearch && cocokFilter
  })

  const jumlahBersih = semuaPlatform.filter(
    (p) => p.status === "SKD" || p.status === "Pemungut Resmi"
  ).length
  const jumlahPeninjauan = semuaPlatform.filter((p) => p.status === "Belum Terdaftar").length
  const jumlahRedFlag = semuaPlatform.filter((p) => p.status === "Red Flag").length

  return (
    <div>
      {/* Toolbar pencarian + filter */}
      <Card className="p-3 mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama platform atau negara"
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            {filterPills.map((pill) => (
              <button
                key={pill.label}
                onClick={() => setFilter(pill.label)}
                className={`flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
                  filter === pill.label
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
              >
                {pill.label !== "Semua" && (
                  <span className={`w-1.5 h-1.5 rounded-full ${pill.dot}`} />
                )}
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Ringkasan angka */}
      <div className="flex items-center gap-5 mb-4 px-1 text-sm text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="font-medium text-slate-700">{jumlahBersih}</span> Bersih
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="font-medium text-slate-700">{jumlahPeninjauan}</span> Dalam Peninjauan
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="font-medium text-slate-700">{jumlahRedFlag}</span> Red Flag
        </span>
      </div>

      {/* Panel kiri + peta */}
      <div className="flex gap-4" style={{ height: "560px" }}>
        <Card className="w-80 shrink-0 p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b">
            <p className="font-semibold text-slate-800">Daftar Platform Terpantau</p>
            <p className="text-xs text-slate-400 mt-0.5">{platformTerfilter.length} platform</p>
          </div>
          <div className="overflow-y-auto flex-1 divide-y">
            {platformTerfilter.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-8">Tidak ada hasil</p>
            )}
            {platformTerfilter.map((p) => {
              const isExpanded = expandedId === p.id
              return (
                <div key={p.id}>
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : p.id)}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800 truncate">{p.nama}</p>
                      <Badge className={`shrink-0 text-[10px] px-2 py-0 ${getStatusColor(p.status)}`}>
                        {p.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{p.domisili}</p>
                  </div>

                  {isExpanded && (
                    <div className="px-4 py-3 bg-slate-50 text-xs text-slate-600 space-y-1">
                      <p>Traffic tahunan: {p.traffic.toLocaleString("id-ID")}</p>
                      <p>Estimasi transaksi: Rp{p.estimasiTransaksi.toLocaleString("id-ID")}</p>
                      <p>Confidence score: {p.confidenceScore}%</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="flex-1 p-0 overflow-hidden">
          <PetaPlatform platforms={platformTerfilter} />
        </Card>
      </div>
    </div>
  )
}