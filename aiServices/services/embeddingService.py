from sentence_transformers import SentenceTransformer

MODEL_NAME = "all-MiniLM-L6-v2"

model = SentenceTransformer(MODEL_NAME)

def generate_embedding(text: str):
    if not text:
        return None

    embedding = model.encode(text)

    return embedding


def generate_embeddings(texts: list[str]):
    if not texts:
        return []

    embeedings = model.encode(texts)

    return embeedings