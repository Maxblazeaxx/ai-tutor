import json
from pathlib import Path
from typing import List, Dict, Any

class CurriculumChunk:
    def __init__(self, chunk_id: str, content: str, metadata: Dict[str, Any]):
        self.chunk_id = chunk_id
        self.content = content
        self.metadata = metadata

    def to_dict(self) -> Dict[str, Any]:
        return {
            "chunk_id": self.chunk_id,
            "content": self.content,
            "metadata": self.metadata
        }

class DocumentProcessor:
    """Processes curriculum files (JSON, Markdown, TXT) into structured, search-ready chunks with rich metadata."""

    def __init__(self, data_dir: Path):
        self.data_dir = Path(data_dir)

    def load_and_chunk_all(self) -> List[CurriculumChunk]:
        chunks: List[CurriculumChunk] = []
        if not self.data_dir.exists():
            return chunks

        # Ingest JSON files
        for file_path in self.data_dir.glob("*.json"):
            chunks.extend(self.process_json_file(file_path))

        # Ingest Markdown & Text curriculum files
        for file_path in list(self.data_dir.glob("*.md")) + list(self.data_dir.glob("*.txt")):
            chunks.extend(self.process_text_or_markdown_file(file_path))

        return chunks

    def process_json_file(self, file_path: Path) -> List[CurriculumChunk]:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        chunks: List[CurriculumChunk] = []
        concept = data.get("concept", "General")
        subject = data.get("subject", "General")
        topic = data.get("topic", "General")
        grade = data.get("grade_level", 5)

        base_meta = {
            "concept": concept,
            "subject": subject,
            "topic": topic,
            "grade_level": grade,
            "source_file": file_path.name,
            "raw_data": data
        }

        # 1. Standard explanation chunk
        if "standard_explanation" in data:
            chunks.append(
                CurriculumChunk(
                    chunk_id=f"{concept}_std_exp",
                    content=f"Subject: {subject}. Topic: {topic}. Concept: {concept}. Standard Scientific Explanation: {data['standard_explanation']}",
                    metadata={**base_meta, "chunk_type": "standard_explanation"}
                )
            )

        # 2. Simplified explanation chunk
        if "simplified_explanation" in data:
            chunks.append(
                CurriculumChunk(
                    chunk_id=f"{concept}_simp_exp",
                    content=f"Concept: {concept}. Simplified Accessible Explanation: {data['simplified_explanation']}",
                    metadata={**base_meta, "chunk_type": "simplified_explanation"}
                )
            )

        # 3. Key points chunk
        if "key_points" in data:
            kp_text = " ".join([f"- {pt}" for pt in data["key_points"]])
            chunks.append(
                CurriculumChunk(
                    chunk_id=f"{concept}_key_points",
                    content=f"Concept: {concept}. Key Learning Points: {kp_text}",
                    metadata={**base_meta, "chunk_type": "key_points"}
                )
            )

        # 4. Misconceptions chunk
        if "misconceptions" in data:
            misc_text = " ".join([f"- {m}" for m in data["misconceptions"]])
            chunks.append(
                CurriculumChunk(
                    chunk_id=f"{concept}_misconceptions",
                    content=f"Concept: {concept}. Common Student Misconceptions and Clarifications: {misc_text}",
                    metadata={**base_meta, "chunk_type": "misconceptions"}
                )
            )

        return chunks

    def process_text_or_markdown_file(self, file_path: Path) -> List[CurriculumChunk]:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception:
            return []

        chunks: List[CurriculumChunk] = []
        concept = file_path.stem.replace("_", " ").title()

        # Split into paragraphs or sections
        sections = [s.strip() for s in content.split("\n\n") if s.strip()]
        for idx, sec in enumerate(sections, 1):
            chunks.append(
                CurriculumChunk(
                    chunk_id=f"{file_path.stem}_sec_{idx}",
                    content=f"Concept: {concept}. Passage: {sec}",
                    metadata={
                        "concept": concept,
                        "subject": "General Curriculum",
                        "topic": "Curriculum Upload",
                        "grade_level": 5,
                        "source_file": file_path.name,
                        "chunk_type": "document_passage"
                    }
                )
            )

        return chunks
