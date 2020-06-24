import { AuthUser } from "../../Domain/AuthUser/AuthUser";
import { AuthUserSchema } from "../../Infrastructure/AuthUser/Schema";
import { FullName } from "../../Domain/AuthUser/ValueObject/FullName";
import {schemaToDomain as STDEvent} from "./EventMapper"

export function schemaToDomain(schema:AuthUserSchema){
    const user = new AuthUser(schema.username,new FullName(schema.firstName,schema.lastName),schema.roles,schema.email,schema.password,schema.refreshToken,schema.payments,schema.subscriptions)
    if (!!schema.events)
        user.setEvents(schema.events.map(v => STDEvent(v)))
    return user
}

export function domainToSchema(entity:AuthUser){
    const schema:AuthUserSchema = {
        email:entity.email,
        firstName:entity.name.firstName,
        lastName:entity.name.lastName,
        password:entity.password,
        refreshToken:entity.refreshToken,
        username:entity.username,
        payments:entity.getPayments(),
        subscriptions: entity.subscriptions,
        roles:entity.roles,
        events:[]
    }
    

    return schema 
}