"use client"

import { useEffect, useState } from "react"
import { Radar, Globe2, ShieldCheck, Newspaper, Smartphone, Landmark, TrendingUp, Flag, Gauge } from "lucide-react"
import {
  SinyalEvent,
  poolSinyal,
  sumberKeNode,
  nodeInfo,
  waktuRelatif,
  NodeType,
  SumberSinyal,
} from "@/lib/data-radar"

const sumberIcon: Record<SumberSinyal, typeof Globe2> = {
  Similarweb: Globe2,
  "data.ai": Globe2,
  "Sensor Tower": Globe2,
  "Media Massa": Newspaper,
  Kominfo: ShieldCheck,
  "App Store / Play Store": Smartphone,
  "BI / PSP": Landmark,
}

type FilterNode = NodeType | "semua"

function ConfidenceRing({ score }: { score: number }) {
  const size = 40
  const stroke = 4
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const warna = score >= 85 ? "#dc2626" : score >= 60 ? "#d97706" : "#0d9488"

  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} className="fill-none stroke-slate-200" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke={warna}
          className="fill-none transition-all duration-700"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-slate-700">{score}</span>
    </div>
  )
}

export default function DjpRadarFeedPage() {
  const [feed, setFeed] = useState<SinyalEvent[]>([])
  const [filter, setFilter] = useState<FilterNode>("semua")
  const [tick, setTick] = useState(Date.now())

  useEffect(function () {
    const interval = setInterval(function () {
      setFeed(function (prev) {
        let template = poolSinyal[Math.floor(Math.random() * poolSinyal.length)]
        if (prev[0] && template.platform === prev[0].platform) {
          const alternatif = poolSinyal.filter(function (t) {
            return t.platform !== prev[0].platform
          })
          template = alternatif[Math.floor(Math.random() * alternatif.length)]
        }
        const node = sumberKeNode(template.sumber)
        const event: SinyalEvent = {
          ...template,
          id: crypto.randomUUID(),
          waktu: Date.now(),
          node,
        }
        return [event, ...prev].slice(0, 30)
      })
    }, 4000 + Math.random() * 4000)

    return function () {
      clearInterval(interval)
    }
  }, [])

  useEffect(function () {
    const interval = setInterval(function () {
      setTick(Date.now())
    }, 1000)
    return function () {
      clearInterval(interval)
    }
  }, [])

  const feedTampil = feed.filter(function (item) {
    return filter === "semua" || item.node === filter
  })

  const totalSinyal = feed.length
  const redFlagCount = feed.filter(function (item) {
    return item.skorBaru >= 85
  }).length
  const rataRata = feed.length
    ? Math.round(feed.reduce(function (sum, item) { return sum + item.skorBaru }, 0) / feed.length)
    : 0

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{
              animationDuration: "3s",
              background: "conic-gradient(from 0deg, transparent 0%, rgba(13,148,136,0.25) 15%, transparent 30%)",
            }}
          />
          <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-teal-50 text-teal-600">
            <Radar className="h-6 w-6" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">RADAR PMSE / FiskaLens</h3>
          <p className="text-sm text-slate-500">Sinyal masuk secara langsung dari seluruh titik jepit</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
          <div className="mb-1 flex items-center gap-1.5 text-slate-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase tracking-wide">Sinyal Masuk</span>
          </div>
          <p className="text-xl font-bold text-slate-800">{totalSinyal}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
          <div className="mb-1 flex items-center gap-1.5 text-red-600">
            <Flag className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase tracking-wide">Red Flag</span>
          </div>
          <p className="text-xl font-bold text-red-600">{redFlagCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
          <div className="mb-1 flex items-center gap-1.5 text-slate-400">
            <Gauge className="h-3.5 w-3.5" />
            <span className="text-[11px] uppercase tracking-wide">Skor Rata-rata</span>
          </div>
          <p className="text-xl font-bold text-slate-800">{rataRata || "–"}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {(["global", "domestik"] as NodeType[]).map(function (n) {
          const info = nodeInfo[n]
          return (
            <div
              key={n}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-800">{info.label}</p>
                <p className="text-xs text-slate-500">{info.sumberList}</p>
              </div>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
          )
        })}
      </div>

      <div className="mb-4 flex gap-2">
        {(
          [
            { key: "semua", label: "Semua Sinyal" },
            { key: "global", label: "Global Signal Node" },
            { key: "domestik", label: "Domestic Enforcement Node" },
          ] as { key: FilterNode; label: string }[]
        ).map(function (opt) {
          const aktif = filter === opt.key
          return (
            <button
              key={opt.key}
              onClick={function () {
                setFilter(opt.key)
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                aktif
                  ? "bg-teal-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {feedTampil.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 py-16 text-center text-sm text-slate-400">
          Menunggu sinyal pertama masuk...
        </div>
      ) : (
        <div className="space-y-2">
          {feedTampil.map(function (item, index) {
            const Icon = sumberIcon[item.sumber]
            const nodeWarna = item.node === "global" ? "text-sky-600 bg-sky-50" : "text-purple-600 bg-purple-50"
            const isTerbaru = index === 0

            return (
              <div
                key={item.id}
                className={`animate-in fade-in slide-in-from-top-2 flex items-center gap-3 rounded-lg border px-4 py-3 duration-300 ${
                  isTerbaru
                    ? "border-teal-300 bg-teal-50/60"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${nodeWarna}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-slate-800">
                      {item.platform} <span className="text-slate-400">· {item.domisili}</span>
                    </p>
                    <span className="shrink-0 text-xs text-slate-400">{waktuRelatif(item.waktu, tick)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{item.keterangan}</p>
                  <div className="mt-1.5 flex items-center gap-2 text-xs text-slate-400">
                    <span>{item.sumber}</span>
                    <span className="text-slate-300">•</span>
                    <span>{item.jenis}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-semibold text-emerald-600">+{item.deltaSkor}</span>
                  </div>
                </div>
                <ConfidenceRing score={item.skorBaru} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}