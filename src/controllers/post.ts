import Post, { createPost, updatePost, getPost, deletePost, IPost } from "../models/post"
import Comment from "../models/comment"
import { Request, Response } from "express"
import { AuthRequest } from "../utils/express"
import { pageObj } from "../utils/pagination"
import Like from "../models/like"
import User from "../models/user"
import { BAD_REQUEST, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_ALLOWED, NOT_FOUND, OK } from "../constants/http.code"



export const postList = async (req: Request, res: Response): Promise<any> => {
    try {
        const pagination = pageObj(req)
        const { page = 1, limit = 10, featured, published } = pagination
        const filter: Record<string, any> = {};
        if (featured !== undefined) filter.featured = featured;
        if (published !== undefined) filter.published = published;
        const totalItems = await Post.countDocuments(filter);
        const totalPages = Math.ceil(totalItems / limit);
        const posts = await Post.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        // Aggregate comments
        const commentCounts = await Comment.aggregate([
            { $match: { post: { $in: posts.map(post => post._id) } } },
            { $group: { _id: "$post", count: { $sum: 1 } } },
        ]);

        // Aggregate likes
        const likeCounts = await Like.aggregate([
            { $match: { itemId: { $in: posts.map(post => post._id) }, itemType: "post" } },
            { $group: { _id: "$itemId", count: { $sum: 1 } } },
        ]);
        // format post here.
        const result = posts.map(post => {
            const commentData = commentCounts.find(c => c._id.toString() === post._id.toString());
            const likeData = likeCounts.find(l => l._id.toString() === post._id.toString());
            return {
                post,
                commentCount: commentData ? commentData.count : 0,
                likeCount: likeData ? likeData.count : 0,
            };
        });

        return res.status(OK).json({
            page,
            limit,
            totalItems,
            totalPages,
            data: result,
        });
    } catch (error) {
        console.log(error)
        return res.status(INTERNAL_SERVER_ERROR).send({ "message": "Something went wrong" })
    }
}
export const postByAuthor = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.params
        if (!username) {
            return res.sendStatus(NOT_ALLOWED)
        }
        const user = await User.findOne({ username })
        console.log(user)
        if (!user) {
            return res.status(NOT_FOUND).json({ "message": `Author with username ${username} does not exist` })
        }
        const posts = await Post.find({ author: user._id })
        console.log(posts)

        if (posts) {
            return res.status(OK).json(posts)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const postDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const pagination = pageObj(req)
        const { page = 1, limit = 10 } = pagination
        const { postId } = req.params
        if (!postId) {
            return res.status(FORBIDDEN).json({ "message": "requires postId param" })
        }
        let comments;
        const post = await Post.findById(postId)
        if (post) {
            const postComments = await Comment.find({ post: post._id })
                .skip((page - 1) * limit)
                .limit(limit);
            if (postComments) {
                comments = postComments
            }
            return res.status(OK).json({
                post,
                comments,
            })
        }
        if (!post) {
            return res.send(NOT_FOUND).json({ "message": `Post with id ${postId} not found` })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }

}


export const postCreate = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { _id: author } = req.identity
        const { title, slug, content, featured, published } = req.body
        const data: IPost = {
            title,
            slug,
            author,
            content,
            featured,
            published
        }
        const post = await createPost(data)
        return res.status(CREATED).json(post).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const postUpdate = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { postId } = req.params
        const { _id: author } = req.identity
        const { title, slug, content, featured, published } = req.body
        if (!postId) {
            return res.sendStatus(FORBIDDEN)
        }
        if (!title || !slug || !content) {
            return res.sendStatus(BAD_REQUEST)

        }
        const post = await getPost(postId)
        if (!post) {
            return res.sendStatus(NOT_FOUND)
        }
        const data: IPost = {
            title,
            slug,
            content,
            author,
            featured,
            published,
        }
        const toUpdate = await updatePost(postId, data)
        return res.status(OK).send(toUpdate)

    } catch (error) {
        console.log(error)

        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}

export const postDelete = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postId } = req.params
        if (!postId) {
            return res.sendStatus(NOT_FOUND)
        }
        await deletePost(postId)

        return res.status(NO_CONTENT).send({ message: `Post with id ${postId} was removed` })

    } catch (error) {
        console.log(error)
        return res.sendStatus(INTERNAL_SERVER_ERROR)
    }
}