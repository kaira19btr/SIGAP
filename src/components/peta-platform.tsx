"use client"

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import L from "leaflet"
import type { Platform } from "@/lib/mock-data"

const koordinatNegara: Record<string, [number, number]> = {
  "Tiongkok": [35.8617, 104.1954],
  "Amerika Serikat": [37.0902, -95.7129],
  "Singapura": [1.3521, 103.8198],
  "Jepang": [36.2048, 138.2529],
  "Korea Selatan": [35.9078, 127.7669],
  "Taiwan": [23.6978, 120.9605],
  "Kanada": [56.1304, -106.3468],
  "Jerman": [51.1657, 10.4515],
  "Prancis": [46.2276, 2.2137],
  "India": [20.5937, 78.9629],
  "Belanda": [52.1326, 5.2913],
}

const simpulPusat: [number, number] = [1.29, 103.85]

function getWarnaStatus(status: string) {
  switch (status) {
    case "Red Flag":
      return "#dc2626"
    case "SKD":
      return "#16a34a"
    case "Pemungut Resmi":
      return "#0d9488"
    case "Belum Terdaftar":
      return "#94a3b8"
    default:
      return "#94a3b8"
  }
}

function buatIkonMarker(warna: string, berkedip: boolean) {
  return L.divIcon({
    className: "",
    html: `
      <div style="position: relative; width: 12px; height: 12px;">
        ${berkedip ? `
          <span style="
            position: absolute; inset: 0; border-radius: 9999px;
            background: ${warna}; opacity: 0.6;
            animation: pulse-marker 1.5s ease-out infinite;
          "></span>
        ` : ""}
        <span style="
          position: absolute; inset: 3px; border-radius: 9999px;
          background: ${warna}; border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        "></span>
      </div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

export default function PetaPlatform({ platforms }: { platforms: Platform[] }) {
  return (
    <>
      <style>{`
        @keyframes pulse-marker {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>

      <MapContainer
        center={[15, 100]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap &copy; CARTO'
        />

        {platforms.map((p) => {
          const koordinat = koordinatNegara[p.domisili]
          if (!koordinat) return null
          return (
            <Polyline
              key={`garis-${p.id}`}
              positions={[koordinat, simpulPusat]}
              pathOptions={{
                color: "#818cf8",
                weight: 1.5,
                dashArray: "4 6",
                opacity: 0.6,
              }}
            />
          )
        })}

        {platforms.map((p) => {
          const koordinat = koordinatNegara[p.domisili]
          if (!koordinat) return null
          const warna = getWarnaStatus(p.status)
          const berkedip = p.status === "Red Flag"
          return (
            <Marker key={p.id} position={koordinat} icon={buatIkonMarker(warna, berkedip)}>
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{p.nama}</p>
                  <p className="text-slate-500">{p.domisili}</p>
                  <p className="mt-1">{p.status}</p>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </>
  )
}