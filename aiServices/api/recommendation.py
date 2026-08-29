from fastapi import APIRouter

from schemas.recommendationSchema import (RecommendationRequest, RecommendationResponse)

from services.rankingService import rank_candidates

router = APIRouter()

@router.post(
    "/recommendations",
    response_model=RecommendationResponse
)
def get_recommendations(
    request: RecommendationRequest
):

    candidates = [
        candidate.model_dump()
        for candidate in request.candidates
    ]

    results = rank_candidates(
        request.requiredSkills,
        candidates
    )

    return {
        "success": True,
        "recommendations": results
    }

