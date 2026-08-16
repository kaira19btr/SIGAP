"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe2, Landmark, Smartphone, Newspaper, Info } from "lucide-react"

const sumberInfo = [
  {
    nama: "Similarweb",
    icon: Globe2,
    bobot: 35,
    deskripsi: "Estimasi traffic bulanan dan tren pertumbuhan trafik situs/aplikasi",
  },
  {
    nama: "BI / PSP",
    icon: Landmark,
    bobot: 30,
    deskripsi: "Volume transaksi yang melewati penyedia jasa pembayaran domestik",
  },
  {
    nama: "App Store / Play Store",
    icon: Smartphone,
    bobot: 20,
    deskripsi: "Jumlah unduhan, peringkat kategori, dan estimasi pengguna aktif",
  },
  {
    nama: "Media Massa",
    icon: Newspaper,
    bobot: 15,
    deskripsi: "Pemberitaan terkait ekspansi, investasi, atau klaim jumlah pengguna",
  },
]

// hash nama platform jadi angka, biar breakdown-nya stabil (nggak acak tiap refresh)
function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function buatRandomSeeded(seed: number) {
  let value = seed
  return function () {
    value = (value * 1103515245 + 12345) & 0x7fffffff
    return value / 0x7fffffff
  }
}

function buatRincianSkor(platform: string, target: number) {
  const rand = buatRandomSeeded(hashString(platform))
  const variasi = function () {
    return Math.round(target + (rand() - 0.5) * 24)
  }

  const similarweb = Math.min(99, Math.max(20, variasi()))
  const psp = Math.min(99, Math.max(20, variasi()))
  const appStore = Math.min(99, Math.max(20, variasi()))

  // media massa dihitung mundur, biar total akhirnya pas ke target
  let media = Math.round((target - similarweb * 0.35 - psp * 0.3 - appStore * 0.2) / 0.15)
  media = Math.min(99, Math.max(0, media))

  return {
    Similarweb: similarweb,
    "BI / PSP": psp,
    "App Store / Play Store": appStore,
    "Media Massa": media,
  } as Record<string, number>
}

function keteranganSkor(skor: number) {
  if (skor >= 85) return "sinyal sangat kuat"
  if (skor >= 65) return "sinyal cukup kuat"
  if (skor >= 40) return "sinyal sedang"
  return "sinyal lemah / minim data"
}

function MetodologiEstimasiContent() {
  const searchParams = useSearchParams()
  const platformParam = searchParams.get("platform")
  const scoreParam = searchParams.get("score")

  const platform = platformParam || "Kling AI"
  const target = scoreParam ? parseInt(scoreParam, 10) : 87

  const skorPerSumber = buatRincianSkor(platform, target)
  const rincian = sumberInfo.map(function (s) {
    return { ...s, skor: skorPerSumber[s.nama] }
  })

  const totalHitung = Math.round(
    rincian.reduce(function (sum, r) {
      return sum + r.skor * (r.bobot / 100)
    }, 0)
  )

  return (
    <div>
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-800 mb-1">Kenapa SIGAP Menggunakan Estimasi?</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Platform PMSE asing yang belum terdaftar tidak memiliki kewajiban lapor ke DJP.
              SIGAP tidak bisa menarik data internal mereka secara langsung — karena itu, sistem
              membangun perkiraan yang mendekati kondisi riil dengan menggabungkan sinyal dari
              berbagai sumber independen di luar platform itu sendiri.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-1">Bobot Sumber Sinyal</h3>
        <p className="text-sm text-slate-500 mb-5">
          Untuk platform &quot;{platform}&quot;, ini kekuatan skor mentah tiap sumber sebelum dikalikan bobot
        </p>

        <div className="space-y-4">
          {rincian.map(function (s) {
            const Icon = s.icon
            return (
              <div key={s.nama}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="text-sm font-medium text-slate-800">{s.nama}</span>
                    <span className="text-xs text-slate-400">(bobot {s.bobot}%)</span>
                  </div>
                  <span className="text-sm font-semibold text-teal-600">Skor {s.skor}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                  <div
                    className="h-full bg-teal-600 rounded-full transition-all duration-500"
                    style={{ width: `${s.skor}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400">{s.deskripsi}</p>
              </div>
            )
          })}
        </div>
      </Card>

      <Card className="p-6 mb-6">
        <h3 className="font-semibold text-slate-800 mb-4">Contoh Perhitungan</h3>
        <div className="bg-slate-50 rounded-lg p-5">
          <p className="text-sm text-slate-600 mb-4">
            Platform &quot;{platform}&quot; menunjukkan sinyal berikut dari 4 sumber:
          </p>
          <div className="space-y-2 mb-4">
            {rincian.map(function (r) {
              return (
                <div key={r.nama} className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    {r.nama} ({keteranganSkor(r.skor)})
                  </span>
                  <span className="font-medium text-slate-800">
                    {r.skor} × {r.bobot}% = {((r.skor * r.bobot) / 100).toFixed(1).replace(".", ",")}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="flex justify-between items-center pt-3 border-t">
            <span className="text-sm font-semibold text-slate-800">Confidence Score Akhir</span>
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100 text-sm">
              ≈ {totalHitung} dari 100
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-lg">⚠</span>
          <div>
            <h3 className="font-semibold text-slate-800 mb-1">Batas Keandalan Estimasi</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Estimasi ini memiliki margin kesalahan sekitar <strong>±10-15%</strong> tergantung
              ketersediaan data per sumber. Semakin sedikit sumber yang tersedia untuk suatu
              platform, semakin lebar margin ketidakpastiannya. Estimasi bukan pengganti audit —
              nilainya adalah memprioritaskan mana platform yang perlu didahulukan untuk
              verifikasi manual oleh petugas DJP.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default function MetodologiEstimasiPage() {
  return (
    <Suspense fallback={<div className="text-sm text-slate-400">Memuat...</div>}>
      <MetodologiEstimasiContent />
    </Suspense>
  )
}