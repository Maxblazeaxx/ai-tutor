import urllib.request
import json
import time

time.sleep(1)

test_queries = [
    "Shapes and Colors (Montessori)",
    "Counting Numbers 1 to 5 (Montessori)",
    "States of Matter: Solid, Liquid, and Gas",
    "Magnets and Magnetic Poles (CBSE Grade 6)",
    "Acids, Bases, and Salts (CBSE Grade 7)",
    "Human Circulatory System (CBSE Grade 10)",
    "Electricity and Ohm's Law (CBSE Grade 10)",
    "Trigonometry and Right Triangles (CBSE Grade 10)",
    "How do airplanes fly in the sky?"
]

print("=" * 60)
print("TESTING MONTESSORI TO 10TH GRADE CBSE + OPEN-DOMAIN TOPICS")
print("=" * 60)

for q in test_queries:
    # 1. Down syndrome profile test
    payload_ds = json.dumps({
        "learner_id": "down_syndrome_demo_learner",
        "concept_or_query": q
    }).encode("utf-8")
    
    req_ds = urllib.request.Request(
        "http://127.0.0.1:8000/api/lesson/generate",
        data=payload_ds,
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req_ds) as resp:
        res_ds = json.loads(resp.read().decode())
    
    # 2. Deaf profile test
    payload_deaf = json.dumps({
        "learner_id": "deaf_demo_learner",
        "concept_or_query": q
    }).encode("utf-8")
    
    req_deaf = urllib.request.Request(
        "http://127.0.0.1:8000/api/lesson/generate",
        data=payload_deaf,
        headers={"Content-Type": "application/json"}
    )
    
    with urllib.request.urlopen(req_deaf) as resp:
        res_deaf = json.loads(resp.read().decode())
    
    scenes = res_ds.get("visual_scenes", [])
    first_action = scenes[0].get("animation_action") if scenes else "none"
    q_text = res_ds.get("assessment", {}).get("question", "N/A")
    exp_text = res_ds.get("assessment", {}).get("expected_answer", "N/A")
    signs = res_deaf.get("sign_support", [])
    first_sign = f"{signs[0]['term']} -> {signs[0]['gloss']}" if signs else "none"
    
    print(f"QUERY: '{q}'")
    print(f"  Concept Resolved: {res_ds.get('concept')}")
    print(f"  Down Syndrome: {first_action} ({len(scenes)} scenes) | Title: {res_ds.get('title')}")
    print(f"  Deaf Sign Support: {first_sign} ({len(signs)} signs)")
    print(f"  Assessment: {q_text} -> {exp_text}")
    print("-" * 60)

print("ALL TEST QUERIES COMPLETED SUCCESSFULLY!")
