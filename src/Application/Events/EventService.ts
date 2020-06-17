import { EventRepository } from "../../Domain/Event/EventRepository";
import { Identifier } from "../../Domain/Shared/Identifier";

export class EventService {
    private readonly eventRepository:EventRepository

    constructor(eventRepository:EventRepository){
        this.eventRepository = eventRepository
    }

    async getEventById(id:Identifier){
        return await this.eventRepository.findById(id)
    }

    async getAllEvents(){
        return await this.eventRepository.findAll()
    }
}