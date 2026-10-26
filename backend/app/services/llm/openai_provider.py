import json
import logging
import httpx
from typing import Dict, Any
from backend.app.services.llm.base import BaseLLMProvider
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class OpenAIProvider(BaseLLMProvider):
    """OpenAI compatible API provider using HTTPX client."""

    def __init__(self, api_key: str = "", model: str = "gpt-4o-mini", base_url: str = ""):
        self.api_key = api_key or settings.OPENAI_API_KEY
        self.model = model
        self.base_url = (base_url or settings.OPENAI_BASE_URL).rstrip("/")

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        if not self.api_key:
            raise ValueError("OPENAI_API_KEY is not configured.")

        url = f"{self.base_url}/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        payload = {
            "model": self.model,
            "messages": messages,
            "temperature": 0.2
        }

        try:
            with httpx.Client(timeout=30.0) as client:
                resp = client.post(url, headers=headers, json=payload)
                resp.raise_for_status()
                data = resp.json()
                return data["choices"][0]["message"]["content"]
        except Exception as e:
            logger.error(f"OpenAI API error: {e}")
            raise

    def generate_structured(self, prompt: str, system_prompt: str = "") -> Dict[str, Any]:
        enhanced_prompt = (
            f"{prompt}\n\n"
            "CRITICAL: Respond ONLY with a valid JSON object matching the requested schema. "
            "Do not include markdown code fence formatting or outside prose."
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
