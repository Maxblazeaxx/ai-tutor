# Multimodal Adaptive Generative AI for Inclusive Learning

**Final-Year B.Tech CSE (AI/ML) Capstone Project**  
*Academic Year: 2025–2026*

---

## 1. Project Overview

This capstone project implements an **Adaptive Generative AI Tutor for Inclusive Education**, engineered to serve:
1. **Deaf and Hard-of-Hearing Learners:** Audio-independent visual explanations, high-contrast captions, diagrammatic structures, interactive sign-gloss flashcards (placeholder glosses, not verified ISL/ASL), and gesture alignment preview.
2. **Learners with Down syndrome:** Linguistically simplified vocabulary, single-concept micro-learning 3-step sequences, deterministic 60 FPS SVG animations, cognitive pacing controls (`0.5x Slow`, `0.75x Supported`, `1.0x Standard`), and gentle positive reinforcement.
3. **Universal Diverse Learners:** Multi-sensory blend spanning Montessori & Kindergarten (Ages 3–6) up to 10th Grade CBSE curriculum, plus open-domain inquiry synthesis for arbitrary questions.

### Core Research Principle
> **"SAME KNOWLEDGE → DIFFERENT TEACHING REPRESENTATION"**  
>
> The system takes curriculum-grounded educational concepts and dynamically adapts how each concept is taught based on the learner's accessibility requirements, cognitive pacing, preferred sensory modalities, and ongoing assessment performance:
> $$\text{GENERATE} \longrightarrow \text{TEACH} \longrightarrow \text{ASSESS} \longrightarrow \text{ADAPT} \longrightarrow \text{TEACH AGAIN}$$

---

## 2. Research Positioning & Academic Literature Grounding

The architecture builds directly upon peer-reviewed inclusive education literature:
- **[1] Coy, Mohammed, & Skerrit (2025):** AI-enabled deaf education frameworks.
- **[2] Shahid, Law, & Verdezoto (2022):** Technology-enhanced support for children with Down syndrome.
- **[3] Fajardo et al. (2022):** Linguistic simplification and video-based instruction for intellectual disability.
- **[4] Barman & Jena (2023):** Interactive video-based instruction for intellectual disability.
- **[5] Nakeva von Mentzer et al. (2021) & [6] Porter (2022):** Phonics and bespoke maths interventions for learners with Down syndrome.
- **[7] Levesque, Duncan, & Snoddon (2023):** Generative AI potential for Deaf students.
- **[8] Li et al. (2024) & [9] Mejeh & Rehm (2024):** Generative AI and NLP for adaptive learning.
- **[10] Saldanha et al. (2026):** Accessibility-aware AI learning platform.

### Explicit Research Contributions
- **Disability-Oriented Decoupled Architecture:** Separates underlying curriculum facts from presentation modalities (Visual Story, Sign Gloss, Relational Mind Map, Read Text).
- **Universal Open-Domain Curriculum Synthesizer:** Extends grounded RAG to synthesize and index arbitrary user queries (e.g., *"How do airplanes fly?"*) while retaining accessibility constraints.
- **Closed-Loop Pedagogical Adaptation State Machine:** Dynamically transitions across `SIMPLIFY`, `MORE_VISUAL`, `STEP_BY_STEP`, and `ALTERNATIVE_EXAMPLE` states upon assessment error.
- **Edge-Constrained Hardware Optimization:** Offline runnable on modest hardware (Intel Core i5, 7.69 GB RAM, integrated graphics) consuming under **180 MB RSS RAM** with low latency.

---

## 3. Curriculum Scope & Tier Hierarchy

The tutor contains a structured curriculum library spanning 4 distinct tiers:

| Curriculum Tier | Target Age / Grade | Exemplar Concepts Included | Representation Specialization |
| :--- | :--- | :--- | :--- |
| **Montessori & Kindergarten** | Ages 3–6 | - Shapes & Colors<br>- Counting Numbers 1–5<br>- Five Senses<br>- Living & Non-Living Things | Concrete visual objects, apples, zero-abstraction tactile metaphors |
| **Primary School** | Grades 1–5 | - Photosynthesis<br>- Water Cycle<br>- Fractions (Halves & Quarters)<br>- Solar System<br>- Gravity & Falling Objects<br>- States of Matter | Single-concept micro-steps, sun/water flows, pizza fraction division |
| **Middle School** | Grades 6–8 | - Magnets & Magnetic Poles<br>- Acids, Bases, and Salts | North/South magnetic field lines, red/blue litmus paper color shifts |
| **Secondary School (CBSE)** | Grades 9–10 | - Human Circulatory System<br>- Electricity & Ohm's Law ($V = I \times R$)<br>- Trigonometry & Right Triangles<br>- Chemical Reactions<br>- Light Reflection & Refraction<br>- Heredity & Evolution | 4-chamber heart flows, electron flow stages, right triangle hypotenuse calculations, spatial mind maps |
| **Open-Domain Inquiry** | Any Age | Any arbitrary topic (e.g., *"How do airplanes fly in the sky?"*) | Dynamic RAG synthesis, automated indexing, on-the-fly caching |

---

## 4. Key Architectural Capabilities

### A. Spatial Concept Mind Map ([`ConceptMindMap.jsx`](frontend/src/components/ConceptMindMap.jsx))
Deconstructs any educational milestone into an interactive 5-node relational SVG graph:
- **Central Idea:** Core milestone definition.
- **Inputs & Energy:** Foundational starting requirements.
- **Active Mechanism:** Physical or biological transformation.
- **Result & Output:** Products and forces created.
- **Everyday Connection:** Concrete real-world metaphor.
Includes speech synthesis read-aloud and high-contrast rendering.

### B. Custom Learner Persona Modal ([`CustomLearnerModal.jsx`](frontend/src/components/CustomLearnerModal.jsx))
Enables teachers and parents to configure custom learner profiles with:
- Cognitive Pacing (`0.5x`, `0.75x`, `1.0x`)
- Syllabus Grade Tier (Montessori to 10th CBSE)
- Modality preference (Visual Story, Sign Support, Mind Map, Text)
- Granular accommodation toggles (audio-independence, visual captions, simplified language, repetition).

### C. Printable Certificate of Inclusive Learning Mastery ([`StudentAnalyticsDashboard.jsx`](frontend/src/components/StudentAnalyticsDashboard.jsx))
Generates an official completion certificate acknowledging student perseverance, listing mastered curriculum milestones, verification token, and one-click PDF printing (`window.print()`).

### D. Examiner Viva Defense Tour ([`VivaTourModal.jsx`](frontend/src/components/VivaTourModal.jsx))
Provides an interactive 1-click quick-launch bar in the top navigation allowing examiners and review committees to witness:
1. Deaf representation (Aarav + Photosynthesis)
2. Down syndrome micro-learning (Maya + 60 FPS animation)
3. 10th CBSE Physics + Concept Mind Map (Ohm's Law)
4. Montessori concrete counting (Numbers 1–5)
5. Open-domain inquiry synthesis (Airplanes)
6. Longitudinal defense metrics and certificate generation

---

## 5. Technology Stack & Edge Constraints

- **Backend:** Python 3.14+, FastAPI, Uvicorn, Pydantic v2
- **Vector Search & RAG:** Scikit-Learn TF-IDF / Normalized Cosine Similarity (Sub-millisecond latency)
- **Generative AI Factory:** Multi-provider support (Gemini API, OpenAI API, Ollama, and built-in offline `MockPedagogicalProvider`)
- **Frontend:** React 19, HTML5 Canvas, Tailwind CSS, Lucide Icons, Web Speech API
- **Bundler:** Zero-Vite `esbuild` architecture (compiles in ~916 ms)

---

## 6. Empirical Verification & Defense Benchmarks

Empirical performance measured on host hardware (Intel Core i5, 7.69 GB RAM, Windows 11):

| Benchmark Metric | Measured Result | Benchmark Standard | Status |
| :--- | :--- | :--- | :--- |
| **Pytest Unit & Integration Tests** | **38 / 38 Passed** | 100% Pass | ✅ PASS |
| **RAG Retrieval Precision@1** | **100.0%** (MRR: 1.000) | $\ge 85.0\%$ | ✅ PASS |
| **Average RAG Retrieval Latency** | **2.22 ms** | $< 50\text{ ms}$ | ✅ PASS |
| **Assessment Scoring Accuracy** | **100.0%** | $\ge 95.0\%$ | ✅ PASS |
| **Assessment Evaluation Latency** | **1.31 ms** | $< 10\text{ ms}$ | ✅ PASS |
| **Process RSS Memory Footprint** | **179.61 MB** | $< 1000\text{ MB}$ (1 GB host cap) | ✅ PASS |
| **Offline Reliability** | **Offline Capable** | Deterministic template fallback | ✅ PASS |

---

## 7. Quick Start

### 🚀 One-Click Windows Launch
Double-click **`run.bat`** (or run `./start.ps1` in PowerShell).  
The script compiles the frontend, boots the server on `0.0.0.0:8000`, and launches your browser at **`http://localhost:8000`**.

### Manual Verification Commands
```powershell
# Run full automated test suite (38 unit & e2e tests)
python -m pytest backend/tests -v

# Run live curriculum scope verification across all CBSE tiers
python backend/tests/verify_curriculum_scope.py

# Run academic examiner benchmark evaluation
python -m backend.tests.benchmark_evaluation
```
