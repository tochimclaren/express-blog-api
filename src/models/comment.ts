import { Schema, model, Types } from "mongoose";
// import { z } from "zod"
// import { createCommentSchema } from "../schemas/comment.schema";

// export type CommentType = z.infer<typeof createCommentSchema>

export interface IComment {
    content: string,
    created?: Date,
    user: Types.ObjectId,
    post: Types.ObjectId
}

const CommentSchema = new Schema<IComment>({
    content: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
});

const Comment = model<IComment>('Comment', CommentSchema);

export const listComment = () => Comment.find()

export const getComment = (id: string) => Comment.findById(id)

export const createComment = (values: IComment) => new Comment(values).save().then((comment) => comment.toObject())

export const updateComment = (id: string, values: IComment) => Comment.findByIdAndUpdate(id, values, { new: true })

export const deleteComment = (id: string) => Comment.findByIdAndDelete({ _id: id })

export default Comment



// Stores comments on blog posts.  
// - `id` (Primary Key, Auto-increment)
// - `post_id` (Foreign Key to `Blog Posts.id`)
// - `user_id` (Foreign Key to `Users.id`)
// - `content` (Text)
// - `created_at` (DateTime, Default: NOW)