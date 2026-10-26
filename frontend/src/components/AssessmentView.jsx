import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, ArrowRight, HelpCircle } from "lucide-react";

export default function AssessmentView({
  assessment,
  concept,
  learnerProfile,
  onEvaluateAnswer,
  onTriggerAdaptation,
  isEvaluating,
  evaluationResult
}) {
  const [selectedOption, setSelectedOption] = useState("");
  const [typedAnswer, setTypedAnswer] = useState("");
  const [showHint, setShowHint] = useState(false);

  if (!assessment) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-slate-500">
        No assessment question available for this lesson.
      </div>
    );
  }

  const currentAnswer = selectedOption || typedAnswer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentAnswer.trim() || isEvaluating) return;

    onEvaluateAnswer({
      question_id: assessment.question_id,
      learner_answer: currentAnswer.trim(),
      expected_answer: assessment.expected_answer,
    });
  };

  const isDownSyndrome = learnerProfile?.learner_type === "down_syndrome";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Sparkles size={20} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Quick Check
            </span>
            <h3 className="text-lg font-bold text-slate-900">Check Your Understanding</h3>
          </div>
        </div>

        {assessment.hint && (
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition"
          >
            <HelpCircle size={15} /> {showHint ? "Hide Hint" : "Need a Hint?"}
          </button>
        )}
      </div>

      {showHint && assessment.hint && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
          💡 <strong>Hint:</strong> {assessment.hint}
        </div>
      )}

      {/* Question Prompt */}
      <div className="mb-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
        <p className="text-base font-semibold text-slate-800">
          {assessment.question}
        </p>
      </div>

      {/* Options or Answer Input */}
      {!evaluationResult && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {assessment.options && assessment.options.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assessment.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedOption(opt)}
                  className={`p-4 rounded-xl text-left font-semibold text-sm transition-all border-2 flex items-center justify-between ${
                    selectedOption === opt
                      ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedOption === opt
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-slate-300"
                    }`}
                  >
                    {selectedOption === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Your Answer
              </label>
              <input
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 font-medium"
              />
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={!currentAnswer.trim() || isEvaluating}
              className="px-6 py-2.5 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition shadow-sm flex items-center gap-2"
            >
              {isEvaluating ? (
                <>
                  <RefreshCw size={16} className="animate-spin" /> Checking...
                </>
              ) : (
                "Submit Answer"
              )}
            </button>
          </div>
        </form>
      )}

      {/* Evaluation Feedback & Adaptive Action */}
      {evaluationResult && (
        <div
          className={`p-5 rounded-xl border-2 transition-all ${
            evaluationResult.is_correct
              ? "bg-emerald-50 border-emerald-500 text-emerald-950"
              : "bg-amber-50 border-amber-500 text-amber-950"
          }`}
        >
          <div className="flex items-start gap-3">
            {evaluationResult.is_correct ? (
              <CheckCircle2 size={28} className="text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={28} className="text-amber-600 shrink-0 mt-0.5" />
            )}

            <div className="space-y-2 flex-1">
              <h4 className="text-lg font-extrabold">
                {evaluationResult.is_correct ? "Understood!" : "Let's Learn Another Way"}
              </h4>
              <p className="text-sm font-medium leading-relaxed">
                {evaluationResult.feedback}
              </p>

              <div className="text-xs text-slate-600 pt-1">
                <span>Expected: <strong>{evaluationResult.expected_answer}</strong></span>
                <span className="mx-2">•</span>
                <span>Your answer: <strong>{evaluationResult.learner_answer}</strong></span>
                <span className="mx-2">•</span>
                <span>Match score: <strong>{(evaluationResult.similarity_score * 100).toFixed(0)}%</strong></span>
              </div>

              {/* Action buttons based on result */}
              <div className="pt-3 flex flex-wrap gap-3">
                {evaluationResult.is_correct ? (
                  <button
                    onClick={() => onTriggerAdaptation({ action: "continue" })}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition"
                  >
                    Great! Next Concept <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={() => onTriggerAdaptation({ action: evaluationResult.recommended_action })}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition shadow-sm animate-pulse"
                  >
                    <RefreshCw size={16} />
                    {isDownSyndrome
                      ? "Show Me The Simple Story Again"
                      : "Regenerate With Visual & Sign Support"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
