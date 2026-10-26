import logging
from backend.app.services.llm.base import BaseLLMProvider
from backend.app.services.llm.gemini_provider import GeminiProvider
from backend.app.services.llm.openai_provider import OpenAIProvider
from backend.app.services.llm.ollama_provider import OllamaProvider
from backend.app.services.llm.mock_provider import MockPedagogicalProvider
from backend.app.core.config import settings

logger = logging.getLogger(__name__)

def get_llm_provider(provider_name: str = "") -> BaseLLMProvider:
    """
    Factory to return configured LLM provider, falling back automatically
    to MockPedagogicalProvider if keys are missing or offline.
    """
    selected = (provider_name or settings.LLM_PROVIDER).lower()

    if selected == "gemini":
        if settings.GEMINI_API_KEY:
            try:
                return GeminiProvider()
            except Exception as e:
                logger.warning(f"Failed to initialize GeminiProvider ({e}). Falling back.")
        else:
            logger.info("GEMINI_API_KEY not found in environment. Using MockPedagogicalProvider fallback.")

    elif selected == "openai":
        if settings.OPENAI_API_KEY:
            try:
                return OpenAIProvider()
            except Exception as e:
                logger.warning(f"Failed to initialize OpenAIProvider ({e}). Falling back.")
        else:
            logger.info("OPENAI_API_KEY not found in environment. Using MockPedagogicalProvider fallback.")

    elif selected == "ollama":
        try:
            return OllamaProvider()
        except Exception as e:
            logger.warning(f"Failed to initialize OllamaProvider ({e}). Falling back.")

    return MockPedagogicalProvider()
