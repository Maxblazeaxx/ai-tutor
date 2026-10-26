"""
Strict Pydantic Validation Schema for Open-Domain Synthesis.
Enforces 4 to 7 scenes, allowed animation actions, and allowed visual elements.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, field_validator
from backend.app.services.animation.allowed_library import ALLOWED_ACTIONS, ALLOWED_VISUAL_ELEMENTS

class OpenDomainSceneSchema(BaseModel):
    scene: int
    title: str
    description: str
    visual_elements: List[str] = Field(default_factory=list)
    animation_action: str
    caption: str
    duration_seconds: int = 4

    @field_validator("animation_action")
    @classmethod
    def validate_action(cls, v: str) -> str:
        clean_v = v.strip().lower()
        if clean_v not in ALLOWED_ACTIONS:
            # Map close matches or fallback to generic
            raise ValueError(
                f"Action '{v}' is not permitted. Must be strictly chosen from ALLOWED_ACTIONS."
            )
        return clean_v

    @field_validator("visual_elements")
    @classmethod
    def validate_elements(cls, v: List[str]) -> List[str]:
        cleaned = [item.strip().lower() for item in v]
        invalid = [el for el in cleaned if el not in ALLOWED_VISUAL_ELEMENTS]
        if invalid:
            raise ValueError(
                f"Visual elements {invalid} are not permitted. Must be chosen from ALLOWED_VISUAL_ELEMENTS."
            )
        return cleaned

class OpenDomainQuizSchema(BaseModel):
    question_id: str
    concept: str
    question: str
    expected_answer: str
    options: List[str] = Field(default_factory=list)
    hint: Optional[str] = None

    @field_validator("options")
    @classmethod
    def validate_options(cls, v: List[str]) -> List[str]:
        if len(v) < 2:
            raise ValueError("Quiz question must have at least 2 options.")
        return v

class OpenDomainSynthesisSchema(BaseModel):
    concept: str
    explanation: str
    scenes: List[OpenDomainSceneSchema]
    quiz: OpenDomainQuizSchema
    key_points: List[str] = Field(default_factory=list)
    sign_glossary: List[Dict[str, Any]] = Field(default_factory=list)

    @field_validator("scenes")
    @classmethod
    def validate_scenes_count(cls, v: List[OpenDomainSceneSchema]) -> List[OpenDomainSceneSchema]:
        if not (4 <= len(v) <= 7):
            raise ValueError(
                f"Scene count constraint failed: Must have between 4 and 7 scenes (inclusive). Received {len(v)}."
            )
        return v

    @field_validator("explanation")
    @classmethod
    def validate_explanation_non_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Explanation cannot be empty.")
        return v.strip()
