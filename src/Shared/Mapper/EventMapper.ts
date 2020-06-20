import { EventSchema } from "../../Infrastructure/Event/Schema"
import { Event } from "../../Domain/Event/Event"
import { DateRange } from "../../Domain/Shared/DateRange"
import { Zone } from "../../Domain/Event/Zone"
 

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