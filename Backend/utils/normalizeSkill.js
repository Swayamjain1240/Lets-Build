import Skill from "../model/skillModel.js"

export const sanitizeSkillKey = (rawSkill) => {
  if (!rawSkill || typeof rawSkill !== "string") return '';

  return rawSkill.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
};

export const normalizeAndGetSkillIds = async (rawSkillArray) => {
  if (!Array.isArray(rawSkillArray) || rawSkillArray.length === 0) {
    return [];
  }

  const skillIds = [];

  for (const rawInput of rawSkillArray) {
    const trimmedInput = rawInput.trim();
    if (!trimmedInput) continue;


    const normalizedKey = sanitizeSkillKey(trimmedInput);

    if (!normalizedKey) continue;


    let skillDoc = await Skill.findOne({
      name: normalizedKey,
    });

    if (skillDoc) {

      skillDoc.usageCount += 1;

      await skillDoc.save();

    } else {

      skillDoc = await Skill.create({
        name: normalizedKey,
        displayName: trimmedInput,
        usageCount: 1,
      });

    }


    if (
      !skillIds.some(
        (id) =>
          id.toString() ===
          skillDoc._id.toString()
      )
    ) {
      skillIds.push(skillDoc._id);
    }
  }

  return skillIds;
}