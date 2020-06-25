import { Router, Request, Response } from "express"
import { PaymentService } from "../Services/PaymentService"
import { Auth } from "../../Security/SecurityManager"
import { eventRepository, userRepository } from "../../../ioc/container"
import { PaymentDTO } from "./PaymentDTO"
import { CREATED } from "http-status-codes"
import { handlerExceptions } from "../../Handler/AuthHandler"
import { PaymentValidator } from "./PaymentValidator"

const router = Router()
const paymentService = new PaymentService(userRepository,eventRepository)

router.post("/",Auth("Shopper"),async(req: Request, res: Response)=>{
    try {
        const payment = req.body as PaymentDTO
        const validator = new PaymentValidator(payment)
        validator.validate()
        const paymentCreated = await paymentService.createPayment(payment.username,payment.event,payment.zone,payment.quantity)
        res.status(CREATED).send(paymentCreated)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})
export default router