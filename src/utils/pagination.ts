import { Request } from "express"

type paginationType = {
    page?: number | undefined,
    limit?: number | undefined,
    featured?: boolean | undefined,
    published?: boolean | undefined
}

export const pageObj = (req: Request): paginationType => {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const author = req.query.author
    
    const featured: boolean | undefined = req.query.featured
        ? req.query.featured === 'true'
        : undefined;
    const published: boolean | undefined = req.query.published
        ? req.query.published === 'true'
        : undefined;
    return { page, limit, featured, published }
}