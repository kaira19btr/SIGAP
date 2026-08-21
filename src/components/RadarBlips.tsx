"use client"

import { antrianAwal } from "@/lib/data-eskalasi"

const warnaInstitusi: Record<string, string> = {
  Kominfo: "bg-teal-400",
  "App Store / Play Store": "bg-indigo-400",
  PSP: "bg-blue-400",
  "Jaringan Kartu Internasional": "bg-sky-400",
  "Platform Iklan Digital": "bg-fuchsia-400",
}

const jumlahBlip = 8
const sudutBlip = [15, 70, 110, 160, 200, 250, 300, 340]
const radiusBlip = [160, 220, 190, 250, 175, 230, 200, 260]
const delayBlip = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5]

export function RadarBlips() {
  const platforms = antrianAwal
    .slice()
    .sort(function (a, b) {
      return b.confidenceScore - a.confidenceScore
    })
    .slice(0, jumlahBlip)

  return (
    <div className="absolute w-[600px] h-[600px] pointer-events-none">
      {platforms.map(function (item, index) {
        const sudut = (sudutBlip[index] * Math.PI) / 180
        const radius = radiusBlip[index]
        const x = radius * Math.cos(sudut)
        const y = radius * Math.sin(sudut)
        const warna = warnaInstitusi[item.institusi] ?? "bg-teal-400"

        return (
          <div
            key={item.id}
            className="radar-dot absolute top-1/2 left-1/2 flex flex-col items-center"
            style={
              {
                "--x": `${x}px`,
                "--y": `${y}px`,
                animationDelay: `${delayBlip[index]}s`,
              } as React.CSSProperties
            }
          >
            <div className={`w-2 h-2 rounded-full ${warna} shadow-[0_0_10px_3px_rgba(45,212,191,0.5)]`} />
            <span className="radar-label mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-black/70 text-white whitespace-nowrap">
              {item.platform}
            </span>
          </div>
        )
      })}

      <style jsx>{`
        .radar-dot {
          animation: radarSpread 4s ease-out infinite;
        }
        .radar-label {
          animation: radarLabelFade 4s ease-out infinite;
        }
        @keyframes radarSpread {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          65% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--x)), calc(-50% + var(--y))) scale(1);
            opacity: 0;
          }
        }
        @keyframes radarLabelFade {
          0%,
          55% {
            opacity: 0;
          }
          65%,
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}