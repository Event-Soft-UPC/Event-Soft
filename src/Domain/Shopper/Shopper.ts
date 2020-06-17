import { Ticket } from "../Ticket/Ticket"
import { Category } from "../Category/Category"
import { Identifier } from "../Shared/Identifier"



export default class Shopper{
    private tickets:Ticket[]
    private subscriptions:Category[]
    readonly id:Identifier

    constructor(id:Identifier){
        this.id = id
        this.tickets = []
        this.subscriptions = []
    }


    addTicket(ticket:Ticket){
        this.tickets.push(ticket)
    } 

    addSubscription(category:Category){
        this.subscriptions.push(category)
    }

}