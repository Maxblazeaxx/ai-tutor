from enum import Enum
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field

class LearnerType(str, Enum):
    DEAF = "deaf"
    DOWN_SYNDROME = "down_syndrome"
    GENERAL = "general"

class ModalityType(str, Enum):
    TEXT = "text"
    VISUAL = "visual"
    VISUAL_ANIMATION = "visual_animation"
    SIGN_SUPPORT = "sign_support"
    SPEECH = "speech"

class AdaptationAction(str, Enum):
    CONTINUE = "continue"
    SIMPLIFY = "simplify"
    MORE_VISUAL = "more_visual"
    STEP_BY_STEP = "step_by_step"
    REPEATED = "repeated"
    ALTERNATIVE_EXAMPLE = "alternative_example"
    MICRO_LESSON = "micro_lesson"

class VisualScene(BaseModel):
    scene: int
    title: str
    description: str
    visual_elements: List[str] = Field(default_factory=list)
    animation_action: str
    caption: str
    duration_seconds: int = 4

class SignGlossItem(BaseModel):
    term: str
    gloss: str
    description: str
    handshape: Optional[str] = None
    movement: Optional[str] = None
    asset_placeholder: str

class AssessmentQuestion(BaseModel):
    question_id: str
    concept: str
    question: str
    expected_answer: str
    options: Optional[List[str]] = None
    hint: Optional[str] = None
    visual_cue: Optional[str] = None

class LearnerProfile(BaseModel):
    learner_id: str
    name: str = "Learner"
    learner_type: LearnerType = LearnerType.GENERAL
    language: str = "en"
    accessibility_requirements: List[str] = Field(default_factory=list)
    preferred_input: str = "text"
    preferred_output: str = "visual"
    current_topic: Optional[str] = None
    learning_history: List[Dict[str, Any]] = Field(default_factory=list)
    assessment_history: List[Dict[str, Any]] = Field(default_factory=list)
    adaptation_history: List[Dict[str, Any]] = Field(default_factory=list)
