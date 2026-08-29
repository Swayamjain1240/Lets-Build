from fastapi import APIRouter

from schemas.recommendationSchema import (
    ProjectRecommendationRequest,
    DeveloperRecommendationRequest,
    RecommendationResponse
)

from services.rankingService import rank_candidates


router = APIRouter(
    prefix="/recommend",
    tags=["Recommendations"]
)


@router.post(
    "/projects",
    response_model=RecommendationResponse
)
def recommend_projects(
    request: ProjectRecommendationRequest
):

    user_skills = [
        skill.model_dump()
        for skill in request.user.skills
    ]

    candidates = [
        {
            "id": candidate.id,
            "skills": [
                skill.model_dump()
                for skill in candidate.skills
            ]
        }
        for candidate in request.candidates
    ]

    recommendations = rank_candidates(
        user_skills,
        candidates
    )

    return {
        "recommendations": recommendations
    }


@router.post(
    "/developers",
    response_model=RecommendationResponse
)
def recommend_developers(
    request: DeveloperRecommendationRequest
):

    project_skills = [
        skill.model_dump()
        for skill in request.project.skills
    ]

    candidates = [
        {
            "id": candidate.id,
            "skills": [
                skill.model_dump()
                for skill in candidate.skills
            ]
        }
        for candidate in request.candidates
    ]

    recommendations = rank_candidates(
        project_skills,
        candidates
    )

    return {
        "recommendations": recommendations
    }