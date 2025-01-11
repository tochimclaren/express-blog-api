import { Router } from "express";
import { getAllUsers, deleteUser } from "../controllers/users";
import { isAuthenticated } from "../middlewares/auth";

const router = Router()

router.get("/users", isAuthenticated, getAllUsers)
router.delete("/user/:userId/delete", isAuthenticated, deleteUser)

export default router;



