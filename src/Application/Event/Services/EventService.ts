import { EventRepository } from "../../../Domain/Event/EventRepository";
import { Identifier } from "../../../Domain/Shared/Identifier";
import { Event } from "../../../Domain/Event/Event";
import { Query } from "../../../Shared/QueryBuilder";
import { DateRange } from "../../../Domain/Shared/DateRange";
import { Money } from "../../../Domain/AuthUser/ValueObject/Money";
import { Zone } from "../../../Domain/Event/Zone";
import { EventDTO } from "../Api/HttpRequest";
import { eventToDTO, DATE_FORMAT } from "../Api/HttpResponse";
import {  parse } from 'date-fns'

export class EventService {
    private readonly eventRepository:EventRepository

    constructor(eventRepository:EventRepository){
        this.eventRepository = eventRepository
    }

    async getEventById(id:string){
        return eventToDTO(await this.eventRepository.findById(id))
    }

    async getAllEvents(){
        return (await this.eventRepository.findAll()).map(v => eventToDTO(v))
    }

    async getEventByUserId(userId:string){
        const query:Query<Event> = {
            where:[{property:"ownerId",eq:userId}]
        }
        return (await this.eventRepository.findAll(query)).map(v => eventToDTO(v))
    }

    async createEvent(dto:EventDTO){
        const event = new Event(new Identifier().id,dto.username,dto.name,dto.image,dto.categories,new DateRange(parse(dto.start,DATE_FORMAT,new Date()), parse(dto.end,DATE_FORMAT,new Date())),dto.address,dto. referenceLocation,dto.zones.map((v)=>new Zone(v.name,new Money(v.price,v.currency),v.quantity)))
        await this.eventRepository.save(event)
        return event
    }

}