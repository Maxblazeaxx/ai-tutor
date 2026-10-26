import re
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional, List

from backend.app.core.config import settings
from backend.app.services.animation.allowed_library import ALLOWED_ACTIONS, ALLOWED_VISUAL_ELEMENTS
from backend.app.schemas.open_domain_schema import OpenDomainSynthesisSchema

logger = logging.getLogger(__name__)

class UniversalCurriculumSynthesizer:
    """
    Synthesizes curriculum-grounded, accessibility-aware knowledge representations
    for ANY user query or topic across Montessori to 10th Grade CBSE.
    When LLM_PROVIDER is gemini, invokes Gemini with strict JSON schema validation
    and 1-retry fallback to the deterministic template provider.
    """

    SUBJECT_KEYWORDS = {
        "Mathematics": ["math", "fraction", "trigonometry", "algebra", "number", "count", "shape", "geometry", "equation", "angle", "triangle", "divide", "add", "multiply", "matrix", "ratio"],
        "Physics": ["physics", "force", "gravity", "magnet", "motion", "energy", "circuit", "electricity", "voltage", "current", "light", "lens", "sound", "friction", "speed", "wave", "atom", "fall", "fly", "airplane", "aerodynamic", "wing", "thrust", "lift"],
        "Chemistry": ["chemistry", "acid", "base", "salt", "reaction", "element", "molecule", "matter", "solid", "liquid", "gas", "chemical", "litmus", "compound", "oxygen", "metal"],
        "Biology": ["biology", "plant", "photosynthesis", "cell", "heart", "blood", "organ", "animal", "body", "ecosystem", "dna", "heredity", "gene", "lung", "breathe", "food chain", "living"],
        "Earth Science": ["earth", "water cycle", "planet", "solar", "moon", "sun", "space", "weather", "rain", "cloud", "volcano", "rock", "ocean", "atmosphere", "star", "sky", "blue", "scatter"],
        "Early Learning & Montessori": ["montessori", "kindergarten", "color", "shape", "sense", "count 1", "puppy", "toy", "alphabet", "abc", "finger"]
    }

    @classmethod
    def synthesize_curriculum_concept(
        cls,
        query: str,
        target_dir: Optional[Path] = None,
        learner_type: str = "general",
        accessibility_requirements: Optional[List[str]] = None,
        llm_provider_override: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Main entry point for Open-Domain Knowledge Synthesis.
        If LLM_PROVIDER is gemini, queries Gemini with strict schema validation
        and a 1-retry recovery loop, falling back to the template provider.
        """
        active_provider = (llm_provider_override or settings.LLM_PROVIDER).lower()

        # Check if Gemini pathway is active
        if active_provider == "gemini":
            try:
                gemini_result = cls._synthesize_with_gemini(
                    query=query,
                    learner_type=learner_type,
                    accessibility_requirements=accessibility_requirements
                )
                if gemini_result:
                    return gemini_result
            except Exception as e:
                logger.warning(f"Gemini open-domain synthesis failed ({e}). Falling back to template provider.")

        # Fallback / Default: Deterministic Template Provider
        return cls._synthesize_template(
            query=query,
            target_dir=target_dir,
            learner_type=learner_type,
            accessibility_requirements=accessibility_requirements
        )

    @classmethod
    def _synthesize_with_gemini(
        cls,
        query: str,
        learner_type: str = "general",
        accessibility_requirements: Optional[List[str]] = None
    ) -> Optional[Dict[str, Any]]:
        """
        Synthesizes using Google Gemini with strict JSON schema validation,
        allowed animation actions/elements constraint, and 1 retry on failure.
        """
        from backend.app.services.llm.gemini_provider import GeminiProvider
        provider = GeminiProvider()

        reqs_str = ", ".join(accessibility_requirements or [])
        allowed_actions_list = sorted(list(ALLOWED_ACTIONS))
        allowed_elements_list = sorted(list(ALLOWED_VISUAL_ELEMENTS))

        prompt = f"""### OPEN-DOMAIN INCLUSIVE CURRICULUM SYNTHESIS TASK
User Question: "{query}"
Target Learner Profile: {learner_type}
Accessibility Requirements: {reqs_str}

You must return a STRICT JSON object representing an educational lesson unit.
CRITICAL SCHEMA & PEDAGOGICAL REQUIREMENTS:
1. "concept": Short clean title of the concept (2-5 words).
2. "explanation": A short, high-clarity explanation tailored to the learner profile.
   - For Deaf learners: Audio-independent, visual descriptions, diagrammatic structure.
   - For Down syndrome learners: Simple words, short sentences, concrete storytelling.
3. "scenes": An array of EXACTLY 4 to 7 animation scenes (no fewer than 4, no more than 7).
   Each scene MUST contain:
   - "scene": integer (1 to N)
   - "title": short title
   - "description": visual description
   - "visual_elements": list of elements chosen EXCLUSIVELY from the ALLOWED_VISUAL_ELEMENTS list below.
   - "animation_action": string chosen EXCLUSIVELY from the ALLOWED_ACTIONS list below.
   - "caption": concise, accessible caption.
   - "duration_seconds": integer (3 to 5)
   CRITICAL SCENE RULE: The final scene (scene N) MUST be topic-specific showing the actual scientific, mathematical, or real-world application/equilibrium (e.g., airplane_cruising_flight, sky_blue_daylight, or topic_synthesis_summary). DO NOT use generic sparkles or generic result stages.
4. "quiz": Exactly one multiple-choice quiz question object:
   - "question_id": string identifier
   - "concept": concept title
   - "question": clear question text
   - "expected_answer": the correct option
   - "options": list of exactly 4 distinct answer strings including the expected_answer
   - "hint": encouraging hint
   CRITICAL QUIZ RULES:
   - All 3 distractors MUST be plausible (realistic scientific alternatives or common misconceptions, not silly or absurd jokes) and MUST be similar in length (within 10-15% character length) to the expected_answer.
   - SPECIAL DOWN SYNDROME RULE: If Target Learner Profile is 'down_syndrome', the quiz question MUST test ONLY ONE simple, concrete idea from the lesson (e.g. 'What pushes the plane up?'). It must NOT test compound facts, multi-step logic, or negative phrasing ('which is NOT').
5. "key_points": list of 3-4 bullet points.
6. "sign_glossary": list of 2-3 sign gloss items (term, gloss, description note: placeholder glosses, not verified ISL/ASL).

ALLOWED_ACTIONS:
{json.dumps(allowed_actions_list)}

ALLOWED_VISUAL_ELEMENTS:
{json.dumps(allowed_elements_list)}

Return ONLY valid JSON matching this structure. Do not output markdown codeblocks or outside text."""

        system_instruction = (
            "You are an expert accessibility-first curriculum synthesizer. "
            "Enforce strict schema compliance: 4 to 7 scenes, allowed actions, allowed visual elements."
        )

        # Attempt 1: Initial Generation
        logger.info(f"Attempting Gemini open-domain synthesis for query: '{query}'")
        raw_json = None
        validation_error_msg = ""
        try:
            raw_json = provider.generate_structured(prompt, system_instruction)
            validated = OpenDomainSynthesisSchema.model_validate(raw_json)
            logger.info(f"Gemini open-domain synthesis validated successfully on attempt 1 for '{query}'.")
            return cls._format_validated_result(validated, query, generation_method="gemini_open_domain")
        except Exception as err:
            validation_error_msg = str(err)
            logger.warning(f"Gemini synthesis attempt 1 failed validation: {validation_error_msg}. Retrying once...")

        # Attempt 2: One-Shot Corrective Retry
        retry_prompt = (
            f"{prompt}\n\n"
            f"CRITICAL FIX: Your previous response failed validation with error: {validation_error_msg}.\n"
            f"You MUST provide between 4 and 7 scenes. Every scene's animation_action MUST be in ALLOWED_ACTIONS. "
            f"Every visual element MUST be in ALLOWED_VISUAL_ELEMENTS. Return valid JSON now."
        )
        try:
            raw_retry_json = provider.generate_structured(retry_prompt, system_instruction)
            validated_retry = OpenDomainSynthesisSchema.model_validate(raw_retry_json)
            logger.info(f"Gemini open-domain synthesis validated successfully on retry for '{query}'.")
            return cls._format_validated_result(validated_retry, query, generation_method="gemini_open_domain")
        except Exception as retry_err:
            logger.error(f"Gemini open-domain retry also failed validation: {retry_err}. Falling back to template.")
            return None

    @classmethod
    def _format_validated_result(
        cls,
        validated: OpenDomainSynthesisSchema,
        query: str,
        generation_method: str = "gemini_open_domain"
    ) -> Dict[str, Any]:
        """Formats validated Pydantic model into the standard curriculum concept dictionary."""
        subject = cls._infer_subject(query)
        grade_level = cls._infer_grade_level(query)

        scenes_dict = [s.model_dump() for s in validated.scenes]
        quiz_dict = validated.quiz.model_dump()

        return {
            "subject": subject,
            "grade_level": grade_level,
            "topic": f"{subject} Inquiry",
            "concept": validated.concept,
            "standard_explanation": validated.explanation,
            "simplified_explanation": validated.explanation,
            "key_points": validated.key_points or [f"Core principle of {validated.concept}."],
            "visual_scenes": scenes_dict,
            "sign_glossary": validated.sign_glossary or [
                {
                    "term": validated.concept,
                    "gloss": f"{validated.concept.upper().split()[0]}-CONCEPT",
                    "description": f"Dominant hand outlines the motion or shape of {validated.concept} in front of chest.",
                    "handshape": "Open handshape",
                    "movement": "Illustrative motion in torso space",
                    "asset_placeholder": "sign_universal.svg"
                }
            ],
            "assessment_questions": [quiz_dict],
            "is_ai_generated": True,
            "curriculum_source": "ai_generated",
            "generation_method": generation_method
        }

    @classmethod
    def _synthesize_template(
        cls,
        query: str,
        target_dir: Optional[Path] = None,
        learner_type: str = "general",
        accessibility_requirements: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Deterministic Template Provider fallback.
        Generates 4 to 7 scenes strictly compliant with ALLOWED_ACTIONS and ALLOWED_VISUAL_ELEMENTS.
        """
        clean_query = query.strip()
        topic_title = re.sub(
            r"^(what\s+is\s+|explain\s+|tell\s+me\s+about\s+|how\s+do\s+|how\s+does\s+|why\s+is\s+|can\s+you\s+teach\s+)",
            "",
            clean_query,
            flags=re.IGNORECASE
        )
        topic_title = topic_title.strip("? .!").title()
        if not topic_title:
            topic_title = "Science and Nature Inquiry"

        subject = cls._infer_subject(clean_query)
        grade_level = cls._infer_grade_level(clean_query)
        query_lower = clean_query.lower()

        # 1. Aviation / Airplane Flight Specialized 4-Scene Sequence
        if any(w in query_lower for w in ["airplane", "aeroplane", "plane", "fly", "flight", "wing"]):
            concept_name = "How Airplanes Fly in the Sky"
            standard_exp = (
                "Airplanes fly through the interaction of four aerodynamic forces: Lift, Weight, Thrust, and Drag. "
                "The airplane's wings feature a curved airfoil shape designed according to Bernoulli's principle. "
                "As the airplane moves forward, air flows faster over the curved upper surface, creating a region of lower pressure. "
                "The higher pressure air beneath the wing pushes upward, generating Lift. "
                "Simultaneously, jet engines or propellers generate forward Thrust that overcomes aerodynamic Drag, allowing the aircraft to rise and cruise smoothly."
            )
            simplified_exp = (
                "Airplanes have special curved wings and powerful engines! "
                "1. Engines push the plane forward very fast. "
                "2. Air rushes over the curved wings and creates a giant invisible push called Lift. "
                "3. The lift pushes the plane high into the sky so it glides smoothly like a bird!"
            )
            visual_scenes = [
                {
                    "scene": 1,
                    "title": "Inspecting the Aerodynamic Wings",
                    "description": "A streamlined airplane on the runway showing the specially curved wings and tail fin.",
                    "visual_elements": ["airplane_body", "airplane_wings", "curved_wing"],
                    "animation_action": "air_wing_lift",
                    "caption": "Step 1: Look at the airplane! Its wings have a special curved shape called an airfoil.",
                    "duration_seconds": 4
                },
                {
                    "scene": 2,
                    "title": "Airflow Creates Upward Lift",
                    "description": "Air flows faster over the curved top, creating lower pressure that pulls the wing upward.",
                    "visual_elements": ["airplane_wing_airfoil", "fast_air_top", "slow_air_bottom", "low_pressure", "high_pressure", "lift_arrow"],
                    "animation_action": "air_wing_lift",
                    "caption": "Step 2: Fast air rushes over the wing, creating lower pressure on top. Higher pressure underneath pushes UP with Lift!",
                    "duration_seconds": 4
                },
                {
                    "scene": 3,
                    "title": "Engines Push Forward with Thrust",
                    "description": "Jet engines ignite with exhaust fire, pushing the airplane forward against air resistance.",
                    "visual_elements": ["airplane_jet_thrust", "thrust_arrow", "clouds"],
                    "animation_action": "air_thrust_forward",
                    "caption": "Step 3: Powerful jet engines push the airplane forward with Thrust, beating air drag!",
                    "duration_seconds": 4
                },
                {
                    "scene": 4,
                    "title": "Steady Cruising with Balanced Flight Forces",
                    "description": "The airplane cruises at steady altitude where upward Lift balances downward Weight and forward Thrust balances Drag.",
                    "visual_elements": ["airplane_body", "airplane_wings", "sky", "clouds", "lift_arrow", "thrust_arrow"],
                    "animation_action": "airplane_cruising_flight",
                    "caption": "Step 4: Lift balances Weight while Thrust balances Drag! The airplane cruises smoothly through the sky.",
                    "duration_seconds": 4
                }
            ]
            if learner_type == "down_syndrome":
                quiz_question = {
                    "question_id": "dyn_flight_q1",
                    "concept": concept_name,
                    "question": "What pushes the airplane up into the sky?",
                    "expected_answer": "Lift from air flowing over the wings",
                    "options": [
                        "Lift from air flowing over the wings",
                        "Thrust from engines moving forward",
                        "Weight from gravity pulling it down",
                        "Friction from wind slowing it down"
                    ],
                    "hint": "Remember: air rushing over the curved wings creates upward Lift!"
                }
            else:
                quiz_question = {
                    "question_id": "dyn_flight_q1",
                    "concept": concept_name,
                    "question": "What invisible aerodynamic force pushes an airplane's wings upward into the sky?",
                    "expected_answer": "Lift force generated as airflow passes over curved wings",
                    "options": [
                        "Lift force generated as airflow passes over curved wings",
                        "Engine thrust pushing forward against resisting air drag",
                        "Downward gravity pulling the airplane toward the ground",
                        "Buoyancy force from warm air rising underneath fuselage"
                    ],
                    "hint": "Think about the special curved shape of the wings and Bernoulli's principle."
                }
            key_points = [
                "Wings are curved (airfoil) so air moves faster over the top.",
                "Faster air creates lower pressure on top and higher pressure below, producing Lift.",
                "Engines produce forward Thrust to overcome Drag.",
                "When Lift equals Weight and Thrust equals Drag, the plane cruises steadily."
            ]

        # 2. Blue Sky / Rayleigh Scattering Specialized 4-Scene Sequence
        elif any(w in query_lower for w in ["sky", "blue", "atmosphere", "scatter", "rayleigh"]):
            concept_name = "Why the Sky is Blue"
            standard_exp = (
                "The sky appears blue because of a physical phenomenon known as Rayleigh Scattering. "
                "Sunlight reaching Earth may look white, but it is actually composed of all colors of the visible spectrum. "
                "Each color travels in waves: red light has long, lazy wavelengths, while blue and violet light have short, choppy wavelengths. "
                "When sunlight enters Earth's atmosphere, it collides with microscopic nitrogen and oxygen gas molecules. "
                "These tiny gas molecules scatter the short blue wavelengths in every direction across the atmosphere much more than red light, coloring the sky a brilliant blue."
            )
            simplified_exp = (
                "The sun sends white light to Earth, which is made of all rainbow colors! "
                "1. Red light travels in long waves and goes straight through. "
                "2. Blue light travels in short, bouncy waves. "
                "3. Tiny air particles in the sky bump into the blue waves and scatter them everywhere, making the whole sky look blue!"
            )
            visual_scenes = [
                {
                    "scene": 1,
                    "title": "The Sun Shines White Light",
                    "description": "The bright yellow sun in space sends beams of sunlight toward planet Earth.",
                    "visual_elements": ["sun", "sun_rays", "white_light"],
                    "animation_action": "sun_glow",
                    "caption": "Step 1: The sun shines bright sunlight toward Earth. Sunlight looks white to our eyes.",
                    "duration_seconds": 4
                },
                {
                    "scene": 2,
                    "title": "Sunlight is a Rainbow Spectrum",
                    "description": "White light passes through a prism, separating into red, orange, yellow, green, and blue waves.",
                    "visual_elements": ["light_spectrum_prism", "color_spectrum", "rainbow", "blue_light_waves", "red_light_waves"],
                    "animation_action": "sunlight_prism_spectrum",
                    "caption": "Step 2: Sunlight is actually made of all rainbow colors! Blue light has short, choppy waves.",
                    "duration_seconds": 4
                },
                {
                    "scene": 3,
                    "title": "Air Particles Scatter Blue Light",
                    "description": "Tiny nitrogen and oxygen molecules in the atmosphere scatter short blue waves in all directions.",
                    "visual_elements": ["atmosphere_particle_scatter", "gas_molecules", "scattered_blue_rays", "rayleigh_wave_ripples"],
                    "animation_action": "sky_scattering_blue",
                    "caption": "Step 3: Rayleigh Scattering! Tiny gas particles in the air bounce and scatter blue light in every direction!",
                    "duration_seconds": 4
                },
                {
                    "scene": 4,
                    "title": "Daylight Sky Illuminated by Rayleigh Scattering",
                    "description": "The daytime atmosphere radiates brilliant blue from sunlight scattering off atmospheric gas particles.",
                    "visual_elements": ["sky", "atmosphere", "sun", "scattered_blue_rays", "blue_light_waves"],
                    "animation_action": "sky_blue_daylight",
                    "caption": "Step 4: Scattered blue light illuminates the daytime atmosphere, giving us our bright blue sky!",
                    "duration_seconds": 4
                }
            ]
            if learner_type == "down_syndrome":
                quiz_question = {
                    "question_id": "dyn_sky_q1",
                    "concept": concept_name,
                    "question": "Which light scatters the most to make the sky blue?",
                    "expected_answer": "Blue light with short bouncy waves",
                    "options": [
                        "Blue light with short bouncy waves",
                        "Red light with long straight waves",
                        "Green light with medium soft waves",
                        "Yellow light with bright sun waves"
                    ],
                    "hint": "Tiny air particles scatter the short, bouncy blue waves everywhere!"
                }
            else:
                quiz_question = {
                    "question_id": "dyn_sky_q1",
                    "concept": concept_name,
                    "question": "Why does the daytime sky appear blue rather than red?",
                    "expected_answer": "Air molecules scatter short blue light waves in all directions",
                    "options": [
                        "Air molecules scatter short blue light waves in all directions",
                        "Air molecules absorb longer red light waves into outer space",
                        "Ocean water reflects blue light waves upward toward clouds",
                        "Atmospheric dust filters out yellow and orange wavelengths"
                    ],
                    "hint": "Remember that blue light travels in short, bouncy waves that scatter easily when hitting air molecules."
                }
            key_points = [
                "Sunlight is made of all rainbow colors combined.",
                "Blue light travels in shorter, smaller wavelengths than red light.",
                "Tiny gas particles in Earth's atmosphere scatter short blue waves most effectively (Rayleigh scattering).",
                "Scattered blue light travels in every direction, filling the entire daytime sky."
            ]

        # 3. General Open-Domain Topic (4-Scene Sequence with Allowed Actions)
        else:
            concept_name = topic_title
            standard_exp = (
                f"{topic_title} is a fundamental concept in {subject}. "
                f"It describes how physical, biological, or chemical principles operate systematically. "
                f"Through observation and scientific analysis, we see how components interact and transform step by step."
            )
            simplified_exp = (
                f"Let's explore {topic_title} together! "
                f"Nature works like a helpful story where every part has an important job. "
                f"When we look at it step by step, it is very clear and easy to understand!"
            )
            visual_scenes = [
                {
                    "scene": 1,
                    "title": f"Introducing {topic_title}",
                    "description": f"A clear visual introduction showing the foundational elements of {topic_title}.",
                    "visual_elements": ["introduction", "main_object", "gentle_glow"],
                    "animation_action": "generic_stage_intro",
                    "caption": f"Step 1: Here is {topic_title}! Notice the main starting elements.",
                    "duration_seconds": 4
                },
                {
                    "scene": 2,
                    "title": "The Active Transformation",
                    "description": "Active scientific processes transforming energy, materials, or forces step by step.",
                    "visual_elements": ["process_arrows", "main_object"],
                    "animation_action": "generic_stage_process",
                    "caption": "Step 2: Watch how the active parts interact and begin moving!",
                    "duration_seconds": 4
                },
                {
                    "scene": 3,
                    "title": "How the Components Connect",
                    "description": "Continuous process showing components working together harmoniously.",
                    "visual_elements": ["process_arrows", "gentle_glow"],
                    "animation_action": "generic_stage_process",
                    "caption": "Step 3: All the parts work together in harmony to complete the process.",
                    "duration_seconds": 4
                },
                {
                    "scene": 4,
                    "title": f"Key Discovery & Real-World Application of {topic_title}",
                    "description": f"Real-world application showing {topic_title} functioning in {subject}.",
                    "visual_elements": ["main_object", "process_arrows", "gentle_glow", "atmosphere"],
                    "animation_action": "topic_synthesis_summary",
                    "caption": f"Step 4: All fundamental components operate together, demonstrating the core principle of {topic_title}.",
                    "duration_seconds": 4
                }
            ]
            if learner_type == "down_syndrome":
                quiz_question = {
                    "question_id": f"dyn_{abs(hash(topic_title)) % 10000}_q1",
                    "concept": concept_name,
                    "question": f"What did we learn about {concept_name} today?",
                    "expected_answer": f"It works step-by-step in the natural world",
                    "options": [
                        f"It works step-by-step in the natural world",
                        f"It stays locked inside an underground rock",
                        f"It disappears forever whenever night comes",
                        f"It has no connection to everyday science"
                    ],
                    "hint": f"Remember how {concept_name} works in small, helpful steps!"
                }
            else:
                quiz_question = {
                    "question_id": f"dyn_{abs(hash(topic_title)) % 10000}_q1",
                    "concept": concept_name,
                    "question": f"What fundamental principle governs how {concept_name} operates?",
                    "expected_answer": f"It operates through interconnected scientific interactions",
                    "options": [
                        f"It operates through interconnected scientific interactions",
                        f"It relies solely on random unpredictable energy changes",
                        f"It functions without any transformation of physical states",
                        f"It produces outcomes without following natural law order"
                    ],
                    "hint": f"Think about how {concept_name} follows regular scientific processes."
                }
            key_points = [
                f"{concept_name} is an essential concept in {subject}.",
                "Taking small, sequential steps helps us understand how it functions.",
                "It connects directly to principles we observe in our daily environment.",
                "Understanding it builds a strong foundation for future learning."
            ]

        # Build Sign Gloss Flashcards for Deaf learners (Note: placeholder glosses, not verified ISL/ASL)
        core_word = concept_name.split()[0] if concept_name else "Concept"
        sign_glossary = [
            {
                "term": concept_name,
                "gloss": f"{core_word.upper()}-CONCEPT",
                "description": f"Dominant hand outlines the shape or motion of {concept_name} in front of chest. (placeholder glosses, not verified ISL/ASL)",
                "handshape": "Open hand to focused shape",
                "movement": "Deliberate illustrative movement in torso space",
                "asset_placeholder": "sign_universal.svg"
            },
            {
                "term": "Air / Nature",
                "gloss": "AIR-WIND",
                "description": "Both open hands wave gently side to side in front of body, indicating airflow. (placeholder glosses, not verified ISL/ASL)",
                "handshape": "Open 5 handshape waving",
                "movement": "Gentle horizontal wave",
                "asset_placeholder": "sign_learn.svg"
            },
            {
                "term": "Science Principle",
                "gloss": "HOW-WORK",
                "description": "Both fists tap wrists together with rotating motion showing mechanisms working. (placeholder glosses, not verified ISL/ASL)",
                "handshape": "S-fists tapping",
                "movement": "Alternating rhythmic wrist taps",
                "asset_placeholder": "sign_work.svg"
            }
        ]

        # Validate with OpenDomainSynthesisSchema to guarantee 100% schema compliance
        validated_data = OpenDomainSynthesisSchema(
            concept=concept_name,
            explanation=simplified_exp if learner_type == "down_syndrome" else standard_exp,
            scenes=visual_scenes,
            quiz=quiz_question,
            key_points=key_points,
            sign_glossary=sign_glossary
        )

        return cls._format_validated_result(
            validated=validated_data,
            query=clean_query,
            generation_method="template_open_domain"
        )

    @classmethod
    def _infer_subject(cls, text: str) -> str:
        text_lower = text.lower()
        for subject, keywords in cls.SUBJECT_KEYWORDS.items():
            if any(k in text_lower for k in keywords):
                return subject
        return "General Science & Inquiry"

    @classmethod
    def _infer_grade_level(cls, text: str) -> int:
        text_lower = text.lower()
        if any(w in text_lower for w in ["airplane", "fly", "flight", "wing", "thrust", "lift", "sky", "blue", "scatter"]):
            return 6
        if any(w in text_lower for w in ["montessori", "kindergarten", "preschool"]):
            return 0
        if any(w in text_lower for w in ["10", "tenth", "trig", "ohm", "circulat"]):
            return 10
        if any(w in text_lower for w in ["9", "ninth", "atom", "gravit"]):
            return 9
        if any(w in text_lower for w in ["8", "eighth", "cell"]):
            return 8
        if any(w in text_lower for w in ["7", "seventh", "acid"]):
            return 7
        if any(w in text_lower for w in ["6", "sixth", "magnet"]):
            return 6
        return 5
