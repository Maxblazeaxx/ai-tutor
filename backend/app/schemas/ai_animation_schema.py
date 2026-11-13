"""
AI Animation Schema — Pydantic v2 models for AI-generated SVG animation specs.
The LLM generates structured SVG element descriptors; the frontend renders them.
"""
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field, field_validator

class SVGKeyframe(BaseModel):
    t_ms: int = Field(ge=0, description="Time in milliseconds from scene start")
    x: Optional[float] = None
    y: Optional[float] = None
    opacity: Optional[float] = Field(default=None, ge=0.0, le=1.0)
    scale: Optional[float] = Field(default=None, gt=0.0)
    rotate_deg: Optional[float] = None
    fill: Optional[str] = None
    stroke: Optional[str] = None
    stroke_width: Optional[float] = None

class SVGElementSpec(BaseModel):
    id: str
    type: Literal["rect", "circle", "ellipse", "path", "text", "line", "polygon", "polyline", "arrow"]
    label: Optional[str] = None  # human-readable label for accessibility
    # Base attributes (type-specific)
    x: Optional[float] = None
    y: Optional[float] = None
    width: Optional[float] = None
    height: Optional[float] = None
    r: Optional[float] = None  # circle radius
    rx: Optional[float] = None  # ellipse rx
    ry: Optional[float] = None  # ellipse ry
    d: Optional[str] = None  # path d attribute
    x1: Optional[float] = None  # line
    y1: Optional[float] = None
    x2: Optional[float] = None
    y2: Optional[float] = None
    points: Optional[str] = None  # polygon/polyline
    text_content: Optional[str] = None
    font_size: Optional[int] = Field(default=14, ge=8, le=48)
    font_weight: Optional[str] = "normal"
    # Style
    fill: str = "#4CAF50"
    stroke: Optional[str] = None
    stroke_width: Optional[float] = 2.0
    opacity: float = Field(default=1.0, ge=0.0, le=1.0)
    # Animation
    keyframes: List[SVGKeyframe] = Field(default_factory=list)
    animation_duration_ms: int = Field(default=2000, ge=200, le=8000)
    animation_easing: str = "ease-in-out"
    animation_loop: bool = False

    @field_validator("type")
    @classmethod
    def validate_type(cls, v):
        allowed = {"rect", "circle", "ellipse", "path", "text", "line", "polygon", "polyline", "arrow"}
        if v not in allowed:
            raise ValueError(f"SVG element type '{v}' not allowed. Must be one of {allowed}")
        return v

class AIAnimatedScene(BaseModel):
    scene_index: int = Field(ge=1)
    title: str
    caption: str
    duration_ms: int = Field(default=4000, ge=2000, le=8000)
    canvas_width: int = Field(default=800, ge=400, le=1200)
    canvas_height: int = Field(default=400, ge=200, le=600)
    background_color: str = "#1a1a2e"
    elements: List[SVGElementSpec] = Field(min_length=1, max_length=20)
    narration_text: Optional[str] = None
    accessibility_description: str = ""  # for screen readers / sign support

class AIAnimationLesson(BaseModel):
    concept: str
    explanation: str
    generation_method: str = "gemini_ai_animation"
    scenes: List[AIAnimatedScene] = Field(min_length=3, max_length=7)
    quiz: Optional[Dict[str, Any]] = None
    key_points: List[str] = Field(default_factory=list)
    sign_glossary: List[Dict[str, Any]] = Field(default_factory=list)
    is_ai_generated: bool = True

    @field_validator("scenes")
    @classmethod
    def validate_scene_count(cls, v):
        if not (3 <= len(v) <= 7):
            raise ValueError(f"Must have 3-7 scenes, got {len(v)}")
        return v
