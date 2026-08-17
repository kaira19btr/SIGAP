"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import {
  RefreshCw,
  ClipboardList,
  Radar,
  Info,
  Search,
  Flag,
  Globe2,
  ScrollText,
} from "lucide-react"

const pageConfig: Record<string, { section: string; title: string; subtitle: string }> = {
  "/djp/dashboard": {
    section: "Investigasi",
    title: "Ringkasan Kepatuhan",
    subtitle: "Investigasi dan prioritisasi platform PMSE",
  },
  "/djp/simulasi-deteksi": {
    section: "Investigasi",
    title: "Simulasi Deteksi",
    subtitle: "Ilustrasi alur deteksi kepatuhan dari sinyal hingga eskalasi",
  },
  "/djp/metodologi-estimasi": {
    section: "Investigasi",
    title: "Metodologi Estimasi",
    subtitle: "Bagaimana SIGAP menghitung confidence score dan estimasi transaksi",
  },
  "/djp/pencarian-platform": {
    section: "Investigasi",
    title: "Pencarian Platform",
    subtitle: "Tarik seluruh sinyal sebuah platform dalam satu tampilan",
  },
  "/djp/red-flag-aktif": {
    section: "Investigasi",
    title: "Red Flag Aktif",
    subtitle: "Anomali yang terdeteksi otomatis dan butuh tindak lanjut",
  },
  "/djp/peta-sebaran-global": {
    section: "Investigasi",
    title: "Peta Sebaran Global",
    subtitle: "Distribusi platform PMSE berdasarkan negara asal",
  },
  "/djp/jejak-audit": {
    section: "Tata Kelola",
    title: "Jejak Audit",
    subtitle: "Riwayat aktivitas sistem yang tidak dapat diubah",
  },
}

export default function DjpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const page = pageConfig[pathname] ?? pageConfig["/djp/dashboard"]

  const handleLogout = () => {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header roleLabel="Otoritas Negara (DJP)" onLogout={handleLogout} />
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 bg-slate-900 text-white p-6 sticky top-0 self-start h-screen overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Investigasi
          </p>
          <ul className="space-y-1 text-sm mb-6">
            <li>
              <Link
                href="/djp/dashboard"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/dashboard" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <ClipboardList className="w-4 h-4 shrink-0" />
                Ringkasan Kepatuhan
              </Link>
            </li>
            <li>
              <Link
                href="/djp/simulasi-deteksi"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/simulasi-deteksi" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Radar className="w-4 h-4 shrink-0" />
                Simulasi Deteksi
              </Link>
            </li>
            <li>
              <Link
                href="/djp/metodologi-estimasi"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/metodologi-estimasi" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Info className="w-4 h-4 shrink-0" />
                Metodologi Estimasi
              </Link>
            </li>
            <li>
              <Link
                href="/djp/pencarian-platform"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/pencarian-platform" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Search className="w-4 h-4 shrink-0" />
                Pencarian Platform
              </Link>
            </li>
            <li>
              <Link
                href="/djp/red-flag-aktif"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/red-flag-aktif" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Flag className="w-4 h-4 shrink-0" />
                Red Flag Aktif
              </Link>
            </li>
            <li>
              <Link
                href="/djp/peta-sebaran-global"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/peta-sebaran-global" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <Globe2 className="w-4 h-4 shrink-0" />
                Peta Sebaran Global
              </Link>
            </li>
          </ul>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Tata Kelola
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/djp/jejak-audit"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/djp/jejak-audit" ? "bg-teal-600 text-white" : "hover:bg-slate-800"
                }`}
              >
                <ScrollText className="w-4 h-4 shrink-0" />
                Jejak Audit
              </Link>
            </li>
          </ul>
        </aside>
        <main className="flex-1 bg-gray-50">
          <div className="px-8 py-4 bg-white border-b flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">
                {page.section}
              </p>
              <h2 className="text-xl font-bold text-slate-800">{page.title}</h2>
              <p className="text-sm text-slate-500">{page.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-teal-500 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-teal-500" />
                </span>
                4 sumber sinyal aktif
              </span>
              <div className="h-8 w-px bg-slate-200" />
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Diperbarui 09:42</span>
                <button className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}