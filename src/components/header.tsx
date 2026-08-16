"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"

type HeaderProps = {
  roleLabel: string
  orgLabel?: string
  onLogout?: () => void
  logoutLabel?: string
}

const TAGLINE = "Sistem Identifikasi Gap dan Antisipasi PMSE"

type Phase = "typing" | "pausing" | "dissolving" | "waiting"

export function Header({ roleLabel, orgLabel, onLogout, logoutLabel = "Keluar" }: HeaderProps) {
  const [charCount, setCharCount] = useState(0)
  const [phase, setPhase] = useState<Phase>("typing")

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (phase === "typing") {
      if (charCount < TAGLINE.length) {
        timeoutId = setTimeout(() => setCharCount((c) => c + 1), 45)
      } else {
        timeoutId = setTimeout(() => setPhase("dissolving"), 1800)
      }
    } else if (phase === "dissolving") {
      const dissolveDuration = 600 + TAGLINE.length * 15
      timeoutId = setTimeout(() => {
        setCharCount(0)
        setPhase("waiting")
      }, dissolveDuration)
    } else if (phase === "waiting") {
      timeoutId = setTimeout(() => setPhase("typing"), 500)
    }

    return () => clearTimeout(timeoutId)
  }, [phase, charCount])

  return (
    <div className="relative bg-[#0B1739]">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-teal-400 via-cyan-400 to-amber-400" />

      <div className="flex items-center justify-between px-8 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-xl font-extrabold tracking-tight text-white">
              SI
            </span>
            <div className="relative w-7 h-7 mx-0.5 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden shrink-0">
              <Globe className="absolute w-5 h-5 text-white/40 animate-spin [animation-duration:6s]" />
              <span className="relative text-white font-bold text-sm leading-none">
                G
              </span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              AP
            </span>
          </div>

          <div className="hidden sm:block h-8 w-px bg-white/10" />

          <p className="hidden sm:flex text-xs text-slate-400 leading-tight min-w-[240px]">
            {phase !== "dissolving" ? (
              <>
                {TAGLINE.slice(0, charCount)}
                {phase === "typing" && <span className="animate-blink">|</span>}
              </>
            ) : (
              TAGLINE.split("").map((char, i) => {
                const dx = (Math.random() - 0.5) * 40
                const dy = -Math.random() * 20 - 5
                return (
                  <span
                    key={i}
                    className="inline-block animate-dust"
                    style={
                      {
                        animationDelay: `${i * 15}ms`,
                        "--dx": `${dx}px`,
                        "--dy": `${dy}px`,
                      } as React.CSSProperties
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                )
              })
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {orgLabel && (
            <span className="text-xs font-medium text-slate-300">
              {orgLabel}
            </span>
          )}

          <span className="flex items-center gap-2 text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            {roleLabel}
          </span>

          <button
            onClick={onLogout}
            className="text-xs font-semibold bg-white text-slate-800 px-4 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            {logoutLabel}
          </button>
        </div>
      </div>
    </div>
  )
}