import mongoose from "mongoose";

const healthSchema = new mongoose.Schema(
  {
    feeling: {
      type: String,
      required: [true, "feeling is required"],
      enum: [
        "disappointed_face",
        "confused_face",
        "slightly_smiling_face",
        "smiling_face_with_smiling_eyes",
        "grinning_face_with_smiling_eyes",
        "beaming_face_with_smiling_eyes",
      ],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "You are not authorized"],
    },
    quickNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const MentalHealth = mongoose.model("mentalHealth", healthSchema);
