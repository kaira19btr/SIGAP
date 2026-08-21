"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Flame, MessageCircle, ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
interface PlatformTren {
  nama: string;
  domisili: string;
  platformSosial: string;
  skorTren: number;
  jumlahMention: string;
  ringkasan: string;
  terakhirDipantau: string;
}

const dataTren: PlatformTren[] = [
  {
    nama: "Character.AI",
    domisili: "Amerika Serikat",
    platformSosial: "TikTok",
    skorTren: 92,
    jumlahMention: "48.2K mention/7 hari",
    ringkasan: "Viral di kalangan remaja lewat challenge roleplay AI, lonjakan unduhan signifikan.",
    terakhirDipantau: "20 Agu 2026",
  },
  {
    nama: "Kling AI",
    domisili: "China",
    platformSosial: "Twitter/X",
    skorTren: 87,
    jumlahMention: "31.5K mention/7 hari",
    ringkasan: "Ramai dibahas kreator konten karena fitur video generatif barunya.",
    terakhirDipantau: "19 Agu 2026",
  },
  {
    nama: "Udio",
    domisili: "Amerika Serikat",
    platformSosial: "Instagram",
    skorTren: 74,
    jumlahMention: "15.8K mention/7 hari",
    ringkasan: "Naik daun di kalangan musisi indie lokal untuk membuat lagu AI.",
    terakhirDipantau: "18 Agu 2026",
  },
];

function warnaSkor(skor: number) {
  if (skor >= 85) return "text-red-500 bg-red-50";
  if (skor >= 60) return "text-orange-500 bg-orange-50";
  return "text-yellow-600 bg-yellow-50";
}

export default function TrenMediaSosialPage() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const hasil = dataTren.filter((p) =>
    p.nama.toLowerCase().includes(query.toLowerCase())
  );

  const toggleExpand = (nama: string) => {
    setExpanded((prev) => (prev === nama ? null : nama));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-1 flex items-center gap-2">
        <Flame className="w-6 h-6 text-orange-500" />
        Tren Media Sosial
      </h1>
      <p className="text-gray-500 mb-6">
        Platform asing yang sedang viral di media sosial, dipantau sebagai sinyal tambahan investigasi kepatuhan.
      </p>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari nama platform..."
        className="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      />

      <div className="space-y-4">
        {hasil.map((p) => {
          const isOpen = expanded === p.nama;
          return (
            <div key={p.nama} className="bg-white border rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleExpand(p.nama)}
                className="w-full text-left p-6 flex items-start justify-between"
              >
                <div>
                  <h3 className="font-semibold text-lg">
                    {p.nama} <span className="text-gray-400 font-normal">· {p.domisili}</span>
                  </h3>
                  <span className="inline-flex items-center gap-1 mt-1 text-xs bg-gray-100 rounded-full px-3 py-1">
                    <MessageCircle className="w-3 h-3" /> {p.platformSosial}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${warnaSkor(p.skorTren)}`}>
                    <TrendingUp className="w-4 h-4" />
                    {p.skorTren}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>


              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 mb-2">{p.ringkasan}</p>
                  <div className="flex justify-between text-sm text-gray-400 border-t pt-3 mt-3 mb-4">
                    <span>{p.jumlahMention}</span>
                    <span>Dipantau: {p.terakhirDipantau}</span>
                  </div>
                  <Link
                    href="/djp/simulasi-deteksi"
                    className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Simulasi Deteksi
                  </Link>
                </div>
              )}
            </div>
          );
        })}

        {hasil.length === 0 && (
          <p className="text-gray-400 text-center py-10">Platform tidak ditemukan.</p>
        )}
      </div>
    </div>
  );
}