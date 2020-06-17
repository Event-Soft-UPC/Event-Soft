import jwt, { verify } from "jsonwebtoken"
import { AuthUser } from "../AuthUser/AuthUser"

export type Roles = "Publisher" | "Shopper"

export interface Claims {
    username?: string
    rol:Roles
}


export function getClaimsFromToken(token: string): Claims {
    return jwt.decode(token!) as Claims
}


export const generateRefreshToken = function (user: AuthUser) {
    return  jwt.sign({username:user.username.id}, process.env.R_JWT_KEY!, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES!,
    })
}

export const generateShopperToken = function (user: AuthUser): string {
    const claims: Claims = {username: user.username.id, rol: "Shopper"}
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

export const generatePublisherToken = function(user: AuthUser){
    const claims: Claims = {username: user.username.id, rol: "Publisher"}
    return jwt.sign(claims, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

export const verifyRefreshToken = function(refreshToken:string){
    try{
        verify(refreshToken,process.env.JWT_KEY!)
    } catch(err){
        throw new Error("Refresh Token has expired")
    }
    
}
