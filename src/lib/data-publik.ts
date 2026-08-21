import { antrianAwal } from "./data-eskalasi"

export type StatusPublik = "resmi" | "diproses" | "diperiksa"

export type PlatformPublik = {
  id: string
  platform: string
  domisili: string
  status: StatusPublik
  keterangan?: string
}

// Platform yang sudah resmi terdaftar sebagai pemungut PPN PMSE
const platformResmi: PlatformPublik[] = [
  { id: "res-1", platform: "Netflix", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-2", platform: "Spotify", domisili: "Swedia", status: "resmi" },
  { id: "res-3", platform: "Zoom", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-4", platform: "Canva", domisili: "Australia", status: "resmi" },
  { id: "res-5", platform: "Adobe Creative Cloud", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-6", platform: "Microsoft 365", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-7", platform: "Google Workspace", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-8", platform: "Amazon Web Services", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-9", platform: "TikTok", domisili: "Tiongkok", status: "resmi" },
  { id: "res-10", platform: "Disney+ Hotstar", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-11", platform: "LinkedIn Premium", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-12", platform: "Dropbox", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-13", platform: "GitHub", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-14", platform: "Figma", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-15", platform: "Grammarly", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-16", platform: "Steam", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-17", platform: "PlayStation Network", domisili: "Jepang", status: "resmi" },
  { id: "res-18", platform: "Xbox Game Pass", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-19", platform: "Twitch", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-20", platform: "Discord Nitro", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-21", platform: "Coursera", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-22", platform: "Udemy", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-23", platform: "Duolingo Plus", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-24", platform: "Apple Music", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-25", platform: "YouTube Premium", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-26", platform: "WeTV", domisili: "Tiongkok", status: "resmi" },
  { id: "res-27", platform: "Viu", domisili: "Hong Kong", status: "resmi" },
  { id: "res-28", platform: "Bstation", domisili: "Tiongkok", status: "resmi" },
  { id: "res-29", platform: "Trello", domisili: "Amerika Serikat", status: "resmi" },
  { id: "res-30", platform: "Slack", domisili: "Amerika Serikat", status: "resmi" },
]

// Platform dalam pemantauan/eskalasi, diambil dari data internal (dedupe per nama)
function platformDariEskalasi(): PlatformPublik[] {
  const sudahAda = new Set<string>()
  const hasil: PlatformPublik[] = []

  antrianAwal.forEach(function (item) {
    if (sudahAda.has(item.platform)) return
    sudahAda.add(item.platform)

    const status: StatusPublik = item.sisaHari > 5 ? "diproses" : "diperiksa"
    hasil.push({
      id: `esk-pub-${item.id}`,
      platform: item.platform,
      domisili: item.domisili,
      status: status,
    })
  })

  return hasil
}

export const semuaPlatformPublik: PlatformPublik[] = platformResmi.concat(platformDariEskalasi())
export type StatistikPlatform = {
  kontribusiTahunIni: number // dalam Rupiah
  penggunaAktif: number
  kontribusiPerKuartal: { label: string; nilai: number }[]
}

function hashDariId(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) % 100000
  }
  return hash
}

export function statistikPlatform(item: PlatformPublik): StatistikPlatform {
  const basis = hashDariId(item.id)

  const skalaStatus =
    item.status === "resmi" ? 1 : item.status === "diproses" ? 0.4 : 0.15

  const kontribusiTahunIni = Math.round((80_000_000 + (basis % 900) * 1_200_000) * skalaStatus)
  const penggunaAktif = Math.round((15_000 + (basis % 700) * 3_500) * skalaStatus)

  const kuartalLabel = ["Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"]
  const kontribusiPerKuartal = kuartalLabel.map(function (label, i) {
    const variasi = 0.7 + ((basis + i * 137) % 60) / 100
    return {
      label,
      nilai: Math.round((kontribusiTahunIni / 4) * variasi),
    }
  })

  return { kontribusiTahunIni, penggunaAktif, kontribusiPerKuartal }
}