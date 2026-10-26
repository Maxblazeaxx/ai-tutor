import pytest
from unittest.mock import patch, MagicMock
from pydantic import ValidationError

from backend.app.schemas.open_domain_schema import (
    OpenDomainSynthesisSchema,
    OpenDomainSceneSchema,
    OpenDomainQuizSchema
)
from backend.app.services.animation.allowed_library import ALLOWED_ACTIONS, ALLOWED_VISUAL_ELEMENTS
from backend.app.services.rag.universal_synthesizer import UniversalCurriculumSynthesizer

def test_allowed_actions_and_elements_exist():
    assert "air_wing_lift" in ALLOWED_ACTIONS
    assert "air_thrust_forward" in ALLOWED_ACTIONS
    assert "sky_scattering_blue" in ALLOWED_ACTIONS
    assert "sunlight_prism_spectrum" in ALLOWED_ACTIONS
    assert "airplane_cruising_flight" in ALLOWED_ACTIONS
    assert "sky_blue_daylight" in ALLOWED_ACTIONS
    assert "topic_synthesis_summary" in ALLOWED_ACTIONS

    assert "airplane_wing_airfoil" in ALLOWED_VISUAL_ELEMENTS
    assert "airplane_jet_thrust" in ALLOWED_VISUAL_ELEMENTS
    assert "atmosphere_particle_scatter" in ALLOWED_VISUAL_ELEMENTS
    assert "light_spectrum_prism" in ALLOWED_VISUAL_ELEMENTS
    assert "rayleigh_wave_ripples" in ALLOWED_VISUAL_ELEMENTS
    assert "airplane_flight_vector" in ALLOWED_VISUAL_ELEMENTS
    assert "atmosphere_blue_glow" in ALLOWED_VISUAL_ELEMENTS
    assert "topic_concept_node" in ALLOWED_VISUAL_ELEMENTS

def test_schema_validates_4_to_7_scenes_pass():
    valid_scenes = [
        {
            "scene": i + 1,
            "title": f"Scene {i+1}",
            "description": f"Description {i+1}",
            "visual_elements": ["sun", "clouds"],
            "animation_action": "generic_stage_intro",
            "caption": f"Caption {i+1}",
            "duration_seconds": 4
        }
        for i in range(4)
    ]
    quiz = {
        "question_id": "q1",
        "concept": "Test Concept",
        "question": "What is the principle?",
        "expected_answer": "Option A",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "hint": "Think about it"
    }
    schema = OpenDomainSynthesisSchema(
        concept="Test Concept",
        explanation="A short clear explanation.",
        scenes=valid_scenes,
        quiz=quiz
    )
    assert len(schema.scenes) == 4
    assert schema.concept == "Test Concept"

def test_schema_rejects_less_than_4_scenes():
    few_scenes = [
        {
            "scene": i + 1,
            "title": f"Scene {i+1}",
            "description": f"Description {i+1}",
            "visual_elements": ["sun"],
            "animation_action": "sun_glow",
            "caption": f"Caption {i+1}",
            "duration_seconds": 4
        }
        for i in range(3)  # Only 3 scenes
    ]
    quiz = {
        "question_id": "q1",
        "concept": "Test",
        "question": "Question?",
        "expected_answer": "A",
        "options": ["A", "B"]
    }
    with pytest.raises(ValidationError) as exc_info:
        OpenDomainSynthesisSchema(
            concept="Test",
            explanation="Explanation",
            scenes=few_scenes,
            quiz=quiz
        )
    assert "Must have between 4 and 7 scenes" in str(exc_info.value)

def test_schema_rejects_more_than_7_scenes():
    many_scenes = [
        {
            "scene": i + 1,
            "title": f"Scene {i+1}",
            "description": f"Description {i+1}",
            "visual_elements": ["sun"],
            "animation_action": "sun_glow",
            "caption": f"Caption {i+1}",
            "duration_seconds": 4
        }
        for i in range(8)  # 8 scenes
    ]
    quiz = {
        "question_id": "q1",
        "concept": "Test",
        "question": "Question?",
        "expected_answer": "A",
        "options": ["A", "B"]
    }
    with pytest.raises(ValidationError) as exc_info:
        OpenDomainSynthesisSchema(
            concept="Test",
            explanation="Explanation",
            scenes=many_scenes,
            quiz=quiz
        )
    assert "Must have between 4 and 7 scenes" in str(exc_info.value)

def test_schema_rejects_unallowed_action():
    scenes = [
        {
            "scene": 1,
            "title": "Scene 1",
            "description": "Desc",
            "visual_elements": ["sun"],
            "animation_action": "forbidden_unauthorized_action",
            "caption": "Caption",
            "duration_seconds": 4
        }
    ] * 4
    quiz = {
        "question_id": "q1",
        "concept": "Test",
        "question": "Question?",
        "expected_answer": "A",
        "options": ["A", "B"]
    }
    with pytest.raises(ValidationError) as exc_info:
        OpenDomainSynthesisSchema(
            concept="Test",
            explanation="Explanation",
            scenes=scenes,
            quiz=quiz
        )
    assert "ALLOWED_ACTIONS" in str(exc_info.value)

def test_schema_rejects_unallowed_visual_element():
    scenes = [
        {
            "scene": 1,
            "title": "Scene 1",
            "description": "Desc",
            "visual_elements": ["completely_random_alien_ship"],
            "animation_action": "sun_glow",
            "caption": "Caption",
            "duration_seconds": 4
        }
    ] * 4
    quiz = {
        "question_id": "q1",
        "concept": "Test",
        "question": "Question?",
        "expected_answer": "A",
        "options": ["A", "B"]
    }
    with pytest.raises(ValidationError) as exc_info:
        OpenDomainSynthesisSchema(
            concept="Test",
            explanation="Explanation",
            scenes=scenes,
            quiz=quiz
        )
    assert "ALLOWED_VISUAL_ELEMENTS" in str(exc_info.value)

def test_template_synthesizer_airplanes_flight():
    data = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
        query="How do airplanes fly in the sky?",
        learner_type="down_syndrome"
    )
    assert data["is_ai_generated"] is True
    assert data["curriculum_source"] == "ai_generated"
    assert data["concept"] == "How Airplanes Fly in the Sky"
    assert 4 <= len(data["visual_scenes"]) <= 7
    # Verify final scene is topic-specific instead of generic sparkles
    assert data["visual_scenes"][-1]["animation_action"] == "airplane_cruising_flight"
    assert "success_sparkles" not in data["visual_scenes"][-1]["visual_elements"]
    # Verify Down syndrome quiz tests one simple idea with plausible distractors of similar length
    quiz = data["assessment_questions"][0]
    assert "pushes the airplane up" in quiz["question"]
    lengths = [len(opt) for opt in quiz["options"]]
    assert max(lengths) - min(lengths) <= 6
    # Verify sign gloss note
    for sign in data["sign_glossary"]:
        assert "placeholder glosses, not verified ISL/ASL" in sign["description"]

    # Verify all actions are in allowed list
    for scene in data["visual_scenes"]:
        assert scene["animation_action"] in ALLOWED_ACTIONS
        for el in scene["visual_elements"]:
            assert el in ALLOWED_VISUAL_ELEMENTS

def test_template_synthesizer_sky_blue():
    data = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
        query="Why is the sky blue?",
        learner_type="deaf"
    )
    assert data["is_ai_generated"] is True
    assert data["curriculum_source"] == "ai_generated"
    assert data["concept"] == "Why the Sky is Blue"
    assert 4 <= len(data["visual_scenes"]) <= 7
    # Verify final scene is topic-specific instead of generic sparkles
    assert data["visual_scenes"][-1]["animation_action"] == "sky_blue_daylight"
    assert "success_sparkles" not in data["visual_scenes"][-1]["visual_elements"]
    # Verify distractors are plausible and similar in length
    quiz = data["assessment_questions"][0]
    lengths = [len(opt) for opt in quiz["options"]]
    assert max(lengths) - min(lengths) <= 8
    # Verify sign gloss note
    for sign in data["sign_glossary"]:
        assert "placeholder glosses, not verified ISL/ASL" in sign["description"]

    for scene in data["visual_scenes"]:
        assert scene["animation_action"] in ALLOWED_ACTIONS
        for el in scene["visual_elements"]:
            assert el in ALLOWED_VISUAL_ELEMENTS
    assert len(data["assessment_questions"]) == 1

@patch("backend.app.services.llm.gemini_provider.GeminiProvider.generate_structured")
def test_gemini_path_success(mock_gemini):
    mock_gemini.return_value = {
        "concept": "How Airplanes Fly",
        "explanation": "Curved wings create lower pressure on top, generating upward lift.",
        "scenes": [
            {
                "scene": i + 1,
                "title": f"Flight Stage {i+1}",
                "description": f"Visual {i+1}",
                "visual_elements": ["airplane_wings", "air_particles"],
                "animation_action": "air_wing_lift",
                "caption": f"Step {i+1}",
                "duration_seconds": 4
            }
            for i in range(5)
        ],
        "quiz": {
            "question_id": "q_fly",
            "concept": "How Airplanes Fly",
            "question": "What force pushes wings up?",
            "expected_answer": "Lift",
            "options": ["Lift", "Weight", "Friction", "Gravity"],
            "hint": "Bernoulli pressure"
        },
        "key_points": ["Wings create lift", "Engines create thrust"],
        "sign_glossary": []
    }

    result = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
        query="How do airplanes fly?",
        learner_type="deaf",
        llm_provider_override="gemini"
    )
    assert result["generation_method"] == "gemini_open_domain"
    assert result["is_ai_generated"] is True
    assert len(result["visual_scenes"]) == 5
    assert mock_gemini.call_count == 1

@patch("backend.app.services.llm.gemini_provider.GeminiProvider.generate_structured")
def test_gemini_path_retry_on_first_failure(mock_gemini):
    # First response has only 2 scenes (fails validation)
    bad_response = {
        "concept": "Blue Sky",
        "explanation": "Rayleigh scattering",
        "scenes": [
            {
                "scene": 1,
                "title": "S1",
                "description": "D1",
                "visual_elements": ["sun"],
                "animation_action": "sun_glow",
                "caption": "C1",
                "duration_seconds": 4
            },
            {
                "scene": 2,
                "title": "S2",
                "description": "D2",
                "visual_elements": ["sky"],
                "animation_action": "sky_scattering_blue",
                "caption": "C2",
                "duration_seconds": 4
            }
        ],
        "quiz": {
            "question_id": "q1",
            "concept": "Blue Sky",
            "question": "Why?",
            "expected_answer": "Scattering",
            "options": ["Scattering", "Ocean"]
        }
    }

    # Second response has 4 scenes (passes validation)
    good_response = {
        "concept": "Why the Sky is Blue",
        "explanation": "Sunlight scatters through gas molecules in the air.",
        "scenes": [
            {
                "scene": i + 1,
                "title": f"Scene {i+1}",
                "description": "Valid desc",
                "visual_elements": ["sky", "atmosphere"],
                "animation_action": "sky_scattering_blue",
                "caption": f"Step {i+1}",
                "duration_seconds": 4
            }
            for i in range(4)
        ],
        "quiz": {
            "question_id": "q1",
            "concept": "Why the Sky is Blue",
            "question": "Why is sky blue?",
            "expected_answer": "Rayleigh scattering",
            "options": ["Rayleigh scattering", "Water color", "Grass green", "Clouds"]
        }
    }

    mock_gemini.side_effect = [bad_response, good_response]

    result = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
        query="Why is the sky blue?",
        learner_type="general",
        llm_provider_override="gemini"
    )

    assert mock_gemini.call_count == 2
    assert result["generation_method"] == "gemini_open_domain"
    assert len(result["visual_scenes"]) == 4

@patch("backend.app.services.llm.gemini_provider.GeminiProvider.generate_structured")
def test_gemini_path_fallback_after_retry_failure(mock_gemini):
    # Both calls fail validation
    mock_gemini.side_effect = Exception("API rate limit or connection error")

    result = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
        query="How do airplanes fly in the sky?",
        learner_type="down_syndrome",
        llm_provider_override="gemini"
    )

    # Must cleanly fall back to template provider
    assert result["generation_method"] == "template_open_domain"
    assert result["is_ai_generated"] is True
    assert 4 <= len(result["visual_scenes"]) <= 7
    assert result["concept"] == "How Airplanes Fly in the Sky"
