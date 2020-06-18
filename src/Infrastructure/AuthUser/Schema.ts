import { Role } from "../../Domain/AuthUser/AuthUser";

export interface AuthUserSchema{
    username:string
    firstName:string
    lastName:string
    email:string
    password:string 
    refreshToken:string
    roles:Role[]
}