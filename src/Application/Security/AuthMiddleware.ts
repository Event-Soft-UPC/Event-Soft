import { Role } from "../../Domain/AuthUser/AuthUser";
import { Request, NextFunction, Response } from "express";
import { getClaimsFromToken, verifyStandarToken, UnAuthorizedTokenException } from "../../Domain/Shared/TokenManager";
import { handlerExceptions } from "../Handler/AuthHandler";

export  function Auth(rol:Role){
    return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        try {
                verifyStandarToken(token)
                const payload = getClaimsFromToken(token!)
                if (payload.rol.includes(rol)){
                    req.body.username = payload.username
                    next()
                }
                else
                    throw new UnAuthorizedTokenException()
        } catch (error) {
           const {body,status} =  handlerExceptions(error)
           res.status(status).send(body)
        }
    }
}