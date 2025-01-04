import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminTutors, getAllTutors, getTutorById, postTutor } from "../controllers/tutor.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postTutor);
router.route("/get").get(isAuthenticated, getAllTutors);
router.route("/getadmintutors").get(isAuthenticated, getAdminTutors);
router.route("/get/:id").get(isAuthenticated, getTutorById);

export default router;
