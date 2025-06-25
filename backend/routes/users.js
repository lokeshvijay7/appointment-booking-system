import express from "express"
import { createUser, getUsers } from "../controllers/userController.js"
import { validateUser } from "../middlewares/validation.js"

const router = express.Router()

router.post("/", validateUser, createUser)
router.get("/", getUsers)

export default router
