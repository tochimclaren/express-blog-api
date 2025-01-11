import { z } from "zod"
import { ObjectIdSchema } from "../utils/validations";

export const postCreateSchema = z.object({
    title: z.string(),
    slug: z.string().regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Invalid slug: only lowercase letters, numbers, and hyphens are allowed. Must not start or end with a hyphen."
    ),
    category: ObjectIdSchema,
    content: z.string(),
    image: z.string().optional().nullable(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
    created: z.date().optional(),
    updated: z.date().optional(),
})