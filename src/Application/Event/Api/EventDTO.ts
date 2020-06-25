export interface ZoneDTO{
    quantity:number
    name:string,
    price:number,
    currency:string
}

export interface EventDTO {
    id:string,
    owner:string,
    name:string,
    image:string,
    categories:string[],
    start:string,
    end:string,
    address:string,
    zones:ZoneDTO[]
    referenceLocation:string
    status:string
}
