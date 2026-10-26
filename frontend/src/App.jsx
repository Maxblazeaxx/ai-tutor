import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LearnerProfileSelector from "./components/LearnerProfileSelector";
import TopicSelector from "./components/TopicSelector";
import LessonDisplay from "./components/LessonDisplay";
import AssessmentView from "./components/AssessmentView";
import AdaptationBanner from "./components/AdaptationBanner";
import StudentAnalyticsDashboard from "./components/StudentAnalyticsDashboard";
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
  evaluateAssessment,
  getAdaptedLesson
} from "./services/api";

export default function App() {
  const [health, setHealth] = useState(null);
  const [hardware, setHardware] = useState(null);
  const [learners, setLearners] = useState([]);
  const [activeLearnerId, setActiveLearnerId] = useState("down_syndrome_demo_learner");
  const [topics, setTopics] = useState([]);
  const [currentView, setCurrentView] = useState("lesson"); // "lesson" or "analytics"

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
      />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Learner Profile Selector */}
        <LearnerProfileSelector
          activeLearner={activeLearner}
          learners={learners}
          onSelectLearner={handleSelectLearner}
          onOpenCustomModal={() => setShowCustomLearnerModal(true)}
        />

        {/* View Switcher: Lesson Studio vs Analytics */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
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
            onClick={() => setCurrentView("analytics")}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
              currentView === "analytics"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            📊 Learning Progress & Adaptation History
          </button>
        </div>

        {currentView === "analytics" ? (
          <StudentAnalyticsDashboard
            learnerId={activeLearnerId}
            learnerName={activeLearner?.name}
            topics={topics}
          />
        ) : (
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
