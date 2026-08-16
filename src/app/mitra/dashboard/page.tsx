"use client"

import { ShieldCheck, FileCheck, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MitraDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-t-4 border-t-teal-500 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Skor Kepercayaan
              </p>
              <p className="text-[10px] text-slate-400">Confidence Score</p>
            </div>
            <TrendingUp className="w-4 h-4 text-teal-500 shrink-0" />
          </div>
          <p className="text-3xl font-bold text-slate-800">42</p>
          <p className="text-xs text-slate-500 mt-1">Belum melewati ambang batas</p>
          <p className="text-[10px] text-slate-400">Has not exceeded the threshold</p>
        </div>

        <div className="bg-white rounded-xl border border-t-4 border-t-amber-400 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Status SKD
              </p>
              <p className="text-[10px] text-slate-400">SKD Status</p>
            </div>
            <FileCheck className="w-4 h-4 text-amber-500 shrink-0" />
          </div>
          <p className="text-lg font-bold text-amber-600">Belum Terdaftar</p>
          <p className="text-[10px] text-amber-500">Not Registered</p>
          <p className="text-xs text-slate-500 mt-1.5">Daftar mandiri untuk fast-track</p>
          <p className="text-[10px] text-slate-400">Self-register for fast-track</p>
        </div>

        <div className="bg-white rounded-xl border border-t-4 border-t-emerald-500 p-5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Red Flag
              </p>
              <p className="text-[10px] text-slate-400">Red Flag</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          </div>
          <p className="text-lg font-bold text-emerald-600">Tidak Ada</p>
          <p className="text-[10px] text-emerald-500">None</p>
          <p className="text-xs text-slate-500 mt-1.5">Riwayat bersih sejauh ini</p>
          <p className="text-[10px] text-slate-400">Clean record so far</p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800">
          <p>
            Confidence score Anda mendekati ambang batas Rp600 juta transaksi / 12.000 traffic
            per tahun. Daftar mandiri sekarang untuk mendapatkan Sertifikat Kepatuhan Dini (SKD)
            dan masa tenggang tanpa sanksi administratif.
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Your confidence score is approaching the threshold of Rp600 million in transactions
            or 12,000 traffic per year. Register now to obtain an Early Compliance Certificate
            (SKD) and a grace period without administrative sanctions.
          </p>
          <Link
            href="/mitra/pendaftaran"
            className="inline-block mt-2 font-semibold text-amber-900 underline underline-offset-2"
          >
            Daftar Mandiri Sekarang → <span className="text-xs font-normal">(Register Now)</span>
          </Link>
        </div>
      </div>
    </div>
  )
}