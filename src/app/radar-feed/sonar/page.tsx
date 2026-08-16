"use client"

import { useEffect, useState } from "react"
import { Globe2 } from "lucide-react"
import { poolSinyal, sumberKeNode, NodeType } from "@/lib/data-radar"
import { RadarNav } from "@/components/radar-nav"

// koordinat kasar (lat, long) negara domisili yang muncul di pool sinyal
const koordinatNegara: Record<string, { lat: number; long: number }> = {
  "Amerika Serikat": { lat: 39, long: -98 },
  Tiongkok: { lat: 35, long: 105 },
  Singapura: { lat: 1.3, long: 103.8 },
  "Korea Selatan": { lat: 36, long: 128 },
  Kanada: { lat: 56, long: -106 },
  Prancis: { lat: 46, long: 2 },
  Swedia: { lat: 62, long: 15 },
  Belanda: { lat: 52, long: 5.3 },
}

const indonesia = { lat: -2, long: 118 }

// proyeksi equirectangular sederhana ke viewBox 1000x500
function proyeksi(lat: number, long: number) {
  const x = ((long + 180) / 360) * 1000
  const y = ((90 - lat) / 180) * 500
  return { x, y }
}

interface Sinyal {
  id: string
  platform: string
  domisili: string
  skorBaru: number
  node: NodeType
  createdAt: number
}

export default function PetaGlobalPage() {
  const [sinyal, setSinyal] = useState<Sinyal[]>([])

  useEffect(function () {
    const interval = setInterval(function () {
      // hanya ambil template yang negaranya ada di peta
      const kandidat = poolSinyal.filter(function (t) {
        return koordinatNegara[t.domisili]
      })
      const template = kandidat[Math.floor(Math.random() * kandidat.length)]
      const node = sumberKeNode(template.sumber)

      const item: Sinyal = {
        id: crypto.randomUUID(),
        platform: template.platform,
        domisili: template.domisili,
        skorBaru: template.skorBaru,
        node,
        createdAt: Date.now(),
      }

      setSinyal(function (prev) {
        return [...prev, item].slice(-10)
      })

      setTimeout(function () {
        setSinyal(function (prev) {
          return prev.filter(function (s) {
            return s.id !== item.id
          })
        })
      }, 8000)
    }, 2500 + Math.random() * 2000)

    return function () {
      clearInterval(interval)
    }
  }, [])

  const posIndonesia = proyeksi(indonesia.lat, indonesia.long)
  const garisLintang = [-60, -30, 0, 30, 60]
  const garisBujur = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <style>{`
        @keyframes arc-fade {
          0% { opacity: 0; }
          15% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .arc-fade { animation: arc-fade 8s ease-in-out forwards; }

        @keyframes dot-fade {
          0% { opacity: 0; r: 2; }
          15% { opacity: 1; r: 5; }
          30% { r: 3.5; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .dot-fade { animation: dot-fade 8s ease-in-out forwards; }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .pulse-ring { animation: pulse-ring 2.5s ease-out infinite; transform-origin: center; }
      `}</style>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
          <Globe2 className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Peta Sebaran Global</h1>
          <p className="text-sm text-slate-400">
            Sinyal dari platform tanpa kehadiran fisik, mengalir menuju Indonesia
          </p>
        </div>
      </div>

      <RadarNav />

      <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <svg viewBox="0 0 1000 500" className="w-full">
          {/* graticule */}
          {garisBujur.map(function (bujur) {
            const { x } = proyeksi(0, bujur)
            return <line key={`bj-${bujur}`} x1={x} y1={0} x2={x} y2={500} className="stroke-slate-800" strokeWidth={1} />
          })}
          {garisLintang.map(function (lintang) {
            const { y } = proyeksi(lintang, 0)
            return <line key={`lt-${lintang}`} x1={0} y1={y} x2={1000} y2={y} className="stroke-slate-800" strokeWidth={1} />
          })}
          {/* equator & prime meridian sedikit lebih terang */}
          <line x1={0} y1={proyeksi(0, 0).y} x2={1000} y2={proyeksi(0, 0).y} className="stroke-slate-700" strokeWidth={1} />
          <line x1={proyeksi(0, 0).x} y1={0} x2={proyeksi(0, 0).x} y2={500} className="stroke-slate-700" strokeWidth={1} />

          {/* garis & titik sinyal */}
          {sinyal.map(function (s) {
            const koor = koordinatNegara[s.domisili]
            const pos = proyeksi(koor.lat, koor.long)
            const cx = (pos.x + posIndonesia.x) / 2
            const cy = Math.min(pos.y, posIndonesia.y) - 60
            const warna = s.skorBaru >= 85 ? "#f87171" : s.node === "global" ? "#38bdf8" : "#c084fc"
            const d = `M ${pos.x} ${pos.y} Q ${cx} ${cy} ${posIndonesia.x} ${posIndonesia.y}`

            return (
              <g key={s.id}>
                <path d={d} className="arc-fade" fill="none" stroke={warna} strokeWidth={1.5} strokeDasharray="4 3" />
                <circle cx={pos.x} cy={pos.y} r={4} fill={warna} className="dot-fade" />
              </g>
            )
          })}

          {/* penanda Indonesia, selalu berdenyut */}
          <circle cx={posIndonesia.x} cy={posIndonesia.y} r={5} fill="#2dd4bf" />
          <circle cx={posIndonesia.x} cy={posIndonesia.y} r={5} fill="none" stroke="#2dd4bf" strokeWidth={1.5} className="pulse-ring" />
          <text x={posIndonesia.x + 10} y={posIndonesia.y + 4} className="fill-teal-300 text-[13px] font-medium">
            Indonesia
          </text>
        </svg>
      </div>

      {/* legenda */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-sky-400" /> Global Signal Node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-purple-400" /> Domestic Enforcement Node
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" /> Red Flag (skor ≥ 85)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-teal-400" /> Indonesia (tujuan)
        </span>
      </div>
    </div>
  )
}