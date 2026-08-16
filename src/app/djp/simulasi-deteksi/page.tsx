"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import AnimatedNumber from "@/components/AnimatedNumber"
import {
  Check,
  Building2,
  Landmark,
  Smartphone,
  Newspaper,
  Globe2,
  Sparkles,
  TrendingUp,
  Calendar,
} from "lucide-react"

const stepLabels = ["Pemicu", "Agregasi", "Rekonsiliasi", "Red Flag", "Eskalasi"]

const sumberSinyal = [
  { nama: "Similarweb", icon: Globe2, status: "Tersambung", anomali: false },
  { nama: "BI / PSP", icon: Landmark, status: "Tersambung", anomali: false },
  { nama: "App Store / Play Store", icon: Smartphone, status: "Tersambung", anomali: false },
  { nama: "Media Massa", icon: Newspaper, status: "Tersambung", anomali: false },
  { nama: "AEOI / CRS", icon: Building2, status: "1 anomali", anomali: true },
]

const AMBANG_TRANSAKSI = 600_000_000 // Rp600 juta
const AMBANG_TRAFFIC = 12_000 // per tahun

const presetPlatform = [
  { nama: "Kling AI", transaksi: "380000000", traffic: "9000", pertumbuhan: "15" },
  { nama: "Nova AI", transaksi: "120000000", traffic: "3000", pertumbuhan: "40" },
  { nama: "DeepMind Chat", transaksi: "60000000", traffic: "1500", pertumbuhan: "20" },
  { nama: "EchoVoice AI", transaksi: "200000000", traffic: "5000", pertumbuhan: "10" },
  { nama: "PixelDream AI", transaksi: "50000000", traffic: "1200", pertumbuhan: "55" },
]

type Proyeksi = {
  bulan: number
  transaksi: number
  traffic: number
}

function hitungProyeksi(
  transaksiAwal: number,
  trafficAwal: number,
  pertumbuhanBulanan: number
): { data: Proyeksi[]; bulanTercapai: number | null } {
  const data: Proyeksi[] = []
  let transaksi = transaksiAwal
  let traffic = trafficAwal
  let bulanTercapai: number | null = null

  for (let bulan = 0; bulan <= 24; bulan++) {
    data.push({ bulan, transaksi, traffic })
    if (
      bulanTercapai === null &&
      (transaksi >= AMBANG_TRANSAKSI || traffic >= AMBANG_TRAFFIC)
    ) {
      bulanTercapai = bulan
    }
    transaksi = transaksi * (1 + pertumbuhanBulanan / 100)
    traffic = traffic * (1 + pertumbuhanBulanan / 100)
  }

  return { data, bulanTercapai }
}

function formatRupiah(n: number) {
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(2)} M`
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(0)} Jt`
  return `Rp${n.toLocaleString("id-ID")}`
}

export default function SimulasiDeteksiPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const isLast = currentStep === stepLabels.length - 1

  // ==== State untuk kalkulator estimasi platform baru ====
  const [namaPlatform, setNamaPlatform] = useState("")
  const [transaksiAwal, setTransaksiAwal] = useState("150000000")
  const [trafficAwal, setTrafficAwal] = useState("4000")
  const [pertumbuhan, setPertumbuhan] = useState("35")
  const [hasilTampil, setHasilTampil] = useState(false)
  const [hitungKe, setHitungKe] = useState(0)

  const terapkanPreset = (preset: (typeof presetPlatform)[number]) => {
    setNamaPlatform(preset.nama)
    setTransaksiAwal(preset.transaksi)
    setTrafficAwal(preset.traffic)
    setPertumbuhan(preset.pertumbuhan)
    setHasilTampil(true)
    setHitungKe((k) => k + 1)
  }

  const transaksiNum = Number(transaksiAwal) || 0
  const trafficNum = Number(trafficAwal) || 0
  const pertumbuhanNum = Number(pertumbuhan) || 0

  const { data, bulanTercapai } = useMemo(
    () => hitungProyeksi(transaksiNum, trafficNum, pertumbuhanNum),
    [transaksiNum, trafficNum, pertumbuhanNum]
  )

  const maxTransaksi = Math.max(...data.map((d) => d.transaksi), AMBANG_TRANSAKSI)

  const handleHitung = (e: React.FormEvent) => {
    e.preventDefault()
    setHasilTampil(true)
    setHitungKe((k) => k + 1)
  }

  const confidenceScore = bulanTercapai !== null
    ? Math.max(20, Math.min(96, 96 - bulanTercapai * 3))
    : 15

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">
        Simulasi Deteksi Kepatuhan
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Ilustrasi langkah demi langkah bagaimana SIGAP mengubah sinyal mentah lintas sumber menjadi temuan kepatuhan yang bisa ditindaklanjuti.
      </p>

      {/* ===================================================== */}
      {/* SECTION BARU: Kalkulator Estimasi Platform Baru        */}
      {/* ===================================================== */}
      <Card className="p-6 mb-8 border-teal-200 bg-gradient-to-br from-teal-50/50 to-white">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">
            Estimasi Prediktif
          </p>
        </div>
        <h2 className="text-lg font-bold text-slate-800 mb-1">
          Kapan Platform AI Baru Ini Mencapai Ambang Batas?
        </h2>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          Masukkan estimasi kondisi platform AI generatif yang baru viral, dan RADAR PMSE akan
          memproyeksikan kapan ia diperkirakan melewati ambang batas Rp600 juta transaksi atau
          12.000 traffic per tahun — sebelum data resmi lengkap tersedia.
        </p>

        <div className="mb-5">
          <p className="text-xs font-medium text-slate-500 mb-2">
            Coba dengan contoh platform, atau isi manual di bawah:
          </p>
          <div className="flex flex-wrap gap-2">
            {presetPlatform.map((p) => (
              <button
                key={p.nama}
                type="button"
                onClick={() => terapkanPreset(p)}
                className={`text-xs font-medium border px-3 py-1.5 rounded-full transition-colors ${
                  namaPlatform === p.nama
                    ? "bg-teal-600 border-teal-600 text-white"
                    : "bg-white border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700"
                }`}
              >
                {p.nama}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleHitung} className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
          <div className="sm:col-span-1">
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Nama Platform
            </label>
            <Input
              value={namaPlatform}
              onChange={(e) => setNamaPlatform(e.target.value)}
              placeholder="Contoh: Nova AI"
              className="bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Estimasi Transaksi Saat Ini (Rp/tahun)
            </label>
            <Input
              type="number"
              value={transaksiAwal}
              onChange={(e) => setTransaksiAwal(e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Estimasi Traffic Saat Ini (/tahun)
            </label>
            <Input
              type="number"
              value={trafficAwal}
              onChange={(e) => setTrafficAwal(e.target.value)}
              className="bg-white"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600 mb-1.5 block">
              Laju Pertumbuhan (%/bulan)
            </label>
            <Input
              type="number"
              value={pertumbuhan}
              onChange={(e) => setPertumbuhan(e.target.value)}
              className="bg-white"
            />
          </div>
          <div className="sm:col-span-4">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Hitung Estimasi →
            </Button>
          </div>
        </form>

        {hasilTampil && (
          <div className="mt-6 pt-6 border-t border-teal-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Estimasi Waktu
                  </p>
                </div>
                {bulanTercapai !== null ? (
                  <>
                    <p className="text-2xl font-bold text-slate-800">
                      {bulanTercapai === 0 ? (
                        "Sudah Terlampaui"
                      ) : (
                        <>
                          <AnimatedNumber value={bulanTercapai} trigger={hitungKe} /> Bulan
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {bulanTercapai === 0
                        ? "Ambang batas sudah terlampaui saat ini"
                        : "dari sekarang, hingga ambang batas terlampaui"}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-slate-400">&gt; 24 Bulan</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Belum diperkirakan tercapai dalam 2 tahun ke depan
                    </p>
                  </>
                )}
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Confidence Score
                  </p>
                </div>
                <p className="text-2xl font-bold text-slate-800">
                  <AnimatedNumber value={confidenceScore} trigger={hitungKe} />
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Skor keyakinan sistem atas proyeksi ini
                </p>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    Rekomendasi
                  </p>
                </div>
                <p
                  className={`text-sm font-bold ${
                    bulanTercapai !== null && bulanTercapai <= 6
                      ? "text-red-600"
                      : bulanTercapai !== null && bulanTercapai <= 12
                      ? "text-amber-600"
                      : "text-slate-500"
                  }`}
                >
                  {bulanTercapai !== null && bulanTercapai <= 6
                    ? "Prioritaskan Investigasi"
                    : bulanTercapai !== null && bulanTercapai <= 12
                    ? "Pantau Berkala"
                    : "Belum Perlu Tindakan"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {namaPlatform || "Platform ini"} masuk daftar pemantauan
                </p>
              </div>
            </div>

            {/* Grafik proyeksi sederhana pakai SVG bar chart */}
            <div className="bg-white rounded-lg border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-600 mb-4">
                Proyeksi Pertumbuhan Estimasi Transaksi — 24 Bulan ke Depan
              </p>
              <div className="flex items-end gap-1 h-40">
                {data.map((d) => {
                  const heightPct = Math.min(100, (d.transaksi / maxTransaksi) * 100)
                  const tercapai = d.transaksi >= AMBANG_TRANSAKSI || d.traffic >= AMBANG_TRAFFIC
                  return (
                    <div
                      key={d.bulan}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative"
                    >
                      <div
                        className={`w-full rounded-t transition-all ${
                          tercapai ? "bg-red-400" : "bg-teal-400"
                        } group-hover:opacity-80`}
                        style={{ height: `${heightPct}%` }}
                      />
                      <div className="absolute -top-8 hidden group-hover:block bg-slate-900 text-white text-[10px] rounded px-2 py-1 whitespace-nowrap z-10">
                        Bulan {d.bulan}: {formatRupiah(d.transaksi)}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-2">
                <span>Bulan 0</span>
                <span>Bulan 12</span>
                <span>Bulan 24</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-teal-400 inline-block" />
                  Di bawah ambang batas
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" />
                  Melewati ambang batas (Rp600 Jt / 12.000 traffic)
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Contoh Kasus Terverifikasi
        </p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* Stepper */}
      <div className="flex items-center mb-8">
        {stepLabels.map((label, index) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  index < currentStep
                    ? "bg-teal-600 text-white"
                    : index === currentStep
                    ? "bg-slate-900 text-white ring-4 ring-slate-200"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  index <= currentStep ? "text-slate-700 font-medium" : "text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
            {index < stepLabels.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 transition-colors ${
                  index < currentStep ? "bg-teal-600" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ===== Langkah 1: Pemicu ===== */}
      {currentStep === 0 && (
        <Card className="p-6 mb-6">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Langkah 1 dari 5
          </p>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            01 · Sinyal Aktivitas Terdeteksi
          </h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Sistem menangkap lonjakan traffic dan estimasi transaksi dari platform &quot;Kling AI&quot; melalui Similarweb dan data App Store — belum ada kewajiban apapun pada tahap ini, murni sinyal mentah.
          </p>
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3">
            <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-100">
              Kling AI · Tiongkok
            </Badge>
            <span className="text-slate-300">→</span>
            <div>
              <p className="text-xs text-slate-400">Sumber Sinyal</p>
              <p className="text-sm font-semibold text-slate-800">Traffic naik 340% dalam 3 bulan</p>
            </div>
          </div>
        </Card>
      )}

      {/* ===== Langkah 2: Agregasi ===== */}
      {currentStep === 1 && (
        <Card className="p-6 mb-6">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Langkah 2 dari 5
          </p>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            02 · Agregasi Sinyal Lintas Sumber
          </h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Dalam hitungan detik, SIGAP menarik data dari lima sumber sinyal secara paralel — tanpa mengambil data internal platform, murni dari jejak publik dan mitra data.
          </p>
          <div className="grid grid-cols-5 gap-3">
            {sumberSinyal.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.nama}
                  className={`rounded-lg p-4 text-center border ${
                    s.anomali ? "bg-red-50 border-red-200" : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${s.anomali ? "text-red-500" : "text-slate-500"}`} />
                  <p className="text-xs font-semibold text-slate-800">{s.nama}</p>
                  <p className={`text-xs mt-2 ${s.anomali ? "text-red-600" : "text-green-600"}`}>
                    {s.anomali ? "⚑ " : "✓ "}
                    {s.status}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* ===== Langkah 3: Rekonsiliasi ===== */}
      {currentStep === 2 && (
        <Card className="p-6 mb-6">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Langkah 3 dari 5
          </p>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            03 · Rekonsiliasi & Kalkulasi Gap
          </h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Estimasi transaksi yang dilaporkan platform (self-assessment) disandingkan dengan estimasi hasil agregasi sinyal. Selisihnya dihitung otomatis oleh sistem.
          </p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600">Estimasi Dilaporkan Platform</span>
                <span className="font-semibold text-slate-800">Rp250 Juta</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-800 rounded-full" style={{ width: "35%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-slate-600">Estimasi Hasil Agregasi Sinyal</span>
                <span className="font-semibold text-red-600">Rp750 Juta</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "100%" }} />
              </div>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            <span className="text-red-600">⚠</span>
            <p className="text-sm font-semibold text-red-700">
              Gap Terdeteksi — Rp500 Juta
            </p>
          </div>
        </Card>
      )}

      {/* ===== Langkah 4: Red Flag ===== */}
      {currentStep === 3 && (
        <Card className="p-6 mb-6">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Langkah 4 dari 5
          </p>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            04 · Deteksi Anomali & Pemicu Red Flag
          </h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Karena gap Rp500 Juta melampaui ambang batas materialitas (Rp600 Juta transaksi atau 12.000 traffic), sistem otomatis memicu red flag.
          </p>

          <div className="flex items-start justify-between bg-slate-50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <Globe2 className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-semibold text-sm text-slate-800">
                  Kling AI — Tiongkok
                </p>
                <p className="text-sm text-slate-600 mt-0.5">
                  Traffic 15.000/tahun dan estimasi transaksi Rp750 Juta terdeteksi lewat Similarweb & App Store, belum ada SKD maupun surat penunjukan.
                </p>
                <p className="text-xs text-slate-400 mt-1.5">
                  Ambang batas materialitas: Rp600 Juta · Status:{" "}
                  <span className="text-red-600 font-semibold">RED FLAG AKTIF</span>
                </p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-600 hover:bg-red-100 shrink-0">
              Notifikasi Disarankan
            </Badge>
          </div>
        </Card>
      )}

      {/* ===== Langkah 5: Eskalasi ===== */}
      {currentStep === 4 && (
        <Card className="p-6 mb-6">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-2">
            Langkah 5 dari 5
          </p>
          <h2 className="text-xl font-bold text-slate-800 mb-3">
            05 · Eskalasi & Tindak Lanjut
          </h2>
          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            SIGAP merekomendasikan pengiriman Notifikasi Resmi dan mencatat seluruh proses ini secara permanen di Jejak Audit. Kasus dapat ditindaklanjuti hingga verifikasi manual dan penerbitan SKD.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-700 mb-1">✓ Notifikasi Resmi Direkomendasikan</p>
              <p className="text-xs text-green-600">
                Surat pemberitahuan otomatis disiapkan sistem untuk dikirim ke platform
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm font-semibold text-green-700 mb-1">✓ Tercatat di Jejak Audit</p>
              <p className="text-xs text-green-600">
                Seluruh proses deteksi tersimpan permanen, tidak bisa diubah siapa pun
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">Buka Jejak Audit →</Button>
            <Button className="bg-slate-900 hover:bg-slate-800">
              Lihat Profil Lengkap →
            </Button>
          </div>
        </Card>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
        >
          ← Sebelumnya
        </Button>

        {!isLast ? (
          <Button onClick={() => setCurrentStep((s) => Math.min(stepLabels.length - 1, s + 1))}>
            Lanjutkan Investigasi →
          </Button>
        ) : (
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={() => setCurrentStep(0)}
          >
            Selesai — Kembali ke Ringkasan
          </Button>
        )}
      </div>
    </div>
  )
}