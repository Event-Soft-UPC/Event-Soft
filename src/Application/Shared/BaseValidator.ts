import { isValid } from "date-fns"

export const MAX_USER_LENGTH = 10
export const MIN_PASSWORD_LENGTH = 6
export const MIN_USER_LENGTH = 6
export const MIN_ZONE_LENGTH = 3
export const MIN_EVENT_LENGTH = 8
export const MIN_CATEGORY_LENGTH = 6
export const MIN_MAIN_IMAGES = 1
export const MIN_REFERENCES_IMAGES = 4

export abstract class BaseValidator {
    protected readonly errors:FieldError[] 
    constructor(){
        this.errors= []
    }

    abstract validate():void
}


export interface FieldError{
    property:string,
    error:string
}

export function validateRequired(field:string,value?:any){
    const errors:FieldError[] = []
    if(value === undefined || value === null)
        errors.push({property:field,error:`${field} is required`})
    return errors
}

export function validateRangeLength(field:string,value:string,lower:number,upper:number){
    const errors:FieldError[] = []
    if (value.length < lower ||value.length > upper)
        errors.push({property:field,error:`${field} must be between ${lower} and ${upper}`})
    return errors
}


export function validateMinLength(field:string,value:string, threshold:number){
    const errors:FieldError[] = []
    if (value === undefined || value.length < threshold)
        errors.push({property:field,error:`${field} must contains minimun ${threshold} characters`})
    return errors
}

export function validateMaxLength(field:string,value:string,threshold:number){
    const errors:FieldError[] = []
    if (value === undefined ||  value.length > threshold)
        errors.push({property:field,error:`${field} must contains maximun ${threshold} characters`})
    return errors
}

export function validatePositiveNumber(field:string,value:number)
{
    const errors:FieldError[] = []
    if ( value === undefined || value <= 0)
        errors.push({property:field,error:`${field} must be positive`}) 
    return errors
}

export function validateArrayLength(property:string,minLength:number,value?:any[]){
    const errors:FieldError[] = []
    if ( value === undefined ||  value.length < minLength)
        errors.push({property,error:`${property} must contains ${minLength} length`})
    return errors
}

export function validateCategoryName(value?:string){
    const errors:FieldError[] =  validateRequired("category",value)
    if (errors.length === 0 )
        validateMinLength("category",value!,MIN_CATEGORY_LENGTH)
    return errors 
}

export function validateMainImages(value?:string[]){
    return validateArrayLength("images",MIN_MAIN_IMAGES,value)
    
}

export function validateDate(field:string,value:string){
    const errors:FieldError[] = []
    if (!isValid(value))
        errors.push({property:field,error:`${field} must be date`})
    return errors
}