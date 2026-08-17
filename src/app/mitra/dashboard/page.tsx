"use client"

import { useState, useEffect } from "react"
import { ShieldCheck, FileCheck, Clock, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function MitraDashboard() {
  const confidenceScore = 42
  const threshold = 100
  const sisaMenujuThreshold = threshold - confidenceScore

  const [skdStatus, setSkdStatus] = useState<"belum" | "menunggu">("belum")

  useEffect(() => {
    const status = localStorage.getItem("sigap_skd_status")
    if (status === "menunggu") {
      setSkdStatus("menunggu")
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-t-4 border-t-teal-500 p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Skor Kepercayaan
              </p>
              <p className="text-[10px] text-slate-400">Confidence Score</p>
            </div>
            <TrendingUp className="w-4 h-4 text-teal-500 shrink-0" />
          </div>

          <div className="flex items-center gap-4">
            <div
              className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: `conic-gradient(#0d9488 ${confidenceScore * 3.6}deg, #e2e8f0 0deg)`,
              }}
            >
              <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
                <span className="text-xl font-bold text-slate-800">{confidenceScore}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500">Belum melewati ambang batas</p>
              <p className="text-[10px] text-slate-400">Has not exceeded the threshold</p>
              <p className="text-xs font-medium text-teal-600 mt-1.5">
                {sisaMenujuThreshold} poin lagi menuju ambang batas
              </p>
              <p className="text-[10px] text-slate-400">
                {sisaMenujuThreshold} points to threshold
              </p>
            </div>
          </div>
        </div>

        {skdStatus === "belum" ? (
          <div className="bg-white rounded-xl border border-t-4 border-t-amber-400 p-5 flex flex-col">
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
            <p className="text-[10px] text-slate-400 mb-3">Self-register for fast-track</p>

            <Link
              href="/mitra/pendaftaran"
              className="mt-auto inline-flex flex-col items-center justify-center gap-0.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <span>Daftar SKD Sekarang</span>
              <span className="text-[10px] font-normal opacity-80">Register for SKD Now</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-t-4 border-t-blue-400 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Status SKD
                </p>
                <p className="text-[10px] text-slate-400">SKD Status</p>
              </div>
              <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            </div>
            <p className="text-lg font-bold text-blue-600">Menunggu Verifikasi</p>
            <p className="text-[10px] text-blue-500">Pending Verification</p>
            <p className="text-xs text-slate-500 mt-1.5">
              Tim DJP sedang meninjau data Anda
            </p>
            <p className="text-[10px] text-slate-400 mb-3">
              DJP team is reviewing your data
            </p>

            <div className="mt-auto inline-flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg">
              Menunggu human-in-the-loop
            </div>
          </div>
        )}

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

      {skdStatus === "belum" && (
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
      )}
    </div>
  )
}