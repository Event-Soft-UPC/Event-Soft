import { EventSchema } from "../../Infrastructure/Event/Schema"
import { Event } from "../../Domain/Event/Event"
import { DateRange } from "../../Domain/Shared/DateRange"
import { Zone } from "../../Domain/Event/Zone"
import { EventDTO, ZoneDTO } from "../../Application/Event/Api/EventDTO"
import { format } from "date-fns"
export const DATE_FORMAT = "dd-MM-yyyy"

export function schemaToDomain(schema:EventSchema){
    return new Event(schema.eventId,schema.userId,schema.name,schema.image,schema.categoriesId,new DateRange(schema.start,schema.end),schema.address,schema.referenceLocation,schema.zones.map(v => new Zone(v.name,v.price,v.count)))
}

export function domainToSchema(entity:Event){
    return  <EventSchema> {
        address: entity.address,
        categoriesId: entity.categories,
        start:entity.duration.start,
        end:entity.duration.end,
        eventId:entity.id,
        userId:entity.ownerId,
        image:entity.image,
        name:entity.name,
        referenceLocation:entity.referenceLocation,
        zones:entity.getZones() 
    }
}

export function domainToDTO(event:Event):EventDTO{
    return {
        id:event.id,
        address:event.address,
        image:event.image,
        categories:event.categories,
        start:format(event.duration.start,DATE_FORMAT),
        end:format(event.duration.end,DATE_FORMAT),
        name:event.name,
        referenceLocation:event.referenceLocation,
        zones:event.getZones().map(v => <ZoneDTO>{currency:v.price.currency,name:v.name,quantity:v.count,price:v.price.cost}),
        status: event.getStatus(),
        owner:event.ownerId
    }
}