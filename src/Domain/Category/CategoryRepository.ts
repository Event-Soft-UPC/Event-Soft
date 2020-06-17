import { Category } from "./Category";

export interface CategoryRepository {
    findByName(name:string):Promise<Category>
    findByNameAndPopulateEvents(name:string):Promise<Category>
    findAll():Promise<Category[]>

}