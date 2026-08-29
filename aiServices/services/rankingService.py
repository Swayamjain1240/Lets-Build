from services.matchingService import match_candidate


def rank_candidates(
    required_skills: list[dict],
    candidates: list[dict]
):

    ranked_candidates = []

    for candidate in candidates:

        result = match_candidate(
            required_skills,
            candidate.get("skills", [])
        )

        score_percentage = round(
            result["score"] * 100,
            2
        )

        ranked_candidates.append({
            "id": candidate.get("id"),
            "score": score_percentage
        })

    ranked_candidates.sort(
        key=lambda candidate: candidate["score"],
        reverse=True
    )

    return ranked_candidates