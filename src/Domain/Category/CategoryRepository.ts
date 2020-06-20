import { Category } from "./Category";

export interface CategoryRepository {
    findByName(name:string):Promise<Category>
    findByNameOrNull(name:string):Promise<Category|null>
    findByNameAndPopulateEvents(name:string):Promise<Category>
    findAll():Promise<Category[]>
    save(category:Category):Promise<void>

}