import { ZoneDTO } from "./HttpRequest";
import { Event } from "../../../Domain/Event/Event";
import {  format } from 'date-fns'

export const DATE_FORMAT = "dd-MM-yyyy"

export interface EventResponseDTO{
    name:string,
    image:string,
    categories:string[],
    start:string,
    end:string,
    address:string,
    zones:ZoneDTO[]
    status:string,
    referenceLocation:string
}

export function eventToDTO(event:Event):EventResponseDTO{
    return {
        address:event.address,
        image:event.image,
        categories:event.categories,
        start:format(event.duration.start,DATE_FORMAT),
        end:format(event.duration.end,DATE_FORMAT),
        name:event.name,
        referenceLocation:event.referenceLocation,
        zones:event.getZones().map(v => <ZoneDTO>{currency:v.price.currency,name:v.name,quantity:v.count,price:v.price.cost}),
        status: event.getStatus()
    }
}