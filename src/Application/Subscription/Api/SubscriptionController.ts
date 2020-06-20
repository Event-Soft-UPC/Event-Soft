import { Router, Request, Response } from "express"
import { SubscriptionService } from "../Services/SubscriptionService"
import { categoryRepository, userRepository } from "../../../ioc/container"
import { Auth } from "../../Security/AuthMiddleware"
import { SubscriptionDTO } from "./HttpRequest"
import { CREATED } from "http-status-codes"
import { handlerExceptions } from "../../Handler/AuthHandler"

const router = Router()
const subscriptionService = new SubscriptionService(userRepository,categoryRepository)

router.post("/",Auth("Shopper"),async(req: Request, res: Response)=>{
    try {
        const subscription = req.body as SubscriptionDTO
        await subscriptionService.createSubscriptions(subscription.category,subscription.username)
        res.status(CREATED).send(`Subscribe to ${subscription.category} category`)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})
export default router