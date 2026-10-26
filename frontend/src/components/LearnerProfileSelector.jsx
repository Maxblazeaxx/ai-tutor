import React from "react";
import { User, Eye, Sparkles, VolumeX, BookOpen, Layers, UserPlus } from "lucide-react";

export default function LearnerProfileSelector({
  activeLearner,
  learners = [],
  onSelectLearner,
  onOpenCustomModal,
  onRefresh
}) {
  const customLearners = learners.filter(
    (l) => l.learner_id !== "deaf_demo_learner" && l.learner_id !== "down_syndrome_demo_learner"
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Inclusive Learner Profile
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            Who is learning today?
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {onOpenCustomModal && (
            <button
              onClick={onOpenCustomModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition shadow-sm"
              title="Configure custom learner profile with pacing and grade settings"
            >
              <UserPlus size={14} /> + Custom Learner Profile
            </button>
          )}
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Adaptive Representation Active
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {/* Deaf Learner Card */}
        <div
          onClick={() => onSelectLearner("deaf_demo_learner")}
          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
            activeLearner?.learner_id === "deaf_demo_learner"
              ? "border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-200"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🧏
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Aarav (Deaf Learner)</h3>
                <p className="text-xs text-indigo-700 font-semibold">Visual + Sign Support</p>
              </div>
            </div>
            {activeLearner?.learner_id === "deaf_demo_learner" && (
              <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md">
                <Eye size={12} /> Visual First
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md">
                <Layers size={12} /> Sign Support
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md">
                <VolumeX size={12} /> Audio Not Required
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Provides diagrammatic structure, high-contrast captions, and sign gloss cards (placeholder glosses, not verified ISL/ASL).
            </p>
          </div>
        </div>

        {/* Down Syndrome Learner Card */}
        <div
          onClick={() => onSelectLearner("down_syndrome_demo_learner")}
          className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
            activeLearner?.learner_id === "down_syndrome_demo_learner"
              ? "border-emerald-600 bg-emerald-50/70 shadow-md ring-2 ring-emerald-200"
              : "border-slate-200 hover:border-slate-300 bg-white"
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                🌟
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Maya (Down syndrome)</h3>
                <p className="text-xs text-emerald-700 font-semibold">Micro-Learning & Storytelling</p>
              </div>
            </div>
            {activeLearner?.learner_id === "down_syndrome_demo_learner" && (
              <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                Active
              </span>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">
                <Sparkles size={12} /> Simple Words
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">
                <BookOpen size={12} /> Small Steps
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">
                <Layers size={12} /> Animated Story
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              Decomposes concepts into single-step visual micro-scenes with concrete storytelling and gentle repetition.
            </p>
          </div>
        </div>

        {/* Custom Created Learners */}
        {customLearners.map((cl) => (
          <div
            key={cl.learner_id}
            onClick={() => onSelectLearner(cl.learner_id)}
            className={`cursor-pointer rounded-2xl p-5 border-2 transition-all ${
              activeLearner?.learner_id === cl.learner_id
                ? "border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-200"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  {cl.learner_type === "deaf" ? "🧏" : cl.learner_type === "down_syndrome" ? "🌟" : "👤"}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{cl.name}</h3>
                  <p className="text-xs text-purple-700 font-semibold capitalize">
                    {cl.learner_type.replace("_", " ")} Custom Profile
                  </p>
                </div>
              </div>
              {activeLearner?.learner_id === cl.learner_id && (
                <span className="text-xs font-bold bg-purple-600 text-white px-2.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {(cl.accessibility_requirements || []).slice(0, 3).map((req, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white border border-purple-200 text-purple-800 px-2 py-0.5 rounded-md"
                  >
                    {req.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Custom tailored pacing ({cl.accessibility_requirements?.find((r) => r.startsWith("pacing_"))?.replace("pacing_", "") || "0.75x"}) and adaptive representations.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
