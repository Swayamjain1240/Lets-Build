from services.semanticService import semantic_similarity


SEMANTIC_THRESHOLD = 0.65


def match_skill(required_skill: dict, candidate_skill: dict):

    required_name = required_skill["name"].lower().strip()
    candidate_name = candidate_skill["name"].lower().strip()

    # Exact canonical match
    if required_name == candidate_name:
        return {
            "matched": True,
            "matchType": "exact",
            "score": 1.0
        }

    # Semantic match using readable names
    semantic_score = semantic_similarity(
        required_skill["displayName"],
        candidate_skill["displayName"]
    )

    if semantic_score >= SEMANTIC_THRESHOLD:
        return {
            "matched": True,
            "matchType": "semantic",
            "score": semantic_score
        }

    return {
        "matched": False,
        "matchType": "none",
        "score": semantic_score
    }


def match_candidate(
    required_skills: list[dict],
    candidate_skills: list[dict]
):

    if not required_skills:
        return {
            "matchedSkills": [],
            "matchedCount": 0,
            "requiredCount": 0,
            "score": 0.0
        }

    matched_skills = []
    total_score = 0.0

    for required_skill in required_skills:

        best_match = None
        best_score = 0.0

        for candidate_skill in candidate_skills:

            result = match_skill(
                required_skill,
                candidate_skill
            )

            if result["matched"] and result["score"] > best_score:

                best_score = result["score"]

                best_match = {
                    "requiredSkill": required_skill["displayName"],
                    "candidateSkill": candidate_skill["displayName"],
                    "matchType": result["matchType"],
                    "score": result["score"]
                }

        if best_match:
            matched_skills.append(best_match)
            total_score += best_score

    final_score = total_score / len(required_skills)

    return {
        "matchedSkills": matched_skills,
        "matchedCount": len(matched_skills),
        "requiredCount": len(required_skills),
        "score": round(final_score, 4)
    }