import React, { useState } from "react";
import { BookOpen, Film, Hand, Volume2, Sparkles, CheckCircle, GitBranch, Zap } from "lucide-react";
import MicroAnimationPlayer from "./MicroAnimationPlayer";
import DynamicSVGPlayer from "./DynamicSVGPlayer";
import SignSupportViewer from "./SignSupportViewer";
import ConceptMindMap from "./ConceptMindMap";


export default function LessonDisplay({
  lesson,
  learnerProfile,
  onSpeechSpeak,
  isHighContrast = false
}) {
  const [activeTab, setActiveTab] = useState(
    learnerProfile?.learner_type === "deaf" ? "sign" : "animation"
  );
  const [animationMode, setAnimationMode] = useState("ai_dynamic"); // "ai_dynamic" vs "classic_curriculum"


  if (!lesson) return null;

  const isDeaf = learnerProfile?.learner_type === "deaf";
  const isDownSyndrome = learnerProfile?.learner_type === "down_syndrome";

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lesson.content);
      utterance.rate = isDownSyndrome ? 0.85 : 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="space-y-5">
      {/* Lesson Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {/* Provenance Label: Verified Curriculum vs AI-Generated Open Domain */}
        {lesson.is_ai_generated ? (
          <div className="mb-4 p-3.5 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border-2 border-dashed border-amber-400 rounded-xl text-amber-950 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
              ✨
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-amber-300 text-amber-950 px-2 py-0.5 rounded-md">
                  AI-Generated Open-Domain Knowledge
                </span>
                <span className="text-[11px] font-extrabold text-amber-800">
                  Not from verified CBSE curriculum library
                </span>
              </div>
              <p className="text-xs text-amber-900 leading-snug font-medium">
                Synthesized dynamically on demand ({lesson.generation_method === "gemini_open_domain" ? "Google Gemini API with schema validation" : "Template Knowledge Synthesizer"}) 
                and strictly bound to the verified animation actions & visual elements library for your learner profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-4 px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle size={15} className="text-emerald-600 shrink-0" />
            <span>
              <strong>Verified CBSE / Montessori Curriculum Document:</strong> Content grounded in verified pedagogical knowledge base.
            </span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              Concept: {lesson.concept}
            </span>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
              Style: {lesson.representation}
            </span>
          </div>

          {/* Alternative Modality Switcher Buttons (Section 13 requirement) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("animation")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "animation"
                  ? "bg-white text-emerald-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Film size={14} /> Visual Story
            </button>

            <button
              onClick={() => setActiveTab("sign")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "sign"
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Hand size={14} /> Sign Support
            </button>

            <button
              onClick={() => setActiveTab("mindmap")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "mindmap"
                  ? "bg-white text-purple-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GitBranch size={14} /> Concept Mind Map
            </button>

            <button
              onClick={() => setActiveTab("text")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === "text"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen size={14} /> Read Text
            </button>

            {!isDeaf && (
              <button
                onClick={handleSpeak}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-white transition"
                title="Listen to lesson"
              >
                <Volume2 size={14} /> Listen
              </button>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-black text-slate-900 mt-2">{lesson.title}</h1>
        
        {/* Step Breakdown Cards */}
        {lesson.steps && lesson.steps.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Micro-Learning Step Sequence
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {lesson.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-start gap-2.5"
                >
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-semibold text-slate-700 leading-snug">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modality View Display Area */}
      {activeTab === "animation" && (
        <div className="space-y-3">
          {/* Engine Selector Toggle */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Animation Engine:</span>
              <div className="flex bg-white rounded-lg p-0.5 border border-slate-200 shadow-xs">
                <button
                  onClick={() => setAnimationMode("ai_dynamic")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                    animationMode === "ai_dynamic"
                      ? "bg-purple-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  ✨ AI Dynamic SVG (New)
                </button>
                <button
                  onClick={() => setAnimationMode("classic_curriculum")}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center gap-1.5 ${
                    animationMode === "classic_curriculum"
                      ? "bg-slate-800 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  Classic Curated
                </button>
              </div>
            </div>

            <span className="text-[11px] text-slate-500 hidden sm:inline">
              {animationMode === "ai_dynamic"
                ? "🤖 Rendered via DynamicSVGPlayer with real-time keyframes"
                : "📐 Rendered via verified curriculum static paths"}
            </span>
          </div>

          {animationMode === "ai_dynamic" ? (
            <DynamicSVGPlayer
              scenes={
                lesson.ai_animated_scenes && lesson.ai_animated_scenes.length > 0
                  ? lesson.ai_animated_scenes
                  : (lesson.visual_scenes || []).map((sc, i) => ({
                      scene_index: sc.scene || (i + 1),
                      title: sc.title || `Stage ${i + 1}`,
                      caption: sc.caption || sc.description || "",
                      duration_ms: (sc.duration_seconds || 4) * 1000,
                      canvas_width: 800,
                      canvas_height: 400,
                      background_color: "#0f172a",
                      narration_text: sc.caption || sc.description || "",
                      accessibility_description: sc.description || "",
                      elements: [
                        {
                          id: `bg_glow_${i}`,
                          type: "circle",
                          x: 400,
                          y: 200,
                          r: 140,
                          fill: i % 2 === 0 ? "#1e3a5f" : "#052e16",
                          opacity: 0.6,
                          keyframes: [
                            { t_ms: 0, opacity: 0.2, scale: 0.6 },
                            { t_ms: 2000, opacity: 0.6, scale: 1.0 }
                          ]
                        },
                        {
                          id: `core_elem_${i}`,
                          type: "circle",
                          x: 400,
                          y: 190,
                          r: 65,
                          fill: i % 2 === 0 ? "#3b82f6" : "#10b981",
                          stroke: "#ffffff",
                          stroke_width: 3,
                          keyframes: [
                            { t_ms: 0, opacity: 0, scale: 0.4 },
                            { t_ms: 1200, opacity: 1, scale: 1.0 }
                          ]
                        },
                        {
                          id: `action_arrow_${i}`,
                          type: "arrow",
                          x1: 220,
                          y1: 190,
                          x2: 580,
                          y2: 190,
                          fill: "#fbbf24",
                          stroke: "#f59e0b",
                          stroke_width: 4,
                          label: sc.animation_action ? sc.animation_action.replace(/_/g, " ") : "transformation",
                          keyframes: [
                            { t_ms: 400, opacity: 0 },
                            { t_ms: 1800, opacity: 1 }
                          ]
                        },
                        {
                          id: `title_text_${i}`,
                          type: "text",
                          x: 400,
                          y: 310,
                          text_content: sc.title || lesson.concept,
                          fill: "#f8fafc",
                          font_size: 20,
                          font_weight: "bold",
                          keyframes: [
                            { t_ms: 0, opacity: 0 },
                            { t_ms: 1500, opacity: 1 }
                          ]
                        }
                      ]
                    }))
              }
              concept={lesson.concept}
              generationMethod={lesson.is_ai_generated ? "gemini_ai_animation" : "ai_interpolated"}
              isHighContrast={isHighContrast}
              autoPlay={isDownSyndrome}
            />
          ) : (
            <MicroAnimationPlayer
              scenes={lesson.visual_scenes}
              concept={lesson.concept}
              autoPlay={isDownSyndrome}
            />
          )}
        </div>
      )}


      {activeTab === "sign" && (
        <SignSupportViewer
          signItems={lesson.sign_support}
          concept={lesson.concept}
        />
      )}

      {activeTab === "mindmap" && (
        <ConceptMindMap
          concept={lesson.concept}
          keyPoints={lesson.key_points && lesson.key_points.length > 0 ? lesson.key_points : lesson.steps || []}
          steps={lesson.steps || []}
          isHighContrast={isHighContrast}
        />
      )}

      {activeTab === "text" && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h3 className="text-lg font-bold text-slate-800">Complete Educational Explanation</h3>
          <div className="text-base text-slate-700 leading-relaxed font-normal whitespace-pre-line bg-slate-50 p-5 rounded-xl border border-slate-200">
            {lesson.content}
          </div>
        </div>
      )}
    </div>
  );
}
