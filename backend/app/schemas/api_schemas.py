from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from backend.app.models.domain import (
    LearnerType,
    ModalityType,
    AdaptationAction,
    VisualScene,
    SignGlossItem,
    AssessmentQuestion,
    LearnerProfile
)

# Request schemas
class CreateLearnerProfileRequest(BaseModel):
    learner_id: Optional[str] = None
    name: str = "Learner"
    learner_type: LearnerType
    accessibility_requirements: Optional[List[str]] = None
    preferred_input: Optional[str] = "text"
    preferred_output: Optional[str] = None

class LessonGenerateRequest(BaseModel):
    learner_id: Optional[str] = None
    learner_type: Optional[LearnerType] = None
    concept_or_query: str
    preferred_output: Optional[str] = None
    override_action: Optional[AdaptationAction] = None

class AssessmentGenerateRequest(BaseModel):
    concept: str
    learner_type: LearnerType
    difficulty: Optional[str] = "simple"

class AssessmentEvaluateRequest(BaseModel):
    learner_id: str
    concept: str
    question_id: str
    learner_answer: str
    expected_answer: str
    attempt_number: int = 1

class AdaptationNextRequest(BaseModel):
    learner_id: str
    concept: str
    evaluation_result: Dict[str, Any]
    current_representation: str

# Response schemas
class LessonResponse(BaseModel):
    concept: str
    learner_type: LearnerType
    representation: str
    title: str
    content: str
    steps: List[str] = Field(default_factory=list)
    key_points: List[str] = Field(default_factory=list)
    visual_scenes: List[VisualScene] = Field(default_factory=list)
    sign_support: List[SignGlossItem] = Field(default_factory=list)
    assessment: Optional[AssessmentQuestion] = None
    adaptation_metadata: Dict[str, Any] = Field(default_factory=dict)
    grounded_context: Optional[str] = None
    is_ai_generated: bool = False
    curriculum_source: str = "verified"
    generation_method: Optional[str] = "curriculum_rag"

class AssessmentEvaluateResponse(BaseModel):
    question_id: str
    is_correct: bool
    similarity_score: float
    feedback: str
    expected_answer: str
    learner_answer: str
    attempt_number: int
    recommended_action: AdaptationAction
    suggested_representation: str

class CurriculumTopicSummary(BaseModel):
    subject: str
    topic: str
    concept: str
    grade_level: int
    summary: str
