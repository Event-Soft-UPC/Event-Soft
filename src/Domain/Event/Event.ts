import { Ticket } from "../Ticket/Ticket"
import { DateRange } from "../Shared/DateRange"
import { Identifier } from "../Shared/Identifier"
import { AuthUser } from "../AuthUser/AuthUser"
import { OnlyPublishersException } from "../Shared/DomainError"

export class Event {
    readonly id:Identifier
    readonly ownerId:string
    readonly name:string
    readonly image:string
    readonly categories:Array<string> = []
    readonly duration:DateRange
    readonly address:string
    readonly referenceLocation:string
    private _tickets:Array<Ticket> = []

    constructor(id:Identifier,owner:string,name:string,image:string,category:string,duration:DateRange,address:string,referenceLocation:string){
        this.id = id
        this.name = name
        this.image = image
        this.categories.push(category)
        this.duration = duration
        this.address = address
        this.referenceLocation = referenceLocation 
        this.ownerId = owner
    }

    setTickets(tickets:Ticket[]){
        this._tickets = tickets
        return this
    }

    get tickets(){return this._tickets}

    isEquals(event:Event){
        return event.id.isEquals(this.id)
    }

    addCategory(categoryName:string){
        this.categories.push(categoryName)
        return this
    }      
    public static createEvent(id:Identifier,user:AuthUser,owner:AuthUser,name:string,image:string,category:string,duration:DateRange,address:string,referenceLocation:string){
        if (!user.roles.includes("Publisher"))
            throw new OnlyPublishersException();
        return new Event(id,owner.username,name,image,category,duration,address,referenceLocation);
    }
}