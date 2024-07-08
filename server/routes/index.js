import express from "express";

import authRoute from "./authRoutes.js";
import userRoute from "./userRoute.js";
import CompaniesRoute from "./companiesRoutes.js";
import jobRoute from "./jobsRouts.js"

const router = express.Router();

const path = "/api-v1/";

router.use(`${path}auth`, authRoute);
router.use(`${path}users`, userRoute);
router.use(`${path}companies`, CompaniesRoute);
router.use(`${path}jobs`, jobRoute);

export default router;

