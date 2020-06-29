import { AuthUserRepository } from "../../../Domain/AuthUser/AuthUserRepository"
import { CategoryRepository } from "../../../Domain/Category/CategoryRepository"

export class SubscriptionService {
    private readonly userRepository:AuthUserRepository
    private readonly categoryRepository:CategoryRepository

    constructor(userRepository:AuthUserRepository, categoryRepository:CategoryRepository){
        this.userRepository = userRepository
        this.categoryRepository = categoryRepository 
    }

    async createSubscriptions(category:string,username:string){
        const owner = await this.userRepository.findById(username)
        const _category = await this.categoryRepository.findByName(category)
        owner.addSubscription(_category.name)
        await this.userRepository.update(owner)
    }
} 