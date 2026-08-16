"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Globe } from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";

type Stage = "idle" | "activating" | "exiting";

export default function LandingPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");

  const handleMasuk = () => {
    if (stage !== "idle") return;
    setStage("activating");

    setTimeout(() => {
      setStage("exiting");
      setTimeout(() => {
        router.push("/login");
      }, 350);
    }, 500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-950 relative overflow-hidden">
      <div className="grid-pattern" />
      <NetworkBackground />
      <div className="scan-beam" />

      <div className="absolute w-[300px] h-[300px] rounded-full border border-emerald-500/30 animate-ping [animation-duration:3s]" />
      <div className="absolute w-[450px] h-[450px] rounded-full border border-emerald-500/20 animate-ping [animation-duration:3s] [animation-delay:0.5s]" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-emerald-500/10 animate-ping [animation-duration:3s] [animation-delay:1s]" />

      <div className="absolute w-[600px] h-[600px] rounded-full border border-neutral-800" />
      <div className="absolute w-[450px] h-[450px] rounded-full border border-neutral-800" />
      <div className="absolute w-[300px] h-[300px] rounded-full border border-neutral-800" />

      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-350 ease-in-out ${
          stage === "exiting" ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <div className="flex items-center mb-2">
          <span
            className={`text-5xl font-bold text-white tracking-tight transition-all duration-500 ${
              stage === "activating" ? "opacity-40 -translate-x-1" : ""
            }`}
          >
            SI
          </span>
          <div
            className={`relative w-11 h-11 mx-1 rounded-full bg-teal-500 flex items-center justify-center overflow-hidden transition-all duration-500 ease-out ${
              stage === "activating"
                ? "scale-150 shadow-[0_0_40px_10px_rgba(20,184,166,0.6)]"
                : "scale-100 shadow-[0_0_0px_0px_rgba(20,184,166,0)]"
            }`}
          >
            <Globe
              className={`absolute w-9 h-9 text-white/40 animate-spin transition-all duration-500 ${
                stage === "activating" ? "[animation-duration:0.8s]" : "[animation-duration:6s]"
              }`}
            />
            <span className="relative text-white font-bold text-3xl">G</span>
          </div>
          <span
            className={`text-5xl font-bold text-white tracking-tight transition-all duration-500 ${
              stage === "activating" ? "opacity-40 translate-x-1" : ""
            }`}
          >
            AP
          </span>
        </div>

        <p className="text-neutral-400 mt-2 max-w-md">
          Sistem Identifikasi Gap dan Antisipasi PMSE
        </p>

        <button
          onClick={handleMasuk}
          disabled={stage !== "idle"}
          className="mt-8 inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-xl hover:bg-neutral-200 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100"
        >
          {stage === "idle" ? (
            <>
              Masuk
              <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            "Memuat..."
          )}
        </button>

        <p className="text-neutral-600 text-sm mt-6">
          Ini adalah prototipe tampilan SIGAP
        </p>
      </div>
    </main>
  );
}