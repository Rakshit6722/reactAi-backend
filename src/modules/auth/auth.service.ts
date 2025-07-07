import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config/env";
import AppError from "../../utils/AppError";
import { AUTH_CONSTANTS } from "../../constants/auth.constant";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';


const prisma = new PrismaClient();

export const createUser = async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError(AUTH_CONSTANTS.EMAIL_IN_USE.message, AUTH_CONSTANTS.EMAIL_IN_USE.status);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    return { id: user.id, name: user.name, email: user.email };
};

export const authenticateUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
        throw new AppError(AUTH_CONSTANTS.INVALID_CREDENTIALS.message, AUTH_CONSTANTS.INVALID_CREDENTIALS.status);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(AUTH_CONSTANTS.INVALID_CREDENTIALS.message, AUTH_CONSTANTS.INVALID_CREDENTIALS.status);
    }
    if (!config.jwt_secret) {
        throw new AppError(AUTH_CONSTANTS.JWT_SECRET_NOT_SET.message, AUTH_CONSTANTS.JWT_SECRET_NOT_SET.status);
    }
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwt_secret, { expiresIn: "7d" });
    return {
        token,
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    };
};

export const getUserProfile = async (userId: number) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new AppError(AUTH_CONSTANTS.USER_NOT_FOUND.message, AUTH_CONSTANTS.USER_NOT_FOUND.status);
    }
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
};

export const forgotPasswordService = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new AppError(AUTH_CONSTANTS.USER_NOT_FOUND.message, AUTH_CONSTANTS.USER_NOT_FOUND.status);
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
        where: { email },
        data: { resetToken, resetTokenExpiry }
    });


    const resetLink = `${config.client_url}/auth/reset-password?token=${resetToken}`;

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const templatePath = path.join(__dirname, "../../constants/html-template/resetPassword.html");
    let html = fs.readFileSync(templatePath, "utf-8");
    html = html.replace("{{RESET_LINK}}", resetLink);
    try {
        await sendEmail(
            "ReachAI <noreply@reachai.live>",
            email,
            "Password Reset",
            html
        );
    } catch (err: any) {
        throw new AppError(AUTH_CONSTANTS.EMAIL_SEND_FAILED.message, AUTH_CONSTANTS.EMAIL_SEND_FAILED.status, err?.message)
    }
};

export const resetPasswordService = async (token: string, newPassword: string) => {
    const user = await prisma.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpiry: { gt: new Date() }
        }
    });
    if (!user) {
        throw new AppError("Invalid or expired reset token", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        }
    });
};


export const blacklistTokenService = async (token: string) => {
    const blacklistedToken = await prisma.token.create({ data: { token } });
    return blacklistedToken
}

