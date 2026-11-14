import React, { useState } from "react";
import { Hand, Eye, Info, Sparkles, BookOpen } from "lucide-react";
import SignGesturePractice from "./SignGesturePractice";
import SignIllustrationSVG from "./SignIllustrationSVG";


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
    let svgType = "default";
    if (t.includes("water") || t.includes("liquid")) svgType = "w_chin";
    else if (t.includes("good")) svgType = "thumbs_up";
    else if (t.includes("bad")) svgType = "thumbs_down";
    else if (t.includes("please")) svgType = "palm_circle";
    else if (t.includes("thank")) svgType = "chin_forward";
    else if (t.includes("stop")) svgType = "palm_chop";
    else if (t.includes("help")) svgType = "palm_lift";
    else if (t.includes("sun") || t.includes("light")) svgType = "w_chin";

    return (
      <SignIllustrationSVG
        svgType={svgType}
        term={term}
        className="w-32 h-32 mx-auto"
      />
    );
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
