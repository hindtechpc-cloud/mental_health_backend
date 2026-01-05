import mongoose from "mongoose";

const habitLogSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
});

const habitSchema = new mongoose.Schema(
  {
    habitText: { type: String, required: true },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "custom"],
      default: "daily",
    },

    customDays: {
      // 0 = Sunday, 6 = Saturday (Used when frequency = custom)
      type: [Number],
      default: [],
    },

    targetPerWeek: {
      // Used for weekly habits (e.g., 3 times a week)
      type: Number,
      default: 7,
    },

    logs: [habitLogSchema], // Stores completion history

    streak: { type: Number, default: 0 }, // Current streak
    longestStreak: { type: Number, default: 0 },

    totalCompleted: { type: Number, default: 0 },
    totalMissed: { type: Number, default: 0 },

    completionRate: { type: Number, default: 0 }, // % auto-calculated later
  },
  { timestamps: true }
);

// Optional: Method to update completion rate
habitSchema.methods.calculateRate = function () {
  const total = this.totalCompleted + this.totalMissed;
  this.completionRate = total === 0 ? 0 : (this.totalCompleted / total) * 100;
  return this.completionRate;
};

export const Habit = mongoose.model("Habit", habitSchema);
