import express, { Request, Response } from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { config } from '../../config/env'
import { AUTH_CONSTANTS } from '../../constants/auth.constant'
import { ROUTES } from '../../routes/routes'
import { authValidator } from '../../middlewares/authValidator'
import { loginSchema, signUpSchema } from './auth.validator'
import { forgotPassword, getProfile, login, logout, resetPassword, signup } from './auth.controller'
import { authenticateJWT } from '../../middlewares/auth'

const router = express.Router()

router.get(ROUTES.AUTH.GOOGLE, passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.send'],
    accessType: 'offline',
    prompt: 'consent',
    session: false
}))

router.get(
    ROUTES.AUTH.GOOGLE_CALLBACK,
    passport.authenticate('google', { session: false, failureRedirect: '/auth/login' }),
    (req: Request, res: Response): void => {
        const user = req.user as any

        if (!config.jwt_secret) {
            res.status(AUTH_CONSTANTS.JWT_SECRET_NOT_SET.status).json({
                success: false,
                message: AUTH_CONSTANTS.JWT_SECRET_NOT_SET.message
            });
            return;
        }
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            config.jwt_secret,
            { expiresIn: '7d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.redirect(`${config.client_url}/dashboard`);
    }
)

router.get(ROUTES.AUTH.PROFILE, authenticateJWT, getProfile)
router.post(ROUTES.AUTH.LOGIN, authValidator(loginSchema), login)
router.post(ROUTES.AUTH.SIGNUP, authValidator(signUpSchema), signup)
router.post(ROUTES.AUTH.FORGOT_PASSWORD, forgotPassword)
router.post(ROUTES.AUTH.RESET_PASSWORD, resetPassword)
router.get(ROUTES.AUTH.LOGOUT, logout)

export default router