import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/AppError";
import { createUser, authenticateUser, getUserProfile, forgotPasswordService, resetPasswordService, blacklistTokenService } from "./auth.service";
import { AUTH_CONSTANTS } from "../../constants/auth.constant";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const user = await createUser(name, email, password);
        res.status(AUTH_CONSTANTS.USER_CREATED.status).json({
            success: true,
            message: AUTH_CONSTANTS.USER_CREATED.message,
            user
        });
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const data = await authenticateUser(email, password);

        res.cookie('token', data.token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(AUTH_CONSTANTS.LOGIN_SUCCESS.status).json({
            success: true,
            message: AUTH_CONSTANTS.LOGIN_SUCCESS.message,
            data: {
                user: data.user
            }
        });
    } catch (err) {
        next(err);
    }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) {
            return next(new AppError(AUTH_CONSTANTS.UNAUTHORIZED.message, AUTH_CONSTANTS.UNAUTHORIZED.status));
        }
        const user = await getUserProfile(userId);
        res.json({ success: true, user });
    } catch (err) {
        next(err);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        await forgotPasswordService(email);
        res.status(AUTH_CONSTANTS.FORGOT_PASSWORD.status).json({ success: true, message: AUTH_CONSTANTS.FORGOT_PASSWORD.message });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, password } = req.body;
        await resetPasswordService(token, password);
        res.status(AUTH_CONSTANTS.RESET_PASSWORD.status).json({ success: true, message: AUTH_CONSTANTS.RESET_PASSWORD.message });
    } catch (err) {
        next(err);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    let blacklistedToken: any = ''
    if (token) {
        blacklistedToken = blacklistTokenService(token)
    } else {
        throw new AppError(AUTH_CONSTANTS.LOGOUT_USER.TOKEN_MISSING.message, AUTH_CONSTANTS.LOGOUT_USER.TOKEN_MISSING.status)
    }

    if (blacklistedToken) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        res.status(AUTH_CONSTANTS.LOGOUT_USER.LOGOUT_SUCCESSFUL.status).json({ success: true, message: AUTH_CONSTANTS.LOGOUT_USER.LOGOUT_SUCCESSFUL.message });
    } else {
        throw new AppError(AUTH_CONSTANTS.LOGOUT_USER.LOGOUT_FAILED.message, AUTH_CONSTANTS.LOGOUT_USER.LOGOUT_FAILED.status)
    }
};