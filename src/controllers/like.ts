import { findLiked, ILike, liked, unliked } from "../models/like"
import { getUserByEmail } from "../models/user"
import { Request, Response } from "express";
import { AuthRequest } from "../utils/express.js";

export const likeCreate = async (req: AuthRequest, res: Response): Promise<any> => {

    try {
        const { itemId, itemType } = req.body
        const { email } = req.identity
        if (!itemId && !itemType && email) {
            return res.sendStatus(400)
        }
        const user = await getUserByEmail(email)
        if (user) {
            const data: ILike = {
                itemId: itemId,
                itemType: itemType,
                user: user._id,
            }

            const like = await liked(data)
            return res.status(200).send(like)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const likeDelete = async (req: Request, res: Response): Promise<any> => {

    try {
        const { itemId } = req.body
        if (!itemId) {
            return res.sendStatus(400)
        }
        const like = findLiked(itemId)
        if (!like) {
            return res.sendStatus(400)
        }
        await unliked(itemId)
        return res.status(200).send({ message: "unliked" })

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}