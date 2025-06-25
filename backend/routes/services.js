import express from "express"
import { createService, getServices } from "../controllers/serviceController.js"
import { validateService } from "../middlewares/validation.js"

const router = express.Router()

router.post("/", validateService, createService)
router.get("/", getServices)

export default router
