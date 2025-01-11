import { z } from "zod"
import { ObjectIdSchema } from "../utils/validations";

const ItemTypeSchema = z.enum(["post", "comment"]); // this is the closest to generic foreignkey that I can  remember

export const likeSchema = z.object({
    itemId: ObjectIdSchema,
    itemType: ItemTypeSchema,
    created: z.date(),
    updated: z.date()
})

export const unlikeSchema = z.object({ itemId: ObjectIdSchema })