# Setup and Installation Guide

## 1. Prerequisites

- **Operating System:** Windows 10/11, macOS, or Linux
- **Python:** 3.10 to 3.14 (Verified on Python 3.14.5 AMD64)
- **Node.js:** v18.0.0 or higher (Verified on v24.15.0)
- **Memory (RAM):** Minimum 4 GB, Recommended 8–16 GB
- **GPU:** Optional (Intel UHD Graphics, NVIDIA RTX 3050 Laptop GPU, or CPU-only)

---

## 2. Step-by-Step Installation

### Step 1: Clone or Navigate to the Workspace
```powershell
cd "c:\Users\User\Desktop\ai tutor"
```

### Step 2: Install Python Backend Dependencies
```powershell
python -m pip install -r backend/requirements.txt
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env`:
```powershell
Copy-Item .env.example .env
```

Default configuration inside `.env`:
```ini
HOST=127.0.0.1
PORT=8000
DEBUG=True
LLM_PROVIDER=fallback
EMBEDDING_PROVIDER=scikit
```

> **Note on LLM Provider & Accessibility Features:**
> By default, `LLM_PROVIDER=fallback` is active. This runs the high-fidelity **Pedagogical Deterministic Fallback Engine**, which requires zero API keys and functions offline.
> To use Google Gemini API or OpenAI API, simply paste your key into `.env` and set `LLM_PROVIDER=gemini` or `LLM_PROVIDER=openai`.
> Note: Sign gloss cards in the Deaf accessibility pathway are placeholder glosses, not verified ISL/ASL.

### Step 4: Install and Build the React Frontend
```powershell
cd frontend
npm install
npm run build
cd ..
```

---

## 3. Running Automated Tests

Run the complete backend test suite:
```powershell
python -m pytest backend/tests -v
```

Expected result:
```
38 passed in ~12.1s
```

---

## 4. Launching the Application

### Option A: Unified FastAPI Launch (Recommended)
FastAPI serves both the backend API and the compiled React frontend on a single unified port:
```powershell
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000
```
Open your browser at:
👉 **`http://localhost:8000`**

### Option B: Separate Frontend Development Server
If you want live hot-reloading for frontend components:
```powershell
# Terminal 1: Backend
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000

# Terminal 2: Frontend
cd frontend
npm start
```
Open your browser at:
👉 **`http://localhost:3000`**
