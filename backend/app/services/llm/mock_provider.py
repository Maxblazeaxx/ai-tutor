import logging
from typing import Dict, Any, List
from backend.app.services.llm.base import BaseLLMProvider
from backend.app.services.rag.retriever import curriculum_retriever

logger = logging.getLogger(__name__)

class MockPedagogicalProvider(BaseLLMProvider):
    """
    Deterministic Pedagogical Generation Provider (Fallback/Offline Mode).
    Grounds output directly in retrieved curriculum knowledge and applies
    accessibility-first transformations tailored to learner profiles.
    Ensures the system operates 100% reliably even without external cloud APIs.
    """

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        prompt_lower = prompt.lower()
        # Friendly inclusive greeting handling
        if any(g in prompt_lower for g in ["hello", "hi ", "hey", "who are you", "what can you do"]):
            return (
                "Hello! I am your Inclusive AI Learning Partner. 🌱\n\n"
                "I am specially designed to support Deaf learners and learners with Down syndrome through:\n"
                "- 🎬 Visual Stories & 60 FPS Micro-Animations\n"
                "- 🤟 Sign-Language Gloss Support (ASL/ISL)\n"
                "- 🧠 Interactive Spatial Concept Mind Maps\n"
                "- 📖 Simple 3-step Micro-Lessons\n\n"
                "Ask me any question about science, math, or nature, and let's explore together!"
            )

        # Extract concept from prompt
        concept_data = self._find_relevant_concept(prompt)
        concept = concept_data.get("concept", "Science Concept")
        
        if "down_syndrome" in prompt_lower or "simple" in prompt_lower:
            return (
                f"# Learning {concept} 🌱\n\n"
                f"{concept_data.get('simplified_explanation')}\n\n"
                f"**Remember this simple rule:** {concept_data.get('key_points', ['Take small steps!'])[0]}"
            )
        else:
            return (
                f"# Understanding {concept}\n\n"
                f"{concept_data.get('standard_explanation')}\n\n"
                f"**Key Points:**\n" + "\n".join([f"- {p}" for p in concept_data.get('key_points', [])])
            )

    def generate_structured(self, prompt: str, system_prompt: str = "") -> Dict[str, Any]:
        concept_data = self._find_relevant_concept(prompt)
        concept = concept_data.get("concept", "Photosynthesis")
        
        is_down_syndrome = "down_syndrome" in prompt.lower() or "micro_learning" in prompt.lower()
        is_deaf = "deaf" in prompt.lower() or "sign_support" in prompt.lower()
        is_simplify = "simplify" in prompt.lower() or "simplified" in prompt.lower()
        is_more_visual = "more_visual" in prompt.lower() or "visual" in prompt.lower()

        # Build tailored content and representation
        visual_scenes = concept_data.get("visual_scenes", [])
        sign_support = concept_data.get("sign_glossary", [])
        key_points = concept_data.get("key_points", [])
        simplified = concept_data.get("simplified_explanation", "")
        standard = concept_data.get("standard_explanation", "")

        if is_down_syndrome:
            rep = "visual_animation"
            title = f"Visual Story: Exploring {concept}"
            
            if is_simplify:
                title = f"Simple Steps: Understanding {concept}"
                # Derive concise 3-step sequence
                if visual_scenes and len(visual_scenes) >= 3:
                    steps = [s.get("caption") or s.get("title") for s in visual_scenes[:3]]
                elif key_points:
                    steps = [f"Step {i+1}: {pt}" for i, pt in enumerate(key_points[:3])]
                else:
                    steps = [
                        f"Step 1: Look at {concept}.",
                        f"Step 2: Notice how {concept} works.",
                        f"Step 3: Great job learning about {concept}!"
                    ]
                content = simplified or standard
            else:
                content = simplified or standard
                if visual_scenes:
                    steps = [s.get("caption") or s.get("title") for s in visual_scenes]
                elif key_points:
                    steps = [f"Step {i+1}: {pt}" for i, pt in enumerate(key_points)]
                else:
                    steps = [f"Point {i+1}: {p.strip()}" for i, p in enumerate(content.split(". ")[:5]) if p.strip()]
            
            sign_support = sign_support[:3]

        elif is_deaf:
            rep = "visual_sign_supported"
            title = f"Visual & Sign Guide: {concept}"
            content = f"**Visual Overview:** {simplified}\n\n**Scientific Explanation:** {standard}"
            if key_points:
                steps = [f"Key Idea {i+1}: {pt}" for i, pt in enumerate(key_points)]
            elif visual_scenes:
                steps = [s.get("caption") or s.get("title") for s in visual_scenes]
            else:
                steps = [f"Concept Step {i+1}: {p.strip()}" for i, p in enumerate(content.split(". ")[:4]) if p.strip()]

        else:
            rep = "standard_interactive"
            title = f"Interactive Lesson: {concept}"
            content = standard or simplified
            steps = key_points if key_points else [f"Point {i+1}: {p.strip()}" for i, p in enumerate(content.split(". ")[:4])]
            sign_support = []

        # Select appropriate assessment question
        questions = concept_data.get("assessment_questions", [])
        if questions:
            if is_down_syndrome and len(questions) > 1:
                assessment = questions[0]
            else:
                assessment = questions[0]
        else:
            first_pt = key_points[0] if key_points else (simplified[:40] if simplified else f"Understanding {concept}")
            assessment = {
                "question_id": f"{concept.lower().replace(' ', '_')}_default_q",
                "concept": concept,
                "question": f"What is an essential fact about {concept}?",
                "expected_answer": first_pt,
                "options": [first_pt, "It has no effect on nature", "It only happens in outer space", "It disappears immediately"],
                "hint": f"Remember what we learned about {concept}."
            }

        return {
            "concept": concept,
            "learner_type": "down_syndrome" if is_down_syndrome else ("deaf" if is_deaf else "general"),
            "representation": rep,
            "title": title,
            "content": content,
            "steps": steps,
            "visual_scenes": visual_scenes,
            "sign_support": sign_support,
            "assessment": assessment,
            "adaptation_metadata": {
                "engine": "mock_pedagogical_provider",
                "grounded": True,
                "curriculum_concept": concept,
                "applied_style": "simplified_micro_learning" if is_down_syndrome else ("visual_sign_first" if is_deaf else "standard")
            }
        }

    def _find_relevant_concept(self, text: str) -> Dict[str, Any]:
        import re
        # 1. Check explicit Target Concept header from prompt template
        match = re.search(r"\*\*Target Concept:\*\*\s*(.+)", text)
        if match:
            target = match.group(1).strip()
            data = curriculum_retriever.get_concept_data(target)
            if data:
                return data

        text_lower = text.lower()
        # 2. Check all registered curriculum topics directly
        for topic_item in curriculum_retriever.get_all_topics():
            topic_name = topic_item.get("concept", "") if isinstance(topic_item, dict) else str(topic_item)
            if topic_name and topic_name.lower() in text_lower:
                data = curriculum_retriever.get_concept_data(topic_name)
                if data:
                    return data

        # 3. Fallback keyword checks
        if "gravity" in text_lower or "fall" in text_lower or "drop" in text_lower:
            data = curriculum_retriever.get_concept_data("Gravity and Falling Objects")
            if data:
                return data
        elif "fraction" in text_lower or "half" in text_lower or "quarter" in text_lower or "pizza" in text_lower:
            data = curriculum_retriever.get_concept_data("Fractions (Halves and Quarters)")
            if data:
                return data
        elif "water" in text_lower or "rain" in text_lower or "evaporation" in text_lower:
            data = curriculum_retriever.get_concept_data("Water Cycle")
            if data:
                return data
        elif "solar" in text_lower or "planet" in text_lower or "orbit" in text_lower:
            data = curriculum_retriever.get_concept_data("Solar System")
            if data:
                return data

        # 4. Dynamic general retrieval
        dynamic_data = curriculum_retriever.get_concept_data(text)
        if dynamic_data:
            return dynamic_data

        data = curriculum_retriever.get_concept_data("Photosynthesis")
        if data:
            return data
        return {
            "concept": "Photosynthesis",
            "subject": "Science",
            "standard_explanation": "Plants use sunlight, water, and carbon dioxide to make food and release oxygen.",
            "simplified_explanation": "Sun shines, roots drink water, leaves make food and give fresh oxygen.",
            "key_points": ["Sunlight", "Water", "Carbon Dioxide", "Oxygen", "Food"],
            "visual_scenes": [],
            "sign_glossary": [],
            "assessment_questions": []
        }
