import re
import logging
from typing import Dict, Any, Tuple
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from backend.app.models.domain import LearnerType, AdaptationAction

logger = logging.getLogger(__name__)

# Common scientific synonym mappings
SYNONYMS = {
    "carbon dioxide": ["co2", "carbon-dioxide", "carbon dioxide gas", "c o 2"],
    "co2": ["carbon dioxide", "carbon-dioxide"],
    "oxygen": ["o2", "oxygen gas", "o 2"],
    "o2": ["oxygen", "oxygen gas"],
    "water": ["h2o", "liquid water", "moisture"],
    "sunlight": ["sun", "solar energy", "light", "sun light"],
    "roots": ["root", "root system", "underground roots"],
    "evaporation": ["evaporate", "water vapor", "vapor"],
    "rain": ["precipitation", "rain drops", "rainfall"],
    "half": ["1/2", "one half", "halves", "1 half"],
    "quarter": ["1/4", "one quarter", "quarters", "one fourth"],
    "4": ["four", "4 parts", "four quarters", "four pieces"],
    "earth": ["planet earth", "the earth", "our planet"],
    "sun": ["the sun", "solar star", "star"]
}

class AssessmentEvaluator:
    """Multi-tiered assessment evaluator combining exact matching, synonym expansion, and semantic similarity."""

    def __init__(self):
        self.vectorizer = TfidfVectorizer(ngram_range=(1, 3), analyzer="char_wb")

    def normalize(self, text: str) -> str:
        text = text.lower().strip()
        text = text.replace("1/2", "half").replace("1/4", "quarter").replace("1/3", "third")
        text = re.sub(r"[^\w\s]", "", text)
        return " ".join(text.split())

    def evaluate(
        self,
        learner_answer: str,
        expected_answer: str,
        concept: str = "",
        learner_type: LearnerType = LearnerType.GENERAL,
        attempt_number: int = 1
    ) -> Tuple[bool, float, str]:
        """
        Returns: (is_correct, similarity_score, feedback)
        """
        norm_learner = self.normalize(learner_answer)
        norm_expected = self.normalize(expected_answer)

        if not norm_learner:
            return False, 0.0, "Please provide an answer to continue."

        # Tier 1: Exact match
        if norm_learner == norm_expected:
            return True, 1.0, self._generate_feedback(True, learner_type, expected_answer)

        # Tier 2: Synonym / Abbreviation match
        synonyms = SYNONYMS.get(norm_expected, [])
        if norm_learner in synonyms or any(s in norm_learner for s in synonyms):
            return True, 0.95, self._generate_feedback(True, learner_type, expected_answer)

        # Tier 3: Substring containment (e.g., "it is carbon dioxide" contains "carbon dioxide")
        if norm_expected in norm_learner or norm_learner in norm_expected:
            return True, 0.90, self._generate_feedback(True, learner_type, expected_answer)

        # Tier 4: Character N-gram semantic/lexical similarity
        try:
            tfidf_mat = self.vectorizer.fit_transform([norm_learner, norm_expected])
            sim = float(cosine_similarity(tfidf_mat[0:1], tfidf_mat[1:2])[0][0])
        except Exception:
            sim = 0.0

        if sim >= 0.75:
            return True, sim, self._generate_feedback(True, learner_type, expected_answer)
        elif sim >= 0.50:
            # Partially close
            return False, sim, f"Close effort! You mentioned '{learner_answer}', but the exact term is '{expected_answer}'."

        return False, sim, self._generate_feedback(False, learner_type, expected_answer, attempt_number)

    def _generate_feedback(
        self,
        is_correct: bool,
        learner_type: LearnerType,
        expected: str,
        attempt_number: int = 1
    ) -> str:
        if is_correct:
            if learner_type == LearnerType.DOWN_SYNDROME:
                return f"🌟 Wonderful job! You got it right: {expected}! Let's celebrate!"
            elif learner_type == LearnerType.DEAF:
                return f"✅ Correct! Excellent understanding of {expected}."
            return f"Correct! {expected} is the right answer."
        else:
            if learner_type == LearnerType.DOWN_SYNDROME:
                if attempt_number == 1:
                    return "Almost! Let's watch the simple step story again together."
                return f"Good try! Remember, the answer is {expected}. Let's look at the picture!"
            elif learner_type == LearnerType.DEAF:
                return f"Not quite. Let's inspect the visual breakdown and sign support for {expected}."
            return f"Incorrect. The expected answer was {expected}."

assessment_evaluator = AssessmentEvaluator()
