import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_down_syndrome_full_adaptation_cycle():
    """
    Scenario 1: Down Syndrome Learner Full Loop
    GENERATE -> TEACH -> ASSESS (Incorrect) -> ADAPT (SIMPLIFY) -> TEACH AGAIN -> ASSESS (Correct) -> CONTINUE
    """
    learner_id = "down_syndrome_demo_learner"
    concept = "Photosynthesis"

    # Step 1: Initial Lesson Generation
    gen_res = client.post("/api/lesson/generate", json={
        "learner_id": learner_id,
        "concept_or_query": concept
    })
    assert gen_res.status_code == 200
    lesson = gen_res.json()
    assert lesson["concept"] == concept
    assert lesson["learner_type"] == "down_syndrome"
    assert lesson["representation"] == "visual_animation"
    assert len(lesson["steps"]) > 0
    assert len(lesson["visual_scenes"]) > 0

    # Step 2: First Assessment Attempt (Student makes an error)
    eval_res_1 = client.post("/api/assessment/evaluate", json={
        "learner_id": learner_id,
        "concept": concept,
        "question_id": "photo_q1",
        "learner_answer": "Darkness and heavy rocks",
        "expected_answer": "Carbon dioxide",
        "attempt_number": 1
    })
    assert eval_res_1.status_code == 200
    eval_1 = eval_res_1.json()
    assert eval_1["is_correct"] is False
    assert eval_1["recommended_action"] == "simplify"

    # Step 3: Trigger Pedagogical Adaptation (SIMPLIFY representation)
    adapt_res = client.post("/api/adaptation/next", json={
        "learner_id": learner_id,
        "concept": concept,
        "evaluation_result": eval_1,
        "current_representation": lesson["representation"]
    })
    assert adapt_res.status_code == 200
    adapted_lesson = adapt_res.json()
    assert adapted_lesson["adaptation_metadata"]["decision"]["action"] == "simplify"
    assert "Simple" in adapted_lesson["title"] or "Understanding" in adapted_lesson["title"]
    # Pacing: simplified lessons contain concise micro-steps
    assert len(adapted_lesson["steps"]) <= 4

    # Step 4: Second Assessment Attempt (Student answers correctly)
    eval_res_2 = client.post("/api/assessment/evaluate", json={
        "learner_id": learner_id,
        "concept": concept,
        "question_id": "photo_q1",
        "learner_answer": "Carbon dioxide",
        "expected_answer": "Carbon dioxide",
        "attempt_number": 2
    })
    assert eval_res_2.status_code == 200
    eval_2 = eval_res_2.json()
    assert eval_2["is_correct"] is True
    assert eval_2["recommended_action"] == "continue"

    # Step 5: Verify History in Analytics
    history_res = client.get(f"/api/analytics/history/{learner_id}")
    assert history_res.status_code == 200
    hist = history_res.json()
    assert hist["total_assessments"] >= 2
    assert hist["correct_count"] >= 1
    assert hist["total_adaptations"] >= 1


def test_deaf_learner_sign_support_and_multimodal_flow():
    """
    Scenario 2: Deaf Learner Multimodal Loop
    Audio-independent lesson -> ASL/ISL sign gloss cards -> Practice gesture interaction
    """
    learner_id = "deaf_demo_learner"
    concept = "Fractions (Halves and Quarters)"

    # Step 1: Generate Sign-Supported Lesson
    gen_res = client.post("/api/lesson/generate", json={
        "learner_id": learner_id,
        "concept_or_query": concept
    })
    assert gen_res.status_code == 200
    lesson = gen_res.json()
    assert lesson["learner_type"] == "deaf"
    assert "visual" in lesson["representation"]
    assert len(lesson["sign_support"]) >= 2

    # Verify sign gloss structure
    first_sign = lesson["sign_support"][0]
    assert "term" in first_sign
    assert "gloss" in first_sign
    assert "handshape" in first_sign

    # Step 2: Multimodal Gesture Practice Input
    gesture_res = client.post("/api/multimodal/gesture", json={
        "learner_id": learner_id,
        "target_sign": "Fraction",
        "motion_score": 0.65,
        "has_detected_hand": True
    })
    assert gesture_res.status_code == 200
    gesture_data = gesture_res.json()
    assert gesture_data["is_matched"] is True
    assert "sign" in gesture_data["feedback"].lower() or "recognized" in gesture_data["feedback"].lower()


def test_dynamic_curriculum_ingestion_and_instant_rag_search():
    """
    Scenario 3: Teacher Dynamic Ingestion
    Upload new curriculum JSON -> Reload Vector Index -> Query RAG -> Instant Retrieval
    """
    new_curriculum = {
        "concept": "Electric Circuits and Batteries",
        "subject": "Physics",
        "grade_level": 5,
        "standard_explanation": "An electric circuit is a closed loop conducting path through which electric current flows. A battery acts as an energy source pushing electrons through wires to light a bulb.",
        "simplified_explanation": "A circuit is like a running track for electricity! The battery pushes the power through the wire to light up the bulb.",
        "key_points": [
            "A battery provides electrical energy.",
            "Wires create a path for current to flow.",
            "The circuit must be closed and complete to light a bulb."
        ],
        "visual_scenes": [
            {
                "scene": 1,
                "title": "Battery and Bulb",
                "description": "A battery connected with copper wires to a small glowing bulb.",
                "animation_action": "circuit_flow",
                "caption": "Step 1: The battery pushes electricity through wires.",
                "duration_seconds": 4
            }
        ],
        "sign_glossary": [
            {
                "term": "Battery",
                "gloss": "BATTERY-POWER",
                "description": "Two fists tap together representing positive and negative terminals.",
                "handshape": "Fists tapping",
                "movement": "Tap twice",
                "asset_placeholder": "sign_battery.svg"
            }
        ],
        "assessment_questions": [
            {
                "question_id": "circuit_q1",
                "concept": "Electric Circuits and Batteries",
                "question": "What happens when the circuit is complete?",
                "expected_answer": "The bulb lights up",
                "options": [
                    "The bulb lights up",
                    "The wire melts immediately",
                    "Electricity vanishes",
                    "The battery disappears"
                ],
                "hint": "Think about what electricity makes happen."
            }
        ]
    }

    # Upload new curriculum
    upload_res = client.post("/api/curriculum/upload", json=new_curriculum)
    assert upload_res.status_code == 200
    up_data = upload_res.json()
    assert up_data["status"] == "success"
    assert up_data["concept"] == "Electric Circuits and Batteries"

    # Verify it appears in active topics
    topics_res = client.get("/api/curriculum/topics")
    assert topics_res.status_code == 200
    topic_names = [t["concept"] for t in topics_res.json()]
    assert "Electric Circuits and Batteries" in topic_names

    # Generate lesson for the dynamically uploaded concept
    lesson_res = client.post("/api/lesson/generate", json={
        "learner_id": "down_syndrome_demo_learner",
        "concept_or_query": "Electric Circuits and Batteries"
    })
    assert lesson_res.status_code == 200
    lesson = lesson_res.json()
    assert lesson["concept"] == "Electric Circuits and Batteries"
    assert len(lesson["steps"]) > 0
    assert lesson["assessment"]["question"] == "What happens when the circuit is complete?"
