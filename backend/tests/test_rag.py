import pytest
from backend.app.services.rag.retriever import curriculum_retriever

def test_curriculum_retrieval_photosynthesis():
    query = "How do green plants absorb sunlight and water to make food?"
    results = curriculum_retriever.retrieve(query, top_k=2)
    assert len(results) > 0
    top_chunk, score = results[0]
    assert "Photosynthesis" in top_chunk.metadata.get("concept")
    assert score > 0.05

def test_grounded_context_assembly():
    query = "carbon dioxide oxygen leaves"
    context = curriculum_retriever.build_grounded_context(query)
    assert "Photosynthesis" in context
    assert "Carbon" in context or "leaves" in context

def test_get_all_curriculum_topics():
    topics = curriculum_retriever.get_all_topics()
    concepts = [t["concept"] for t in topics]
    assert "Photosynthesis" in concepts
    assert "Water Cycle" in concepts
    assert any("Fraction" in c for c in concepts)
    assert "Solar System" in concepts

def test_curriculum_retrieval_fractions():
    query = "How do we share a pizza equally into halves and quarters?"
    results = curriculum_retriever.retrieve(query, top_k=2)
    assert len(results) > 0
    top_chunk, score = results[0]
    assert "Fraction" in top_chunk.metadata.get("concept")
    assert score > 0.05

def test_curriculum_retrieval_solar_system():
    query = "Which planet has water and orbits the sun?"
    results = curriculum_retriever.retrieve(query, top_k=2)
    assert len(results) > 0
    top_chunk, score = results[0]
    assert "Solar System" in top_chunk.metadata.get("concept") or "Earth" in top_chunk.content
