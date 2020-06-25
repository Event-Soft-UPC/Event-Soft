import { Router, Response, Request } from "express";
import { AuthUserService, AuthServiceValidator } from "../Service/AuthUserService";
import { userRepository } from "../../../ioc/container";
import { LoginDTO, RegisterDTO, UpgradeProfileDTO, UpdateTokenDTO, SecurityDTO} from "./AuthDTO";
import { LoginValidator, RegisterValidator, UpgradeProfileValidator, UpdateTokenValidator } from "./AuthValidator";
import {  OK, CREATED } from "http-status-codes";

import { handlerExceptions } from "../../Handler/AuthHandler";
import { Auth } from "../../Security/SecurityManager";

const router = Router()
const userService = new AuthUserService(userRepository, new AuthServiceValidator(userRepository))

router.post("/login",async (req: Request, res: Response ) => {
    try {
        const user = req.body as LoginDTO
        const validator = new LoginValidator(user)
        validator.validate() 
        
       const result:SecurityDTO =  await userService.login(user.username,user.password)
       res.status(OK).send(result)

    } catch (error) {
       const {status, body}  = handlerExceptions(error)
       res.status(status).send(body)
    }
    
})

 router.post("/shoppers", async (req:Request, res:Response) => {
    try {
        const user = req.body as RegisterDTO
        const validator = new RegisterValidator(user)
        
        validator.validate() 
        
       const result:SecurityDTO =  await userService.register(user.email,user.password,user.username,user.firstname,user.lastname)
       res.status(CREATED).send(result)

    } catch (error) {
       const {status, body}  = handlerExceptions(error)
       res.status(status).send(body)
    }
 })

 router.get("/shoppers/me",Auth("Shopper"), async (req:Request, res:Response) => {
   try {
      const user = await userService.getUserById(req.body.username)  
      res.status(CREATED).send(user)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

 router.post("/publishers",async (req:Request, res:Response) => {
   try {
       const user = req.body as RegisterDTO
       
       const validator = new RegisterValidator(user)

       validator.validate() 
       
      const result:SecurityDTO =  await userService.registerAsPublisher(user.email,user.password,user.username,user.firstname,user.lastname)
      res.status(OK).send(result)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }  
})

router.get("/publishers/me",Auth("Publisher"),async (req:Request, res:Response) => {
   try {
      const user = await userService.getUserById(req.body.username)  
      res.status(CREATED).send(user)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

router.get("/publishers/me/events",Auth("Publisher"),async (req:Request, res:Response) => {
   try {
      const user = await userService.getPublisherWithEvents(req.body.username)  
      res.status(OK).send(user)

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

router.put("/profile",Auth("Shopper"),async (req:Request, res:Response) => {
   try {
       const user = req.body as UpgradeProfileDTO
       const validator = new UpgradeProfileValidator(user)

       validator.validate() 
       
      await userService.addPublisherProfile(user.username)
      res.status(OK).send({message:"Upgraded Profile to Publisher"})

   } catch (error) {
      const {status, body}  = handlerExceptions(error)
      res.status(status).send(body)
   }
})

router.post("/token",async (req:Request, res:Response) => {
   try {
       const security = req.body as UpdateTokenDTO
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
