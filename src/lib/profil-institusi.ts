import { Institusi, KasusEskalasi } from "./data-eskalasi"

export type DimensiPeran = "Regulasi" | "Operasional" | "Penindakan" | "Pengawasan"

export type PeranItem = {
  dimensi: DimensiPeran
  deskripsi: string
}

export type ProfilInstitusi = {
  id: string
  namaInstitusi: string
  institusiTerkait: Institusi
  perans: PeranItem[]
}

export const profilInstitusi: ProfilInstitusi[] = [
  {
    id: "bi",
    namaInstitusi: "Bank Indonesia (BI)",
    institusiTerkait: "PSP",
    perans: [
      {
        dimensi: "Regulasi",
        deskripsi: "Menerbitkan aturan wajib bagi Penyedia Jasa Pembayaran (PJP) untuk integrasi API SIGAP.",
      },
      {
        dimensi: "Operasional",
        deskripsi: "Mengawasi pemotongan PPN otomatis pada saluran Payment Gateway dan Kartu Kredit.",
      },
      {
        dimensi: "Penindakan",
        deskripsi: "Menginstruksikan pembekuan/pembatasan rute pemrosesan transaksi bagi entitas Red Flag.",
      },
      {
        dimensi: "Pengawasan",
        deskripsi: "Memantau Lalulintas Devisa (LLD) cross-border untuk memvalidasi omzet platform asing.",
      },
    ],
  },
  // nanti tinggal nambah object baru di sini kalau mau isi Kominfo, App Store, dst
]

export function cariProfil(id: string): ProfilInstitusi | undefined {
  return profilInstitusi.find(function (p) {
    return p.id === id
  })
}

export function profilUntukInstitusi(institusi: Institusi): ProfilInstitusi[] {
  return profilInstitusi.filter(function (p) {
    return p.institusiTerkait === institusi
  })
}

export function peranBiUntukKasus(item: KasusEskalasi): PeranItem[] {
  return [
    {
      dimensi: "Regulasi",
      deskripsi: `Transaksi ${item.platform} wajib diproses lewat PJP yang sudah terintegrasi API SIGAP — dalam kasus ini terdeteksi lewat ${item.detailTambahan}, sesuai kewajiban integrasi yang diterbitkan BI bagi seluruh Penyedia Jasa Pembayaran.`,
    },
    {
      dimensi: "Operasional",
      deskripsi: `BI mengawasi pemotongan PPN otomatis atas transaksi ${item.platform} pada saluran tersebut, dengan estimasi gap PPN yang belum tergarap mencapai ${item.estimasiGap}.`,
    },
    {
      dimensi: "Penindakan",
      deskripsi: `Confidence score ${item.confidenceScore} dari RADAR PMSE menjadi dasar BI menginstruksikan PSP untuk membekukan/membatasi rute pemrosesan transaksi ${item.platform} sebagai entitas Red Flag, sampai kewajiban pendaftarannya selesai.`,
    },
  ]
}

export function peranBiUntukKasusKartu(item: KasusEskalasi): PeranItem[] {
  return [
    {
      dimensi: "Pengawasan",
      deskripsi: `BI memantau Lalulintas Devisa (LLD) cross-border atas transaksi ${item.platform} yang diproses lewat ${item.detailTambahan}, untuk memvalidasi omzet platform asing ini di luar jalur PSP domestik.`,
    },
    {
      dimensi: "Operasional",
      deskripsi: `Sinyal dari ${item.sumberSinyal} menunjukkan confidence score ${item.confidenceScore} dengan estimasi gap PPN ${item.estimasiGap} — data ini menjadi bahan RADAR PMSE karena jalur kartu internasional belum punya mekanisme escrow seperti PSP domestik.`,
    },
  ]
}