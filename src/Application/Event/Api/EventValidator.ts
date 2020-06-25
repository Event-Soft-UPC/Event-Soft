import { EventDTO, ZoneDTO } from "./EventDTO"
import { InputException } from "../../Exception/InputException"
import { BaseValidator, validateMainImages, validateRequired, validateCategoryName, validateArrayLength, validatePositiveNumber, validateMinLength, MIN_ZONE_LENGTH, validateDate, MIN_EVENT_LENGTH } from "../../Shared/BaseValidator"
import { validateUsername } from "../../Auth/Api/AuthValidator"

export class EventValidator extends BaseValidator {
    readonly event: EventDTO

    constructor(event: EventDTO) {
        super()
        this.event = event
    }

    validate() {
        this.errors.push(...validateUsername(this.event.owner))
        this.errors.push(...validateMinLength("event",this.event.name,MIN_EVENT_LENGTH))
        this.errors.push(...validateMainImages([this.event.image]))
        this.errors.push(...validateCategories(this.event.categories))
        this.errors.push(...validateStart(this.event.start))
        this.errors.push(...validateEnd(this.event.end))
        this.errors.push(...validateZones(this.event.zones))
        this.errors.push(...validateReferenceLocation(this.event.referenceLocation))
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }
}

function validateCategories(categories?:string[]){
    const errors = validateRequired("categories",categories)
    if (errors.length === 0 || categories!.some(v =>validateCategoryName(v).length > 0))
    {
        errors.push({property:"categories",error:"Some category name is invalid"}) 
    }
    return errors  
}

function validateZones(zones?:ZoneDTO[]){
    const errors = validateRequired("zones",zones)
    errors.push(...validateArrayLength("zones",1,zones))
    return errors
}

export function validateZone(zone:ZoneDTO){
    const errors = validatePositiveNumber("quantity",zone.quantity)
    errors.push(...validatePositiveNumber("price",zone.price))
    errors.push(...validateRequired("currency",zone.currency))
    errors.push(...validateMinLength("zone",zone.name,MIN_ZONE_LENGTH))
    return errors    
}

function validateStart(start?:string){
   const errors = validateRequired("start",start)
   if (errors.length === 0)
        errors.push(...validateDate("start",start!))
   return errors
}

function validateEnd(end?:string){
    const errors = validateRequired("end",end)
    if (errors.length === 0)
         errors.push(...validateDate("end",end!))
    return errors
}


function validateReferenceLocation(referenceLocation?:string){
    return validateRequired("reference Location",referenceLocation)
}
