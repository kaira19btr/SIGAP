"use client"

import { useState } from "react"
import { Search, CheckCircle2, Clock, AlertCircle, ChevronDown, Users, Wallet, TrendingUp } from "lucide-react"
import { semuaPlatformPublik, PlatformPublik, StatusPublik, statistikPlatform } from "@/lib/data-publik"

function statusPublikInfo(status: StatusPublik) {
  if (status === "resmi") {
    return {
      label: "Terdaftar Resmi",
      desc: "Platform ini sudah resmi menjadi pemungut PPN PMSE.",
      color: "text-emerald-700",
      bg: "bg-emerald-50 border-emerald-200",
      barColor: "bg-emerald-500",
      icon: CheckCircle2,
    }
  }
  if (status === "diproses") {
    return {
      label: "Sedang Diproses",
      desc: "Platform ini sedang dalam proses tindak lanjut oleh DJP dan mitra terkait.",
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      barColor: "bg-amber-500",
      icon: Clock,
    }
  }
  return {
    label: "Dalam Pemeriksaan",
    desc: "Platform ini terdeteksi sistem dan sedang diverifikasi lebih lanjut oleh DJP.",
    color: "text-slate-700",
    bg: "bg-slate-50 border-slate-200",
    barColor: "bg-slate-400",
    icon: AlertCircle,
  }
}

function formatRupiah(nilai: number) {
  if (nilai >= 1_000_000_000) return `Rp${(nilai / 1_000_000_000).toFixed(1)} M`
  if (nilai >= 1_000_000) return `Rp${(nilai / 1_000_000).toFixed(0)} Jt`
  return `Rp${nilai.toLocaleString("id-ID")}`
}

function formatPengguna(nilai: number) {
  if (nilai >= 1_000_000) return `${(nilai / 1_000_000).toFixed(1)} Jt`
  if (nilai >= 1_000) return `${(nilai / 1_000).toFixed(0)} rb`
  return `${nilai}`
}

export default function PortalPublikPage() {
  const [pencarian, setPencarian] = useState("")
  const [hasil, setHasil] = useState<PlatformPublik[] | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function cariPlatform() {
    const kata = pencarian.trim().toLowerCase()
    if (!kata) {
      setHasil(null)
      return
    }
    const ditemukan = semuaPlatformPublik.filter(function (item) {
      return item.platform.toLowerCase().includes(kata)
    })
    setHasil(ditemukan)
  }

  function toggleExpand(id: string) {
    setExpandedId(function (prev) {
      return prev === id ? null : id
    })
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Cek Status Kepatuhan Platform</h1>
      <p className="text-sm text-slate-500 mb-6">
        Cari nama platform AI generatif atau layanan digital untuk melihat status kepatuhan
        PPN PMSE-nya di Indonesia.
      </p>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={pencarian}
            onChange={function (e) {
              setPencarian(e.target.value)
            }}
            onKeyDown={function (e) {
              if (e.key === "Enter") cariPlatform()
            }}
            placeholder="Contoh: Netflix, ChatGPT, Kling AI..."
            className="w-full pl-10 pr-4 py-3 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={cariPlatform}
          className="px-6 py-3 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
        >
          Cari
        </button>
      </div>

      {hasil === null && (
        <div className="text-center py-16 text-slate-400">
          <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">Masukkan nama platform untuk melihat status kepatuhannya.</p>
        </div>
      )}

      {hasil !== null && hasil.length === 0 && (
        <div className="text-center py-16 text-slate-400">
          <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">
            Platform tidak ditemukan dalam data pemantauan SIGAP. Ini tidak berarti platform
            tersebut bebas kewajiban pajak.
          </p>
        </div>
      )}

      {hasil !== null && hasil.length > 0 && (
        <div className="space-y-3">
          {hasil.map(function (item) {
            const info = statusPublikInfo(item.status)
            const Icon = info.icon
            const isExpanded = expandedId === item.id
            const stat = statistikPlatform(item)
            const maxKuartal = Math.max(...stat.kontribusiPerKuartal.map((k) => k.nilai))

            return (
              <div
                key={item.id}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${info.bg} ${
                  isExpanded ? "shadow-md" : ""
                }`}
              >
                <button
                  onClick={function () {
                    toggleExpand(item.id)
                  }}
                  className="w-full text-left p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {item.platform} <span className="text-slate-400 font-normal">· {item.domisili}</span>
                      </p>
                      <div className={`flex items-center gap-1.5 mt-2 text-sm font-semibold ${info.color}`}>
                        <Icon className="w-4 h-4" />
                        {info.label}
                      </div>
                      <p className="text-sm text-slate-600 mt-1.5">{info.desc}</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5">
                    <div className="bg-white rounded-lg p-4 border border-slate-100">
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Wallet className="w-3 h-3" /> Kontribusi PPN Tahun Ini
                          </p>
                          <p className="text-lg font-bold text-slate-800">
                            {formatRupiah(stat.kontribusiTahunIni)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Users className="w-3 h-3" /> Estimasi Pengguna Aktif
                          </p>
                          <p className="text-lg font-bold text-slate-800">
                            {formatPengguna(stat.penggunaAktif)}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Kontribusi PPN per Kuartal
                      </p>
                      <div className="flex items-end justify-between gap-3 h-28 mb-2">
                        {stat.kontribusiPerKuartal.map(function (k) {
                          const tinggiPersen = Math.max(8, Math.round((k.nilai / maxKuartal) * 100))
                          return (
                            <div key={k.label} className="flex-1 flex flex-col items-center justify-end h-full">
                              <p className="text-[10px] font-semibold text-slate-600 mb-1">
                                {formatRupiah(k.nilai)}
                              </p>
                              <div
                                className={`w-full rounded-t-md ${info.barColor} transition-all duration-500`}
                                style={{ height: `${tinggiPersen}%` }}
                              />
                              <p className="text-[10px] text-slate-400 mt-1.5">{k.label}</p>
                            </div>
                          )
                        })}
                      </div>

                      {item.status !== "resmi" && (
                        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100">
                          Angka bersifat estimasi berdasarkan data traffic dan sinyal transaksi yang terpantau
                          sistem SIGAP, bukan angka setoran resmi.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}