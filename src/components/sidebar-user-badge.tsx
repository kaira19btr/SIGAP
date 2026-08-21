"use client"

type SidebarUserBadgeProps = {
  name: string
  role: string
  colorClass?: string
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function SidebarUserBadge({
  name,
  role,
  colorClass = "bg-teal-600",
}: SidebarUserBadgeProps) {
  return (
    <div className="mt-auto pt-4 border-t border-slate-800">
      <div className="flex items-center gap-3 px-2 py-2">
        <div
          className={`w-9 h-9 rounded-full ${colorClass} flex items-center justify-center text-xs font-semibold text-white shrink-0`}
        >
          {getInitials(name)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate">{name}</p>
          <p className="text-xs text-slate-400 truncate">{role}</p>
        </div>
      </div>
    </div>
  )
}