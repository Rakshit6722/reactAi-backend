import { Request } from "express";

export function extractToken(req: Request): string | undefined {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }
    if (req.cookies?.token) {
        return req.cookies.token;
    }
    return undefined;
}
