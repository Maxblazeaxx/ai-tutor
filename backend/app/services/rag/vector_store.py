import logging
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Tuple
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from backend.app.services.rag.document_processor import CurriculumChunk

logger = logging.getLogger(__name__)

class BaseVectorStore(ABC):
    """Abstract interface for curriculum vector storage and search."""

    @abstractmethod
    def add_documents(self, chunks: List[CurriculumChunk]) -> None:
        pass

    @abstractmethod
    def search(self, query: str, top_k: int = 3) -> List[Tuple[CurriculumChunk, float]]:
        pass

class ScikitVectorStore(BaseVectorStore):
    """
    Lightweight, deterministic vector store using TF-IDF and Cosine Similarity.
    Zero external heavy models required, sub-millisecond query latency, runs
    perfectly on standard laptop CPU/RAM constraints without memory exhaustion.
    """

    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            sublinear_tf=True,
            stop_words='english'
        )
        self.chunks: List[CurriculumChunk] = []
        self.matrix = None

    def add_documents(self, chunks: List[CurriculumChunk]) -> None:
        self.chunks = chunks
        if not chunks:
            self.matrix = None
            return

        corpus = [f"{c.metadata.get('concept', '')} {c.content}" for c in chunks]
        self.matrix = self.vectorizer.fit_transform(corpus)
        logger.info(f"Indexed {len(chunks)} curriculum chunks in ScikitVectorStore.")

    def search(self, query: str, top_k: int = 3) -> List[Tuple[CurriculumChunk, float]]:
        if not self.chunks or self.matrix is None:
            return []

        query_vec = self.vectorizer.transform([query])
        scores = cosine_similarity(query_vec, self.matrix).flatten()

        # Get top-k indices
        ranked_indices = np.argsort(scores)[::-1]
        results: List[Tuple[CurriculumChunk, float]] = []

        for idx in ranked_indices[:top_k]:
            score = float(scores[idx])
            results.append((self.chunks[idx], score))

        return results

class FaissVectorStore(BaseVectorStore):
    """
    Sentence Transformers + FAISS implementation with graceful automatic fallback.
    """

    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        self.model_name = model_name
        self.fallback = ScikitVectorStore()
        self.is_faiss_active = False

        try:
            from sentence_transformers import SentenceTransformer
            import faiss
            self.embedder = SentenceTransformer(model_name)
            self.index = None
            self.chunks: List[CurriculumChunk] = []
            self.is_faiss_active = True
            logger.info(f"Initialized FaissVectorStore with {model_name}")
        except Exception as e:
            logger.warning(f"SentenceTransformers/FAISS not active ({e}). Using ScikitVectorStore fallback.")
            self.is_faiss_active = False

    def add_documents(self, chunks: List[CurriculumChunk]) -> None:
        if not self.is_faiss_active:
            self.fallback.add_documents(chunks)
            return

        try:
            import faiss
            self.chunks = chunks
            corpus = [c.content for c in chunks]
            embeddings = self.embedder.encode(corpus, convert_to_numpy=True, normalize_embeddings=True)
            dimension = embeddings.shape[1]
            self.index = faiss.IndexFlatIP(dimension)
            self.index.add(embeddings)
        except Exception as e:
            logger.error(f"Error indexing FAISS: {e}. Falling back to Scikit.")
            self.fallback.add_documents(chunks)
            self.is_faiss_active = False

    def search(self, query: str, top_k: int = 3) -> List[Tuple[CurriculumChunk, float]]:
        if not self.is_faiss_active or self.index is None:
            return self.fallback.search(query, top_k=top_k)

        try:
            query_emb = self.embedder.encode([query], convert_to_numpy=True, normalize_embeddings=True)
            scores, indices = self.index.search(query_emb, top_k)
            results = []
            for score, idx in zip(scores[0], indices[0]):
                if idx >= 0 and idx < len(self.chunks):
                    results.append((self.chunks[idx], float(score)))
            return results
        except Exception as e:
            logger.warning(f"Error in FAISS search: {e}. Using fallback.")
            return self.fallback.search(query, top_k=top_k)

def get_vector_store(provider: str = "scikit") -> BaseVectorStore:
    if provider == "faiss":
        return FaissVectorStore()
    return ScikitVectorStore()
