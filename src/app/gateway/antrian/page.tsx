"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe2, Smartphone, Landmark, CheckCircle2, Search, CreditCard, Megaphone, ArrowRight, AlertTriangle, Clock } from "lucide-react"
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

export default function AntrianPage() {
  const [institusiAktif, setInstitusiAktif] = useState<Institusi>("Kominfo")
  const [diambil, setDiambil] = useState<string[]>([])
  const [dikonfirmasi, setDikonfirmasi] = useState<string[]>([])
  const [pencarian, setPencarian] = useState("")

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

  function ambilDanLanjutkan(id: string) {
    setDiambil(function (prev) {
      const baru = prev.concat([id])
      localStorage.setItem("sigap_diambil", JSON.stringify(baru))
      return baru
    })
  }

  const config = institusiConfig[institusiAktif]
  const Icon = institusiIcon[institusiAktif]

  const antrian = antrianAwal
    .filter(function (a) {
      return a.institusi === institusiAktif
    })
    .filter(function (a) {
      return diambil.indexOf(a.id) === -1 && dikonfirmasi.indexOf(a.id) === -1
    })
    .filter(function (a) {
      const kata = pencarian.toLowerCase()
      return a.platform.toLowerCase().includes(kata) || a.domisili.toLowerCase().includes(kata)
    })
    .sort(function (a, b) {
      return a.sisaHari - b.sisaHari
    })

  const jumlahTerlambat = antrian.filter(function (a) {
    return a.sisaHari < 0
  }).length

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <Card className="relative overflow-hidden p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-amber-700">Belum Diambil</p>
          </div>
          <p className="text-3xl font-bold text-amber-600 tabular-nums">{antrian.length}</p>
        </Card>
        <Card className="relative overflow-hidden p-4 bg-gradient-to-br from-red-50 to-red-100/50 border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-medium text-red-700">Sudah Lewat Batas Waktu</p>
          </div>
          <p className="text-3xl font-bold text-red-600 tabular-nums">{jumlahTerlambat}</p>
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

      {antrian.length === 0 ? (
        <Card className="p-10 text-center">
          <CheckCircle2 className="w-8 h-8 text-teal-500 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Tidak ada kasus baru di antrian {institusiAktif} saat ini.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {antrian.map(function (item) {
            const waktu = sisaWaktuInfo(item.sisaHari)
            return (
              <Card key={item.id} className="p-5">
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
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${waktu.bg} ${waktu.color}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${waktu.dot}`} />
                      {waktu.label}
                    </span>
                    <Button
                      onClick={function () {
                        ambilDanLanjutkan(item.id)
                      }}
                      className="bg-teal-600 hover:bg-teal-700 gap-1.5"
                    >
                      Ambil & Lanjutkan
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}