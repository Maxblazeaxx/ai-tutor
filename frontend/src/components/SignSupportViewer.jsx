import React, { useState } from "react";
import { Hand, Eye, Info } from "lucide-react";
import SignGesturePractice from "./SignGesturePractice";

export default function SignSupportViewer({ signItems, concept }) {
  const [selectedTermIdx, setSelectedTermIdx] = useState(0);

  const items = signItems && signItems.length > 0 ? signItems : [
    {
      term: "Plant",
      gloss: "PLANT-GROW",
      description: "Dominant hand emerges upward from non-dominant hand, opening fingers like a growing plant.",
      handshape: "Open 5 handshape upward",
      movement: "Upward emerging growth movement",
      asset_placeholder: "sign_plant.svg"
    }
  ];

  const currentItem = items[selectedTermIdx] || items[0];

  // Render SVG Hand Gesture Illustrations
  const renderHandIllustration = (term) => {
    const t = (term || "").toLowerCase();
    if (t.includes("water")) {
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto text-blue-600">
          <circle cx="100" cy="100" r="90" fill="#E1F5FE" stroke="#0288D1" strokeWidth="3" />
          {/* W-handshape stylized illustration */}
          <path d="M 70 140 L 70 70 M 100 140 L 100 65 M 130 140 L 130 70" stroke="#0277BD" strokeWidth="12" strokeLinecap="round" />
          <path d="M 55 140 Q 100 160 145 140" stroke="#0277BD" strokeWidth="14" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="45" r="8" fill="#0288D1" className="animate-bounce" />
          <text x="68" y="180" fill="#01579B" fontSize="14" fontWeight="bold">W-Sign</text>
        </svg>
      );
    } else if (t.includes("sun") || t.includes("light")) {
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto text-amber-500">
          <circle cx="100" cy="100" r="90" fill="#FFF8E1" stroke="#FFA000" strokeWidth="3" />
          <circle cx="100" cy="80" r="30" fill="#FFD54F" stroke="#FF8F00" strokeWidth="3" />
          {/* Beams streaming down */}
          <line x1="80" y1="120" x2="60" y2="155" stroke="#FFA000" strokeWidth="6" strokeLinecap="round" />
          <line x1="100" y1="125" x2="100" y2="165" stroke="#FFA000" strokeWidth="6" strokeLinecap="round" />
          <line x1="120" y1="120" x2="140" y2="155" stroke="#FFA000" strokeWidth="6" strokeLinecap="round" />
          <text x="50" y="185" fill="#E65100" fontSize="13" fontWeight="bold">Sun-Beam Sign</text>
        </svg>
      );
    } else if (t.includes("plant")) {
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto text-emerald-600">
          <circle cx="100" cy="100" r="90" fill="#E8F5E9" stroke="#388E3C" strokeWidth="3" />
          {/* Plant emerging up through hand */}
          <path d="M 60 130 C 90 120, 110 120, 140 130" stroke="#2E7D32" strokeWidth="12" strokeLinecap="round" />
          <path d="M 100 130 L 100 65" stroke="#43A047" strokeWidth="8" strokeLinecap="round" />
          <ellipse cx="85" cy="75" rx="14" ry="7" fill="#66BB6A" transform="rotate(-30 85 75)" />
          <ellipse cx="115" cy="75" rx="14" ry="7" fill="#66BB6A" transform="rotate(30 115 75)" />
          <text x="55" y="180" fill="#1B5E20" fontSize="13" fontWeight="bold">Growth Sign</text>
        </svg>
      );
    } else {
      return (
        <svg viewBox="0 0 200 200" className="w-32 h-32 mx-auto text-indigo-600">
          <circle cx="100" cy="100" r="90" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="3" />
          {/* Hands gesturing outward */}
          <path d="M 65 110 Q 100 80 135 110" stroke="#4338CA" strokeWidth="10" strokeLinecap="round" fill="none" />
          <line x1="60" y1="130" x2="140" y2="130" stroke="#4338CA" strokeWidth="10" strokeLinecap="round" />
          <text x="65" y="180" fill="#312E81" fontSize="13" fontWeight="bold">Sign Gloss</text>
        </svg>
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <Hand size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                Deaf Accessibility Pathway
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">
                placeholder glosses, not verified ISL/ASL
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mt-0.5">
              Sign-Language Support & Visual Glosses
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          <Eye size={14} /> 100% Visual (No audio required)
        </div>
      </div>

      {/* Term Chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTermIdx(idx)}
            className={`px-3 py-1.5 rounded-xl font-semibold text-sm transition-all ${
              idx === selectedTermIdx
                ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {item.term}
          </button>
        ))}
      </div>

      {/* Active Sign Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 rounded-xl p-4 border border-slate-200 items-center">
        {/* Hand Graphic */}
        <div className="flex flex-col items-center justify-center p-2 text-center">
          {renderHandIllustration(currentItem.term)}
          <span className="mt-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
            {currentItem.gloss}
          </span>
          <span className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded mt-1 font-medium">
            placeholder glosses, not verified ISL/ASL
          </span>
        </div>

        {/* Detailed Explanation */}
        <div className="md:col-span-2 space-y-2.5">
          <div>
            <h4 className="text-xl font-extrabold text-slate-900">{currentItem.term}</h4>
            <div className="flex items-center gap-2 flex-wrap mt-0.5">
              <p className="text-sm font-semibold text-indigo-700">
                Sign Gloss: <code className="bg-indigo-100 px-2 py-0.5 rounded">{currentItem.gloss}</code>
              </p>
              <span className="text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                placeholder glosses, not verified ISL/ASL
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {currentItem.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-xs">
            <div>
              <span className="font-bold text-slate-500">Handshape:</span>
              <p className="text-slate-800 font-medium">{currentItem.handshape || "Standard handshape"}</p>
            </div>
            <div>
              <span className="font-bold text-slate-500">Movement:</span>
              <p className="text-slate-800 font-medium">{currentItem.movement || "Standard movement"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <Info size={14} className="text-indigo-600" />
        <span>Modular sign architecture: Designed for direct coupling with ASL/ISL sign asset libraries and MediaPipe avatar synthesis.</span>
      </div>

      {/* Phase 11 Gesture Practice Studio */}
      <SignGesturePractice currentSign={currentItem} learnerId="deaf_demo_learner" />
    </div>
  );
}
