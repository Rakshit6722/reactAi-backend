import express from "express";
import { ROUTES } from "../../routes/routes";
import { authenticateJWT } from "../../middlewares/auth";
import { createLead, deleteLead, getCampaignLeads, getLeadDetails, toggleShouldSend, updateLead, uploadLeadCsv } from "./lead.controller";
import { authValidator } from "../../middlewares/authValidator";
import { leadSchema } from "./lead.validator";
import { upload } from "../../middlewares/upload.middleware";

const { LEADS } = ROUTES

const router = express.Router()

router.get(LEADS.GET_LEAD,authenticateJWT,getLeadDetails),
router.get(LEADS.GET_ALL_LEADS,authenticateJWT,getCampaignLeads),
router.post(LEADS.CREATE_SINGLE,authenticateJWT,authValidator(leadSchema),createLead)
router.post(LEADS.CREATE_BULK,authenticateJWT,upload.single('file'),uploadLeadCsv)
router.put(LEADS.UPDATE,authenticateJWT,authValidator(leadSchema), updateLead)
router.get(LEADS.TOGGLE_SHOULDSEND,authenticateJWT, toggleShouldSend)
router.delete(LEADS.DELETE,authenticateJWT, deleteLead)

export default router