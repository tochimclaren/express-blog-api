import Post, { createPost, updatePost, getPost, deletePost, IPost } from "../models/post"
import Comment from "../models/comment"
import { Request, Response } from "express"
import { AuthRequest } from "../utils/express"
import { pageObj } from "../utils/pagination"
import Like from "../models/like"
import User from "../models/user"



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

        return res.status(200).json({
            page,
            limit,
            totalItems,
            totalPages,
            data: result,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ "message": "Something went wrong" })
    }
}
export const postByAuthor = async (req: Request, res: Response): Promise<any> => {
    try {
        const { username } = req.params
        if (!username) {
            return res.sendStatus(405)
        }
        const user = await User.findOne({ username })
        console.log(user)
        if (!user) {
            return res.status(404).json({ "message": `Author with username ${username} does not exist` })
        }
        const posts = await Post.find({ author: user._id })
        console.log(posts)

        if (posts) {
            return res.status(200).json(posts)
        }

    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

export const postDetail = async (req: Request, res: Response): Promise<any> => {
    try {
        const pagination = pageObj(req)
        const { page = 1, limit = 10 } = pagination
        const { postId } = req.params
        if (!postId) {
            return res.status(403).json({ "message": "requires postId param" })
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
            return res.status(200).json({
                post,
                comments,
            })
        }
        if (!post) {
            return res.send(404).json({ "message": `Post with id ${postId} not found` })
        }
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
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
        return res.status(201).json(post).end();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}

export const postUpdate = async (req: AuthRequest, res: Response): Promise<any> => {
    try {
        const { postId } = req.params
        const { _id: author } = req.identity
        const { title, slug, content, featured, published } = req.body
        if (!postId) {
            return res.sendStatus(403)
        }
        if (!title || !slug || !content) {
            return res.sendStatus(400)

        }
        const post = await getPost(postId)
        if (!post) {
            return res.sendStatus(404)
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
        return res.status(200).send(toUpdate)

    } catch (error) {
        console.log(error)

        return res.sendStatus(400)
    }
}

export const postDelete = async (req: Request, res: Response): Promise<any> => {
    try {
        const { postId } = req.params
        if (!postId) {
            return res.sendStatus(404)
        }
        await deletePost(postId)

        return res.status(204).send({ message: `Post with id ${postId} was removed` })

    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}