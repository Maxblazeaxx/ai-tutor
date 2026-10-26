import json
import urllib.request

API_URL = "http://127.0.0.1:8000/api/lesson/generate"

def request_lesson(query: str, learner_id: str):
    payload = json.dumps({
        "learner_id": learner_id,
        "concept_or_query": query
    }).encode("utf-8")
    req = urllib.request.Request(API_URL, data=payload, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def demonstrate():
    test_cases = [
        ("How do airplanes fly?", "deaf_demo_learner", "Deaf Learner (Aarav)"),
        ("How do airplanes fly?", "down_syndrome_demo_learner", "Down Syndrome Learner (Maya)"),
        ("Why is the sky blue?", "deaf_demo_learner", "Deaf Learner (Aarav)"),
        ("Why is the sky blue?", "down_syndrome_demo_learner", "Down Syndrome Learner (Maya)"),
    ]

    print("================================================================================")
    print("OPEN-DOMAIN SYNTHESIS DEMONSTRATION")
    print("================================================================================")

    for query, learner_id, learner_label in test_cases:
        print(f"\n>>> QUERY: '{query}'")
        print(f"    LEARNER: {learner_label}")
        data = request_lesson(query, learner_id)

        print(f"    * Resolved Concept:     {data.get('concept')}")
        print(f"    * Provenance Label:     AI-Generated: {data.get('is_ai_generated')} | Source: {data.get('curriculum_source')} | Method: {data.get('generation_method')}")
        print(f"    * Representation Style: {data.get('representation')}")
        print(f"    * Title:                {data.get('title')}")
        print(f"    * Adapted Explanation:")
        content_preview = data.get('content', '').replace('\n', ' ')[:160] + "..."
        print(f"      \"{content_preview}\"")
        
        scenes = data.get('visual_scenes', [])
        print(f"    * Animation Scenes ({len(scenes)} scenes generated [Constraint 4-7 scenes]):")
        for s in scenes:
            print(f"      - Scene {s.get('scene')}: '{s.get('title')}' | Action: {s.get('animation_action')} | Elements: {s.get('visual_elements')} | Caption: '{s.get('caption')}'")

        sign_items = data.get('sign_support', [])
        if sign_items:
            print(f"    * Sign Support Cards ({len(sign_items)} items):")
            for item in sign_items[:2]:
                print(f"      - Term: '{item.get('term')}' | Gloss: '{item.get('gloss')}' | Description: '{item.get('description')}'")

        quiz = data.get('assessment')
        if quiz:
            print(f"    * Graded Quiz Check:")
            print(f"      - Question: '{quiz.get('question')}'")
            print(f"      - Expected Answer: '{quiz.get('expected_answer')}'")
            print(f"      - Options: {quiz.get('options')}")
            print(f"      - Hint: '{quiz.get('hint')}'")
        print("-" * 80)

if __name__ == "__main__":
    demonstrate()
