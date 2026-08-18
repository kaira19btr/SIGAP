"use client"

import { useState } from "react"
import { Flag, Send } from "lucide-react"

export default function LaporkanPlatformPage() {
  const [namaPlatform, setNamaPlatform] = useState("")
  const [urlPlatform, setUrlPlatform] = useState("")
  const [keterangan, setKeterangan] = useState("")
  const [terkirim, setTerkirim] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTerkirim(true)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-6 rounded-full bg-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">Laporkan Platform</h1>
      </div>
      <p className="text-gray-500 mb-6 ml-4">
        Laporkan platform digital luar negeri yang menurut kamu belum memungut PPN PMSE.
      </p>

      {terkirim ? (
        <div className="bg-white border border-teal-200 rounded-xl p-6 text-center">
          <Flag className="w-8 h-8 text-teal-500 mx-auto mb-3" />
          <p className="text-gray-900 font-semibold mb-1">Laporan terkirim</p>
          <p className="text-sm text-gray-500">
            Terima kasih, laporan kamu akan diverifikasi oleh tim DJP.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              Nama Platform
            </label>
            <input
              type="text"
              required
              value={namaPlatform}
              onChange={(e) => setNamaPlatform(e.target.value)}
              placeholder="Contoh: Nama Aplikasi/Layanan"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              URL / Tautan Platform (opsional)
            </label>
            <input
              type="url"
              value={urlPlatform}
              onChange={(e) => setUrlPlatform(e.target.value)}
              placeholder="https://..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1.5">
              Keterangan
            </label>
            <textarea
              required
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              rows={4}
              placeholder="Jelaskan mengapa kamu melaporkan platform ini..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg py-2.5 transition-colors"
          >
            <Send className="w-4 h-4" />
            Kirim Laporan
          </button>
        </form>
      )}
    </div>
  )
}