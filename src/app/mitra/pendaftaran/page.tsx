"use client"

import { useState } from "react"
import { ShieldCheck, Send, Building2, Globe2 } from "lucide-react"

export default function PendaftaranMandiri() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
            placeholder="Contoh: Tiongkok"
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-slate-600 mb-0.5 block">
            Estimasi Transaksi Tahunan (Rp)
          </label>
          <p className="text-[10px] text-slate-400 mb-1.5">Estimated Annual Transactions (Rp)</p>
          <input
            type="number"
            required
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
            placeholder="Contoh: 10000"
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-500 transition"
          />
        </div>
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