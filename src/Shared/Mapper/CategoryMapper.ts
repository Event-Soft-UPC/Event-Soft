import { CategorySchema } from "../../Infrastructure/Category/Schema";
import { Category } from "../../Domain/Category/Category";
import {schemaToDomain as STDEvent} from "./EventMapper"

export function schemaToDomain(schema:CategorySchema){
    const categoryModel = new Category(schema.name,schema.description,schema.image)
    if (!!schema.events)
        categoryModel.setEvents(schema.events.map(v => STDEvent(v)))
    return categoryModel
}

export function domainToSchema(entity:Category){
    return  <CategorySchema> {
        description:entity.description,
        image:entity.image,
        name:entity.name 
    }
}