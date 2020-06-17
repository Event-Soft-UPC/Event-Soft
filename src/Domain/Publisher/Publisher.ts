import { Event } from "../Event/Event"
import { Identifier } from "../Shared/Identifier"

export  class Publisher  {
    readonly id:Identifier 
    eventos: Event[]
    constructor(id:Identifier){
        this.id = id
        this.eventos = []
    }
    
    setEventos(eventos:Event[]){
        this.eventos = eventos
        return this
    }
}

