import express, { Request, Response } from 'express'
import { config } from './config/env'
import { errorHandler } from './middlewares/errorHandler'
import cors from 'cors'
import './config/passport.ts'
import session from 'express-session'
import passport from 'passport'
import cookieParser from 'cookie-parser'

import authRoutes from './modules/auth/auth.route.ts'
import campaignRoutes from './modules/campaigns/campaign.route.ts'
import leadRoutes from './modules/leads/lead.route.ts'
import emailSentRoutes from './modules/emailSent/email.route.ts'
import campaignAttachments from './modules/attachments/attachments.route.ts'
import sendEmail from './modules/sendEmail/sendEmail.route.ts'
import { ROUTES } from './routes/routes.ts'

import { cloudinaryConnect } from './config/cloudinary.ts'
import './workers/emailWorker.ts'

const app = express()

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

cloudinaryConnect()

//for sending and receiving cookies
app.use(cookieParser())
app.use(session({
    secret: config.jwt_secret!,
    resave: false,
    saveUninitialized: false,
}))

//for gauth and gmail api integration
app.use(passport.initialize())
app.use(passport.session())

//routes
app.use(ROUTES.AUTH.ROOT, authRoutes)
app.use(ROUTES.CAMPAIGN.ROOT, campaignRoutes)
app.use(ROUTES.LEADS.ROOT, leadRoutes)
app.use(ROUTES.EMAILSENT.ROOT, emailSentRoutes)
app.use(ROUTES.ATTACHMENTS.ROOT, campaignAttachments)
app.use(ROUTES.SEND_EMAIL.ROOT, sendEmail)


//custom error handler for all type of errors accros project
app.use(errorHandler)

const PORT = config.port || 3000

app.listen(PORT, () => {
    console.log("server started")
})