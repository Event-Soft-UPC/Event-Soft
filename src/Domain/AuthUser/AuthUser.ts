import { FullName } from "./FullName"
import { compare } from "bcryptjs"
import { Event } from "../Event/Event"
import { Category } from "../Category/Category"
import { Ticket } from "../Ticket/Ticket"


export type Role  = "Publisher" | "Shopper"


export class AuthUser {
    readonly username:string
    readonly name:FullName
    readonly email:string
    readonly password:string
    refreshToken:string
    private _events:Event[] = []
    private _subscriptions:Category[] = []
    private _tickets:Ticket[] = []
    roles:Role[] = []    
    
    constructor(username:string,name:FullName,email:string,password:string,refreshToken:string){
        this.refreshToken = refreshToken
        this.username = username
        this.name = name
        this.email = email
        this.refreshToken = refreshToken
        this.password = password
        this.roles.push("Shopper")
    }

    async comparePassword(password:string){
        return await compare(password, this.password)
    }



    get events(){return this._events}

    get subscriptions(){return this._subscriptions}

    get tickets(){return this._tickets}

    setEvents(events:Event[]){
        this._events = events
        return this
    }

    setTickets(tickets:Ticket[]){
        this._tickets = tickets
        return this
    }

    setSusbcriptions(categories:Category[]){
        this._subscriptions = categories
        return this
    }

    addPublisherProfile(){
        this.roles.push("Publisher")
    }

}