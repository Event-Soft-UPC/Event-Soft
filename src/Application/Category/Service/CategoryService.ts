import { CategoryRepository } from "../../../Domain/Category/CategoryRepository";
import { DuplicateCategoryException } from "../../../Domain/Shared/DomainError";
import { Category } from "../../../Domain/Category/Category";

export class CategoryService {
    private readonly categoryRepository:CategoryRepository

    constructor(categoryRepository:CategoryRepository){
        this.categoryRepository = categoryRepository
    }


    async getByNameWithEvents(categoryName:string){
        return await this.categoryRepository.findByNameAndPopulateEvents(categoryName)
    }

    async getByName(categoryName:string){
        return await this.categoryRepository.findByName(categoryName)
    }

    async getAll(){
        return await this.categoryRepository.findAll();
    }

    async create(name:string,description:string,image:string){
        const category =  await this.categoryRepository.findByNameOrNull(name)
        if (category !== null)
            throw new DuplicateCategoryException()
        const _category = new Category(name,description,image)
        await this.categoryRepository.save(_category)
        return _category
    }
    
}