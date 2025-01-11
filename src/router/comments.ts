import { Router } from "express";
import { commentCreate, commentDelete, commentUpdate, commentList } from "../controllers/comment";
import { isAuthenticated } from "../middlewares/auth";
import { validateData } from "../middlewares/auth";
import { createCommentSchema, updateCommentSchema } from "../schemas/comment.schema";


const router = Router();

router.get("/comments", commentList)
router.post("/comment/create", isAuthenticated, validateData(createCommentSchema), commentCreate)
router.put("/comment/:id/update", isAuthenticated, validateData(updateCommentSchema), commentUpdate)
router.delete("/comment/:id/delete", isAuthenticated, commentDelete)

export default router;