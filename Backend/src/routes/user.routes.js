import {Router}  from "express"
import { loginUser, logOut, registerUser } from "../controllers/user.controller.js"

const router = Router()

router.route("/regsiter").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logOut)
router.route("/changePassword").post(changeCurrentpassword)

export default router