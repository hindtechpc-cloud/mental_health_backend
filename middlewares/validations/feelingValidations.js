import { body, param } from "express-validator";

export const feelingValidation=[
    body("feeling").notEmpty().withMessage("Felling is required"),
    body("quickNotes").optional(),
];