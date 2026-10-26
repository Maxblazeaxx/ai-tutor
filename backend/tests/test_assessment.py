import pytest
from backend.app.services.assessment.evaluator import assessment_evaluator
from backend.app.models.domain import LearnerType

def test_exact_match_evaluation():
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="Carbon dioxide",
        expected_answer="Carbon dioxide",
        concept="Photosynthesis",
        learner_type=LearnerType.GENERAL
    )
    assert is_correct is True
    assert score == 1.0

def test_synonym_evaluation():
    # Test abbreviation CO2 matching Carbon dioxide
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="CO2",
        expected_answer="Carbon dioxide",
        concept="Photosynthesis",
        learner_type=LearnerType.DOWN_SYNDROME
    )
    assert is_correct is True
    assert score >= 0.90

def test_semantic_substring_evaluation():
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="The plant takes carbon dioxide gas",
        expected_answer="Carbon dioxide",
        concept="Photosynthesis",
        learner_type=LearnerType.DEAF
    )
    assert is_correct is True
    assert score >= 0.85

def test_incorrect_answer_evaluation():
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="Plastic and rocks",
        expected_answer="Oxygen",
        concept="Photosynthesis",
        learner_type=LearnerType.DOWN_SYNDROME,
        attempt_number=1
    )
    assert is_correct is False
    assert score < 0.5
    assert "try" in feedback.lower() or "watch" in feedback.lower() or "simple" in feedback.lower()

def test_fraction_evaluation_half_synonym():
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="1/2",
        expected_answer="Half",
        concept="Fractions (Halves and Quarters)",
        learner_type=LearnerType.DOWN_SYNDROME
    )
    assert is_correct is True
    assert score >= 0.90

def test_solar_system_evaluation_earth():
    is_correct, score, feedback = assessment_evaluator.evaluate(
        learner_answer="Planet Earth",
        expected_answer="Earth",
        concept="Solar System",
        learner_type=LearnerType.DEAF
    )
    assert is_correct is True
    assert score >= 0.90
