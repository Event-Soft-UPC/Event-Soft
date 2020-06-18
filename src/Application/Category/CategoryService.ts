import { CategoryRepository } from "../../Domain/Category/CategoryRepository";

export class CategoryService {
    private readonly categoryRepository:CategoryRepository

    constructor(categoryRepository:CategoryRepository){
        this.categoryRepository = categoryRepository
    }


    async getByNameWithEvents(categoryName:string){return await this.categoryRepository.findByNameAndPopulateEvents(categoryName)}

    async getByName(categoryName:string){
        return await this.categoryRepository.findByName(categoryName)
    }

    async getAll(){
        return await this.categoryRepository.findAll();
    }
    
}