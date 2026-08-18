"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe2, Smartphone, Landmark, History, CreditCard, Megaphone, ChevronDown, ChevronUp } from "lucide-react"
import { Institusi, KasusEskalasi, institusiConfig, antrianAwal, narasiLengkap } from "@/lib/data-eskalasi"

const institusiIcon: Record<Institusi, typeof Globe2> = {
  Kominfo: Globe2,
  "App Store / Play Store": Smartphone,
  PSP: Landmark,
  "Jaringan Kartu Internasional": CreditCard,
  "Platform Iklan Digital": Megaphone,
}

export default function RiwayatEskalasiPage() {
  const [institusiAktif, setInstitusiAktif] = useState<Institusi>("Kominfo")
  const [dikonfirmasi, setDikonfirmasi] = useState<string[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)

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

  const riwayat: KasusEskalasi[] = antrianAwal.filter(function (item) {
    return item.institusi === institusiAktif && dikonfirmasi.indexOf(item.id) !== -1
  })

  const config = institusiConfig[institusiAktif]
  const Icon = institusiIcon[institusiAktif]

  function toggleExpand(id: string) {
    setExpandedId(function (current) {
      return current === id ? null : id
    })
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <p className="text-xs text-emerald-700 mb-1">Total Sudah Ditindaklanjuti</p>
          <p className="text-2xl font-bold text-emerald-600">{riwayat.length}</p>
        </Card>
        <Card className="p-4 bg-slate-50 border-slate-200">
          <p className="text-xs text-slate-500 mb-1">Institusi Aktif</p>
          <p className="text-2xl font-bold text-slate-800">{institusiAktif}</p>
        </Card>
      </div>

      {riwayat.length === 0 ? (
        <Card className="p-10 text-center">
          <History className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Belum ada tindak lanjut yang dikonfirmasi oleh {institusiAktif}.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {riwayat.map(function (item) {
            const isExpanded = expandedId === item.id
            return (
              <Card
                key={item.id}
                className="p-5 cursor-pointer transition-colors hover:bg-slate-50"
                onClick={function () {
                  toggleExpand(item.id)
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-slate-800">
                        {item.platform} <span className="text-slate-400 font-normal">· {item.domisili}</span>
                      </p>
                      <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 mt-1">
                        {config.jenisTindakan}
                      </Badge>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.catatan}</p>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                            Narasi Lengkap
                          </p>
                          <p className="text-sm text-slate-700 leading-relaxed">
                            {narasiLengkap(item)}
                          </p>
                        </div>
                      )}

                      <p className="text-xs text-slate-400 mt-2">
                        Nomor surat: {item.nomorSurat} · Petugas: {item.petugasDjp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      Selesai Ditindaklanjuti
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
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