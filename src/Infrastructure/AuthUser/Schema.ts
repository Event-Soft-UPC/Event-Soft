import { Role } from "../../Domain/AuthUser/AuthUser";
import { Payment } from "../../Domain/AuthUser/ValueObject/Payment";
import { EventSchema } from "../Event/Schema";

export interface AuthUserSchema{
    username:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string ,
    refreshToken:string,
    roles:Role[],
    payments:Payment[],
    subscriptions:string[],
    events:EventSchema[]
}