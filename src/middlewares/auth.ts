import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import AppError from "../utils/AppError";
import { AUTH_CONSTANTS } from "../constants/auth.constant";
import { extractToken } from "../utils/extractToken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
        return next(new AppError(AUTH_CONSTANTS.UNAUTHORIZED.message, AUTH_CONSTANTS.UNAUTHORIZED.status));
    }
    if (!config.jwt_secret) {
        return next(new AppError(AUTH_CONSTANTS.JWT_SECRET_NOT_SET.message, AUTH_CONSTANTS.JWT_SECRET_NOT_SET.status));
    }

    const blacklisted = await prisma.token.findFirst({ where: { token } });
    if (blacklisted) {
        return next(new AppError(AUTH_CONSTANTS.UNAUTHORIZED.message, AUTH_CONSTANTS.UNAUTHORIZED.status));
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        (req as any).user = decoded;
        next();
    } catch {
        return next(new AppError(AUTH_CONSTANTS.UNAUTHORIZED.message, AUTH_CONSTANTS.UNAUTHORIZED.status));
    }
};