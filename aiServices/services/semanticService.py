from services.embeddingService import generate_embedding
from utils.similarity import calculate_similarity

SEMANTIC_THRESHOLD = 0.65


def semantic_similarity(skill1: str, skill2: str) -> float:

    if not skill1 or not skill2:
        return 0.0

    embedding1 = generate_embedding(skill1)
    embedding2 = generate_embedding(skill2)

    score = calculate_similarity(embedding1, embedding2)

    return round(score, 4)

def is_semantic_match(skill1: str, skill2: str) -> bool:

    score = semantic_similarity(
        skill1,
        skill2
    )

    return score >= SEMANTIC_THRESHOLD