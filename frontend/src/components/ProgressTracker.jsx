import React, { useState, useEffect } from "react";
import { Award, CheckCircle2, XCircle, TrendingUp, Download, Calendar, Flame, BookOpen } from "lucide-react";

export default function ProgressTracker({ learnerId, learnerName = "Learner" }) {
  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState("all"); // all, correct, needs_review

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ai-tutor-history");
      if (raw) {
        const parsed = JSON.parse(raw);
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (e) {
      console.warn("Failed to load learning history:", e);
    }
  }, []);

  const totalAttempts = history.length;
  const correctCount = history.filter((h) => h.is_correct).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;

  // Compute Streak: Consecutive days with at least one record
  const streakDays = React.useMemo(() => {
    if (history.length === 0) return 0;
    const daysSet = new Set(
      history.map((h) => new Date(h.timestamp || Date.now()).toDateString())
    );
    return daysSet.size;
  }, [history]);

  // Aggregate stats per concept for pure SVG bar chart
  const conceptStats = React.useMemo(() => {
    const map = {};
    history.forEach((item) => {
      const c = item.concept || "Unknown";
      if (!map[c]) map[c] = { total: 0, correct: 0 };
      map[c].total += 1;
      if (item.is_correct) map[c].correct += 1;
    });

    return Object.entries(map).map(([concept, data]) => ({
      concept,
      total: data.total,
      correct: data.correct,
      rate: Math.round((data.correct / data.total) * 100)
    }));
  }, [history]);

  const filteredHistory = history.filter((h) => {
    if (filter === "correct") return h.is_correct;
    if (filter === "needs_review") return !h.is_correct;
    return true;
  });

  const handleExportHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai_tutor_progress_${learnerId || "history"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearHistory = () => {
    if (confirm("Reset learning progress history? This will clear local records.")) {
      localStorage.removeItem("ai-tutor-history");
      setHistory([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Quizzes</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalAttempts}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Accuracy</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{accuracy}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Days Streak</p>
            <p className="text-2xl font-black text-amber-500 mt-1">{streakDays} Day{streakDays === 1 ? "" : "s"}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Concepts Explored</p>
            <p className="text-2xl font-black text-purple-600 mt-1">{conceptStats.length}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Accuracy By Concept (SVG Bar Chart) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Concept Mastery Distribution</h3>
            <p className="text-xs text-slate-500">Accuracy rate per concept studied</p>
          </div>
          <div className="text-xs font-semibold text-slate-400">Pure SVG Rendered</div>
        </div>

        {conceptStats.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            No quiz attempts yet. Complete a quiz to view your mastery graph!
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            {conceptStats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span className="truncate max-w-[280px]">{item.concept}</span>
                  <span>{item.rate}% ({item.correct}/{item.total})</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.rate >= 80
                        ? "bg-emerald-500"
                        : item.rate >= 50
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                    style={{ width: `${item.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent History Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900">Learning Activity Log</h3>
            <p className="text-xs text-slate-500">Chronological history of adaptive attempts</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-lg transition ${filter === "all" ? "bg-white text-slate-900 shadow-sm" : ""}`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("correct")}
                className={`px-3 py-1 rounded-lg transition ${filter === "correct" ? "bg-white text-emerald-700 shadow-sm" : ""}`}
              >
                Correct
              </button>
              <button
                onClick={() => setFilter("needs_review")}
                className={`px-3 py-1 rounded-lg transition ${filter === "needs_review" ? "bg-white text-rose-700 shadow-sm" : ""}`}
              >
                Retried
              </button>
            </div>

            <button
              onClick={handleExportHistory}
              disabled={history.length === 0}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition disabled:opacity-40"
              title="Download Progress as JSON"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-sm">
            No entries found matching filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Concept</th>
                  <th className="py-2.5 px-3">Answer Given</th>
                  <th className="py-2.5 px-3">Attempt</th>
                  <th className="py-2.5 px-3">Source</th>
                  <th className="py-2.5 px-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredHistory.slice(0, 15).map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/60 transition">
                    <td className="py-2.5 px-3">
                      {h.is_correct ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-600 font-bold">
                          <XCircle className="w-3.5 h-3.5" /> Retried
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{h.concept}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{h.learner_answer || "—"}</td>
                    <td className="py-2.5 px-3 font-semibold">#{h.attempt_number || 1}</td>
                    <td className="py-2.5 px-3">
                      {h.is_ai_generated ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                          AI-Gen
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                          Curriculum
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {h.timestamp ? new Date(h.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Recent"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {history.length > 0 && (
          <div className="pt-3 flex justify-end">
            <button
              onClick={handleClearHistory}
              className="text-xs text-slate-400 hover:text-rose-600 transition underline"
            >
              Clear Progress History
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
