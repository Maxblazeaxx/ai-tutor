from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class BaseLLMProvider(ABC):
    """Abstract base class for all LLM providers (Gemini, OpenAI, Ollama, Fallback)."""

    @abstractmethod
    def generate(self, prompt: str, system_prompt: str = "") -> str:
        """Generate unstructured text completion."""
        pass

    @abstractmethod
    def generate_structured(self, prompt: str, system_prompt: str = "") -> Dict[str, Any]:
        """Generate structured JSON response conforming to lesson generation schema."""
        pass
