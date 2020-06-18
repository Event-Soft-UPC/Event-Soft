import { TicketSchema } from "../Ticket/Schema";
import { AuthUserSchema } from "../AuthUser/Schema";
import { CategorySchema } from "../Category/Schema";

export interface EventSchema {
    eventId:string,
    userId:string,
    name:string,
    image:string,
    start:Date,
    end:Date,
    address:string,
    referenceLocation:string
    user:AuthUserSchema
    categories:CategorySchema
    tickets:TicketSchema[]
}