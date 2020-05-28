import { Container } from "inversify"
import PublisherRepository from "../Data/Repository/PublisherRepository"
import {MongoosePublisherRepository} from "../Data/Repository/impl/MongooseRepository"
import PublisherService from "../Application/Services/PublisherService"
import PublisherServiceImp from "../Application/Services/imp/PublisherServiceImp"


export const TYPES = {
    PublisherRepository: Symbol.for("PublisherRepository"),
    PublisherService: Symbol.for("PublisherService"),
}

const container = new Container()
container.bind<PublisherRepository>(TYPES.PublisherRepository).to(MongoosePublisherRepository)
container.bind<PublisherService>(TYPES.PublisherService).to(PublisherServiceImp)
export default container
