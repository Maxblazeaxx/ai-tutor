import logging
from typing import Dict, Any, Optional
from backend.app.models.domain import (
    LearnerProfile,
    LearnerType,
    AdaptationAction,
    ModalityType
)

logger = logging.getLogger(__name__)

class AdaptationDecision:
    def __init__(
        self,
        action: AdaptationAction,
        target_representation: str,
        complexity_level: str,
        explanation_style: str,
        regeneration_instruction: str,
        pedagogical_rationale: str
    ):
        self.action = action
        self.target_representation = target_representation
        self.complexity_level = complexity_level
        self.explanation_style = explanation_style
        self.regeneration_instruction = regeneration_instruction
        self.pedagogical_rationale = pedagogical_rationale

    def to_dict(self) -> Dict[str, Any]:
        return {
            "action": self.action.value,
            "target_representation": self.target_representation,
            "complexity_level": self.complexity_level,
            "explanation_style": self.explanation_style,
            "regeneration_instruction": self.regeneration_instruction,
            "pedagogical_rationale": self.pedagogical_rationale
        }

class AdaptationEngine:
    """
    Dedicated Adaptation Engine.
    Implements accessibility-first pedagogical adaptation rules based on learner profile,
    accessibility requirements, and longitudinal assessment performance.
    """

    def decide(
        self,
        learner_profile: LearnerProfile,
        concept: str,
        is_correct: bool,
        attempt_number: int = 1,
        current_representation: str = "visual"
    ) -> AdaptationDecision:
        l_type = learner_profile.learner_type
        reqs = set(learner_profile.accessibility_requirements)

        # -------------------------------------------------------------
        # Branch 1: Learner answered correctly -> Progress / Continue
        # -------------------------------------------------------------
        if is_correct:
            return AdaptationDecision(
                action=AdaptationAction.CONTINUE,
                target_representation=learner_profile.preferred_output,
                complexity_level="mastery_consolidated",
                explanation_style="positive_reinforcement",
                regeneration_instruction=f"Learner has mastered {concept}. Present next concept or provide deep-dive enrichment.",
                pedagogical_rationale=f"Correct answer on attempt {attempt_number}. Moving to next concept in sequence."
            )

        # -------------------------------------------------------------
        # Branch 2: Learner with Down Syndrome (or simple_language/micro_learning reqs)
        # -------------------------------------------------------------
        if l_type == LearnerType.DOWN_SYNDROME or "simple_language" in reqs or "small_steps" in reqs:
            if attempt_number == 1:
                # First failure: Simplify language + reduce step complexity to 3 key micro-steps
                return AdaptationDecision(
                    action=AdaptationAction.SIMPLIFY,
                    target_representation="visual_animation",
                    complexity_level="micro_step",
                    explanation_style="visual_storytelling",
                    regeneration_instruction=(
                        f"Simplify {concept} into 3 ultra-short micro-steps. "
                        "Focus on concrete nouns: Sun, Water, Leaf. Use comforting visual storytelling."
                    ),
                    pedagogical_rationale="Initial misunderstanding: Decomposed lesson into single-idea micro-steps with visual storytelling."
                )
            elif attempt_number == 2:
                # Second failure: Switch to alternative concrete metaphor with visual repetition
                return AdaptationDecision(
                    action=AdaptationAction.ALTERNATIVE_EXAMPLE,
                    target_representation="visual_animation",
                    complexity_level="concrete_metaphor",
                    explanation_style="metaphor_repetition",
                    regeneration_instruction=(
                        f"Explain {concept} using a kitchen cooking or drinking glass metaphor. "
                        "Repeat the single core concept with high-contrast animated cue."
                    ),
                    pedagogical_rationale="Persistent difficulty: Switched from abstract explanation to grounded concrete metaphor."
                )
            else:
                # 3+ failures: Micro-lesson with single-element interactive confirmation
                return AdaptationDecision(
                    action=AdaptationAction.MICRO_LESSON,
                    target_representation="visual_animation",
                    complexity_level="foundational_atomic",
                    explanation_style="guided_visual_cue",
                    regeneration_instruction=(
                        f"Atomic 1-step review of {concept}. Highlight the target answer directly with an animated spotlight."
                    ),
                    pedagogical_rationale="Multiple attempts: Provided foundational atomic micro-lesson with visual spotlight."
                )

        # -------------------------------------------------------------
        # Branch 3: Deaf Learner (or visual_explanation/sign_support reqs)
        # -------------------------------------------------------------
        if l_type == LearnerType.DEAF or "sign_support" in reqs or "visual_explanation" in reqs:
            if attempt_number == 1:
                # First failure: Strengthen visual diagrammatic breakdown + sign gloss cards
                return AdaptationDecision(
                    action=AdaptationAction.MORE_VISUAL,
                    target_representation="visual_sign_supported",
                    complexity_level="visual_flowchart",
                    explanation_style="sign_gloss_prominent",
                    regeneration_instruction=(
                        f"Regenerate {concept} emphasizing sign-supported visual cards, clear text captions, "
                        "and a diagrammatic input/output flow. Ensure audio is 100% unnecessary."
                    ),
                    pedagogical_rationale="Deaf learner pathway: Elevated sign-language gloss support and diagrammatic visual cues."
                )
            else:
                # Repeated failure: Step-by-step visual animation breakdown with illustrated handshapes
                return AdaptationDecision(
                    action=AdaptationAction.STEP_BY_STEP,
                    target_representation="visual_sign_supported",
                    complexity_level="annotated_schematic",
                    explanation_style="step_by_step_sign",
                    regeneration_instruction=(
                        f"Provide step-by-step schematic for {concept} highlighting the specific term missed "
                        "with dedicated sign-language handshape descriptions."
                    ),
                    pedagogical_rationale="Repeated misconception: Replaced textual prose with step-by-step sign-gloss annotated schematic."
                )

        # -------------------------------------------------------------
        # Branch 4: General Learner Default Adaptation
        # -------------------------------------------------------------
        if attempt_number == 1:
            return AdaptationDecision(
                action=AdaptationAction.SIMPLIFY,
                target_representation="visual",
                complexity_level="simplified_text",
                explanation_style="clear_bullet_points",
                regeneration_instruction=f"Explain {concept} using simpler terminology and everyday examples.",
                pedagogical_rationale="Standard learner pathway: Simplified wording and clarified core terminology."
            )
        else:
            return AdaptationDecision(
                action=AdaptationAction.ALTERNATIVE_EXAMPLE,
                target_representation="visual",
                complexity_level="example_focused",
                explanation_style="analogous_comparison",
                regeneration_instruction=f"Present an alternative real-world analogy to teach {concept}.",
                pedagogical_rationale="Repeated difficulty: Introduced alternative real-world analogy."
            )

adaptation_engine = AdaptationEngine()
