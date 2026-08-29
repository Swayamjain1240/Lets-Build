from pydantic import BaseModel
from typing import List


class Candidate (BaseModel):
    userId: str
    skills: List[str]

class RecommendationRequest(BaseModel):
    requiredSkills: List[str]
    candidates: List[Candidate]

class MatchedSkill(BaseModel):
    requiredSkill: str
    candidateSkill: str
    matchType: str
    score: float

class RecommendationResult(BaseModel):
    userId: str
    score: float
    percentage: float
    matchedCount: int
    requiredCount: int
    matchedSkills: List[MatchedSkill]

class RecommendationResponse(BaseModel):
    success: bool
    recommendations: List[RecommendationResult]