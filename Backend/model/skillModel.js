import mongoose from "mongoose"

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Canonical skill name is required'],
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: [true, 'Display name is required'],
        trim: true,
    },
    aliases: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],
    usageCount: {
      type: Number,
      default: 1,
    },

},{timestamps:true});

skillSchema.index({name:1});

const Skill = mongoose.model("Skill", skillSchema);
export default Skill;