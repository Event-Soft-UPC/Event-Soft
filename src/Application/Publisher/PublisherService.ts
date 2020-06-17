import PublisherRepository from "../../Domain/Publisher/PublisherRepository";
import { Identifier } from "../../Domain/Shared/Identifier";

export class PublisherService {
    private readonly publisherRepository:PublisherRepository

    constructor(publisherRepository:PublisherRepository){
        this.publisherRepository = publisherRepository
    }
    

    async getAllPublisher(){
        return await this.publisherRepository.findAll()
    }

    async getPublisherWithEvents(publisherId:Identifier){
       return  await this.publisherRepository.findByIdAndPopulateEvents(publisherId)
    }

}