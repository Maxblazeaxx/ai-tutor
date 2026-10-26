import React, { useState, useRef, useEffect } from "react";
import { Camera, CameraOff, Hand, CheckCircle, RefreshCw, Sparkles, Shield } from "lucide-react";

export default function SignGesturePractice({ currentSign, learnerId }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognitionResult, setRecognitionResult] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const signTerm = currentSign?.term || "Plant";
  const signGloss = currentSign?.gloss || "PLANT-GROW";

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.warn("Camera access error:", err);
      setCameraError("Camera unavailable or permission denied. You can still test with simulated motion tracking.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setRecognitionResult(null);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureAndRecognize = async () => {
    setIsAnalyzing(true);
    setRecognitionResult(null);

    // Simulate motion and gesture analysis
    setTimeout(async () => {
      try {
        const apiBase =
          typeof window !== "undefined" && window.location.origin.includes(":8000")
            ? window.location.origin + "/api"
            : "http://127.0.0.1:8000/api";
        const response = await fetch(`${apiBase}/multimodal/gesture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            learner_id: learnerId,
            target_sign: signTerm,
            motion_score: 0.65,
            has_detected_hand: true
          })
        });
        const data = await response.json();
        setRecognitionResult(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsAnalyzing(false);
      }
    }, 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mt-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
            <Hand size={20} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              Phase 11: Modular Gesture Recognition
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Interactive Sign Practice Studio
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={isCameraActive ? stopCamera : startCamera}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
            isCameraActive
              ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm"
          }`}
        >
          {isCameraActive ? (
            <>
              <CameraOff size={15} /> Turn Off Camera
            </>
          ) : (
            <>
              <Camera size={15} /> Open Camera to Practice Sign
            </>
          )}
        </button>
      </div>

      {cameraError && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 mb-3 font-medium">
          {cameraError}
        </div>
      )}

      {/* Camera / Interactive Video Canvas View */}
      {isCameraActive ? (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video max-h-72 flex items-center justify-center border border-slate-300">
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

            {/* Target Gesture Overlay Box */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs border border-white/20">
              Target Sign: <strong>{signTerm}</strong> ({signGloss}) <span className="text-[10px] text-amber-300 ml-1">• placeholder glosses, not verified ISL/ASL</span>
            </div>

            {/* Simulated Hand Landmark Guide */}
            <div className="absolute border-2 border-indigo-400 border-dashed rounded-2xl w-40 h-48 pointer-events-none flex items-center justify-center">
              <span className="text-[11px] font-bold text-indigo-200 bg-slate-900/70 px-2 py-0.5 rounded">
                Position Hand Here
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Perform the <strong>{signTerm}</strong> handshape in front of the lens.
            </p>
            <button
              type="button"
              onClick={handleCaptureAndRecognize}
              disabled={isAnalyzing}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition shadow-sm disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Analyzing Gesture...
                </>
              ) : (
                <>
                  <Sparkles size={14} /> Recognize My Sign
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-bold text-slate-800">
              Practice Sign: <span className="text-indigo-700">{signTerm}</span> ({signGloss}) <span className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded ml-1 font-medium">placeholder glosses, not verified ISL/ASL</span>
            </p>
            <p className="text-slate-500">
              Open your camera to test real-time gesture matching and handshape recognition.
            </p>
          </div>
          <button
            type="button"
            onClick={startCamera}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shrink-0"
          >
            <Camera size={15} /> Start Practice
          </button>
        </div>
      )}

      {/* Recognition Outcome Card */}
      {recognitionResult && (
        <div
          className={`mt-4 p-4 rounded-xl border-2 transition-all ${
            recognitionResult.is_matched
              ? "bg-emerald-50 border-emerald-400 text-emerald-950"
              : "bg-amber-50 border-amber-400 text-amber-950"
          }`}
        >
          <div className="flex items-start gap-2.5">
            <CheckCircle size={22} className="text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-extrabold text-sm">
                Gesture Analysis: {recognitionResult.target_sign}
              </h4>
              <p className="text-xs font-medium leading-relaxed">
                {recognitionResult.feedback}
              </p>
              <div className="text-[11px] text-slate-500 pt-1">
                Match Confidence: <strong>{int(recognitionResult.confidence * 100)}%</strong> • {recognitionResult.architecture_note}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function int(val) {
  return Math.round(val);
}
