"use client"

import { useState, useMemo } from "react"
import { ShieldCheck, Send, Building2, Globe2, Mail, User, AlertTriangle } from "lucide-react"

// Simulasi data yang sudah ditangkap RADAR PMSE dari sinyal independen
// (Similarweb, BI/PSP, App Store) sebelum platform ini mendaftar mandiri
const ESTIMASI_TERDETEKSI_SISTEM = {
  transaksi: 780000000,
  traffic: 15200,
}

export default function PendaftaranMandiri() {
  const [submitted, setSubmitted] = useState(false)
  const [namaPlatform, setNamaPlatform] = useState("")
  const [negaraAsal, setNegaraAsal] = useState("")
  const [emailPic, setEmailPic] = useState("")
  const [namaPic, setNamaPic] = useState("")
  const [transaksi, setTransaksi] = useState("")
  const [traffic, setTraffic] = useState("")

  const AMBANG_TRANSAKSI = 600000000
  const AMBANG_TRAFFIC = 12000

  const skorKepercayaan = useMemo(() => {
    const t = Number(transaksi) || 0
    const tr = Number(traffic) || 0
    const rasioTransaksi = t / AMBANG_TRANSAKSI
    const rasioTraffic = tr / AMBANG_TRAFFIC
    const rasioTertinggi = Math.max(rasioTransaksi, rasioTraffic)
    return Math.min(Math.round(rasioTertinggi * 100), 100)
  }, [transaksi, traffic])

  const sudahLewatAmbang = skorKepercayaan >= 100

  const adaDiskrepansi = useMemo(() => {
    const t = Number(transaksi) || 0
    const tr = Number(traffic) || 0
    if (t === 0 && tr === 0) return false
    const selisihTransaksi = ESTIMASI_TERDETEKSI_SISTEM.transaksi - t
    const selisihTraffic = ESTIMASI_TERDETEKSI_SISTEM.traffic - tr
    return (
      selisihTransaksi > ESTIMASI_TERDETEKSI_SISTEM.transaksi * 0.3 ||
      selisihTraffic > ESTIMASI_TERDETEKSI_SISTEM.traffic * 0.3
    )
  }, [transaksi, traffic])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("sigap_skd_status", "menunggu")
    localStorage.setItem("sigap_confidence_score", String(skorKepercayaan))
    localStorage.setItem("sigap_nama_platform", namaPlatform)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
        <p className="font-semibold text-emerald-800 text-lg">Pendaftaran Berhasil Dikirim</p>
        <p className="text-xs text-emerald-600">Registration Successfully Submitted</p>
        <p className="text-sm text-emerald-700 mt-2">
          Tim verifikasi DJP akan meninjau data Anda melalui proses human-in-the-loop.
        </p>
        <p className="text-xs text-emerald-600 mt-1">
          The DJP verification team will review your data through a human-in-the-loop process.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4 max-w-2xl">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
          Identitas Platform
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-0.5">
              <Building2 className="w-4 h-4" />
              Nama Platform
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5 ml-6">Platform Name</p>
            <input
              type="text"
              required
              value={namaPlatform}
              onChange={(e) => setNamaPlatform(e.target.value)}
              placeholder="Contoh: Kling AI"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-0.5">
              <Globe2 className="w-4 h-4" />
              Negara Asal
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5 ml-6">Country of Origin</p>
            <input
              type="text"
              required
              value={negaraAsal}
              onChange={(e) => setNegaraAsal(e.target.value)}
              placeholder="Contoh: Tiongkok"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 pt-2">
          Kontak Penanggung Jawab
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-0.5">
              <User className="w-4 h-4" />
              Nama PIC
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5 ml-6">Person in Charge</p>
            <input
              type="text"
              required
              value={namaPic}
              onChange={(e) => setNamaPic(e.target.value)}
              placeholder="Contoh: Wei Zhang"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm text-slate-600 mb-0.5">
              <Mail className="w-4 h-4" />
              Email Kontak
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5 ml-6">Contact Email</p>
            <input
              type="email"
              required
              value={emailPic}
              onChange={(e) => setEmailPic(e.target.value)}
              placeholder="Contoh: compliance@platform.com"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3 pt-2">
          Estimasi Skala Operasi (Self-Reported)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-slate-600 mb-0.5 block">
              Estimasi Transaksi Tahunan (Rp)
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5">Estimated Annual Transactions (Rp)</p>
            <input
              type="number"
              required
              value={transaksi}
              onChange={(e) => setTransaksi(e.target.value)}
              placeholder="Contoh: 550000000"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600 mb-0.5 block">
              Estimasi Traffic Tahunan
            </label>
            <p className="text-[10px] text-slate-400 mb-1.5">Estimated Annual Traffic</p>
            <input
              type="number"
              required
              value={traffic}
              onChange={(e) => setTraffic(e.target.value)}
              placeholder="Contoh: 10000"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
            />
          </div>
        </div>

        {(transaksi || traffic) && (
          <div className="mt-4 space-y-3">
            <div
              className={`rounded-lg p-4 flex items-center gap-4 border ${
                sudahLewatAmbang
                  ? "bg-red-50 border-red-200"
                  : "bg-teal-50 border-teal-200"
              }`}
            >
              <div
                className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: `conic-gradient(${
                    sudahLewatAmbang ? "#dc2626" : "#0d9488"
                  } ${skorKepercayaan * 3.6}deg, #e2e8f0 0deg)`,
                }}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-bold text-slate-700">
                  {skorKepercayaan}
                </div>
              </div>
              <div className="text-sm">
                <p className={`font-semibold ${sudahLewatAmbang ? "text-red-700" : "text-teal-700"}`}>
                  {sudahLewatAmbang
                    ? "Sudah melewati ambang batas PMK"
                    : "Estimasi skor kepercayaan (berdasarkan input Anda)"}
                </p>
                <p className={`text-xs ${sudahLewatAmbang ? "text-red-600" : "text-teal-600"}`}>
                  Dihitung dari rasio terhadap Rp600 juta transaksi / 12.000 traffic
                </p>
              </div>
            </div>

            {adaDiskrepansi && (
              <div className="rounded-lg p-4 bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-800">
                    Data Anda berbeda signifikan dari sinyal independen sistem
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    RADAR PMSE telah mendeteksi estimasi transaksi ~Rp
                    {ESTIMASI_TERDETEKSI_SISTEM.transaksi.toLocaleString("id-ID")} dan traffic ~
                    {ESTIMASI_TERDETEKSI_SISTEM.traffic.toLocaleString("id-ID")} dari sinyal
                    Similarweb, BI/PSP, dan App Store. Data yang Anda isi akan tetap dicatat, namun
                    tim verifikasi DJP akan membandingkannya dengan sinyal independen ini pada tahap
                    human-in-the-loop.
                  </p>
                  <p className="text-[10px] text-amber-600 mt-1.5">
                    Your input differs significantly from independently detected signals. Both will
                    be cross-checked during manual verification.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        <Send className="w-4 h-4" />
        <span>Kirim Pendaftaran Mandiri</span>
        <span className="text-xs font-normal opacity-80">(Submit Registration)</span>
      </button>
    </form>
  )
}