import { Container } from "inversify"
import PublisherRepository from "../Domain/Publisher/PublisherRepository"
import {MongoosePublisherRepository} from "../Infrastructure/Mongo/impl/MongooseRepository"
import PublisherService from "../Domain/Services/PublisherService"
import PublisherServiceImp from "../Domain/Services/imp/PublisherServiceImp"

export const TYPES = {
    PublisherRepository: Symbol.for("PublisherRepository"),
    PublisherService: Symbol.for("PublisherService"),
}

const container = new Container()
container.bind<PublisherRepository>(TYPES.PublisherRepository).to(MongoosePublisherRepository)
container.bind<PublisherService>(TYPES.PublisherService).to(PublisherServiceImp)
export default container
