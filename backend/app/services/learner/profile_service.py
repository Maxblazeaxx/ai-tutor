import uuid
import logging
from typing import Dict, Any, Optional, List
from backend.app.models.domain import LearnerProfile, LearnerType

logger = logging.getLogger(__name__)

# Default accessibility requirements templates
DEFAULT_REQUIREMENTS = {
    LearnerType.DEAF: [
        "visual_explanation",
        "text_support",
        "sign_support",
        "captions_enabled",
        "audio_optional"
    ],
    LearnerType.DOWN_SYNDROME: [
        "simple_language",
        "small_steps",
        "visual_storytelling",
        "micro_learning",
        "encouraging_feedback",
        "repetition_support"
    ],
    LearnerType.GENERAL: [
        "interactive_text",
        "diagrams"
    ]
}

DEFAULT_PREFERRED_OUTPUT = {
    LearnerType.DEAF: "visual",
    LearnerType.DOWN_SYNDROME: "visual_animation",
    LearnerType.GENERAL: "text"
}

class LearnerProfileService:
    """Manages learner profiles, accessibility preferences, and longitudinal learning history."""

    def __init__(self):
        self._profiles: Dict[str, LearnerProfile] = {}
        self._seed_default_profiles()

    def _seed_default_profiles(self) -> None:
        deaf_profile = LearnerProfile(
            learner_id="deaf_demo_learner",
            name="Aarav (Deaf Learner)",
            learner_type=LearnerType.DEAF,
            language="en",
            accessibility_requirements=list(DEFAULT_REQUIREMENTS[LearnerType.DEAF]),
            preferred_input="text",
            preferred_output=DEFAULT_PREFERRED_OUTPUT[LearnerType.DEAF],
            current_topic="Photosynthesis"
        )
        self._profiles[deaf_profile.learner_id] = deaf_profile

        ds_profile = LearnerProfile(
            learner_id="down_syndrome_demo_learner",
            name="Maya (Learner with Down syndrome)",
            learner_type=LearnerType.DOWN_SYNDROME,
            language="en",
            accessibility_requirements=list(DEFAULT_REQUIREMENTS[LearnerType.DOWN_SYNDROME]),
            preferred_input="text",
            preferred_output=DEFAULT_PREFERRED_OUTPUT[LearnerType.DOWN_SYNDROME],
            current_topic="Photosynthesis"
        )
        self._profiles[ds_profile.learner_id] = ds_profile

    def get_profile(self, learner_id: str) -> Optional[LearnerProfile]:
        return self._profiles.get(learner_id)

    def create_or_update_profile(
        self,
        learner_type: LearnerType,
        name: str = "Learner",
        learner_id: Optional[str] = None,
        accessibility_requirements: Optional[List[str]] = None,
        preferred_input: str = "text",
        preferred_output: Optional[str] = None
    ) -> LearnerProfile:
        uid = learner_id or f"learner_{uuid.uuid4().hex[:8]}"

        reqs = accessibility_requirements or DEFAULT_REQUIREMENTS.get(learner_type, [])
        output_pref = preferred_output or DEFAULT_PREFERRED_OUTPUT.get(learner_type, "visual")

        existing = self._profiles.get(uid)
        if existing:
            existing.name = name
            existing.learner_type = learner_type
            existing.accessibility_requirements = reqs
            existing.preferred_input = preferred_input
            existing.preferred_output = output_pref
            return existing

        profile = LearnerProfile(
            learner_id=uid,
            name=name,
            learner_type=learner_type,
            language="en",
            accessibility_requirements=reqs,
            preferred_input=preferred_input,
            preferred_output=output_pref
        )
        self._profiles[uid] = profile
        return profile

    def record_assessment(
        self,
        learner_id: str,
        concept: str,
        question_id: str,
        is_correct: bool,
        learner_answer: str,
        expected_answer: str,
        attempt_number: int
    ) -> None:
        profile = self._profiles.get(learner_id)
        if not profile:
            return

        record = {
            "concept": concept,
            "question_id": question_id,
            "is_correct": is_correct,
            "learner_answer": learner_answer,
            "expected_answer": expected_answer,
            "attempt_number": attempt_number
        }
        profile.assessment_history.append(record)

    def record_adaptation(self, learner_id: str, concept: str, action: str, details: Dict[str, Any]) -> None:
        profile = self._profiles.get(learner_id)
        if not profile:
            return

        profile.adaptation_history.append({
            "concept": concept,
            "action": action,
            "details": details
        })

    def get_all_profiles(self) -> List[LearnerProfile]:
        return list(self._profiles.values())

learner_service = LearnerProfileService()
