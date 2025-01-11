import { findLiked, ILike, liked, unliked } from "../models/like"
import { getUserByEmail } from "../models/user"
import { Request, Response } from "express";
import { AuthRequest } from "../utils/express.js";
import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http.code";

export const likeCreate = async (req: AuthRequest, res: Response): Promise<any> => {

    try {
        const { itemId, itemType } = req.body
        const { email } = req.identity
        if (!itemId && !itemType && email) {
            return res.sendStatus(BAD_REQUEST)
        }
        const user = await getUserByEmail(email)
        if (user) {
            const data: ILike = {
                itemId: itemId,
                itemType: itemType,
                user: user._id,
            }

            const like = await liked(data)
            return res.status(OK).send(like)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const likeDelete = async (req: Request, res: Response): Promise<any> => {

    try {
        const { itemId } = req.body
        if (!itemId) {
            return res.sendStatus(BAD_REQUEST)
        }
        const like = findLiked(itemId)
        if (!like) {
            return res.sendStatus(BAD_REQUEST)
        }
        await unliked(itemId)
        return res.status(OK).send({ message: "unliked" })

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}