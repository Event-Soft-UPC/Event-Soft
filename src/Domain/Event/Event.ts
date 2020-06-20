import { DateRange } from "../Shared/DateRange"
import { Zone } from "./Zone"

export type EventStatus = "Available" | "SoldOut"

export class Event {
    readonly id:string
    readonly ownerId:string
    readonly name:string
    readonly image:string
    readonly categories:Array<string> = []
    readonly duration:DateRange
    readonly address:string
    readonly referenceLocation:string
    private readonly zones:Zone[]

    constructor(id:string,owner:string,name:string,image:string,categories:string[],duration:DateRange,address:string,referenceLocation:string, zones:Zone[]){
        this.id = id
        this.name = name
        this.image = image
        this.categories = categories
        this.duration = duration
        this.address = address
        this.referenceLocation = referenceLocation 
        this.ownerId = owner
        this.zones = zones
    }

    isEquals(event:Event){
        return event.id === this.id
    }

    addCategory(categoryName:string){
        this.categories.push(categoryName)
        return this
    }

    getZones(){
        return this.zones
    }

    sellTicketsByZone(zoneName:string,quantity:number){
       const zone = this.zones.find((v)=>v.name === zoneName)
       zone?.sellTickets(quantity)
    }

    getStatus():EventStatus{
       return (this.zones.some(v => v.isAvailable)) ?  "Available"  : "SoldOut" 
    }
    
}