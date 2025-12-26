import { body } from "express-validator";

export const registerValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({
      min: 3,
    })
    .withMessage("name have atleast 3 charactors"),
  body("email")
    .isEmail()
    .withMessage("please enter valid email")
    .normalizeEmail()
    .withMessage("please enter valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("please enter valid password")
    .isLength({
      min: 6,
      max: 16,
    })
    .withMessage("Please enter 6 to 16 charactors in password"),
];

export const loginValidations = [
  body("email")
    .isEmail()
    .withMessage("please enter valid email")
    .normalizeEmail()
    .withMessage("please enter valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("please enter valid password")
    .isLength({
      min: 6,
      max: 16,
    })
    .withMessage("Please enter 6 to 16 charactors in password"),
];
