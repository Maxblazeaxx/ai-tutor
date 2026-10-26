import React, { useState, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Volume2, Gauge, Sparkles, CheckCircle2 } from "lucide-react";

export default function MicroAnimationPlayer({ scenes, concept, autoPlay = false }) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0); // 0.5x, 0.75x, 1.0x
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeScenes = scenes && scenes.length > 0 ? scenes : [
    {
      scene: 1,
      title: "Visual Scene",
      description: "Visual representation of the concept.",
      animation_action: "sun_glow",
      caption: "Step 1: Visual representation of the concept.",
      duration_seconds: 4
    }
  ];

  const currentScene = activeScenes[currentSceneIdx] || activeScenes[0];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      const baseDuration = currentScene.duration_seconds || 4;
      const duration = (baseDuration / playbackSpeed) * 1000;
      timer = setTimeout(() => {
        if (currentSceneIdx < activeScenes.length - 1) {
          setCurrentSceneIdx((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentSceneIdx, activeScenes.length, currentScene.duration_seconds, playbackSpeed]);

  const handleNext = () => {
    if (currentSceneIdx < activeScenes.length - 1) {
      setCurrentSceneIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIdx(0);
    setIsPlaying(true);
  };

  const handleSpeakCaption = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const textToSpeak = currentScene.caption || currentScene.description || "";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed * 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Render SVG animation according to scene's animation_action
  const renderVisualStage = (action) => {
    switch (action) {
      // ----------------------------------------------------------------------
      // PHOTOSYNTHESIS
      // ----------------------------------------------------------------------
      case "sun_glow":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-sky-100">
            <rect x="0" y="190" width="400" height="50" fill="#8B5A2B" />
            <rect x="0" y="185" width="400" height="10" fill="#4CAF50" />
            <line x1="200" y1="185" x2="200" y2="150" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
            <ellipse cx="185" cy="155" rx="14" ry="7" fill="#4CAF50" transform="rotate(-30 185 155)" />
            <ellipse cx="215" cy="155" rx="14" ry="7" fill="#4CAF50" transform="rotate(30 215 155)" />
            <g className="animate-pulse">
              <circle cx="200" cy="70" r="38" fill="#FDD835" stroke="#F57F17" strokeWidth="4" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <line
                  key={i}
                  x1={200 + 44 * Math.cos((angle * Math.PI) / 180)}
                  y1={70 + 44 * Math.sin((angle * Math.PI) / 180)}
                  x2={200 + 58 * Math.cos((angle * Math.PI) / 180)}
                  y2={70 + 58 * Math.sin((angle * Math.PI) / 180)}
                  stroke="#FFA000"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              ))}
            </g>
          </svg>
        );

      case "sunlight_to_plant":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-amber-50">
            <rect x="0" y="190" width="400" height="50" fill="#8B5A2B" />
            <rect x="0" y="185" width="400" height="10" fill="#4CAF50" />
            <circle cx="60" cy="50" r="28" fill="#FDD835" stroke="#F57F17" strokeWidth="3" />
            <line x1="85" y1="65" x2="190" y2="140" stroke="#FFB300" strokeWidth="4" strokeDasharray="8 6" className="animate-pulse" />
            <line x1="95" y1="50" x2="210" y2="135" stroke="#FFCA28" strokeWidth="5" strokeDasharray="10 6" className="animate-pulse" />
            <line x1="75" y1="80" x2="175" y2="150" stroke="#FFD54F" strokeWidth="4" strokeDasharray="6 6" />
            <line x1="200" y1="185" x2="200" y2="120" stroke="#2E7D32" strokeWidth="7" strokeLinecap="round" />
            <ellipse cx="170" cy="135" rx="25" ry="12" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" transform="rotate(-25 170 135)" />
            <ellipse cx="230" cy="135" rx="25" ry="12" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" transform="rotate(25 230 135)" />
            <circle cx="200" cy="120" r="10" fill="#81C784" />
          </svg>
        );

      case "water_up_roots":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-blue-50">
            <rect x="0" y="150" width="400" height="90" fill="#6D4C41" />
            <rect x="0" y="145" width="400" height="10" fill="#4CAF50" />
            <path d="M 200 150 Q 180 180 150 210 M 200 150 Q 220 185 240 215 M 200 150 L 200 220" stroke="#D7CCC8" strokeWidth="5" fill="none" strokeLinecap="round" />
            <g className="animate-bounce">
              <circle cx="160" cy="195" r="5" fill="#0288D1" />
              <circle cx="230" cy="200" r="5" fill="#0288D1" />
              <circle cx="200" cy="175" r="6" fill="#03A9F4" />
            </g>
            <line x1="200" y1="145" x2="200" y2="80" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="175" cy="100" rx="20" ry="10" fill="#4CAF50" transform="rotate(-30 175 100)" />
            <ellipse cx="225" cy="100" rx="20" ry="10" fill="#4CAF50" transform="rotate(30 225 100)" />
            <text x="215" y="180" fill="#E1F5FE" fontSize="13" fontWeight="bold">H₂O Water</text>
          </svg>
        );

      case "co2_into_leaf":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-emerald-50">
            <rect x="0" y="190" width="400" height="50" fill="#8B5A2B" />
            <line x1="200" y1="190" x2="200" y2="90" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
            <path d="M 120 110 C 120 60, 280 60, 280 110 C 280 160, 120 160, 120 110 Z" fill="#43A047" stroke="#1B5E20" strokeWidth="3" />
            <line x1="120" y1="110" x2="280" y2="110" stroke="#2E7D32" strokeWidth="3" />
            <g className="animate-pulse">
              <rect x="70" y="70" width="42" height="22" rx="10" fill="#ECEFF1" stroke="#607D8B" strokeWidth="2" />
              <text x="76" y="86" fill="#37474F" fontSize="12" fontWeight="bold">CO₂</text>
              <path d="M 115 80 Q 140 85 160 100" stroke="#78909C" strokeWidth="3" strokeDasharray="4 4" fill="none" />
              <rect x="290" y="60" width="42" height="22" rx="10" fill="#ECEFF1" stroke="#607D8B" strokeWidth="2" />
              <text x="296" y="76" fill="#37474F" fontSize="12" fontWeight="bold">CO₂</text>
              <path d="M 290 75 Q 260 85 240 102" stroke="#78909C" strokeWidth="3" strokeDasharray="4 4" fill="none" />
            </g>
          </svg>
        );

      case "make_food_sparkle":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-yellow-50">
            <ellipse cx="200" cy="120" rx="90" ry="55" fill="#2E7D32" stroke="#1B5E20" strokeWidth="4" />
            <text x="145" y="115" fill="#FFFFFF" fontSize="14" fontWeight="bold">Food Factory</text>
            <text x="140" y="135" fill="#C8E6C9" fontSize="12">(Chloroplast)</text>
            <g className="animate-bounce">
              <rect x="185" y="150" width="28" height="28" rx="6" fill="#FFD54F" stroke="#FF8F00" strokeWidth="2" />
              <text x="190" y="170" fill="#E65100" fontSize="11" fontWeight="bold">Sugar</text>
            </g>
            <circle cx="130" cy="70" r="5" fill="#FFEB3B" className="animate-ping" />
            <circle cx="270" cy="70" r="5" fill="#FFEB3B" className="animate-ping" />
          </svg>
        );

      case "oxygen_released":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-teal-50">
            <rect x="0" y="190" width="400" height="50" fill="#8B5A2B" />
            <rect x="0" y="185" width="400" height="10" fill="#4CAF50" />
            <line x1="200" y1="185" x2="200" y2="100" stroke="#2E7D32" strokeWidth="8" strokeLinecap="round" />
            <ellipse cx="160" cy="120" rx="35" ry="18" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" transform="rotate(-20 160 120)" />
            <ellipse cx="240" cy="120" rx="35" ry="18" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" transform="rotate(20 240 120)" />
            {/* Oxygen Bubbles rising with animation */}
            <g className="animate-bounce">
              <circle cx="150" cy="70" r="14" fill="#E0F2FE" stroke="#0288D1" strokeWidth="2" />
              <text x="142" y="75" fill="#0277BD" fontSize="11" fontWeight="bold">O₂</text>
              <circle cx="230" cy="55" r="18" fill="#E0F2FE" stroke="#0288D1" strokeWidth="2" />
              <text x="220" y="61" fill="#0277BD" fontSize="13" fontWeight="bold">O₂</text>
              <circle cx="190" cy="35" r="12" fill="#E0F2FE" stroke="#0288D1" strokeWidth="2" />
              <text x="183" y="40" fill="#0277BD" fontSize="10" fontWeight="bold">O₂</text>
            </g>
            <text x="120" y="225" fill="#004D40" fontSize="14" fontWeight="bold">Fresh, Clean Oxygen to Breathe!</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // WATER CYCLE
      // ----------------------------------------------------------------------
      case "evaporation_rise":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-sky-50">
            {/* Shining Sun */}
            <circle cx="70" cy="60" r="32" fill="#FDD835" stroke="#F57F17" strokeWidth="3" className="animate-pulse" />
            {/* Water body */}
            <rect x="0" y="160" width="400" height="80" fill="#0288D1" />
            <path d="M 0 160 Q 50 152 100 160 T 200 160 T 300 160 T 400 160 L 400 240 L 0 240 Z" fill="#03A9F4" />
            {/* Rising Steam Arrows */}
            <g className="animate-bounce">
              <path d="M 120 150 Q 115 125 125 100" stroke="#81D4FA" strokeWidth="4" strokeDasharray="5 5" fill="none" />
              <polygon points="125,95 120,105 130,105" fill="#0288D1" />
              <path d="M 200 150 Q 195 125 205 95" stroke="#81D4FA" strokeWidth="4" strokeDasharray="5 5" fill="none" />
              <polygon points="205,90 200,100 210,100" fill="#0288D1" />
              <path d="M 280 150 Q 275 125 285 100" stroke="#81D4FA" strokeWidth="4" strokeDasharray="5 5" fill="none" />
              <polygon points="285,95 280,105 290,105" fill="#0288D1" />
            </g>
            <text x="140" y="210" fill="#FFFFFF" fontSize="14" fontWeight="bold">Warm Sun Evaporates Water</text>
          </svg>
        );

      case "cloud_condensation":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-100">
            {/* Sky backdrop */}
            <rect x="0" y="0" width="400" height="240" fill="#E2E8F0" />
            {/* Condensing Cloud */}
            <g className="animate-pulse">
              <circle cx="160" cy="110" r="45" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
              <circle cx="210" cy="95" r="55" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
              <circle cx="260" cy="110" r="45" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="3" />
              <rect x="150" y="110" width="120" height="40" fill="#FFFFFF" />
            </g>
            {/* Cooling dots */}
            <g className="animate-bounce">
              <circle cx="170" cy="130" r="4" fill="#38BDF8" />
              <circle cx="210" cy="135" r="5" fill="#0288D1" />
              <circle cx="245" cy="128" r="4" fill="#38BDF8" />
            </g>
            <text x="120" y="200" fill="#1E293B" fontSize="14" fontWeight="bold">Vapor Cools & Forms Fluffy Clouds</text>
          </svg>
        );

      case "precipitation_rain":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-200">
            {/* Dark rain cloud */}
            <circle cx="170" cy="70" r="40" fill="#64748B" />
            <circle cx="220" cy="60" r="50" fill="#475569" />
            <circle cx="270" cy="70" r="40" fill="#64748B" />
            <rect x="160" y="70" width="120" height="35" fill="#475569" />
            {/* Animated raindrops */}
            <g className="animate-bounce">
              <line x1="160" y1="120" x2="150" y2="160" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
              <line x1="200" y1="125" x2="190" y2="165" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
              <line x1="240" y1="115" x2="230" y2="155" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
              <line x1="275" y1="125" x2="265" y2="165" stroke="#0288D1" strokeWidth="3" strokeLinecap="round" />
            </g>
            {/* Green ground */}
            <rect x="0" y="195" width="400" height="45" fill="#4CAF50" />
            <text x="145" y="225" fill="#FFFFFF" fontSize="13" fontWeight="bold">Rain Falls to Earth</text>
          </svg>
        );

      case "collection_flow":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-emerald-50">
            {/* Mountains */}
            <polygon points="40,170 120,60 200,170" fill="#78909C" />
            <polygon points="160,170 240,80 320,170" fill="#90A4AE" />
            {/* Stream flowing down */}
            <path d="M 120 120 Q 140 150 170 170 T 220 200" stroke="#0288D1" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Lake at bottom */}
            <rect x="0" y="180" width="400" height="60" fill="#03A9F4" />
            <text x="110" y="220" fill="#FFFFFF" fontSize="14" fontWeight="bold">Water Collects to Begin the Cycle Again</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // FRACTIONS
      // ----------------------------------------------------------------------
      case "whole_object":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-orange-50">
            <ellipse cx="200" cy="130" rx="140" ry="85" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="4" />
            <circle cx="200" cy="120" r="70" fill="#FFB74D" stroke="#E65100" strokeWidth="5" />
            <circle cx="200" cy="120" r="58" fill="#FFF176" />
            {[[-25, -20], [25, -15], [0, 20], [-30, 25], [35, 20], [-10, -35]].map(([dx, dy], i) => (
              <circle key={i} cx={200 + dx} cy={120 + dy} r="6" fill="#D32F2F" />
            ))}
            <text x="140" y="210" fill="#5D4037" fontSize="14" fontWeight="bold">1 Whole Pizza (Complete)</text>
          </svg>
        );

      case "cut_half":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-orange-50">
            <ellipse cx="200" cy="130" rx="140" ry="85" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="4" />
            <path d="M 190 50 A 70 70 0 0 0 190 190 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="4" />
            <text x="135" y="125" fill="#BF360C" fontSize="16" fontWeight="bold">1/2</text>
            <path d="M 210 50 A 70 70 0 0 1 210 190 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="4" />
            <text x="235" y="125" fill="#BF360C" fontSize="16" fontWeight="bold">1/2</text>
            <text x="110" y="215" fill="#3E2723" fontSize="13" fontWeight="bold">Cut into 2 Equal Halves (1/2 + 1/2 = 1)</text>
          </svg>
        );

      case "cut_quarter":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-orange-50">
            <ellipse cx="200" cy="130" rx="140" ry="85" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="4" />
            <path d="M 190 110 L 190 50 A 70 70 0 0 0 130 110 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="3" />
            <text x="150" y="90" fill="#BF360C" fontSize="13" fontWeight="bold">1/4</text>
            <path d="M 210 110 L 210 50 A 70 70 0 0 1 270 110 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="3" />
            <text x="230" y="90" fill="#BF360C" fontSize="13" fontWeight="bold">1/4</text>
            <path d="M 190 130 L 190 190 A 70 70 0 0 1 130 130 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="3" />
            <text x="150" y="160" fill="#BF360C" fontSize="13" fontWeight="bold">1/4</text>
            <path d="M 210 130 L 210 190 A 70 70 0 0 0 270 130 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="3" />
            <text x="230" y="160" fill="#BF360C" fontSize="13" fontWeight="bold">1/4</text>
            <text x="135" y="215" fill="#3E2723" fontSize="13" fontWeight="bold">4 Equal Quarters (1/4 each)</text>
          </svg>
        );

      case "share_equally":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-green-50">
            <circle cx="100" cy="90" r="35" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
            <text x="88" y="95" fill="#2E7D32" fontSize="18" fontWeight="bold">1/4</text>
            <text x="65" y="150" fill="#1B5E20" fontSize="12" fontWeight="bold">Friend A</text>
            <circle cx="170" cy="90" r="35" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
            <text x="158" y="95" fill="#2E7D32" fontSize="18" fontWeight="bold">1/4</text>
            <text x="135" y="150" fill="#1B5E20" fontSize="12" fontWeight="bold">Friend B</text>
            <circle cx="240" cy="90" r="35" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
            <text x="228" y="95" fill="#2E7D32" fontSize="18" fontWeight="bold">1/4</text>
            <text x="205" y="150" fill="#1B5E20" fontSize="12" fontWeight="bold">Friend C</text>
            <circle cx="310" cy="90" r="35" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="3" />
            <text x="298" y="95" fill="#2E7D32" fontSize="18" fontWeight="bold">1/4</text>
            <text x="275" y="150" fill="#1B5E20" fontSize="12" fontWeight="bold">Friend D</text>
            <text x="120" y="200" fill="#1B5E20" fontSize="14" fontWeight="bold">🌟 Fair & Equal Sharing!</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // SOLAR SYSTEM
      // ----------------------------------------------------------------------
      case "sun_center":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            {[[30, 40], [80, 180], [330, 50], [370, 190], [150, 30], [250, 210]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#FFFFFF" opacity="0.8" />
            ))}
            <circle cx="200" cy="120" r="45" fill="#FDD835" stroke="#F57F17" strokeWidth="4" className="animate-pulse" />
            <text x="182" y="125" fill="#B71C1C" fontSize="13" fontWeight="bold">SUN</text>
            <text x="110" y="200" fill="#FFE082" fontSize="13" fontWeight="bold">The Sun is at the center of our solar system</text>
          </svg>
        );

      case "planet_orbit":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            <ellipse cx="200" cy="120" rx="130" ry="70" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="200" cy="120" r="32" fill="#FDD835" stroke="#F57F17" strokeWidth="3" />
            <text x="188" y="125" fill="#B71C1C" fontSize="11" fontWeight="bold">SUN</text>
            <g className="animate-bounce">
              <circle cx="310" cy="100" r="16" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" />
              <ellipse cx="308" cy="98" rx="8" ry="4" fill="#66BB6A" />
              <text x="295" y="130" fill="#E0F2FE" fontSize="11" fontWeight="bold">Earth</text>
            </g>
            <text x="115" y="215" fill="#BAE6FD" fontSize="12" fontWeight="bold">Earth travels in an orbit around the Sun</text>
          </svg>
        );

      case "moon_orbit":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            <circle cx="200" cy="120" r="36" fill="#0288D1" stroke="#29B6F6" strokeWidth="3" />
            <text x="180" y="125" fill="#FFFFFF" fontSize="12" fontWeight="bold">Earth</text>
            <ellipse cx="200" cy="120" rx="90" ry="50" fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />
            <g className="animate-pulse">
              <circle cx="275" cy="100" r="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
              <text x="260" y="85" fill="#F8FAFC" fontSize="11" fontWeight="bold">Moon</text>
            </g>
            <text x="115" y="210" fill="#E2E8F0" fontSize="13" fontWeight="bold">The Moon circles around our Earth</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // GRAVITY & FALLING OBJECTS
      // ----------------------------------------------------------------------
      case "apple_on_tree":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-sky-100">
            <rect x="0" y="195" width="400" height="45" fill="#4CAF50" />
            {/* Tree trunk and leaves */}
            <rect x="60" y="100" width="40" height="100" fill="#795548" />
            <circle cx="80" cy="80" r="60" fill="#2E7D32" />
            <rect x="80" y="70" width="150" height="18" fill="#5D4037" rx="6" />
            {/* Apple high on branch */}
            <line x1="170" y1="88" x2="170" y2="105" stroke="#33691E" strokeWidth="3" />
            <circle cx="170" cy="115" r="16" fill="#D32F2F" stroke="#B71C1C" strokeWidth="2" />
            <text x="140" y="225" fill="#1B5E20" fontSize="13" fontWeight="bold">Apple Rests High on the Branch</text>
          </svg>
        );

      case "apple_falling":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-amber-50">
            <rect x="0" y="195" width="400" height="45" fill="#4CAF50" />
            {/* Tree Branch */}
            <rect x="0" y="40" width="220" height="16" fill="#5D4037" rx="4" />
            {/* Downward Gravity Arrows */}
            <g className="animate-pulse">
              <line x1="200" y1="70" x2="200" y2="150" stroke="#FF5722" strokeWidth="5" strokeDasharray="8 6" />
              <polygon points="200,165 190,148 210,148" fill="#E64A19" />
              <text x="215" y="120" fill="#D84315" fontSize="13" fontWeight="bold">GRAVITY PULL</text>
            </g>
            {/* Apple in mid-fall */}
            <g className="animate-bounce">
              <circle cx="170" cy="130" r="18" fill="#D32F2F" stroke="#B71C1C" strokeWidth="3" />
              <ellipse cx="166" cy="124" rx="4" ry="2" fill="#FFCDD2" />
            </g>
            <text x="120" y="225" fill="#3E2723" fontSize="13" fontWeight="bold">Invisible Gravity Pulls the Apple Straight Down!</text>
          </svg>
        );

      case "apple_on_ground":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-emerald-50">
            <rect x="0" y="170" width="400" height="70" fill="#4CAF50" />
            <circle cx="200" cy="165" r="22" fill="#D32F2F" stroke="#B71C1C" strokeWidth="3" />
            <ellipse cx="196" cy="158" rx="5" ry="3" fill="#FFCDD2" />
            <circle cx="194" cy="164" r="2" fill="#FFFFFF" />
            <circle cx="206" cy="164" r="2" fill="#FFFFFF" />
            <path d="M 195 172 Q 200 178 205 172" stroke="#FFFFFF" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="130" y="215" fill="#FFFFFF" fontSize="15" fontWeight="bold">Safe on the Earth's Surface!</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // MONTESSORI: SHAPES & COLORS
      // ----------------------------------------------------------------------
      case "shape_circle":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-amber-50">
            <circle cx="200" cy="110" r="60" fill="#FDD835" stroke="#F57F17" strokeWidth="5" className="animate-pulse" />
            <text x="165" y="115" fill="#B71C1C" fontSize="16" fontWeight="bold">CIRCLE</text>
            <text x="130" y="210" fill="#E65100" fontSize="14" fontWeight="bold">Zero Corners • Perfectly Round</text>
          </svg>
        );

      case "shape_square":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-sky-50">
            <rect x="145" y="55" width="110" height="110" rx="8" fill="#29B6F6" stroke="#0288D1" strokeWidth="5" />
            <text x="165" y="115" fill="#FFFFFF" fontSize="16" fontWeight="bold">SQUARE</text>
            <text x="120" y="210" fill="#01579B" fontSize="14" fontWeight="bold">4 Equal Sides • 4 Right Angles</text>
          </svg>
        );

      case "shape_triangle":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-rose-50">
            <polygon points="200,50 130,165 270,165" fill="#EF5350" stroke="#C62828" strokeWidth="5" />
            <text x="160" y="140" fill="#FFFFFF" fontSize="15" fontWeight="bold">TRIANGLE</text>
            <text x="135" y="210" fill="#B71C1C" fontSize="14" fontWeight="bold">3 Straight Sides • 3 Corners</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // MONTESSORI: COUNTING
      // ----------------------------------------------------------------------
      case "counting_apple_1":
      case "counting_apple_2":
      case "counting_apple_3":
        const appleCount = action === "counting_apple_1" ? 1 : action === "counting_apple_2" ? 2 : 3;
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-lime-50">
            <ellipse cx="200" cy="180" rx="130" ry="40" fill="#8D6E63" stroke="#5D4037" strokeWidth="4" />
            <rect x="80" y="130" width="240" height="50" rx="20" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="3" />
            <g className="animate-bounce">
              {Array.from({ length: appleCount }).map((_, i) => (
                <g key={i} transform={`translate(${140 + i * 55}, 105)`}>
                  <circle cx="0" cy="0" r="22" fill="#E53935" stroke="#B71C1C" strokeWidth="3" />
                  <ellipse cx="-4" cy="-6" rx="6" ry="3" fill="#FFCDD2" />
                  <path d="M 0 -22 Q 4 -30 10 -26" stroke="#5D4037" strokeWidth="3" fill="none" />
                  <ellipse cx="6" cy="-28" rx="6" ry="3" fill="#4CAF50" />
                  <text x="-5" y="6" fill="#FFFFFF" fontSize="14" fontWeight="bold">{i + 1}</text>
                </g>
              ))}
            </g>
            <text x="135" y="225" fill="#33691E" fontSize="15" fontWeight="bold">
              {appleCount === 1 ? "1 Red Apple in the Basket" : `${appleCount} Shiny Red Apples!`}
            </text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // STATES OF MATTER: SOLID, LIQUID, GAS
      // ----------------------------------------------------------------------
      case "matter_solid_ice":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-cyan-50">
            <ellipse cx="200" cy="185" rx="140" ry="35" fill="#E0F7FA" stroke="#80DEEA" strokeWidth="3" />
            <g className="animate-pulse">
              <polygon points="170,75 230,75 250,115 190,115" fill="#81D4FA" stroke="#0288D1" strokeWidth="3" />
              <polygon points="190,115 250,115 250,165 190,165" fill="#4FC3F7" stroke="#0288D1" strokeWidth="3" />
              <polygon points="150,115 190,115 190,165 150,165" fill="#29B6F6" stroke="#0288D1" strokeWidth="3" />
              <polygon points="170,75 190,115 150,115 130,75" fill="#B3E5FC" stroke="#0288D1" strokeWidth="3" />
            </g>
            <text x="135" y="215" fill="#01579B" fontSize="14" fontWeight="bold">SOLID ICE • Holds Its Rigid Shape</text>
          </svg>
        );

      case "matter_liquid_water":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-blue-50">
            <ellipse cx="200" cy="175" rx="150" ry="40" fill="#0288D1" />
            <path d="M 70 175 Q 130 160 200 175 T 330 175" stroke="#81D4FA" strokeWidth="4" fill="none" />
            <g className="animate-bounce">
              <circle cx="160" cy="120" r="10" fill="#29B6F6" />
              <circle cx="200" cy="100" r="14" fill="#03A9F4" />
              <circle cx="240" cy="125" r="9" fill="#29B6F6" />
            </g>
            <text x="125" y="215" fill="#0D47A1" fontSize="14" fontWeight="bold">LIQUID WATER • Flows and Splashes</text>
          </svg>
        );

      case "matter_gas_steam":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-100">
            <rect x="140" y="160" width="120" height="40" rx="8" fill="#455A64" />
            <g className="animate-bounce">
              <path d="M 160 150 Q 150 110 170 70" stroke="#90A4AE" strokeWidth="5" strokeDasharray="6 6" fill="none" />
              <path d="M 200 150 Q 210 100 195 60" stroke="#78909C" strokeWidth="6" strokeDasharray="6 6" fill="none" />
              <path d="M 240 150 Q 230 110 245 70" stroke="#90A4AE" strokeWidth="5" strokeDasharray="6 6" fill="none" />
            </g>
            <text x="135" y="225" fill="#263238" fontSize="14" fontWeight="bold">GAS STEAM • Floats Freely in Air</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // MAGNETS & MAGNETIC POLES
      // ----------------------------------------------------------------------
      case "magnet_single_bar":
      case "magnet_attract_poles":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-900">
            <g className="animate-pulse">
              <rect x="70" y="95" width="110" height="50" rx="4" fill="#D32F2F" />
              <text x="110" y="128" fill="#FFFFFF" fontSize="20" fontWeight="bold">N</text>
              <rect x="220" y="95" width="110" height="50" rx="4" fill="#1976D2" />
              <text x="265" y="128" fill="#FFFFFF" fontSize="20" fontWeight="bold">S</text>
              <line x1="180" y1="120" x2="220" y2="120" stroke="#FFD54F" strokeWidth="4" strokeDasharray="5 4" />
            </g>
            <text x="115" y="200" fill="#FFE082" fontSize="14" fontWeight="bold">Opposite Poles Attract! (North + South)</text>
          </svg>
        );

      case "magnet_repel_poles":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-900">
            <rect x="50" y="95" width="110" height="50" rx="4" fill="#D32F2F" />
            <text x="95" y="128" fill="#FFFFFF" fontSize="20" fontWeight="bold">N</text>
            <rect x="240" y="95" width="110" height="50" rx="4" fill="#D32F2F" />
            <text x="285" y="128" fill="#FFFFFF" fontSize="20" fontWeight="bold">N</text>
            <g className="animate-bounce">
              <polygon points="175,120 190,110 190,130" fill="#FF5252" />
              <polygon points="225,120 210,110 210,130" fill="#FF5252" />
            </g>
            <text x="115" y="200" fill="#FF8A80" fontSize="14" fontWeight="bold">Like Poles Repel! (North pushes North)</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // ACIDS & BASES
      // ----------------------------------------------------------------------
      case "acid_litmus_red":
      case "base_litmus_blue":
      case "neutralization_salt":
        const isAcid = action === "acid_litmus_red";
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            {/* Glass Beaker */}
            <path d="M 140 60 L 140 170 Q 140 185 155 185 L 245 185 Q 260 185 260 170 L 260 60" fill="none" stroke="#90A4AE" strokeWidth="4" />
            <rect x="145" y="110" width="110" height="70" fill={isAcid ? "#E65100" : "#0D47A1"} opacity="0.75" />
            {/* Dipping Litmus Paper */}
            <rect x="185" y="40" width="30" height="110" rx="3" fill="#E0E0E0" stroke="#757575" strokeWidth="2" />
            <rect x="185" y="100" width="30" height="50" rx="2" fill={isAcid ? "#D32F2F" : "#1976D2"} className="animate-pulse" />
            <text x="105" y="220" fill={isAcid ? "#FFCDD2" : "#BBDEFB"} fontSize="13" fontWeight="bold">
              {isAcid ? "Acid: Blue Litmus turns RED!" : "Base: Red Litmus turns BLUE!"}
            </text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // HUMAN CIRCULATORY SYSTEM (CBSE GRADE 10)
      // ----------------------------------------------------------------------
      case "circulatory_four_chambers":
      case "circulatory_lung_oxygen":
      case "circulatory_body_pulse":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            <g className="animate-pulse">
              <path d="M 200 80 C 170 30, 110 50, 110 100 C 110 150, 200 200, 200 210 C 200 200, 290 150, 290 100 C 290 50, 230 30, 200 80 Z" fill="#D32F2F" stroke="#B71C1C" strokeWidth="4" />
              <line x1="200" y1="80" x2="200" y2="205" stroke="#FFFFFF" strokeWidth="3" />
              <line x1="130" y1="135" x2="270" y2="135" stroke="#FFFFFF" strokeWidth="3" />
              <text x="135" y="115" fill="#FFFFFF" fontSize="12" fontWeight="bold">RA</text>
              <text x="245" y="115" fill="#FFFFFF" fontSize="12" fontWeight="bold">LA</text>
              <text x="135" y="165" fill="#FFFFFF" fontSize="12" fontWeight="bold">RV</text>
              <text x="245" y="165" fill="#FFFFFF" fontSize="12" fontWeight="bold">LV</text>
            </g>
            <text x="105" y="230" fill="#FFCDD2" fontSize="13" fontWeight="bold">4 Heart Chambers: Atria (Top) & Ventricles (Bottom)</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // OHM'S LAW & ELECTRICITY (CBSE GRADE 10)
      // ----------------------------------------------------------------------
      case "circuit_battery_push":
      case "circuit_resistor_flow":
      case "circuit_bulb_light":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-900">
            {/* Circuit Wire Loop */}
            <rect x="70" y="50" width="260" height="130" rx="12" fill="none" stroke="#FFB300" strokeWidth="5" />
            {/* Battery on left */}
            <rect x="58" y="90" width="24" height="50" rx="4" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
            <text x="63" y="120" fill="#FFFFFF" fontSize="12" fontWeight="bold">V+</text>
            {/* Light bulb on right */}
            <g className="animate-pulse">
              <circle cx="330" cy="115" r="22" fill="#FFEE58" stroke="#F57F17" strokeWidth="3" />
              <text x="323" y="120" fill="#E65100" fontSize="12" fontWeight="bold">💡</text>
            </g>
            <text x="125" y="215" fill="#FFE082" fontSize="14" fontWeight="bold">Ohm's Law: Voltage (V) = I × R</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // TRIGONOMETRY (CBSE GRADE 10)
      // ----------------------------------------------------------------------
      case "trig_triangle_parts":
      case "trig_angle_view":
      case "trig_solve_height":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            {/* Right-angled triangle */}
            <polygon points="100,180 300,180 300,50" fill="#1E293B" stroke="#38BDF8" strokeWidth="4" />
            {/* 90 degree square */}
            <rect x="280" y="160" width="20" height="20" fill="none" stroke="#38BDF8" strokeWidth="2" />
            {/* Labels */}
            <text x="180" y="200" fill="#94A3B8" fontSize="12" fontWeight="bold">Adjacent (Base)</text>
            <text x="310" y="115" fill="#F43F5E" fontSize="12" fontWeight="bold">Opposite</text>
            <text x="160" y="105" fill="#34D399" fontSize="13" fontWeight="bold">Hypotenuse</text>
            <text x="105" y="230" fill="#7DD3FC" fontSize="13" fontWeight="bold">Right Triangle: sin(θ) = Opp / Hyp • tan(θ) = Opp / Adj</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // CBSE GRADE 10: CHEMICAL REACTIONS & EQUATIONS
      // ----------------------------------------------------------------------
      case "chem_reactants_ready":
      case "chem_bonds_rearrange":
      case "chem_product_water":
        const isRearrange = action === "chem_bonds_rearrange";
        const isWater = action === "chem_product_water";
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-900">
            {/* Lab Bench */}
            <rect x="0" y="195" width="400" height="45" fill="#334155" />
            <rect x="0" y="190" width="400" height="5" fill="#475569" />

            {!isWater ? (
              <g>
                {/* Beaker 1 */}
                <path d="M 80 80 L 80 185 Q 80 190 90 190 L 140 190 Q 150 190 150 185 L 150 80 Z" fill="none" stroke="#94A3B8" strokeWidth="4" />
                <rect x="84" y="120" width="62" height="68" fill="#38BDF8" opacity="0.6" rx="4" />
                {/* Beaker 2 */}
                <path d="M 250 80 L 250 185 Q 250 190 260 190 L 310 190 Q 320 190 320 185 L 320 80 Z" fill="none" stroke="#94A3B8" strokeWidth="4" />
                <rect x="254" y="120" width="62" height="68" fill="#F43F5E" opacity="0.6" rx="4" />
                
                {/* Reaction Spark / Atom Exchange */}
                {isRearrange ? (
                  <g className="animate-pulse">
                    <circle cx="200" cy="120" r="30" fill="#FBBF24" opacity="0.3" />
                    <text x="185" y="130" fill="#FDE047" fontSize="28" fontWeight="black">⚡</text>
                    <text x="125" y="60" fill="#FCD34D" fontSize="14" fontWeight="bold">Bonds Break & Rearrange!</text>
                  </g>
                ) : (
                  <text x="120" y="60" fill="#E2E8F0" fontSize="14" fontWeight="bold">Reactants Ready: 2H₂ + O₂</text>
                )}
              </g>
            ) : (
              <g className="animate-pulse">
                {/* Flask with Water Product */}
                <path d="M 180 70 L 180 100 L 130 180 Q 125 190 135 190 L 265 190 Q 275 190 270 180 L 220 100 L 220 70 Z" fill="none" stroke="#38BDF8" strokeWidth="4" />
                <path d="M 140 160 L 130 180 Q 125 190 135 190 L 265 190 Q 275 190 270 180 L 260 160 Z" fill="#0284C7" opacity="0.8" />
                {/* Bubbles */}
                <circle cx="180" cy="170" r="4" fill="#FFFFFF" className="animate-bounce" />
                <circle cx="220" cy="175" r="5" fill="#FFFFFF" className="animate-bounce" />
                <text x="110" y="55" fill="#38BDF8" fontSize="15" fontWeight="black">Product: 2H₂ + O₂ → 2H₂O (Water)</text>
              </g>
            )}
            <text x="100" y="222" fill="#E2E8F0" fontSize="13" fontWeight="bold">Law of Conservation of Mass: Atoms Recombined</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // CBSE GRADE 10: LIGHT REFLECTION & REFRACTION
      // ----------------------------------------------------------------------
      case "optics_mirror_reflection":
      case "optics_water_refraction":
      case "optics_convex_focus":
        const isRefract = action === "optics_water_refraction";
        const isFocus = action === "optics_convex_focus";
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            {!isFocus ? (
              <g>
                {/* Flat Mirror / Water Interface */}
                <line x1="40" y1="150" x2="360" y2="150" stroke={isRefract ? "#38BDF8" : "#94A3B8"} strokeWidth={isRefract ? 6 : 8} />
                {isRefract && <rect x="40" y="150" width="320" height="70" fill="#0284C7" opacity="0.3" />}
                {/* Normal Dotted Line */}
                <line x1="200" y1="50" x2="200" y2={isRefract ? 220 : 150} stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5 5" />
                <text x="205" y="70" fill="#94A3B8" fontSize="11">Normal (N)</text>

                {/* Incident Ray */}
                <line x1="90" y1="60" x2="200" y2="150" stroke="#FBBF24" strokeWidth="4" />
                <polygon points="145,105 140,95 152,100" fill="#FBBF24" />
                <text x="80" y="50" fill="#FCD34D" fontSize="12" fontWeight="bold">Incident Ray (∠i)</text>

                {/* Reflected / Refracted Ray */}
                {!isRefract ? (
                  <g>
                    <line x1="200" y1="150" x2="310" y2="60" stroke="#FBBF24" strokeWidth="4" />
                    <polygon points="255,105 260,95 248,100" fill="#FBBF24" />
                    <text x="240" y="50" fill="#FCD34D" fontSize="12" fontWeight="bold">Reflected Ray (∠r = ∠i)</text>
                    <text x="110" y="210" fill="#FFFFFF" fontSize="13" fontWeight="bold">Law of Reflection: Angle i = Angle r</text>
                  </g>
                ) : (
                  <g>
                    <line x1="200" y1="150" x2="270" y2="210" stroke="#38BDF8" strokeWidth="4" />
                    <polygon points="235,180 230,172 242,175" fill="#38BDF8" />
                    <text x="245" y="195" fill="#7DD3FC" fontSize="12" fontWeight="bold">Bent in Water (∠r)</text>
                    <text x="100" y="235" fill="#E2E8F0" fontSize="13" fontWeight="bold">Refraction: Light Bends Slower in Denser Medium</text>
                  </g>
                )}
              </g>
            ) : (
              <g className="animate-pulse">
                {/* Convex Lens */}
                <path d="M 190 40 Q 220 120 190 200 Q 160 120 190 40 Z" fill="#67E8F9" opacity="0.6" stroke="#06B6D4" strokeWidth="3" />
                {/* Incoming parallel rays */}
                <line x1="50" y1="80" x2="190" y2="80" stroke="#FBBF24" strokeWidth="3" />
                <line x1="50" y1="120" x2="190" y2="120" stroke="#FBBF24" strokeWidth="3" />
                <line x1="50" y1="160" x2="190" y2="160" stroke="#FBBF24" strokeWidth="3" />
                {/* Converging rays to focal point */}
                <line x1="190" y1="80" x2="330" y2="120" stroke="#FBBF24" strokeWidth="3" />
                <line x1="190" y1="120" x2="330" y2="120" stroke="#FBBF24" strokeWidth="3" />
                <line x1="190" y1="160" x2="330" y2="120" stroke="#FBBF24" strokeWidth="3" />
                <circle cx="330" cy="120" r="6" fill="#F43F5E" />
                <text x="325" y="145" fill="#F43F5E" fontSize="13" fontWeight="bold">F (Focus)</text>
                <text x="100" y="225" fill="#E2E8F0" fontSize="13" fontWeight="bold">Convex Lens Converges Light to a Sharp Point!</text>
              </g>
            )}
          </svg>
        );

      // ----------------------------------------------------------------------
      // CBSE GRADE 10: HEREDITY & GENETICS
      // ----------------------------------------------------------------------
      case "genetics_dna_helix":
      case "genetics_pea_cross":
      case "genetics_family_tree":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
            {/* DNA Rotating Spiral Strands */}
            <g className="animate-pulse">
              {[30, 70, 110, 150, 190, 230, 270, 310, 350].map((x, i) => {
                const y1 = 90 + Math.sin(i * 0.8) * 35;
                const y2 = 90 - Math.sin(i * 0.8) * 35;
                const color = i % 2 === 0 ? "#10B981" : "#3B82F6";
                return (
                  <g key={i}>
                    <line x1={x} y1={y1} x2={x} y2={y2} stroke="#CBD5E1" strokeWidth="3" />
                    <circle cx={x} cy={y1} r="6" fill={color} />
                    <circle cx={x} cy={y2} r="6" fill={i % 2 === 0 ? "#F59E0B" : "#EC4899"} />
                  </g>
                );
              })}
            </g>
            <rect x="70" y="160" width="260" height="30" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2" />
            <text x="90" y="180" fill="#E0E7FF" fontSize="12" fontWeight="bold">Base Pairs: Adenine-Thymine • Cytosine-Guanine</text>
            <text x="80" y="220" fill="#A5B4FC" fontSize="13" fontWeight="bold">DNA: The Genetic Code Passed Down Generations</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // MONTESSORI: THE FIVE SENSES
      // ----------------------------------------------------------------------
      case "senses_eyes_sight":
      case "senses_hear_smell":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-pink-50">
            <g className="animate-bounce">
              {/* Big Smiling Eye */}
              <ellipse cx="120" cy="100" rx="45" ry="28" fill="#FFFFFF" stroke="#BE185D" strokeWidth="4" />
              <circle cx="120" cy="100" r="16" fill="#0284C7" />
              <circle cx="120" cy="100" r="8" fill="#0F172A" />
              <circle cx="124" cy="96" r="4" fill="#FFFFFF" />
              <text x="95" y="150" fill="#9D174D" fontSize="13" fontWeight="bold">EYES (See)</text>
            </g>
            {/* Friendly Ear */}
            <g transform="translate(180, 70)">
              <path d="M 30 10 Q 55 10 50 35 Q 45 60 20 60 Q 35 40 30 30" fill="#FCE7F3" stroke="#BE185D" strokeWidth="4" />
              <text x="15" y="80" fill="#9D174D" fontSize="13" fontWeight="bold">EAR (Hear)</text>
            </g>
            {/* Flower with Smell Waves */}
            <g transform="translate(290, 80)" className="animate-pulse">
              <circle cx="30" cy="25" r="12" fill="#F43F5E" />
              <circle cx="15" cy="25" r="10" fill="#FDA4AF" />
              <circle cx="45" cy="25" r="10" fill="#FDA4AF" />
              <circle cx="30" cy="10" r="10" fill="#FDA4AF" />
              <circle cx="30" cy="40" r="10" fill="#FDA4AF" />
              <circle cx="30" cy="25" r="6" fill="#FDE047" />
              <text x="0" y="70" fill="#9D174D" fontSize="13" fontWeight="bold">NOSE (Smell)</text>
            </g>
            <text x="115" y="215" fill="#831843" fontSize="15" fontWeight="bold">Our 5 Senses Help Us Discover the World!</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // 4 NEW ACTIONS: AVIATION & ATMOSPHERIC OPTICS
      // ----------------------------------------------------------------------
      case "air_wing_lift":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-sky-950">
            {/* Sky backdrop */}
            <rect x="0" y="0" width="400" height="240" fill="#0C4A6E" />
            {/* Wing Airfoil Profile */}
            <g transform="translate(140, 100)">
              {/* Curved top, flatter bottom */}
              <path d="M 0 30 Q 30 0 80 10 Q 120 20 140 30 Q 80 34 0 30 Z" fill="#E2E8F0" stroke="#38BDF8" strokeWidth="4" />
              {/* Airflow Lines over Top (Fast airflow, Low Pressure) */}
              <g className="animate-pulse">
                <path d="M -60 5 Q 30 -25 100 -10 T 200 15" fill="none" stroke="#38BDF8" strokeWidth="3" strokeDasharray="6 4" />
                <path d="M -60 15 Q 30 -15 100 0 T 200 25" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeDasharray="6 4" />
                <text x="35" y="-12" fill="#BAE6FD" fontSize="11" fontWeight="bold">Fast Air • Low Pressure (P_low)</text>
              </g>
              {/* Airflow Lines under Bottom (Slower airflow, High Pressure) */}
              <g>
                <path d="M -60 45 Q 60 50 200 45" fill="none" stroke="#FDE047" strokeWidth="3" strokeDasharray="6 4" />
                <text x="30" y="65" fill="#FEF08A" fontSize="11" fontWeight="bold">Slow Air • High Pressure (P_high)</text>
              </g>
              {/* Massive Green LIFT Arrow */}
              <g className="animate-bounce">
                <line x1="70" y1="50" x2="70" y2="-40" stroke="#10B981" strokeWidth="6" />
                <polygon points="70,-55 60,-35 80,-35" fill="#10B981" />
                <text x="82" y="-35" fill="#34D399" fontSize="13" fontWeight="black">LIFT ↑</text>
              </g>
            </g>
            <text x="65" y="220" fill="#E0F2FE" fontSize="13" fontWeight="bold">Bernoulli's Principle: Higher pressure underneath lifts the wing!</text>
          </svg>
        );

      case "air_thrust_forward":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-900">
            {/* Speed clouds streaming backward */}
            <g className="animate-pulse">
              <line x1="50" y1="40" x2="20" y2="40" stroke="#64748B" strokeWidth="3" strokeDasharray="10 10" />
              <line x1="380" y1="70" x2="330" y2="70" stroke="#64748B" strokeWidth="3" strokeDasharray="10 10" />
              <line x1="350" y1="180" x2="290" y2="180" stroke="#64748B" strokeWidth="3" strokeDasharray="10 10" />
            </g>
            {/* Aerodynamic Jet Airplane */}
            <g transform="translate(160, 95)">
              {/* Jet Fuselage */}
              <path d="M 120 20 Q 80 5 0 10 Q -40 12 -60 20 Q -40 28 0 30 Q 80 35 120 20 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />
              {/* Swept Wings */}
              <polygon points="20,15 -20,-30 -35,-30 0,15" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
              <polygon points="20,25 -20,70 -35,70 0,25" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
              {/* Tail fin */}
              <polygon points="-40,15 -65,-15 -55,-15 -35,15" fill="#0284C7" />
              {/* Jet Engine Thrust Fire */}
              <g className="animate-bounce">
                <polygon points="-60,20 -105,15 -115,20 -105,25" fill="#F97316" />
                <polygon points="-60,20 -90,17 -95,20 -90,23" fill="#FDE047" />
              </g>
              {/* Forward THRUST Vector Arrow */}
              <g className="animate-pulse">
                <line x1="120" y1="20" x2="190" y2="20" stroke="#38BDF8" strokeWidth="5" />
                <polygon points="200,20 185,13 185,27" fill="#38BDF8" />
                <text x="135" y="10" fill="#38BDF8" fontSize="12" fontWeight="black">THRUST →</text>
              </g>
            </g>
            <text x="80" y="215" fill="#F8FAFC" fontSize="13" fontWeight="bold">Powerful Engines Push Forward (Thrust) Overcoming Drag!</text>
          </svg>
        );

      case "sky_scattering_blue":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-b from-sky-500 via-sky-300 to-amber-100">
            {/* The Sun */}
            <circle cx="50" cy="50" r="30" fill="#FBBF24" stroke="#F59E0B" strokeWidth="4" className="animate-pulse" />
            {/* Earth Surface Curve */}
            <ellipse cx="200" cy="270" rx="250" ry="80" fill="#15803D" stroke="#166534" strokeWidth="4" />
            <text x="180" y="225" fill="#FFFFFF" fontSize="12" fontWeight="bold">Earth Surface</text>

            {/* Atmosphere layer indicator */}
            <path d="M 0 170 Q 200 130 400 170" fill="none" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 4" />
            <text x="270" y="150" fill="#0369A1" fontSize="10" fontWeight="bold">Atmosphere (N₂ & O₂ Gas)</text>

            {/* Sunlight rays: Red passes straight, Blue scatters in circles */}
            <g>
              {/* Straight Red/Yellow Ray */}
              <line x1="75" y1="65" x2="220" y2="195" stroke="#EF4444" strokeWidth="4" opacity="0.8" />
              <text x="100" y="140" fill="#B91C1C" fontSize="10" fontWeight="bold">Long Red Rays Pass Straight</text>
              
              {/* Scattered Blue Waves (Rayleigh Scattering) */}
              <g className="animate-ping" opacity="0.6">
                <circle cx="150" cy="90" r="14" fill="none" stroke="#0284C7" strokeWidth="3" />
                <circle cx="230" cy="80" r="18" fill="none" stroke="#0284C7" strokeWidth="3" />
                <circle cx="310" cy="95" r="16" fill="none" stroke="#0284C7" strokeWidth="3" />
              </g>
              <g className="animate-pulse">
                <circle cx="150" cy="90" r="6" fill="#0284C7" />
                <circle cx="230" cy="80" r="6" fill="#0284C7" />
                <circle cx="310" cy="95" r="6" fill="#0284C7" />
                <text x="170" y="70" fill="#075985" fontSize="12" fontWeight="black">Blue Waves Scatter Everywhere!</text>
              </g>
            </g>
            <text x="60" y="210" fill="#082F49" fontSize="13" fontWeight="bold">Rayleigh Scattering: Tiny air particles scatter short blue waves in all directions!</text>
          </svg>
        );

      case "sunlight_prism_spectrum":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-slate-950">
            {/* White light beam entering */}
            <line x1="30" y1="120" x2="160" y2="120" stroke="#FFFFFF" strokeWidth="6" />
            <polygon points="120,120 100,113 100,127" fill="#FFFFFF" />
            <text x="35" y="105" fill="#FFFFFF" fontSize="12" fontWeight="bold">White Sunlight</text>

            {/* Glass Triangular Prism */}
            <polygon points="200,45 150,175 250,175" fill="#0284C7" opacity="0.3" stroke="#38BDF8" strokeWidth="3" />
            <polygon points="200,45 150,175 250,175" fill="none" stroke="#E2E8F0" strokeWidth="2" />
            <text x="180" y="140" fill="#BAE6FD" fontSize="12" fontWeight="bold">Prism</text>

            {/* Separated Spectrum Rays fan out */}
            <g className="animate-pulse">
              <line x1="210" y1="110" x2="360" y2="60" stroke="#EF4444" strokeWidth="3" />
              <text x="365" y="65" fill="#EF4444" fontSize="10" fontWeight="bold">Red (Long λ)</text>

              <line x1="210" y1="115" x2="360" y2="85" stroke="#F97316" strokeWidth="3" />
              <line x1="210" y1="120" x2="360" y2="110" stroke="#FDE047" strokeWidth="3" />
              <line x1="210" y1="125" x2="360" y2="135" stroke="#22C55E" strokeWidth="3" />
              
              <line x1="210" y1="130" x2="360" y2="160" stroke="#06B6D4" strokeWidth="4" />
              <line x1="210" y1="135" x2="360" y2="185" stroke="#3B82F6" strokeWidth="5" />
              <line x1="210" y1="140" x2="360" y2="210" stroke="#8B5CF6" strokeWidth="5" />
              <text x="365" y="195" fill="#60A5FA" fontSize="11" fontWeight="black">Blue / Violet (Short λ)</text>
            </g>
            <text x="70" y="230" fill="#F8FAFC" fontSize="12" fontWeight="bold">White light splits into all rainbow colors: Blue bends and scatters most!</text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // TOPIC-SPECIFIC FINAL SCENES (NO GENERIC SPARKLES)
      // ----------------------------------------------------------------------
      case "airplane_cruising_flight":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100">
            {/* Drifting Clouds in Background */}
            <g opacity="0.65" className="animate-pulse">
              <ellipse cx="60" cy="65" rx="35" ry="14" fill="#FFFFFF" />
              <ellipse cx="85" cy="60" rx="25" ry="18" fill="#FFFFFF" />
              <ellipse cx="320" cy="180" rx="55" ry="18" fill="#FFFFFF" />
              <ellipse cx="350" cy="175" rx="30" ry="22" fill="#FFFFFF" />
            </g>

            {/* Cruising Airplane Body */}
            <g transform="translate(140, 95)">
              {/* Airplane Main Fuselage */}
              <ellipse cx="50" cy="15" rx="75" ry="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              <polygon points="120,15 135,15 130,19 115,19" fill="#0284C7" />
              {/* Tail Fin */}
              <polygon points="-15,12 -5,-18 10,12" fill="#0284C7" />
              {/* Cockpit Windows */}
              <path d="M 100 11 Q 115 14 110 17 Z" fill="#0369A1" />
              {/* Wings */}
              <polygon points="20,15 45,-12 65,15" fill="#E2E8F0" stroke="#0284C7" strokeWidth="2" />
              <polygon points="20,15 45,35 65,15" fill="#CBD5E1" stroke="#0284C7" strokeWidth="2" />
              {/* Jet Engine Pod with Propulsion Trail */}
              <rect x="35" y="22" width="22" height="9" rx="3" fill="#475569" />
              <ellipse cx="34" cy="26" rx="8" ry="4" fill="#38BDF8" opacity="0.75" />
            </g>

            {/* Aerodynamic Equilibrium Force Vectors (Lift, Weight, Thrust, Drag) */}
            {/* LIFT: Green Arrow Up */}
            <g>
              <line x1="190" y1="90" x2="190" y2="28" stroke="#10B981" strokeWidth="4" />
              <polygon points="190,20 183,32 197,32" fill="#10B981" />
              <rect x="155" y="10" width="70" height="18" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="1" />
              <text x="162" y="23" fill="#047857" fontSize="11" fontWeight="bold">Lift (Up)</text>
            </g>

            {/* WEIGHT: Amber Arrow Down */}
            <g>
              <line x1="190" y1="125" x2="190" y2="185" stroke="#F59E0B" strokeWidth="4" />
              <polygon points="190,192 183,180 197,180" fill="#F59E0B" />
              <rect x="145" y="196" width="90" height="18" rx="4" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1" />
              <text x="150" y="209" fill="#B45309" fontSize="11" fontWeight="bold">Weight (Gravity)</text>
            </g>

            {/* THRUST: Cyan Arrow Forward */}
            <g>
              <line x1="270" y1="110" x2="355" y2="110" stroke="#06B6D4" strokeWidth="4" />
              <polygon points="362,110 350,103 350,117" fill="#06B6D4" />
              <rect x="280" y="86" width="75" height="18" rx="4" fill="#ECFEFF" stroke="#06B6D4" strokeWidth="1" />
              <text x="286" y="99" fill="#0E7490" fontSize="11" fontWeight="bold">Thrust (Engines)</text>
            </g>

            {/* DRAG: Red Arrow Backward */}
            <g>
              <line x1="120" y1="110" x2="45" y2="110" stroke="#EF4444" strokeWidth="3" strokeDasharray="5 3" />
              <polygon points="38,110 50,104 50,116" fill="#EF4444" />
              <rect x="42" y="86" width="65" height="18" rx="4" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1" />
              <text x="48" y="99" fill="#B91C1C" fontSize="11" fontWeight="bold">Drag (Air)</text>
            </g>

            {/* Bottom Status Banner */}
            <rect x="30" y="218" width="340" height="18" rx="5" fill="#0F172A" opacity="0.85" />
            <text x="50" y="231" fill="#F8FAFC" fontSize="11" fontWeight="bold">
              Steady Flight Equilibrium: Lift = Weight and Thrust = Drag
            </text>
          </svg>
        );

      case "sky_blue_daylight":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-b from-sky-600 via-sky-400 to-sky-200">
            {/* Bright Daytime Sun */}
            <circle cx="65" cy="55" r="26" fill="#FBBF24" stroke="#F59E0B" strokeWidth="3" />
            <g className="animate-pulse">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <line
                  key={i}
                  x1={65 + 30 * Math.cos((deg * Math.PI) / 180)}
                  y1={55 + 30 * Math.sin((deg * Math.PI) / 180)}
                  x2={65 + 40 * Math.cos((deg * Math.PI) / 180)}
                  y2={55 + 40 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#FDE047"
                  strokeWidth="2.5"
                />
              ))}
            </g>
            <text x="35" y="100" fill="#FEF08A" fontSize="10" fontWeight="bold">Sunlight</text>

            {/* Scattered Blue Wavelength Waves Filling Sky Dome */}
            <g className="animate-pulse" opacity="0.85">
              <path d="M 120 40 Q 140 30 160 40 T 200 40 T 240 40 T 280 40" stroke="#38BDF8" strokeWidth="2.5" fill="none" />
              <path d="M 100 70 Q 120 60 140 70 T 180 70 T 220 70 T 260 70 T 300 70" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
              <path d="M 140 100 Q 160 90 180 100 T 220 100 T 260 100 T 300 100 T 340 100" stroke="#38BDF8" strokeWidth="3" fill="none" />
              <path d="M 80 130 Q 100 120 120 130 T 160 130 T 200 130 T 240 130 T 280 130" stroke="#93C5FD" strokeWidth="2" fill="none" />
            </g>

            {/* Atmosphere Scatter Indicator Label */}
            <rect x="180" y="45" width="190" height="24" rx="6" fill="#0369A1" opacity="0.9" stroke="#38BDF8" strokeWidth="1" />
            <text x="188" y="61" fill="#FFFFFF" fontSize="11" fontWeight="bold">
              Rayleigh Scattered Blue Waves
            </text>

            {/* White Cumulus Clouds */}
            <g opacity="0.9">
              <ellipse cx="320" cy="120" rx="30" ry="14" fill="#FFFFFF" />
              <ellipse cx="340" cy="115" rx="20" ry="16" fill="#FFFFFF" />
              <ellipse cx="305" cy="122" rx="18" ry="10" fill="#FFFFFF" />
            </g>

            {/* Earth Horizon / Green Landscape */}
            <path d="M 0 180 Q 150 160 400 180 L 400 240 L 0 240 Z" fill="#15803D" />
            <path d="M 0 195 Q 220 175 400 200 L 400 240 L 0 240 Z" fill="#166534" opacity="0.7" />

            {/* Observers Looking Up at the Blue Sky */}
            <g transform="translate(190, 155)">
              <circle cx="10" cy="10" r="6" fill="#FEF3C7" />
              <line x1="10" y1="16" x2="10" y2="35" stroke="#1E293B" strokeWidth="4" />
              <line x1="10" y1="22" x2="2" y2="12" stroke="#1E293B" strokeWidth="3" />
              <line x1="10" y1="22" x2="18" y2="12" stroke="#1E293B" strokeWidth="3" />
              <line x1="10" y1="35" x2="5" y2="48" stroke="#0F172A" strokeWidth="3" />
              <line x1="10" y1="35" x2="15" y2="48" stroke="#0F172A" strokeWidth="3" />
            </g>

            <rect x="25" y="216" width="350" height="18" rx="5" fill="#0F172A" opacity="0.85" />
            <text x="35" y="229" fill="#E0F2FE" fontSize="11" fontWeight="bold">
              Result: Short blue wavelengths scatter in all directions, coloring our entire daytime sky
            </text>
          </svg>
        );

      case "topic_synthesis_summary":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
            {/* Header Concept Badge */}
            <rect x="20" y="16" width="360" height="30" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
            <text x="200" y="36" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">
              Concept Synthesis: {concept || currentScene.title}
            </text>

            {/* 3 Interconnected Diagrammatic Steps */}
            {/* Step 1: Fundamental Starting Cause */}
            <rect x="25" y="65" width="105" height="95" rx="8" fill="#1E1B4B" stroke="#6366F1" strokeWidth="1.5" />
            <circle cx="77" cy="90" r="14" fill="#4338CA" />
            <text x="77" y="95" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
            <text x="77" y="118" fill="#C7D2FE" fontSize="10" fontWeight="bold" textAnchor="middle">Starting</text>
            <text x="77" y="132" fill="#E0E7FF" fontSize="10" fontWeight="bold" textAnchor="middle">Conditions</text>

            {/* Arrow 1 -> 2 */}
            <line x1="135" y1="112" x2="155" y2="112" stroke="#38BDF8" strokeWidth="3" />
            <polygon points="158,112 150,107 150,117" fill="#38BDF8" />

            {/* Step 2: Physical / Natural Transformation */}
            <rect x="160" y="65" width="105" height="95" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="1.5" />
            <circle cx="212" cy="90" r="14" fill="#047857" />
            <text x="212" y="95" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
            <text x="212" y="118" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">Active</text>
            <text x="212" y="132" fill="#D1FAE5" fontSize="10" fontWeight="bold" textAnchor="middle">Process</text>

            {/* Arrow 2 -> 3 */}
            <line x1="270" y1="112" x2="290" y2="112" stroke="#38BDF8" strokeWidth="3" />
            <polygon points="293,112 285,107 285,117" fill="#38BDF8" />

            {/* Step 3: Observed Educational Outcome */}
            <rect x="295" y="65" width="85" height="95" rx="8" fill="#701A75" stroke="#EC4899" strokeWidth="1.5" />
            <circle cx="337" cy="90" r="14" fill="#BE185D" />
            <text x="337" y="95" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
            <text x="337" y="118" fill="#FBCFE8" fontSize="10" fontWeight="bold" textAnchor="middle">Observable</text>
            <text x="337" y="132" fill="#FCE7F3" fontSize="10" fontWeight="bold" textAnchor="middle">Outcome</text>

            {/* Bottom Key Principle Summary */}
            <rect x="20" y="175" width="360" height="48" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1" />
            <text x="35" y="194" fill="#38BDF8" fontSize="11" fontWeight="bold">
              Pedagogical Takeaway:
            </text>
            <text x="35" y="210" fill="#E2E8F0" fontSize="10" fontWeight="medium">
              {currentScene.caption || currentScene.description}
            </text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // UNIVERSAL PROCEDURAL STAGE (ANSWERS ANY OPEN-DOMAIN TOPIC)
      // ----------------------------------------------------------------------
      case "generic_stage_intro":
      case "generic_stage_process":
      case "generic_stage_result":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-56 rounded-xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950">
            {/* Structured Topic Card replacing generic sparkles */}
            <rect x="30" y="20" width="340" height="40" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
            <text x="200" y="45" fill="#34D399" fontSize="14" fontWeight="bold" textAnchor="middle">
              {currentScene.title}
            </text>

            {/* Visual Process Flow Elements */}
            <g transform="translate(80, 80)">
              <rect x="0" y="0" width="90" height="60" rx="8" fill="#1E293B" stroke="#60A5FA" strokeWidth="1.5" />
              <text x="45" y="25" fill="#93C5FD" fontSize="10" fontWeight="bold" textAnchor="middle">Step Process</text>
              <circle cx="45" cy="42" r="10" fill="#3B82F6" />
              <text x="45" y="46" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">⚙</text>

              <line x1="100" y1="30" x2="140" y2="30" stroke="#34D399" strokeWidth="3" />
              <polygon points="145,30 137,25 137,35" fill="#34D399" />

              <rect x="150" y="0" width="90" height="60" rx="8" fill="#1E293B" stroke="#34D399" strokeWidth="1.5" />
              <text x="195" y="25" fill="#A7F3D0" fontSize="10" fontWeight="bold" textAnchor="middle">Observation</text>
              <circle cx="195" cy="42" r="10" fill="#10B981" />
              <text x="195" y="46" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">✓</text>
            </g>

            {/* Grounded Caption Footer */}
            <rect x="30" y="165" width="340" height="55" rx="8" fill="#0F172A" opacity="0.9" />
            <text x="45" y="185" fill="#F8FAFC" fontSize="11" fontWeight="bold">
              Curriculum Grounded Concept:
            </text>
            <text x="45" y="205" fill="#A7F3D0" fontSize="10" fontWeight="medium">
              {currentScene.caption || "Multi-Modal Inclusive Representation"}
            </text>
          </svg>
        );

      // ----------------------------------------------------------------------
      // DYNAMIC FALLBACK STAGE
      // ----------------------------------------------------------------------
      default:
        return (
          <div className="w-full h-56 rounded-xl bg-gradient-to-br from-indigo-50 to-emerald-50 flex flex-col items-center justify-center p-6 text-center border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-emerald-600 mb-3 animate-pulse">
              <Sparkles size={32} />
            </div>
            <h4 className="text-base font-extrabold text-slate-800">
              {currentScene.title || "Visual Learning Step"}
            </h4>
            <p className="text-xs text-slate-600 max-w-md mt-1 font-medium">
              {currentScene.description || "Interactive educational visual for this concept."}
            </p>
          </div>
        );
    }
  };

  return (
    <div className={`rounded-2xl shadow-sm border transition-all p-5 ${
      isHighContrast ? "bg-slate-950 border-amber-400 text-white" : "bg-white border-slate-200"
    }`}>
      {/* Header, Tracker, & Cognitive Pacing Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              Micro-Learning Animation
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {concept}
            </span>
          </div>
          <h3 className={`text-lg font-bold mt-1 ${isHighContrast ? "text-amber-300" : "text-slate-800"}`}>
            Scene {currentSceneIdx + 1} of {activeScenes.length}: {currentScene.title}
          </h3>
        </div>

        {/* Cognitive Pacing & Contrast Toggles */}
        <div className="flex items-center gap-2">
          {/* Pacing Speed Selector (Key Down Syndrome Accessibility Mechanism) */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <span className="text-[11px] font-bold text-slate-500 px-1.5 flex items-center gap-1" title="Cognitive pacing adjustment for working memory">
              <Gauge size={13} /> Pace:
            </span>
            {[
              { label: "0.5x Slow", val: 0.5, desc: "Pedagogically paced for Down syndrome processing (Wishart, 2001)" },
              { label: "0.75x", val: 0.75, desc: "Gentle step pace" },
              { label: "1.0x", val: 1.0, desc: "Standard speed" }
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setPlaybackSpeed(p.val)}
                title={p.desc}
                className={`px-2 py-0.5 text-xs font-bold rounded-lg transition ${
                  playbackSpeed === p.val
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={() => setIsHighContrast(!isHighContrast)}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition ${
              isHighContrast
                ? "bg-amber-400 text-slate-950 border-amber-400 font-extrabold"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            }`}
            title="Toggle High Contrast Mode"
          >
            {isHighContrast ? "High Contrast ON" : "Contrast"}
          </button>
        </div>
      </div>

      {/* Visual Scrubber Timeline Bar */}
      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3 flex cursor-pointer" title="Click any segment to jump">
        {activeScenes.map((s, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentSceneIdx(idx)}
            className={`h-full flex-1 transition-all border-r border-white/40 ${
              idx === currentSceneIdx
                ? "bg-emerald-600"
                : idx < currentSceneIdx
                ? "bg-emerald-400"
                : "bg-slate-300 hover:bg-slate-400"
            }`}
          />
        ))}
      </div>

      {/* Visual Canvas Stage */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200">
        {renderVisualStage(currentScene.animation_action)}

        {/* Caption Bar with Audio Read-Aloud (Dual Modality) */}
        <div className={`p-3.5 flex items-center justify-between gap-3 ${
          isHighContrast ? "bg-amber-400 text-slate-950" : "bg-slate-900/95 text-white"
        }`}>
          <p className="text-base font-semibold tracking-wide flex-1 text-center sm:text-left">
            {currentScene.caption || currentScene.description}
          </p>

          <button
            onClick={handleSpeakCaption}
            className={`p-2 rounded-lg transition shrink-0 ${
              isSpeaking
                ? "bg-emerald-500 text-white animate-pulse"
                : isHighContrast
                ? "bg-slate-950 text-amber-300 hover:bg-slate-900"
                : "bg-slate-800 text-slate-200 hover:bg-slate-700"
            }`}
            title="Read caption aloud (Web Speech API)"
            aria-label="Read caption aloud"
          >
            <Volume2 size={18} />
          </button>
        </div>
      </div>

      {/* Playback Controls & Status */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleRestart}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
            isHighContrast ? "text-amber-300 hover:bg-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <RotateCcw size={15} /> Replay
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentSceneIdx === 0}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
            title="Previous Scene"
            aria-label="Previous Scene"
          >
            <SkipBack size={19} className={isHighContrast ? "text-amber-300" : ""} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition shadow-sm text-sm"
          >
            {isPlaying ? (
              <>
                <Pause size={17} /> Pause
              </>
            ) : (
              <>
                <Play size={17} /> Play Story
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            disabled={currentSceneIdx === activeScenes.length - 1}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent"
            title="Next Scene"
            aria-label="Next Scene"
          >
            <SkipForward size={19} className={isHighContrast ? "text-amber-300" : ""} />
          </button>
        </div>

        <div className={`text-xs font-medium ${isHighContrast ? "text-amber-300" : "text-slate-500"}`}>
          {isPlaying ? `Playing (${playbackSpeed}x)...` : "Paused"}
        </div>
      </div>
    </div>
  );
}
