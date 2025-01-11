import { Schema, model, Types } from "mongoose";
// import { createLikeSchema } from "../schemas/like.schema";
// import {z} from "zod";
// export type LikeType = z.infer<typeof createLikeSchema>

export interface ILike {
    user: Types.ObjectId,
    itemId: Types.ObjectId,
    itemType: string,
    created?: Date,
    updated?: Date

}

const LikeSchema = new Schema<ILike>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    itemId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    itemType: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
})

const Like = model<ILike>("Like", LikeSchema)

export const liked = (values: ILike) => new Like(values).save().then((like) => like.toObject())

export const unliked = (id: string) => Like.findOneAndDelete({ _id: id })

export const findLiked = (id:string) => Like.findById({ id })

export default Like

// Stores flexible likes on posts or comment objects.  
// - `id` (Primary Key, Auto-increment)
// - `post_id` (Foreign Key to `Blog Posts.id`)
// - `likedItemId` (Foreign Key)
// - `likedItemType` (String)
// - `user_id` (Foreign Key to `Users.id`)
// - `created` (DateTime, Default: NOW)
