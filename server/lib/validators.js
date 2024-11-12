import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
    const errors = validationResult(req);

    const errorMessages = errors
        .array()
        .map((error) => error.msg)
        .join(", ");

    if (errors.isEmpty()) return next();
    else next(new ErrorHandler(errorMessages, 400));
};

const registerValidator = () => [
    body("name", "Please Enter Name").notEmpty(),
    body("username", "Please Enter Username").notEmpty(),
    body("bio", "Please Enter Bio").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

const loginValidator = () => [
    body("username", "Please Enter Username").notEmpty(),
    body("password", "Please Enter Password").notEmpty(),
];

export {
    loginValidator,
    registerValidator,
    validateHandler
};

