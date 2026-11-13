import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Volume2, Sparkles, Zap, Eye, Gauge } from "lucide-react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function interpolateKeyframes(keyframes, elapsedMs) {
  if (!keyframes || keyframes.length === 0) return {};
  if (keyframes.length === 1) return keyframes[0];
  if (elapsedMs <= keyframes[0].t_ms) return keyframes[0];
  if (elapsedMs >= keyframes[keyframes.length - 1].t_ms) {
    return keyframes[keyframes.length - 1];
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (elapsedMs >= k1.t_ms && elapsedMs <= k2.t_ms) {
      const span = k2.t_ms - k1.t_ms || 1;
      const alpha = Math.max(0, Math.min(1, (elapsedMs - k1.t_ms) / span));
      const res = {};

      const numericKeys = ["x", "y", "opacity", "scale", "rotate_deg", "stroke_width"];
      for (const k of numericKeys) {
        if (typeof k1[k] === "number" && typeof k2[k] === "number") {
          res[k] = lerp(k1[k], k2[k], alpha);
        } else if (typeof k2[k] === "number") {
          res[k] = k2[k];
        } else if (typeof k1[k] === "number") {
          res[k] = k1[k];
        }
      }
      res.fill = alpha > 0.5 && k2.fill ? k2.fill : (k1.fill || undefined);
      res.stroke = alpha > 0.5 && k2.stroke ? k2.stroke : (k1.stroke || undefined);
      return res;
    }
  }
  return keyframes[keyframes.length - 1];
}

export default function DynamicSVGPlayer({
  scenes = [],
  concept = "AI-Generated Concept",
  generationMethod = "gemini_ai_animation",
  isHighContrast = false,
  autoPlay = false
}) {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sceneElapsedMs, setSceneElapsedMs] = useState(0);

  const animFrameRef = useRef(null);
  const lastTimestampRef = useRef(null);

  const activeScenes = scenes && scenes.length > 0 ? scenes : [
    {
      scene_index: 1,
      title: "AI Animation Scene",
      caption: "Scene generating or ready to play.",
      duration_ms: 4000,
      canvas_width: 800,
      canvas_height: 400,
      background_color: "#0f172a",
      elements: [
        {
          id: "placeholder_circle",
          type: "circle",
          x: 400,
          y: 200,
          r: 60,
          fill: "#3b82f6",
          opacity: 1.0,
          keyframes: [
            { t_ms: 0, opacity: 0, scale: 0.5 },
            { t_ms: 2000, opacity: 1, scale: 1.0 }
          ]
        }
      ]
    }
  ];

  const currentScene = activeScenes[currentSceneIdx] || activeScenes[0];
  const totalDurationMs = currentScene.duration_ms || 4000;

  // Scene animation loop via requestAnimationFrame
  useEffect(() => {
    if (!isPlaying) {
      lastTimestampRef.current = null;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = (now) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = now;
      const delta = (now - lastTimestampRef.current) * playbackSpeed;
      lastTimestampRef.current = now;

      setSceneElapsedMs((prev) => {
        const next = prev + delta;
        if (next >= totalDurationMs) {
          if (currentSceneIdx < activeScenes.length - 1) {
            setCurrentSceneIdx((idx) => idx + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return totalDurationMs;
          }
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, currentSceneIdx, activeScenes.length, totalDurationMs]);

  // Reset elapsed time when scene changes
  useEffect(() => {
    setSceneElapsedMs(0);
    lastTimestampRef.current = null;
  }, [currentSceneIdx]);

  const handleNext = () => {
    if (currentSceneIdx < activeScenes.length - 1) {
      setCurrentSceneIdx((idx) => idx + 1);
    }
  };

  const handlePrev = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((idx) => idx - 1);
    }
  };

  const handleRestart = () => {
    setCurrentSceneIdx(0);
    setSceneElapsedMs(0);
    setIsPlaying(true);
  };

  const handleSpeak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const textToSpeak = currentScene.narration_text || currentScene.caption || currentScene.title || "";
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = playbackSpeed * 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Render individual SVG element with interpolated keyframe transforms
  const renderSVGElement = (el) => {
    const elDuration = el.animation_duration_ms || totalDurationMs;
    const effectiveElapsed = el.animation_loop ? (sceneElapsedMs % elDuration) : sceneElapsedMs;
    const interp = interpolateKeyframes(el.keyframes || [], effectiveElapsed);

    const baseFill = interp.fill || el.fill || "#3b82f6";
    const baseStroke = interp.stroke || el.stroke || undefined;
    const strokeWidth = interp.stroke_width !== undefined ? interp.stroke_width : (el.stroke_width || 2);
    const opacity = interp.opacity !== undefined ? interp.opacity : (el.opacity !== undefined ? el.opacity : 1.0);

    const scale = interp.scale !== undefined ? interp.scale : 1.0;
    const rotate = interp.rotate_deg !== undefined ? interp.rotate_deg : 0;
    const dx = interp.x !== undefined ? (interp.x - (el.x || 0)) : 0;
    const dy = interp.y !== undefined ? (interp.y - (el.y || 0)) : 0;

    const transform = `translate(${dx}, ${dy}) scale(${scale}) rotate(${rotate}, ${el.x || 400}, ${el.y || 200})`;

    const commonProps = {
      id: el.id,
      fill: baseFill,
      stroke: baseStroke,
      strokeWidth: strokeWidth,
      opacity: opacity,
      transform: (dx !== 0 || dy !== 0 || scale !== 1.0 || rotate !== 0) ? transform : undefined,
      style: { transition: "opacity 0.1s linear" }
    };

    switch (el.type) {
      case "circle":
        return <circle key={el.id} cx={el.x || 0} cy={el.y || 0} r={el.r || 40} {...commonProps} />;

      case "rect":
        return (
          <rect
            key={el.id}
            x={el.x || 0}
            y={el.y || 0}
            width={el.width || 100}
            height={el.height || 60}
            rx={8}
            {...commonProps}
          />
        );

      case "ellipse":
        return <ellipse key={el.id} cx={el.x || 0} cy={el.y || 0} rx={el.rx || 50} ry={el.ry || 30} {...commonProps} />;

      case "line":
        return <line key={el.id} x1={el.x1 || 0} y1={el.y1 || 0} x2={el.x2 || 100} y2={el.y2 || 100} {...commonProps} />;

      case "arrow": {
        const x1 = el.x1 || 0;
        const y1 = el.y1 || 0;
        const x2 = el.x2 || 100;
        const y2 = el.y2 || 100;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const arrowLen = 14;
        const p1x = x2 - arrowLen * Math.cos(angle - Math.PI / 6);
        const p1y = y2 - arrowLen * Math.sin(angle - Math.PI / 6);
        const p2x = x2 - arrowLen * Math.cos(angle + Math.PI / 6);
        const p2y = y2 - arrowLen * Math.sin(angle + Math.PI / 6);

        return (
          <g key={el.id} opacity={opacity}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={baseFill} strokeWidth={strokeWidth} strokeLinecap="round" />
            <polygon points={`${x2},${y2} ${p1x},${p1y} ${p2x},${p2y}`} fill={baseFill} />
            {el.label && (
              <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 8} fill={baseFill} fontSize={12} textAnchor="middle" fontWeight="bold">
                {el.label}
              </text>
            )}
          </g>
        );
      }

      case "path":
        return <path key={el.id} d={el.d || "M0,0"} {...commonProps} />;

      case "polygon":
        return <polygon key={el.id} points={el.points || "0,0"} {...commonProps} />;

      case "polyline":
        return <polyline key={el.id} points={el.points || "0,0"} fill="none" {...commonProps} />;

      case "text":
        return (
          <text
            key={el.id}
            x={el.x || 0}
            y={el.y || 0}
            fontSize={el.font_size || 16}
            fontWeight={el.font_weight || "normal"}
            textAnchor="middle"
            {...commonProps}
          >
            {el.text_content || el.label || ""}
          </text>
        );

      default:
        return null;
    }
  };

  const cWidth = currentScene.canvas_width || 800;
  const cHeight = currentScene.canvas_height || 400;
  const bgColor = isHighContrast ? "#000000" : (currentScene.background_color || "#0f172a");
  const progressPercent = Math.min(100, (sceneElapsedMs / totalDurationMs) * 100);

  return (
    <div className={`rounded-2xl border overflow-hidden shadow-lg transition-all ${
      isHighContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-900 border-slate-700 text-white"
    }`}>
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            AI-Generated Animation
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {generationMethod === "gemini_ai_animation" ? "Gemini 2.5 Dynamic SVG" : "Adaptive Fallback Spec"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-300">
            Scene {currentSceneIdx + 1} of {activeScenes.length}
          </span>
          <div className="flex gap-1">
            {[0.5, 0.75, 1.0].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd)}
                className={`px-2 py-0.5 text-xs font-bold rounded transition ${
                  playbackSpeed === spd
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Animation Stage Canvas */}
      <div className="relative w-full aspect-[2/1] max-h-[460px] flex items-center justify-center bg-black/40">
        <svg
          viewBox={`0 0 ${cWidth} ${cHeight}`}
          className="w-full h-full select-none"
          style={{ backgroundColor: bgColor }}
        >
          <title>{currentScene.accessibility_description || currentScene.caption || concept}</title>
          <defs>
            <radialGradient id="aiGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </radialGradient>
          </defs>

          {/* Render All Elements */}
          {(currentScene.elements || []).map((el) => renderSVGElement(el))}
        </svg>

        {/* Scene progress bar along bottom of canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-purple-500 transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Caption & Controls Area */}
      <div className="p-5 bg-slate-950/80 space-y-4">
        {/* Caption */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-purple-300">{currentScene.title}</h4>
            <p className="text-sm text-slate-200 font-medium leading-relaxed">
              {currentScene.caption}
            </p>
          </div>

          <button
            onClick={handleSpeak}
            className={`p-2.5 rounded-xl border transition ${
              isSpeaking
                ? "bg-purple-600 text-white border-purple-400 animate-pulse"
                : "bg-slate-800 text-slate-300 hover:text-white border-slate-700"
            }`}
            title="Read scene narration out loud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Playback Controls & Scrubber */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentSceneIdx === 0}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2 transition shadow-md shadow-purple-600/30"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              onClick={handleNext}
              disabled={currentSceneIdx === activeScenes.length - 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="Restart animation from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Scene Scrubber Dots */}
          <div className="flex items-center gap-1.5">
            {activeScenes.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSceneIdx(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === currentSceneIdx
                    ? "w-7 bg-purple-500"
                    : idx < currentSceneIdx
                    ? "w-2.5 bg-purple-800"
                    : "w-2.5 bg-slate-700 hover:bg-slate-600"
                }`}
                title={`Jump to Scene ${idx + 1}: ${sc.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
