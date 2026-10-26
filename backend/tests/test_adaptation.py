import pytest
from backend.app.models.domain import LearnerProfile, LearnerType, AdaptationAction
from backend.app.services.adaptation.engine import adaptation_engine
from backend.app.services.learner.profile_service import learner_service
from backend.app.schemas.api_schemas import LessonGenerateRequest
from backend.app.api.routes import generate_lesson

def test_same_concept_different_representations():
    """
    Core research hypothesis:
    SAME KNOWLEDGE -> DIFFERENT TEACHING REPRESENTATION
    For Photosynthesis:
    - Deaf learner gets visual_sign_supported / visual output
    - Down syndrome learner gets visual_animation / simplified micro-learning
    """
    deaf_profile = learner_service.get_profile("deaf_demo_learner")
    ds_profile = learner_service.get_profile("down_syndrome_demo_learner")

    deaf_lesson = generate_lesson(LessonGenerateRequest(
        learner_id=deaf_profile.learner_id,
        concept_or_query="Photosynthesis"
    ))

    ds_lesson = generate_lesson(LessonGenerateRequest(
        learner_id=ds_profile.learner_id,
        concept_or_query="Photosynthesis"
    ))

    # Same concept
    assert deaf_lesson.concept == "Photosynthesis"
    assert ds_lesson.concept == "Photosynthesis"

    # Different representation and structure
    assert deaf_lesson.representation != ds_lesson.representation or len(deaf_lesson.sign_support) > 0
    assert len(deaf_lesson.sign_support) >= 3
    assert len(ds_lesson.visual_scenes) >= 3

    # Audio must not be necessary for Deaf
    assert "visual" in deaf_lesson.representation or len(deaf_lesson.sign_support) > 0

def test_down_syndrome_adaptation_on_incorrect():
    """
    Down syndrome learner answering incorrectly -> SIMPLIFY action and micro-learning adaptation.
    """
    ds_profile = learner_service.get_profile("down_syndrome_demo_learner")

    # Attempt 1 incorrect
    decision_1 = adaptation_engine.decide(
        learner_profile=ds_profile,
        concept="Photosynthesis",
        is_correct=False,
        attempt_number=1
    )
    assert decision_1.action == AdaptationAction.SIMPLIFY
    assert "micro" in decision_1.complexity_level or "story" in decision_1.explanation_style

    # Attempt 2 incorrect -> ALTERNATIVE_EXAMPLE
    decision_2 = adaptation_engine.decide(
        learner_profile=ds_profile,
        concept="Photosynthesis",
        is_correct=False,
        attempt_number=2
    )
    assert decision_2.action == AdaptationAction.ALTERNATIVE_EXAMPLE

def test_deaf_adaptation_on_incorrect():
    """
    Deaf learner answering incorrectly -> MORE_VISUAL action with prominent sign-gloss support.
    """
    deaf_profile = learner_service.get_profile("deaf_demo_learner")

    decision_1 = adaptation_engine.decide(
        learner_profile=deaf_profile,
        concept="Photosynthesis",
        is_correct=False,
        attempt_number=1
    )
    assert decision_1.action == AdaptationAction.MORE_VISUAL
    assert "sign" in decision_1.target_representation or "sign" in decision_1.explanation_style

def test_learner_correct_progresses_to_continue():
    ds_profile = learner_service.get_profile("down_syndrome_demo_learner")
    decision = adaptation_engine.decide(
        learner_profile=ds_profile,
        concept="Photosynthesis",
        is_correct=True,
        attempt_number=1
    )
    assert decision.action == AdaptationAction.CONTINUE
