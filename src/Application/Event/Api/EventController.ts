import { eventRepository } from "../../../ioc/container"
import { Router, Response, Request } from "express"
import { EventService } from "../Services/EventService"
import { upload, getMainPaths } from "../../Middleware/photosManager"
import { Auth } from "../../Security/SecurityManager"
import { EventDTO} from "./EventDTO"
import { EventValidator } from "./EventValidator"
import { CREATED, OK } from "http-status-codes"
import { handlerExceptions } from "../../Handler/AuthHandler"

const router = Router()
const eventService = new EventService(eventRepository)

router.post("/",[upload,Auth("Publisher")],async (req: Request, res: Response)=>{
    try {
        const event =  req.body as EventDTO 
        event.owner = req.body.username
        event.zones = JSON.parse(req.body.zones)
        event.categories = JSON.parse(req.body.categories)
        event.image = getMainPaths(req.files as {
            [fieldname: string]: Express.Multer.File[]
        } )[0]
        const result = new EventValidator(event)
        result.validate()
        const _event = await eventService.createEvent(event)
        res.status(CREATED).send(_event)
    } catch (error) {
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