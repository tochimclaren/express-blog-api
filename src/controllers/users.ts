import { deleteUserById, getUsers } from "../models/user";
import { Request, Response } from "express"

export const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    console.log("reaching...")
    try {
        const users = await getUsers();
        if (users) {
            return res.status(200).json(users)
        }
        return res.status(404).json({
            "message": "Users not found"
        }).end()
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id)
        return res.status(200).send(deletedUser)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}