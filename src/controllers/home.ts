import { Request, Response } from "express";
import Post from "../models/post"
import { pageObj } from "../utils/pagination";


export const home = async (req: Request, res: Response): Promise<any> => {
    const pagination = pageObj(req)
    const { page = 1, limit = 10, featured } = pagination

    const filter: Record<string, any> = {};
    if (featured !== undefined) filter.featured = featured;
    
    const totalItems = await Post.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / limit);
    const posts = await Post.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

    return res.status(200).json({
        page,
        limit,
        totalItems,
        totalPages,
        data: posts,
    });
}