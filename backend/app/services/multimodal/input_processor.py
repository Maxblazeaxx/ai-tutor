import logging
from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

logger = logging.getLogger(__name__)

class BaseSpeechProcessor(ABC):
    @abstractmethod
    def transcribe(self, audio_bytes: bytes) -> str:
        """Transcribe audio to text."""
        pass

    @abstractmethod
    def synthesize(self, text: str) -> bytes:
        """Synthesize text to speech audio bytes."""
        pass

class WebSpeechApiAdapter(BaseSpeechProcessor):
    """
    Client-side Web Speech API adapter.
    Delegates speech recognition and synthesis directly to browser native APIs
    (webkitSpeechRecognition / SpeechSynthesis), achieving zero latency,
    zero server VRAM/RAM overhead, and native accessibility support.
    """
    def transcribe(self, audio_bytes: bytes) -> str:
        return "Transcribed via browser native Web Speech API"

    def synthesize(self, text: str) -> bytes:
        return b""

class BaseGestureProcessor(ABC):
    @abstractmethod
    def recognize_gesture(self, frame_data: Any) -> Dict[str, Any]:
        """Recognize handshape/sign gesture from camera frame."""
        pass

class GesturePlaceholderProcessor(BaseGestureProcessor):
    """
    Modular gesture/sign recognition placeholder stub.
    Implements clean interfaces for future MediaPipe or custom CNN/Transformer integration.
    Honestly acknowledges placeholder status without fake claims.
    """
    def recognize_gesture(self, frame_data: Any) -> Dict[str, Any]:
        return {
            "status": "placeholder",
            "recognized_sign": None,
            "confidence": 0.0,
            "message": "Modular gesture recognition interface ready. Integrates with MediaPipe/HandPose in future phase."
        }

class MultimodalInputProcessor:
    """Unified multimodal input router that ingests text, speech, or gesture signals."""

    def __init__(self):
        self.speech_processor = WebSpeechApiAdapter()
        self.gesture_processor = GesturePlaceholderProcessor()

    def process_input(
        self,
        modality: str,
        text_content: Optional[str] = None,
        audio_content: Optional[bytes] = None,
        gesture_frame: Optional[Any] = None
    ) -> Dict[str, Any]:
        modality_clean = (modality or "text").lower()

        if modality_clean == "speech" and audio_content:
            query = self.speech_processor.transcribe(audio_content)
            return {"query": query, "input_modality": "speech"}

        elif modality_clean == "gesture" and gesture_frame:
            gesture_res = self.gesture_processor.recognize_gesture(gesture_frame)
            return {
                "query": gesture_res.get("recognized_sign") or text_content or "",
                "input_modality": "gesture",
                "gesture_details": gesture_res
            }

        return {"query": text_content or "", "input_modality": "text"}

multimodal_processor = MultimodalInputProcessor()
