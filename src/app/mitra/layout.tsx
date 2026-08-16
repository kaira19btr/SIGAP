"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { ClipboardList, Send, BookOpen } from "lucide-react"

type PageInfo = {
  section: string
  sectionEn: string
  title: string
  titleEn: string
  subtitle: string
  subtitleEn: string
}

const pageConfig: Record<string, PageInfo> = {
  "/mitra/dashboard": {
    section: "Portal Mitra",
    sectionEn: "Partner Portal",
    title: "Ringkasan Kepatuhan",
    titleEn: "Compliance Summary",
    subtitle: "Status kepatuhan platform Anda terhadap ketentuan PPN PMSE",
    subtitleEn: "Your platform's compliance status with PPN PMSE regulations",
  },
  "/mitra/pendaftaran": {
    section: "Portal Mitra",
    sectionEn: "Partner Portal",
    title: "Pendaftaran Mandiri",
    titleEn: "Self-Registration",
    subtitle: "Daftarkan platform Anda untuk mendapatkan Sertifikat Kepatuhan Dini",
    subtitleEn: "Register your platform to obtain an Early Compliance Certificate",
  },
  "/mitra/panduan": {
    section: "Bantuan",
    sectionEn: "Help",
    title: "Panduan",
    titleEn: "Guide",
    subtitle: "Informasi seputar kewajiban dan mekanisme PPN PMSE",
    subtitleEn: "Information about PPN PMSE obligations and mechanisms",
  },
}

export default function MitraLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const page = pageConfig[pathname] ?? pageConfig["/mitra/dashboard"]
  const [platformName, setPlatformName] = useState("Mitra Platform")

  useEffect(() => {
    const stored = localStorage.getItem("sigap_platform_name")
    if (stored) setPlatformName(stored)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("sigap_platform_name")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header roleLabel={platformName} onLogout={handleLogout} logoutLabel="Sign Out" />
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 bg-slate-900 text-white p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Portal Mitra
          </p>
          <ul className="space-y-1 text-sm mb-6">
            <li>
              <Link
                href="/mitra/dashboard"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/mitra/dashboard" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <ClipboardList className="w-4 h-4 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm">Ringkasan Kepatuhan</span>
                  <span className="text-[10px] text-slate-400">Compliance Summary</span>
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/mitra/pendaftaran"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/mitra/pendaftaran" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Send className="w-4 h-4 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm">Pendaftaran Mandiri</span>
                  <span className="text-[10px] text-slate-400">Self-Registration</span>
                </span>
              </Link>
            </li>
          </ul>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Bantuan
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/mitra/panduan"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/mitra/panduan" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span className="flex flex-col leading-tight">
                  <span className="text-sm">Panduan</span>
                  <span className="text-[10px] text-slate-400">Guide</span>
                </span>
              </Link>
            </li>
          </ul>
        </aside>

        <main className="flex-1 bg-gray-50">
          <div className="px-8 py-4 bg-white border-b">
            <div className="flex items-baseline gap-2">
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
                {page.section}
              </p>
              <p className="text-[10px] text-slate-400 italic">{page.sectionEn}</p>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-xl font-bold text-slate-800">{page.title}</h2>
              <span className="text-xs text-slate-400 italic">{page.titleEn}</span>
            </div>
            <p className="text-sm text-slate-500">{page.subtitle}</p>
            <p className="text-xs text-slate-400 italic">{page.subtitleEn}</p>
          </div>
          <div className="p-8 max-w-5xl">{children}</div>
        </main>
      </div>
    </div>
  )
}