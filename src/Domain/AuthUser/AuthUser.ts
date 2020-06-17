import { FullName } from "./FullName"
import { Identifier } from "../Shared/Identifier"
import { compare } from "bcryptjs"
import { Publisher } from "../Publisher/Publisher"
import Shopper from "../Shopper/Shopper"
import { verifyRefreshToken } from "../Shared/TokenManager"



export class AuthUser {
    readonly username:Identifier
    readonly name:FullName
    readonly email:string
    readonly password:string
    readonly refreshToken:string
    publisherProfile?:Publisher
    shopperProfile?:Shopper  

    constructor(username:Identifier,name:FullName,email:string,password:string,refreshToken:string){
        verifyRefreshToken(refreshToken)
        this.username = username
        this.name = name
        this.email = email
        this.refreshToken = refreshToken
        this.password = password
    }

    async comparePassword(password:string){
        return await compare(password, this.password)
    }

    addPublihserProfile(publisher: Publisher){
        this.publisherProfile = publisher
    }

    addShopperProfile(shopper: Shopper){
        this.shopperProfile = shopper
    }

}