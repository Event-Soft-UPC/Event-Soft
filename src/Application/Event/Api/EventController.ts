import { eventRepository } from "../../../ioc/container"
import { Router, Response, Request } from "express"
import { EventService } from "../Services/EventService"
import { upload } from "../../Middleware/photosManager"
import { Auth } from "../../Security/AuthMiddleware"
import { EventDTO, ZoneDTO } from "./HttpRequest"
import { ImageException } from "../../Exception/InputException"
import { EventValidator } from "./EventValidator"
import { CREATED, OK } from "http-status-codes"
import { handlerExceptions } from "../../Handler/AuthHandler"

const router = Router()
const eventService = new EventService(eventRepository)

router.post("/",[upload,Auth("Publisher")],async (req: Request, res: Response)=>{
    try {
        const event = req.body as EventDTO
        event.zones = req.body.zones.map((v:any) => JSON.parse(v) as ZoneDTO)    
        if (req.files === undefined) throw new ImageException()        
        const photo = req.files as {
            [fieldname: string]: Express.Multer.File[]
        }
        event.image = photo.main[0].filename
        const result = new EventValidator(event)
        result.validate()
        const _event = await eventService.createEvent(event)
        res.status(CREATED).send(_event)
    } catch (error) {
        console.log(error)
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

router.get("/:id",async (req: Request, res: Response)=>{
    try {
        const event = await eventService.getEventById(req.params.id)
        res.status(OK).send(event)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

router.get("/",async (req: Request, res: Response)=>{
    try {
        const event = await eventService.getAllEvents()
        res.status(OK).send(event)
    } catch (error) {
        const {status,body} = handlerExceptions(error)
        res.status(status).send(body)
    }
})

export default router