import { Types } from "mongoose"
import { z } from "zod"

export const ObjectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});