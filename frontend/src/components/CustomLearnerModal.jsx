import React, { useState } from "react";
import { UserPlus, X, Sparkles, Check, CheckCircle2, User, Gauge, Sliders, Layers } from "lucide-react";
import { createOrUpdateLearner } from "../services/api";

export default function CustomLearnerModal({ isOpen, onClose, onProfileCreated }) {
  const [name, setName] = useState("");
  const [learnerType, setLearnerType] = useState("down_syndrome");
  const [pacingSpeed, setPacingSpeed] = useState("0.75x");
  const [targetTier, setTargetTier] = useState("primary");
  const [preferredOutput, setPreferredOutput] = useState("visual_animation");
  const [selectedReqs, setSelectedReqs] = useState([
    "simple_language",
    "small_steps",
    "micro_learning",
    "visual_storytelling"
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleToggleReq = (key) => {
    if (selectedReqs.includes(key)) {
      setSelectedReqs(selectedReqs.filter((r) => r !== key));
    } else {
      setSelectedReqs([...selectedReqs, key]);
    }
  };

  const handleLearnerTypePreset = (type) => {
    setLearnerType(type);
    if (type === "deaf") {
      setPreferredOutput("visual");
      setPacingSpeed("1.0x");
      setSelectedReqs([
        "visual_explanation",
        "sign_support",
        "captions_enabled",
        "audio_optional"
      ]);
    } else if (type === "down_syndrome") {
      setPreferredOutput("visual_animation");
      setPacingSpeed("0.75x");
      setSelectedReqs([
        "simple_language",
        "small_steps",
        "visual_storytelling",
        "micro_learning",
        "encouraging_feedback"
      ]);
    } else {
      setPreferredOutput("visual_animation");
      setPacingSpeed("1.0x");
      setSelectedReqs([
        "visual_explanation",
        "simple_language",
        "interactive_text"
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setStatusMessage({ type: "error", text: "Please enter the learner's name." });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const learnerId = `custom_${name.toLowerCase().replace(/[^a-z0-9]/g, "_")}_${Date.now().toString().slice(-4)}`;
      const payload = {
        learner_id: learnerId,
        name: name.trim(),
        learner_type: learnerType,
        accessibility_requirements: [
          ...selectedReqs,
          `pacing_${pacingSpeed}`,
          `tier_${targetTier}`
        ],
        preferred_input: "text",
        preferred_output: preferredOutput
      };

      const newProfile = await createOrUpdateLearner(payload);
      setStatusMessage({ type: "success", text: `Profile for ${name} created successfully!` });

      setTimeout(() => {
        if (onProfileCreated) {
          onProfileCreated(newProfile);
        }
        onClose();
      }, 700);
    } catch (err) {
      console.error("Failed to create custom profile:", err);
      setStatusMessage({ type: "error", text: "Failed to create profile. Ensure backend is running." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">
                Create Custom Inclusive Learner Persona
              </h2>
              <p className="text-xs text-slate-500">
                Tailor cognitive pacing, sensory modalities & syllabus grade level
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-sm">
          {/* Learner Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Learner / Child Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Priya, Rohan, Sam"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 placeholder:text-slate-400 text-sm font-semibold"
              required
            />
          </div>

          {/* Primary Profile Preset */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Primary Inclusive Profile Mode
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleLearnerTypePreset("deaf")}
                className={`p-3 rounded-xl border text-left transition flex flex-col items-start ${
                  learnerType === "deaf"
                    ? "border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-200"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className="text-xl mb-1">🧏</span>
                <span className="font-extrabold text-xs text-slate-900">Deaf Learner</span>
                <span className="text-[10px] text-slate-500">Visual & Sign Focus</span>
              </button>

              <button
                type="button"
                onClick={() => handleLearnerTypePreset("down_syndrome")}
                className={`p-3 rounded-xl border text-left transition flex flex-col items-start ${
                  learnerType === "down_syndrome"
                    ? "border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-200"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className="text-xl mb-1">🌟</span>
                <span className="font-extrabold text-xs text-slate-900">Down Syndrome</span>
                <span className="text-[10px] text-slate-500">Micro-Steps & Pacing</span>
              </button>

              <button
                type="button"
                onClick={() => handleLearnerTypePreset("general")}
                className={`p-3 rounded-xl border text-left transition flex flex-col items-start ${
                  learnerType === "general"
                    ? "border-purple-600 bg-purple-50/80 ring-2 ring-purple-200"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <span className="text-xl mb-1">🧠</span>
                <span className="font-extrabold text-xs text-slate-900">Universal Diverse</span>
                <span className="text-[10px] text-slate-500">Multi-Modal Blend</span>
              </button>
            </div>
          </div>

          {/* Cognitive Pacing & Target Grade Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <Gauge size={13} /> Cognitive Pacing Speed
              </label>
              <select
                value={pacingSpeed}
                onChange={(e) => setPacingSpeed(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="0.5x">0.5x Gentle Pacing (High dwell time)</option>
                <option value="0.75x">0.75x Supported (Comfortable transitions)</option>
                <option value="1.0x">1.0x Standard Pacing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <Layers size={13} /> Target Syllabus Tier
              </label>
              <select
                value={targetTier}
                onChange={(e) => setTargetTier(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="montessori">Montessori & KG (Ages 3-6)</option>
                <option value="primary">Primary School (Grades 1-5)</option>
                <option value="middle">Middle School (Grades 6-8)</option>
                <option value="secondary">Secondary (Grades 9-10 CBSE)</option>
              </select>
            </div>
          </div>

          {/* Default Representation Modality */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Default Learning Modality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: "visual_animation", label: "Visual Story", icon: "🎬" },
                { id: "sign_support", label: "Sign Support", icon: "🤟" },
                { id: "visual", label: "Mind Map", icon: "🧠" },
                { id: "text", label: "Read Text", icon: "📖" }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPreferredOutput(m.id)}
                  className={`p-2.5 rounded-xl border font-bold text-center transition flex flex-col items-center justify-center gap-1 ${
                    preferredOutput === m.id
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Granular Accessibility Accommodations */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Granular Accessibility Accommodations
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { key: "audio_optional", label: "Audio-independent (No audio needed)" },
                { key: "captions_enabled", label: "Synchronized visual captions" },
                { key: "simple_language", label: "Linguistically simplified sentences" },
                { key: "micro_learning", label: "3-step micro-learning sequences" },
                { key: "repetition_support", label: "Gentle positive repetition loops" },
                { key: "sign_support", label: "Sign gloss cards (placeholder glosses, not verified ISL/ASL)" }
              ].map((req) => (
                <label
                  key={req.key}
                  onClick={() => handleToggleReq(req.key)}
                  className={`flex items-start gap-2 p-2.5 rounded-xl border cursor-pointer select-none transition ${
                    selectedReqs.includes(req.key)
                      ? "border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold"
                      : "border-slate-200 bg-slate-50/50 text-slate-600 font-medium"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-md border flex items-center justify-center mt-0.5 shrink-0 ${
                    selectedReqs.includes(req.key) ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                  }`}>
                    {selectedReqs.includes(req.key) && <Check size={12} strokeWidth={3} />}
                  </div>
                  <span className="text-[11px] leading-tight">{req.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}>
              {statusMessage.type === "success" && <CheckCircle2 size={16} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Profile...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Save & Launch Adaptive Session
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
