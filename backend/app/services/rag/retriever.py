import logging
from pathlib import Path
from typing import List, Dict, Any, Optional, Tuple
from backend.app.services.rag.document_processor import DocumentProcessor, CurriculumChunk
from backend.app.services.rag.vector_store import BaseVectorStore, get_vector_store
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class CurriculumRetriever:
    """Orchestrates document processing, vector search, and grounded context assembly."""

    def __init__(self, data_dir: Optional[Path] = None, provider: Optional[str] = None):
        self.data_dir = data_dir or settings.CURRICULUM_DIR
        self.provider = provider or settings.EMBEDDING_PROVIDER
        self.doc_processor = DocumentProcessor(self.data_dir)
        self.vector_store: BaseVectorStore = get_vector_store(self.provider)
        self.indexed_chunks: List[CurriculumChunk] = []
        self.concept_cache: Dict[str, Dict[str, Any]] = {}
        self.initialize()

    def initialize(self) -> None:
        logger.info(f"Loading curriculum data from {self.data_dir}...")
        self.indexed_chunks = self.doc_processor.load_and_chunk_all()
        self.vector_store.add_documents(self.indexed_chunks)

        # Cache raw data per concept for deterministic structured access
        for chunk in self.indexed_chunks:
            concept = chunk.metadata.get("concept")
            raw_data = chunk.metadata.get("raw_data")
            if concept and raw_data and concept not in self.concept_cache:
                self.concept_cache[concept.lower()] = raw_data
                self.concept_cache[concept] = raw_data

        logger.info(f"Initialized CurriculumRetriever with {len(self.indexed_chunks)} chunks across {len(self.concept_cache)} concepts.")

    def reload(self) -> None:
        """Dynamically re-indexes the entire curriculum directory in memory."""
        self.vector_store = get_vector_store(self.provider)
        self.concept_cache.clear()
        self.initialize()

    def retrieve(self, query: str, top_k: int = 3) -> List[Tuple[CurriculumChunk, float]]:
        return self.vector_store.search(query, top_k=top_k)

    def get_concept_data(
        self,
        concept_name: str,
        learner_type: str = "general",
        accessibility_requirements: Optional[List[str]] = None,
        llm_provider_override: Optional[str] = None
    ) -> Optional[Dict[str, Any]]:
        c_lower = concept_name.lower().strip()
        # 1. Direct exact match
        if c_lower in self.concept_cache:
            data = dict(self.concept_cache[c_lower])
            if "is_ai_generated" not in data:
                data["is_ai_generated"] = False
                data["curriculum_source"] = "verified"
            return data

        # 2. Check normalized topic equality or containment with length check
        for k, v in self.concept_cache.items():
            if k and len(k) >= 4:
                k_clean = k.lower().strip()
                if k_clean == c_lower or k_clean in c_lower:
                    data = dict(v)
                    if "is_ai_generated" not in data:
                        data["is_ai_generated"] = False
                        data["curriculum_source"] = "verified"
                    return data

        # 3. Vector search top hit with strong threshold
        results = self.retrieve(concept_name, top_k=1)
        if results and results[0][1] >= 0.20:
            data = dict(results[0][0].metadata.get("raw_data", {}))
            if "is_ai_generated" not in data:
                data["is_ai_generated"] = False
                data["curriculum_source"] = "verified"
            return data

        # 4. Dynamic Open-Domain Knowledge Synthesis:
        # Synthesize a complete Montessori-to-10th-grade CBSE aligned concept on the fly
        from backend.app.services.rag.universal_synthesizer import UniversalCurriculumSynthesizer
        dynamic_concept = UniversalCurriculumSynthesizer.synthesize_curriculum_concept(
            query=concept_name,
            target_dir=self.data_dir,
            learner_type=learner_type,
            accessibility_requirements=accessibility_requirements,
            llm_provider_override=llm_provider_override
        )
        c_name = dynamic_concept["concept"]
        self.concept_cache[c_name.lower()] = dynamic_concept
        self.concept_cache[c_name] = dynamic_concept
        return dynamic_concept

    def get_all_topics(self) -> List[Dict[str, Any]]:
        unique_concepts = {}
        for chunk in self.indexed_chunks:
            meta = chunk.metadata
            c = meta.get("concept")
            if c and c not in unique_concepts:
                unique_concepts[c] = {
                    "subject": meta.get("subject"),
                    "topic": meta.get("topic"),
                    "concept": c,
                    "grade_level": meta.get("grade_level"),
                    "summary": meta.get("raw_data", {}).get("simplified_explanation", "")[:120] + "..."
                }
        return list(unique_concepts.values())

    def build_grounded_context(self, query: str, top_k: int = 3) -> str:
        matches = self.retrieve(query, top_k=top_k)
        if not matches:
            return "No specific curriculum documents matched."

        context_lines = []
        for i, (chunk, score) in enumerate(matches, 1):
            meta = chunk.metadata
            context_lines.append(
                f"[Document {i}] (Subject: {meta.get('subject')}, Concept: {meta.get('concept')}, Relevance: {score:.2f})\n{chunk.content}"
            )

        return "\n\n".join(context_lines)

# Singleton retriever instance
curriculum_retriever = CurriculumRetriever()
