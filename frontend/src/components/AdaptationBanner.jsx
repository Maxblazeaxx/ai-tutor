import React from "react";
import { GitCompare, Sparkles, AlertCircle, CheckCircle } from "lucide-react";

export default function AdaptationBanner({ adaptationInfo }) {
  if (!adaptationInfo) return null;

  const decision = adaptationInfo.decision || {};
  const action = decision.action || adaptationInfo.applied_style || "adapted";
  const rationale = decision.pedagogical_rationale || "Content adapted to learner accessibility profile.";

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border-2 border-emerald-500/30 rounded-2xl p-4 mb-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-emerald-600 text-white rounded-xl shadow-sm shrink-0 mt-0.5">
          <GitCompare size={20} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider bg-emerald-600 text-white px-2 py-0.5 rounded-md">
              Adaptive Regeneration Active
            </span>
            <span className="text-xs font-bold text-slate-700 uppercase">
              Action: {action.toUpperCase()}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-800">
            {rationale}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span>Style: <strong>{decision.explanation_style || "Visual Storytelling"}</strong></span>
            <span>•</span>
            <span>Complexity: <strong>{decision.complexity_level || "Micro-step"}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
