"use client"

import { useState } from "react"
import {
  Globe,
  Lock,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
  FileText,
} from "lucide-react"
import NetworkBackground from "@/components/NetworkBackground"

const otoritasList = [
  { value: "sg-iras", label: "SG · IRAS — Inland Revenue Authority of Singapore" },
  { value: "us-irs", label: "US · IRS — Internal Revenue Service" },
  { value: "kr-nts", label: "KR · NTS — National Tax Service" },
  { value: "cn-sat", label: "CN · SAT — State Taxation Administration" },
  { value: "hk-ird", label: "HK · IRD — Inland Revenue Department" },
]

type JenisInfo = {
  id: string
  label: string
  checked: boolean
}

const logAwal = [
  {
    id: "log-1",
    waktu: "10:05 WIB",
    status: "selesai" as const,
    teks: "Otoritas asing mengonfirmasi kecocokan identitas. Data aset diunduh secara aman.",
  },
  {
    id: "log-2",
    waktu: "10:01 WIB",
    status: "proses" as const,
    teks: "Permintaan diteruskan melalui gateway NIIS X-Road, menunggu verifikasi otoritas tujuan.",
  },
  {
    id: "log-3",
    waktu: "09:58 WIB",
    status: "selesai" as const,
    teks: "Permintaan pertukaran data dibuat oleh Direktorat Jenderal Pajak.",
  },
]

export default function PertukaranDataPlatformPage() {
  const [otoritas, setOtoritas] = useState("sg-iras")
  const [tin, setTin] = useState("")
  const [jenisInfo, setJenisInfo] = useState<JenisInfo[]>([
    { id: "rekening", label: "Rekening Bank / Trust", checked: true },
    { id: "properti", label: "Kepemilikan Properti", checked: true },
    { id: "beneficial", label: "Data Beneficial Owner", checked: false },
    { id: "transaksi", label: "Riwayat Transaksi Platform", checked: false },
  ])

  function toggleJenis(id: string) {
    setJenisInfo((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    )
  }

  return (
    <div className="-m-8 min-h-[calc(100vh-97px)] text-white p-8 bg-neutral-950 relative overflow-hidden">
      <div className="grid-pattern" />
      <NetworkBackground />
      <div className="scan-beam" />

      <div className="relative z-10">
        <h1 className="text-2xl font-bold text-white mb-6">
          Pertukaran Data Platform
        </h1>

        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <p className="text-xs font-mono tracking-widest text-teal-400 mb-2">
              FEDERASI INTERNASIONAL · NIIS X-ROAD
            </p>
            <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
              <Globe className="w-6 h-6 text-teal-400" />
              Terminal Pertukaran Data Global
              <span className="text-slate-400 font-normal text-lg">(X-Road Federation)</span>
            </h2>
            <p className="text-sm text-slate-400 font-mono">
              // Protokol EoIR (Exchange of Information on Request) &amp; AEOI
            </p>
          </div>

          <div className="flex items-center gap-2 bg-teal-950/60 border border-teal-800/60 rounded-lg px-4 py-2.5">
            <Lock className="w-4 h-4 text-teal-400 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-teal-300">
                Koneksi Terenkripsi Ujung-ke-Ujung
              </p>
              <p className="text-xs text-slate-400">NIIS Standard · Security Server Aktif</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-4 h-4 text-slate-400" />
              <p className="text-xs font-semibold text-slate-300 tracking-wide">
                FORMULIR PERMINTAAN DATA
              </p>
            </div>

            <label className="text-sm text-slate-300 mb-1.5 block">
              Pilih Otoritas Asing (Yurisdiksi Target)
            </label>
            <select
              value={otoritas}
              onChange={(e) => setOtoritas(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2.5 text-sm mb-4 focus:outline-none focus:border-teal-500"
            >
              {otoritasList.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <label className="text-sm text-slate-300 mb-1.5 block">
              Nomor Paspor / Tax Identification Number (TIN)
            </label>
            <input
              type="text"
              value={tin}
              onChange={(e) => setTin(e.target.value)}
              placeholder="S1234567Z · TIN-88213-SGP"
              className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-2.5 text-sm mb-4 font-mono placeholder:text-slate-600 focus:outline-none focus:border-teal-500"
            />

            <p className="text-sm text-slate-300 mb-2">Jenis Informasi yang Diminta</p>
            <div className="space-y-2 mb-5">
              {jenisInfo.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2.5 text-sm text-slate-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleJenis(item.id)}
                    className="w-4 h-4 rounded accent-teal-500"
                  />
                  {item.label}
                </label>
              ))}
            </div>

            <button className="w-full bg-teal-600 hover:bg-teal-500 transition-colors text-white text-sm font-semibold rounded-md py-2.5 flex items-center justify-center gap-2">
              Kirim Permintaan Data
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-red-950/40 border border-red-900/60 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <p className="text-xs font-semibold text-red-300 tracking-wide">
                  RED FLAG TERDETEKSI
                </p>
              </div>
              <p className="text-sm text-slate-200 mb-4">
                Ditemukan: <span className="font-bold">1 Rekening Trust (USD 2.500.000)</span>.
                Data siap diintegrasikan ke Coretax.
              </p>
              <button className="text-sm font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1.5">
                Integrasikan ke Coretax
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 flex-1">
              <p className="text-xs font-semibold text-slate-300 tracking-wide mb-4">
                LOG KOMUNIKASI &amp; PELACAKAN
              </p>
              <div className="space-y-4">
                {logAwal.map((log) => (
                  <div key={log.id} className="flex gap-3">
                    <div className="shrink-0 mt-0.5">
                      {log.status === "selesai" ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-mono text-slate-500 mb-0.5">{log.waktu}</p>
                      <p className="text-sm text-slate-300">{log.teks}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}