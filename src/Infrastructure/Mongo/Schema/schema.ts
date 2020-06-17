export interface UserSchema {
    username:string
    name: string
    dni: string
    email: string
    password: string
    refreshToken:string
}
export interface EventSchema {
    eventId:string
    name:string
    description:string
    image:string
    categoriasId:Array<string>
    fechaInicio:Date
    fechaFinal:Date
    direccion:string
    referencia:string
    entradas:Array<TicketSchema>
}
export interface ShopperSchema extends UserSchema {
    tickets:Array<TicketSchema>
    categories:Array<CategorySchema>
}

export interface TicketSchema {
    entradaId:string 
    zona:string
    codAsiento:string
    cost:string
    shopperId:string
} 

export interface CategorySchema {
    name:string
    description:string
    image:string
}
export interface PublisherSchema extends UserSchema {
    eventos:Array<EventSchema>
}