"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Building2, Network, Lock, IdCard, KeyRound, Globe, CheckCircle2, Loader2, Landmark, Smartphone, CreditCard, Megaphone, Users } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";

const roles = [
  { id: "djp", name: "Otoritas Negara (DJP)", nameEn: "State Authority (DJP)", icon: Shield, href: "/djp/dashboard" },
  { id: "mitra", name: "Mitra Platform", nameEn: "Platform Partner", icon: Building2, href: "/mitra/dashboard" },
  { id: "gateway", name: "Gateway", nameEn: "Gateway", icon: Network, href: "/gateway/antrian-tindak-lanjut" },
  { id: "portal-publik", name: "Portal Publik", nameEn: "Public Portal", icon: Users, href: "/portal-publik" },
];

const contohPlatform = [
  "Kling AI",
  "OpenAI (ChatGPT)",
  "DeepSeek",
  "Perplexity AI",
  "Midjourney",
];

const daftarInstitusi = [
  { id: "kominfo", name: "Kominfo", icon: Globe },
  { id: "appstore", name: "App Store / Play Store", icon: Smartphone },
  { id: "psp", name: "PSP", icon: Landmark },
  { id: "kartu", name: "Jaringan Kartu Internasional", icon: CreditCard },
  { id: "iklan", name: "Platform Iklan Digital", icon: Megaphone },
];

type Stage = "idle" | "verifying" | "verified" | "activating" | "exiting";

export default function LoginPage() {
  const router = useRouter();
  const [selected, setSelected] = useState(roles[0]);
  const [platformName, setPlatformName] = useState("");
  const [platformError, setPlatformError] = useState(false);
  const [institusi, setInstitusi] = useState(daftarInstitusi[0]);
  const [stage, setStage] = useState<Stage>("idle");

  const isMitra = selected.id === "mitra";
  const isGateway = selected.id === "gateway";
  const isPortalPublik = selected.id === "portal-publik";
  const isBusy = stage !== "idle";

  const handleLogin = () => {
    if (isBusy) return;

    if (isMitra && platformName.trim() === "") {
      setPlatformError(true);
      return;
    }
    setPlatformError(false);

    if (isMitra) {
      localStorage.setItem("sigap_platform_name", platformName.trim());
    }

    if (isGateway) {
      localStorage.setItem("sigap_institusi", institusi.name);
    }

    setStage("verifying");

    setTimeout(() => {
      setStage("verified");
      setTimeout(() => {
        setStage("activating");
        setTimeout(() => {
          setStage("exiting");
          setTimeout(() => {
            router.push(selected.href);
          }, 350);
        }, 500);
      }, 500);
    }, 1100);
  };

  return (
    <main className="min-h-screen bg-neutral-950 relative overflow-hidden flex items-center justify-center px-6 py-12">
      <div className="grid-pattern" />
      <NetworkBackground />
      <div className="scan-beam" />

      <div
        className={`w-full max-w-lg relative z-10 transition-all duration-350 ease-in-out ${
          stage === "exiting" ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="text-center mb-6">
          <h1 className="flex items-center justify-center gap-2 text-3xl font-bold text-white">
            <span
              className={`transition-all duration-500 ${
                stage === "activating" ? "opacity-40 -translate-x-1" : ""
              }`}
            >
              Masuk ke SI
            </span>
            <span
              className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 overflow-hidden shrink-0 transition-all duration-500 ease-out ${
                stage === "activating"
                  ? "scale-150 shadow-[0_0_30px_8px_rgba(20,184,166,0.6)]"
                  : "scale-100 shadow-[0_0_0px_0px_rgba(20,184,166,0)]"
              }`}
            >
              <Globe
                className={`absolute w-6 h-6 text-white/40 animate-spin transition-all duration-500 ${
                  stage === "activating" ? "[animation-duration:0.8s]" : "[animation-duration:6s]"
                }`}
              />
              <span className="relative text-white font-bold text-lg leading-none">G</span>
            </span>
            <span
              className={`transition-all duration-500 ${
                stage === "activating" ? "opacity-40 translate-x-1" : ""
              }`}
            >
              AP
            </span>
          </h1>
          <p className="text-neutral-500 text-xs italic mt-0.5">Sign in to SIGAP</p>
          <p className="text-neutral-400 mt-2">
            Pilih jenis akun untuk mengakses portal yang sesuai
          </p>
          <p className="text-neutral-500 text-xs italic">
            Select the type of account to access the appropriate portal
          </p>
        </div>

        <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 mb-6">
          <span className="text-lg">💡</span>
          <div>
            <p className="text-emerald-300 text-sm">
              Klik <span className="font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-xs">Enter</span> tanpa memasukkan password, kode OTP, atau akun apapun pada prototipe ini.
            </p>
            <p className="text-emerald-500/70 text-xs italic mt-1">
              Press Enter without entering a password, OTP code, or any account for this prototype.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selected.id === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setSelected(role)}
                disabled={isBusy}
                className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 disabled:opacity-50 ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/10 scale-105"
                    : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${
                    isSelected ? "text-emerald-400" : "text-neutral-400"
                  }`}
                />
                <span className="flex flex-col items-center leading-tight">
                  <span
                    className={`text-xs font-medium text-center ${
                      isSelected ? "text-white" : "text-neutral-400"
                    }`}
                  >
                    {role.name}
                  </span>
                  <span className="text-[10px] text-neutral-600 text-center">
                    {role.nameEn}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {isMitra && (
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm text-neutral-300 mb-0.5">
              <Building2 className="w-4 h-4" />
              Nama Platform
            </label>
            <p className="text-[10px] text-neutral-500 mb-1.5 ml-6">Platform Name</p>
            <input
              list="platform-options"
              type="text"
              value={platformName}
              onChange={(e) => {
                setPlatformName(e.target.value);
                if (e.target.value.trim() !== "") setPlatformError(false);
              }}
              disabled={isBusy}
              placeholder="Pilih dari daftar atau ketik nama platform Anda"
              className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none transition disabled:opacity-50 ${
                platformError
                  ? "border-red-500 focus:border-red-500"
                  : "border-neutral-800 focus:border-emerald-500"
              }`}
            />
            <datalist id="platform-options">
              {contohPlatform.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
            {platformError && (
              <p className="text-red-400 text-xs mt-1.5">
                Nama platform wajib diisi untuk masuk sebagai Mitra Platform.
              </p>
            )}
          </div>
        )}

        {isGateway && (
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm text-neutral-300 mb-0.5">
              <Network className="w-4 h-4" />
              Institusi Titik Jepit
            </label>
            <p className="text-[10px] text-neutral-500 mb-1.5 ml-6">Enforcement Institution</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {daftarInstitusi.map((inst) => {
                const InstIcon = inst.icon;
                const isSelectedInst = institusi.id === inst.id;
                return (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => setInstitusi(inst)}
                    disabled={isBusy}
                    className={`flex flex-col items-center gap-1.5 rounded-xl border px-3 py-3 transition-colors disabled:opacity-50 ${
                      isSelectedInst
                        ? "border-emerald-500 bg-emerald-500/10"
                        : "border-neutral-800 bg-neutral-900 hover:border-neutral-700"
                    }`}
                  >
                    <InstIcon
                      className={`w-4 h-4 ${
                        isSelectedInst ? "text-emerald-400" : "text-neutral-400"
                      }`}
                    />
                    <span
                      className={`text-[11px] font-medium text-center leading-tight ${
                        isSelectedInst ? "text-white" : "text-neutral-400"
                      }`}
                    >
                      {inst.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {isPortalPublik && (
          <div className="mb-4 flex items-start gap-3 bg-sky-500/10 border border-sky-500/20 rounded-xl px-4 py-3">
            <span className="text-lg">🌐</span>
            <div>
              <p className="text-sky-300 text-sm">
                Portal Publik dapat diakses langsung tanpa NIK maupun kata sandi.
              </p>
              <p className="text-sky-500/70 text-xs italic mt-1">
                Public Portal can be accessed directly without an ID or password.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {!isPortalPublik && (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-300 mb-0.5">
                  <IdCard className="w-4 h-4" />
                  NIK / ID Akses
                </label>
                <p className="text-[10px] text-neutral-500 mb-1.5 ml-6">NIK / Access ID</p>
                <input
                  type="text"
                  disabled={isBusy}
                  placeholder="Ketik apapun untuk akses prototipe"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm text-neutral-300 mb-0.5">
                  <KeyRound className="w-4 h-4" />
                  Kata Sandi
                </label>
                <p className="text-[10px] text-neutral-500 mb-1.5 ml-6">Password</p>
                <input
                  type="password"
                  disabled={isBusy}
                  placeholder="••••••••••"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 transition disabled:opacity-50"
                />
              </div>
            </>
          )}

          <button
            onClick={handleLogin}
            disabled={isBusy}
            className="w-full flex flex-col items-center justify-center gap-0.5 bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.02] text-black font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-90 disabled:scale-100"
          >
            {stage === "idle" && (
              <>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Masuk ke SIGAP sebagai {selected.name}
                </span>
                <span className="text-[10px] font-normal opacity-70">
                  Sign in to SIGAP as {selected.nameEn}
                </span>
              </>
            )}
            {stage === "verifying" && (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Memverifikasi akses...
              </span>
            )}
            {(stage === "verified" || stage === "activating" || stage === "exiting") && (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Terverifikasi
              </span>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}