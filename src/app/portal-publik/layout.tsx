"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, Flag } from "lucide-react"
import { Header } from "@/components/header"

const menuItems = [
  { href: "/portal-publik", label: "Cek Status SKD Platform", icon: Search },
  { href: "/portal-publik/laporkan", label: "Laporkan Platform", icon: Flag },
]

export default function PortalPublikLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  function handleLogout() {
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header roleLabel="Layanan Publik" onLogout={handleLogout} />

      <div className="flex flex-1">
        <aside className="w-72 bg-[#0b1120] p-6 shrink-0">
          <p className="text-xs font-semibold text-slate-500 tracking-wide mb-4 px-2">
            LAYANAN PUBLIK
          </p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const aktif = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    aktif
                      ? "bg-teal-500/15 text-teal-400"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 bg-white p-8">{children}</main>
      </div>
    </div>
  )
}