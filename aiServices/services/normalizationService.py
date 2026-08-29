import re

from utils.textCleanner import clean_text


def normalize_skill(skill:str) -> str:
    skill = clean_text(skill)

    if not skill:
        return ""

    skill = re.sub(r"[\s._\-]+", "", skill)

    return skill

def normalize_skills(skills: list[str]) -> list[str]:
    normalized = []

    for skill in skills:
        value = normalize_skill(skill)

        if value:
            normalized.append(value)

    return normalized