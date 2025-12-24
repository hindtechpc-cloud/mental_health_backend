import { body } from "express-validator";

export const registerValidations = [
  body("name").notEmpty("please enter name"),
  body("email").isEmail("please enter valid email"),
];
