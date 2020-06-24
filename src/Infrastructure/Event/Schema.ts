import { Zone } from "../../Domain/Event/Zone";

export interface EventSchema {
    eventId:string,
    userId:string,
    name:string,
    image:string,
    start:Date,
    end:Date,
    address:string,
    referenceLocation:string
    categoriesId:string[]
    zones:Zone[]
}