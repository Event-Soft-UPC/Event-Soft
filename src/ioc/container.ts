import { Container } from "inversify"
import "reflect-metadata"
import { AuthUserRepository } from "../Domain/AuthUser/AuthUserRepository"
/* import { CategoryRepository } from "../Domain/Category/CategoryRepository"
import { EventRepository } from "../Domain/Event/EventRepository"
import { TicketRepository } from "../Domain/Ticket/TicketRepository" */
import { MongooseAuthRepository } from "../Infrastructure/AuthUser/MongooseAuthRepository"



export const TYPES = {
    AuthUserRepository: Symbol.for("AuthUserRepository"),
    EventRepository:Symbol.for("EventRepository"),
    TicketRepository:Symbol.for("TicketRepository"),
    CategoryRepository:Symbol.for("TicketRepository")
}

const container = new Container()
container.bind<AuthUserRepository>(TYPES.AuthUserRepository).to(MongooseAuthRepository)
export const userRepository = container.get<AuthUserRepository>(TYPES.AuthUserRepository)
export default container
