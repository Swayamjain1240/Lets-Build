from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(embedding1, embedding2) -> float:

    if embedding1 is None or embedding2 is None:
        return 0.0

    score = cosine_similarity(
        [embedding1],
        [embedding2]
    )[0][0]

    return float(score)