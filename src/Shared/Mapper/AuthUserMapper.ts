import { AuthUser } from "../../Domain/AuthUser/AuthUser";
import { AuthUserSchema } from "../../Infrastructure/AuthUser/Schema";
import { FullName } from "../../Domain/AuthUser/FullName";

export function schemaToDomain(schema:AuthUserSchema){
    return new AuthUser(schema.username,new FullName(schema.firstName,schema.lastName),schema.email,schema.password,schema.refreshToken)
}

export function domainToSchema(entity:AuthUser){
    return  <AuthUserSchema> {
        email:entity.email,
        firstName:entity.name.firstName,
        lastName:entity.name.lastName,
        password:entity.password,
        refreshToken:entity.refreshToken,
        username:entity.username,
        roles:entity.roles
    }
}