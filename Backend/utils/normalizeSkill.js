import Skill from "../model/skillModel.js"

export const sanitizeSkillKey = (rawSkill) =>{
    if(!rawSkill || typeof rawSkill !== "string") return '';

    return rawSkill.trim().toLowerCase().replace(/[^a-z0-9]/g, '')
};

export const normalizeAndGetSkillIds = async (rawSkillArray) => {
    if(!Array.isArray(rawSkillArray) || rawSkillArray.length === 0){
        return [];
    }    

    const skillIds = [];

    for (const rawInput of rawSkillsArray) {
    const trimmedInput = rawInput.trim();
    if (!trimmedInput) continue;


    const normalizedKey = sanitizeSkillKey(trimmedInput);

    if (!normalizedKey) continue;


    let skillDoc = await Skill.findOne({
      $or: [
        { normalizedName: normalizedKey },
        { aliases: normalizedKey }
      ]
    });

    if (skillDoc) {
      
      const isAliasStored = skillDoc.aliases.includes(trimmedInput.toLowerCase());
      
      skillDoc.usageCount += 1;
      
      if (!isAliasStored) {
        skillDoc.aliases.push(trimmedInput.toLowerCase());
      }
      await skillDoc.save();
    } else {
      skillDoc = await Skill.create({
        normalizedName: normalizedKey,
        displayName: trimmedInput,
        aliases: [trimmedInput.toLowerCase()],
        usageCount: 1,
      });
    }

    skillIds.push(skillDoc._id);
  }

  return skillIds;
}