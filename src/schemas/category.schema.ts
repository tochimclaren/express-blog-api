import { z } from 'zod'

export const categoryCreateSchema = z.object({
    name: z.string(),
    slug: z.string(),
    created: z.date().optional()
})