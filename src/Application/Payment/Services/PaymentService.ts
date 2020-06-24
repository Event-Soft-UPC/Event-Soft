import { AuthUserRepository } from "../../../Domain/AuthUser/AuthUserRepository";
import { EventRepository } from "../../../Domain/Event/EventRepository";
import { createPayment } from "../../../Domain/Services/PaymentService";

export class PaymentService {
    private readonly userRepository:AuthUserRepository
    private readonly eventRepository:EventRepository

    constructor(userRepository:AuthUserRepository, eventRepository:EventRepository){
        this.userRepository = userRepository
        this.eventRepository = eventRepository 
    }

    async createPayment(ownerId:string,eventId:string,zone:string,quantity:number){
        const owner = await this.userRepository.findById(ownerId)
        const event = await this.eventRepository.findById(eventId)
        const payment = createPayment(owner,event,zone,quantity)
        await this.userRepository.update(owner)
        await this.eventRepository.update(event)
        return payment
    }
} 