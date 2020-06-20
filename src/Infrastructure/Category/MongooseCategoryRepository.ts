import { Schema, Document, model } from "mongoose";
import { CategoryRepository } from "../../Domain/Category/CategoryRepository";
import { injectable } from "inversify";
import { Category } from "../../Domain/Category/Category";
import { CategorySchema } from "./Schema";
import { CategoryNotFoundException } from "../../Domain/Shared/DomainError";
import { schemaToDomain,domainToSchema } from "../../Shared/Mapper/CategoryMapper";


@injectable()
export class MongooseCategoryRepository implements CategoryRepository{
    async save(category: Category): Promise<void> {
        const schema = domainToSchema(category)
        const userDocument = new CategoryModel(schema)
        await userDocument.save()
    }
    async findByName(name: string): Promise<Category> {
        const category =  await CategoryModel.findOne({name}).exec()
        if (category === null)
            throw new CategoryNotFoundException()
        return schemaToDomain(category)
    }

    async findByNameOrNull(name: string): Promise<Category|null> {
        const category =  await CategoryModel.findOne({name}).exec()
        return (category === null) ? category : schemaToDomain(category)
    }

    async findByNameAndPopulateEvents(name: string): Promise<Category> {
        const category =  await CategoryModel.findOne({name}).populate("events").exec()
        if (category === null)
            throw new CategoryNotFoundException()
        return schemaToDomain(category)
    }
    async findAll(): Promise<Category[]> {
        const categories = await CategoryModel.find().exec()
        return categories.map(v => schemaToDomain(v))
    }
    
}


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    }
})
categorySchema.virtual("events",{
    ref:"Event",
    localField:"name",
    foreignField:"categoriesId",
    justOne:false
})



export type CategoryDocument = CategorySchema & Document

const CategoryModel = model<CategoryDocument>("Category", categorySchema)