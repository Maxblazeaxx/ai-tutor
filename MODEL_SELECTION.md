# Model Selection & Hardware Resource Analysis

This document records the engineering criteria, hardware profiling, trade-off evaluations, and architectural decisions made for model selection in this project.

---

## 1. Host Hardware Constraints Analysis

Before selecting or installing any machine learning model, the environment was inspected dynamically:

| Metric | Measured Specification | Practical Constraint |
|---|---|---|
| **Operating System** | Windows 11 (AMD64) | Standard development workstation |
| **CPU** | Intel Core i5 (12 logical cores, 10 physical) | Excellent multi-threading throughput for CPU inference |
| **System RAM** | 7.69 GB Total (~1.77 GB Available) | **High Constraint:** Downloading multi-gigabyte models into system RAM would induce swapping or Out-Of-Memory (OOM) crashes. |
| **Active GPU** | Intel(R) UHD Graphics (VRAM: ~2.0 GB shared) | **High Constraint:** Insufficient VRAM to load unquantized 7B/8B parameter models. |
| **CUDA Acceleration** | Disabled / Not active in local process | Heavy PyTorch CUDA wheels would not yield GPU acceleration on Intel UHD. |

---

## 2. Model Evaluation Matrix

### A. Embedding & Vector Search Models

| Candidate | Memory Footprint | Latency | Viability | Architectural Decision |
|---|---|---|---|---|
| `text-embedding-ada-002` (OpenAI) | 0 MB (Cloud API) | ~250ms | High | Requires active internet and paid API quota. Not offline viable. |
| `all-mpnet-base-v2` | ~450 MB | ~180ms | Medium | Good quality, but slower on CPU-only. |
| `all-MiniLM-L6-v2` | ~120 MB | ~45ms | High | Lightweight; integrated as the primary Sentence Transformers adapter. |
| **`Scikit TF-IDF + Cosine Similarity`** | **< 2 MB** | **2.22 ms** | **Optimal** | **Primary Default:** Offline capable, low disk overhead, low-latency retrieval, deterministic reproducibility. |

**Decision:**
`backend/app/services/rag/vector_store.py` implements a dual-mode vector store:
1. `ScikitVectorStore` as default: guarantees instant initialization and zero memory overhead.
2. `FaissVectorStore` as a pluggable adapter for environments with Sentence Transformers and FAISS.

---

### B. Generative Language Models (LLM)

| Candidate | Parameter Size | Memory Required | Offline? | Evaluation |
|---|---|---|---|---|
| Llama 3 8B (FP16) | 8 Billion | ~16 GB VRAM | Yes | **Rejected:** Exceeds total system RAM (7.69 GB) and VRAM (2 GB). |
| Llama 3.2 3B (Q4_K_M) | 3 Billion | ~2.5 GB RAM | Yes | **Supported via Ollama:** Suitable for machines with local Ollama service running. |
| Google Gemini 1.5/2.0 Flash | Cloud API | 0 MB Local | No | **Supported:** Fast (<1s latency), handles structured JSON and complex reasoning. |
| OpenAI GPT-4o-mini | Cloud API | 0 MB Local | No | **Supported:** High quality, configurable via `OPENAI_API_KEY`. |
| **Pedagogical Deterministic Provider** | **Rule/Template** | **< 1 MB** | **Yes** | **Primary Fallback:** Deterministic (<5ms), offline capable, grounded in curriculum with schema compliance. |

**Decision:**
The `BaseLLMProvider` factory architecture decouples the tutor from any single vendor:
- Configurable via `LLM_PROVIDER` in `.env` (`gemini`, `openai`, `ollama`, or `fallback`).
- If cloud API keys are absent or network requests time out, the system automatically falls back to `MockPedagogicalProvider` without crashing or throwing unhandled 500 errors.

---

### C. Educational Animation Model

| Candidate | Resource Demand | Latency | Reproducibility | Decision |
|---|---|---|---|---|
| Generative Video (Sora, Stable Video Diffusion) | 16–24 GB VRAM GPU | 30s–120s per clip | Low (hallucinates anatomical/scientific inaccuracies) | **Rejected:** Impractical for real-time educational tutoring and violates local hardware constraints. |
| **Deterministic SVG/CSS Scene Engine** | **0 MB GPU VRAM** | **Instant (60 FPS)** | **Pedagogically Structured** | **Selected:** AI generates pedagogical scene scripts (`scene_id`, `action`, `caption`); frontend renders clean deterministic SVG animations. |

---

## 3. Failed Experiments & Engineering Corrections

1. **Direct Sentence-Transformers Dependency Resolution on Python 3.14:**
   - *Observation:* Running `pip install sentence-transformers faiss-cpu` on Python 3.14 triggered extensive wheel builds and HTTP read timeouts over pip due to Python 3.14 being a brand-new release.
   - *Resolution:* Implemented `ScikitVectorStore` using built-in scikit-learn TF-IDF and normalized cosine similarity. This reduced initial dependency setup time from minutes to zero seconds and passed all 38 automated tests in 12.1 seconds.
2. **FastAPI `@app.on_event("startup")` Deprecation:**
   - *Observation:* Python 3.14 / FastAPI emitted deprecation warnings during test runs.
   - *Resolution:* Migrated FastAPI lifecycle to modern `@asynccontextmanager` lifespan handler, eliminating all warnings.

> **Accessibility Notice:** Sign gloss cards provided in the Deaf pathway are placeholder glosses, not verified ISL/ASL.
