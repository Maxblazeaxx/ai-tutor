"""Tests for AI Animation Generation — Phase 2"""
import pytest
from backend.app.services.animation.ai_animation_generator import AIAnimationGenerator
from backend.app.schemas.ai_animation_schema import AIAnimationLesson, SVGElementSpec, AIAnimatedScene

def test_template_fallback_returns_valid_schema():
    result = AIAnimationGenerator._generate_template_fallback("gravity", "general")
    lesson = AIAnimationLesson.model_validate(result)
    assert len(lesson.scenes) >= 3
    assert lesson.concept

def test_template_fallback_has_elements():
    result = AIAnimationGenerator._generate_template_fallback("photosynthesis", "down_syndrome")
    lesson = AIAnimationLesson.model_validate(result)
    for scene in lesson.scenes:
        assert len(scene.elements) >= 1

def test_svg_element_spec_keyframes_valid():
    el = SVGElementSpec(
        id="test_circle",
        type="circle",
        x=100,
        y=100,
        r=50,
        fill="#ff0000",
        keyframes=[{"t_ms": 0, "opacity": 0}, {"t_ms": 1000, "opacity": 1}],
        animation_duration_ms=1000
    )
    assert el.id == "test_circle"
    assert len(el.keyframes) == 2

def test_generate_fallback_quiz_exists():
    result = AIAnimationGenerator._generate_template_fallback("electricity", "deaf")
    assert result["quiz"] is not None
    assert len(result["quiz"]["options"]) >= 4
