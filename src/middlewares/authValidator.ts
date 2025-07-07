import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ParseStatus } from "zod";
import AppError from "../utils/AppError";

export const authValidator = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)

    if (!parsed.success) {
        const { fieldErrors, formErrors } = parsed.error.flatten();
        const formatted = {
            fieldErrors,
            formErrors
        };
        return next(new AppError("Validation failed", 422, formatted))
    }

    next();
}