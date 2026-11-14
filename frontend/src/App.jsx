import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LearnerProfileSelector from "./components/LearnerProfileSelector";
import TopicSelector from "./components/TopicSelector";
import LessonDisplay from "./components/LessonDisplay";
import AssessmentView from "./components/AssessmentView";
import AdaptationBanner from "./components/AdaptationBanner";
import StudentAnalyticsDashboard from "./components/StudentAnalyticsDashboard";
import ProgressTracker from "./components/ProgressTracker";
import DynamicSVGPlayer from "./components/DynamicSVGPlayer";
import SignLanguageStudio from "./components/SignLanguageStudio";
import TeacherUploadModal from "./components/TeacherUploadModal";

import CustomLearnerModal from "./components/CustomLearnerModal";
import VivaTourModal from "./components/VivaTourModal";
import InteractiveChatPanel from "./components/InteractiveChatPanel";

import {
  fetchHealth,
  fetchHardware,
  fetchLearners,
  fetchCurriculumTopics,
  generateLesson,
  generateAIAnimatedLesson,
  evaluateAssessment,
  getAdaptedLesson
} from "./services/api";


export default function App() {
  const [health, setHealth] = useState(null);
  const [hardware, setHardware] = useState(null);
  const [learners, setLearners] = useState([]);
  const [activeLearnerId, setActiveLearnerId] = useState("down_syndrome_demo_learner");
  const [topics, setTopics] = useState([]);
  const [currentView, setCurrentView] = useState("lesson"); // "lesson", "ai_animation", "signs", "progress", or "analytics"

  // AI Animation Studio State

  const [aiAnimLesson, setAiAnimLesson] = useState(null);
  const [isLoadingAIAnim, setIsLoadingAIAnim] = useState(false);
  const [aiAnimQuery, setAiAnimQuery] = useState("How Airplanes Fly");

  // Active Lesson State

  const [currentConcept, setCurrentConcept] = useState("Photosynthesis");
  const [lesson, setLesson] = useState(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  const [adaptationInfo, setAdaptationInfo] = useState(null);

  // Assessment State
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [attemptNumber, setAttemptNumber] = useState(1);

  // Accessibility State
  const [highContrast, setHighContrast] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showCustomLearnerModal, setShowCustomLearnerModal] = useState(false);
  const [showVivaTour, setShowVivaTour] = useState(false);

  // 1. Initial Load: System info, profiles, topics, and initial lesson
  useEffect(() => {
    async function init() {
      try {
        const [hData, hwData, lData, tData] = await Promise.all([
          fetchHealth().catch(() => null),
          fetchHardware().catch(() => null),
          fetchLearners().catch(() => []),
          fetchCurriculumTopics().catch(() => [])
        ]);

        if (hData) setHealth(hData);
        if (hwData) setHardware(hwData);
        if (lData && lData.length > 0) setLearners(lData);
        if (tData) setTopics(tData);

        // Load initial demo lesson
        loadLesson("Photosynthesis", "down_syndrome_demo_learner");
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }
    init();
  }, []);

  const activeLearner = learners.find((l) => l.learner_id === activeLearnerId) || learners[0];

  // 2. Load or Regenerate Lesson
  const loadLesson = async (conceptQuery, learnerId = activeLearnerId, overrideAction = null) => {
    setIsLoadingLesson(true);
    setEvaluationResult(null);
    setAttemptNumber(1);
    try {
      const data = await generateLesson({
        learner_id: learnerId,
        concept_or_query: conceptQuery,
        override_action: overrideAction
      });
      setLesson(data);
      setCurrentConcept(data.concept);
      if (overrideAction) {
        setAdaptationInfo(data.adaptation_metadata);
      } else {
        setAdaptationInfo(null);
      }
    } catch (err) {
      console.error("Failed to generate lesson:", err);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  // 3. Switch Learner Profile (Demonstrates: Same Knowledge -> Different Representation)
  const handleSelectLearner = (learnerId) => {
    setActiveLearnerId(learnerId);
    loadLesson(currentConcept, learnerId);
  };

  const handleCustomProfileCreated = (newProfile) => {
    if (!newProfile) return;
    setLearners((prev) => {
      const exists = prev.some((l) => l.learner_id === newProfile.learner_id);
      return exists
        ? prev.map((l) => (l.learner_id === newProfile.learner_id ? newProfile : l))
        : [...prev, newProfile];
    });
    handleSelectLearner(newProfile.learner_id);
  };

  // 4. Viva Quick-Launch Scenario Handler
  const handleRunVivaScenario = (sc) => {
    if (sc.view) {
      setCurrentView(sc.view);
      return;
    }
    setCurrentView("lesson");
    const targetLearner = sc.learnerId || activeLearnerId;
    setActiveLearnerId(targetLearner);
    if (sc.concept) {
      loadLesson(sc.concept, targetLearner);
    }
  };

  // Generate AI-Specified Animation
  const handleGenerateAIAnimation = async (queryText = aiAnimQuery) => {
    setIsLoadingAIAnim(true);
    try {
      const data = await generateAIAnimatedLesson({
        learner_id: activeLearnerId,
        concept_or_query: queryText
      });
      setAiAnimLesson(data);
      setAiAnimQuery(queryText);
    } catch (err) {
      console.error("AI animation generation error:", err);
    } finally {
      setIsLoadingAIAnim(false);
    }
  };


  // 4. Handle Question / Topic Search
  const handleSearchQuestion = (query) => {
    loadLesson(query, activeLearnerId);
  };

  // 5. Evaluate Assessment Answer
  const handleEvaluateAnswer = async ({ question_id, learner_answer, expected_answer }) => {
    setIsEvaluating(true);
    try {
      const result = await evaluateAssessment({
        learner_id: activeLearnerId,
        concept: currentConcept,
        question_id,
        learner_answer,
        expected_answer,
        attempt_number: attemptNumber
      });
      setEvaluationResult(result);

      // Save record to local progress tracking history
      try {
        const rawHistory = localStorage.getItem("ai-tutor-history");
        const historyList = rawHistory ? JSON.parse(rawHistory) : [];
        historyList.unshift({
          timestamp: Date.now(),
          concept: currentConcept,
          learner_id: activeLearnerId,
          learner_answer,
          expected_answer,
          is_correct: result?.is_correct || false,
          attempt_number: attemptNumber,
          is_ai_generated: lesson?.is_ai_generated || false
        });
        localStorage.setItem("ai-tutor-history", JSON.stringify(historyList.slice(0, 100)));
      } catch (err) {
        console.warn("Could not save progress:", err);
      }
    } catch (err) {

      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // 6. Trigger Adaptation (Adaptive Regeneration on Error or Next Step)
  const handleTriggerAdaptation = async ({ action }) => {
    if (action === "continue") {
      // Advance to water cycle or next concept
      const next = currentConcept.toLowerCase().includes("photo") ? "Water Cycle" : "Photosynthesis";
      loadLesson(next, activeLearnerId);
      return;
    }

    // Trigger adaptation engine
    setIsLoadingLesson(true);
    try {
      const nextAttempt = attemptNumber + 1;
      setAttemptNumber(nextAttempt);

      const adaptedData = await getAdaptedLesson({
        learner_id: activeLearnerId,
        concept: currentConcept,
        evaluation_result: {
          is_correct: false,
          attempt_number: attemptNumber
        },
        current_representation: lesson?.representation || "visual"
      });

      setLesson(adaptedData);
      setAdaptationInfo(adaptedData.adaptation_metadata);
      setEvaluationResult(null); // Clear previous evaluation for retry
    } catch (err) {
      console.error("Adaptation error:", err);
    } finally {
      setIsLoadingLesson(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors ${highContrast ? "bg-black text-yellow-300" : "bg-slate-50 text-slate-800"}`}>
      <Navbar
        hardware={hardware}
        health={health}
        activeLearner={activeLearner}
        highContrast={highContrast}
        onToggleContrast={() => setHighContrast(!highContrast)}
        onOpenUploadModal={() => setShowUploadModal(true)}
        onOpenVivaTour={() => setShowVivaTour(true)}
        currentView={currentView}
        onSelectView={(v) => setCurrentView(v)}
      />


      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Learner Profile Selector */}
        <LearnerProfileSelector
          activeLearner={activeLearner}
          learners={learners}
          onSelectLearner={handleSelectLearner}
          onOpenCustomModal={() => setShowCustomLearnerModal(true)}
        />

        {/* View Switcher: 5 Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setCurrentView("lesson")}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentView === "lesson"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            📖 Adaptive Lesson Studio
          </button>
          <button
            onClick={() => {
              setCurrentView("signs");
            }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition flex items-center gap-1.5 ${
              currentView === "signs"
                ? "bg-indigo-700 text-white shadow-sm ring-2 ring-indigo-300"
                : "text-indigo-700 bg-indigo-50 hover:bg-indigo-100 font-bold"
            }`}
          >
            🤟 Predefined Sign Shapes (75)
          </button>
          <button
            onClick={() => {
              setCurrentView("ai_animation");
              if (!aiAnimLesson) handleGenerateAIAnimation(currentConcept || "How Airplanes Fly");
            }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition flex items-center gap-1.5 ${
              currentView === "ai_animation"
                ? "bg-purple-700 text-white shadow-sm"
                : "text-purple-700 bg-purple-50 hover:bg-purple-100"
            }`}
          >
            ✨ AI Animation Studio
          </button>
          <button
            onClick={() => setCurrentView("progress")}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentView === "progress"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            📈 Student Progress Tracker
          </button>
          <button
            onClick={() => setCurrentView("analytics")}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentView === "analytics"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            📊 Adaptation History
          </button>
        </div>

        {currentView === "signs" && (
          <SignLanguageStudio isHighContrast={highContrast} />
        )}


        {currentView === "analytics" && (
          <StudentAnalyticsDashboard
            learnerId={activeLearnerId}
            learnerName={activeLearner?.name}
            topics={topics}
          />
        )}

        {currentView === "progress" && (
          <ProgressTracker
            learnerId={activeLearnerId}
            learnerName={activeLearner?.name}
          />
        )}

        {currentView === "ai_animation" && (
          <div className="space-y-6">
            {/* Topic Input Bar */}
            <div className="bg-white rounded-2xl p-5 border border-purple-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                    AI-Generated SVG Animation Studio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gemini AI generates SVG shapes, paths, and keyframes dynamically on-the-fly.
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 font-bold">
                  Phase 2 Live
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiAnimQuery}
                  onChange={(e) => setAiAnimQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateAIAnimation(aiAnimQuery)}
                  placeholder="Enter any concept (e.g. Gravity, How Airplanes Fly, Water Cycle)..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={() => handleGenerateAIAnimation(aiAnimQuery)}
                  disabled={isLoadingAIAnim || !aiAnimQuery.trim()}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-sm transition shadow-sm"
                >
                  {isLoadingAIAnim ? "Generating SVG..." : "Generate AI Animation"}
                </button>
              </div>

              {/* Sample Topic Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-400 self-center mr-1">Try:</span>
                {[
                  "How Airplanes Fly",
                  "Why is the sky blue?",
                  "Newton's Laws of Motion",
                  "Photosynthesis",
                  "Cell Biology",
                  "Chemical Bonds"
                ].map((sTopic) => (
                  <button
                    key={sTopic}
                    onClick={() => {
                      setAiAnimQuery(sTopic);
                      handleGenerateAIAnimation(sTopic);
                    }}
                    className="text-xs px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 font-semibold transition"
                  >
                    {sTopic}
                  </button>
                ))}
              </div>
            </div>

            {isLoadingAIAnim ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-purple-200 shadow-sm space-y-4">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">
                  Generating AI SVG Animation for "{aiAnimQuery}"...
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  The LLM is synthesising visual elements, spatial coordinates, and CSS keyframe motions compliant with inclusive learner requirements.
                </p>
              </div>
            ) : aiAnimLesson ? (
              <div className="space-y-6">
                <DynamicSVGPlayer
                  scenes={aiAnimLesson.scenes}
                  concept={aiAnimLesson.concept}
                  generationMethod={aiAnimLesson.generation_method}
                  isHighContrast={highContrast}
                  autoPlay={false}
                />

                {/* Explanation Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-slate-900">Concept Explanation</h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {aiAnimLesson.explanation}
                  </p>

                  {aiAnimLesson.key_points && aiAnimLesson.key_points.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Key Takeaways</p>
                      <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                        {aiAnimLesson.key_points.map((pt, i) => (
                          <li key={i}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {currentView === "lesson" && (
          <>
            {/* Question Ask Bar & Topics */}
            <TopicSelector
              onSearch={handleSearchQuestion}
              isSearching={isLoadingLesson}
              topics={topics}
            />

            {/* Adaptation Notification Banner */}
            <AdaptationBanner adaptationInfo={adaptationInfo} />

            {/* Lesson View & Interactive Modules */}
            {isLoadingLesson ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
                <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">
                  Adapting Lesson For {activeLearner?.name || "Learner"}...
                </h3>
                <p className="text-xs text-slate-500">
                  Retrieving curriculum knowledge & synthesizing accessibility-aware representation.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <LessonDisplay
                  lesson={lesson}
                  learnerProfile={activeLearner}
                  isHighContrast={highContrast}
                />

                {/* Assessment & Adaptive Check */}
                {lesson?.assessment && (
                  <AssessmentView
                    assessment={lesson.assessment}
                    concept={currentConcept}
                    learnerProfile={activeLearner}
                    onEvaluateAnswer={handleEvaluateAnswer}
                    onTriggerAdaptation={handleTriggerAdaptation}
                    isEvaluating={isEvaluating}
                    evaluationResult={evaluationResult}
                  />
                )}
              </div>
            )}
          </>
        )}

      </main>

      {/* Floating Grounded Tutoring Chat */}
      <InteractiveChatPanel
        learnerId={activeLearnerId}
        learnerType={activeLearner?.learner_type}
        currentConcept={currentConcept}
      />

      {/* Teacher Dynamic Curriculum Upload Modal */}
      <TeacherUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadSuccess={(newConcept) => {
          fetchCurriculumTopics().then((t) => setTopics(t));
          loadLesson(newConcept, activeLearnerId);
        }}
      />

      {/* Custom Learner Persona Modal */}
      <CustomLearnerModal
        isOpen={showCustomLearnerModal}
        onClose={() => setShowCustomLearnerModal(false)}
        onProfileCreated={handleCustomProfileCreated}
      />

      {/* Examiner Viva Defense Tour Modal */}
      <VivaTourModal
        isOpen={showVivaTour}
        onClose={() => setShowVivaTour(false)}
        onRunScenario={handleRunVivaScenario}
      />
    </div>
  );
}
