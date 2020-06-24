import { EventDTO, ZoneDTO } from "./HttpRequest"
import { FieldError } from "../../Auth/Api/AuthValidator"
import { InputException } from "../../Exception/InputException"

export class EventValidator {
    readonly event: EventDTO
    private errors: FieldError[] = []

    constructor(event: EventDTO) {
        this.event = event
    }

    validate() {
        validateOwnerId(this.errors,this.event.username)
        validateImage(this.errors,this.event.image)
        validateCategories(this.errors,this.event.categories)
        validateStart(this.errors,this.event.start)
        validateEnd(this.errors,this.event.end)
        validateZones(this.errors,this.event.zones)
        validateReferenceLocation(this.errors,this.event.referenceLocation)
        if (this.errors.length > 0)
            throw new InputException(this.errors)
    }


}

function validateOwnerId(errors:FieldError[],ownerId?: string) {
    if (ownerId === undefined)
        errors.push({ property: "ownerId", error: "ownerId is required" })
}

function validateImage(errors:FieldError[],image?:string){
    if(image === undefined)
        errors.push({property:"image", error:"image is required"})
}

function validateCategories(errors:FieldError[],categories?:string[]){
    if (categories === undefined)
        errors.push({property:"categories",error:"categories is required"})
    else{
        if (categories.length <= 0)
            errors.push({property:"categories",error:"categories must contains at least one"})
    }
}

function validateStart(errors:FieldError[],start?:string){
    if (start === undefined)
        errors.push({property:"start",error:"start is required"})
    }

function validateEnd(errors:FieldError[],end?:string){
        if (end === undefined)
            errors.push({property:"end",error:"end is required"})
    }
function validateZones(errors:FieldError[],zones?:ZoneDTO[]){
    if (zones === undefined)
            errors.push({property:"zones",error:"zones is required"})
    else{
        if (zones.length <= 0)
            errors.push({property:"zones",error:"zones must contains at least one"})
    }
}

function validateReferenceLocation(errors:FieldError[],referenceLocation?:string){
    if (referenceLocation === undefined)
            errors.push({property:"referenceLocation",error:"referenceLocation is required"})
}
