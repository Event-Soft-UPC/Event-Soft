export interface ZoneDTO{
    quantity:number
    name:string,
    price:number,
    currency:string
}

export interface EventDTO {
    username:string,
    name:string,
    image:string,
    categories:string[],
    start:string,
    end:string,
    address:string,
    zones:ZoneDTO[]
    referenceLocation:string
}
