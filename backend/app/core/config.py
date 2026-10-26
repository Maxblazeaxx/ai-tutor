import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent
CURRICULUM_DATA_DIR = BASE_DIR / "app" / "data" / "curriculum"

class Settings:
    PROJECT_TITLE: str = "Multimodal Adaptive Generative AI for Inclusive Learning"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    HOST: str = os.getenv("HOST", "127.0.0.1")
    PORT: int = int(os.getenv("PORT", "8000"))
    DEBUG: bool = os.getenv("DEBUG", "True").lower() in ("true", "1")
    
    # LLM Settings
    LLM_PROVIDER: str = os.getenv("LLM_PROVIDER", "fallback").lower()
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_BASE_URL: str = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
    
    # RAG Settings
    EMBEDDING_PROVIDER: str = os.getenv("EMBEDDING_PROVIDER", "scikit").lower()
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
    CURRICULUM_DIR: Path = CURRICULUM_DATA_DIR
    
    # Persistence
    PERSISTENCE_MODE: str = os.getenv("PERSISTENCE_MODE", "in_memory")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "")

settings = Settings()
