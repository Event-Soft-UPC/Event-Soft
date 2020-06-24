import { Container } from "inversify"
import "reflect-metadata"
import { AuthUserRepository } from "../Domain/AuthUser/AuthUserRepository"
 import { CategoryRepository } from "../Domain/Category/CategoryRepository"
import { EventRepository } from "../Domain/Event/EventRepository"
import { MongooseAuthRepository } from "../Infrastructure/AuthUser/MongooseAuthRepository"
import { MongooseEventRepository } from "../Infrastructure/Event/MongooseEventRepository"
import { MongooseCategoryRepository } from "../Infrastructure/Category/MongooseCategoryRepository"



export const TYPES = {
    AuthUserRepository: Symbol.for("AuthUserRepository"),
    EventRepository:Symbol.for("EventRepository"),
    CategoryRepository:Symbol.for("CategoryRepository")
}

const container = new Container()
container.bind<AuthUserRepository>(TYPES.AuthUserRepository).to(MongooseAuthRepository)
container.bind<CategoryRepository>(TYPES.CategoryRepository).to(MongooseCategoryRepository)
container.bind<EventRepository>(TYPES.EventRepository).to(MongooseEventRepository)
export const categoryRepository = container.get<CategoryRepository>(TYPES.CategoryRepository)
export const eventRepository = container.get<EventRepository>(TYPES.EventRepository)
export const userRepository = container.get<AuthUserRepository>(TYPES.AuthUserRepository)
export default container
