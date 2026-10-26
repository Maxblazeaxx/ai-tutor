import React, { useState } from "react";
import { Cpu, HeartHandshake, Eye, Sparkles, Activity, ShieldCheck, Sun, Moon, GraduationCap } from "lucide-react";

export default function Navbar({
  hardware,
  health,
  activeLearner,
  highContrast,
  onToggleContrast,
  onOpenUploadModal,
  onOpenVivaTour
}) {
  const [showSystemModal, setShowSystemModal] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm font-black text-lg">
            🌱
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-base leading-tight">
              Adaptive Inclusive AI Tutor
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Same Knowledge → Different Teaching Representation
            </p>
          </div>
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-3">
          {/* Active Profile Pill */}
          {activeLearner && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{activeLearner.name}</span>
            </div>
          )}

          {/* High Contrast Toggle for Accessibility */}
          <button
            onClick={onToggleContrast}
            className={`p-2 rounded-xl border transition ${
              highContrast
                ? "bg-black text-yellow-300 border-black"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
            }`}
            title="Toggle High Contrast Mode"
            aria-label="High contrast toggle"
          >
            {highContrast ? <Sun size={18} /> : <Eye size={18} />}
          </button>

          {/* Viva Demo Tour Quick-Launch */}
          {onOpenVivaTour && (
            <button
              onClick={onOpenVivaTour}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition shadow-sm"
              title="1-Click Guided Defense Tour for Examiners and Evaluators"
            >
              <GraduationCap size={15} />
              <span className="hidden sm:inline">Viva Demo Tour</span>
            </button>
          )}

          {/* Add Curriculum Button */}
          <button
            onClick={onOpenUploadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition"
            title="Upload/Index new curriculum concept into RAG"
          >
            <Sparkles size={14} className="text-emerald-600" />
            <span className="hidden sm:inline">+ Add Curriculum</span>
          </button>

          {/* System Hardware & Model Status */}
          <button
            onClick={() => setShowSystemModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition"
            title="Inspect system hardware and LLM configuration"
          >
            <Cpu size={14} className="text-emerald-600" />
            <span className="hidden md:inline">System & Hardware</span>
          </button>
        </div>
      </div>

      {/* System Modal */}
      {showSystemModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity size={20} className="text-emerald-600" />
                <h3 className="text-lg font-extrabold text-slate-900">System Environment & Hardware</h3>
              </div>
              <button
                onClick={() => setShowSystemModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-sm px-2 py-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Operating System</span>
                  <span className="font-semibold text-slate-800">{hardware?.os || "Windows 11"}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">CPU Cores</span>
                  <span className="font-semibold text-slate-800">{hardware?.cpu_count_logical || 12} Logical</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">System RAM</span>
                  <span className="font-semibold text-slate-800">{hardware?.ram_total_gb || 8} GB ({hardware?.ram_available_gb || 2} GB free)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Active GPU</span>
                  <span className="font-semibold text-slate-800">{hardware?.gpu_name || "Intel UHD Graphics"}</span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
                <span className="text-emerald-800 font-bold block uppercase mb-1">Execution Architecture</span>
                <p className="text-emerald-950 font-medium leading-relaxed">
                  {hardware?.execution_recommendation || "Fast local CPU RAG with configurable LLM provider."}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">LLM Provider:</span>
                  <span className="font-bold text-slate-800 uppercase">{health?.llm_provider || "FALLBACK"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Vector Store:</span>
                  <span className="font-bold text-slate-800 uppercase">{health?.embedding_provider || "SCIKIT"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-medium">Project Version:</span>
                  <span className="font-bold text-slate-800">{health?.version || "1.0.0"}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowSystemModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
