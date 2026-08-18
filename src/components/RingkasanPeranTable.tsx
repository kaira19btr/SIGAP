import { Card } from "@/components/ui/card"
import { ProfilInstitusi } from "@/lib/profil-institusi"

export function RingkasanPeranTable({ profil }: { profil: ProfilInstitusi }) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-800 mb-4">
        Ringkasan Peran {profil.namaInstitusi} dalam SIGAP
      </h3>
      <div className="divide-y divide-slate-100">
        <div className="grid grid-cols-3 gap-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wide">
          <span>Dimensi</span>
          <span className="col-span-2">Peran {profil.namaInstitusi}</span>
        </div>
        {profil.perans.map(function (item) {
          return (
            <div key={item.dimensi} className="grid grid-cols-3 gap-4 py-3">
              <span className="text-sm font-medium text-slate-700">{item.dimensi}</span>
              <span className="col-span-2 text-sm text-slate-600 leading-relaxed">
                {item.deskripsi}
              </span>
            </div>
          )
        })}
      </div>
    </Card>
  )
}