import axios from "axios";
import AppError from "../AppError";
import { config } from "../../config/env";

export async function refreshAccessToken(refreshToken: string) {

    const refreshTokenApi = config.google_refresh_token_api

    try {
        const response = await axios.post(
            refreshTokenApi!,
            new URLSearchParams({
                client_id: config.client_id!,
                client_secret: config.client_secret!,
                refresh_token: refreshToken,
                grant_type: "refresh_token"
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )

        const { access_token, expires_in } = response.data;

        return {
            accessToken: access_token,
            expiresIn: expires_in
        }

    } catch (err) {
        throw new AppError("Failed to refresh access token", 400)
    }
}