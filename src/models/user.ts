import { Schema, model } from "mongoose";
import { z } from "zod"
import { updateUserSchema } from "../schemas/user.schema";

export type userUpdateType = z.infer<typeof updateUserSchema>;

export interface IUser {
    username: string,
    email: string,
    authentication: {
        password: string,
        salt: string,
        sessionToken?: string
    }
    created?: Date,
    updated?: Date,
    isAdmin?: boolean

}


const UserSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 10,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min: 10,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            min: 10,
            select: false,
        },
        salt: {
            type: String,
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        }
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated: {
        type: Date,
        default: () => Date.now()
    },
    isAdmin: Boolean,
});


const User = model<IUser>("User", UserSchema)
export const getUsers = () => User.find()

export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) => User.findOne({
    "authentication.sessionToken": sessionToken
})
export const getUserById = (id: string) => User.findById({ id })
export const createUser = (values: IUser) => new User(values).save().then((user) => user.toObject())
export const deleteUserById = (id: string) => User.findOneAndDelete({ _id: id })
export const updateUserById = (id: string, values: userUpdateType) => User.findByIdAndUpdate({ id, values })


export default User

// - `id` (Primary Key, Auto-increment)
// - `username` (Unique, String, 150)
// - `email` (Unique, String, 255)
// - `password` (Hashed, String, 255)
// - `first_name` (String, 100, Optional)
// - `last_name` (String, 100, Optional)
// - `profile_image` (String/FilePath, Optional)
// - `bio` (Text, Optional)
// - `created_at` (DateTime, Default: NOW)
// - `updated_at` (DateTime)
// - `is_admin` (Boolean, Default: False)