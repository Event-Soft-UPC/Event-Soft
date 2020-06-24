import jwt, { verify } from "jsonwebtoken"
import { AuthUser, Role } from "../AuthUser/AuthUser"


export interface Claims {
    username: string
    rol:Role[]
}

export interface ClaimsRT {
    username: string
} 

export function getClaimsFromToken(token: string) {
    return jwt.decode(token) as Claims
}

export function getClaimsFromRefreshToken(refreshToken: string) {
    return jwt.decode(refreshToken) as ClaimsRT
}


export const generateRefreshToken = function (username:string) {
    return  jwt.sign(<ClaimsRT>{username}, process.env.R_JWT_KEY!, {
        expiresIn: process.env.REFRESH_JWT_EXPIRES!,
    })
}

export const generateStandarToken = function(auth:AuthUser){
    return jwt.sign(<Claims>{rol:auth.roles,username:auth.username}, process.env.JWT_KEY!, {
        expiresIn: process.env.JWT_EXPIRES!,
    })
}

export const verifyRefreshToken = function(refreshToken:string){
    try{
        verify(refreshToken,process.env.R_JWT_KEY!)
    } catch(err){
        throw new InvalidRefreshTokenException()
    }
    
}

export const verifyStandarToken = function(refreshToken?:string){
    if (refreshToken === undefined) throw new InvalidTokenException()
    try{
        verify(refreshToken,process.env.JWT_KEY!)
    } catch(err){
        throw new InvalidTokenException()
    }
    
}

export class SecurityException extends Error {
    constructor(message:string) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class InvalidTokenException extends SecurityException {
    constructor() {
        super("Invalid Token")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class InvalidRefreshTokenException extends SecurityException {
    constructor() {
        super("Invalid Refresh Token")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class UnAuthorizedTokenException extends SecurityException {
    constructor() {
        super("Unauthorized user for this action")
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

