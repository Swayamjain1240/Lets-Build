from pydantic import BaseModel
from typing import List


class Skill(BaseModel):
    name: str
    displayName: str


class UserProfile(BaseModel):
    id: str
    skills: List[Skill]


class ProjectProfile(BaseModel):
    id: str
    skills: List[Skill]


class ProjectCandidate(BaseModel):
    id: str
    title: str
    skills: List[Skill]


class DeveloperCandidate(BaseModel):
    id: str
    name: str
    skills: List[Skill]


class ProjectRecommendationRequest(BaseModel):
    user: UserProfile
    candidates: List[ProjectCandidate]


class DeveloperRecommendationRequest(BaseModel):
    project: ProjectProfile
    candidates: List[DeveloperCandidate]


class RecommendationItem(BaseModel):
    id: str
    score: float


class RecommendationResponse(BaseModel):
    recommendations: List[RecommendationItem]