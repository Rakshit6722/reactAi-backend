import express from 'express'
import { ROUTES } from '../../routes/routes'
import { sendEmail } from './sendEmail.controller'

const router = express.Router()

const ROUTE = ROUTES.SEND_EMAIL

router.post(ROUTE.SEND_EMAIL, sendEmail)


export default router