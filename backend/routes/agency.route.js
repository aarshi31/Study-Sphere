import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAgency, getAgencyById, registerAgency, updateAgency } from "../controllers/agency.controller.js";
//import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerAgency);
router.route("/get").get(isAuthenticated,getAgency);
router.route("/get/:id").get(isAuthenticated,getAgencyById);
router.route("/update/:id").put(isAuthenticated, updateAgency);

export default router;
