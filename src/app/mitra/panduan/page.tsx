"use client"

import { useState } from "react"
import { HelpCircle, ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "Kapan saya wajib memungut PPN PMSE?",
    qEn: "When am I required to collect PPN PMSE?",
    a: "Kewajiban timbul saat platform Anda melewati ambang batas Rp600 juta transaksi atau 12.000 traffic per tahun di Indonesia.",
    aEn: "The obligation arises when your platform exceeds the threshold of Rp600 million in transactions or 12,000 traffic per year in Indonesia.",
  },
  {
    q: "Apa itu Sertifikat Kepatuhan Dini (SKD)?",
    qEn: "What is the Early Compliance Certificate (SKD)?",
    a: "SKD adalah sertifikat yang diterbitkan DJP bagi platform yang mendaftar mandiri sebelum terdeteksi sistem RADAR PMSE, dengan manfaat status pemungut lebih cepat dan masa tenggang tanpa sanksi.",
    aEn: "SKD is a certificate issued by DJP to platforms that self-register before being detected by the RADAR PMSE system, offering faster collector status and a grace period without sanctions.",
  },
  {
    q: "Bagaimana confidence score dihitung?",
    qEn: "How is the confidence score calculated?",
    a: "Skor dihitung dari kombinasi sinyal traffic publik, tren pencarian, data payment gateway, dan pemberitaan media terkait platform Anda.",
    aEn: "The score is calculated from a combination of public traffic signals, search trends, payment gateway data, and media coverage related to your platform.",
  },
  {
    q: "Apakah SKD bersifat permanen?",
    qEn: "Is the SKD permanent?",
    a: "Tidak. SKD dievaluasi secara berkala. Jika platform lalai (berhenti setor, data tidak sinkron), status dapat dicabut dan platform kembali masuk pengawasan reguler.",
    aEn: "No. SKD is evaluated periodically. If the platform is negligent (stops remitting, data out of sync), its status can be revoked and the platform returns to regular monitoring.",
  },
]

export default function Panduan() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <div className="space-y-3 max-w-2xl">
      {faqs.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="bg-white rounded-xl border overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 p-5 text-left hover:bg-slate-50 transition-colors"
            >
              <HelpCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-slate-800">{item.q}</p>
                <p className="text-xs text-slate-400 italic">{item.qEn}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pl-[3.25rem]">
                  <p className="text-sm text-slate-600">{item.a}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.aEn}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}