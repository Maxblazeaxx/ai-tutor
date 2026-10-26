import json
import logging
import httpx
from typing import Dict, Any
from backend.app.services.llm.base import BaseLLMProvider
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

class GeminiProvider(BaseLLMProvider):
    """Google Gemini API Provider using HTTPX client."""

    def __init__(self, api_key: str = "", model: str = "gemini-1.5-flash"):
        self.api_key = api_key or settings.GEMINI_API_KEY
        self.model = model
        self.base_url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"

    def generate(self, prompt: str, system_prompt: str = "") -> str:
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY is not configured.")

        url = f"{self.base_url}?key={self.api_key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }
        if system_prompt:
            payload["systemInstruction"] = {"parts": [{"text": system_prompt}]}

        try:
            with httpx.Client(timeout=30.0) as client:
                resp = client.post(url, json=payload)
                resp.raise_for_status()
                data = resp.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            logger.error(f"Gemini API error: {e}")
            raise

    def generate_structured(self, prompt: str, system_prompt: str = "") -> Dict[str, Any]:
        enhanced_prompt = (
            f"{prompt}\n\n"
            "CRITICAL: Respond ONLY with a valid JSON object matching the requested schema. "
            "Do not include markdown code fence formatting (```json) or outside prose."
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
