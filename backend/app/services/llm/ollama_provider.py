import json
import logging
import httpx
from typing import Dict, Any
from backend.app.services.llm.base import BaseLLMProvider
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class OllamaProvider(BaseLLMProvider):
    """Local Ollama Provider for on-device inference (e.g., Llama 3.2 3B)."""

    def __init__(self, base_url: str = "", model: str = ""):
        self.base_url = (base_url or settings.OLLAMA_BASE_URL).rstrip("/")
        self.model = model or settings.OLLAMA_MODEL

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        url = f"{self.base_url}/api/generate"
        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": system_prompt,
            "stream": False
        }
        try:
            with httpx.Client(timeout=60.0) as client:
                resp = client.post(url, json=payload)
                resp.raise_for_status()
                data = resp.json()
                return data.get("response", "")
        except Exception as e:
            logger.error(f"Ollama inference error: {e}")
            raise

    def generate_structured(self, prompt: str, system_prompt: str = "") -> Dict[str, Any]:
        enhanced_prompt = (
            f"{prompt}\n\nRespond with pure JSON."
        )
        raw_text = self.generate(enhanced_prompt, system_prompt)
        cleaned = raw_text.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        return json.loads(cleaned.strip())
