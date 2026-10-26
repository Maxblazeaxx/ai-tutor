import React, { useState } from "react";
import { PlusCircle, Upload, CheckCircle2, X, Sparkles } from "lucide-react";

export default function TeacherUploadModal({ isOpen, onClose, onUploadSuccess }) {
  const [concept, setConcept] = useState("");
  const [subject, setSubject] = useState("Science");
  const [gradeLevel, setGradeLevel] = useState(5);
  const [standardExp, setStandardExp] = useState("");
  const [simplifiedExp, setSimplifiedExp] = useState("");
  const [keyPoint1, setKeyPoint1] = useState("");
  const [keyPoint2, setKeyPoint2] = useState("");
  const [assessmentQ, setAssessmentQ] = useState("");
  const [expectedAns, setExpectedAns] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!concept.trim() || !standardExp.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    const payload = {
      subject,
      grade_level: Number(gradeLevel),
      topic: `${subject} Curriculum`,
      concept: concept.trim(),
      standard_explanation: standardExp.trim(),
      simplified_explanation: simplifiedExp.trim() || standardExp.trim(),
      key_points: [keyPoint1, keyPoint2].filter(Boolean),
      visual_scenes: [
        {
          scene: 1,
          title: `Exploring ${concept}`,
          description: `Visual walkthrough of ${concept}.`,
          animation_action: "sun_glow",
          caption: `Step 1: Introduction to ${concept}.`,
          duration_seconds: 4
        }
      ],
      sign_glossary: [
        {
          term: concept.trim(),
          gloss: concept.toUpperCase().replace(" ", "-"),
          description: `Sign gesture for ${concept}.`,
          asset_placeholder: `sign_${concept.toLowerCase()}.svg`
        }
      ],
      assessment_questions: [
        {
          question_id: `${concept.toLowerCase().replace(" ", "_")}_q1`,
          concept: concept.trim(),
          question: assessmentQ.trim() || `What is the primary function of ${concept}?`,
          expected_answer: expectedAns.trim() || concept.trim(),
          options: [expectedAns.trim() || concept.trim(), "Incorrect option A", "Incorrect option B", "None of these"],
          hint: `Recall the main definition of ${concept}.`
        }
      ]
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/curriculum/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setStatusMessage({ type: "success", text: data.message });
        if (onUploadSuccess) onUploadSuccess(concept.trim());
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setStatusMessage({ type: "error", text: data.detail || "Upload failed." });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Network connection error." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <PlusCircle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">Add Curriculum Document</h3>
              <p className="text-xs text-slate-500">Teacher Studio: Real-time dynamic RAG vector indexing</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
            <X size={20} />
          </button>
        </div>

        {statusMessage && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-rose-50 text-rose-900 border border-rose-200"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Concept Name *</label>
              <input
                type="text"
                required
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="e.g. Human Heart Circulation"
                className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Environmental">Environmental</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Standard Scientific Explanation *</label>
            <textarea
              required
              rows={3}
              value={standardExp}
              onChange={(e) => setStandardExp(e.target.value)}
              placeholder="Full scientific explanation grounded in curriculum standards..."
              className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Simplified Explanation (for Down syndrome pathway)</label>
            <textarea
              rows={2}
              value={simplifiedExp}
              onChange={(e) => setSimplifiedExp(e.target.value)}
              placeholder="Short sentences, concrete nouns, simple words..."
              className="w-full px-3 py-2 border rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Key Learning Point 1</label>
              <input
                type="text"
                value={keyPoint1}
                onChange={(e) => setKeyPoint1(e.target.value)}
                placeholder="Core factual statement"
                className="w-full px-3 py-2 border rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Key Learning Point 2</label>
              <input
                type="text"
                value={keyPoint2}
                onChange={(e) => setKeyPoint2(e.target.value)}
                placeholder="Second key takeaway"
                className="w-full px-3 py-2 border rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Assessment Question</label>
              <input
                type="text"
                value={assessmentQ}
                onChange={(e) => setAssessmentQ(e.target.value)}
                placeholder="e.g. Which organ pumps blood?"
                className="w-full px-3 py-2 border rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Expected Answer</label>
              <input
                type="text"
                value={expectedAns}
                onChange={(e) => setExpectedAns(e.target.value)}
                placeholder="e.g. Heart"
                className="w-full px-3 py-2 border rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !concept.trim() || !standardExp.trim()}
              className="px-6 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm flex items-center gap-2"
            >
              <Upload size={14} />
              {isSubmitting ? "Indexing in RAG..." : "Index Concept"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
