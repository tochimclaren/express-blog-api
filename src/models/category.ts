import { Schema, model } from "mongoose"
// import { z } from "zod"
// import { categoryCreateSchema } from "../schemas/category.schema"

// export type categoryType = z.infer<typeof categoryCreateSchema>

export interface ICategory {
    name: string,
    slug: string,
    created?: Date,
}

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
})

const Category = model<ICategory>("Category", CategorySchema)

export const listCategory = () => Category.find()
export const getCategoryById = (id: string) => Category.findById({ id })
export const updateCategory = (id: string, values: ICategory) => Category.findByIdAndUpdate(id, values, { new: true })
export const deleteCategory = (id: string) => Category.findOneAndDelete({ _id: id })
export const createCategory = (values: ICategory) => new Category(values).save().then((category) => category.toObject())

export default Category


// #### **Categories Table**  
// Stores blog categories for classification.  
// - `id` (Primary Key, Auto-increment)
// - `name` (String, 100, Unique)
// - `slug` (Unique, String, 100)
// - `created_at` (DateTime, Default: NOW)