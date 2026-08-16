"use client"

import { jejakAudit } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Lock } from "lucide-react"

export default function JejakAuditPage() {
  return (
    <div>
      <Card className="p-4 mb-6 flex items-center gap-3 bg-slate-50 border-slate-200">
        <Lock className="w-4 h-4 text-slate-500 shrink-0" />
        <p className="text-sm text-slate-600">
          Seluruh catatan di halaman ini bersifat permanen dan tidak dapat diubah atau dihapus oleh siapa pun, termasuk administrator sistem.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-800 mb-1">Riwayat Aktivitas Sistem</h3>
        <p className="text-sm text-slate-500 mb-6">
          Diurutkan dari yang terbaru
        </p>

        <div className="relative pl-6 space-y-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
          {jejakAudit.map((log) => (
            <div key={log.id} className="relative">
              <span
                className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  log.tipe === "otomatis" ? "bg-teal-600" : "bg-indigo-500"
                }`}
              />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-slate-800">{log.aksi}</p>
                    <Badge
                      className={`text-[10px] px-2 py-0 gap-1 ${
                        log.tipe === "otomatis"
                          ? "bg-teal-100 text-teal-700 hover:bg-teal-100"
                          : "bg-indigo-100 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {log.tipe === "otomatis" ? (
                        <Bot className="w-3 h-3" />
                      ) : (
                        <User className="w-3 h-3" />
                      )}
                      {log.aktor}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium">{log.target}</span> — {log.detail}
                  </p>
                </div>
                <p className="text-xs text-slate-400 shrink-0 whitespace-nowrap">{log.waktu}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}