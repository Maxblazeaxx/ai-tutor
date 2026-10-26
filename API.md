# API Documentation

All API endpoints are prefixed with `/api` and return typed JSON responses.

---

## 1. System & Health Endpoints

### `GET /api/health`
Returns the operational health and active configuration.
**Response (200 OK):**
```json
{
  "status": "healthy",
  "service": "Multimodal Adaptive Generative AI for Inclusive Learning",
  "version": "1.0.0",
  "llm_provider": "fallback",
  "embedding_provider": "scikit"
}
```

### `GET /api/hardware`
Inspects and reports detected host hardware without assumptions.
**Response (200 OK):**
```json
{
  "os": "Windows 11",
  "architecture": "AMD64",
  "cpu_count_logical": 12,
  "cpu_count_physical": 10,
  "ram_total_gb": 7.69,
  "ram_available_gb": 1.77,
  "gpu_detected": true,
  "gpu_name": "Intel(R) UHD Graphics",
  "vram_gb": 2.0,
  "execution_recommendation": "Fast local CPU RAG with configurable LLM provider."
}
```

---

## 2. Curriculum Endpoints

### `GET /api/curriculum/topics`
Lists all available curriculum topics and concepts indexed in the RAG vector store.
**Response (200 OK):**
```json
[
  {
    "subject": "Science",
    "topic": "Plant Biology",
    "concept": "Photosynthesis",
    "grade_level": 5,
    "summary": "Plants make their own food using sunlight..."
  },
  {
    "subject": "Science",
    "topic": "Earth Science",
    "concept": "Water Cycle",
    "grade_level": 4,
    "summary": "Water moves in a giant circle. The warm sun warms the water..."
  }
]
```

---

## 3. Learner Profile Endpoints

### `GET /api/learners`
Lists registered learner profiles.

### `GET /api/learners/{id}`
Retrieves a specific learner profile.

### `POST /api/learners`
Creates or updates a learner profile.
**Request Body:**
```json
{
  "name": "Maya (Down syndrome pathway)",
  "learner_type": "down_syndrome",
  "accessibility_requirements": [
    "simple_language",
    "small_steps",
    "visual_storytelling",
    "micro_learning"
  ],
  "preferred_input": "text",
  "preferred_output": "visual_animation"
}
```

---

## 4. Adaptive Lesson Engine Endpoints

### `POST /api/lesson/generate`
Generates a curriculum-grounded, accessibility-adapted lesson.
**Request Body:**
```json
{
  "learner_id": "down_syndrome_demo_learner",
  "concept_or_query": "Photosynthesis"
}
```
**Response (200 OK):**
```json
{
  "concept": "Photosynthesis",
  "learner_type": "down_syndrome",
  "representation": "visual_animation",
  "title": "Story: How Plants Make Food (Photosynthesis)",
  "content": "Plants make their own food using sunlight. The sun gives light. Roots drink water from the soil...",
  "steps": [
    "1. Sun shines down with warm light.",
    "2. Sunlight touches the green leaves.",
    "3. Roots drink water from the soil.",
    "4. Leaves breathe in air (carbon dioxide).",
    "5. The plant makes sweet food (sugar).",
    "6. Clean oxygen gas is released."
  ],
  "visual_scenes": [
    {
      "scene": 1,
      "title": "The Warm Sun Appears",
      "description": "A bright yellow sun shines warmly in the blue sky above a green plant.",
      "visual_elements": ["sun", "sky", "plant", "rays"],
      "animation_action": "sun_glow",
      "caption": "The bright sun shines in the sky.",
      "duration_seconds": 3
    }
  ],
  "sign_support": [
    {
      "term": "Plant",
      "gloss": "PLANT-GROW",
      "description": "Dominant hand emerges upward from non-dominant hand...",
      "handshape": "Open 5 handshape upward",
      "movement": "Upward emerging growth movement",
      "asset_placeholder": "sign_plant.svg"
    }
  ],
  "assessment": {
    "question_id": "photo_q1",
    "concept": "Photosynthesis",
    "question": "Which gas does the plant take from the air during photosynthesis?",
    "expected_answer": "Carbon dioxide",
    "options": ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"],
    "hint": "It is the gas that enters the tiny pores in the leaves."
  },
  "adaptation_metadata": {
    "grounded": true,
    "curriculum_concept": "Photosynthesis",
    "applied_style": "simplified_micro_learning"
  }
}
```

---

## 5. Assessment & Adaptation Loop Endpoints

### `POST /api/assessment/evaluate`
Evaluates the student's answer using exact, synonym, and semantic scoring, updates the learner history, and invokes the Adaptation Engine to determine the next action.
**Request Body:**
```json
{
  "learner_id": "down_syndrome_demo_learner",
  "concept": "Photosynthesis",
  "question_id": "photo_q1",
  "learner_answer": "Rocks",
  "expected_answer": "Carbon dioxide",
  "attempt_number": 1
}
```
**Response (200 OK):**
```json
{
  "question_id": "photo_q1",
  "is_correct": false,
  "similarity_score": 0.12,
  "feedback": "Almost! Let's watch the simple step story again together.",
  "expected_answer": "Carbon dioxide",
  "learner_answer": "Rocks",
  "attempt_number": 1,
  "recommended_action": "simplify",
  "suggested_representation": "visual_animation"
}
```

### `POST /api/adaptation/next`
Re-generates the lesson with the updated representation and pedagogical style.
**Request Body:**
```json
{
  "learner_id": "down_syndrome_demo_learner",
  "concept": "Photosynthesis",
  "evaluation_result": {
    "is_correct": false,
    "attempt_number": 1
  },
  "current_representation": "visual"
}
```
**Response (200 OK):**
Returns an updated `LessonResponse` containing simplified micro-steps (e.g. reduced from 6 steps to 3 concrete steps with visual storytelling).

---

## 6. Gesture & Multimodal Practice Endpoints (Phase 11)

### `POST /api/multimodal/gesture`
Validates sign practice from client-side webcam or motion keypoint analysis.
**Request Body:**
```json
{
  "learner_id": "deaf_demo_learner",
  "target_sign": "Plant",
  "motion_score": 0.65,
  "has_detected_hand": true
}
```
**Response (200 OK):**
```json
{
  "target_sign": "Plant",
  "is_matched": true,
  "confidence": 0.98,
  "feedback": "Excellent handshape motion for 'Plant'! Recognized with 98% match.",
  "architecture_note": "Modular gesture recognition pipeline active (MediaPipe / HTML5 Canvas motion tracking)."
}
```

---

## 7. Analytics & Learning Progress Endpoints (Phase 12)

### `GET /api/analytics/history/{learner_id}`
Returns the longitudinal assessment, adaptation, and topic mastery history for a learner.
**Response (200 OK):**
```json
{
  "learner_id": "down_syndrome_demo_learner",
  "name": "Maya (Learner with Down syndrome)",
  "learner_type": "down_syndrome",
  "total_assessments": 4,
  "correct_count": 3,
  "accuracy_rate": 0.75,
  "total_adaptations": 1,
  "learning_history": [...],
  "assessment_history": [...],
  "adaptation_history": [...]
}
```
