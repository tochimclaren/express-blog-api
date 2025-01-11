import Comment, {
    getComment,
    createComment,
    deleteComment,
} from "../models/comment"
import { Request, Response } from "express";
import { getUserByEmail } from "../models/user";
import { getPost } from "../models/post";
import { AuthRequest } from "../utils/express";
import { pageObj } from "../utils/pagination";


export const commentList = async (req: Request, res: Response): Promise<any> => {
    try {
        const pagination = pageObj(req)
        const { page = 1, limit = 10 } = pagination
        const totalItems = await Comment.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const comments = await Comment.find().sort({created: -1})
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({
            page,
            limit,
            totalItems,
            totalPages,
            data: comments
        });

    } catch (error) {

        console.log(error)
        return res.sendStatus(400)
    }
}

export const commentCreate = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { email } = req.identity
        const { content, post: postId } = req.body
        if (!postId || !email || !content) {
            return res.sendStatus(400)
        }
        const post = await getPost(postId)
        if (!post) {
            return res.sendStatus(404)
        }
        const user = await getUserByEmail(email)
        if (!user) {
            return res.sendStatus(404)
        }
        const data = {
            content: content,
            user: user._id,
            post: post._id,
        }
        const comment = await createComment(data)
        return res.status(200).send(comment)

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }

}

export const commentUpdate = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const { _id: userId } = req.identity
        const { content } = req.body


        if (!id && !content) {
            return res.sendStatus(403)
        }
        const comment = await getComment(id)
        if (!comment) {
            return res.sendStatus(400)
        }
        if (comment.user.toString() !== userId.toString()) {
            console.log("invalid user")
            return res.sendStatus(403)
        }
        comment.content = content
        await comment.save()
        return res.status(200).send(comment.toObject())

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const commentDelete = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { _id: userId } = req.identity
        const { id } = req.params
        if (!id) {
            return res.sendStatus(405)
        }
        const comment = await getComment(id)
        if (!comment){
            return res.sendStatus(404)
        }
        if (comment.user.toString() !== userId.toString())
        {
            return res.sendStatus(400)
        }

        await deleteComment(id)
        return res.status(200).send({ message: "comment removed" })

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}