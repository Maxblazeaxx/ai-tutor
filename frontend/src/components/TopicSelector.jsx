import React, { useState } from "react";
import { Search, Mic, MicOff, Sparkles, BookOpen, GraduationCap, Compass } from "lucide-react";

export default function TopicSelector({ onSearch, isSearching, topics = [] }) {
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [activeTier, setActiveTier] = useState("all");

  const syllabusTiers = [
    { id: "all", label: "All CBSE Syllabus (Montessori - 10th)", icon: "🎓" },
    { id: "montessori", label: "Montessori & KG (Ages 3-6)", icon: "🧸" },
    { id: "primary", label: "Primary (Grades 1-5)", icon: "🎒" },
    { id: "middle", label: "Middle School (Grades 6-8)", icon: "🔬" },
    { id: "secondary", label: "Secondary (Grades 9-10 CBSE)", icon: "📐" }
  ];

  const curriculumCurated = {
    montessori: [
      { name: "Shapes and Colors (Montessori)", label: "🟡 Shapes & Colors", color: "bg-amber-50 text-amber-900 border-amber-200" },
      { name: "Counting Numbers 1 to 5 (Montessori)", label: "🍎 Counting 1 to 5", color: "bg-lime-50 text-lime-900 border-lime-200" },
      { name: "The Five Human Senses (Montessori)", label: "👀 Five Senses", color: "bg-pink-50 text-pink-900 border-pink-200" },
      { name: "Living and Non-Living Things (Montessori)", label: "🦋 Living & Non-Living", color: "bg-emerald-50 text-emerald-900 border-emerald-200" }
    ],
    primary: [
      { name: "Photosynthesis", label: "🌱 Photosynthesis (Grade 5)", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
      { name: "Water Cycle", label: "🌧️ Water Cycle (Grade 4)", color: "bg-sky-50 text-sky-900 border-sky-200" },
      { name: "Fractions (Halves and Quarters)", label: "🍕 Fractions 1/2 & 1/4 (Grade 3)", color: "bg-orange-50 text-orange-900 border-orange-200" },
      { name: "States of Matter: Solid, Liquid, and Gas", label: "🧊 States of Matter (Grade 4-5)", color: "bg-cyan-50 text-cyan-900 border-cyan-200" },
      { name: "Solar System", label: "🪐 Solar System & Earth (Grade 4)", color: "bg-indigo-50 text-indigo-900 border-indigo-200" },
      { name: "Gravity and Falling Objects", label: "🍏 Gravity & Falling (Grade 4)", color: "bg-teal-50 text-teal-900 border-teal-200" },
      { name: "Food Chains and Ecosystems (Primary Science)", label: "🦉 Food Chains & Ecology (Grade 5)", color: "bg-amber-50 text-amber-900 border-amber-200" }
    ],
    middle: [
      { name: "Magnets and Magnetic Poles (CBSE Grade 6)", label: "🧲 Magnets & Poles (Grade 6)", color: "bg-rose-50 text-rose-900 border-rose-200" },
      { name: "Acids, Bases, and Salts (CBSE Grade 7)", label: "🧪 Acids, Bases & Litmus (Grade 7)", color: "bg-purple-50 text-purple-900 border-purple-200" }
    ],
    secondary: [
      { name: "Human Circulatory System (CBSE Grade 10)", label: "❤️ Circulatory System (Grade 10)", color: "bg-red-50 text-red-900 border-red-200" },
      { name: "Electricity and Ohm's Law (CBSE Grade 10)", label: "⚡ Ohm's Law V = I × R (Grade 10)", color: "bg-yellow-50 text-yellow-900 border-yellow-200" },
      { name: "Trigonometry and Right Triangles (CBSE Grade 10)", label: "📐 Trigonometry & Angles (Grade 10)", color: "bg-blue-50 text-blue-900 border-blue-200" },
      { name: "Chemical Reactions and Equations (CBSE Grade 10)", label: "⚗️ Chemical Equations (Grade 10)", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
      { name: "Light: Reflection and Refraction (CBSE Grade 10)", label: "🔦 Light Optics & Mirrors (Grade 10)", color: "bg-sky-50 text-sky-900 border-sky-200" },
      { name: "Heredity and Evolution: Mendel's Laws (CBSE Grade 10)", label: "🧬 Genetics & DNA (Grade 10)", color: "bg-violet-50 text-violet-900 border-violet-200" }
    ]
  };

  const getVisibleTopics = () => {
    if (activeTier === "all") {
      return [
        ...curriculumCurated.montessori,
        ...curriculumCurated.primary,
        ...curriculumCurated.middle,
        ...curriculumCurated.secondary
      ];
    }
    return curriculumCurated[activeTier] || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isSearching) return;
    onSearch(query.trim());
  };

  const handleSelectPill = (topicName) => {
    setQuery(topicName);
    onSearch(topicName);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome/Edge or type your question.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsListening(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6 space-y-4">
      {/* Search / Open-Domain Query Bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask ANY topic (Montessori to 10th Grade CBSE or any custom science/math concept)..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-slate-800 placeholder-slate-400 text-sm sm:text-base"
          />
        </div>

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`p-3 rounded-xl border transition ${
            isListening
              ? "bg-red-500 text-white border-red-600 animate-pulse"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
          }`}
          title="Ask with voice (Speech Recognition)"
          aria-label="Voice input"
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>

        <button
          type="submit"
          disabled={!query.trim() || isSearching}
          className="px-6 py-3 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm text-sm sm:text-base whitespace-nowrap"
        >
          {isSearching ? "Synthesizing..." : "Teach Me"}
        </button>
      </form>

      {/* Montessori to 10th Grade CBSE Tier Navigator */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Compass size={14} /> CBSE & Montessori Syllabus Hierarchy:
          </span>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Any topic open-domain supported
          </span>
        </div>

        {/* Tier Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {syllabusTiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTier(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTier === t.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Topic Pills for selected tier */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {getVisibleTopics().map((t, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPill(t.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition whitespace-nowrap ${t.color} hover:opacity-90 shadow-2xs`}
              title={`Load ${t.name}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
