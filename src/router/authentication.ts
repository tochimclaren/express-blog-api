import { Router } from "express";
import { login, logout, register, updateUser, changePasswordByEmail } from "../controllers/authentication"
import { isAuthenticated, isOwner, validateData, validateObject } from "../middlewares/auth"
import { userLoginSchema, updateUserSchema, userRegistrationSchema, changePasswordSchema } from "../schemas/user.schema"
const router = Router();

router.post("/login", validateData(userLoginSchema), login)

router.post("/logout", isAuthenticated, logout)

router.post("/register", validateData(userRegistrationSchema), register)

router.put("/:userId/update", isAuthenticated, isOwner, validateData(updateUserSchema), updateUser)

router.post("/:userId/password/change", validateObject(changePasswordSchema), changePasswordByEmail)

export default router;