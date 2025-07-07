import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "./env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

passport.use(
    new GoogleStrategy(
        {
            clientID: config.client_id!,
            clientSecret: config.client_secret!,
            callbackURL: config.callback_url
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: profile.emails?.[0].value,
                    }
                })

                if (existingUser) {
                    return done(null, existingUser)
                }

                const newUser = await prisma.user.create({
                    data: {
                        name: profile.displayName,
                        email: profile.emails?.[0].value!,
                        googleId: profile.id,
                        googleAccessToken: accessToken,
                        googleRefreshToken: refreshToken
                    }
                })

                done(null, newUser)
            } catch (error: any) {
                done(error, undefined)
            }
        }
    )
)


passport.serializeUser((user: any, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id }
        })
        done(undefined, user)
    } catch (error: any) {
        done(error, undefined)
    }
})