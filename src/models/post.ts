import { Schema, model, Types } from "mongoose";
// import { z } from "zod"
// import { postCreateSchema } from "../schemas/post.schema";

// export type PostType = z.infer<typeof postCreateSchema>

export interface IPost {
    title: string;
    slug: string;
    category?: Types.ObjectId;
    content: string;
    image?: string;
    author: Types.ObjectId;
    published?: boolean;
    featured?: boolean;
    created?: Date;
    updated?: Date;
}


const PostSchema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    published: {
        type: Boolean,
        default: true
    },
    featured: {
        type: Boolean,
        default: false
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

const Post = model<IPost>("Post", PostSchema);

export const getPosts = () => Post.find()

export const getPost = (id: string) => Post.findById(id)

export const createPost = (values: IPost) => new Post(values).save().then((user) => user.toObject())

export const deletePost = (id: string) => Post.findOneAndDelete({ _id: id })

export const updatePost = (id: string, values: IPost) => Post.findByIdAndUpdate(id, values, { new: true })

export default Post


// - `id` (Primary Key, Auto-increment)
// - `title` (String, 255)
// - `slug` (Unique, String, 255)
// - `content` (Text)
// - `image` (String/FilePath, Optional)
// - `author_id` (Foreign Key to `Users.id`)
// - `published` (Boolean, Default: False)
// - `created_at` (DateTime, Default: NOW)
// - `updated_at` (DateTime)