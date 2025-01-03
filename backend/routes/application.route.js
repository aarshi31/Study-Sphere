import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyTutor, getApplicants, getAppliedTutors, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyTutor);
router.route("/get").get(isAuthenticated, getAppliedTutors);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
