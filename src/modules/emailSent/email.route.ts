import express from 'express'
import { ROUTES } from '../../routes/routes'
import { authenticateJWT } from '../../middlewares/auth'
import { authValidator } from '../../middlewares/authValidator'
import { emailSentSchema } from './email.validator'
import { createEmailSent, getCampaignEmails } from './email.controller'

const router = express.Router()

const {EMAILSENT} = ROUTES

router.get(EMAILSENT.GET_CAMPAIGN_EAIL, authenticateJWT, getCampaignEmails),
router.post(EMAILSENT.CREATE_EMAIL, authenticateJWT,authValidator(emailSentSchema), createEmailSent)

export default router