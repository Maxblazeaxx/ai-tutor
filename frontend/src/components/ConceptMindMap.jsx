import React, { useState } from "react";
import { GitBranch, Volume2, Sparkles, Compass, Lightbulb, CheckCircle2 } from "lucide-react";

export default function ConceptMindMap({ concept, keyPoints = [], steps = [], isHighContrast = false }) {
  const [selectedNode, setSelectedNode] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Derive mind map nodes dynamically from concept and key points
  const nodes = [
    {
      id: 0,
      label: concept || "Core Concept",
      role: "Central Idea",
      x: 200,
      y: 110,
      color: "fill-emerald-600",
      stroke: "#059669",
      text: "Core Concept",
      detail: `The central educational milestone: ${concept}. Understanding this unlocks key scientific and mathematical reasoning.`
    },
    {
      id: 1,
      label: keyPoints[0] ? keyPoints[0].split(":")[0].slice(0, 24) : "Input 1",
      role: "Foundation Requirement",
      x: 70,
      y: 60,
      color: "fill-sky-500",
      stroke: "#0284c7",
      text: "Inputs & Energy",
      detail: keyPoints[0] || "Foundational starting requirements that initiate the physical or natural process."
    },
    {
      id: 2,
      label: keyPoints[1] ? keyPoints[1].split(":")[0].slice(0, 24) : "Input 2",
      role: "Active Mechanism",
      x: 70,
      y: 160,
      color: "fill-indigo-500",
      stroke: "#4f46e5",
      text: "How It Operates",
      detail: keyPoints[1] || "The active scientific transformation or biological mechanism taking place."
    },
    {
      id: 3,
      label: keyPoints[2] ? keyPoints[2].split(":")[0].slice(0, 24) : "Output 1",
      role: "Result & Output",
      x: 330,
      y: 60,
      color: "fill-amber-500",
      stroke: "#d97706",
      text: "Products Formed",
      detail: keyPoints[2] || "The crucial results, new materials, or forces produced."
    },
    {
      id: 4,
      label: keyPoints[3] ? keyPoints[3].split(":")[0].slice(0, 24) : "Life Example",
      role: "Real-World Metaphor",
      x: 330,
      y: 160,
      color: "fill-rose-500",
      stroke: "#e11d48",
      text: "Everyday Connection",
      detail: keyPoints[3] || "How this concept directly connects to objects and experiences in daily life."
    }
  ];

  const activeNode = nodes[selectedNode] || nodes[0];

  const handleSpeakNode = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const textToSpeak = `${activeNode.role}: ${activeNode.detail}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className={`rounded-2xl p-5 border transition-all ${
      isHighContrast ? "bg-slate-950 border-amber-400 text-white" : "bg-white border-slate-200 text-slate-800 shadow-sm"
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
            <GitBranch size={18} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Spatial Concept Mind Map
            </span>
            <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
              Visual Relationship Flow: {concept}
            </h4>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Click any node to explore
        </span>
      </div>

      {/* Interactive SVG Node-Link Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900/95">
        <svg viewBox="0 0 400 220" className="w-full h-60">
          {/* Connecting Curved Flow Lines */}
          <g stroke="#64748b" strokeWidth="2" strokeDasharray="4 3" opacity="0.7">
            <line x1="70" y1="60" x2="200" y2="110" />
            <line x1="70" y1="160" x2="200" y2="110" />
            <line x1="200" y1="110" x2="330" y2="60" />
            <line x1="200" y1="110" x2="330" y2="160" />
          </g>

          {/* Animated Energy Flow Particles */}
          <g fill="#34d399">
            <circle cx="135" cy="85" r="3" className="animate-ping" />
            <circle cx="265" cy="85" r="3" className="animate-ping" />
          </g>

          {/* SVG Nodes */}
          {nodes.map((n) => {
            const isSelected = selectedNode === n.id;
            const isCenter = n.id === 0;
            return (
              <g
                key={n.id}
                onClick={() => setSelectedNode(n.id)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                {/* Glow ring on selection */}
                {isSelected && (
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isCenter ? 44 : 34}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="4"
                    className="animate-pulse"
                  />
                )}

                {/* Node Body */}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={isCenter ? 38 : 28}
                  fill={isCenter ? "#059669" : "#1e293b"}
                  stroke={isSelected ? "#10b981" : n.stroke}
                  strokeWidth={isSelected ? 3 : 2}
                />

                {/* Node Icon / Text */}
                <text
                  x={n.x}
                  y={isCenter ? n.y - 4 : n.y - 2}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={isCenter ? "11" : "9"}
                  fontWeight="bold"
                >
                  {isCenter ? "CONCEPT" : n.text.slice(0, 10)}
                </text>
                <text
                  x={n.x}
                  y={isCenter ? n.y + 10 : n.y + 10}
                  textAnchor="middle"
                  fill={isCenter ? "#a7f3d0" : "#94a3b8"}
                  fontSize={isCenter ? "9" : "8"}
                  fontWeight="medium"
                >
                  {isCenter ? "HUB" : n.role.split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Legend Bar */}
        <div className="bg-slate-900/90 text-white p-3 border-t border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
              {activeNode.role}
            </span>
            <p className="text-xs font-semibold text-slate-200 mt-0.5 max-w-lg">
              {activeNode.detail}
            </p>
          </div>

          <button
            onClick={handleSpeakNode}
            className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition shrink-0"
            title="Read node aloud"
            aria-label="Read node aloud"
          >
            <Volume2 size={16} className={isSpeaking ? "text-emerald-400 animate-pulse" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
