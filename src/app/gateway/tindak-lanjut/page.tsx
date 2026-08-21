"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe2, Smartphone, Landmark, CheckCircle2, ChevronDown, Clock, Gauge, Wallet, CreditCard, Megaphone } from "lucide-react"
import {
  Institusi,
  KasusEskalasi,
  institusiConfig,
  antrianAwal,
  sisaWaktuInfo,
} from "@/lib/data-eskalasi"
import { profilUntukInstitusi, peranBiUntukKasus, peranBiUntukKasusKartu } from "@/lib/profil-institusi"

const institusiIcon: Record<Institusi, typeof Globe2> = {
  Kominfo: Globe2,
  "App Store / Play Store": Smartphone,
  PSP: Landmark,
  "Jaringan Kartu Internasional": CreditCard,
  "Platform Iklan Digital": Megaphone,
}

export default function TindakLanjutPage() {
  const [institusiAktif, setInstitusiAktif] = useState<Institusi>("Kominfo")
  const [diambil, setDiambil] = useState<string[]>([])
  const [dikonfirmasi, setDikonfirmasi] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [ringkasanBiAktif, setRingkasanBiAktif] = useState(false)

  useEffect(function () {
    const tersimpanInstitusi = localStorage.getItem("sigap_institusi") as Institusi | null
    if (tersimpanInstitusi && institusiConfig[tersimpanInstitusi]) {
      setInstitusiAktif(tersimpanInstitusi)
    }
    const tersimpanDiambil = localStorage.getItem("sigap_diambil")
    if (tersimpanDiambil) {
      setDiambil(JSON.parse(tersimpanDiambil))
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

  const config = institusiConfig[institusiAktif]
  const Icon = institusiIcon[institusiAktif]

  const sedangDitangani: KasusEskalasi[] = antrianAwal
    .filter(function (a) {
      return a.institusi === institusiAktif
    })
    .filter(function (a) {
      return diambil.indexOf(a.id) !== -1 && dikonfirmasi.indexOf(a.id) === -1
    })
    .sort(function (a, b) {
      return a.sisaHari - b.sisaHari
    })

  const tampilkanKpiBi = institusiAktif === "PSP" || institusiAktif === "Jaringan Kartu Internasional"

  return (
    <div>
      <div className={`grid gap-4 mb-6 ${tampilkanKpiBi ? "grid-cols-2" : "grid-cols-1"}`}>
        <Card className="relative overflow-hidden p-4 bg-gradient-to-br from-teal-50 to-teal-100/50 border-teal-200">
          <p className="text-xs font-medium text-teal-700 mb-1">Sedang Ditangani</p>
          <p className="text-3xl font-bold text-teal-600 tabular-nums">{sedangDitangani.length}</p>
        </Card>

        {institusiAktif === "PSP" && (
          <Card
            onClick={() => setRingkasanBiAktif(!ringkasanBiAktif)}
            className={`relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 cursor-pointer transition-all duration-200 ${
              ringkasanBiAktif ? "ring-2 ring-blue-400 shadow-md" : "hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-medium text-blue-700">Diawasi BI</p>
            </div>
            <p className="text-3xl font-bold text-blue-600 tabular-nums">{sedangDitangani.length}</p>
          </Card>
        )}

        {institusiAktif === "Jaringan Kartu Internasional" && (
          <Card
            onClick={() => setRingkasanBiAktif(!ringkasanBiAktif)}
            className={`relative overflow-hidden p-4 bg-gradient-to-br from-sky-50 to-sky-100/50 border-sky-200 cursor-pointer transition-all duration-200 ${
              ringkasanBiAktif ? "ring-2 ring-sky-400 shadow-md" : "hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Landmark className="w-4 h-4 text-sky-600" />
              <p className="text-xs font-medium text-sky-700">Dipantau BI (LLD)</p>
            </div>
            <p className="text-3xl font-bold text-sky-600 tabular-nums">{sedangDitangani.length}</p>
          </Card>
        )}
      </div>

      {ringkasanBiAktif && institusiAktif === "PSP" && (
        <Card className="p-4 mb-6 bg-blue-50/50 border-blue-200">
          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5" /> Peran Bank Indonesia dalam Pengawasan PSP
          </p>
          <div className="space-y-3">
            {profilUntukInstitusi("PSP").flatMap(function (profil) {
              return profil.perans.map(function (peran) {
                return (
                  <div key={peran.dimensi} className="flex gap-3">
                    <span className="text-xs font-semibold text-blue-600 shrink-0 w-20">{peran.dimensi}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{peran.deskripsi}</p>
                  </div>
                )
              })
            })}
          </div>
        </Card>
      )}

      {sedangDitangani.length === 0 ? (
        <Card className="p-10 text-center">
          <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Belum ada kasus yang diambil dari antrian {institusiAktif}. Ambil kasus dari halaman Antrian dulu.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {sedangDitangani.map(function (item) {
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
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100">
                            {config.jenisTindakan}
                          </Badge>
                          {item.institusi === "PSP" && (
                            <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-50 border border-blue-200 gap-1">
                              <Landmark className="w-3 h-3" />
                              Diinstruksikan BI
                            </Badge>
                          )}
                          {item.institusi === "Jaringan Kartu Internasional" && (
                            <Badge className="bg-sky-50 text-sky-600 hover:bg-sky-50 border border-sky-200 gap-1">
                              <Landmark className="w-3 h-3" />
                              Dipantau BI (LLD)
                            </Badge>
                          )}
                        </div>
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
                        className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
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
                          <p className="text-[11px] text-slate-400 uppercase tracking-wide mb-1">Sumber Sinyal</p>
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

                      {item.institusi === "PSP" && (
                        <div className="mb-4 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                            <Landmark className="w-3.5 h-3.5" /> Peran BI untuk Kasus {item.platform}
                          </p>
                          <div className="space-y-2">
                            {peranBiUntukKasus(item).map(function (peran) {
                              return (
                                <div key={peran.dimensi} className="flex gap-3">
                                  <span className="text-xs font-semibold text-blue-600 shrink-0 w-20">{peran.dimensi}</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">{peran.deskripsi}</p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {item.institusi === "Jaringan Kartu Internasional" && (
                        <div className="mb-4 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-sky-700 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                            <Landmark className="w-3.5 h-3.5" /> Peran BI untuk Kasus {item.platform}
                          </p>
                          <div className="space-y-2">
                            {peranBiUntukKasusKartu(item).map(function (peran) {
                              return (
                                <div key={peran.dimensi} className="flex gap-3">
                                  <span className="text-xs font-semibold text-sky-600 shrink-0 w-20">{peran.dimensi}</span>
                                  <p className="text-xs text-slate-600 leading-relaxed">{peran.deskripsi}</p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

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