"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Montserrat } from "next/font/google";
import { Shield, Building2, Network, Lock, IdCard, KeyRound, Globe, CheckCircle2, Loader2, Landmark, Smartphone, CreditCard, Megaphone, Users } from "lucide-react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });

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

export function LoginPanel() {
  const router = useRouter();
  const [selected, setSelected] = useState(roles[0]);
  const [platformName, setPlatformName] = useState("");
  const [platformError, setPlatformError] = useState(false);
  const [institusi, setInstitusi] = useState(daftarInstitusi[0]);
  const [stage, setStage] = useState<Stage>("idle");

  const isMitra = selected.id === "mitra";
  const isGateway = selected.id === "gateway";
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
    <main
      className={`${montserrat.className} min-h-screen flex items-center justify-center px-6 py-12`}
      style={{ background: "#F4F1EA" }}
    >
      <div
        className={`w-full max-w-lg relative rounded-[28px] p-8 sm:p-10 transition-all duration-350 ease-in-out ${
          stage === "exiting" ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{
          background: "#F4F1EA",
          boxShadow: "18px 18px 36px #C9C4B4, -18px -18px 36px #FFFFFF",
          border: "1px solid #E5E0D2",
        }}
      >
        <div className="text-center mb-6">
          <h1
            className="flex items-center justify-center gap-2 text-3xl font-extrabold"
            style={{ color: "#1E2A38" }}
          >
            <span className={`transition-all duration-500 ${stage === "activating" ? "opacity-40 -translate-x-1" : ""}`}>
              Masuk ke SI
            </span>
            <span
              className={`relative inline-flex items-center justify-center w-8 h-8 rounded-full overflow-hidden shrink-0 transition-all duration-500 ease-out ${
                stage === "activating" ? "scale-150" : "scale-100"
              }`}
              style={{
                background: "linear-gradient(135deg, #C5A880, #1E2A38)",
                boxShadow: stage === "activating" ? "0 0 24px 6px rgba(197,168,128,0.5)" : "none",
              }}
            >
              <Globe
                className={`absolute w-6 h-6 text-white/50 animate-spin transition-all duration-500 ${
                  stage === "activating" ? "[animation-duration:0.8s]" : "[animation-duration:6s]"
                }`}
              />
              <span className="relative text-white font-bold text-lg leading-none">G</span>
            </span>
            <span className={`transition-all duration-500 ${stage === "activating" ? "opacity-40 translate-x-1" : ""}`}>
              AP
            </span>
          </h1>
          <p className="text-xs italic mt-0.5" style={{ color: "#8A857F" }}>
            Sign in to SIGAP
          </p>
          <p className="mt-2" style={{ color: "#2C2A29" }}>
            Pilih jenis akun untuk mengakses portal yang sesuai
          </p>
          <p className="text-xs italic" style={{ color: "#8A857F" }}>
            Select the type of account to access the appropriate portal
          </p>
        </div>

        <div
          className="flex items-start gap-3 rounded-2xl px-4 py-3 mb-6"
          style={{
            background: "#F4F1EA",
            boxShadow: "inset 5px 5px 12px #C9C4B4, inset -5px -5px 12px #FFFFFF",
          }}
        >
          <span className="text-lg">💡</span>
          <div>
            <p className="text-sm" style={{ color: "#1E2A38" }}>
              Klik{" "}
              <span
                className="font-mono px-1.5 py-0.5 rounded text-xs"
                style={{ background: "#E9E4D8", color: "#2C2A29" }}
              >
                Enter
              </span>{" "}
              tanpa memasukkan password, kode OTP, atau akun apapun pada prototipe ini.
            </p>
            <p className="text-xs italic mt-1" style={{ color: "#8A857F" }}>
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
                className="flex flex-col items-center gap-2 rounded-2xl p-4 transition-all duration-200 disabled:opacity-50"
                style={{
                  background: "#F4F1EA",
                  boxShadow: isSelected
                    ? "inset 5px 5px 12px #C9C4B4, inset -5px -5px 12px #FFFFFF"
                    : "8px 8px 18px #C9C4B4, -8px -8px 18px #FFFFFF",
                  border: isSelected ? "1.5px solid #C5A880" : "1.5px solid #E5E0D2",
                }}
              >
                <Icon className="w-6 h-6" style={{ color: isSelected ? "#C5A880" : "#8A857F" }} />
                <span className="flex flex-col items-center leading-tight">
                  <span
                    className="text-xs font-semibold text-center"
                    style={{ color: isSelected ? "#1E2A38" : "#8A857F" }}
                  >
                    {role.name}
                  </span>
                  <span className="text-[10px] text-center" style={{ color: "#8A857F" }}>
                    {role.nameEn}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {isMitra && (
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium mb-0.5" style={{ color: "#1E2A38" }}>
              <Building2 className="w-4 h-4" />
              Nama Platform
            </label>
            <p className="text-[10px] mb-1.5 ml-6" style={{ color: "#8A857F" }}>Platform Name</p>
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
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition disabled:opacity-50"
              style={{
                background: "#F4F1EA",
                color: "#2C2A29",
                boxShadow: platformError
                  ? "inset 4px 4px 10px #e3b8b8, inset -4px -4px 10px #FFFFFF"
                  : "inset 4px 4px 10px #C9C4B4, inset -4px -4px 10px #FFFFFF",
              }}
            />
            <datalist id="platform-options">
              {contohPlatform.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
            {platformError && (
              <p className="text-xs mt-1.5" style={{ color: "#b5443f" }}>
                Nama platform wajib diisi untuk masuk sebagai Mitra Platform.
              </p>
            )}
          </div>
        )}

        {isGateway && (
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium mb-0.5" style={{ color: "#1E2A38" }}>
              <Network className="w-4 h-4" />
              Institusi Titik Jepit
            </label>
            <p className="text-[10px] mb-1.5 ml-6" style={{ color: "#8A857F" }}>Enforcement Institution</p>
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
                    className="flex flex-col items-center gap-1.5 rounded-xl px-3 py-3 transition disabled:opacity-50"
                    style={{
                      background: "#F4F1EA",
                      boxShadow: isSelectedInst
                        ? "inset 4px 4px 10px #C9C4B4, inset -4px -4px 10px #FFFFFF"
                        : "6px 6px 14px #C9C4B4, -6px -6px 14px #FFFFFF",
                      border: isSelectedInst ? "1.5px solid #C5A880" : "1.5px solid #E5E0D2",
                    }}
                  >
                    <InstIcon className="w-4 h-4" style={{ color: isSelectedInst ? "#C5A880" : "#8A857F" }} />
                    <span
                      className="text-[11px] font-medium text-center leading-tight"
                      style={{ color: isSelectedInst ? "#1E2A38" : "#8A857F" }}
                    >
                      {inst.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-0.5" style={{ color: "#1E2A38" }}>
              <IdCard className="w-4 h-4" />
              NIK / ID Akses
            </label>
            <p className="text-[10px] mb-1.5 ml-6" style={{ color: "#8A857F" }}>NIK / Access ID</p>
            <input
              type="text"
              disabled={isBusy}
              placeholder="Ketik apapun untuk akses prototipe"
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition disabled:opacity-50"
              style={{
                background: "#F4F1EA",
                color: "#2C2A29",
                boxShadow: "inset 4px 4px 10px #C9C4B4, inset -4px -4px 10px #FFFFFF",
              }}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-0.5" style={{ color: "#1E2A38" }}>
              <KeyRound className="w-4 h-4" />
              Kata Sandi
            </label>
            <p className="text-[10px] mb-1.5 ml-6" style={{ color: "#8A857F" }}>Password</p>
            <input
              type="password"
              disabled={isBusy}
              placeholder="••••••••••"
              className="w-full rounded-xl px-4 py-3 focus:outline-none transition disabled:opacity-50"
              style={{
                background: "#F4F1EA",
                color: "#2C2A29",
                boxShadow: "inset 4px 4px 10px #C9C4B4, inset -4px -4px 10px #FFFFFF",
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isBusy}
            className="w-full flex flex-col items-center justify-center gap-0.5 font-semibold py-3.5 rounded-xl transition-all duration-300 disabled:opacity-90"
            style={{
              background: "linear-gradient(135deg, #C5A880, #1E2A38)",
              color: "#FFFFFF",
              boxShadow: "8px 8px 18px #C9C4B4, -8px -8px 18px #FFFFFF",
            }}
          >
            {stage === "idle" && (
              <>
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Masuk ke SIGAP sebagai {selected.name}
                </span>
                <span className="text-[10px] font-normal opacity-80">
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