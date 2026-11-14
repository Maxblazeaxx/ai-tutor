import React, { useState, useMemo } from "react";
import { Hand, Search, BookOpen, Sparkles, Filter, CheckCircle2, ChevronRight, Video, Camera, Info, Eye } from "lucide-react";
import { PREDEFINED_SIGNS, SIGN_CATEGORIES } from "../data/predefinedSignsDataset";
import SignIllustrationSVG from "./SignIllustrationSVG";
import SignGesturePractice from "./SignGesturePractice";

export default function SignLanguageStudio({ isHighContrast = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Signs");
  const [activeSignId, setActiveSignId] = useState("sign_good");
  const [isPracticeModalOpen, setIsPracticeModalOpen] = useState(false);

  // Filtered dataset
  const filteredSigns = useMemo(() => {
    return PREDEFINED_SIGNS.filter((s) => {
      const matchesCat =
        selectedCategory === "All Signs" || s.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.term.toLowerCase().includes(q) ||
        s.gloss.toLowerCase().includes(q) ||
        s.handshape.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const activeSign = useMemo(() => {
    return (
      PREDEFINED_SIGNS.find((s) => s.id === activeSignId) ||
      filteredSigns[0] ||
      PREDEFINED_SIGNS[0]
    );
  }, [activeSignId, filteredSigns]);

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className={`rounded-2xl p-6 border shadow-sm ${
        isHighContrast
          ? "bg-black border-yellow-400 text-yellow-300"
          : "bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white border-indigo-700"
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5">
                <Hand className="w-3.5 h-3.5 text-indigo-300" />
                Deaf Inclusive Education Hub
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40">
                75 Predefined Fixed Handshape Standards
              </span>
              <span className="text-[11px] text-amber-300/80 bg-amber-950/40 px-2 py-0.5 rounded">
                placeholder glosses, not verified ISL/ASL
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              🤟 Predefined Sign Language & Gesture Dataset Studio
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore 75 standardized, fixed sign handshapes (Thumbs Up for Good, Thumbs Down for Bad, Please, Thank You, Everyday Needs, Numbers & Letters) with step-by-step formation guides, anatomical handshapes, and live camera gesture practice.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <p className="text-2xl font-black text-indigo-300">{PREDEFINED_SIGNS.length}</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">Total Signs</p>
            </div>
            <div className="px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <p className="text-2xl font-black text-emerald-400">6</p>
              <p className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">Categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sign dataset by name (e.g., Good, Bad, Water, Help, Number 5)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
            />
          </div>

          <div className="text-xs text-slate-500 font-semibold px-2 shrink-0">
            Showing <strong className="text-slate-900">{filteredSigns.length}</strong> of {PREDEFINED_SIGNS.length} sign designs
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-100">
          {SIGN_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Workspace: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Sign Cards Grid (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Select a Sign to Learn ({filteredSigns.length})
            </h3>
            <span className="text-xs text-slate-400">Click any card to inspect formation guide</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredSigns.map((sign) => {
              const isSelected = activeSign?.id === sign.id;
              return (
                <button
                  key={sign.id}
                  onClick={() => setActiveSignId(sign.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between h-[155px] ${
                    isSelected
                      ? "bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-400 shadow-md"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 w-full">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded-md truncate max-w-[100px]">
                      {sign.category.split(" ")[0]}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    )}
                  </div>

                  <div className="py-1">
                    <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                      {sign.term}
                    </h4>
                    <p className="text-[11px] font-mono font-semibold text-indigo-600 mt-0.5 truncate">
                      {sign.gloss}
                    </p>
                  </div>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                    {sign.handshape}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Interactive Sign Inspector (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 sticky top-6">
          {activeSign ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
              {/* Header with Visual Badge */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                      {activeSign.category}
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Standard Dataset
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{activeSign.term}</h3>
                  <code className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">
                    {activeSign.gloss}
                  </code>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold">Location:</span>
                  <p className="text-xs font-bold text-slate-700">{activeSign.location}</p>
                </div>
              </div>

              {/* Vector SVG Handshape Showcase */}
              <div className="bg-gradient-to-b from-slate-50 to-indigo-50/40 rounded-xl p-4 border border-indigo-100/60 flex flex-col items-center justify-center">
                <SignIllustrationSVG
                  svgType={activeSign.svgType}
                  term={activeSign.term}
                  className="w-36 h-36"
                />
                <p className="text-xs text-center text-slate-600 font-semibold mt-2 max-w-xs">
                  {activeSign.description}
                </p>
              </div>

              {/* How to Make This Sign: 3-Step Guide */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  How to Form This Sign (Step-by-Step)
                </h4>

                <div className="space-y-2">
                  {activeSign.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-black text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 font-medium leading-relaxed">{st}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anatomical Details Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Handshape</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{activeSign.handshape}</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Movement</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{activeSign.movement}</p>
                </div>
              </div>

              {/* Usage & Context Note */}
              {activeSign.usageTip && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-snug flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong>Pedagogical Context: </strong>
                    {activeSign.usageTip}
                  </div>
                </div>
              )}

              {/* Live Interactive Gesture Practice Trigger */}
              <div className="pt-2 border-t border-slate-100">
                <SignGesturePractice
                  currentSign={{
                    term: activeSign.term,
                    gloss: activeSign.gloss,
                    handshape: activeSign.handshape,
                    movement: activeSign.movement,
                    description: activeSign.description
                  }}
                  learnerId="deaf_demo_learner"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              Select a sign from the list to view its complete formation guide.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
