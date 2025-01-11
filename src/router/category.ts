import { Router } from "express";
import {
    categoryList,
    categoryItem,
    categoryCreate,
    categoryUpdate,
    categoryDelete
} from "../controllers/category";
import { validateData } from "../middlewares/auth";
import { categoryCreateSchema } from "../schemas/category.schema";

const router = Router()

router.get("/categories", categoryList)
router.post("/category/create", validateData(categoryCreateSchema), categoryCreate)
router.get("/category/:categoryId/", categoryItem)
router.put("/category/:categoryId/update", validateData(categoryCreateSchema), categoryUpdate)
router.delete("/category/:categoryId/delete", categoryDelete)


export default router