from math import sqrt


def calculate_similarity(
    embedding1,
    embedding2
) -> float:

    if embedding1 is None or embedding2 is None:
        return 0.0

    vector1 = list(embedding1)
    vector2 = list(embedding2)

    if (
        not vector1
        or not vector2
        or len(vector1) != len(vector2)
    ):
        return 0.0

    dot_product = sum(
        float(a) * float(b)
        for a, b in zip(
            vector1,
            vector2
        )
    )

    norm1 = sqrt(
        sum(
            float(value) ** 2
            for value in vector1
        )
    )

    norm2 = sqrt(
        sum(
            float(value) ** 2
            for value in vector2
        )
    )

    if norm1 == 0 or norm2 == 0:
        return 0.0

    similarity = (
        dot_product /
        (norm1 * norm2)
    )

    return float(similarity)