from fastembed import TextEmbedding

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"

model = TextEmbedding(
    model_name=MODEL_NAME
)


def generate_embedding(text: str):
    if not text:
        return None

    embeddings = list(
        model.embed([text])
    )

    return embeddings[0]


def generate_embeddings(texts: list[str]):
    if not texts:
        return []

    return list(
        model.embed(texts)
    )