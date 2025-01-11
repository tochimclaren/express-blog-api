import { z } from "zod"
import { ObjectIdSchema } from "../utils/validations";

export const createCommentSchema = z.object({
    content: z.string().optional(),
    created: z.date().optional(),
    post: ObjectIdSchema,
})

export const updateCommentSchema = z.object({
    content: z.string()
})