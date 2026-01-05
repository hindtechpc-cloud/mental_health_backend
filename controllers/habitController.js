import { Habit } from "../models/Habit.js";

/**
 * @desc    Create new habit
 * @route   POST /api/habits
 * @access  Private
 */
export const createHabit = async (req, res) => {
  try {
    const { habitText, frequency, customDays, targetPerWeek } = req.body;

    if (!habitText) {
      return res.status(400).json({ message: "Habit text is required" });
    }

    const habit = await Habit.create({
      habitText,
      frequency,
      customDays,
      targetPerWeek,
      user: req.decoded,
    });

    res.status(201).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update habit
 * @route   PUT /api/habits/:id
 * @access  Private
 */
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Authorization check
    if (habit.user.toString() !== req.decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(
      req.params.id,
      {
        habitText: req.body.habitText ?? habit.habitText,
        frequency: req.body.frequency ?? habit.frequency,
        customDays: req.body.customDays ?? habit.customDays,
        targetPerWeek: req.body.targetPerWeek ?? habit.targetPerWeek,
        totalCompleted: req.body.totalCompleted ?? habit.totalCompleted,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedHabit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete habit
 * @route   DELETE /api/habits/:id
 * @access  Private
 */
export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Authorization check
    if (habit.user.toString() !== req.decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await habit.deleteOne();

    res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHabits = async (req, res) => {
  let habits;
  console.log(req.decoded);
  try {
    habits = await Habit.find({ user: req.decoded });
    if (!habits || habits?.length < 0) {
      return res.status(404).json({ message: "Habit not found" });
    }
    res.status(200).json({
      success: true,
      message: "Habit fetched successfully",
      habits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
