import { Request, Response } from "express";
import Category, {
    listCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    ICategory
} from "../models/category";

export const categoryList = async (_: Request, res: Response): Promise<any> => {
    console.log("category endpoint")
    try {
        const categories = await listCategory();
        if (!categories) {
            return res.status(404).send({
                "message": "Categories do not exist"
            })
        }
        return res.status(200).json(categories).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }

}

export const categoryItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params
        if (!categoryId) {
            return res.sendStatus(400)
        }
        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(400)
        }

        return res.status(200).send(category)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const categoryCreate = async (req: Request, res: Response): Promise<any> => {

    try {
        const { name, slug } = req.body
        if (!name && !slug) {
            return res.sendStatus(400)
        }
        const data: ICategory = {
            name: name,
            slug: slug
        }
        const category = await createCategory(data);
        return res.status(200).send(category)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const categoryUpdate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params
        const { name, slug } = req.body

        if (!categoryId) {
            return res.sendStatus(400)
        }
        if (!name && !slug) {
            return res.sendStatus(403)
        }

        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(404)
        }
        const data = {
            name: name,
            slug: slug
        }
        const updatedCategory = await updateCategory(categoryId, data)

        return res.status(200).send(updatedCategory)

    } catch (error) {

    }

}

export const categoryDelete = async (req: Request, res: Response): Promise<any> => {

    try {
        const { categoryId } = req.params
        if (!categoryId) {
            return res.sendStatus(400)
        }
        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(404)
        }

        await deleteCategory(categoryId)

        return res.status(200).send({ message: "category removed" })
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}