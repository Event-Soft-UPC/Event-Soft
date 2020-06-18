import { Money } from "./Money"
import { Event } from "../Event/Event"
import { BuyTicketException } from "../Shared/DomainError"
import { Identifier } from "../Shared/Identifier"

export class Ticket {
    readonly zone:string
    readonly seat:string
    shopperId?:string
    readonly eventId:Identifier
    readonly price:Money

    constructor (eventId:Identifier,zone:string,seat:string,price:Money){
        this.eventId = eventId
        this.zone = zone
        this.seat = seat
        this.price = price
    }

    sell(shopperId:string){
        if (!!this.shopperId)
            throw new BuyTicketException()
        this.shopperId = shopperId
        return this
    }

    isAvailable(){
        return !!this.shopperId 
    }

    public static createTicketsByZone(zone:string,quantity:number,price:Money,event:Event){
        const tickets:Ticket[] = []
        for (let index = 0; index < quantity; index++) {
            const seat = `${event.name[0].toUpperCase()}${zone[0].toUpperCase()}${index+1}`
            tickets.push(new Ticket(event.id,zone,seat,price))
            
        }
        return tickets
    }    
} 