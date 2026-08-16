"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe2, Smartphone, Landmark, CheckCircle2, ChevronDown, Clock, Gauge, Wallet, Search, CreditCard, Megaphone } from "lucide-react"
import {
  Institusi,
  KasusEskalasi,
  institusiConfig,
  antrianAwal,
  sisaWaktuInfo,
} from "@/lib/data-eskalasi"

const institusiIcon: Record<Institusi, typeof Globe2> = {
  Kominfo: Globe2,
  "App Store / Play Store": Smartphone,
  PSP: Landmark,
  "Jaringan Kartu Internasional": CreditCard,
  "Platform Iklan Digital": Megaphone,
}

type RingkasanKey = "menunggu" | "terlambat" | "total"

export default function AntrianTindakLanjutPage() {
  const [institusiAktif, setInstitusiAktif] = useState<Institusi>("Kominfo")
  const [antrian] = useState<KasusEskalasi[]>(antrianAwal)
  const [dikonfirmasi, setDikonfirmasi] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [ringkasanAktif, setRingkasanAktif] = useState<RingkasanKey | null>(null)
  const [pencarian, setPencarian] = useState("")

  useEffect(function () {
    const tersimpanInstitusi = localStorage.getItem("sigap_institusi") as Institusi | null
    if (tersimpanInstitusi && institusiConfig[tersimpanInstitusi]) {
      setInstitusiAktif(tersimpanInstitusi)
    }
    const tersimpanKonfirmasi = localStorage.getItem("sigap_dikonfirmasi")
    if (tersimpanKonfirmasi) {
      setDikonfirmasi(JSON.parse(tersimpanKonfirmasi))
    }
  }, [])

  function konfirmasi(id: string) {
    setDikonfirmasi(function (prev) {
      const baru = prev.concat([id])
      localStorage.setItem("sigap_dikonfirmasi", JSON.stringify(baru))
      return baru
    })
  }

  const antrianInstitusiIni = antrian.filter(function (a) {
    return a.institusi === institusiAktif
  })
  const sisaAntrian = antrianInstitusiIni
    .filter(function (a) {
      return dikonfirmasi.indexOf(a.id) === -1
    })
    .filter(function (a) {
      const kata = pencarian.toLowerCase()
      return (
        a.platform.toLowerCase().includes(kata) ||
        a.domisili.toLowerCase().includes(kata)
      )
    })
    .sort(function (a, b) {
      return a.sisaHari - b.sisaHari
    })

  const config = institusiConfig[institusiAktif]
  const Icon = institusiIcon[institusiAktif]
  const terlambatList = sisaAntrian.filter(function (a) {
    return a.sisaHari < 0
  })
  const jumlahTerlambat = terlambatList.length

  function toggleRingkasan(key: RingkasanKey) {
    setRingkasanAktif(function (prev) {
      return prev === key ? null : key
    })
  }

  const ringkasanConfig: Record<RingkasanKey, { label: string; items: KasusEskalasi[]; emptyText: string }> = {
    menunggu: {
      label: "Menunggu Tindakan",
      items: sisaAntrian,
      emptyText: "Tidak ada platform yang menunggu tindakan.",
    },
    terlambat: {
      label: "Sudah Lewat Batas Waktu",
      items: terlambatList,
      emptyText: "Tidak ada platform yang lewat batas waktu.",
    },
    total: {
      label: `Total Eskalasi ke ${institusiAktif}`,
      items: antrianInstitusiIni,
      emptyText: "Belum ada eskalasi untuk institusi ini.",
    },
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Card
          onClick={() => toggleRingkasan("menunggu")}
          className={`p-4 bg-amber-50 border-amber-200 cursor-pointer transition-transform duration-200 ${
            ringkasanAktif === "menunggu" ? "ring-2 ring-amber-400" : "hover:scale-[1.03]"
          }`}
        >
          <p className="text-xs text-amber-700 mb-1">Menunggu Tindakan</p>
          <p className="text-2xl font-bold text-amber-600">{sisaAntrian.length}</p>
        </Card>
        <Card
          onClick={() => toggleRingkasan("terlambat")}
          className={`p-4 bg-red-50 border-red-200 cursor-pointer transition-transform duration-200 ${
            ringkasanAktif === "terlambat" ? "ring-2 ring-red-400" : "hover:scale-[1.03]"
          }`}
        >
          <p className="text-xs text-red-700 mb-1">Sudah Lewat Batas Waktu</p>
          <p className="text-2xl font-bold text-red-600">{jumlahTerlambat}</p>
        </Card>
        <Card
          onClick={() => toggleRingkasan("total")}
          className={`p-4 bg-slate-50 border-slate-200 cursor-pointer transition-transform duration-200 ${
            ringkasanAktif === "total" ? "ring-2 ring-slate-400" : "hover:scale-[1.03]"
          }`}
        >
          <p className="text-xs text-slate-500 mb-1">Total Eskalasi ke {institusiAktif}</p>
          <p className="text-2xl font-bold text-slate-800">{antrianInstitusiIni.length}</p>
        </Card>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={pencarian}
          onChange={(e) => setPencarian(e.target.value)}
          placeholder="Cari nama platform atau domisili..."
          className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>

      {ringkasanAktif && (
        <Card className="p-4 mb-6 bg-white">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
            {ringkasanConfig[ringkasanAktif].label}
          </p>
          {ringkasanConfig[ringkasanAktif].items.length === 0 ? (
            <p className="text-sm text-slate-400">{ringkasanConfig[ringkasanAktif].emptyText}</p>
          ) : (
            <div className="space-y-2">
              {ringkasanConfig[ringkasanAktif].items.map(function (item) {
                const waktu = sisaWaktuInfo(item.sisaHari)
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 py-2 border-b border-slate-100 last:border-0"
                  >
                    <p className="text-sm text-slate-700">
                      {item.platform} <span className="text-slate-400">· {item.domisili}</span>
                    </p>
                    <span className={`text-xs font-semibold ${waktu.color}`}>{waktu.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </Card>
      )}

      {sisaAntrian.length === 0 ? (
        <Card className="p-10 text-center">
          <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Tidak ada kasus yang menunggu tindakan {institusiAktif} saat ini.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sisaAntrian.map(function (item) {
            const waktu = sisaWaktuInfo(item.sisaHari)
            const isExpanded = expandedId === item.id
            return (
              <Card key={item.id} className="overflow-hidden">
                <button
                  onClick={function () {
                    setExpandedId(isExpanded ? null : item.id)
                  }}
                  className="w-full text-left p-5 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-slate-800">
                          {item.platform} <span className="text-slate-400 font-normal">· {item.domisili}</span>
                        </p>
                        <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 mt-1">
                          {config.jenisTindakan}
                        </Badge>
                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.catatan}</p>
                        <p className="text-xs text-slate-400 mt-2">Dieskalasi DJP · {item.dieskalasi}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${waktu.bg} ${waktu.color}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${waktu.dot}`} />
                        <Clock className="w-3 h-3" />
                        {waktu.label}
                      </span>
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
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Gauge className="w-3 h-3" /> Confidence Score
                          </p>
                          <p className="text-sm font-bold text-slate-800">{item.confidenceScore}%</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Wallet className="w-3 h-3" /> Estimasi Gap
                          </p>
                          <p className="text-sm font-bold text-red-600">{item.estimasiGap}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">
                            Sumber Sinyal
                          </p>
                          <p className="text-sm font-bold text-slate-800">{item.sumberSinyal}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">
                            {config.fieldTambahanLabel}
                          </p>
                          <p className="text-sm font-bold text-slate-800">{item.detailTambahan}</p>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 space-y-1 mb-4 pt-3 border-t border-slate-200">
                        <p>Nomor surat eskalasi: <span className="font-medium text-slate-700">{item.nomorSurat}</span></p>
                        <p>Petugas DJP terkait: <span className="font-medium text-slate-700">{item.petugasDjp}</span></p>
                      </div>

                      <div className="flex justify-end gap-2">
                        <button className="text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors">
                          Lihat Profil Platform
                        </button>
                        <Button
                          onClick={function () {
                            konfirmasi(item.id)
                          }}
                          className="bg-slate-900 hover:bg-slate-800"
                        >
                          {config.actionLabel}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}