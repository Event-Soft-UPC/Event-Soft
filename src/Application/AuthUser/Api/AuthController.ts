import { Router, Response, Request } from "express";
import { AuthUserService, AuthServiceValidator } from "../Service/AuthUserService";
import { userRepository } from "../../../ioc/container";
import { LoginRequest, RegisterRequest, UpgradeProfileRequest, UpdateTokenRequest} from "./HttpRequest";
import { LoginValidator, RegisterValidator, UpgradeProfileValidator, UpdateTokenValidator } from "./AuthValidator";
import {  OK, CREATED } from "http-status-codes";
import { AuthResponse } from "./HttpResponse";
import { handlerExceptions } from "../../Handler/AuthHandler";

const router = Router()
const userService = new AuthUserService(userRepository, new AuthServiceValidator(userRepository))

router.post("/login",async (req: Request, res: Response ) => {
    try {
        const user = req.body as LoginRequest
        const validator = new LoginValidator(user)

        validator.validate() 
        
       const result:AuthResponse =  await userService.login(user.username,user.password)
       res.status(OK).send(result)

    } catch (error) {
       const {status, body}  = handlerExceptions(error)
       res.status(status).send(body)
    }
    
})

 router.post("/shopper", async (req:Request, res:Response) => {
    try {
        const user = req.body as RegisterRequest
        const validator = new RegisterValidator(user)

        validator.validate() 
        
       const result:AuthResponse =  await userService.register(user.email,user.password,user.username,user.firstname,user.lastname)
       res.status(CREATED).send(result)

    } catch (error) {
       const {status, body}  = handlerExceptions(error)
       res.status(status).send(body)
    }
 })
 router.post("/publisher",async (req:Request, res:Response) => {
   try {
       const user = req.body as RegisterRequest
       const validator = new RegisterValidator(user)

       validator.validate() 
       
      const result:AuthResponse =  await userService.registerAsPublisher(user.email,user.password,user.username,user.firstname,user.lastname)
      res.status(CREATED).send(result)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

router.put("/profile",async (req:Request, res:Response) => {
   try {
       const user = req.body as UpgradeProfileRequest
       const validator = new UpgradeProfileValidator(user)

       validator.validate() 
       
      await userService.addPublisherProfile(user.username)
      res.status(OK).send({message:"Upgrade Profile to Publisher"})

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

router.post("/token",async (req:Request, res:Response) => {
   try {
       const security = req.body as UpdateTokenRequest
       const validator = new UpdateTokenValidator(security)

       validator.validate() 
       
      const result = await userService.updateToken(security.refreshToken)
      res.status(OK).send(result)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})


export default router


/*
router.put("/profile")

router.post("/token") */