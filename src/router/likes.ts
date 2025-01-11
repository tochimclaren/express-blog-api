import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth";
import { likeCreate, likeDelete } from "../controllers/like";
import { likeSchema, unlikeSchema } from "../schemas/like.schema";
import { validateData } from "../middlewares/auth";

const router = Router()

router.post("/like", isAuthenticated, validateData(likeSchema), likeCreate)
router.delete("/unlike", isAuthenticated, validateData(unlikeSchema), likeDelete)

export default router