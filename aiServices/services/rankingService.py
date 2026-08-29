from services.matchingService import match_candidate

def rank_candidates(
    required_skills: list[str],
    candidates: list[dict]
):

    ranked_candidates = []

    for candidate in candidates:

        result = match_candidate(
            required_skills,
            candidate.get("skills", [])
        )

        ranked_candidates.append({
            "userId": candidate.get("userId"),
            "score": result["score"],
            "matchedCount": result["matchedCount"],
            "requiredCount": result["requiredCount"],
            "matchedSkills": result["matchedSkills"]
        })

    ranked_candidates.sort(
        key=lambda candidate: candidate["score"],
        reverse=True
    )

    return ranked_candidates