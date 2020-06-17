import Shopper from "../Shopper/Shopper"
import { Money } from "./Money"
import { Event } from "../Event/Event"
import { BuyTicketException } from "../Shared/DomainError"

export class Ticket {
    readonly zone:string
    readonly seat:string
    shopper?:Shopper
    readonly event:Event
    readonly price:Money

    constructor (event:Event,zone:string,seat:string,price:Money){
        this.event = event
        this.zone = zone
        this.seat = seat
        this.price = price
    }

    sell(shopper:Shopper){
        if (!!this.shopper)
            throw new BuyTicketException()
        this.shopper = shopper
        return this
    }

    isAvailable(){
        return !!this.shopper 
    }

    public static createTicketsByZone(zone:string,quantity:number,price:Money,event:Event){
        const tickets:Ticket[] = []
        for (let index = 0; index < quantity; index++) {
            const seat = `${event.name[0].toUpperCase()}${zone[0].toUpperCase()}${index+1}`
            tickets.push(new Ticket(event,zone,seat,price))
            
        }
        return tickets
    }    
} 