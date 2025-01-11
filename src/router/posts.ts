import { Router } from "express"
import { postCreate, postList, postUpdate, postDelete, postDetail, postByAuthor } from "../controllers/post"
import { isAuthenticated, isOwner, validateData } from "../middlewares/auth"
import { postCreateSchema } from "../schemas/post.schema";


const router = Router();

router.get("/posts", postList)
router.get("/posts/:postId/", postDetail)
router.get("/posts/author/:username", postByAuthor)
router.post("/posts/create/", isAuthenticated, validateData(postCreateSchema), postCreate)
router.put("/posts/:postId/update", isAuthenticated, validateData(postCreateSchema), postUpdate)
router.delete("/posts/:postid/delete", isAuthenticated, isOwner, postDelete)

export default router;