import express from "express";
import { ROUTES } from "../../routes/routes";
import { authenticateJWT } from "../../middlewares/auth";
import { authValidator } from "../../middlewares/authValidator";
import { campaignBodySchema, campaignNameSchema, campaignSchema, campaignSubjectSchema } from "./campaign.validator";
import { createCampaign, deleteCampaign, getCampaign, updateCampaign, getSingleCampaign, updateCampaignName, updateCampaignBody, updateCampaignSubject } from "./campaign.controller";

const router = express.Router()

const { CAMPAIGN } = ROUTES

router.get(CAMPAIGN.GET, authenticateJWT, getCampaign)
router.post(CAMPAIGN.CREATE, authenticateJWT, authValidator(campaignSchema), createCampaign)
router.put(CAMPAIGN.UPDATE, authenticateJWT, authValidator(campaignSchema), updateCampaign)
router.patch(CAMPAIGN.UPDATE_NAME, authenticateJWT, authValidator(campaignNameSchema), updateCampaignName)
router.patch(CAMPAIGN.UPDATE_BODY, authenticateJWT, authValidator(campaignBodySchema), updateCampaignBody)
router.patch(CAMPAIGN.UPDATE_SUBJECT, authenticateJWT, authValidator(campaignSubjectSchema), updateCampaignSubject)
router.delete(CAMPAIGN.DELETE, authenticateJWT, deleteCampaign)
router.get(CAMPAIGN.GET_SINGLE, authenticateJWT, getSingleCampaign);

export default router