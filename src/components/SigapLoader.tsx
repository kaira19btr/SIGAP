"use client"

export default function SigapLoader({ light = false }: { light?: boolean }) {
  const dotColor = light ? "bg-white" : "bg-teal-600"
  const ringColor = light ? "border-white/40" : "border-teal-600/40"

  return (
    <span className="relative inline-flex w-3.5 h-3.5 items-center justify-center">
      <span
        className={`absolute inline-flex w-full h-full rounded-full border ${ringColor} animate-ping`}
      />
      <span className={`relative inline-flex w-1.5 h-1.5 rounded-full ${dotColor}`} />
    </span>
  )
}