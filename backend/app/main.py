import os
import logging
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.app.core.config import settings
from backend.app.core.hardware import detect_hardware_profile
from backend.app.api.routes import router as api_router

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.DEBUG else logging.WARNING,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("ai_tutor")

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    hw = detect_hardware_profile()
    logger.info("==================================================================")
    logger.info(f"🚀 Starting {settings.PROJECT_TITLE} (v{settings.VERSION})")
    logger.info(f"System: {hw.get('os')} ({hw.get('architecture')}) | CPU cores: {hw.get('cpu_count_logical')}")
    logger.info(f"RAM: {hw.get('ram_available_gb')} GB free / {hw.get('ram_total_gb')} GB total")
    logger.info(f"GPU: {hw.get('gpu_name')} | VRAM: {hw.get('vram_gb')} GB")
    logger.info(f"LLM Provider: {settings.LLM_PROVIDER.upper()}")
    logger.info(f"Vector RAG Provider: {settings.EMBEDDING_PROVIDER.upper()}")
    logger.info("==================================================================")
    yield

app = FastAPI(
    title=settings.PROJECT_TITLE,
    version=settings.VERSION,
    description="Multimodal Adaptive Generative AI Tutor for Inclusive Education (Deaf learners and learners with Down syndrome).",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Router
app.include_router(api_router, prefix=settings.API_V1_STR)

frontend_build_path = settings.CURRICULUM_DIR.parent.parent.parent.parent / "frontend" / "build"
if frontend_build_path.exists():
    app.mount("/static", StaticFiles(directory=frontend_build_path), name="static")

    @app.get("/")
    async def serve_index():
        return FileResponse(frontend_build_path / "index.html")

    @app.get("/{file_name:path}")
    async def serve_spa_or_file(file_name: str):
        if file_name.startswith("api"):
            return None
        target = frontend_build_path / file_name
        if target.exists() and target.is_file():
            return FileResponse(target)
        return FileResponse(frontend_build_path / "index.html")
else:
    @app.get("/")
    def root():
        return {
            "message": "Welcome to Multimodal Adaptive Generative AI for Inclusive Learning API",
            "docs": "/docs",
            "health": "/api/health",
            "hardware": "/api/hardware"
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.DEBUG)
