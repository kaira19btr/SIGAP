"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ListOrdered, History, ShieldCheck } from "lucide-react"

type Institusi = "Kominfo" | "App Store / Play Store" | "PSP" | "Jaringan Kartu Internasional" | "Platform Iklan Digital"

const pageConfig: Record<string, { section: string; title: string; subtitle: string }> = {
  "/gateway/antrian-tindak-lanjut": {
    section: "Titik Jepit",
    title: "Antrian Tindak Lanjut",
    subtitle: "Platform yang dieskalasi tim DJP dan butuh tindakan Anda",
  },
  "/gateway/riwayat-eskalasi": {
    section: "Titik Jepit",
    title: "Riwayat Eskalasi",
    subtitle: "Catatan seluruh tindak lanjut yang sudah dikonfirmasi",
  },
  "/gateway/daftar-skd": {
    section: "Titik Jepit",
    title: "Daftar Pemegang SKD",
    subtitle: "Platform yang sudah memiliki Sertifikat Kepatuhan Dini",
  },
}

export default function GatewayLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [institusiAktif, setInstitusiAktif] = useState<Institusi>("Kominfo")
  const page = pageConfig[pathname] ?? pageConfig["/gateway/antrian-tindak-lanjut"]

  useEffect(function () {
    const tersimpan = localStorage.getItem("sigap_institusi") as Institusi | null
    if (tersimpan) {
      setInstitusiAktif(tersimpan)
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem("sigap_institusi")
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        roleLabel="Mitra Titik Jepit (Gateway)"
        orgLabel={institusiAktif}
        onLogout={handleLogout}
      />
      <div className="flex flex-1">
        <aside className="w-64 shrink-0 bg-slate-900 text-white p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Titik Jepit
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/gateway/antrian-tindak-lanjut"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/gateway/antrian-tindak-lanjut"
                    ? "bg-teal-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <ListOrdered className="w-4 h-4 shrink-0" />
                Antrian Tindak Lanjut
              </Link>
            </li>
            <li>
              <Link
                href="/gateway/riwayat-eskalasi"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/gateway/riwayat-eskalasi"
                    ? "bg-teal-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <History className="w-4 h-4 shrink-0" />
                Riwayat Eskalasi
              </Link>
            </li>
            {institusiAktif === "Kominfo" && (
              <li>
                <Link
                  href="/gateway/daftar-skd"
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                    pathname === "/gateway/daftar-skd"
                      ? "bg-teal-600 text-white"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  Daftar Pemegang SKD
                </Link>
              </li>
            )}
          </ul>
        </aside>
        <main className="flex-1 bg-gray-50">
          <div className="px-8 py-4 bg-white border-b">
            <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-1">
              {page.section}
            </p>
            <h2 className="text-xl font-bold text-slate-800">{page.title}</h2>
            <p className="text-sm text-slate-500">{page.subtitle}</p>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}