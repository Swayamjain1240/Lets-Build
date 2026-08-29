from services.normalizationService import normalize_skill
from services.semanticService import semantic_similarity

SEMANTIC_THRESHOLD = 0.65

def match_skill(required_skill: str, candidate_skill: str):


    required_normalized = normalize_skill(required_skill)
    candidate_normalized = normalize_skill(candidate_skill)

    if required_normalized == candidate_normalized:
        return {
            "matched": True,
            "matchType": "exact",
            "score": 1.0
        }

    semantic_score = semantic_similarity(
        required_skill,
        candidate_skill
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



def match_candidate(required_skills: list[str], candidate_skills: list[str]):

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
                    "requiredSkill": required_skill,
                    "candidateSkill": candidate_skill,
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