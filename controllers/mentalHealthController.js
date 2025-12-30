import { validationResult } from "express-validator";
import { MentalHealth } from "../models/MentalHealth.js";
import { User } from "../models/User.js";
export const addMentalHealth = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(422).json({
      message: "invalid inputs",
      error: result.array(),
    });
  }
  const { feeling, quickNotes } = req.body;
  
  let health;
  try {
    health = await MentalHealth.create({
      feeling,
      quickNotes,
      patient: req.decoded,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error to create health",
      error: error.message,
    });
  }

  if (!health) {
    return res.status(400).json({
      message: "health not created",
    });
  }

  return res.status(201).json({
    message: "health created successfully",
    health,
  });
};

export const getMentalHealth = async (req, res) => {
  try {
    const health = await MentalHealth.find({
      patient: req.decoded,
    });
    if (!health) {
      return res.status(404).json({
        message: "your mental health not found",
      });
    }
    return res.status(200).json({
      message: "your mental health is here",
      health,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error to fetch health",
      error: error.message,
    });
  }
};

export const deleteHealth = async (req, res) => {
  const { id } = req.params;
  try {
    await MentalHealth.findByIdAndDelete(id);
    return res.status(200).json({
      message: "health deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error to fetch health",
      error: error.message,
    });
  }
};
