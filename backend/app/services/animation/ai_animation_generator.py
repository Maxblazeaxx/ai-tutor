"""
AI Animation Generator Service — Phase 2
Calls Gemini to generate a fully AI-specified SVG animation lesson.
Falls back to a deterministic template if the LLM call or schema validation fails.
"""
import json
import logging
from typing import List, Dict, Any, Optional

from backend.app.schemas.ai_animation_schema import AIAnimationLesson
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

SYSTEM_PROMPT = (
    "You are an expert educational animation designer specialising in inclusive learning "
    "for Deaf learners and learners with Down syndrome. "
    "You generate detailed SVG scene specifications as valid JSON — no markdown fences, no prose."
)

ANIMATION_PROMPT_TEMPLATE = """\
Generate a JSON object describing an animated SVG educational lesson about: "{concept}"
Learner type: {learner_type}
Accessibility requirements: {accessibility_reqs}

The JSON must match this exact structure:
{{
  "concept": "<topic name>",
  "explanation": "<2–3 sentence plain-English explanation>",
  "generation_method": "gemini_ai_animation",
  "is_ai_generated": true,
  "scenes": [  // 3 to 7 scenes
    {{
      "scene_index": 1,
      "title": "<scene title>",
      "caption": "<short caption shown below canvas>",
      "duration_ms": 4000,
      "canvas_width": 800,
      "canvas_height": 400,
      "background_color": "#0f172a",   // dark/rich colour
      "narration_text": "<what is happening in this scene>",
      "accessibility_description": "<plain English for screen readers>",
      "elements": [   // 1–20 SVG elements
        {{
          "id": "descriptive_id",
          "type": "rect|circle|ellipse|path|text|line|polygon|polyline|arrow",
          "label": "<human-readable label>",
          "x": 100, "y": 100,
          "width": 80, "height": 60,   // rect
          "r": 50,                      // circle
          "rx": 60, "ry": 30,          // ellipse
          "d": "M…",                   // path
          "x1": 100, "y1": 200, "x2": 500, "y2": 200,  // line/arrow
          "points": "x1,y1 x2,y2 …",  // polygon/polyline
          "text_content": "Label",     // text only
          "font_size": 18,
          "font_weight": "bold",
          "fill": "#3b82f6",
          "stroke": "#93c5fd",
          "stroke_width": 2.0,
          "opacity": 1.0,
          "animation_duration_ms": 2000,
          "animation_easing": "ease-in-out",
          "animation_loop": false,
          "keyframes": [
            {{"t_ms": 0, "opacity": 0, "scale": 0.3}},
            {{"t_ms": 2000, "opacity": 1, "scale": 1.0}}
          ]
        }}
      ]
    }}
  ],
  "quiz": {{
    "question_id": "ai_gen_quiz_1",
    "concept": "<topic>",
    "question": "<question about the topic>",
    "expected_answer": "<correct answer>",
    "options": ["<correct>", "<wrong1>", "<wrong2>", "<wrong3>"],
    "hint": "<helpful hint>"
  }},
  "key_points": ["<point 1>", "<point 2>", "<point 3>"],
  "sign_glossary": [
    {{"term": "<word>", "gloss": "<GLOSS-TERM>", "description": "<signing description>"}}
  ]
}}

RULES:
- Canvas viewBox: 800 × 400.  Keep all coordinates within [0,800] × [0,400].
- Each element MUST have: id, type, fill, and at least 2 keyframes (t_ms=0 and t_ms=animation_duration_ms).
- Text elements MUST include text_content.
- Arrow elements use x1,y1 → x2,y2 with a label for the arrowhead.
- Background colours must be dark/rich (e.g. #0f172a, #1e1b4b, #052e16, #0c1a3a).
- Element ids must be descriptive (e.g. "wing_body", "lift_arrow_1", "sun_circle").
- Narration text should explain what is happening in the scene in simple language.
- accessibility_description: a plain English description for screen readers / sign support.
- Respond ONLY with the JSON object — no markdown fences, no extra text.
"""


class AIAnimationGenerator:
    """Generates AI-specified SVG animation lessons via Gemini with fallback."""

    # ------------------------------------------------------------------
    # Public entry point
    # ------------------------------------------------------------------
    @classmethod
    def generate(
        cls,
        query: str,
        learner_type: str = "general",
        accessibility_requirements: Optional[List[str]] = None,
    ) -> dict:
        """
        Returns a dict conforming to AIAnimationLesson.
        Tries Gemini first; falls back to template on any error.
        """
        accessibility_reqs = ", ".join(accessibility_requirements or []) or "none"
        prompt = ANIMATION_PROMPT_TEMPLATE.format(
            concept=query,
            learner_type=learner_type,
            accessibility_reqs=accessibility_reqs,
        )

        try:
            raw = cls._call_gemini(prompt)
            lesson = AIAnimationLesson.model_validate(raw)
            return lesson.model_dump()
        except Exception as first_err:
            logger.warning(f"[AIAnimationGenerator] First attempt failed: {first_err}. Retrying…")
            # Retry once with the error appended to the prompt
            retry_prompt = (
                prompt
                + f"\n\nYour previous response failed validation with this error:\n{first_err}\n"
                "Please fix and return a corrected JSON only."
            )
            try:
                raw = cls._call_gemini(retry_prompt)
                lesson = AIAnimationLesson.model_validate(raw)
                return lesson.model_dump()
            except Exception as second_err:
                logger.warning(f"[AIAnimationGenerator] Retry also failed: {second_err}. Using template fallback.")
                return cls._generate_template_fallback(query, learner_type)

    # ------------------------------------------------------------------
    # Gemini call helper
    # ------------------------------------------------------------------
    @classmethod
    def _call_gemini(cls, prompt: str) -> dict:
        import httpx

        api_key = settings.GEMINI_API_KEY
        if not api_key:
            raise ValueError("GEMINI_API_KEY not configured — cannot call Gemini.")

        model = "gemini-1.5-flash"
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "systemInstruction": {"parts": [{"text": SYSTEM_PROMPT}]},
        }
        with httpx.Client(timeout=60.0) as client:
            resp = client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()

        raw_text = data["candidates"][0]["content"]["parts"][0]["text"]
        cleaned = raw_text.strip()
        for fence in ("```json", "```"):
            if cleaned.startswith(fence):
                cleaned = cleaned[len(fence):]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        return json.loads(cleaned.strip())

    # ------------------------------------------------------------------
    # Template fallback — deterministic 3-scene lesson
    # ------------------------------------------------------------------
    @staticmethod
    def _generate_template_fallback(query: str, learner_type: str) -> dict:
        topic = query.strip().title()
        return {
            "concept": topic,
            "explanation": f"{topic} is a fascinating concept that shapes our world.",
            "generation_method": "template_fallback",
            "is_ai_generated": False,
            "scenes": [
                {
                    "scene_index": 1,
                    "title": f"Understanding {topic}",
                    "caption": f"Step 1: Let's explore {topic}!",
                    "duration_ms": 4000,
                    "canvas_width": 800,
                    "canvas_height": 400,
                    "background_color": "#0f172a",
                    "accessibility_description": f"Introduction to {topic}",
                    "narration_text": f"Today we learn about {topic}.",
                    "elements": [
                        {
                            "id": "bg_glow",
                            "type": "circle",
                            "x": 400,
                            "y": 200,
                            "r": 120,
                            "fill": "#1e3a5f",
                            "opacity": 0.6,
                            "keyframes": [
                                {"t_ms": 0, "opacity": 0, "scale": 0.5},
                                {"t_ms": 1500, "opacity": 0.6, "scale": 1.0},
                            ],
                            "animation_duration_ms": 2000,
                        },
                        {
                            "id": "concept_circle",
                            "type": "circle",
                            "x": 400,
                            "y": 180,
                            "r": 60,
                            "fill": "#3b82f6",
                            "stroke": "#93c5fd",
                            "stroke_width": 3,
                            "keyframes": [
                                {"t_ms": 0, "opacity": 0, "scale": 0.3},
                                {"t_ms": 1000, "opacity": 1, "scale": 1.0},
                            ],
                            "animation_duration_ms": 1500,
                        },
                        {
                            "id": "concept_label",
                            "type": "text",
                            "x": 400,
                            "y": 310,
                            "text_content": topic,
                            "fill": "#f8fafc",
                            "font_size": 22,
                            "font_weight": "bold",
                            "keyframes": [
                                {"t_ms": 0, "opacity": 0},
                                {"t_ms": 1500, "opacity": 1},
                            ],
                            "animation_duration_ms": 2000,
                        },
                    ],
                },
                {
                    "scene_index": 2,
                    "title": "How It Works",
                    "caption": f"Step 2: Here's how {topic} works!",
                    "duration_ms": 4000,
                    "canvas_width": 800,
                    "canvas_height": 400,
                    "background_color": "#052e16",
                    "accessibility_description": f"Process diagram for {topic}",
                    "narration_text": f"This is how {topic} operates in the real world.",
                    "elements": [
                        {
                            "id": "arrow_main",
                            "type": "arrow",
                            "x1": 150,
                            "y1": 200,
                            "x2": 650,
                            "y2": 200,
                            "fill": "#10b981",
                            "stroke": "#10b981",
                            "stroke_width": 4,
                            "label": "Process Flow",
                            "keyframes": [
                                {"t_ms": 0, "opacity": 0, "scale": 0.5},
                                {"t_ms": 1500, "opacity": 1, "scale": 1.0},
                            ],
                            "animation_duration_ms": 2000,
                        },
                        {
                            "id": "process_text",
                            "type": "text",
                            "x": 400,
                            "y": 320,
                            "text_content": "Active Process",
                            "fill": "#6ee7b7",
                            "font_size": 18,
                            "keyframes": [
                                {"t_ms": 500, "opacity": 0},
                                {"t_ms": 2000, "opacity": 1},
                            ],
                            "animation_duration_ms": 2000,
                        },
                    ],
                },
                {
                    "scene_index": 3,
                    "title": "The Result",
                    "caption": f"Step 3: Now you understand {topic}!",
                    "duration_ms": 4000,
                    "canvas_width": 800,
                    "canvas_height": 400,
                    "background_color": "#1e1b4b",
                    "accessibility_description": f"Summary of {topic}",
                    "narration_text": f"You have learned the key ideas of {topic}. Well done!",
                    "elements": [
                        {
                            "id": "star_1",
                            "type": "polygon",
                            "x": 400,
                            "y": 160,
                            "points": "400,120 415,155 452,155 423,177 433,212 400,192 367,212 377,177 348,155 385,155",
                            "fill": "#fbbf24",
                            "stroke": "#f59e0b",
                            "stroke_width": 2,
                            "keyframes": [
                                {"t_ms": 0, "opacity": 0, "scale": 0.3, "rotate_deg": -180},
                                {"t_ms": 1500, "opacity": 1, "scale": 1.0, "rotate_deg": 0},
                            ],
                            "animation_duration_ms": 2000,
                        },
                        {
                            "id": "summary_text",
                            "type": "text",
                            "x": 400,
                            "y": 300,
                            "text_content": f"You learned: {topic}!",
                            "fill": "#e0e7ff",
                            "font_size": 20,
                            "font_weight": "bold",
                            "keyframes": [
                                {"t_ms": 500, "opacity": 0},
                                {"t_ms": 2000, "opacity": 1},
                            ],
                            "animation_duration_ms": 2000,
                        },
                    ],
                },
            ],
            "quiz": {
                "question_id": "ai_gen_quiz_1",
                "concept": topic,
                "question": f"What is the main idea of {topic}?",
                "expected_answer": "It is a key concept",
                "options": [
                    "It is a key concept",
                    "It is a type of food",
                    "It is a musical instrument",
                    "It is a sport",
                ],
                "hint": f"Think about what we learned in the animation about {topic}!",
            },
            "key_points": [
                f"{topic} is an important concept.",
                "It affects our daily lives.",
                "Understanding it helps us explain the world.",
            ],
            "sign_glossary": [
                {
                    "term": topic,
                    "gloss": f"{topic[:5].upper()}-CONCEPT",
                    "description": "placeholder gloss, not verified ISL/ASL",
                }
            ],
        }
