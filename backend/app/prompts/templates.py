from typing import List, Dict, Any, Optional

PROMPT_VERSION = "1.0.0"

SYSTEM_ROLE_PROMPT = """You are an expert, empathetic, accessibility-first AI Educational Tutor designed for inclusive education.
Your core teaching philosophy is: SAME KNOWLEDGE → DIFFERENT TEACHING REPRESENTATION.

Your core responsibilities:
1. Always ground your explanations strictly in the retrieved curriculum facts. Do NOT hallucinate unsupported scientific claims.
2. Adapt the teaching representation strictly to the learner's accessibility requirements.
   - For Deaf learners: Emphasize rich visual descriptions, clear text captions, diagrammatic structure, and sign-language gloss support. Audio must NEVER be required for comprehension.
   - For learners with Down syndrome: Use simple language, short sentences, small digestible steps, concrete nouns, visual storytelling, and comforting encouragement.
3. If the learner previously struggled or failed an assessment, do not simply repeat the same phrasing. Simplify, introduce concrete metaphors, or decompose the concept into micro-steps.
4. Output strictly structured JSON matching the requested schema.
"""

def build_lesson_generation_prompt(
    concept: str,
    learner_type: str,
    accessibility_requirements: List[str],
    retrieved_curriculum: str,
    requested_representation: str,
    adaptation_action: Optional[str] = None,
    previous_attempt_info: Optional[str] = None
) -> str:
    reqs_str = ", ".join(accessibility_requirements) if accessibility_requirements else "Standard accessibility"
    
    prompt = f"""### LESSON GENERATION TASK (Prompt Version: {PROMPT_VERSION})

**Target Concept:** {concept}
**Learner Type:** {learner_type}
**Accessibility Requirements:** {reqs_str}
**Requested Representation:** {requested_representation}
"""

    if adaptation_action:
        prompt += f"**Pedagogical Adaptation Action:** {adaptation_action}\n"
    if previous_attempt_info:
        prompt += f"**Previous Assessment Context:** {previous_attempt_info}\n"

    prompt += f"""
### RETRIEVED CURRICULUM KNOWLEDGE (Grounded Source Material):
{retrieved_curriculum}

### REQUIRED OUTPUT FORMAT:
Return a valid JSON object with the following fields:
{{
  "concept": "{concept}",
  "learner_type": "{learner_type}",
  "representation": "{requested_representation}",
  "title": "<Engaging, accessible title>",
  "content": "<Adapted teaching explanation strictly grounded in curriculum>",
  "steps": [
    "<Step 1>",
    "<Step 2>",
    "<Step 3>"
  ],
  "visual_scenes": [
    {{
      "scene": 1,
      "title": "<Scene title>",
      "description": "<Visual scene description>",
      "visual_elements": ["element1", "element2"],
      "animation_action": "<action_name>",
      "caption": "<Clear caption for Deaf/accessible learners>",
      "duration_seconds": 4
    }}
  ],
  "sign_support": [
    {{
      "term": "<Key word>",
      "gloss": "<SIGN-GLOSS>",
      "description": "<Handshape and movement description (placeholder glosses, not verified ISL/ASL)>",
      "handshape": "<Handshape description>",
      "movement": "<Movement description>",
      "asset_placeholder": "sign_<keyword>.svg"
    }}
  ],
  "assessment": {{
    "question_id": "{concept.lower()}_q1",
    "concept": "{concept}",
    "question": "<Simple question checking understanding>",
    "expected_answer": "<Target answer>",
    "options": ["<Option A>", "<Option B>", "<Option C>", "<Option D>"],
    "hint": "<Encouraging hint>",
    "visual_cue": "<Cue name>"
  }}
}}

CRITICAL PEDAGOGICAL & SCENE RULES:
1. Topic-Specific Final Scene: The final scene of the lesson MUST be topic-specific, demonstrating the actual physical or conceptual result (NOT generic sparkles).
2. Quiz Distractors: All quiz distractors MUST be plausible (realistic scientific alternatives or common misconceptions) and similar in length to the correct answer.
3. Down Syndrome Profile Rule: If the learner has Down syndrome ('down_syndrome'), the quiz question MUST test ONLY ONE simple, concrete idea from the lesson. Do NOT test multi-step logic, compound facts, or negative phrasing.
4. Sign Gloss Notice: All sign glosses are placeholder glosses, not verified ISL/ASL.
"""
    return prompt.strip()
