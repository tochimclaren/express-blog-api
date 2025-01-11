import { Router } from "express";
import authentication from "./authentication"
import users from "./users";
import posts from "./posts";
import comments from "./comments";
import categories from "./category";
import likes from "./likes"
import home from "./home";

const router = Router();

router.use("/", home)
router.use("/api/v1", authentication)
router.use("/api/v1", users)
router.use("/api/v1", posts)
router.use("/api/v1", likes)
router.use("/api/v1", categories)
router.use("/api/v1", comments)

export default router