import express from 'express'
import { ROUTES } from '../../routes/routes'
import { upload } from '../../middlewares/upload.middleware'
import { authenticateJWT } from '../../middlewares/auth'
import { createAttachment } from './attachments.controller.ts'

const router = express.Router()

router.post(ROUTES.ATTACHMENTS.IMAGES_VIDEOS_UPLOAD, authenticateJWT, upload.single('file'), createAttachment)
router.post(ROUTES.ATTACHMENTS.RAW_FILES_UPLOAD, authenticateJWT, upload.single('file'), createAttachment)

export default router