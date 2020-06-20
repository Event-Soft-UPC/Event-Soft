import { FullName } from "./ValueObject/FullName"
import { compare } from "bcryptjs"
import { Event } from "../Event/Event"
import { Payment } from "./ValueObject/Payment"


export type Role  = "Publisher" | "Shopper"


export class AuthUser {
    readonly username:string
    readonly name:FullName
    readonly email:string
    readonly password:string
    refreshToken:string
    private _events:Event[] = []
    private _subscriptions:string[] = []
    private payments:Payment[] = []
    roles:Role[] = []    
    
    constructor(username:string,name:FullName,roles:Role[],email:string,password:string,refreshToken:string,payments:Payment[],suscriptions:string[]){
        this.refreshToken = refreshToken
        this._subscriptions = suscriptions
        this.payments = payments
        this.username = username
        this.name = name
        this.email = email
        this.refreshToken = refreshToken
        this.password = password
        this.roles = roles
    }

    async comparePassword(password:string){
        return await compare(password, this.password)
    }

    getPayments(){
        return this.payments
    }

    get events(){return this._events}

    get subscriptions(){return this._subscriptions}

    public static createAuthUser(username:string,name:FullName,roles:Role[],email:string,password:string,refreshToken:string){
        return new AuthUser(username,name,roles,email,password,refreshToken,[],[]);
    }

    setEvents(events:Event[]){
        this._events = events
        return this
    }


    setSusbcriptions(categories:string[]){
        this._subscriptions = categories
        return this
    }

    addPublisherProfile(){
        if (!this.roles.includes("Publisher"))
            this.roles.push("Publisher")
    }

    addPayments(payment:Payment){
        this.payments.push(payment)
    }

    addSubscription(category:string){
        this._subscriptions.push(category)
    }

}