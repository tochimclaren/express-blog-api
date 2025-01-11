import { deleteUserById, getUsers } from "../models/user";
import { Request, Response } from "express"
import { OK, NOT_FOUND, INTERNAL_SERVER_ERROR } from "../constants/http.code"

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsers();
        if (users) {
            return res.status(OK).json(users)
        }
        return res.status(NOT_FOUND).json({
            "message": "Users not found"
        }).end()
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id)
        return res.status(OK).send(deletedUser)

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}