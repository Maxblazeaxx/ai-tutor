const API_BASE =
  typeof window !== "undefined" && window.location.origin.includes(":8000")
    ? window.location.origin + "/api"
    : "http://127.0.0.1:8000/api";

export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/health`);
  return res.json();
}

export async function fetchHardware() {
  const res = await fetch(`${API_BASE}/hardware`);
  return res.json();
}

export async function fetchCurriculumTopics() {
  const res = await fetch(`${API_BASE}/curriculum/topics`);
  return res.json();
}

export async function fetchLearners() {
  const res = await fetch(`${API_BASE}/learners`);
  return res.json();
}

export async function createOrUpdateLearner(profileData) {
  const res = await fetch(`${API_BASE}/learners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });
  return res.json();
}

export async function generateLesson({ learner_id, concept_or_query, preferred_output, override_action }) {
  const res = await fetch(`${API_BASE}/lesson/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      learner_id,
      concept_or_query,
      preferred_output,
      override_action,
    }),
  });
  return res.json();
}

export async function evaluateAssessment({ learner_id, concept, question_id, learner_answer, expected_answer, attempt_number }) {
  const res = await fetch(`${API_BASE}/assessment/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      learner_id,
      concept,
      question_id,
      learner_answer,
      expected_answer,
      attempt_number,
    }),
  });
  return res.json();
}

export async function getAdaptedLesson({ learner_id, concept, evaluation_result, current_representation }) {
  const res = await fetch(`${API_BASE}/adaptation/next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      learner_id,
      concept,
      evaluation_result,
      current_representation,
    }),
  });
  return res.json();
}

export async function sendChatMessage({ learner_id, message }) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ learner_id, message }),
  });
  return res.json();
}
