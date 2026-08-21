"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SidebarUserBadge } from "@/components/sidebar-user-badge"
import { ListOrdered, ClipboardCheck, History, ShieldCheck } from "lucide-react"

type Institusi = "Kominfo" | "App Store / Play Store" | "PSP" | "Jaringan Kartu Internasional" | "Platform Iklan Digital"

const pageConfig: Record<string, { section: string; title: string; subtitle: string }> = {
  "/gateway/antrian": {
    section: "Titik Jepit",
    title: "Antrian",
    subtitle: "Platform yang dieskalasi tim DJP, belum diambil untuk ditindaklanjuti",
  },
  "/gateway/tindak-lanjut": {
    section: "Titik Jepit",
    title: "Tindak Lanjut",
    subtitle: "Kasus yang sudah diambil dan menunggu aksi Anda",
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
  const [userName, setUserName] = useState("Rina Wijaya") // TODO: ganti dari data login asli
  const page = pageConfig[pathname] ?? pageConfig["/gateway/antrian"]

  useEffect(function () {
    const tersimpan = localStorage.getItem("sigap_institusi") as Institusi | null
    if (tersimpan) {
      setInstitusiAktif(tersimpan)
    }
    const nama = localStorage.getItem("sigap_user_name")
    if (nama) {
      setUserName(nama)
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
        <aside className="w-64 shrink-0 bg-slate-900 text-white p-6 flex flex-col sticky top-0 self-start h-screen overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Titik Jepit
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/gateway/antrian"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/gateway/antrian"
                    ? "bg-teal-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <ListOrdered className="w-4 h-4 shrink-0" />
                Antrian
              </Link>
            </li>
            <li>
              <Link
                href="/gateway/tindak-lanjut"
                className={`flex items-center gap-2.5 px-3 py-2 rounded-md ${
                  pathname === "/gateway/tindak-lanjut"
                    ? "bg-teal-600 text-white"
                    : "hover:bg-slate-800"
                }`}
              >
                <ClipboardCheck className="w-4 h-4 shrink-0" />
                Tindak Lanjut
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

          <SidebarUserBadge
            name={userName}
            role={`Petugas · ${institusiAktif}`}
            colorClass="bg-indigo-600"
          />
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