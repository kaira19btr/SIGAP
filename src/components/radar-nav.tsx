"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutList, Globe2, LogOut } from "lucide-react"

export function RadarNav() {
  const pathname = usePathname()
  const tabs = [
    { href: "/radar-feed/dashboard", label: "Feed", icon: LayoutList },
    { href: "/radar-feed/sonar", label: "Peta", icon: Globe2 },
  ]
  return (
    <div className="mb-6 flex items-center justify-between gap-2">
      <div className="flex gap-2">
        {tabs.map(function (tab) {
          const aktif = pathname === tab.href
          const Icon = tab.icon
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                aktif ? "bg-teal-500 text-slate-950" : "bg-slate-900 text-slate-400 hover:bg-slate-800"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </Link>
          )
        })}
      </div>

      <Link
        href="/login"
        className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
      >
        <LogOut className="h-3.5 w-3.5" />
        Keluar
      </Link>
    </div>
  )
}