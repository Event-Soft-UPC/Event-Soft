import { Category } from "../Category/Category"
import { Ticket } from "../Ticket/Ticket"
import { DateRange } from "../Shared/DateRange"
import { Identifier } from "../Shared/Identifier"
import { EventCategoryException } from "../Shared/DomainError"

export class Event {
    readonly id:Identifier
    readonly name:string
    readonly image:string
    private categories:Array<Category> = []
    readonly duration:DateRange
    readonly address:string
    readonly referenceLocation:string
    private tickets:Array<Ticket> = []

    constructor(id:Identifier,name:string,image:string,tickets:Array<Ticket>,category:Category,duration:DateRange,address:string,referenceLocation:string){
        this.id = id
        this.name = name
        this.image = image
        this.categories.push(category)
        this.duration = duration
        this.address = address
        this.referenceLocation = referenceLocation
        this.tickets = tickets 
    }


    isEquals(event:Event){
        return event.id.isEquals(this.id)
    }

    addCategory(category:Category){
        this.categories.push(category)
    }      

    getNroAvailableTickets(){
        return this.tickets.length
    }

}