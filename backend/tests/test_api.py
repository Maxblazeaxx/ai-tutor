import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_hardware_endpoint():
    response = client.get("/api/hardware")
    assert response.status_code == 200
    data = response.json()
    assert "cpu_count_logical" in data
    assert "ram_total_gb" in data

def test_curriculum_topics_endpoint():
    response = client.get("/api/curriculum/topics")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    concepts = [item["concept"] for item in data]
    assert "Photosynthesis" in concepts

def test_learners_endpoints():
    response = client.get("/api/learners")
    assert response.status_code == 200
    learners = response.json()
    assert len(learners) >= 2

def test_lesson_generate_endpoint():
    payload = {
        "learner_id": "down_syndrome_demo_learner",
        "concept_or_query": "Photosynthesis"
    }
    response = client.post("/api/lesson/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["concept"] == "Photosynthesis"
    assert len(data["steps"]) > 0
    assert len(data["visual_scenes"]) > 0

def test_assessment_evaluate_endpoint():
    payload = {
        "learner_id": "down_syndrome_demo_learner",
        "concept": "Photosynthesis",
        "question_id": "photo_q1",
        "learner_answer": "Carbon dioxide",
        "expected_answer": "Carbon dioxide",
        "attempt_number": 1
    }
    response = client.post("/api/assessment/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_correct"] is True
    assert data["recommended_action"] == "continue"

def test_evaluation_report_endpoint():
    response = client.get("/api/evaluation/report")
    assert response.status_code == 200
    data = response.json()
    assert "title" in data
    assert "literature_alignment" in data
    assert "empirical_benchmarks" in data
    assert data["empirical_benchmarks"]["rag_precision_at_1"] == 1.0
    assert "system_profile" in data

def test_multi_topic_lesson_generation():
    topics_to_test = [
        "Shapes and Colors (Montessori)",
        "Counting Numbers 1 to 5 (Montessori)",
        "Photosynthesis",
        "Water Cycle",
        "Fractions (Halves and Quarters)",
        "States of Matter: Solid, Liquid, and Gas",
        "Magnets and Magnetic Poles (CBSE Grade 6)",
        "Acids, Bases, and Salts (CBSE Grade 7)",
        "Human Circulatory System (CBSE Grade 10)",
        "Electricity and Ohm's Law (CBSE Grade 10)",
        "Trigonometry and Right Triangles (CBSE Grade 10)"
    ]
    for topic in topics_to_test:
        # Down syndrome profile (visual animation)
        res_ds = client.post("/api/lesson/generate", json={
            "learner_id": "down_syndrome_demo_learner",
            "concept_or_query": topic
        })
        assert res_ds.status_code == 200
        ds_data = res_ds.json()
        assert ds_data["concept"] == topic
        assert len(ds_data["steps"]) >= 1
        assert len(ds_data["visual_scenes"]) >= 1

        # Deaf profile (sign support)
        res_deaf = client.post("/api/lesson/generate", json={
            "learner_id": "deaf_demo_learner",
            "concept_or_query": topic
        })
        assert res_deaf.status_code == 200
        deaf_data = res_deaf.json()
        assert deaf_data["concept"] == topic
        assert len(deaf_data["sign_support"]) >= 1

def test_open_domain_arbitrary_topic_synthesis():
    """Verify that ANY arbitrary query generates a complete, valid lesson dynamically."""
    arbitrary_query = "How do hot air balloons rise in the sky?"
    res = client.post("/api/lesson/generate", json={
        "learner_id": "down_syndrome_demo_learner",
        "concept_or_query": arbitrary_query
    })
    assert res.status_code == 200
    data = res.json()
    assert len(data["concept"]) > 0
    assert len(data["steps"]) >= 2
    assert len(data["visual_scenes"]) >= 2
    assert "question" in data["assessment"]
    assert "expected_answer" in data["assessment"]

