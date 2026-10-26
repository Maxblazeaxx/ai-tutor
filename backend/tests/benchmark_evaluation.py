import time
import psutil
from backend.app.services.rag.retriever import curriculum_retriever
from backend.app.services.assessment.evaluator import assessment_evaluator
from backend.app.services.adaptation.engine import adaptation_engine
from backend.app.models.domain import LearnerProfile, LearnerType, AdaptationAction
from backend.app.core.hardware import detect_hardware_profile
from backend.app.schemas.api_schemas import LessonGenerateRequest
from backend.app.api.routes import generate_lesson

def run_benchmarks():
    print("=" * 70)
    print(">>> MULTIMODAL INCLUSIVE AI TUTOR - EMPIRICAL BENCHMARK SUITE")
    print("=" * 70)

    # 1. Hardware Profiling
    hw = detect_hardware_profile()
    print(f"\n[1] HOST HARDWARE PROFILE:")
    print(f"  - OS: {hw.get('os')} ({hw.get('architecture')})")
    print(f"  - Logical CPU Cores: {hw.get('cpu_count_logical')}")
    print(f"  - RAM: {hw.get('ram_total_gb')} GB total ({hw.get('ram_available_gb')} GB free)")
    print(f"  - GPU: {hw.get('gpu_name')} (VRAM: {hw.get('vram_gb')} GB)")

    # 2. RAG Retrieval Benchmarks across Montessori to 10th Grade CBSE
    test_queries = [
        ("What is photosynthesis and how do leaves absorb light?", "Photosynthesis"),
        ("How does the water cycle cause clouds and rain?", "Water Cycle"),
        ("How do we cut a pizza into equal halves and quarters?", "Fractions (Halves and Quarters)"),
        ("Which planet do we live on and how does it orbit the sun?", "Solar System"),
        ("Tell me about chlorophyll and carbon dioxide", "Photosynthesis"),
        ("What is evaporation from lakes and oceans?", "Water Cycle"),
        ("Which shape has three corners and looks like a pizza slice?", "Shapes and Colors (Montessori)"),
        ("How do we count one two three apples in a basket?", "Counting Numbers 1 to 5 (Montessori)"),
        ("What happens when an ice cube melts into water and steam?", "States of Matter: Solid, Liquid, and Gas"),
        ("Why do North and South magnetic poles attract each other?", "Magnets and Magnetic Poles (CBSE Grade 6)"),
        ("What happens when blue litmus paper is dipped in sour lemon acid?", "Acids, Bases, and Salts (CBSE Grade 7)"),
        ("How does the human heart pump blood through four chambers to the lungs?", "Human Circulatory System (CBSE Grade 10)"),
        ("Explain Ohm's Law voltage current and resistance formula V equals I R", "Electricity and Ohm's Law (CBSE Grade 10)"),
        ("How do we calculate heights using sine cosine and tangent in a right triangle?", "Trigonometry and Right Triangles (CBSE Grade 10)")
    ]

    print(f"\n[2] RAG RETRIEVAL BENCHMARKS (Precision & Reciprocal Rank):")
    total_rr = 0.0
    p_at_1 = 0
    latencies = []

    for query, expected_concept in test_queries:
        t0 = time.perf_counter()
        results = curriculum_retriever.retrieve(query, top_k=3)
        dt = (time.perf_counter() - t0) * 1000
        latencies.append(dt)

        rank = None
        for i, (chunk, score) in enumerate(results, 1):
            if expected_concept.lower() in chunk.metadata.get("concept", "").lower():
                rank = i
                break

        rr = 1.0 / rank if rank else 0.0
        total_rr += rr
        if rank == 1:
            p_at_1 += 1

        print(f"  Query: '{query[:45]}...'")
        print(f"    -> Top Hit: {results[0][0].metadata.get('concept')} | Score: {results[0][1]:.3f} | Rank: {rank} | Latency: {dt:.2f} ms")

    mrr = total_rr / len(test_queries)
    avg_latency = sum(latencies) / len(latencies)
    print(f"\n  RAG Metrics Summary:")
    print(f"  - Precision@1: {(p_at_1 / len(test_queries)) * 100:.1f}%")
    print(f"  - Mean Reciprocal Rank (MRR): {mrr:.3f}")
    print(f"  - Average Retrieval Latency: {avg_latency:.2f} ms")

    # 3. Assessment Evaluation Accuracy & Speed
    print(f"\n[3] ASSESSMENT EVALUATOR ACCURACY & LATENCY BENCHMARKS:")
    eval_cases = [
        ("Carbon dioxide", "Carbon dioxide", True, "Exact scientific term"),
        ("CO2", "Carbon dioxide", True, "Scientific abbreviation"),
        ("1/2", "Half", True, "Math fraction numeral"),
        ("Half", "Half", True, "Math fraction word"),
        ("Earth", "Earth", True, "Planetary exact match"),
        ("Plastic stones", "Oxygen", False, "Completely incorrect answer"),
        ("Sun", "Carbon dioxide", False, "Wrong concept component")
    ]

    eval_correct = 0
    eval_latencies = []
    for learner_ans, expected_ans, expected_correct, desc in eval_cases:
        t0 = time.perf_counter()
        is_correct, sim, feedback = assessment_evaluator.evaluate(
            learner_answer=learner_ans,
            expected_answer=expected_ans,
            concept="Benchmark",
            learner_type=LearnerType.GENERAL
        )
        dt = (time.perf_counter() - t0) * 1000
        eval_latencies.append(dt)

        match_status = is_correct == expected_correct
        if match_status:
            eval_correct += 1
        print(f"  Case: {desc} ('{learner_ans}' vs '{expected_ans}') -> Evaluated: {is_correct} (Sim: {sim:.2f}) in {dt:.3f} ms [OK: {match_status}]")

    print(f"  - Assessment Accuracy: {(eval_correct / len(eval_cases)) * 100:.1f}%")
    print(f"  - Average Evaluation Latency: {sum(eval_latencies) / len(eval_latencies):.3f} ms")

    # 4. Adaptation Transition Verification
    print(f"\n[4] ADAPTATION ENGINE TRANSITIONS:")
    ds_profile = LearnerProfile(learner_id="test_ds", learner_type=LearnerType.DOWN_SYNDROME, accessibility_requirements=["simple_language", "small_steps"])
    deaf_profile = LearnerProfile(learner_id="test_deaf", learner_type=LearnerType.DEAF, accessibility_requirements=["visual_explanation", "sign_support"])

    dec_ds_1 = adaptation_engine.decide(ds_profile, "Photosynthesis", is_correct=False, attempt_number=1)
    dec_ds_2 = adaptation_engine.decide(ds_profile, "Photosynthesis", is_correct=False, attempt_number=2)
    dec_deaf_1 = adaptation_engine.decide(deaf_profile, "Photosynthesis", is_correct=False, attempt_number=1)
    dec_corr = adaptation_engine.decide(ds_profile, "Photosynthesis", is_correct=True, attempt_number=1)

    print(f"  - Down syndrome (Attempt 1 incorrect) -> Action: {dec_ds_1.action} | Style: {dec_ds_1.explanation_style}")
    print(f"  - Down syndrome (Attempt 2 incorrect) -> Action: {dec_ds_2.action} | Style: {dec_ds_2.explanation_style}")
    print(f"  - Deaf Learner (Attempt 1 incorrect)  -> Action: {dec_deaf_1.action} | Style: {dec_deaf_1.explanation_style}")
    print(f"  - Understood Answer (Mastery)         -> Action: {dec_corr.action} | Target: {dec_corr.complexity_level}")

    # 5. Process Memory Footprint
    mem = psutil.Process().memory_info()
    print(f"\n[5] PROCESS RESOURCE FOOTPRINT:")
    print(f"  - RSS Memory: {mem.rss / (1024 * 1024):.2f} MB")
    print(f"  - VMS Virtual Memory: {mem.vms / (1024 * 1024):.2f} MB")

    print("\n" + "=" * 70)
    print(">>> BENCHMARK SUITE COMPLETED SUCCESSFULLY")
    print("=" * 70)

if __name__ == "__main__":
    run_benchmarks()
