import { Request, Response } from "express";
import {
    listCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    ICategory
} from "../models/category";
import { BAD_REQUEST, FORBIDDEN, OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "../constants/http.code"


export const categoryList = async (_: Request, res: Response): Promise<any> => {
    console.log("category endpoint")
    try {
        const categories = await listCategory();
        if (!categories) {
            return res.status(NOT_FOUND).send({
                "message": "Categories do not exist"
            })
        }
        return res.status(OK).json(categories).end()
    } catch (error) {
        console.log(error)
        return res.sendStatus(BAD_REQUEST)
    }

}

export const categoryItem = async (req: Request, res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params
        if (!categoryId) {
            return res.sendStatus(BAD_REQUEST)
        }
        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(BAD_REQUEST)
        }

        return res.status(OK).send(category)

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const categoryCreate = async (req: Request, res: Response): Promise<any> => {

    try {
        const { name, slug } = req.body
        if (!name && !slug) {
            return res.sendStatus(BAD_REQUEST)
        }
        const data: ICategory = {
            name: name,
            slug: slug
        }
        const category = await createCategory(data);
        return res.status(OK).send(category)

    } catch (error) {
        console.log(error)
        return res.sendStatus(BAD_REQUEST)
    }
}

export const categoryUpdate = async (req: Request, res: Response): Promise<any> => {
    try {
        const { categoryId } = req.params
        const { name, slug } = req.body

        if (!categoryId) {
            return res.sendStatus(BAD_REQUEST)
        }
        if (!name && !slug) {
            return res.sendStatus(FORBIDDEN)
        }

        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(NOT_FOUND)
        }
        const data = {
            name: name,
            slug: slug
        }
        const updatedCategory = await updateCategory(categoryId, data)

        return res.status(OK).send(updatedCategory)

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)

    }

}

export const categoryDelete = async (req: Request, res: Response): Promise<any> => {

    try {
        const { categoryId } = req.params
        if (!categoryId) {
            return res.sendStatus(BAD_REQUEST)
        }
        const category = await getCategoryById(categoryId)
        if (!category) {
            return res.sendStatus(NOT_FOUND)
        }
        await deleteCategory(categoryId)
        return res.status(OK).send({ message: "category removed" })
    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}